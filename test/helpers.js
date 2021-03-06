import { flush as flush$0 } from '@polymer/polymer/lib/utils/flush.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

window.flushGrid = (grid) => {
  grid._observer.flush();
  if (grid._debounceScrolling) {
    grid._debounceScrolling.flush();
  }
  if (grid._debounceScrollPeriod) {
    grid._debounceScrollPeriod.flush();
  }
  flush$0();
  if (grid._debouncerLoad) {
    grid._debouncerLoad.flush();
  }
  if (grid._debounceOverflow) {
    grid._debounceOverflow.flush();
  }
  while (grid._debounceIncreasePool) {
    grid._debounceIncreasePool.flush();
    grid._debounceIncreasePool = null;
    flush$0();
  }
};

window.listenOnce = (element, eventName, callback) => {
  const listener = e => {
    element.removeEventListener(eventName, listener);
    callback(e);
  };
  element.addEventListener(eventName, listener);
};

window.getRows = (container) => {
  return container.querySelectorAll('tr');
};

window.getRowCells = (row) => {
  return Array.prototype.slice.call(dom(row).querySelectorAll('[part~="cell"]'));
};

window.getCellContent = (cell) => {
  return cell ? cell.querySelector('slot').assignedNodes()[0] : null;
};

window.getHeaderCellContent = (grid, row, col) => {
  const container = grid.$.header;
  return window.getContainerCellContent(container, row, col);
};

window.getBodyCellContent = (grid, row, col) => {
  const container = grid.$.items;
  return window.getContainerCellContent(container, row, col);
};

window.getContainerCellContent = (container, row, col) => {
  return window.getCellContent(window.getContainerCell(container, row, col));
};

window.getContainerCell = (container, row, col) => {
  const rows = window.getRows(container);
  const cells = window.getRowCells(rows[row]);
  return cells[col];
};
