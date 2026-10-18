import {list,panel} from '../MenuPanels.js';
export function renderQuestScreen(documentRef,quests=[]){const root=documentRef.createElement('div');root.className='rpg-screen quest-screen';root.append(panel(documentRef,'Quest Log',list(documentRef,quests)));return root}
