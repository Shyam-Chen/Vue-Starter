<script lang="ts" setup>
import { computed, reactive, toRef, onMounted } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { XCard, XTextField, XSelect, XRadioGroup, XTextarea, XCheckbox, XButton } from '@x/ui';
import { useValdnLocale } from '@x/ui';
import {
  optional,
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
  bio?: string;
  agreed?: boolean;
}

const localer = useLocaler();
const valdnLocale = useValdnLocale();

const state = reactive({
  form: {} as BasicForm,
  valdn: {} as Record<keyof BasicForm, string>,
  touched: {} as Record<keyof BasicForm, boolean>,
});

const schema = useValibotSchema(
  computed(() =>
    object({
      username: optional(string([minLength(1, valdnLocale.value.required)]), ''),
      email: optional(
        string([minLength(1, valdnLocale.value.required), email(valdnLocale.value.email)]),
        '',
      ),
      password: optional(
        string([
          minLength(1, valdnLocale.value.required),
          minLength(8, localer.f(valdnLocale.value.minLength, 8)),
        ]),
        '',
      ),
      confirmPassword: optional(
        string([
          minLength(1, valdnLocale.value.required),
          custom(
            (input) => state.form.password === input,
            'Password and Confirm Password must be match',
          ),
        ]),
        '',
      ),
      pronouns: optional(number([minValue(1, valdnLocale.value.required)]), 0),
      urlPasteBehavior: optional(number([minValue(1, valdnLocale.value.required)]), 0),
      bio: optional(string([minLength(1, valdnLocale.value.required)]), ''),
      agreed: literal(true, valdnLocale.value.required),
    }),
  ),
  toRef(state, 'form'),
  toRef(state, 'valdn'),
  toRef(state, 'touched'),
);

onMounted(() => {
  schema.run();
});

const submit = () => {
  if (schema.validate()) {
    console.log('validated data =', state.form);
  }
};
</script>

<template>
  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Touched</h2>

    <XCard>
      <div class="grid md:grid-cols-2 gap-4">
        <XTextField
          v-model:value="state.form.username"
          label="Username"
          required
          :invalid="state.valdn.username"
          @blur="state.touched.username = true"
        />

        <XTextField
          v-model:value="state.form.email"
          label="Email"
          required
          :invalid="state.valdn.email"
          @blur="state.touched.email = true"
        />

        <XTextField
          v-model:value="state.form.password"
          label="Password"
          type="password"
          required
          :invalid="state.valdn.password"
          @blur="state.touched.password = true"
        />

        <XTextField
          v-model:value="state.form.confirmPassword"
          label="Confirm Password"
          type="password"
          required
          :invalid="state.valdn.confirmPassword"
          @blur="state.touched.confirmPassword = true"
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
          @blur="state.touched.pronouns = true"
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
          @blur="state.touched.urlPasteBehavior = true"
        />

        <div class="md:col-span-2">
          <XTextarea
            v-model:value="state.form.bio"
            label="Bio"
            required
            :invalid="state.valdn.bio"
            @blur="state.touched.bio = true"
          />
        </div>

        <div class="md:col-span-2">
          <XCheckbox
            v-model:value="state.form.agreed"
            :invalid="state.valdn.agreed"
            @blur="state.touched.agreed = true"
          >
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
