import Table from './Table.vue';
import Column from './Column.vue';
import Row from './Row.vue';
import Cell from './Cell.vue';

// @ts-expect-error
Table.Column = Column;
// @ts-expect-error
Table.Row = Row;
// @ts-expect-error
Table.Cell = Cell;

export default Table as typeof Table & {
  Column: typeof Column;
  Row: typeof Row;
  Cell: typeof Cell;
};
