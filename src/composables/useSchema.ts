import type { EffectScope, Ref } from 'vue';
import type { ZodSchema } from 'zod';
import { watch, effectScope, onUnmounted } from 'vue';

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const useSchema = (schema: ZodSchema, target: Ref, errors: Ref) => {
  let _scope: EffectScope;

  const validate = () => {
    const scope = effectScope();
    _scope = scope;

    const parse = () => {
      const parsed = schema.safeParse(target.value);

      errors.value = {};

      if (!parsed.success) {
        for (let i = 0; i < parsed.error.issues.length; i++) {
          const issue = parsed.error.issues[i];

          errors.value[
            issue.path.reduce((acc, cur) => {
              if (typeof cur === 'number') return acc + `[${cur}]`;
              return acc + `.${cur}`;
            })
          ] = issue.message;
        }
      }

      return parsed.success;
    };

    scope.run(() => {
      const debouncing = debounce(() => {
        parse();
      });

      watch(
        () => target.value,
        () => {
          debouncing();
        },
        { deep: true },
      );
    });

    return parse();
  };

  const stop = () => {
    errors.value = {};
    _scope?.stop();
  };

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
  };
};
