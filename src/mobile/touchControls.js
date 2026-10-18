export const TOUCH_ACTIONS = Object.freeze(['move','attack','ability','inventory','map','quest','dodge','interact']);

export function createTouchControls(element, handlers = {}) {
  if (!element) return { destroy() {} };
  const activePointers = new Map();
  const releasePointer = (event) => {
    const action = activePointers.get(event.pointerId);
    if (!action) return;
    activePointers.delete(event.pointerId);
    try { element.releasePointerCapture?.(event.pointerId); } catch {}
    handlers[action]?.({ type:'end', pointerId:event.pointerId, x:event.clientX, y:event.clientY, event });
  };
  const onPointerDown = (event) => {
    const action = event.target?.closest?.('[data-action]')?.dataset?.action;
    if (!action || !TOUCH_ACTIONS.includes(action)) return;
    activePointers.set(event.pointerId, action);
    try { element.setPointerCapture?.(event.pointerId); } catch {}
    handlers[action]?.({ type:'start', pointerId:event.pointerId, x:event.clientX, y:event.clientY, event });
    event.preventDefault();
  };
  const onPointerMove = (event) => {
    const action = activePointers.get(event.pointerId);
    if (!action) return;
    handlers[action]?.({ type:'move', pointerId:event.pointerId, x:event.clientX, y:event.clientY, event });
    event.preventDefault();
  };
  const onPointerUp = (event) => {
    if (!activePointers.has(event.pointerId)) return;
    releasePointer(event);
    event.preventDefault();
  };
  element.addEventListener('pointerdown', onPointerDown, { passive:false });
  element.addEventListener('pointermove', onPointerMove, { passive:false });
  element.addEventListener('pointerup', onPointerUp, { passive:false });
  element.addEventListener('pointercancel', onPointerUp, { passive:false });
  element.addEventListener('lostpointercapture', releasePointer, { passive:true });
  return {
    destroy() {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
      element.removeEventListener('lostpointercapture', releasePointer);
      activePointers.clear();
    }
  };
}

export function bindKeyboardFallback(element = window, handlers = {}) {
  const map = { i:'inventory', m:'map', q:'quest', e:'interact', ' ':'dodge' };
  const listener = (event) => {
    if (event.defaultPrevented || event.repeat) return;
    const action = map[event.key?.toLowerCase()];
    if (action) { handlers[action]?.({ type:'press', event }); event.preventDefault(); }
  };
  element.addEventListener('keydown', listener, { passive:false });
  return () => element.removeEventListener('keydown', listener);
}
