import Table from './Table.vue';
import Column from './Column.vue';
import Row from './Row.vue';
import Cell from './Cell.vue';

// @ts-ignore
Table.Column = Column;
// @ts-ignore
Table.Row = Row;
// @ts-ignore
Table.Cell = Cell;

export default Table as typeof Table & {
  Column: typeof Column;
  Row: typeof Row;
  Cell: typeof Cell;
};
