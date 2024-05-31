<script lang="ts" setup>
import { vIntersectionObserver } from '@vueuse/components';
import { ref } from 'vue';

import { XBreadcrumb } from '@x/ui';

const sections = ref(Array(6).fill(false));

const onIntersectionObserver = (num: number): IntersectionObserverCallback => {
  return ([entry]) => {
    sections.value[num] = entry.isIntersecting;
  };
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Scrollspy' }]" />

  <h1 class="text-4xl font-extrabold my-4">Scrollspy</h1>

  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-9">
      <div
        v-intersection-observer="[onIntersectionObserver(0), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mb-12"
      >
        <div class="text-2xl font-bold">1. Create a Project</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>

      <div
        v-intersection-observer="[onIntersectionObserver(1), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mt-8 mb-12"
      >
        <div class="text-2xl font-bold">2. Create a Collection</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>

      <div
        v-intersection-observer="[onIntersectionObserver(2), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mt-8 mb-12"
      >
        <div class="text-2xl font-bold">3. Create a Field</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>

      <div
        v-intersection-observer="[onIntersectionObserver(3), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mt-8 mb-12"
      >
        <div class="text-2xl font-bold">4. Create an Item</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>

      <div
        v-intersection-observer="[onIntersectionObserver(4), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mt-8 mb-12"
      >
        <div class="text-2xl font-bold">5. Set Roles & Permissions</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>

      <div
        v-intersection-observer="[onIntersectionObserver(5), { rootMargin: '-41.5% 0px' }]"
        class="flex flex-col gap-3 mt-8 mb-12"
      >
        <div class="text-2xl font-bold">6. Connect to the API</div>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <p>
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
            ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
            rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
            tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
          </p>
        </div>
      </div>
    </div>

    <div class="col-span-3">
      <div class="sticky top-24 flex flex-col gap-1">
        <a class="link" :class="{ active: sections[0] }">1. Create a Project</a>
        <a class="link" :class="{ active: sections[1] }">2. Create a Collection</a>
        <a class="link" :class="{ active: sections[2] }">3. Create a Field</a>
        <a class="link" :class="{ active: sections[3] }">4. Create an Item</a>
        <a class="link" :class="{ active: sections[4] }">5. Set Roles & Permissions</a>
        <a class="link" :class="{ active: sections[5] }">6. Connect to the API</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply pl-2 border-l-2 border-transparent;

  &.active {
    @apply text-primary-500 border-primary-500;
  }
}
</style>
