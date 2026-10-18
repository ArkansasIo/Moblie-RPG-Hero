import * as screens from './screens/index.js';

export const SCREEN_REGISTRY = Object.freeze({
  Character: screens.renderCharacterScreen,
  Inventory: screens.renderInventoryScreen,
  Equipment: screens.renderEquipmentScreen,
  'Quest Log': screens.renderQuestScreen,
  'World Map': screens.renderWorldScreen,
  Combat: screens.renderCombatScreen,
  Party: screens.renderSocialScreen,
  Guild: screens.renderSocialScreen,
  Friends: screens.renderSocialScreen,
  Chat: screens.renderMailChatScreen,
  Mail: screens.renderMailChatScreen,
  Trading: screens.renderEconomyScreen,
  Social: screens.renderSocialScreen,
  Leveling: screens.renderProgressionScreen,
  Experience: screens.renderProgressionScreen,
  'Gear Score': screens.renderProgressionScreen,
  Masteries: screens.renderProgressionScreen,
  Research: screens.renderResearchScreen,
  Endgame: screens.renderProgressionScreen,
  Crafting: screens.renderCraftingScreen,
  Skills: screens.renderSkillsScreen,
  Talents: screens.renderTalentsScreen,
  Dungeons: screens.renderInstanceScreen,
  Raids: screens.renderInstanceScreen,
  Arena: screens.renderPvpScreen,
  Battlegrounds: screens.renderPvpScreen,
  Ranked: screens.renderPvpScreen,
  Duels: screens.renderPvpScreen,
  Leaderboards: screens.renderLeaderboardScreen,
  Achievements: screens.renderAchievementScreen,
  'World Bosses': screens.renderBossEventScreen,
  Events: screens.renderBossEventScreen,
  Loadouts: screens.renderLoadoutScreen,
  Collections: screens.renderCollectionsScreen,
  Settings: screens.renderSettingsScreen,
  Controls: screens.renderSettingsScreen,
  Audio: screens.renderSettingsScreen,
  Video: screens.renderSettingsScreen,
  Accessibility: screens.renderSettingsScreen,
  'Save/Load': screens.renderSaveLoadScreen
});

export function getScreenRenderer(page) {
  return SCREEN_REGISTRY[page] ?? null;
}
