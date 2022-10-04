<template>
  <div class="d-flex align-items-center">
    <DatePicker v-bind="$attrs" :value="value.start" :max-date="value.end" @input="updateStartDate" />
    <span class="mx-2">~</span>
    <DatePicker v-bind="$attrs" :value="value.end" :min-date="value.start" @input="updateEndDate" />
  </div>
</template>

<script>
import DatePicker from './DatePicker'

export default {
  components: {
    DatePicker
  },
  props: {
    value: {
      type: Object,
      default: () => ({ start: '', end: '' })
    }
  },
  emits: ['input'],
  setup (props, { emit }) {
    const updateStartDate = (val) => {
      emit('input', { start: val, end: props.value.end })
    }

    const updateEndDate = (val) => {
      emit('input', { start: props.value.start, end: val })
    }

    return {
      updateStartDate,
      updateEndDate
    }
  }
}
</script>
