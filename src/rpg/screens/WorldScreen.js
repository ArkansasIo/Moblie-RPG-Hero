import {list,panel} from '../MenuPanels.js';
export function renderWorldScreen(documentRef,zones=[]){const root=documentRef.createElement('div');root.className='rpg-screen world-screen';root.append(panel(documentRef,'World',list(documentRef,zones)));return root}
