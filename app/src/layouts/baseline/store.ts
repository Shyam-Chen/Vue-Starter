import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

import type { Link } from './links-list';
import listOfLinks from './links-list';

export default defineStore('/layouts/baseline', () => {
  const state = reactive({
    userLoading: true,
    listOfLinks,

    navMode: 'wide' as 'wide' | 'slim',
    navSidebar: true,
  });

  const actions = readonly({
    changeStatus(name: Link['name'], level: Link['level']) {
      for (const item of state.listOfLinks) {
        if (item.name === name && item.level === level) {
          item.status = !item.status;
          break;
        } else if (item.sub) {
          actions.changeStatusInSub(item.sub, name, level);
        }
      }
    },
    changeStatusInSub(subItems: Link['sub'], name: Link['name'], level: Link['level']) {
      for (const subItem of subItems || []) {
        if (subItem.name === name && subItem.level === level) {
          subItem.status = !subItem.status;
          break;
        } else if (subItem.sub) {
          actions.changeStatusInSub(subItem.sub, name, level);
        }
      }
    },
  });

  return { state, actions };
});
