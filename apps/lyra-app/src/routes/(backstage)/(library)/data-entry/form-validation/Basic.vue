<script lang="ts" setup>
import { computed, reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import {
  XCard,
  XTextField,
  XSelect,
  XRadioGroup,
  XTextarea,
  XCheckbox,
  XDatePicker,
  XButton,
} from '@lyra/ui';
import { useValdnLocale } from '@lyra/ui';
import {
  nullish,
  object,
  string,
  number,
  email,
  minLength,
  minValue,
  literal,
  custom,
} from 'valibot';

interface BasicForm {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  pronouns?: 1 | 2 | 3;
  urlPasteBehavior?: 1 | 2;
  birthday?: string;
  bio?: string;
  agreed?: boolean;
}

const localer = useLocaler();
const valdnLocale = useValdnLocale();

const state = reactive({
  form: {} as BasicForm,
  valdn: {} as Record<keyof BasicForm, string>,
});

const schema = useValibotSchema(
  computed(() =>
    object({
      username: nullish(string([minLength(1, valdnLocale.value.required)]), ''),
      email: nullish(
        string([minLength(1, valdnLocale.value.required), email(valdnLocale.value.email)]),
        '',
      ),
      password: nullish(
        string([
          minLength(1, valdnLocale.value.required),
          minLength(8, localer.f(valdnLocale.value.minLength, [8])),
        ]),
        '',
      ),
      confirmPassword: nullish(
        string([
          minLength(1, valdnLocale.value.required),
          custom(
            (input) => state.form.password === input,
            'Password and Confirm Password must be match',
          ),
        ]),
        '',
      ),
      pronouns: nullish(number([minValue(1, valdnLocale.value.required)]), 0),
      urlPasteBehavior: nullish(number([minValue(1, valdnLocale.value.required)]), 0),
      birthday: nullish(string([minLength(1, valdnLocale.value.required)]), ''),
      bio: nullish(string([minLength(1, valdnLocale.value.required)]), ''),
      agreed: literal(true, valdnLocale.value.required),
    }),
  ),
  toRef(state, 'form'),
  toRef(state, 'valdn'),
);

const submit = () => {
  if (schema.validate()) {
    console.log('validated data =', state.form);
  }
};
</script>

<template>
  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="grid md:grid-cols-2 gap-4">
        <XTextField
          v-model:value="state.form.username"
          label="Username"
          required
          :invalid="state.valdn.username"
        />

        <XTextField
          v-model:value="state.form.email"
          label="Email"
          required
          :invalid="state.valdn.email"
        />

        <XTextField
          v-model:value="state.form.password"
          label="Password"
          type="password"
          required
          :invalid="state.valdn.password"
        />

        <XTextField
          v-model:value="state.form.confirmPassword"
          label="Confirm Password"
          type="password"
          required
          :invalid="state.valdn.confirmPassword"
        />

        <XSelect
          v-model:value="state.form.pronouns"
          label="Pronouns"
          :options="[
            { label: 'they/them', value: 1 },
            { label: 'she/her', value: 2 },
            { label: 'he/him', value: 3 },
          ]"
          required
          :invalid="state.valdn.pronouns"
        />

        <XRadioGroup
          v-model:value="state.form.urlPasteBehavior"
          label="URL Paste Behavior"
          :options="[
            { label: 'Formatted Link', value: 1 },
            { label: 'Plain Text', value: 2 },
          ]"
          required
          :invalid="state.valdn.urlPasteBehavior"
        />

        <XDatePicker
          v-model:value="state.form.birthday"
          label="Birthday"
          required
          :invalid="state.valdn.birthday"
        />

        <div class="md:col-span-2">
          <XTextarea
            v-model:value="state.form.bio"
            label="Bio"
            required
            :invalid="state.valdn.bio"
          />
        </div>

        <div class="md:col-span-2">
          <XCheckbox v-model:value="state.form.agreed" :invalid="state.valdn.agreed">
            I have read and agree to the Terms
          </XCheckbox>
        </div>
      </div>
    </XCard>

    <div class="flex justify-center mt-8">
      <XButton @click="submit">Submit</XButton>
    </div>
  </section>
</template>
