<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const sections = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'timeline', name: 'Timeline', icon: '⏰' },
    { id: 'gallery', name: 'Gallery', icon: '📸' },
    { id: 'rsvp', name: 'RSVP', icon: '✉️' },
    { id: 'guestbook', name: 'Guestbook', icon: '💬' },
  ];

  let activeSection = 'home';
  let isScrolling = false;
  let clickedSection: string | null = null;
  let isVisible = false;

  function scrollToSection(sectionId: string, event?: MouseEvent) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Remove focus from button to prevent hover state from sticking
    if (event?.currentTarget) {
      (event.currentTarget as HTMLElement).blur();
    }

    // Immediately set the clicked section as active
    clickedSection = sectionId;
    activeSection = sectionId;

    isScrolling = true;
    const element = document.getElementById(sectionId) as HTMLElement;
    if (element) {
      const offset = 20;
      const targetPosition = element.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrolling = false;
        // Clear clicked section after scroll completes so scroll position takes over
        clickedSection = null;
      }, 1000);
    }
  }

  function updateActiveSection() {
    if (isScrolling || typeof window === 'undefined' || typeof document === 'undefined') return;

    // Don't update if we just clicked a section (let the click handle it)
    if (clickedSection !== null) return;

    const scrollY = (window.pageYOffset || window.scrollY) + 100;

    // Check each section to find which one is currently in view
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id) as HTMLElement;
      if (section) {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop) {
          activeSection = sections[i].id;
          break;
        }
      }
    }
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    // Listen for invitation state changes
    window.addEventListener('invitation-opened', () => {
      isVisible = true;
    });
    window.addEventListener('invitation-closed', () => {
      isVisible = false;
    });

    // Check initial state from localStorage
    const wasOpened = localStorage.getItem('wedding-invitation-opened') === 'true';
    const cover = document.getElementById('invitation-cover');

    if (wasOpened || (cover && cover.classList.contains('hidden'))) {
      // Invitation was previously opened or is currently hidden
      isVisible = true;
    } else {
      // Invitation cover is showing
      isVisible = false;
    }
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', updateActiveSection);
  });
</script>

<div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:block transition-opacity duration-500 {isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
  <nav class="bg-wedding-oatmilk/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-wedding-dark-matcha-green/20 p-2">
    <div class="flex flex-col gap-2">
      {#each sections as section, index (section.id)}
        <button
          on:click={(e) => scrollToSection(section.id, e)}
          class="relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 {activeSection === section.id ? 'bg-wedding-dark-matcha-green text-white shadow-md' : 'text-gray-600 hover:bg-wedding-raspberry/20 hover:text-wedding-raspberry active:bg-wedding-raspberry/20'}"
          aria-label={section.name}
          title={section.name}
        >
          <span class="text-xl">{section.icon}</span>

          <!-- Active indicator line -->
          {#if activeSection === section.id}
            <div class="absolute -left-2 w-1 h-8 bg-wedding-dark-matcha-green rounded-full"></div>
          {/if}

          <!-- Tooltip -->
          <div class="absolute right-full mr-3 px-3 py-1 bg-wedding-dark-matcha-green text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {section.name}
            <div class="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-wedding-dark-matcha-green"></div>
          </div>
        </button>

        <!-- Connector line between steps -->
        {#if index < sections.length - 1}
          <div class="w-0.5 h-4 mx-auto {activeSection === section.id || activeSection === sections[index + 1].id ? 'bg-wedding-dark-matcha-green/50' : 'bg-gray-300'} transition-colors"></div>
        {/if}
      {/each}
    </div>
  </nav>
</div>

<!-- Mobile version - bottom fixed -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden transition-opacity duration-500 {isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
  <nav class="bg-wedding-oatmilk/95 backdrop-blur-sm rounded-full shadow-lg border-2 border-wedding-dark-matcha-green/20 px-4 py-2">
    <div class="flex gap-2">
      {#each sections as section (section.id)}
        <button
          on:click={(e) => scrollToSection(section.id, e)}
          class="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-0 {activeSection === section.id ? 'bg-wedding-dark-matcha-green text-white' : 'text-gray-600 hover:bg-wedding-raspberry/20 active:bg-wedding-raspberry/20'}"
          aria-label={section.name}
        >
          <span class="text-lg">{section.icon}</span>
          {#if activeSection === section.id}
            <div class="absolute -bottom-1 w-8 h-1 bg-wedding-dark-matcha-green rounded-full"></div>
          {/if}
        </button>
      {/each}
    </div>
  </nav>
</div>

<style>
  nav button {
    position: relative;
  }
</style>

