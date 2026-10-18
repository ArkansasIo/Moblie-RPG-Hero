// MMO-ready system definitions. Client UI can consume these definitions; authoritative state belongs on a server.
export const MMO_SYSTEMS = Object.freeze({
  character:{levelCap:100, attributes:['str','dex','con','int','wis','vit','spi','lck','wil','cha'], classes:['Warrior','Ranger','Mage','Priest','Rogue','Paladin','Druid','Necromancer'], subclasses:true, talents:true, masteries:true},
  combat:{modes:['PvE','PvP','Duel','Arena','Battleground','Raid'], damageTypes:['physical','fire','frost','nature','arcane','shadow','holy','void'], statuses:['stun','silence','root','slow','bleed','burn','freeze','poison','fear'], threat:true, cooldowns:true, diminishingReturns:true},
  quests:{types:['main','side','daily','weekly','repeatable','world','class','faction','achievement'], sharing:true, objectives:['kill','collect','escort','interact','explore','survive','boss']},
  social:{party:{size:5,roles:['tank','healer','dps','support']},guild:true,friends:true,mail:true,chat:['global','zone','party','guild','whisper'],trade:true},
  progression:{experience:true,gearScore:true,reputation:true,titles:true,achievements:true,research:true,collections:true,endgame:true},
  economy:{auctionHouse:true,marketplace:true,bank:true,vendors:true,currencies:true,currencySinks:['repair','crafting','teleport','upgrades','cosmetics']},
  world:{zones:true,subZones:true,biomes:true,subBiomes:true,events:true,worldBosses:true,gathering:true,mounts:true,fastTravel:true},
  instances:{dungeons:true,trails:true,raids:true,towerFloors:100,weeklyLockouts:true,matchmaking:true},
  housing:{enabled:true,plots:true,decorations:true,storage:true,craftingStations:true},
  pets:{companions:true,mounts:true,combatPets:false,collection:true},
  guild:{ranks:['Guild Master','Officer','Veteran','Member','Recruit'],bank:true,missions:true,perks:true,territory:false},
  seasons:{battlePass:true,seasonalEvents:true,rankResets:true,seasonalCurrencies:true}
});

export const GAME_RULES = Object.freeze({
  authoritativeServer:['inventory','currency','loot','combat-results','trade','auction-house','guild-bank','progression'],
  clientSystems:['rendering','input','animation','ui','prediction','audio'],
  antiCheat:['server-validation','rate-limits','transaction-ledger','replayable-combat-log'],
  persistence:['character','equipment','inventory','quests','achievements','reputation','guild','settings']
});
