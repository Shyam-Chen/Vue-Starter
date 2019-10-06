import home from '~/landings/home/_languages/zh';
import guideStateManagement from '~/shell/guide/state-management/_languages/zh';
import internationalization from '~/shell/internationalization/_languages/zh';

export default {
  practicalExamples: '实际例子',

  overview: '概观',
  examples: '例子',

  helloWorld: '你好世界',

  guide: '指南',
  templateRendering: '模板渲染',
  components: '组件',
  props: '属性',
  slots: '插槽',
  refs: '引用',
  customEvents: '自定义事件',
  extends: '扩展',
  dynamic: '动态',
  recursion: '递归',
  lifecycleHooks: '生命周期钩子',
  transitions: '过渡',
  mixins: '混入',
  directives: '指令',
  dependencyInjection: '依赖注入',
  filters: '过滤器',
  routing: '路由',
  dynamicMatching: '动态匹配',
  nestedRoutes: '嵌套路由',
  guards: '守卫',
  stateManagement: '状态管理',

  crudOperations: 'CRUD 操作',
  basic: '基本',
  rest: 'REST',
  graphql: 'GraphQL',

  controls: '控件',
  textFields: '文本字段',
  selects: '选择',
  selectionControls: '选择控件',
  pickers: '拾取器',
  autocomplete: '自动完成',
  stepper: '步骤线',
  tabs: '选项卡',
  treeView: '树形视图',
  calendar: '日历',
  markdownEditor: 'Markdown 编辑器',
  richTextEditor: '富文本编辑器',

  dataTable: '数据表',
  displayRows: '显示行',
  inlineEdit: '内联编辑',
  paginator: '分页器',
  iterator: '迭代器',
  exportReport: '导出报告',

  internationalization: '国际化',

  dataVisualization: '数据可视化',

  authorization: '授权',

  payment: '支付',

  messages: '讯息',
  chatRoom: '聊天室',
  email: '电子邮件',
  cloudMessaging: '云消息',

  machineLearning: '机器学习',

  /**
   * modules
   */
  home,
  ...guideStateManagement,
  ...internationalization,
};
