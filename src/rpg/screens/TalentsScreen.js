import {list,panel} from '../MenuPanels.js';
export function renderTalentsScreen(documentRef,talents=[]){const root=documentRef.createElement('div');root.className='rpg-screen talents-screen';root.append(panel(documentRef,'Talents',list(documentRef,talents)));return root}
