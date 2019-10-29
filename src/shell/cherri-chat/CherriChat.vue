<template>
  <v-container id="cherri-chat" class="shell-container" fluid>
    <div class="wrapper">
      <div class="friend-list">
        <v-list height="100%">
          <v-subheader>好友列表 (3)</v-subheader>

          <template v-for="(friend, index) in friendList">
            <v-list-item :key="index" @click="showMessage(friend)">
              <v-list-item-avatar>
                <v-img :src="friend.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ friend.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ friend.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>

      <div class="message-box">
        <v-toolbar color="blue darken-2">
          <v-toolbar-title>Cherri Chat</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-avatar size="36">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
          </v-avatar>
        </v-toolbar>

        <v-toolbar v-if="isShowMessage">
          <v-avatar size="36">
            <v-img :src="messageInfo.avatar"></v-img>
          </v-avatar>

          <v-toolbar-title class="pl-3">{{ messageInfo.title }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon @click="toggleSearch">
            <v-icon>{{ mdiMagnify }}</v-icon>
          </v-btn>

          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>{{ mdiPlaylistPlus }}</v-icon>
              </v-btn>
            </template>

            <v-list width="300">
              <div class="pa-3">
                <v-textarea label="輸入訊息..."></v-textarea>
                <v-btn block class="mb-3">新增</v-btn>
                <v-divider></v-divider>

                <div class="mt-3 memo">
                  <div class="memo-date">
                    <div>2019/07/01 13:45</div>
                    <v-icon color="#4a90e2">{{ mdiClose }}</v-icon>
                  </div>
                  <div class="memo-text">備忘訊息 1</div>
                </div>

                <div class="mt-3 memo">
                  <div class="memo-date">
                    <div>2019/07/01 13:45</div>
                    <v-icon color="#4a90e2">{{ mdiClose }}</v-icon>
                  </div>
                  <div class="memo-text">備忘訊息 1</div>
                </div>
              </div>
            </v-list>
          </v-menu>
        </v-toolbar>

        <div v-if="!isShowMessage" class="getting-started">
          <img src="https://user-images.githubusercontent.com/13535256/67738898-53630400-fa4b-11e9-8e36-3ea8158f8bca.png">
          <div class="title">開始使用 Cherri Chat！</div>
        </div>

        <div v-if="isShowMessage" class="messages">
          <div v-if="isSearch" class="search">
            <v-text-field v-model="searchValue" label="收尋訊息..." :suffix="searchSuffix" :clear-icon="mdiCloseCircle" clearable></v-text-field>
          </div>

          <div class="content">
            <template v-for="(message, index) in messageInfo.messages">
              <div :key="index" class="round-box">
                <span v-html="highlight(message, searchValue)" class="round"></span>
              </div>
            </template>
          </div>

          <div class="send">
            <v-text-field label="輸入訊息...">
              <v-icon slot="append" color="blue">{{ mdiSend }}</v-icon>
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';
import { mdiMagnify, mdiPlaylistPlus, mdiClose, mdiCloseCircle, mdiSend } from '@mdi/js';

import highlight from './highlight';

export default {
  components: {},
  setup() {
    const state = reactive({
      friendList: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '保羅',
          subtitle: 'Hi Hi',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: '傑克',
          subtitle: 'QQ',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: '安娜',
          subtitle: 'Jyoshimodoki',
        },
      ],
      isShowMessage: false,
      messageInfo: {},
      isSearch: false,
      searchValue: '',
      searchSuffix: '',
    });

    const showMessage = (friend) => {
      state.isShowMessage = true;
      state.messageInfo = friend;

      const messages = new Map()
        .set('保羅', ['保羅', '我潔西卡啦', '我喜歡吃的食物有', '各種巧克力口味的甜點'])
        .set('傑克', ['保羅', '我潔西卡啦', '我喜歡做的運動為', '游泳, 跑步'])
        .set('安娜', ['保羅', '我潔西卡啦', '我喜歡的動物為', '貓, 狗']);

      state.messageInfo.messages = [...messages.get(friend.title)];
    };

    const toggleSearch = () => {
      state.isSearch = !state.isSearch;
    };

    return {
      ...toRefs(state),
      showMessage,
      toggleSearch,
      mdiMagnify,
      mdiPlaylistPlus,
      mdiClose,
      mdiCloseCircle,
      mdiSend,
      highlight,
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  display: flex;
  flex-flow: row;
}

.friend-list {
  width: 300px;
  height: 100%;
}

.message-box {
  width: 100%;
  height: 100%;
}

.getting-started {
  width: 100%;
  height: calc(100% - 64px - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  & > .title {
    padding: 0.5rem;
  }
}

.messages {
  display: flex;
  flex-flow: column;
  position: relative;
  height: 460px;
}

.search {
  padding: 0 1rem;
}

.memo {
  border: 1px solid greenyellow;
  padding: 0.25rem;

  &-date {
    color: #4a90e2;
    display: flex;
    justify-content: space-between;
  }
}

.content {
  position: absolute;
  right: 0;
  bottom: 70px;
}

.round-box {
  margin: 1.25rem;
  text-align: right;
}

.round {
  padding: 0.5rem;
  background: #4a90e2;
  border-radius: 25px;
}

.send {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 1rem;
}
</style>
