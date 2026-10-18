import {getMenuDefinition,getPageMeta} from './MenuDefinitions.js';
export class MenuRouter{
  constructor(initial={menu:'character',page:'Overview'}){this.state={menu:initial.menu,page:initial.page,history:[]};this.listeners=new Set()}
  subscribe(listener){this.listeners.add(listener);listener(this.state);return()=>this.listeners.delete(listener)}
  emit(){for(const listener of this.listeners)listener({...this.state,history:[...this.state.history]})}
  go(menu,page){const def=getMenuDefinition(menu);if(!def)return false;const target=page&&def.pages.includes(page)?page:def.pages[0];this.state.history.push({menu:this.state.menu,page:this.state.page});this.state={...this.state,menu,page:target};this.emit();return true}
  back(){const previous=this.state.history.pop();if(!previous)return false;this.state={...this.state,...previous};this.emit();return true}
  home(){return this.go('character','Overview')}
  openPage(page){const meta=getPageMeta(page);return meta?this.go(meta.menu,page):false}
  getState(){return {...this.state,history:[...this.state.history]}}
}
