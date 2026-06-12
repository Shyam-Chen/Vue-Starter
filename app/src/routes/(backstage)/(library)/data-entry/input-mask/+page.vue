<script lang="ts" setup>
import { XBreadcrumb, XCard, XCode, XDivider, XInputMask, XSelect } from '@x/ui';
import { onMounted, reactive } from 'vue';

const flux = reactive({
  numberMasked: '',
  numberUnmasked: undefined,

  percentMasked: '',
  percentUnmasked: undefined,

  phoneMasked: '',
  phoneUnmasked: undefined as string | null | undefined,

  phone2: '',
  phone2Options: [
    {
      label: 'United States (+1)',
      value: '{+1} (000) 000-0000',
      placeholder: '+1 (___) ___-____',
    },
    {
      label: 'Japan (+81)',
      value: '{+81} 00-0000-0000',
      placeholder: '+81 __-____-____',
    },
    {
      label: 'South Korea (+82)',
      value: '{+82} 00-0000-0000',
      placeholder: '+82 __-____-____',
    },
    {
      label: 'Taiwan (+886)',
      value: '{+886} 000-000-000',
      placeholder: '+886 ___-___-___',
    },
  ],
  phone2Key: 1,
  phone2Masked: '',
  phone2Unmasked: undefined,
  phone2Placeholder: '',

  usdMasked: '',
  usdUnmasked: undefined,

  verificationCodeMasked: '',
  verificationCodeUnmasked: undefined,
});

onMounted(() => {
  // mock data from the response
  const phoneUnmasked = '+12123456789';
  flux.phoneMasked = phoneUnmasked;
  flux.phoneUnmasked = phoneUnmasked;
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
        :mask="{ mask: '{+1} (000) 000-0000' }"
        label="Phone Label"
        placeholder="+1 (___) ___-____"
      />

      <div class="mt-1">
        <div>Masked: {{ flux.phoneMasked }}</div>
        <div>
          Unmasked: {{ flux.phoneUnmasked }}
          <XCode>{{ typeof flux.phoneUnmasked }}</XCode>
        </div>
      </div>

      <XDivider />

      <div class="flex flex-col md:flex-row gap-2">
        <XSelect
          v-model:value="flux.phone2"
          label="Phone 2 Label"
          :options="flux.phone2Options"
          @change="
            (_val, opt) => {
              flux.phone2Placeholder = opt.placeholder;
              flux.phone2Key += 1;
              flux.phone2Masked = '';
              flux.phone2Unmasked = undefined;
            }
          "
        />
        <XInputMask
          :key="flux.phone2Key"
          v-model:masked="flux.phone2Masked"
          v-model:unmasked="flux.phone2Unmasked"
          :mask="{ mask: flux.phone2 }"
          sub
          :placeholder="flux.phone2Placeholder"
        />
      </div>

      <div class="mt-1">
        <div>Masked: {{ flux.phone2Masked }}</div>
        <div>
          Unmasked: {{ flux.phone2Unmasked }}
          <XCode>{{ typeof flux.phone2Unmasked }}</XCode>
        </div>
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
        <div>
          Unmasked: {{ flux.usdUnmasked }}
          <XCode>{{ typeof flux.usdUnmasked }}</XCode>
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">One-time Password</h2>

    <XCard>
      <XInputMask
        v-model:masked="flux.verificationCodeMasked"
        v-model:unmasked="flux.verificationCodeUnmasked"
        :mask="{ mask: '000 000' }"
        label="Verification Code"
      />

      <div class="mt-1">
        <div>Masked: {{ flux.verificationCodeMasked }}</div>
        <div>
          Unmasked: {{ flux.verificationCodeUnmasked }}
          <XCode>{{ typeof flux.verificationCodeUnmasked }}</XCode>
        </div>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Sub</h2>

    <XCard>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col md:flex-row gap-2">
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
          <XInputMask
            v-model:masked="flux.numberMasked"
            v-model:unmasked.number="flux.numberUnmasked"
            :mask="{
              mask: Number,
              min: -1_000_000_000_000,
              max: 1_000_000_000_000,
              thousandsSeparator: ',',
            }"
            sub
          />
        </div>

        <XInputMask
          v-model:masked="flux.numberMasked"
          v-model:unmasked.number="flux.numberUnmasked"
          :mask="{
            mask: Number,
            min: -1_000_000_000_000,
            max: 1_000_000_000_000,
            thousandsSeparator: ',',
          }"
          label="Number Label 2"
        />
      </div>
    </XCard>
  </section>
</template>
