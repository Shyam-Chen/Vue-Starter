import router from '~/core/router';

describe('Routes', () => {
  it('TemplateRendering', () => {
    jest.mock('~/shell/guide/template-rendering/TemplateRendering', () => ({
      name: 'TemplateRendering',
      render: h => h('div'),
    }));
    router.push('/guide/template-rendering').catch(() => {});
  });

  it('Props', () => {
    jest.mock('~/shell/guide/components/props/Props', () => ({
      name: 'Props',
      render: h => h('div'),
    }));
    router.push('/guide/components/props').catch(() => {});
  });

  it('Slots', () => {
    jest.mock('~/shell/guide/components/slots/Slots', () => ({
      name: 'Slots',
      render: h => h('div'),
    }));
    router.push('/guide/components/slots').catch(() => {});
  });

  it('Refs', () => {
    jest.mock('~/shell/guide/components/refs/Refs', () => ({
      name: 'Refs',
      render: h => h('div'),
    }));
    router.push('/guide/components/refs').catch(() => {});
  });

  it('CustomEvents', () => {
    jest.mock('~/shell/guide/components/custom-events/CustomEvents', () => ({
      name: 'CustomEvents',
      render: h => h('div'),
    }));
    router.push('/guide/components/custom-events').catch(() => {});
  });

  it('Dynamic', () => {
    jest.mock('~/shell/guide/components/dynamic/Dynamic', () => ({
      name: 'Dynamic',
      render: h => h('div'),
    }));
    router.push('/guide/components/dynamic').catch(() => {});
  });

  it('Recursion', () => {
    jest.mock('~/shell/guide/components/recursion/Recursion', () => ({
      name: 'Recursion',
      render: h => h('div'),
    }));
    router.push('/guide/components/recursion').catch(() => {});
  });

  it('LifecycleHooks', () => {
    jest.mock('~/shell/guide/lifecycle-hooks/LifecycleHooks', () => ({
      name: 'LifecycleHooks',
      render: h => h('div'),
    }));
    router.push('/guide/lifecycle-hooks').catch(() => {});
  });

  it('Transitions', () => {
    jest.mock('~/shell/guide/transitions/Transitions', () => ({
      name: 'Transitions',
      render: h => h('div'),
    }));
    router.push('/guide/transitions').catch(() => {});
  });

  it('Mixins', () => {
    jest.mock('~/shell/guide/mixins/Mixins', () => ({ name: 'Mixins', render: h => h('div') }));
    router.push('/guide/mixins').catch(() => {});
  });

  it('Directives', () => {
    jest.mock('~/shell/guide/directives/Directives', () => ({
      name: 'Directives',
      render: h => h('div'),
    }));
    router.push('/guide/directives').catch(() => {});
  });

  it('DependencyInjection', () => {
    jest.mock('~/shell/guide/dependency-injection/DependencyInjection', () => ({
      name: 'DependencyInjection',
      render: h => h('div'),
    }));
    router.push('/guide/dependency-injection').catch(() => {});
  });

  it('Filters', () => {
    jest.mock('~/shell/guide/filters/Filters', () => ({ name: 'Filters', render: h => h('div') }));
    router.push('/guide/filters').catch(() => {});
  });

  it('DynamicMatching', () => {
    jest.mock('~/shell/guide/routing/dynamic-matching/DynamicMatching', () => ({
      name: 'DynamicMatching',
      render: h => h('div'),
    }));
    router.push('/guide/routing/dynamic-matching').catch(() => {});
  });

  it('UserInfo', () => {
    jest.mock('~/shell/guide/routing/dynamic-matching/UserInfo', () => ({
      name: 'UserInfo',
      render: h => h('div'),
    }));
    router.push('/guide/routing/dynamic-matching/foo').catch(() => {});
  });

  it('NestedRoutes', () => {
    jest.mock('~/shell/guide/routing/nested-routes/NestedRoutes', () => ({
      name: 'NestedRoutes',
      render: h => h('div'),
    }));
    jest.mock('~/shell/guide/routing/nested-routes/Default', () => ({
      name: 'Default',
      render: h => h('div'),
    }));
    router.push('/guide/routing/nested-routes').catch(() => {});
  });

  it('First', () => {
    jest.mock('~/shell/guide/routing/nested-routes/First', () => ({
      name: 'First',
      render: h => h('div'),
    }));
    router.push('/guide/routing/nested-routes/first').catch(() => {});
  });

  it('Second', () => {
    jest.mock('~/shell/guide/routing/nested-routes/Second', () => ({
      name: 'Second',
      render: h => h('div'),
    }));
    router.push('/guide/routing/nested-routes/second').catch(() => {});
  });

  it('Guards', () => {
    jest.mock('~/shell/guide/routing/guards/Guards', () => ({
      name: 'Guards',
      render: h => h('div'),
    }));
    router.push('/guide/routing/guards').catch(() => {});
  });

  it('Guards', () => {
    jest.mock('~/shell/guide/routing/guards/Guards', () => ({
      name: 'Guards',
      render: h => h('div'),
    }));
    router.push('/guide/routing/guards/123').catch(() => {});
  });

  it('StateManagement', () => {
    jest.mock('~/shell/guide/state-management/StateManagement', () => ({
      name: 'StateManagement',
      render: h => h('div'),
    }));
    router.push('/guide/state-management').catch(() => {});
  });
});
