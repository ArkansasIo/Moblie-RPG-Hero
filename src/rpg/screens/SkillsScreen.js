import {list,panel} from '../MenuPanels.js';
export function renderSkillsScreen(documentRef,skills=[]){const root=documentRef.createElement('div');root.className='rpg-screen skills-screen';root.append(panel(documentRef,'Skills',list(documentRef,skills)));return root}
