<template>
  <v-container fluid>
    <div class="headline">Chat Room (TODO)</div>

    <div>
      User: Anna Account: anna@gmail.com Password: anna200
    </div>

    <div>
      User: Jojo Account: jojo@gmail.com Password: jojo500
    </div>

    <div>
      User: Joanna Account: joanna@gmail.com Password: joanna700
    </div>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Channel</v-toolbar-title>
          </v-toolbar>

          <div class="pa-2">
            <div class="chat chat-left pa-1">
              <div class="circle"></div>
              <div class="message pa-2">
                Hello<br />
                Hello<br />
                Hello<br />
                Hello<br />
                Hello<br />
                Hello<br />
              </div>
            </div>

            <div class="chat chat-right pa-1">
              <div class="circle"></div>
              <div class="message pa-2">
                Hi C DDDsdsfdskjhfjsdhkfjhsjk<br />
                Hi<br />
                Hi<br />
                Hi<br />
                Hi<br />
                Hi<br />
              </div>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @flow

export default {};
</script>

<style scoped>
.chat {
  display: flex;
  flex-flow: row;
  align-items: flex-start;
}

.circle {
  width: 5rem;
  height: 5rem;
  background: pink;
  border-radius: 50%;
}

.chat-left {
  & .message::before {
    position: absolute;
    top: 18.5px; /* 37 / 2 */
    left: 0;
    width: 0;
    height: 0;
    margin-top: -8px;
    margin-left: -8px;
    border: 8px solid transparent;
    border-right-color: pink;
    border-left: 0;
    content: '';
  }
}

.message {
  position: relative;
  box-sizing: border-box;
  width: auto;
  max-width: 22rem;
  margin: 16.5px 1rem auto 1rem;
  background: pink;
  border-radius: 8px;
}

.chat-right {
  flex-flow: row-reverse;
  justify-content: flex-start;

  & .message::after {
    position: absolute;
    top: 18.5px; /* 37 / 2 */
    right: 0;
    width: 0;
    height: 0;
    margin-top: -8px;
    margin-right: -8px;
    border: 8px solid transparent;
    border-right: 0;
    border-left-color: pink;
    content: '';
  }
}
</style>
