<script lang="ts" setup>
import { getWeek, getISOWeek, setYear, setWeek, startOfWeek, endOfWeek, format } from 'date-fns';

defineProps<{
  value?: [number, number]; // [2022, 53]
}>();

console.log('getWeek =', getWeek(new Date('2022-12-25')), getWeek(new Date('2023-01-01')));
console.log('getISOWeek =', getISOWeek(new Date('2022-12-25')), getISOWeek(new Date('2023-01-01')));

const year = 2022;
const week = 53;

const y = setYear(new Date(), year);
const w = setWeek(y, week);

console.log(format(startOfWeek(w), 'yyyy/MM/dd'));
console.log(format(endOfWeek(w), 'yyyy/MM/dd'));
</script>

<template>
  <div></div>
</template>
