<template>
  <div v-click-outside="onClickOutside" class="w-100 input-date">
    <div class="input-date-input-wrapper">
      <input
        ref="input"
        :value="flux.display(modelDate)"
        class="w-100 form-control input-date-input"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        @focus="flux.openPicker"
      />

      <div class="input-date-btn px-2" @click="flux.openPicker">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
          />
        </svg>
      </div>
    </div>

    <MonthPane
      v-show="flux.showDatePicker"
      ref="picker"
      v-model="modelDate"
      v-bind="$attrs"
      class="input-date-picker"
      :class="{ 'input-date-picker-up': flux.direction === 'up' }"
      :disabled="disabled"
      @input="flux.changeDate"
    />

    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  nextTick,
  ref,
  computed,
  reactive,
  watch,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api';

import MonthPane from './components/MonthPane';
import clickOutside from './directives/click-outside';
import getScrollableParent from '~/utilities/getScrollableParent';

let uid = 0;

export default {
  components: {
    MonthPane,
  },
  directives: {
    clickOutside,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    placeholder: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    uid += 1;

    const { proxy: vm } = getCurrentInstance();

    const input = ref();
    const picker = ref();

    const modelDate = computed({
      get: () => {
        emit('input', props.value);
        return props.value;
      },
      set(val) {
        emit('input', val ? vm.$moment(new Date(val)).format(props.format) : '');
      },
    });

    const flux = reactive({
      showDatePicker: false,
      scrollableParent: '',
      direction: '',
      openPicker() {
        flux.showDatePicker = true;

        nextTick(() => {
          flux.scrollableParent = getScrollableParent(picker.value.$el);

          const rect = input.value.getBoundingClientRect();

          // picker.value.showYears = false
          // picker.value.showMonths = false
          // picker.value.showWeeks = true

          // picker.value.currentPeriod = picker.value.getPeriodFromValue(
          //   picker.value.value,
          //   picker.value.format
          // )

          picker.value.$el.style.left = `${rect.left}px`;
          picker.value.$el.style.top = `${rect.bottom}px`;

          const center = window.innerHeight / 2;

          if (rect.top > center) {
            flux.direction = 'up';
          } else {
            flux.direction = 'down';
          }
        });
      },

      changeDate(val) {
        const parm1 = val ? vm.$moment(new Date(val)).format(props.format) : '';
        const parm2 = props.format;
        emit('change', parm1, parm2);
        flux.showDatePicker = false;
      },
      display(val) {
        const date = val ? vm.$moment(new Date(val)).format(props.format) : '';
        return date;
      },
      clear() {
        emit('input', '');
        emit('change', '', props.format);
        flux.showDatePicker = false;
      },
    });

    const displayText = computed(() => modelDate.value);

    const onClickOutside = () => {
      flux.showDatePicker = false;
    };

    const handleScroll = () => {
      if (flux.showDatePicker) {
        const rect = input.value.getBoundingClientRect();
        picker.value.$el.style.left = `${rect.left}px`;
        picker.value.$el.style.top = `${rect.bottom}px`;
      }
    };

    watch(
      () => flux.scrollableParent,
      (el) => {
        el?.addEventListener('scroll', handleScroll);
      },
    );

    onMounted(() => {
      if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
        flux.scrollableParent?.addEventListener('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll);
      }
    });

    onUnmounted(() => {
      if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
        flux.scrollableParent?.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    });

    return {
      uid,
      modelDate,
      flux,
      onClickOutside,
      input,
      picker,
      displayText,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-date {
  $self: &;
  $height: 40px;

  &-input-wrapper {
    display: flex;
    position: relative;

    &:hover #{$self}-icon-clear {
      visibility: visible;
    }
  }

  &-input {
    text-align: inherit;
    height: 30px;
    border-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: #e4ebf0;
    box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    border: 0.0625rem solid #d1d9e6;
    padding: 0 0.75rem;
    outline: none;

    &:focus {
      border: 0.0625rem solid #007bff;
    }

    &:disabled {
      cursor: not-allowed;
      border-radius: 2px;
      color: #c4c4c4 - #555;
      background: #c4c4c4;
      box-shadow: inset 3px 3px 6px #a7a7a7, inset -3px -3px 6px #e1e1e1;
    }
  }

  &-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 1rem;
    height: 30px;
  }

  &-icon-clear {
    margin-right: 40px;
    background: #fff;
    z-index: 100;
    visibility: hidden;
  }

  &-btn {
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid #d1d9e6;
    border-left: 0;
  }

  &-picker {
    position: fixed;
    z-index: 10;
  }

  &-picker-up {
    transform: translateY(-$height) translateY(-100%);
  }
}
</style>
