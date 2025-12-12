<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';

  let selectedImage: string | null = null;
  let images: string[] = [];
  let currentIndex = 0;

  // Placeholder images - replace with actual image paths
  onMount(() => {
    // For now, using placeholder images
    // Replace these with your actual image paths in public/images/
    images = [
      '/images/placeholder-1.jpg',
      '/images/placeholder-2.jpg',
      '/images/placeholder-3.jpg',
      '/images/placeholder-4.jpg',
      '/images/placeholder-5.jpg',
      '/images/placeholder-6.jpg',
      '/images/placeholder-7.jpg',
      '/images/placeholder-8.jpg',
      '/images/placeholder-9.jpg',
      '/images/placeholder-10.jpg',
      '/images/placeholder-11.jpg',
      '/images/placeholder-12.jpg',
    ];
  });

  function nextCarousel() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function previousCarousel() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function goToImage(index: number) {
    currentIndex = index;
  }

  function openLightbox(image: string) {
    selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    selectedImage = null;
    document.body.style.overflow = '';
  }

  function nextImage() {
    if (!selectedImage) return;
    const currentLightboxIndex = images.indexOf(selectedImage);
    const nextIndex = (currentLightboxIndex + 1) % images.length;
    selectedImage = images[nextIndex];
  }

  function previousImage() {
    if (!selectedImage) return;
    const currentLightboxIndex = images.indexOf(selectedImage);
    const prevIndex = (currentLightboxIndex - 1 + images.length) % images.length;
    selectedImage = images[prevIndex];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (selectedImage) {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') previousImage();
    } else {
      // Carousel navigation when lightbox is closed
      if (event.key === 'ArrowRight') nextCarousel();
      if (event.key === 'ArrowLeft') previousCarousel();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Carousel Container -->
<div class="relative max-w-4xl mx-auto">
  <!-- Carousel Wrapper -->
  <div class="relative overflow-hidden rounded-lg shadow-2xl">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      style="transform: translateX(-{currentIndex * 100}%)"
    >
      {#each images as image, index (image)}
        <div class="min-w-full aspect-[4/3] relative">
          <button
            type="button"
            class="w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-wedding-raspberry focus:ring-offset-2 rounded-lg"
            on:click={() => openLightbox(image)}
            aria-label="View wedding photo {index + 1} in lightbox"
          >
            <img
              src={image}
              alt="Wedding photo {index + 1}"
              class="w-full h-full object-cover hover:opacity-95 transition-opacity"
              loading="lazy"
            />
          </button>
        </div>
      {/each}
    </div>

    <!-- Previous Button -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all z-10"
      on:click={previousCarousel}
      aria-label="Previous image"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Next Button -->
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all z-10"
      on:click={nextCarousel}
      aria-label="Next image"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <!-- Indicator Dots -->
  <div class="flex justify-center gap-2 mt-4">
    {#each images as _, index (index)}
      <button
        class="w-3 h-3 rounded-full transition-all {currentIndex === index
          ? 'bg-wedding-raspberry w-8'
          : 'bg-gray-300 hover:bg-gray-400'}"
        on:click={() => goToImage(index)}
        aria-label="Go to image {index + 1}"
      ></button>
    {/each}
  </div>
</div>

<!-- Lightbox -->
{#if selectedImage}
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    on:click={closeLightbox}
    on:keydown={(e) => e.key === 'Enter' && closeLightbox()}
    role="dialog"
    aria-modal="true"
    aria-label="Image lightbox"
    tabindex="-1"
    transition:fade={{ duration: 200 }}
  >
    <button
      class="absolute top-4 right-4 text-white hover:text-wedding-dark-matcha-green transition-colors text-2xl z-10"
      on:click={closeLightbox}
      aria-label="Close lightbox"
      transition:fly={{ y: -10, duration: 300, delay: 100 }}
    >
      ✕
    </button>

    <button
      class="absolute left-4 text-white hover:text-wedding-dark-matcha-green transition-colors text-4xl z-10"
      on:click|stopPropagation={previousImage}
      aria-label="Previous image"
      transition:fly={{ x: -20, duration: 300, delay: 100 }}
    >
      ‹
    </button>

    <button
      class="absolute right-4 text-white hover:text-wedding-dark-matcha-green transition-colors text-4xl z-10"
      on:click|stopPropagation={nextImage}
      aria-label="Next image"
      transition:fly={{ x: 20, duration: 300, delay: 100 }}
    >
      ›
    </button>

    <div
      on:click|stopPropagation
      role="presentation"
      class="max-w-full max-h-full"
    >
      <img
        src={selectedImage}
        alt=""
        class="max-w-full max-h-full object-contain"
        transition:scale={{ duration: 300, start: 0.8 }}
      />
    </div>
  </div>
{/if}

<style>
  :global(body) {
    transition: overflow 0.2s;
  }
</style>

