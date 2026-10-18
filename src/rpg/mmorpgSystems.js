// MMO-ready system definitions. Character level is 1-720; world tier remains 1-9.
export const MMO_SYSTEMS = Object.freeze({
  character:{levelCap:720,attributes:['str','dex','con','int','wis','vit','spi','lck','wil','cha'],classes:['Warrior','Knight','Berserker','Rogue','Assassin','Ranger','Mage','Elementalist','Cleric','Paladin','Necromancer','Summoner','Battlemage'],subclasses:true,talents:true,masteries:true,prestige:true,ascension:true},
  combat:{modes:['PvE','PvP','Duel','Arena','Battleground','Raid'],damageTypes:['physical','fire','frost','lightning','nature','arcane','shadow','holy','void'],statuses:['stun','silence','root','slow','bleed','burn','freeze','poison','fear'],threat:true,cooldowns:true,diminishingReturns:true},
  quests:{types:['main','side','daily','weekly','repeatable','world','class','faction','achievement','bounty','guild','event'],sharing:true,objectives:['kill','collect','escort','interact','explore','survive','boss','craft','gather']},
  social:{party:{size:5,roles:['tank','healer','dps','support']},guild:true,friends:true,mail:true,chat:['global','zone','party','guild','whisper'],trade:true,blockList:true,inspection:true},
  progression:{experience:true,levelBrackets:12,gearScore:true,itemLevel:true,reputation:true,titles:true,achievements:true,research:true,collections:true,endgame:true},
  economy:{auctionHouse:true,marketplace:true,bank:true,vendors:true,currencies:true,currencySinks:['repair','crafting','teleport','upgrades','cosmetics','housing']},
  world:{worldTiers:9,zones:true,subZones:true,biomes:true,subBiomes:true,events:true,worldBosses:true,gathering:true,mounts:true,fastTravel:true,hiddenAreas:true},
  instances:{dungeons:true,trails:true,raids:true,towerFloors:100,weeklyLockouts:true,matchmaking:true,difficultyScaling:true},
  housing:{enabled:true,plots:true,decorations:true,storage:true,craftingStations:true},
  pets:{companions:true,mounts:true,combatPets:true,collection:true},
  guild:{ranks:['Guild Master','Officer','Veteran','Member','Recruit'],bank:true,missions:true,perks:true,territory:true,guildLevelCap:100},
  professions:{enabled:true,levelCap:100,crafting:true,gathering:true,recipes:true,specializations:true},
  pvp:{arena:true,battleground:true,openWorld:true,rating:true,seasons:true,honor:true},
  seasons:{battlePass:true,seasonalEvents:true,rankResets:true,seasonalCurrencies:true,seasonalAchievements:true},
  security:{serverAuthority:true,rateLimits:true,transactionLedger:true,replayableCombatLog:true,validation:true}
});

export const GAME_RULES = Object.freeze({
  characterLevel:{min:1,max:720},worldTier:{min:1,max:9},towerFloors:{min:1,max:100},
  authoritativeServer:['inventory','currency','loot','combat-results','trade','auction-house','guild-bank','progression','pvp-rating'],
  clientSystems:['rendering','input','animation','ui','prediction','audio'],
  antiCheat:['server-validation','rate-limits','transaction-ledger','replayable-combat-log'],
  persistence:['account','character','equipment','inventory','quests','achievements','reputation','guild','settings','collections']
});
