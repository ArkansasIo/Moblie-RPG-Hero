import {list,panel} from '../MenuPanels.js';
export function renderMailChatScreen(documentRef,{mail=[],channels=[]}={}){const root=documentRef.createElement('div');root.className='rpg-screen mail-chat-screen';root.append(panel(documentRef,'Mail',list(documentRef,mail)));root.append(panel(documentRef,'Chat',list(documentRef,channels)));return root}
