<script lang="ts" setup>
import { XChart } from '@x/ui';
import type { EChartsOption } from 'echarts';
import { BarChart, LineChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { computed } from 'vue';

use([LineChart, BarChart]);

const overviewOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        type: 'line',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        smooth: true,
        data: [40, 68, 86, 74, 56, 60, 87],
      },
      {
        type: 'line',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        smooth: true,
        data: [65, 78, 66, 44, 56, 67, 75],
      },
    ],
  };
});

const performanceOption = computed<EChartsOption>(() => {
  return {
    legend: {
      bottom: '2.5%',
      data: ['2021', '2022'],
    },
    grid: {
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        type: 'bar',
        name: '2021',
        itemStyle: { color: '#6366f1' },
        data: [27, 68, 86, 74, 10, 4, 87],
      },
      {
        type: 'bar',
        name: '2022',
        itemStyle: { color: '#ec4899' },
        data: [30, 78, 56, 34, 100, 45, 13],
      },
    ],
  };
});
</script>

<template>
  <h1 class="text-4xl font-extrabold">Dashboard</h1>

  <div class="grid grid-cols-4 md:grid-cols-8 gap-4 my-8">
    <div
      class="col-span-4 md:col-span-2 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded xl:mb-0 shadow-lg"
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-zinc-400 uppercase font-bold text-xs">TRAFFIC</h5>
            <span class="font-semibold text-xl text-zinc-700 dark:text-zinc-300">350,897</span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
            >
              <div class="i-fa-bar-chart"></div>
            </div>
          </div>
        </div>
        <p class="text-sm text-zinc-400 mt-4">
          <span class="mr-2 text-emerald-500">
            <span class="i-fa-arrow-up inline-flex align-middle"></span>
            3.48%
          </span>
          <span class="whitespace-nowrap">Since last month</span>
        </p>
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-2 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded xl:mb-0 shadow-lg"
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-zinc-400 uppercase font-bold text-xs">NEW USERS</h5>
            <span class="font-semibold text-xl text-zinc-700 dark:text-zinc-300">2,356</span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
            >
              <div class="i-fa-pie-chart"></div>
            </div>
          </div>
        </div>
        <p class="text-sm text-zinc-400 mt-4">
          <span class="mr-2 text-red-500">
            <span class="i-fa-arrow-down inline-flex align-middle"></span>
            3.48%
          </span>
          <span class="whitespace-nowrap">Since last week</span>
        </p>
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-2 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded xl:mb-0 shadow-lg"
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-zinc-400 uppercase font-bold text-xs">SALES</h5>
            <span class="font-semibold text-xl text-zinc-700 dark:text-zinc-300">924</span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"
            >
              <div class="i-fa-users"></div>
            </div>
          </div>
        </div>
        <p class="text-sm text-zinc-400 mt-4">
          <span class="mr-2 text-orange-500">
            <span class="i-fa-arrow-down inline-flex align-middle"></span>
            1.10%
          </span>
          <span class="whitespace-nowrap">Since yesterday</span>
        </p>
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-2 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 rounded xl:mb-0 shadow-lg"
    >
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-zinc-400 uppercase font-bold text-xs">PERFORMANCE</h5>
            <span class="font-semibold text-xl text-zinc-700 dark:text-zinc-300">49,65%</span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500"
            >
              <div class="i-fa-percent"></div>
            </div>
          </div>
        </div>
        <p class="text-sm text-zinc-400 mt-4">
          <span class="mr-2 text-emerald-500">
            <span class="i-fa-arrow-up inline-flex align-middle"></span>
            12%
          </span>
          <span class="whitespace-nowrap">Since last month</span>
        </p>
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-5 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-zinc-400 mb-1 text-xs font-semibold">OVERVIEW</h6>
            <h2 class="text-zinc-700 dark:text-zinc-300 text-xl font-semibold">Sales value</h2>
          </div>
        </div>
      </div>

      <div class="p-4">
        <XChart :option="overviewOption" class="w-full h-100" />
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-3 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-zinc-400 mb-1 text-xs font-semibold">Performance</h6>
            <h2 class="text-zinc-700 dark:text-zinc-300 text-xl font-semibold">Total orders</h2>
          </div>
        </div>
      </div>

      <div class="p-4">
        <XChart :option="performanceOption" class="w-full h-100" />
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-5 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-zinc-700 dark:text-zinc-300">Page visits</h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 ltr:text-right rtl:text-left"
          >
            <button
              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              See all
            </button>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Page name
              </th>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Visitors
              </th>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Unique users
              </th>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Bounce rate
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                /argon/
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                4,569
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                340
              </td>
              <td
                class="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="i-fa-arrow-up text-emerald-500 mr-4"></div>
                46,53%
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                /argon/index.html
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                3,985
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                319
              </td>
              <td
                class="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="i-fa-arrow-down text-orange-500 mr-4"></div>
                46,53%
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                /argon/charts.html
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                3,513
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                294
              </td>
              <td
                class="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="i-fa-arrow-down text-orange-500 mr-4"></div>
                36,49%
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                /argon/tables.html
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                2,050
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                147
              </td>
              <td
                class="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="i-fa-arrow-up text-emerald-500 mr-4"></div>
                50,87%
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                /argon/profile.html
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                1,795
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                190
              </td>
              <td
                class="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="i-fa-arrow-down text-red-500 mr-4"></div>
                46,53%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="col-span-4 md:col-span-3 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-zinc-700 dark:text-zinc-300">Social traffic</h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 ltr:text-right rtl:text-left"
          >
            <button
              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              See all
            </button>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <table class="items-center w-full bg-transparent border-collapse">
          <thead class="thead-light">
            <tr>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Referral
              </th>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Users
              </th>
              <th
                class="px-6 bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-200 align-middle border border-solid border-zinc-100 dark:border-zinc-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-35"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                Facebook
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                1,480
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">60%</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                      <div
                        style="width: 60%"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                Facebook
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                5,480
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">70%</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                      <div
                        style="width: 70%"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                Google
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                4,807
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">80%</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                      <div
                        style="width: 80%"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                Instagram
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                3,678
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">75%</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200">
                      <div
                        style="width: 75%"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                Twitter
              </th>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                2,645
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">30%</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
                      <div
                        style="width: 30%"
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
