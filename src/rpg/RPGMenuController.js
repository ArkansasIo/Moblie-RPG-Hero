import {MenuRouter} from './MenuRouter.js';
import {createMenuRenderer} from './MenuRenderer.js';
import {createMenuSearch} from './MenuSearch.js';
import {installMenuHotkeys} from './MenuHotkeys.js';
import {loadMenuState,saveMenuState} from './MenuPersistence.js';
import {getPageData} from './MenuPageData.js';
import {menuNotifications} from './MenuNotifications.js';

export class RPGMenuController {
  constructor({documentRef=document,storage=globalThis.localStorage,root=null,state=null}={}) {
    this.documentRef=documentRef; this.storage=storage;
    const saved=state??loadMenuState(storage);
    this.router=new MenuRouter(saved?.menu&&saved?.page?{menu:saved.menu,page:saved.page}:undefined);
    this.renderer=createMenuRenderer({documentRef});
    this.root=root??documentRef.createElement('div');
    this.root.className='rpg-menu-shell';
    this.unsubscribe=null; this.removeHotkeys=null; this.search=null;
  }
  mount(target=this.root) {
    this.root=target; this.root.replaceChildren();
    const layout=this.documentRef.createElement('div'); layout.className='rpg-menu-layout';
    const sidebar=this.documentRef.createElement('div'); sidebar.className='rpg-menu-sidebar-host';
    const content=this.documentRef.createElement('div'); content.className='rpg-menu-content-host';
    const searchHost=this.documentRef.createElement('div'); searchHost.className='rpg-menu-search-host';
    this.search=createMenuSearch({documentRef:this.documentRef,router:this.router}); searchHost.append(this.search.input,this.search.results);
    layout.append(sidebar,content); this.root.append(searchHost,layout);
    const render=state=>{
      sidebar.replaceChildren(this.renderer.renderNav(state,s=>this.router.go(s.menu,s.page)));
      const page=this.renderer.renderPage(state,{back:()=>this.back(),refresh:()=>this.refresh(),close:()=>this.close()});
      const body=page.querySelector('.menu-page-body');
      if(body){body.replaceChildren();body.append(this.createPageContent(state.page));}
      content.replaceChildren(page); saveMenuState({menu:state.menu,page:state.page},this.storage);
    };
    this.unsubscribe=this.router.subscribe(render);
    this.removeHotkeys=installMenuHotkeys({target:this.documentRef.defaultView??globalThis,router:this.router,close:()=>this.close()});
    return this.root;
  }
  createPageContent(page){
    const body=this.documentRef.createElement('div'); body.className='menu-data-view';
    const data=getPageData(page); body.dataset.type=data.type;
    const title=this.documentRef.createElement('h2'); title.textContent=page; body.appendChild(title);
    const categories=data.categories??data.panels??data.layers??data.filters??data.slots??[];
    if(categories.length){const list=this.documentRef.createElement('div');list.className='menu-category-grid';categories.forEach(item=>{const b=this.documentRef.createElement('button');b.type='button';b.className='menu-category';b.textContent=String(item);b.onclick=()=>menuNotifications.push(`${page}: ${item}`,'info');list.appendChild(b)});body.appendChild(list);}
    return body;
  }
  open(menu,page){return this.router.go(menu,page)}
  back(){return this.router.back()}
  home(){return this.router.home()}
  refresh(){const state=this.router.getState();this.router.emit();return state}
  close(){this.root.classList.toggle('is-closed')}
  destroy(){this.unsubscribe?.();this.removeHotkeys?.();this.search=null;}
}
export function createRPGMenu(options={}){return new RPGMenuController(options)}
