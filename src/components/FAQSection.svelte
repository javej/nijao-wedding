<script lang="ts">
  import { fly } from 'svelte/transition';

  interface FAQ {
    question: string;
    answer: string;
  }

  const faqs: FAQ[] = [
    {
      question: 'Is there parking available?',
      answer: 'Yes, complimentary parking is available at both venues. The ceremony venue (St. Therese Parish) has parking spaces nearby, and the reception venue (10 22 Lipa) also provides parking facilities for all guests.',
    },
    {
      question: 'Will transportation be provided between the Ceremony and the Reception?',
      answer: 'While we won\'t be providing formal transportation, the reception venue is just a short drive from the ceremony location. We recommend carpooling with friends or using ride-sharing services. Both venues are easily accessible via Waze navigation.',
    },
    {
      question: 'Can I bring a plus-one or my children?',
      answer: 'We\'d love to celebrate with everyone! If you received a plus-one invitation, please feel free to bring them. For children, we welcome families, but please let us know in your RSVP so we can plan accordingly. We want everyone to have a wonderful time!',
    },
    {
      question: 'What should I wear if I can\'t find "Formal Attire"?',
      answer: 'Don\'t worry! We want you to feel comfortable and celebrate with us. If formal attire isn\'t available, wear something you feel beautiful and confident in—whether that\'s a nice dress, a smart casual outfit, or your favorite celebration clothes. The most important thing is that you\'re there to share our special day!',
    },
  ];

  let openIndex: number | null = null;

  function toggleFAQ(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<section id="faq" class="pt-12 pb-20 bg-gradient-to-b from-wedding-dark-matcha-green/5 via-wedding-raspberry/5 to-wedding-dark-matcha-green/5">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-4xl sm:text-5xl font-brush text-center text-wedding-dark-matcha-green mb-4">
      FAQs: Questions & Answers
    </h2>
    <p class="text-center text-gray-700 mb-12 text-lg max-w-2xl mx-auto">
      We've compiled answers to the most common questions. If you have any other questions, please don't hesitate to reach out!
    </p>

    <div class="space-y-4">
      {#each faqs as faq, index (index)}
        <div class="bg-wedding-oatmilk rounded-xl shadow-lg border-2 border-wedding-dark-matcha-green/20 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <!-- Question Button -->
          <button
            class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-wedding-dark-matcha-green focus:ring-offset-2 rounded-xl"
            on:click={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 class="text-lg md:text-xl font-handwriting font-bold text-wedding-dark-matcha-green pr-4">
              {faq.question}
            </h3>
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6 text-wedding-raspberry transition-transform duration-300 {openIndex === index ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <!-- Answer Content -->
          {#if openIndex === index}
            <div
              id={`faq-answer-${index}`}
              class="px-6 pb-5"
              transition:fly={{ y: -10, duration: 300 }}
            >
              <div class="pt-2 border-t-2 border-wedding-dark-matcha-green/20">
                <p class="text-gray-700 leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Contact Note -->
    <div class="mt-12 text-center">
      <p class="text-gray-600 italic">
        Still have questions? Feel free to reach out to us directly!
      </p>
    </div>
  </div>
</section>

