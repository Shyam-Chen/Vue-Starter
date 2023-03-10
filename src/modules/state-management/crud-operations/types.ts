export interface TodoItem {
  _id?: string;
  title?: string;
  completed?: boolean;
}

// enum Filter {
//   All,
//   Active,
//   Completed,
// }

export interface State {
  searchConditions: {
    title?: string;
    filter?: number;
  };

  dataSource: TodoItem[];
  dataCount: number;

  todoItem: TodoItem;

  errors: Record<string, string>;
}

// Fastify
router.post('/', { onRequest: [auth] }, async (req, reply) => {
  const result = await users.sthFn();
  return reply.send(result);
});

// Express
router.post('/', auth, async (req, res, next) => {
  try {
    const result = await users.sthFn();
    res.json(result);
  } catch (error) {
    return next(error);
  }
});
