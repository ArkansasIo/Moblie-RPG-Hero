import {list,panel} from '../MenuPanels.js';
export function renderAchievementScreen(documentRef,achievements=[]){const root=documentRef.createElement('div');root.className='rpg-screen achievement-screen';root.append(panel(documentRef,'Achievements',list(documentRef,achievements)));return root}
