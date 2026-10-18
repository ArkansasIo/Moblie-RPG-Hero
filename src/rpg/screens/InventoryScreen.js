import {list,panel} from '../MenuPanels.js';
export function renderInventoryScreen(documentRef,items=[]){const root=documentRef.createElement('div');root.className='rpg-screen inventory-screen';root.append(panel(documentRef,'Inventory',list(documentRef,items)));return root}
