const KEY='taskbar-hero.menu-state.v1';
export function loadMenuState(storage=globalThis.localStorage,fallback={menu:'character',page:'Overview'}){try{const value=JSON.parse(storage?.getItem(KEY)??'null');return value?.menu&&value?.page?value:fallback;}catch{return fallback;}}
export function saveMenuState(state,storage=globalThis.localStorage){try{storage?.setItem(KEY,JSON.stringify({menu:state.menu,page:state.page}));return true;}catch{return false;}}
export function clearMenuState(storage=globalThis.localStorage){try{storage?.removeItem(KEY);return true;}catch{return false;}}
export {KEY};
