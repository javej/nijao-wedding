<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface GuestbookEntry {
    id: string;
    name: string;
    message: string;
    timestamp: string;
  }

  let entries: GuestbookEntry[] = [];
  let newEntry = {
    name: '',
    message: '',
  };
  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';

  // Load entries from API or local storage
  onMount(async () => {
    try {
      const response = await fetch('/api/guestbook');
      if (response.ok) {
        entries = await response.json();
      }
    } catch (error) {
      console.error('Failed to load guestbook entries:', error);
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitStatus = 'idle';

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const entry = await response.json();
      entries = [entry, ...entries];
      newEntry = { name: '', message: '' };
      submitStatus = 'success';
    } catch (error) {
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
    }
  }

  function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
</script>

<div class="space-y-8" in:fade={{ duration: 300 }}>
  <!-- Guestbook Form -->
  <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8" transition:fly={{ y: 20, duration: 400, easing: quintOut }}>
    <h2 class="text-2xl font-handwriting font-bold text-wedding-matcha-green mb-6">
      Leave a Message
    </h2>

    {#if submitStatus === 'success'}
      <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4" transition:fly={{ y: -10, duration: 300 }}>
        Thank you for your message! It has been added to the guestbook.
      </div>
    {/if}

    {#if submitStatus === 'error'}
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4" transition:fly={{ y: -10, duration: 300 }}>
        Failed to submit message. Please try again.
      </div>
    {/if}

    <form on:submit={handleSubmit} class="space-y-4">
      <div>
        <label
          for="guestbook-name"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Your Name *
        </label>
        <input
          type="text"
          id="guestbook-name"
          bind:value={newEntry.name}
          required
          class="w-full px-4 py-3 border border-wedding-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-matcha-green focus:border-transparent outline-none"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label
          for="guestbook-message"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Your Message *
        </label>
        <textarea
          id="guestbook-message"
          bind:value={newEntry.message}
          required
          rows="4"
          class="w-full px-4 py-3 border border-wedding-secondary rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent outline-none resize-none"
          placeholder="Share your well wishes, memories, or thoughts..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full bg-wedding-pink-clouds text-white py-3 rounded-lg font-semibold hover:bg-wedding-pink-clouds transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Message'}
      </button>
    </form>
  </div>

  <!-- Guestbook Entries -->
  <div class="space-y-4">
    <h2 class="text-2xl font-handwriting font-bold text-wedding-matcha-green mb-6">
      Messages from Our Guests
    </h2>

    {#if entries.length === 0}
      <div class="bg-white rounded-lg shadow-md p-8 text-center text-gray-700">
        <p>No messages yet. Be the first to leave a message!</p>
      </div>
    {:else}
      {#each entries as entry (entry.id)}
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-wedding-matcha-green" transition:fly={{ y: 20, duration: 400, easing: quintOut }}>
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-wedding-matcha-green">
              {entry.name}
            </h3>
            <span class="text-sm text-gray-600">
              {formatDate(entry.timestamp)}
            </span>
          </div>
          <p class="text-gray-700 leading-relaxed">{entry.message}</p>
        </div>
      {/each}
    {/if}
  </div>
</div>

