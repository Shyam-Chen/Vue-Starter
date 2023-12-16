<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XInputMask, XCode } from '@x/ui';

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

  <h1 class="text-4xl font-extrabold my-4">InputMask</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Number</h2>

    <XCard>
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

      <div class="mt-1">
        <div>Masked: {{ flux.numberMasked }}</div>

        <div>
          Unmasked: {{ flux.numberUnmasked }}
          <XCode>{{ typeof flux.numberUnmasked }}</XCode>
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Percent</h2>

    <XCard>
      <XInputMask
        v-model:masked="flux.percentMasked"
        v-model:unmasked.number="flux.percentUnmasked"
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

      <div class="mt-1">
        <div>Masked: {{ flux.percentMasked }}</div>

        <div>
          Unmasked: {{ flux.percentUnmasked }}
          <XCode>{{ typeof flux.percentUnmasked }}</XCode>
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Phone</h2>

    <XCard>
      <XInputMask
        v-model:masked="flux.phoneMasked"
        v-model:unmasked="flux.phoneUnmasked"
        :mask="{ mask: '+{1} (000) 000-0000' }"
        label="Phone Label"
        placeholder="+1 (___) ___-____"
      />

      <div class="mt-1">
        <div>Masked: {{ flux.phoneMasked }}</div>
        <div>Unmasked: {{ flux.phoneUnmasked }}</div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Currency</h2>

    <XCard>
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

      <div class="mt-1">
        <div>Masked: {{ flux.usdMasked }}</div>
        <div>Unmasked: {{ flux.usdUnmasked }}</div>
      </div>
    </XCard>
  </section>
</template>
