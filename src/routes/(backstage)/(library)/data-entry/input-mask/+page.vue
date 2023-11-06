<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XInputMask } from '@x/ui';

const flux = reactive({
  numberMasked: '',
  numberUnmasked: undefined,

  percentMasked: '',
  percentUnmasked: '',

  phoneMasked: '',
  phoneUnmasked: '',

  usdMasked: '',
  usdUnmasked: '',
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'InputMask' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">InputMask</div>
  </div>

  <div class="flex flex-col border my-4 p-4 gap-2">
    <div class="text-xl font-bold">Number</div>

    <XInputMask
      v-model:masked="flux.numberMasked"
      v-model:unmasked.number="flux.numberUnmasked"
      :mask="{
        mask: Number,
        min: -1_000_000_000_000,
        max: 1_000_000_000_000,
        thousandsSeparator: ',',
      }"
      label="Number Label"
    />

    <div>
      <div>Masked: {{ flux.numberMasked }}</div>

      <div>
        Unmasked: {{ flux.numberUnmasked }}
        <code class="text-sm text-gray-700 bg-gray-300 p-0.5 rounded">
          {{ typeof flux.numberUnmasked }}
        </code>
      </div>
    </div>
  </div>

  <div class="flex flex-col border my-4 p-4 gap-2">
    <div class="text-xl font-bold">Percent</div>

    <XInputMask
      v-model:masked="flux.percentMasked"
      v-model:unmasked="flux.percentUnmasked"
      :mask="{
        mask: 'num%',
        lazy: false,
        blocks: {
          num: {
            mask: Number,
            scale: 0,
            min: 0,
            max: 100,
          },
        },
      }"
      label="Percent Label"
    />

    <div>
      <div>Masked: {{ flux.percentMasked }}</div>
      <div>Unmasked: {{ flux.percentUnmasked }}</div>
    </div>
  </div>

  <div class="flex flex-col border my-4 p-4 gap-2">
    <div class="text-xl font-bold">Phone</div>

    <XInputMask
      v-model:masked="flux.phoneMasked"
      v-model:unmasked="flux.phoneUnmasked"
      :mask="{ mask: '+{1} (000) 000-0000' }"
      label="Phone Label"
    />

    <div>
      <div>Masked: {{ flux.phoneMasked }}</div>
      <div>Unmasked: {{ flux.phoneUnmasked }}</div>
    </div>
  </div>

  <div class="flex flex-col border my-4 p-4 gap-2">
    <div class="text-xl font-bold">Currency</div>

    <XInputMask
      v-model:masked="flux.usdMasked"
      v-model:unmasked="flux.usdUnmasked"
      :mask="{
        mask: '$num',
        blocks: {
          num: {
            mask: Number,
            thousandsSeparator: ',',
            radix: '.',
            scale: 2,
          },
        },
      }"
      label="USD"
    />

    <div>
      <div>Masked: {{ flux.usdMasked }}</div>
      <div>Unmasked: {{ flux.usdUnmasked }}</div>
    </div>
  </div>
</template>
