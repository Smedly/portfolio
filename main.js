document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('hero-overlay');
  const heroVideo = document.getElementById('hero-video');
  const inlinePlaceholder = document.getElementById('inline-video-placeholder');
  let isShrunk = false;

    function shrinkSizzleReel() {
    if (isShrunk) return;
    isShrunk = true;

    // Unmute audio on click/keypress user interaction
    heroVideo.muted = false;

    // Fade out prompt text
    const prompt = overlay.querySelector('.overlay-prompt');
    if (prompt) prompt.style.opacity = '0';

    // Move video element into inline header placeholder
    inlinePlaceholder.appendChild(heroVideo);

    // Hide the fullscreen overlay container
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 800);
    }

  // Trigger shrink on user click or keypress
  window.addEventListener('click', shrinkSizzleReel, { once: true });
  window.addEventListener('keydown', shrinkSizzleReel, { once: true });
});


//
function openVideoModal(videoSrc) {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('modal-player');
  
  player.src = videoSrc;
  modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('modal-player');
  
  // Stop playback when closing
  player.src = '';
  modal.style.display = 'none';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
});

function playInlineVideo(container, videoId) {
  const iframe = container.querySelector('iframe');
  const overlay = container.querySelector('.thumb-overlay');
  
  // Set the iframe src with autoplay enabled so it starts playing immediately upon click
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  
  // Hide the thumbnail overlay
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function playCardVideo(overlayElement) {
  // Find the video element right before this overlay
  const video = overlayElement.previousElementSibling;
  
  if (video) {
    // Add controls so user can pause/scrub once playing
    video.setAttribute('controls', 'controls');
    
    // Play video and fade out the custom overlay
    video.play();
    overlayElement.style.display = 'none';
  }
}

function playCardVideo(overlayElement) {
  const video = overlayElement.previousElementSibling;
  
  if (video) {
    // 1. Enable standard HTML5 controls (fullscreen, audio, scrubber, pause)
    video.controls = true;
    
    // 2. Hide the thumbnail overlay completely so user can interact with video controls
    overlayElement.style.display = 'none';
    
    // 3. Play video
    video.play().catch(err => {
      console.log("Autoplay issue or user gesture required:", err);
    });
  }
}

function startVideoPlayback(overlayElement) {
  // Find the video element inside the same container
  const container = overlayElement.closest('.video-container');
  const video = container ? container.querySelector('video') : null;

  if (video) {
    // 1. Enable native controls explicitly
    video.controls = true;

    // 2. Hide overlay so mouse clicks go directly to video controls
    overlayElement.style.display = 'none';

    // 3. Unmute & Play
    video.muted = false;
    video.play().then(() => {
      // Focus video element so keyboard controls (spacebar, arrow keys) work
      video.focus();
    }).catch((err) => {
      console.warn("Playback prevented:", err);
    });
  }
}