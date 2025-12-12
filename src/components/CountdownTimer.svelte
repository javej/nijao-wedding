<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function updateCountdown() {
    const weddingDate = new Date('2027-01-08T14:00:00').getTime(); // January 8, 2027 at 2:00 PM
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
      return;
    }

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  onMount(() => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<div class="mb-6 sm:mb-8 md:mb-10 px-2">
  <div class="flex justify-center items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-6 mb-3 sm:mb-4 flex-wrap">
    <div class="bg-wedding-oatmilk rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-lg border-2 border-wedding-dark-matcha-green/30 min-w-[55px] sm:min-w-[65px] md:min-w-[70px] lg:min-w-[90px] flex-shrink-0">
      <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wedding-dark-matcha-green leading-tight">
        {days.toString().padStart(2, '0')}
      </div>
      <div class="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1">Days</div>
    </div>
    <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-wedding-raspberry font-bold flex-shrink-0">:</div>
    <div class="bg-wedding-oatmilk rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-lg border-2 border-wedding-dark-matcha-green/30 min-w-[55px] sm:min-w-[65px] md:min-w-[70px] lg:min-w-[90px] flex-shrink-0">
      <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wedding-dark-matcha-green leading-tight">
        {hours.toString().padStart(2, '0')}
      </div>
      <div class="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1">Hours</div>
    </div>
    <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-wedding-raspberry font-bold flex-shrink-0">:</div>
    <div class="bg-wedding-oatmilk rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-lg border-2 border-wedding-dark-matcha-green/30 min-w-[55px] sm:min-w-[65px] md:min-w-[70px] lg:min-w-[90px] flex-shrink-0">
      <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wedding-dark-matcha-green leading-tight">
        {minutes.toString().padStart(2, '0')}
      </div>
      <div class="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1">Minutes</div>
    </div>
    <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-wedding-raspberry font-bold flex-shrink-0">:</div>
    <div class="bg-wedding-oatmilk rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-lg border-2 border-wedding-dark-matcha-green/30 min-w-[55px] sm:min-w-[65px] md:min-w-[70px] lg:min-w-[90px] flex-shrink-0">
      <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wedding-dark-matcha-green leading-tight">
        {seconds.toString().padStart(2, '0')}
      </div>
      <div class="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1">Seconds</div>
    </div>
  </div>
  <p class="text-base sm:text-lg md:text-xl lg:text-2xl font-handwriting text-wedding-raspberry font-semibold px-2">
    T-Minus {days} Until I Do!
  </p>
</div>

