# Introduction

## Requirements

- `git --version`
- `node --version`
- `pnpm --version`
- Visual Studio Code
  - ESLint
  - Prettier

## Recommended

- `rimraf`
- `caddy version`
- Visual Studio Code
  - EditorConfig

## Usage

```sh
pnpm install
```

```sh
pnpm dev
```

## Foo

:::code-group

```sh [macOS]
brew install fnm
```

```sh [Windows]
scoop install fnm
```

```sh [Linux]
curl -fsSL https://fnm.vercel.app/install | bash
```

:::

```js
export default {
  // ...
};
```

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Bar

```js
export default {
  // ...
};
```

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Baz

```js
export default {
  // ...
};
```

```js
export default {
  data() {
    return {
      msg: 'Highlighted!', // [!code hl]
    };
  },
};
```
