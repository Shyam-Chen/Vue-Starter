<script lang="ts" setup>
import Button from '~/components/Button.vue';
</script>

# Buttons

Buttons allow users to take actions, and make choices, with a single tap.

Source: `src/components/Button.vue`

## Usage

```ts
import Button from '~/components/Button.vue';
```

```html
<Button>Primary</Button>
```

<Button>Primary</Button>

### Color

```html
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="danger">Danger</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>
```

<div class="flex flex-wrap gap-4">
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="success">Success</Button>
  <Button color="danger">Danger</Button>
  <Button color="warning">Warning</Button>
  <Button color="info">Info</Button>
</div>

### Outlined

```html
<Button variant="outlined" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="outlined" color="success">Success</Button>
<Button variant="outlined" color="danger">Danger</Button>
<Button variant="outlined" color="warning">Warning</Button>
<Button variant="outlined" color="info">Info</Button>
```

<div class="flex flex-wrap gap-4">
  <Button variant="outlined" color="primary">Primary</Button>
  <Button variant="outlined" color="secondary">Secondary</Button>
  <Button variant="outlined" color="success">Success</Button>
  <Button variant="outlined" color="danger">Danger</Button>
  <Button variant="outlined" color="warning">Warning</Button>
  <Button variant="outlined" color="info">Info</Button>
</div>

### Text

```html
<Button variant="text" color="primary">Primary</Button>
<Button variant="text" color="secondary">Secondary</Button>
<Button variant="text" color="success">Success</Button>
<Button variant="text" color="danger">Danger</Button>
<Button variant="text" color="warning">Warning</Button>
<Button variant="text" color="info">Info</Button>
```

<div class="flex flex-wrap gap-4">
  <Button variant="text" color="primary">Primary</Button>
  <Button variant="text" color="secondary">Secondary</Button>
  <Button variant="text" color="success">Success</Button>
  <Button variant="text" color="danger">Danger</Button>
  <Button variant="text" color="warning">Warning</Button>
  <Button variant="text" color="info">Info</Button>
</div>
