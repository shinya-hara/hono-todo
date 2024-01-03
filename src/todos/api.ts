import {Hono} from 'hono';

type DateString = string;

type Todo = {
  id: string;
  title: string;
  completedAt: DateString | null;
};

let todoList: Todo[] = [
  {id: '1', title: 'Learning Hono', completedAt: null},
  {
    id: '2',
    title: 'Watch the movie',
    completedAt: new Date('2024-01-01 12:00:00').toISOString(),
  },
  {id: '3', title: 'Buy milk', completedAt: null},
];

const todos = new Hono();

/**
 * List todos
 */
todos.get('/', c => c.json(todoList));

/**
 * Get a todo
 */
todos.post('/', async c => {
  const param = await c.req.json<{title: string}>();
  const newTodo = {
    id: String(todoList.length + 1),
    completedAt: null,
    title: param.title,
  };
  todoList = [...todoList, newTodo];

  return c.json(newTodo, 201);
});

/**
 * Update a todo
 */
todos.put('/:id', async c => {
  const id = c.req.param('id');
  const todo = todoList.find(t => t.id === id);
  if (!todo) {
    return c.json({message: 'Not found'}, 404);
  }

  const param = await c.req.json<{title?: string}>();

  todoList = todoList.map(todo => {
    if (todo.id === id) {
      return {...todo, ...param};
    }

    return todo;
  });

  return c.newResponse(null, 204);
});

/**
 * Complete a todo
 */
todos.post('/:id/complete', c => {
  const id = c.req.param('id');
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) {
    return c.json({message: 'Not found'}, 404);
  }

  todoList = todoList.map(todo => {
    if (todo.id === id) {
      return {...todo, completedAt: new Date().toISOString()};
    }

    return todo;
  });

  return c.newResponse(null, 204);
});

/**
 * Incomplete a todo
 */
todos.post('/:id/incomplete', c => {
  const id = c.req.param('id');
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) {
    return c.json({message: 'Not found'}, 404);
  }

  todoList = todoList.map(todo => {
    if (todo.id === id) {
      return {...todo, completedAt: null};
    }

    return todo;
  });

  return c.newResponse(null, 204);
});

/**
 * Delete a todo
 */
todos.delete('/:id', c => {
  const id = c.req.param('id');
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) {
    return c.json({message: 'Not found'}, 404);
  }

  todoList = todoList.filter(todo => todo.id !== id);

  return c.newResponse(null, 204);
});

export {todos};
