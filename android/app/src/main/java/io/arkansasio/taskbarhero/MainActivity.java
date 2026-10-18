package io.arkansasio.taskbarhero;

import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class MainActivity extends Activity {
    private static final String RAW_BUILD_INFO = "https://github.com/ArkansasIo/Moblie-RPG-Hero/releases/download/mobile-latest/build-info.json";
    private static final String UPDATE_ZIP = "https://github.com/ArkansasIo/Moblie-RPG-Hero/releases/download/mobile-latest/mobile-rpg-web-latest.zip";
    private static final int CONNECT_TIMEOUT_MS = 15000;
    private static final int READ_TIMEOUT_MS = 30000;

    private WebView webView;
    private File updateRoot;
    private final android.os.Handler mainHandler = new android.os.Handler(android.os.Looper.getMainLooper());

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        updateRoot = new File(getFilesDir(), "updates");
        updateRoot.mkdirs();

        webView = new WebView(this);
        webView.setBackgroundColor(0x00000000);
        webView.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(false);
        webView.getSettings().setAllowContentAccess(false);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);

        WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/updates/", new WebViewAssetLoader.InternalStoragePathHandler(this, updateRoot))
                .build();

        webView.setWebViewClient(new WebViewClientCompat() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
        });
        webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");
        setContentView(webView);
        loadCurrentGame();
    }

    private void loadCurrentGame() {
        File current = new File(updateRoot, "current/index.html");
        if (current.isFile()) webView.loadUrl("https://appassets.androidplatform.net/updates/current/index.html");
        else webView.loadUrl("https://appassets.androidplatform.net/assets/game/index.html");
    }

    private JSONObject readLocalBuildInfo() {
        try {
            File updatedInfo = new File(updateRoot, "current/build-info.json");
            if (updatedInfo.isFile()) return new JSONObject(readText(updatedInfo));
            InputStream input = getAssets().open("game/build-info.json");
            byte[] bytes = readAll(input);
            input.close();
            return new JSONObject(new String(bytes, "UTF-8"));
        } catch (Exception ignored) {
            return new JSONObject();
        }
    }

    private static String readText(File file) throws IOException {
        FileInputStream input = new FileInputStream(file);
        byte[] bytes = readAll(input);
        input.close();
        return new String(bytes, "UTF-8");
    }

    private void checkAndUpdate() {
        new Thread(() -> {
            try {
                JSONObject remote = fetchJson(RAW_BUILD_INFO);
                JSONObject local = readLocalBuildInfo();
                String remoteBuild = remote.optString("buildId", "");
                String localBuild = local.optString("buildId", "");
                if (remoteBuild.isEmpty() || remoteBuild.equals(localBuild)) {
                    notifyUser("Mo RPG Hero is up to date.");
                    return;
                }
                String remoteVersion = remote.optString("version", "new build");
                mainHandler.post(() -> new AlertDialog.Builder(this)
                        .setTitle("Update available")
                        .setMessage("Build " + remoteVersion + " is available from GitHub. Download the latest game content now?")
                        .setNegativeButton("Later", null)
                        .setPositiveButton("Update", (dialog, which) -> downloadUpdate(remote))
                        .show());
            } catch (Exception error) {
                notifyUser("Update check failed: " + error.getMessage());
            }
        }).start();
    }

    private void downloadUpdate(JSONObject remote) {
        new Thread(() -> {
            File tempZip = new File(getCacheDir(), "mobile-rpg-web-update.zip");
            File tempDir = new File(updateRoot, "incoming");
            try {
                deleteRecursive(tempDir);
                tempDir.mkdirs();
                downloadFile(UPDATE_ZIP, tempZip);
                unzipSafely(tempZip, tempDir);
                File index = new File(tempDir, "index.html");
                File buildInfo = new File(tempDir, "build-info.json");
                if (!index.isFile() || !buildInfo.isFile()) throw new IOException("Update package is incomplete");
                JSONObject downloaded = new JSONObject(readText(buildInfo));
                if (!remote.optString("buildId").equals(downloaded.optString("buildId"))) throw new IOException("Update package build ID mismatch");
                File current = new File(updateRoot, "current");
                File backup = new File(updateRoot, "previous");
                deleteRecursive(backup);
                if (current.exists() && !current.renameTo(backup)) throw new IOException("Could not stage previous version");
                if (!tempDir.renameTo(current)) {
                    if (backup.exists()) backup.renameTo(current);
                    throw new IOException("Could not activate update");
                }
                deleteRecursive(backup);
                tempZip.delete();
                mainHandler.post(() -> {
                    Toast.makeText(this, "Updated to " + downloaded.optString("version", "latest build"), Toast.LENGTH_LONG).show();
                    loadCurrentGame();
                });
            } catch (Exception error) {
                deleteRecursive(tempDir);
                tempZip.delete();
                notifyUser("Update failed: " + error.getMessage());
            }
        }).start();
    }

    private JSONObject fetchJson(String urlString) throws Exception {
        HttpURLConnection connection = open(urlString);
        try {
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) throw new IOException("HTTP " + connection.getResponseCode());
            InputStream input = new BufferedInputStream(connection.getInputStream());
            byte[] data = readAll(input);
            input.close();
            return new JSONObject(new String(data, "UTF-8"));
        } finally {
            connection.disconnect();
        }
    }

    private void downloadFile(String urlString, File destination) throws Exception {
        HttpURLConnection connection = open(urlString);
        try {
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) throw new IOException("HTTP " + connection.getResponseCode());
            InputStream input = new BufferedInputStream(connection.getInputStream());
            FileOutputStream output = new FileOutputStream(destination);
            byte[] buffer = new byte[8192];
            int count;
            while ((count = input.read(buffer)) != -1) output.write(buffer, 0, count);
            output.close();
            input.close();
        } finally {
            connection.disconnect();
        }
    }

    private HttpURLConnection open(String urlString) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(urlString).openConnection();
        connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
        connection.setReadTimeout(READ_TIMEOUT_MS);
        connection.setInstanceFollowRedirects(true);
        connection.setRequestProperty("User-Agent", "Mo-RPG-Hero-Android-Updater");
        return connection;
    }

    private static byte[] readAll(InputStream input) throws IOException {
        java.io.ByteArrayOutputStream output = new java.io.ByteArrayOutputStream();
        byte[] buffer = new byte[8192];
        int count;
        while ((count = input.read(buffer)) != -1) output.write(buffer, 0, count);
        return output.toByteArray();
    }

    private static void unzipSafely(File zipFile, File destination) throws IOException {
        String root = destination.getCanonicalPath() + File.separator;
        ZipInputStream input = new ZipInputStream(new BufferedInputStream(new FileInputStream(zipFile)));
        ZipEntry entry;
        byte[] buffer = new byte[8192];
        while ((entry = input.getNextEntry()) != null) {
            File output = new File(destination, entry.getName());
            if (!output.getCanonicalPath().startsWith(root)) throw new IOException("Unsafe archive path");
            if (entry.isDirectory()) output.mkdirs();
            else {
                File parent = output.getParentFile();
                if (parent != null) parent.mkdirs();
                FileOutputStream stream = new FileOutputStream(output);
                int count;
                while ((count = input.read(buffer)) != -1) stream.write(buffer, 0, count);
                stream.close();
            }
            input.closeEntry();
        }
        input.close();
    }

    private void notifyUser(String message) {
        mainHandler.post(() -> Toast.makeText(this, message, Toast.LENGTH_LONG).show());
    }

    private static void deleteRecursive(File file) {
        if (file == null || !file.exists()) return;
        if (file.isDirectory()) {
            File[] children = file.listFiles();
            if (children != null) for (File child : children) deleteRecursive(child);
        }
        file.delete();
    }

    public class AndroidBridge {
        @JavascriptInterface
        public void updateFromGitHub() { checkAndUpdate(); }

        @JavascriptInterface
        public String getBuildInfo() { return readLocalBuildInfo().toString(); }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
