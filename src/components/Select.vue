<template>
  <div>
    <div v-click-outside="onClickOutside" class="select">
      <div
        ref="select"
        class="select-input"
        :class="{
          'select-input-placeholder': !flux.selected,
          'select-input-focus': flux.show,
          'select-input-error': isInvalid || errorMessage,
          'select-input-error-focus': (isInvalid || errorMessage) && flux.show,
          'select-input-disabled': disabled,
        }"
        @click="open($refs.select, $refs.filter, $refs.menu)"
      >
        <template v-if="!flux.selected">
          {{ placeholder }}
        </template>

        <template v-if="flux.selected">
          {{ flux.display(flux.selected) }}
        </template>

        <div
          v-if="value && clearable && !disabled"
          class="select-input-icon select-input-icon-clear"
          @click.stop="flux.clear"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>

        <svg v-if="!flux.show" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill select-input-icon" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>

        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill select-input-icon" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      </div>

      <transition name="menu">
        <div
          v-show="flux.show"
          ref="menu"
          class="select-section"
          :class="{
            'select-section-up': flux.direction === 'up',
          }"
        >
          <div v-if="filterable" class="select-filter">
            <input ref="filter" v-model="flux.filterValue" class="select-filter-input form-control">
          </div>

          <div ref="selectMenu" class="select-menu">
            <div
              v-for="(item, index) in reoptions"
              :ref="(el) => (selectMenuItem[index] = el)"
              :key="item.value"
              class="select-menu-item"
              :class="{
                'select-menu-item-active': value === item.value,
              }"
              @click="flux.onSelect(item.value, item)"
            >
              {{ flux.display(item) }}
            </div>
          </div>

          <div v-if="reoptions.length === 0" class="select-content">
            {{ notFoundContent }}
          </div>
        </div>
      </transition>
    </div>

    <div v-if="errorMessage" class="text-danger mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from '@nuxtjs/composition-api'

import clickOutside from './directives/click-outside'
import getScrollableParent from './utilities/getScrollableParent'

