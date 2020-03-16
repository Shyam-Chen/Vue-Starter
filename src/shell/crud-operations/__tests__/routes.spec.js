import router from '~/core/router';

describe('Routes', () => {
  it('Basic', () => {
    jest.mock('~/shell/crud-operations/basic/Basic', () => ({
      name: 'Basic',
      render: h => h('div'),
    }));
    router.push('/crud-operations/basic').catch(() => {});
  });

  it('REST', () => {
    jest.mock('~/shell/crud-operations/rest/REST', () => ({ name: 'REST', render: h => h('div') }));
    router.push('/crud-operations/rest').catch(() => {});
  });

  it('GraphQL', () => {
    jest.mock('~/shell/crud-operations/graphql/GraphQL', () => ({
      name: 'GraphQL',
      render: h => h('div'),
    }));
    router.push('/crud-operations/graphql').catch(() => {});
  });
});
