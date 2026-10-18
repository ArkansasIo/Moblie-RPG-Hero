import {list,panel} from '../MenuPanels.js';
export function renderCraftingScreen(documentRef,recipes=[]){const root=documentRef.createElement('div');root.className='rpg-screen crafting-screen';root.append(panel(documentRef,'Crafting',list(documentRef,recipes)));return root}
