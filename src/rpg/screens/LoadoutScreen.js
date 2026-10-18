import {list,panel} from '../MenuPanels.js';
export function renderLoadoutScreen(documentRef,loadouts=[]){const root=documentRef.createElement('div');root.className='rpg-screen loadout-screen';root.append(panel(documentRef,'Loadouts',list(documentRef,loadouts)));return root}
