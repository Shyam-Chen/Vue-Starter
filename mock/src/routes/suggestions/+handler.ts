import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('', async (request: any, reply) => {
    const arr = [
      { label: 'TypeScript', value: 'ts' },
      { label: 'JaveScript', value: 'js' },
      { label: 'NativeScript', value: 'nativescript' },
      { label: 'CoffeeScript', value: 'coffee' },
      { label: 'Angular', value: 'f1' },
      { label: 'React', value: 'f2' },
      { label: 'Svelte', value: 'f3' },
      { label: 'Vue', value: 'f4' },
      { label: 'Nest', value: 'b1' },
      { label: 'Express', value: 'b2' },
      { label: 'Fastify', value: 'b3' },
      { label: 'Koa', value: 'b4' },
    ];

    if (request.query.value) {
      const val = request.query.value;

      return reply.send(
        arr.filter(
          (item) =>
            item.label.toUpperCase().includes(val.toUpperCase()) ||
            String(item.value).toUpperCase().includes(val.toUpperCase()),
        ),
      );
    }

    return reply.send(arr);
  });
};
