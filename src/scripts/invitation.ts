// Invitation open/close logic
export function initInvitation() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const cover = document.getElementById('invitation-cover');
  const content = document.getElementById('invitation-content');
  const openBtn = document.getElementById('open-invitation-btn');
  const closeBtn = document.getElementById('close-invitation-btn');
  const STORAGE_KEY = 'wedding-invitation-opened';
  let isInvitationOpen = false;

  // Check if invitation was previously opened
  function checkInvitationState() {
    const wasOpened = localStorage.getItem(STORAGE_KEY) === 'true';
    if (wasOpened && cover && content) {
      cover.classList.add('hidden');
      content.classList.remove('hidden');
      content.style.opacity = '1';
      content.style.transform = 'scale(1) translateY(0)';
      isInvitationOpen = true;

      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('invitation-opened'));
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  }

  // Prevent scrolling when invitation is closed
  function preventScroll(e: Event) {
    if (!isInvitationOpen) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  function preventWheel(e: WheelEvent) {
    if (!isInvitationOpen) {
      e.preventDefault();
      return false;
    }
  }

  function preventKeyboardScroll(e: KeyboardEvent) {
    if (!isInvitationOpen) {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
        return false;
      }
    }
  }

  function preventTouchMove(e: TouchEvent) {
    if (!isInvitationOpen) {
      e.preventDefault();
      return false;
    }
  }

  function openInvitation() {
    if (!cover || !content) return;

    isInvitationOpen = true;
    localStorage.setItem(STORAGE_KEY, 'true');

    const envelopeFlap = document.getElementById('envelope-flap');
    const envelopeContainer = document.getElementById('envelope-container');

    if (envelopeFlap && envelopeContainer) {
      envelopeFlap.style.transform = 'rotateX(-180deg)';
      envelopeFlap.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';

      setTimeout(() => {
        cover.style.opacity = '0';
        cover.style.transform = 'scale(0.95)';
        cover.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        cover.style.pointerEvents = 'none';

        setTimeout(() => {
          cover.classList.add('hidden');
          content.classList.remove('hidden');
          content.style.opacity = '0';
          content.style.transform = 'scale(0.9) translateY(30px)';

          window.dispatchEvent(new CustomEvent('invitation-opened'));
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';

          requestAnimationFrame(() => {
            content.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
          });
        }, 500);
      }, 1000);
    } else {
      cover.style.opacity = '0';
      cover.style.transform = 'scale(0.8) translateY(-50px)';
      cover.style.pointerEvents = 'none';

      setTimeout(() => {
        cover.classList.add('hidden');
        content.classList.remove('hidden');
        content.style.opacity = '0';
        content.style.transform = 'scale(0.9) translateY(30px)';

        window.dispatchEvent(new CustomEvent('invitation-opened'));
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        requestAnimationFrame(() => {
          content.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          content.style.opacity = '1';
          content.style.transform = 'scale(1) translateY(0)';
        });
      }, 300);
    }
  }

  function closeInvitation() {
    if (!cover || !content) return;

    isInvitationOpen = false;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    content.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    content.style.opacity = '0';
    content.style.transform = 'scale(0.9) translateY(30px)';

    window.dispatchEvent(new CustomEvent('invitation-closed'));

    setTimeout(() => {
      content.classList.add('hidden');
      cover.classList.remove('hidden');

      const envelopeFlap = document.getElementById('envelope-flap');
      if (envelopeFlap) {
        envelopeFlap.style.transform = 'rotateX(0deg)';
        envelopeFlap.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
      }

      cover.style.opacity = '0';
      cover.style.transform = 'scale(0.95)';
      cover.style.pointerEvents = 'auto';

      requestAnimationFrame(() => {
        cover.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        cover.style.opacity = '1';
        cover.style.transform = 'scale(1)';
      });
    }, 300);
  }

  // Initialize
  checkInvitationState();

  if (!isInvitationOpen) {
    window.addEventListener('wheel', preventWheel, { passive: false });
    window.addEventListener('touchmove', preventTouchMove, { passive: false });
    window.addEventListener('keydown', preventKeyboardScroll);
    document.addEventListener('scroll', preventScroll, true);
  }

  if (openBtn) {
    openBtn.addEventListener('click', openInvitation);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeInvitation);
  }

  // Cleanup
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('wheel', preventWheel);
    window.removeEventListener('touchmove', preventTouchMove);
    window.removeEventListener('keydown', preventKeyboardScroll);
    document.removeEventListener('scroll', preventScroll, true);
  });
}

