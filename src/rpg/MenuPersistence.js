const KEY='taskbar-hero.menu-state.v1';
export function loadMenuState(storage=globalThis.localStorage){try{return JSON.parse(storage?.getItem(KEY)??'null')??null;}catch{return null;}}
export function saveMenuState(state,storage=globalThis.localStorage){try{storage?.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
export function clearMenuState(storage=globalThis.localStorage){try{storage?.removeItem(KEY);return true;}catch{return false;}}
