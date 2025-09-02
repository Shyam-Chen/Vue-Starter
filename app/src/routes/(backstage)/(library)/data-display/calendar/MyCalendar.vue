<script lang="ts" setup>
import type { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { XButton, XCard } from '@x/ui';
import { computed, ref, useTemplateRef, watch } from 'vue';

const colorCycle = [
  'bg-red-500 hover:bg-red-600',
  'bg-cyan-500 hover:bg-cyan-600',
  'bg-orange-500 hover:bg-orange-600',
  'bg-green-500 hover:bg-green-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-yellow-500 hover:bg-yellow-600',
  'bg-blue-500 hover:bg-blue-600',
];

const year = new Date().getFullYear();
const month = new Date().getMonth();

const calendar = useTemplateRef('calendar');

const events = ref(
  [
    {
      title: 'Event A',
      start: new Date(year, month, 2),
      end: new Date(year, month, 5 + 1),
      allDay: true,
    },
    {
      title: 'Event B',
      start: new Date(year, month, 5),
      end: new Date(year, month, 10 + 1),
      allDay: true,
    },
    {
      title: 'Event C',
      start: new Date(year, month, 7),
      end: new Date(year, month, 8 + 1),
      allDay: true,
    },
    {
      title: 'Event D',
      start: new Date(year, month, 8, 9, 0, 0),
      end: new Date(year, month, 8, 10, 0, 0),
      allDay: false,
    },
    {
      title: 'Event E',
      start: new Date(year, month, 12, 12, 0, 0),
      end: new Date(year, month, 12, 13, 0, 0),
      allDay: false,
    },
    {
      title: 'Event F',
      start: new Date(year, month, 12),
      end: new Date(year, month, 14 + 1),
      allDay: true,
    },
    {
      title: 'Event G',
      start: new Date(year, month, 14),
      end: new Date(year, month, 16 + 1),
      allDay: true,
    },
    {
      title: 'Event H',
      start: new Date(year, month, 14, 14, 30),
      end: new Date(year, month, 14, 16, 0),
      allDay: false,
    },
    {
      title: 'Event I',
      start: new Date(year, month, 14, 15, 30),
      end: new Date(year, month, 14, 16, 30),
      allDay: false,
    },
    {
      title: 'Event J',
      start: new Date(year, month, 14, 15, 30),
      end: new Date(year, month, 14, 16, 30),
      allDay: false,
    },
    {
      title: 'Event K',
      start: new Date(year, month, 14, 15, 30),
      end: new Date(year, month, 14, 16, 30),
      allDay: false,
    },
    {
      title: 'Event L',
      start: new Date(year, month, 20),
      end: new Date(year, month, 22 + 1),
      allDay: true,
    },
    {
      title: 'Event M',
      start: new Date(year, month, 21),
      end: new Date(year, month, 23 + 1),
      allDay: true,
    },
    {
      title: 'Event N',
      start: new Date(year, month, 21),
      end: new Date(year, month, 26 + 1),
      allDay: true,
    },
    {
      title: 'Event O',
      start: new Date(year, month, 22),
      end: new Date(year, month, 24 + 1),
      allDay: true,
    },
    {
      title: 'Event P',
      start: new Date(year, month, 22),
      end: new Date(year, month, 25 + 1),
      allDay: true,
    },
    {
      title: 'Event Q',
      start: new Date(year, month, 24),
      end: new Date(year, month, 25 + 1),
      allDay: true,
    },
    {
      title: 'Event R',
      start: new Date(year, month, 27),
      end: new Date(year, month, 29 + 1),
      allDay: true,
    },
    {
      title: 'Event S',
      start: new Date(year, month, 27),
      end: new Date(year, month, 30 + 1),
      allDay: true,
    },
    {
      title: 'Event T',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event U',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event V',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event W',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event X',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event Y',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
    {
      title: 'Event Z',
      start: new Date(year, month, 28, 9, 0),
      end: new Date(year, month, 28, 12, 0),
      allDay: false,
    },
  ].map((event, index) => ({
    ...event,
    className: `p-0 my-0.5 ${colorCycle[index % colorCycle.length]} text-white border-none`,
  }))
);

const title = ref('');

const calendarOptions = computed<CalendarOptions>(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events.value,
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  buttonText: {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
  },
  allDayText: 'All Day',
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true,
    meridiem: true,
  },
  datesSet(dateInfo) {
    title.value = dateInfo.view.title;
  },
}));

function onToday() {
  if (!calendar.value) return;
  const calendarApi = calendar.value.getApi();
  calendarApi.today();
}

function onPrev() {
  if (!calendar.value) return;
  const calendarApi = calendar.value.getApi();
  calendarApi.prev();
}

function onNext() {
  if (!calendar.value) return;
  const calendarApi = calendar.value.getApi();
  calendarApi.next();
}

const viewMode = ref(0);

const viewModeMap = new Map([
  [0, 'dayGridMonth'],
  [1, 'timeGridWeek'],
  [2, 'timeGridDay'],
]);

watch(viewMode, (val) => {
  if (!calendar.value) return;
  const calendarApi = calendar.value.getApi();
  calendarApi.changeView(viewModeMap.get(val)!);
});
</script>

<template>
  <XCard>
    <div class="flex items-center">
      <div class="flex items-center">
        <XButton label="Today" variant="outlined" @click="onToday" />

        <div class="ms-4 flex items-center gap-1">
          <XButton icon="i-material-symbols-chevron-left-rounded" variant="text" @click="onPrev" />
          <XButton icon="i-material-symbols-chevron-right-rounded" variant="text" @click="onNext" />
        </div>
      </div>

      <div class="text-center text-2xl font-semibold flex-1">{{ title }}</div>

      <div>
        <XButton.Group v-model="viewMode">
          <XButton label="Month" />
          <XButton label="Week" />
          <XButton label="Day" />
        </XButton.Group>
      </div>
    </div>

    <FullCalendar ref="calendar" :options="calendarOptions" class="FullCalendar">
      <template #eventContent="arg">
        <div class="flex items-center">
          <div
            v-if="!arg.event.allDay"
            class="ms-1 size-1.5 min-w-1.5 min-h-1.5 bg-white rounded-full"
          ></div>
          <div class="ps-1 truncate">{{ arg.event.title }}</div>
        </div>
      </template>
    </FullCalendar>
  </XCard>
</template>

<style lang="scss" scoped>
.FullCalendar :deep(.fc-daygrid-day-frame) {
  min-height: 102.4px !important;
}
</style>
