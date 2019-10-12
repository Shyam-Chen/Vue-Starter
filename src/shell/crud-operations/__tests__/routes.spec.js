import router from '~/core/router';

describe('Routes', () => {
  it('Basic', () => {
    jest.mock('~/shell/crud-operations/basic/Basic', () => ({ name: 'Basic', render: h => h('div') }));
    router.push('/en/crud-operations/basic');
  });

  it('REST', () => {
    jest.mock('~/shell/crud-operations/rest/REST', () => ({ name: 'REST', render: h => h('div') }));
    router.push('/en/crud-operations/rest');
  });

  it('GraphQL', () => {
    jest.mock('~/shell/crud-operations/graphql/GraphQL', () => ({ name: 'GraphQL', render: h => h('div') }));
    router.push('/en/crud-operations/graphql');
  });
});
