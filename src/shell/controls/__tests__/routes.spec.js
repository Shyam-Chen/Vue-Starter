import router from '~/core/router';

describe('Routes', () => {
  it('TextFields', () => {
    jest.mock('~/shell/controls/text-fields/TextFields', () => ({
      name: 'TextFields',
      render: h => h('div'),
    }));
    router.push('/en/controls/text-fields');
  });

  it('Selects', () => {
    jest.mock('~/shell/controls/selects/Selects', () => ({
      name: 'Selects',
      render: h => h('div'),
    }));
    router.push('/en/controls/selects');
  });

  it('SelectionControls', () => {
    jest.mock('~/shell/controls/selection-controls/SelectionControls', () => ({
      name: 'SelectionControls',
      render: h => h('div'),
    }));
    router.push('/en/controls/selection-controls');
  });

  it('Pickers', () => {
    jest.mock('~/shell/controls/pickers/Pickers', () => ({
      name: 'Pickers',
      render: h => h('div'),
    }));
    router.push('/en/controls/pickers');
  });

  it('Autocomplete', () => {
    jest.mock('~/shell/controls/autocomplete/Autocomplete', () => ({
      name: 'Autocomplete',
      render: h => h('div'),
    }));
    router.push('/en/controls/autocomplete');
  });

  it('Stepper', () => {
    jest.mock('~/shell/controls/stepper/Stepper', () => ({
      name: 'Stepper',
      render: h => h('div'),
    }));
    router.push('/en/controls/stepper');
  });

  it('TreeView', () => {
    jest.mock('~/shell/controls/tree-view/TreeView', () => ({
      name: 'TreeView',
      render: h => h('div'),
    }));
    router.push('/en/controls/tree-view');
  });

  it('Calendar', () => {
    jest.mock('~/shell/controls/calendar/Calendar', () => ({
      name: 'Calendar',
      render: h => h('div'),
    }));
    router.push('/en/controls/calendar');
  });

  it('MarkdownEditor', () => {
    jest.mock('~/shell/controls/markdown-editor/MarkdownEditor', () => ({
      name: 'MarkdownEditor',
      render: h => h('div'),
    }));
    router.push('/en/controls/markdown-editor');
  });
});