export default {
  directives: {
    clickOutside
  },
  props: {
    value: {
      default: () => null
    },
    options: {
      type: Array,
      default: () => []
    },
    display: {
      type: [String, Function],
      default: () => ''
    },
    placeholder: {
      type: String,
      default: '請選擇'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    notFoundContent: {
      type: String,
      default: '無選項'
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  emits: ['input', 'change'],
  setup (props, { emit }) {
    const flux = reactive({
      show: false,
      direction: 'down',
      selected: '',
      filterValue: '',
      options: null,
      onSelect (value, option) {
        flux.show = false
        emit('input', value)
        emit('change', value, option)
      },
      display (item) {
        if (props.display && typeof props.display === 'string') {
          return item[props.display]
        }

        if (props.display && typeof props.display === 'function') {
          return props.display(item)
        }

        return `${item.value} - ${item.label}`
      },
      clear () {
        emit('input', null)
        emit('change', null, null)
      },

      scrollableParent: ''
    })

    const select = ref()
    const menu = ref()
    const selectMenu = ref()
    const selectMenuItem = ref([])

    const _initOptions = computed(() => props.options)
    const reoptions = computed(() => flux.options || props.options)

    const open = (selectEl, filterEl, menuEl) => {
      if (props.disabled) { return }

      flux.show = !flux.show

      nextTick(() => {
        flux.scrollableParent = getScrollableParent(selectEl)

        const rect = selectEl.getBoundingClientRect()

        menuEl.style.width = `${rect.width}px`
        menuEl.style.left = `${rect.left}px`
        menuEl.style.top = `${rect.bottom}px`

        if (selectMenu.value.scrollWidth > selectMenu.value.offsetWidth) {
          const width = `${selectMenu.value.scrollWidth}px`

          for (let index = 0; index < selectMenuItem.value.length; index++) {
            if (selectMenuItem.value[index]) {
              selectMenuItem.value[index].style.width = width
            }
          }
        } else {
          for (let index = 0; index < selectMenuItem.value.length; index++) {
            if (selectMenuItem.value[index]) {
              selectMenuItem.value[index].style.width = '100%'
            }
          }
        }

        const center = window.innerHeight / 2

        if (rect.top > center) {
          flux.direction = 'up'
        } else {
          flux.direction = 'down'
        }

        const active = menuEl.querySelector('.select-menu-item-active')
        const offsetTop = active?.offsetTop
        if (offsetTop) { selectMenu.value.scrollTop = offsetTop - active.offsetHeight * 2 }

        if (filterEl) { filterEl.focus() }
      })
    }

    const onClickOutside = () => {
      flux.show = false
    }

    watch(
      () => flux.filterValue,
      (val) => {
        const arr = [..._initOptions.value]

        const filter = arr.filter(
          item =>
            item.label.toUpperCase().includes(val.toUpperCase()) ||
            item.value.toUpperCase().includes(val.toUpperCase())
        )

        flux.options = filter
      }
    )

    watch(
      () => props.value,
      (val) => {
        if (val) {
          const arr = [..._initOptions.value]
          const found = arr.find(item => item.value === val)
          flux.selected = found
        } else {
          flux.selected = ''
        }
      },
      { immediate: true }
    )

    const wrapper = computed(() => flux.scrollableParent)

    const handleScroll = () => {
      if (flux.show) {
        const rect = select.value.getBoundingClientRect()
        menu.value.style.width = `${rect.width}px`
        menu.value.style.left = `${rect.left}px`
        menu.value.style.top = `${rect.bottom}px`
      }
    }

    watch(
      () => wrapper.value,
      (el) => {
        el?.addEventListener('scroll', handleScroll)
      }
    )

    onMounted(() => {
      if (wrapper.value && wrapper.value instanceof HTMLElement) {
        wrapper.value?.addEventListener('scroll', handleScroll)
      } else {
        window.addEventListener('scroll', handleScroll)
      }
    })

    onUnmounted(() => {
      if (wrapper.value && wrapper.value instanceof HTMLElement) {
        wrapper.value?.removeEventListener('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    })

    return { select, menu, selectMenu, selectMenuItem, open, flux, onClickOutside, reoptions }
  }
}
</script>

<style lang="scss" scoped>
.menu-enter-active {
  transition: opacity 0.3s ease-out;
}

.menu-leave-active {
  transition: opacity 0.3s ease-in;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.select {
  $border: 1px;
  $height: 40px;
  position: relative;

  &-input {
    cursor: pointer;
    width: auto;
    min-height: 30px;
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    background: #e4ebf0;
    box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    border: 0.0625rem solid #d1d9e6;
    position: relative;
    display: flex;
    align-items: center;
    line-height: 14px;

    &:hover .select-input-icon-clear {
      visibility: visible;
    }

    &-placeholder {
      color: #6c757d;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-focus {
      border: 0.0625rem solid var(--primary);
    }

    &-error {
      border-color: var(--danger);
    }

    &-error-focus {
      border-color: var(--danger);
      // box-shadow: 0 0 0 0.2rem #ccc;
    }

    &-disabled {
      cursor: not-allowed;
      border-radius: 2px;
      color: #c4c4c4 - #555;
      background: #c4c4c4;
      box-shadow: inset 3px 3px 6px #a7a7a7, inset -3px -3px 6px #e1e1e1;
    }

    &-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 1rem;
    }

    &-icon-clear {
      background: #e4ebf0;
      z-index: 100;
      visibility: hidden;
      color: #6c757d;

      &:hover {
        color: #6c757d - #222;
      }
    }
  }

  &-section {
    position: fixed;
    background: #e4ebf0;
    width: 100%;
    z-index: 10;
    font-size: 14px;
    border: 0.0625rem solid #d1d9e6;
    border-radius: 0.55rem;
    box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff;
    transform: translateY(0) translateY(8px) translateY(0);

    &-up {
      // box-shadow: 0 -2px 8px #ccc;
      transform: translateY(-$border) translateY(-$height) translateY(-100%);
    }
  }

  &-filter {
    width: 100%;
    padding: 0.6rem;

    &-input {
      width: 100%;
      padding: 0.1rem 0.6rem;
      font-size: 14px;
      color: #222;
      height: 30px;
      border-radius: 2px;
      background: #e4ebf0;
      box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
      border: 0.0625rem solid #d1d9e6;
      padding: 0 0.75rem;
      outline: none;

      &:focus {
        border: 0.0625rem solid #007bff;
      }
    }
  }

  &-menu {
    background: #e4ebf0;
    width: 100%;
    max-height: 10rem;
    overflow: auto;
    color: rgba(0, 0, 0, 0.85);
    margin: 0.55rem 0;
    text-align: left;
    cursor: pointer;

    &:empty {
      display: none;
    }

    &-item {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      min-height: 32px;
      padding: 5px 12px;

      &:hover {
        background-color: #e4ebf0 - #222;
      }

      &-active {
        color: #fff;
        background-color: var(--primary);
        // background-color: transparent;
        // box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;

        &:hover {
          color: #fff;
          background-color: var(--primary);
          // box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
        }
      }
    }
  }

  &-content {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    min-height: 32px;
    padding: 5px 12px;
  }

  &-error {
    line-height: 16px;
    color: #f46155;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
  }
}
</style>
