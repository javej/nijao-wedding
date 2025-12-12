<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let selectedImage: string | null = null;
  let images: string[] = [];

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
    ];
  });

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
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    selectedImage = images[nextIndex];
  }

  function previousImage() {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    selectedImage = images[prevIndex];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (selectedImage) {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') previousImage();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each images as image, index (image)}
    <div
      class="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow-md"
      on:click={() => openLightbox(image)}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Enter' && openLightbox(image)}
      transition:fly={{ y: 20, duration: 400, delay: index * 50, easing: quintOut }}
    >
      <img
        src={image}
        alt="Wedding photo"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  {/each}
</div>

<!-- Lightbox -->
{#if selectedImage}
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
    on:click={closeLightbox}
    role="dialog"
    aria-modal="true"
    aria-label="Image lightbox"
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

    <img
      src={selectedImage}
      alt="Wedding photo"
      class="max-w-full max-h-full object-contain"
      on:click|stopPropagation
      transition:scale={{ duration: 300, start: 0.8 }}
    />
  </div>
{/if}

<style>
  :global(body) {
    transition: overflow 0.2s;
  }
</style>

