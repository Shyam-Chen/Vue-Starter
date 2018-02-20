<template>
  <div>
    <h1>Template-driven</h1>

    <md-content class="md-elevation-2">
      <form class="form">
        <div class="row">
          <!-- input -->
          <md-field class="field">
            <label>Nickname</label>
            <md-input v-model="nickname"></md-input>
          </md-field>
          <div class="outputs">
            {{ $td.nickname }}
          </div>
        </div>

        <div class="row">
          <!-- select -->
          <md-field class="field">
            <label for="age">Age</label>
            <md-select v-model="age" name="age" id="age">
              <!-- <md-option value=""><em>None</em></md-option> -->
              <md-option :key="item.value" :value="item.value" v-for="item in $td.listOfage">
                {{ item.label }}
              </md-option>
            </md-select>
          </md-field>
          <div class="outputs">
            {{ $td.age }}
          </div>
        </div>

        <div class="row">
          <div>
            <div class="md-body-2">Gender</div>
            <md-radio v-model="gender" value="Male">Male</md-radio>
            <md-radio v-model="gender" value="Female">Female</md-radio>
            <md-radio v-model="gender" value="Other">Other</md-radio>
          </div>
          <div class="outputs" style="padding-top: 2rem">
            {{ $td.gender }}
          </div>
        </div>

        <div class="row">
          <div class="md-body-2" style="align-self: center">Autoplay</div>
          <div style="margin-left: 1rem">
            <md-switch v-model="autoplay" name="autoplay"></md-switch>
          </div>
          <div class="outputs" style="padding-top: .5rem; text-transform: capitalize">
            {{ $td.autoplay ? $td.autoplay : '' }}
          </div>
        </div>

        <div class="row">
          ...
        </div>
      </form>
    </md-content>
  </div>
</template>

<script>
export const mapModelsToState = (state, keys) => {
  const obj = {};
  const arr = state.split('.');

  for (let i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = {
      get() {
        if (arr.length === 1) {
          return this.$store.state[arr[0]][keys[i]];
        }

        if (arr.length === 2) {
          return this.$store.state[arr[0]][arr[1]][keys[i]];
        }
      },
      set(value) {
        if (arr.length === 1) {
          const module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          this.$store.commit(`update${module}`, { label: [keys[i]], value });
        }

        if (arr.length === 2) {
          const moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
          const moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);

          this.$store.commit(`update${moduleParent}${moduleChild}`, { label: [keys[i]], value });
        }
      }
    };
  }

  return obj;
};

export default {
  computed: {
    $td() {
      return this.$store.state.formControls.templateDriven;
    },
    ...mapModelsToState('formControls.templateDriven', [
      'nickname',
      'age',
      'gender',
      'autoplay'
    ])
  }
};
</script>

<style scoped>
.form {
  padding: 1rem;
  background: #FFFFFF;
}

.row {
  padding: .66rem;
  display: flex;
  flex-direction: row;
}

.field {
  max-width: 10rem;
}

.outputs {
  align-self: center;
  margin: 0 0 .5rem .5rem;
  color: #009688;
}
</style>
