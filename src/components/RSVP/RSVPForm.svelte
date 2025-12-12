<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  interface FormData {
    name: string;
    email: string;
    attending: 'yes' | 'no' | '';
  }

  let formData: FormData = {
    name: '',
    email: '',
    attending: '',
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
        attending: '',
      };
    } catch (error) {
      submitStatus = 'error';
      errorMessage = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="bg-wedding-oatmilk rounded-lg shadow-lg p-6 sm:p-8" in:fade={{ duration: 300 }}>
  {#if submitStatus === 'success'}
    <div class="text-center py-8" transition:fly={{ y: 20, duration: 400, easing: quintOut }}>
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-handwriting font-bold text-wedding-dark-matcha-green mb-2">
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
          class="block text-sm font-medium text-wedding-dark-matcha-green mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          class="w-full px-4 py-3 border border-wedding-dark-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-dark-matcha-green focus:border-transparent outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <!-- Email -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-wedding-dark-matcha-green mb-2"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          required
          class="w-full px-4 py-3 border border-wedding-dark-matcha-green rounded-lg focus:ring-2 focus:ring-wedding-dark-matcha-green focus:border-transparent outline-none"
          placeholder="your.email@example.com"
        />
      </div>

      <!-- Will you be attending? -->
      <fieldset>
        <legend class="block text-sm font-medium text-wedding-dark-matcha-green mb-3">
          Will you be attending? *
        </legend>
        <div class="flex gap-6">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              bind:group={formData.attending}
              value="yes"
              required
              class="w-5 h-5 text-wedding-raspberry focus:ring-wedding-raspberry border-wedding-dark-matcha-green"
            />
            <span class="ml-2 text-gray-700">Yes, I'll be there!</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              bind:group={formData.attending}
              value="no"
              required
              class="w-5 h-5 text-wedding-raspberry focus:ring-wedding-raspberry border-wedding-dark-matcha-green"
            />
            <span class="ml-2 text-gray-700">Sorry, can't make it</span>
          </label>
        </div>
      </fieldset>


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
        class="w-full bg-wedding-raspberry text-white py-3 rounded-lg font-semibold hover:bg-wedding-raspberry/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  {/if}
</div>

