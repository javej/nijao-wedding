<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface FormData {
    name: string;
    email: string;
    guests: number;
    dietaryRestrictions: string;
    songRequests: string;
  }

  let formData: FormData = {
    name: '',
    email: '',
    guests: 1,
    dietaryRestrictions: '',
    songRequests: '',
  };

  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let errorMessage = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitStatus = 'idle';
    errorMessage = '';

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      submitStatus = 'success';
      // Reset form
      formData = {
        name: '',
        email: '',
        guests: 1,
        dietaryRestrictions: '',
        songRequests: '',
      };
    } catch (error) {
      submitStatus = 'error';
      errorMessage = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="bg-white rounded-lg shadow-lg p-6 sm:p-8" in:fade={{ duration: 300 }}>
  {#if submitStatus === 'success'}
    <div class="text-center py-8" transition:fly={{ y: 20, duration: 400, easing: quintOut }}>
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-handwriting font-bold text-wedding-matcha-green mb-2">
        Thank You!
      </h2>
      <p class="text-gray-700">
        We've received your RSVP. We can't wait to celebrate with you!
      </p>
    </div>
  {:else}
    <form on:submit={handleSubmit} class="space-y-6">
      <!-- Name -->
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          class="w-full px-4 py-3 border border-wedding-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-matcha-green focus:border-transparent outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <!-- Email -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          required
          class="w-full px-4 py-3 border border-wedding-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-matcha-green focus:border-transparent outline-none"
          placeholder="your.email@example.com"
        />
      </div>

      <!-- Number of Guests -->
      <div>
        <label
          for="guests"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Number of Guests *
        </label>
        <input
          type="number"
          id="guests"
          bind:value={formData.guests}
          min="1"
          max="10"
          required
          class="w-full px-4 py-3 border border-wedding-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-matcha-green focus:border-transparent outline-none"
        />
      </div>

      <!-- Dietary Restrictions -->
      <div>
        <label
          for="dietary"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Dietary Restrictions or Allergies
        </label>
        <textarea
          id="dietary"
          bind:value={formData.dietaryRestrictions}
          rows="3"
          class="w-full px-4 py-3 border border-wedding-secondary rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent outline-none resize-none"
          placeholder="Please let us know about any dietary restrictions or allergies..."
        ></textarea>
      </div>

      <!-- Song Requests -->
      <div>
        <label
          for="songs"
          class="block text-sm font-medium text-wedding-matcha-green mb-2"
        >
          Song Requests
        </label>
        <textarea
          id="songs"
          bind:value={formData.songRequests}
          rows="3"
          class="w-full px-4 py-3 border border-wedding-secondary rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent outline-none resize-none"
          placeholder="Any songs you'd like to hear at the reception?"
        ></textarea>
      </div>

      <!-- Error Message -->
      {#if submitStatus === 'error'}
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" transition:fly={{ y: -10, duration: 300 }}>
          {errorMessage || 'Failed to submit RSVP. Please try again.'}
        </div>
      {/if}

      <!-- Submit Button -->
      <button
        type="submit"
        disabled={isSubmitting}
        class="w-full bg-wedding-pink-clouds text-white py-3 rounded-lg font-semibold hover:bg-wedding-pink-clouds transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  {/if}
</div>

