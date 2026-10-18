import {statGrid,panel} from '../MenuPanels.js';
export function renderCharacterScreen(documentRef,player={}){const root=documentRef.createElement('div');root.className='rpg-screen character-screen';root.append(panel(documentRef,'Character',player.name??'Hero'));root.append(statGrid(documentRef,player.stats??{Level:1,HP:100,MP:50,Power:10,Defense:10,Speed:10}));return root}
