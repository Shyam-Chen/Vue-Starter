<script lang="ts" setup>
import { XBreadcrumb, XCard } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Typography' }]" />

  <h1 class="text-4xl font-extrabold my-4">Typography</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <h1 class="text-4xl font-extrabold">h1. Heading</h1>
      <h2 class="text-3xl font-bold">h2. Heading</h2>
      <h3 class="text-2xl font-semibold">h3. Heading</h3>
      <h4 class="text-xl font-medium">h4. Heading</h4>

      <p>
        p. Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
        tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
        numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </p>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Prose</h2>

    <XCard>
      <article class="prose max-w-none">
        <h1>h1. Heading</h1>
        <h2>h2. Heading</h2>
        <h3>h3. Heading</h3>
        <h4>h4. Heading</h4>

        <p>
          p. Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
          cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </p>

        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>

        <blockquote cite="http://www.worldwildlife.org/who/index.html">
          For 50 years, WWF has been protecting the future of nature. The world's leading
          conservation organization, WWF works in 100 countries and is supported by 1.2 million
          members in the United States and close to 5 million globally.
        </blockquote>

        <figure>
          <img src="~~/assets/logo.png" alt="Vue" />
          <figcaption>Vue.js - The Progressive JavaScript Framework</figcaption>
        </figure>

        <strong>This text is important!</strong>

        <p>Get out of bed <em>now</em>!</p>

        <p>
          Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.
        </p>

        <p>
          The <code>push()</code> method adds one or more elements to the end of an array and
          returns the new length of the array.
        </p>

        <pre>
L          TE
  A       A
    C    V
    R A
    DOU
    LOU
    REUSE
    QUE TU
    PORTES
  ET QUI T'
  ORNE O CI
  VILISÉ
  OTE-  TU VEUX
  LA    BIEN
  SI      RESPI
          RER       - Apollinaire
        </pre>

        <ol>
          <li>Mix flour, baking powder, sugar, and salt.</li>
          <li>In another bowl, mix eggs, milk, and oil.</li>
          <li>Stir both mixtures together.</li>
          <li>Fill muffin tray 3/4 full.</li>
          <li>Bake for 20 minutes.</li>
        </ol>

        <ul>
          <li>Milk</li>
          <li>
            Cheese
            <ul>
              <li>Blue cheese</li>
              <li>Feta</li>
            </ul>
          </li>
        </ul>

        <table>
          <caption>
            Front-end web developer course 2021
          </caption>
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Most interest in</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Chris</th>
              <td>HTML tables</td>
              <td>22</td>
            </tr>
            <tr>
              <th scope="row">Dennis</th>
              <td>Web accessibility</td>
              <td>45</td>
            </tr>
            <tr>
              <th scope="row">Sarah</th>
              <td>JavaScript frameworks</td>
              <td>29</td>
            </tr>
            <tr>
              <th scope="row">Karen</th>
              <td>Web performance</td>
              <td>36</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="2">Average age</th>
              <td>33</td>
            </tr>
          </tfoot>
        </table>

        <video controls width="250">
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
          />

          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />

          Download the
          <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            >WEBM</a
          >
          or
          <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">MP4</a>
          video.
        </video>

        <p>§1: The first rule of Fight Club is: You do not talk about Fight Club.</p>

        <hr />

        <p>§2: The second rule of Fight Club is: Always bring cupcakes.</p>
      </article>
    </XCard>
  </section>
</template>
