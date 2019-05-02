<template>
  <v-container id="markdown-editor" class="shell-container" fluid>
    <v-layout row fill-height justify-space-between>
      <v-flex xs6>
        <textarea v-model="source" class="pa-3 markdown-editor"></textarea>
      </v-flex>

      <v-flex xs6>
        <Markdown :source="source" class="ml-3 pa-3 markdown-view" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Markdown from 'vue-markdown';

export default {
  components: {
    Markdown,
  },
  data() {
    return {
      source: '# h1 Heading 8-)\n<h2> h2 Heading by HTML</h2>\n**This is bold text**\n*This is italic text*\n~~Strikethrough~~',
    };
  },
};
</script>

<style scoped>
.markdown-editor {
  width: 100%;
  height: 100%;
  border: 1px solid #009688;
  border-radius: 2px;
  resize: none;
}

.markdown-view {
  height: 100%;
  border: 1px solid #009688;
  border-radius: 2px;
}
</style>
