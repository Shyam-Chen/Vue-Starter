# Public Directory

The `public/` directory is directly served at the server root and contains public files that have to keep their names or likely won't change.

Read files from the `public/` directory:

```ts
import usePublic from '~/composables/usePublic';

const text_txt_buffer = usePublic('text.txt');

console.log(text_txt_buffer);
```
