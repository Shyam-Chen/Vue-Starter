import home from '~/landings/home/_languages/ja';
import guideStateManagement from '~/shell/guide/state-management/_languages/ja';
import internationalization from '~/shell/internationalization/_languages/ja';

export default {
  practicalExamples: '実用例',

  overview: '概要',
  examples: '実例集',

  helloWorld: 'こんにちは世界',

  guide: 'ガイド',
  templateRendering: 'テンプレートレンダリング',
  components: 'コンポーネント',
  props: 'プロパティ',
  slots: 'スロット',
  refs: 'リファレンス',
  customEvents: 'カスタムイベント',
  extends: '拡張する',
  dynamic: '動的',
  recursion: '再帰',
  lifecycleHooks: 'ライフサイクルフック',
  transitions: 'トランジション',
  mixins: 'ミックスイン',
  directives: '指令',
  dependencyInjection: '依存性注入',
  filters: 'フィルタ',
  routing: 'ルーティング',
  dynamicMatching: 'ダイナミックマッチング',
  nestedRoutes: 'ネストされたルート',
  guards: 'ガード',
  stateManagement: '状態管理',

  crudOperations: 'CRUD 操作',
  basic: 'ベーシック',
  rest: 'REST',
  graphql: 'GraphQL',

  controls: 'コントロール',
  textFields: 'テキストフィールド',
  selects: '選り出す',
  selectionControls: '選択コントロール',
  pickers: 'ピッカー',
  autocomplete: 'オートコンプリート',
  stepper: 'ステップライン',
  tabs: '切り替えタブ',
  treeView: 'ツリー表示',
  calendar: 'カレンダー',
  markdownEditor: 'Markdown エディタ',
  richTextEditor: 'リッチテキストエディタ',

  dataTable: 'データ表',
  displayRows: '行を表示する',
  inlineEdit: 'インライン編集',
  paginator: 'ページネータ',
  iterator: 'イテレータ',
  exportReport: 'レポートのエクスポート',

  internationalization: '国際化',

  dataVisualization: 'データの視覚化',

  authorization: 'オーソライズ',

  payment: '支払い',

  messages: 'メッセージ',
  chatRoom: 'チャットルーム',
  email: 'E メール',
  cloudMessaging: 'クラウドメッセージング',

  machineLearning: '機械学習',

  /**
   * modules
   */
  home,
  ...guideStateManagement,
  ...internationalization,
};
