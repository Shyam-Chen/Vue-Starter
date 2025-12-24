<script lang="ts" setup>
// TODO: Refactor using Motion Vue
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

const stackCards = useTemplateRef('stackCards');
let observer: IntersectionObserver | null = null;
let scrollingFn: (() => void) | null = null;
let scrolling = false;

// Card properties
let myMarginY = 0;
let myElementHeight = 0;
let myCardTop = 0;
let myCardHeight = 0;
let myWindowHeight = 0;

function osHasReducedMotion() {
  if (!window.matchMedia) return false;
  const matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (matchMediaObj) return matchMediaObj.matches;
  return false;
}

function setStackCards() {
  const element = stackCards.value;
  if (!element) return;

  const items = element.children as HTMLCollectionOf<HTMLElement>;

  const node = document.createElement('div');
  node.style.opacity = '0';
  node.style.visibility = 'hidden';
  node.style.position = 'absolute';
  node.style.height = '1.5rem';
  element.appendChild(node);
  myMarginY = parseInt(getComputedStyle(node).height, 10);
  element.removeChild(node);

  myElementHeight = element.offsetHeight;

  if (items.length > 0) {
    const cardStyle = getComputedStyle(items[0]);
    myCardTop = Math.floor(parseFloat(cardStyle.top));
    // Use offsetHeight to capture the full visual height including padding/borders
    myCardHeight = items[0].offsetHeight;
  }

  myWindowHeight = window.innerHeight;

  // reset margin + translate values
  // original: element.element.style.paddingBottom = ...
  if (Number.isNaN(myMarginY)) {
    element.style.paddingBottom = '0px';
  } else {
    element.style.paddingBottom = `${myMarginY * (items.length - 1)}px`;
  }

  for (let i = 0; i < items.length; i++) {
    if (Number.isNaN(myMarginY)) {
      items[i].style.transform = 'none';
    } else {
      items[i].style.transform = `translateY(${myMarginY * i}px)`;
    }
  }
}

function animateStackCards() {
  const element = stackCards.value;
  if (!element) return;

  if (Number.isNaN(myMarginY)) {
    scrolling = false;
    return;
  }

  const items = element.children as HTMLCollectionOf<HTMLElement>;
  const top = element.getBoundingClientRect().top;

  if (
    myCardTop -
      top +
      myWindowHeight -
      myElementHeight -
      myCardHeight +
      myMarginY +
      myMarginY * items.length >
    0
  ) {
    scrolling = false;
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const scrollingVal = myCardTop - top - i * (myCardHeight + myMarginY);
    if (scrollingVal > 0) {
      const scaling =
        i === items.length - 1 ? 1 : (myCardHeight - scrollingVal * 0.05) / myCardHeight;
      items[i].style.transform = `translateY(${myMarginY * i}px) scale(${scaling})`;
    } else {
      items[i].style.transform = `translateY(${myMarginY * i}px)`;
    }
  }

  scrolling = false;
}

function stackCardsScrolling() {
  if (scrolling) return;
  scrolling = true;
  window.requestAnimationFrame(animateStackCards);
}

function stackCardsCallback(entries: IntersectionObserverEntry[]) {
  if (entries[0].isIntersecting) {
    if (scrollingFn) return;
    scrollingFn = stackCardsScrolling;
    window.addEventListener('scroll', scrollingFn);
  } else {
    if (!scrollingFn) return;
    window.removeEventListener('scroll', scrollingFn);
    scrollingFn = null;
  }
}

let resizeId: ReturnType<typeof setTimeout>;

function handleResize() {
  clearTimeout(resizeId);
  resizeId = setTimeout(() => {
    setStackCards();
    // Force an animation frame update
    scrolling = false;
    animateStackCards();
  }, 500);
}

onMounted(() => {
  const element = stackCards.value;
  if (element && 'IntersectionObserver' in window && !osHasReducedMotion()) {
    setStackCards();
    observer = new IntersectionObserver(stackCardsCallback, {
      threshold: [0, 1],
    });
    observer.observe(element);
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (scrollingFn) {
    window.removeEventListener('scroll', scrollingFn);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <!-- Hero -->
  <div
    class="h-screen flex flex-col items-center justify-center text-center p-8"
  >
    <h1
      class="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-slate-900"
    >
      Stacking Cards
    </h1>
    <p class="text-lg text-slate-500">Scroll down to see the effect.</p>
  </div>

  <!-- Stacking Cards -->
  <ul ref="stackCards" class="m-4">
    <li
      class="sticky top-15vh origin-top bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl w-full max-w-5xl h-[60vh] mx-auto overflow-hidden"
    >
      <div
        class="absolute inset-0 flex flex-col justify-center items-center h-full p-8 text-white text-center"
      >
        <div class="mb-6 p-4 bg-white/20 rounded-full backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-12 h-12 text-white"
          >
            <path d="m12 19 7-7 3 3-7 7-3-3z" />
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="m2 2 7.586 7.586" />
            <path d="M11 11a2 2 0 0 0 1.98 2.02" />
            <path d="m13.8 13a4 4 0 0 1 0 7.2" />
          </svg>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Modern Design
        </h2>
        <p class="text-xl md:text-2xl opacity-90 max-w-2xl font-light">
          Craft beautiful user interfaces with utility-first CSS and
          component-driven architecture.
        </p>
      </div>
    </li>

    <li
      class="sticky top-15vh origin-top bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[60vh] mx-auto overflow-hidden border border-slate-800"
    >
      <div
        class="absolute inset-0 flex flex-col justify-center items-center h-full p-8 text-center relative group"
      >
        <div
          class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-50"
        ></div>
        <div
          class="relative z-10 mb-6 p-4 bg-emerald-500/10 rounded-full ring-1 ring-emerald-500/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-12 h-12 text-emerald-400"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <h2
          class="relative z-10 text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight"
        >
          High Performance
        </h2>
        <p
          class="relative z-10 text-xl md:text-2xl text-slate-400 max-w-2xl font-light"
        >
          Powered by Vue 3's reactive core for silky smooth animations and
          instant feedback.
        </p>
      </div>
    </li>

    <li
      class="sticky top-15vh origin-top bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[60vh] mx-auto overflow-hidden border border-slate-100"
    >
      <div
        class="absolute inset-0 flex flex-col justify-center items-center h-full p-8 text-center"
      >
        <div class="mb-6 p-4 bg-blue-50 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-12 h-12 text-blue-600"
          >
            <path
              d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"
            />
            <path d="m12 12 4 10 1.7-4.3L22 16Z" />
          </svg>
        </div>
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight"
        >
          Interactive
        </h2>
        <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mb-8 font-light">
          Engage users with scroll-driven interactions that bring your content
          to life.
        </p>
        <button
          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors shadow-lg shadow-blue-600/30"
        >
          Get Started
        </button>
      </div>
    </li>
  </ul>

  <!-- Footer -->
  <div class="h-screen flex items-center justify-center">
    <p class="text-slate-400">Footer content (scroll past cards)</p>
  </div>
</template>
