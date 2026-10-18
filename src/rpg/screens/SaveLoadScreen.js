import {list,panel} from '../MenuPanels.js';
export function renderSaveLoadScreen(documentRef,slots=[]){const root=documentRef.createElement('div');root.className='rpg-screen save-load-screen';root.append(panel(documentRef,'Save / Load',list(documentRef,slots.length?slots:['Autosave','Manual Save','Backup','Migration'])));return root}
