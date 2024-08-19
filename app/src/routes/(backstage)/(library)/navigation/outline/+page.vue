<script lang="ts" setup>
import { XBreadcrumb, XOutline } from '@x/ui';
import { useOutline } from '@x/ui';

const outline = useOutline([
  { text: '1. Create a Project' },
  { text: '2. Create a Collection' },
  { text: '3. Create a Field' },
  { text: '4. Create an Item' },
  { text: '5. Set Roles & Permissions' },
  { text: '6. Connect to the API' },
]) as any;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Outline' }]" />

  <h1 class="text-4xl font-extrabold my-4">Outline</h1>

  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-9">
      <div :ref="(el) => (outline[0].el = el)" class="scroll-mt-24 flex flex-col gap-3 mb-12">
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

      <div :ref="(el) => (outline[1].el = el)" class="scroll-mt-24 flex flex-col gap-3 mt-8 mb-12">
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

      <div :ref="(el) => (outline[2].el = el)" class="scroll-mt-24 flex flex-col gap-3 mt-8 mb-12">
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

      <div :ref="(el) => (outline[3].el = el)" class="scroll-mt-24 flex flex-col gap-3 mt-8 mb-12">
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

      <div :ref="(el) => (outline[4].el = el)" class="scroll-mt-24 flex flex-col gap-3 mt-8 mb-12">
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

      <div :ref="(el) => (outline[5].el = el)" class="scroll-mt-24 flex flex-col gap-3 mt-8 mb-12">
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
      <XOutline
        :items="outline"
        class="top-24"
        @clickItem="(index) => outline?.[index]?.clickItem?.()"
      />
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
