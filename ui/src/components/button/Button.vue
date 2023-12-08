<script lang="ts" setup>
import type { ButtonHTMLAttributes, Ref, WritableComputedRef } from 'vue';
import { ref, computed, inject, onMounted } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'large';
  icon?: string;
  disabled?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (evt: 'click', val: Event): void;
}>();

const buttonGroup = inject('ButtonGroup', {
  model: undefined,
  group: undefined,
}) as {
  model?: WritableComputedRef<number>;
  group?: Ref<HTMLDivElement>;
};

const idx = ref(-1);
const self = ref<HTMLButtonElement>();

onMounted(() => {
  if (buttonGroup.group?.value && self.value) {
    idx.value = Array.from(buttonGroup.group.value.children).indexOf(self.value);
  }
});

const hasGroup = computed(() => typeof buttonGroup.model?.value === 'number');

function onClick(evt: Event) {
  emit('click', evt);

  if (hasGroup.value) {
    if (typeof buttonGroup.model?.value === 'number') {
      buttonGroup.model.value = idx.value;
    }
  }
}
</script>

<template>
  <button
    ref="self"
    v-bind="$attrs"
    type="button"
    class="Button"
    :class="{
      contained: hasGroup ? idx === buttonGroup.model?.value : variant === 'contained' || !variant,
      outlined: hasGroup ? idx !== buttonGroup.model?.value : variant === 'outlined',
      text: variant === 'text',
      primary: color === 'primary' || !color,
      secondary: color === 'secondary',
      success: color === 'success',
      danger: color === 'danger',
      warning: color === 'warning',
      info: color === 'info',
      small: size === 'small',
      large: size === 'large',
      icon,
      disabled,
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <div v-if="icon" class="w-4 h-4" :class="icon"></div>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.Button {
  @apply flex justify-center items-center gap-2 px-6 py-2 border rounded uppercase text-sm font-medium;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500/40;

  &.contained {
    @apply text-white hover:text-gray-100 active:text-gray-200 shadow-md hover:shadow-lg;

    &.primary {
      @apply bg-primary-500 hover:bg-primary-600 active:bg-primary-700 border-primary-500;
    }

    &.secondary {
      @apply bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 border-secondary-500;
    }

    &.success {
      @apply bg-success-500 hover:bg-success-600 active:bg-success-700 border-success-500;
    }

    &.danger {
      @apply bg-danger-500 hover:bg-danger-600 active:bg-danger-700 border-danger-500;
    }

    &.warning {
      @apply bg-warning-500 hover:bg-warning-600 active:bg-warning-700 border-warning-500;
    }

    &.info {
      @apply bg-info-500 hover:bg-info-600 active:bg-info-700 border-info-500;
    }
  }

  &.outlined {
    @apply border-current bg-transparent;
  }

  &.text {
    @apply border-transparent bg-transparent;
  }

  &.outlined,
  &.text {
    &.primary {
      @apply text-primary-500 hover:text-primary-600 active:text-primary-700;
      @apply hover:bg-primary-400/25 active:bg-primary-500/25;
    }

    &.secondary {
      @apply text-secondary-500 hover:text-secondary-600 active:text-secondary-700;
      @apply hover:bg-secondary-400/25 active:bg-secondary-500/25;
    }

    &.success {
      @apply text-success-500 hover:text-success-600 active:text-success-700;
      @apply hover:bg-success-400/25 active:bg-success-500/25;
    }

    &.danger {
      @apply text-danger-500 hover:text-danger-600 active:text-danger-700;
      @apply hover:bg-danger-400/25 active:bg-danger-500/25;
    }

    &.warning {
      @apply text-warning-500 hover:text-warning-600 active:text-warning-700;
      @apply hover:bg-warning-400/25 active:bg-warning-500/25;
    }

    &.info {
      @apply text-info-500 hover:text-info-600 active:text-info-700;
      @apply hover:bg-info-400/25 active:bg-info-500/25;
    }
  }

  &.small {
    @apply px-4 text-xs;
  }

  &.large {
    @apply px-7 text-base;
  }

  &.icon {
    @apply p-0 rounded-full w-38px h-38px overflow-hidden;
  }

  &.disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}
</style>
