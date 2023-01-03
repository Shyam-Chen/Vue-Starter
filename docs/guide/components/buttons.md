<script lang="ts" setup>
import { reactive, watch } from 'vue';

import Button from '~/components/Button.vue';
import RadioGroup from '~/components/RadioGroup.vue';

const flux = reactive({
  color: 'primary',
  colorOptions: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
});
</script>

# Buttons

Buttons allow users to take actions, and make choices, with a single tap.

Source: `src/components/Button.vue`

## Usage

```ts
import Button from '~/components/Button.vue';
```

```html
<button color="primary">Primary</button>
```

Result:

<Button :color="flux.color">Color</Button>

<RadioGroup v-model:value="flux.color" :options="flux.colorOptions" />
