import {statGrid,panel} from '../MenuPanels.js';
const SLOTS=['Head','Chest','Legs','Gloves','Boots','Main Hand','Off Hand','Ring 1','Ring 2','Amulet','Cloak','Belt'];
export function renderEquipmentScreen(documentRef,equipment={}){const root=documentRef.createElement('div');root.className='rpg-screen equipment-screen';root.append(panel(documentRef,'Equipment',statGrid(documentRef,Object.fromEntries(SLOTS.map(s=>[s,equipment[s]??'Empty'])))));return root}
