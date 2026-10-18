ndro@echo off
rem Wrapper so app-builder/electron-builder find "7za" on PATH while extracting
rem archives that contain macOS symlinks (which Windows refuses without the
rem "create symbolic link" privilege). Forcing -snl keeps extraction working.
setlocal enabledelayedexpansion
set "REAL=C:\Users\Shadow\AppData\Local\npm-cache\_npx\97431443581207c9\node_modules\7zip-bin\win\x64\7za.exe"
if not exist "%REAL%" for /f "delims=" %%i in ('where /r "%LOCALAPPDATA%\npm-cache" 7za.exe 2^>nul') do set "REAL=%%i"
"%REAL%" %* -snl
