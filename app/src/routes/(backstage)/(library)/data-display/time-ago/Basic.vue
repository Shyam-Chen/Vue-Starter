<script lang="ts" setup>
import { UseTimeAgo } from '@vueuse/components';
</script>

<template>
  <UseTimeAgo
    v-slot="{ timeAgo }"
    :time="new Date(2021, 0, 1)"
    :messages="{
      justNow: 'just now',
      past: (n) => (n.match(/\d/) ? `${n} ago` : n),
      future: (n) => (n.match(/\d/) ? `in ${n}` : n),
      month: (n, past) =>
        n === 1 ? (past ? 'last month' : 'next month') : `${n} month${n > 1 ? 's' : ''}`,
      year: (n, past) =>
        n === 1 ? (past ? 'last year' : 'next year') : `${n} year${n > 1 ? 's' : ''}`,
      day: (n, past) =>
        n === 1 ? (past ? 'yesterday' : 'tomorrow') : `${n} day${n > 1 ? 's' : ''}`,
      week: (n, past) =>
        n === 1 ? (past ? 'last week' : 'next week') : `${n} week${n > 1 ? 's' : ''}`,
      hour: (n) => `${n} hour${n > 1 ? 's' : ''}`,
      minute: (n) => `${n} minute${n > 1 ? 's' : ''}`,
      second: (n) => `${n} second${n > 1 ? 's' : ''}`,
      invalid: '',
    }"
  >
    Time Ago: {{ timeAgo }}
  </UseTimeAgo>

  <br />

  <UseTimeAgo
    v-slot="{ timeAgo }"
    :time="new Date(2021, 0, 1)"
    :messages="{
      justNow: '剛剛',
      past: (n) => (n.match(/\d/) ? `${n}前` : n),
      future: (n) => (n.match(/\d/) ? `${n}後` : n),
      month: (n, past) => (n === 1 ? (past ? '上個月' : '下個月') : `${n} 個月`),
      year: (n, past) => (n === 1 ? (past ? '去年' : '明年') : `${n} 年`),
      day: (n, past) => (n === 1 ? (past ? '昨天' : '明天') : `${n} 天`),
      week: (n, past) => (n === 1 ? (past ? '上週' : '下週') : `${n} 週${n > 1 ? 's' : ''}`),
      hour: (n) => `${n} 小時`,
      minute: (n) => `${n} 分鐘`,
      second: (n) => `${n} 秒${n > 1 ? 's' : ''}`,
      invalid: '',
    }"
  >
    Time Ago: {{ timeAgo }}
  </UseTimeAgo>
</template>
