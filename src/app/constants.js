export const INITIAL = {
  drawer: null,
  navigation: [
    { icon: 'contacts', text: 'Contacts' },
    { icon: 'history', text: 'Frequently contacted' },
    { icon: 'content_copy', text: 'Duplicates' },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Labels',
      model: false,
      children: [
        { icon: 'add', text: 'Create label' },
      ],
    },
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'More',
      model: false,
      children: [
        { icon: 'history', text: 'Import' },
        { icon: 'history', text: 'Export' },
        { icon: 'history', text: 'Print' },
        { icon: 'history', text: 'Undo changes' },
        { icon: 'history', text: 'Other contacts' },
      ],
    },
    { icon: 'settings', text: 'Settings' },
    { icon: 'chat_bubble', text: 'Send feedback' },
    { icon: 'help', text: 'Help' },
    { icon: 'phonelink', text: 'App downloads' },
    { icon: 'keyboard', text: 'Go to the old version' },
  ],
};
