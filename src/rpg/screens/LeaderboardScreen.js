import {list,panel} from '../MenuPanels.js';
export function renderLeaderboardScreen(documentRef,boards=[]){const root=documentRef.createElement('div');root.className='rpg-screen leaderboard-screen';root.append(panel(documentRef,'Leaderboards',list(documentRef,boards)));return root}
