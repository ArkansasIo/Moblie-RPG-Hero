import {list,panel} from '../MenuPanels.js';
export function renderResearchScreen(documentRef,research=[]){const root=documentRef.createElement('div');root.className='rpg-screen research-screen';root.append(panel(documentRef,'Research',list(documentRef,research)));return root}
