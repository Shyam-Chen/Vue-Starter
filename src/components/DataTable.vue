<template>
  <div class="data-table">
    <div class="px-4 pt-4 pb-2 d-flex justify-content-between">
      <div>{{ title }}</div>
      <Button primary style="width: 9rem;" @click="flux.add">
        新增
      </Button>
    </div>

    <div class="data-table-container">
      <table class="data-table-table">
        <thead>
          <tr>
            <th
              v-for="column in columnsRef"
              :key="column.key"
              :style="{
                cursor: column.sortable ? 'pointer' : 'auto',
                width: column.width ? column.width : 'auto'
              }"
              @click="flux.sort(column)"
            >
              <div class="d-flex align-items-center">
                <div>
                  {{ column.name }}
                </div>

                <div v-if="column.sortable" class="d-flex flex-column">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-up-fill ml-1" :class="{ active: flux.sortKey === column.key && flux.sortDirection === 'ASC' }" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-down-fill mt-n1 ml-1" :class="{ active: flux.sortKey === column.key && flux.sortDirection === 'DESC' }" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </th>

            <th style="width: 200.38px; position: sticky; right: 0;">
              操作
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in dataSourceRef" :key="index" @mouseenter="flux.rowHover = index" @mouseleave="flux.rowHover = -1">
            <td v-for="column in columnsRef" :key="column.key">
              <slot :name="column.key" :item="item" :index="index">
                {{ item[column.key] }}
              </slot>
            </td>

            <td class="d-flex data-table-actions" :class="{ 'data-table-actions-hover': flux.rowHover === index }">
              <Button info @click="flux.edit(item)">
                編輯
              </Button>
              <Button danger class="ml-3" @click="flux.remove(item)">
                刪除
              </Button>
            </td>
          </tr>

          <tr v-if="!dataSourceRef.length">
            <td :colspan="columnsRef.length + 1" class="text-center">
              無資料
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex align-items-center px-4 py-3 data-table-pagination">
      <div class="d-flex align-items-center">
        每頁筆數：
        <div style="width: 5rem;">
          <Select v-model="flux.rowsPerPage" :options="flux.rowsPerPageOptions" display="label" width="5rem" />
        </div>
      </div>

      <div class="ml-4 d-flex align-items-center">
        第
        <div class="mx-1" style="width: 5rem;">
          <Select v-model="flux.currentPage" :options="flux.currentPageOptions" display="label" width="5rem" />
        </div>
        頁 / 共 {{ flux.totalPage }} 頁，共 {{ dataCount }} 筆
      </div>

      <div class="ml-4 data-table-pagination-arrow" @click="flux.previousPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
        上一頁
      </div>

      <div class="ml-4 data-table-pagination-arrow" @click="flux.nextPage">
        下一頁
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch } from '@nuxtjs/composition-api'

import Button from './Button'
import Select from './Select'

let uid = 0

export default {
  components: {
    Button,
    Select
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataCount: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'add', 'edit', 'remove'],
  setup (props, { emit }) {
    uid += 1

    const dataSourceRef = computed(() => props.dataSource || [])
    const columnsRef = computed(() => props.columns?.map(item => ({ ...item, sortable: typeof item.sortable === 'boolean' ? item.sortable : true })) || [])

    const createOptions = (num) => {
      function range (start, end, step = 1) {
        return Array((end - start) / step + 1).fill(0).map((v, i) => start + i * step)
      }

      return range(1, num).map(item => ({ label: String(item), value: item }))
    }

    const flux = reactive({
      rowHover: -1,

      rowsPerPage: 20,
      rowsPerPageOptions: [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '30', value: 30 },
        { label: '50', value: 50 }
      ],

      currentPage: 1,
      currentPageOptions: [{ label: '1', value: 1 }],
      totalPage: 1,

      add () {
        emit('add')
      },
      edit (item) {
        emit('edit', item)
      },
      remove (item) {
        emit('remove', item)
      },

      sortKey: undefined,
      sortDirection: undefined,
      sort (column) {
        if (!column.sortable || !dataSourceRef.value.length) { return }

        if (!flux.sortDirection) {
          flux.sortKey = column.key
          flux.sortDirection = 'ASC'
        } else if (flux.sortDirection === 'ASC') {
          flux.sortKey = column.key
          flux.sortDirection = 'DESC'
        } else if (flux.sortDirection === 'DESC') {
          flux.sortKey = undefined
          flux.sortDirection = undefined
        }

        emit('change', {
          rowsPerPage: flux.rowsPerPage,
          currentPage: flux.currentPage,
          sortKey: flux.sortKey,
          sortDirection: flux.sortDirection
        })
      },

      previousPage () {
        if (flux.currentPage === 1) { return }
        flux.currentPage -= 1
      },
      nextPage () {
        if (flux.currentPage === flux.totalPage) { return }
        flux.currentPage += 1
      }
    })

    watch(() => props.dataCount, (val) => {
      if (val) {
        flux.currentPage = 1
        flux.totalPage = Math.ceil(val / flux.rowsPerPage)
        flux.currentPageOptions = createOptions(flux.totalPage)
      }
    })

    watch(() => flux.rowsPerPage, (val) => {
      flux.totalPage = Math.ceil(props.dataCount / val)
      flux.currentPageOptions = createOptions(flux.totalPage)
      emit('change', {
        rowsPerPage: val,
        currentPage: flux.currentPage,
        sortDirection: flux.sortDirection,
        sortKey: flux.sortKey
      })
    })

    watch(() => flux.currentPage, (val) => {
      emit('change', {
        rowsPerPage: flux.rowsPerPage,
        currentPage: val,
        sortDirection: flux.sortDirection,
        sortKey: flux.sortKey
      })
    })

    return {
      uid,
      dataSourceRef,
      columnsRef,
      flux
    }
  }
}
</script>

<style lang="scss" scoped>
.data-table {
  width: 100%;
  border-radius: 0.55rem;
  background: #e4ebf0;
  box-shadow: 7px 7px 13px #c2c8cc, -7px -7px 13px #ffffff;

  &-container {
    overflow: auto;
    width: 100%;
    max-height: 32rem;
    border-radius: 0.55rem;
  }

  &-table {
    width: 100%;
  }

  & thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #e4ebf0;
    font-weight: bold;
  }

  & thead th,
  & tbody td {
    padding: 1rem;
    vertical-align: middle;
    white-space: nowrap;
  }

  & tbody tr:hover {
    background: #e4ebf0 - #111;
  }

  & tbody td {
    border-top: 0.0625rem solid #d1d9e6;
  }

  &-actions {
    position: sticky;
    top: auto;
    right: 0;
    z-index: 1;
    background: #e4ebf0;
    border-left: 0.0625rem solid #d1d9e6;
  }

  &-actions-hover {
    background: #e4ebf0 - #111;
  }

  &-pagination {
    background: #e4ebf0;
    border-top: 0.0625rem solid #d1d9e6;
    border-radius: 0.55rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &-pagination-arrow {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    background: #e4ebf0;

    &:active {
      box-shadow: inset 3px 3px 6px #c2c8cc, inset -3px -3px 6px #ffffff;
    }
  }
}

.active {
  fill: var(--primary);
}
</style>
