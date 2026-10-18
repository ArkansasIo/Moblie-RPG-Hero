import {list,panel} from '../MenuPanels.js';
export function renderBossEventScreen(documentRef,{bosses=[],events=[]}={}){const root=documentRef.createElement('div');root.className='rpg-screen boss-event-screen';root.append(panel(documentRef,'World Bosses',list(documentRef,bosses)));root.append(panel(documentRef,'Events',list(documentRef,events)));return root}
