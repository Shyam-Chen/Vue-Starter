import chunk from 'lodash/chunk';
import sortBy from 'lodash/sortBy';

export default <T extends Record<string, any>>(
  arr: T[],
  ctrl = { rows: 10, page: 1, field: 'createdAt', direction: 'desc' },
) => {
  if (!arr?.length) return [];

  let _arr = [...arr];

  if (ctrl.field && ctrl.direction === 'asc') {
    _arr = sortBy(_arr, (item) => item[ctrl.field]);
  }

  if (ctrl.field && ctrl.direction === 'desc') {
    _arr = sortBy(_arr, (item) => item[ctrl.field]).reverse();
  }

  const chunked = chunk(_arr, ctrl.rows);

  return chunked[ctrl.page - 1];
};
