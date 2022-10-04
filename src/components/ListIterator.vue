<template>
  <div class="d-flex flex-column">
    <div v-for="(item, index) in listValue" :key="index" class="d-flex align-items-start">
      <slot v-if="index === 0" name="head" />
      <div v-if="index > 0" style="padding-right: calc(13px + 0.5rem);" />

      <div class="d-flex align-items-baseline" :class="{ 'mt-2': index > 0 }">
        <slot name="body" :item="item" :index="index" />
        <Button v-if="index === 0" type="circle" primary class="ml-2" :disabled="disabled" @click="flux.add">
          +
        </Button>
        <Button v-if="index > 0" type="circle" danger class="ml-2" :disabled="disabled" @click="flux.remove(index)">
          -
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@nuxtjs/composition-api'

import Button from './Button'

export default {
  components: {
    Button
  },
  props: {
    value: {
      type: Array,
      default: () => [{}]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  setup (props, { emit }) {
    const listValue = computed({
      get: () => {
        const val = props.value || [{}]
        emit('input', val)
        return val
      },
      set: val => emit('input', val)
    })

    const flux = reactive({
      add () {
        emit('input', [...props.value, {}])
      },
      remove (idx) {
        const arr = [...props.value]
        arr.splice(idx, 1)
        emit('input', arr)
      }
    })

    return {
      listValue,
      flux
    }
  }
}
</script>
