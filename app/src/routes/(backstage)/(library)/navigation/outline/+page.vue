<script lang="ts" setup>
import { useOutline, XBreadcrumb, XButton, XHashAnchor, XOutline } from '@x/ui';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const outline = useOutline([
  /* 0 */ { text: '1. Create a Project' },
  /* 1 */ { text: '2. Create a Collection' },
  /* 2 */ { text: '3. Create a Field' },
  /* 3 */ { text: '3-1. Create a Text Field', sub: true },
  /* 4 */ { text: '3-2. Create a Number Field', sub: true },
  /* 5 */ { text: '3-3. Complete Field', sub: true },
  /* 6 */ { text: '4. Create an Item' },
  /* 7 */ { text: '5. Set Roles & Permissions' },
  /* 8 */ { text: '6. Connect to the API' },
]);

onMounted(() => {
  if (route.hash) location.href = route.hash;
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Outline' }]" />

  <h1 class="text-4xl font-extrabold my-4">Outline</h1>

  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-9">
      <div :ref="(el) => (outline[0].el = el)" class="flex flex-col gap-3 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="create-a-project">
          <h2 class="text-3xl font-bold">
            1. Create a Project
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

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

      <div :ref="(el) => (outline[1].el = el)" class="flex flex-col gap-3 mt-8 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="create-a-collection">
          <h2 class="text-3xl font-bold">
            2. Create a Collection
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

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

      <div class="flex flex-col gap-3 mt-8 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="create-a-field">
          <h2 :ref="(el) => (outline[2].el = el)" class="text-3xl font-bold">
            3. Create a Field
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

        <div class="flex flex-col gap-3">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
            vulputate eget, arcu.
          </p>

          <h3 :ref="(el) => (outline[3].el = el)" class="text-2xl font-semibold">
            3-1. Create a Text Field
          </h3>

          <p>
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
            pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
            eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <h3 :ref="(el) => (outline[4].el = el)" class="text-2xl font-semibold">
            3-2. Create a Number Field
          </h3>

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

          <XButton :ref="(el) => (outline[5].el = el)" label="3-3. Complete Field" class="" />
        </div>
      </div>

      <div :ref="(el) => (outline[6].el = el)" class="flex flex-col gap-3 mt-8 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="create-an-item">
          <h2 class="text-3xl font-bold">
            4. Create an Item
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

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

      <div :ref="(el) => (outline[7].el = el)" class="flex flex-col gap-3 mt-8 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="set-roles-&-permissions">
          <h2 class="text-3xl font-bold">
            5. Set Roles & Permissions
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

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

      <div :ref="(el) => (outline[8].el = el)" class="flex flex-col gap-3 mt-8 mb-12">
        <XHashAnchor v-slot="{ Hashtag }" hash="connect-to-the-api">
          <h2 class="text-3xl font-bold">
            6. Connect to the API
            <component :is="Hashtag"></component>
          </h2>
        </XHashAnchor>

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
      <XOutline :items="outline" @clickItem="(index) => outline?.[index]?.clickItem?.()" />
    </div>
  </div>
</template>
