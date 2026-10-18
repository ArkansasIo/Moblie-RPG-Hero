import { MENU_GROUPS } from './MenuState.js';
import { actionsFor } from './MenuActions.js';
import { submenuFor } from './RPGSubmenus.js';

export const RPG_MENU_REGISTRY=Object.freeze(Object.fromEntries(Object.entries(MENU_GROUPS).map(([id,pages])=>[id,{id,pages,submenus:submenuFor(id),actions:Object.fromEntries(pages.map(page=>[page,actionsFor(page)]))}])));
export function getMenuGroup(id){return RPG_MENU_REGISTRY[id]??null;}
export function getMenuPage(group,page){const entry=getMenuGroup(group);return entry?.pages.includes(page)?{group,page,actions:entry.actions[page]??[]}:null;}
