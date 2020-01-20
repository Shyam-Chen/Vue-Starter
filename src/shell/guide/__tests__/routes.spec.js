import router from '~/core/router';

describe('Routes', () => {
  it('TemplateRendering', () => {
    jest.mock('~/shell/guide/template-rendering/TemplateRendering', () => ({
      name: 'TemplateRendering',
      render: h => h('div'),
    }));
    router.push('/en/guide/template-rendering');
  });

  it('Props', () => {
    jest.mock('~/shell/guide/components/props/Props', () => ({
      name: 'Props',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/props');
  });

  it('Slots', () => {
    jest.mock('~/shell/guide/components/slots/Slots', () => ({
      name: 'Slots',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/slots');
  });

  it('Refs', () => {
    jest.mock('~/shell/guide/components/refs/Refs', () => ({
      name: 'Refs',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/refs');
  });

  it('CustomEvents', () => {
    jest.mock('~/shell/guide/components/custom-events/CustomEvents', () => ({
      name: 'CustomEvents',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/custom-events');
  });

  it('Dynamic', () => {
    jest.mock('~/shell/guide/components/dynamic/Dynamic', () => ({
      name: 'Dynamic',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/dynamic');
  });

  it('Recursion', () => {
    jest.mock('~/shell/guide/components/recursion/Recursion', () => ({
      name: 'Recursion',
      render: h => h('div'),
    }));
    router.push('/en/guide/components/recursion');
  });

  it('LifecycleHooks', () => {
    jest.mock('~/shell/guide/lifecycle-hooks/LifecycleHooks', () => ({
      name: 'LifecycleHooks',
      render: h => h('div'),
    }));
    router.push('/en/guide/lifecycle-hooks');
  });

  it('Transitions', () => {
    jest.mock('~/shell/guide/transitions/Transitions', () => ({
      name: 'Transitions',
      render: h => h('div'),
    }));
    router.push('/en/guide/transitions');
  });

  it('Mixins', () => {
    jest.mock('~/shell/guide/mixins/Mixins', () => ({ name: 'Mixins', render: h => h('div') }));
    router.push('/en/guide/mixins');
  });

  it('Directives', () => {
    jest.mock('~/shell/guide/directives/Directives', () => ({
      name: 'Directives',
      render: h => h('div'),
    }));
    router.push('/en/guide/directives');
  });

  it('DependencyInjection', () => {
    jest.mock('~/shell/guide/dependency-injection/DependencyInjection', () => ({
      name: 'DependencyInjection',
      render: h => h('div'),
    }));
    router.push('/en/guide/dependency-injection');
  });

  it('Filters', () => {
    jest.mock('~/shell/guide/filters/Filters', () => ({ name: 'Filters', render: h => h('div') }));
    router.push('/en/guide/filters');
  });

  it('DynamicMatching', () => {
    jest.mock('~/shell/guide/routing/dynamic-matching/DynamicMatching', () => ({
      name: 'DynamicMatching',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/dynamic-matching');
  });

  it('UserInfo', () => {
    jest.mock('~/shell/guide/routing/dynamic-matching/UserInfo', () => ({
      name: 'UserInfo',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/dynamic-matching/foo');
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
    router.push('/en/guide/routing/nested-routes');
  });

  it('First', () => {
    jest.mock('~/shell/guide/routing/nested-routes/First', () => ({
      name: 'First',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/nested-routes/first');
  });

  it('Second', () => {
    jest.mock('~/shell/guide/routing/nested-routes/Second', () => ({
      name: 'Second',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/nested-routes/second');
  });

  it('Guards', () => {
    jest.mock('~/shell/guide/routing/guards/Guards', () => ({
      name: 'Guards',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/guards');
  });

  it('Guards', () => {
    jest.mock('~/shell/guide/routing/guards/Guards', () => ({
      name: 'Guards',
      render: h => h('div'),
    }));
    router.push('/en/guide/routing/guards/123');
  });

  it('StateManagement', () => {
    jest.mock('~/shell/guide/state-management/StateManagement', () => ({
      name: 'StateManagement',
      render: h => h('div'),
    }));
    router.push('/en/guide/state-management');
  });
});
