import Cell from './Cell.vue';
import Column from './Column.vue';
import Row from './Row.vue';
import Table from './Table.vue';

export default Object.assign(Table, {
  Column,
  Row,
  Cell,
});
