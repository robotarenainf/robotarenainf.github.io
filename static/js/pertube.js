document.addEventListener('DOMContentLoaded', function() {

  // --- DATA (Your original, working data structure) ---
  const galleryData = {
    scene1: {
      caption: "Place the fork near the yellow cloth.",
      perturbations: { original: "./static/videos/pertube/scene1/original.mp4" }
    },
    scene2: {
      caption: "Place the spoon to the left of the cloth.",
      perturbations: { original: "./static/videos/pertube/scene2/original.mp4" }
    },
    scene3: {
      caption: "Put banana in colander.",
      perturbations: { original: "./static/videos/pertube/scene3/original.mp4" }
    },
    scene4: {
      caption: "Move can to the upper right of table.",
      perturbations: { original: "./static/videos/pertube/scene4/original.mp4" }
    },
    scene5: {
      caption: "Move blue cloth from center to right bottom corner.",
      perturbations: { original: "./static/videos/pertube/scene5/original.mp4" }
    },
    scene6: {
      caption: "Put the yellow object on top of the green object.",
      perturbations: { original: "./static/videos/pertube/scene6/original.mp4" }
    },
    scene7: {
      caption: "Put the stuffed dog inside the pot.",
      perturbations: { original: "./static/videos/pertube/scene7/original.mp4" }
    }
  };

  const perturbationVariants = {
      camera: [
          { id: 'camera1', name: 'Up', icon: '⬆️', file: 'camera1.mp4' },
          { id: 'camera2', name: 'Down', icon: '⬇️', file: 'camera2.mp4' },
          { id: 'camera3', name: 'Forward', icon: '⬅️', file: 'camera3.mp4' },
          { id: 'camera4', name: 'Backward', icon: '➡️', file: 'camera4.mp4' },
          { id: 'camera5', name: 'Zoom In', icon: '🔎', file: 'camera5.mp4' },
          { id: 'camera6', name: 'Zoom Out', icon: '🔭', file: 'camera6.mp4' }
      ],
      color: [
          { id: 'color1', name: 'Variant 1', icon: '🎨', file: 'color1.mp4' },
          { id: 'color2', name: 'Variant 2', icon: '🌈', file: 'color2.mp4' },
          { id: 'color3', name: 'Variant 3', icon: '🖌️', file: 'color3.mp4' }
      ],
      background: [
          { id: 'bg1', name: 'BG 1', icon: '🏞️', file: 'bg1.mp4' },
          { id: 'bg2', name: 'BG 2', icon: '🌅', file: 'bg2.mp4' },
          { id: 'bg3', name: 'BG 3', icon: '🌄', file: 'bg3.mp4' },
          { id: 'bg4', name: 'BG 4', icon: '🏙️', file: 'bg4.mp4' },
          { id: 'bg5', name: 'BG 5', icon: '🌉', file: 'bg5.mp4' }
      ],
      pose: [
          { id: 'pose1', name: 'Pose 1', icon: '💃', file: 'pose1.mp4' },
          { id: 'pose2', name: 'Pose 2', icon: '🕺', file: 'pose2.mp4' },
          { id: 'pose3', name: 'Pose 3', icon: '🧍', file: 'pose3.mp4' }
      ]
  };

  // --- DOM ELEMENTS ---
  const perturbationSection = document.getElementById('perturbation-video-player').closest('.section');
  // Be specific to the #pertube-carousel container
  const pertubeContainer = document.querySelector('#pertube-carousel');
  const sceneThumbnails = pertubeContainer.querySelectorAll('.thumbnail-item');

  // Use the new unique ID for the caption
  const captionElement = document.querySelector('#perturbation-caption');
  // const sceneThumbnails = perturbationSection.querySelectorAll('.carousel .thumbnail-item');
  const perturbationTabs = perturbationSection.querySelectorAll('#perturbation-tabs li');
  const videoPlayer = perturbationSection.querySelector('#perturbation-video-player');
  // const captionElement = perturbationSection.querySelector('#gallery-caption');
  
  // This variable holds the scene key, e.g., "scene1"
  let currentScene = null; 

  // --- FUNCTIONS ---
  function loadVideo(videoSrc) {
      videoPlayer.src = videoSrc;
      videoPlayer.load();
      videoPlayer.play().catch(e => {
          console.error('Autoplay was prevented:', e);
      });
  }

  function selectScene(sceneKey) {
    currentScene = sceneKey;
    const scene = galleryData[sceneKey];
    if (!scene) return;

    captionElement.textContent = scene.caption;
    
    // Highlight the active thumbnail
    sceneThumbnails.forEach(thumb => {
      thumb.classList.toggle('is-active', thumb.dataset.sceneKey === sceneKey);
    });

    // Reset to the "original" tab
    const originalTab = perturbationSection.querySelector('#perturbation-tabs li[data-key="original"]');
    if (originalTab) {
      originalTab.click();
    }
  }

  // --- EVENT LISTENERS ---
  sceneThumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      selectScene(thumb.dataset.sceneKey);
    });
  });

  perturbationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!currentScene) {
        alert("Please select a scenario from the slider first.");
        return;
      }
      
      const perturbationKey = tab.dataset.key;
      
      // Update active tab style
      perturbationTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      
      // === THIS IS THE ONLY PART THAT HAS BEEN CHANGED ===
      if (perturbationKey === 'original') {
          // This part is from your original working code
          const videoSrc = galleryData[currentScene].perturbations.original;
          loadVideo(videoSrc);
      } else {
          // NEW: Randomly select a variant and play it immediately
          const variants = perturbationVariants[perturbationKey];
          if (variants && variants.length > 0) {
            const randomIndex = Math.floor(Math.random() * variants.length);
            const randomVariant = variants[randomIndex];
            
            // Uses your original, correct file path structure
            const videoSrc = `./static/videos/pertube/${currentScene}/${randomVariant.file}`;
            loadVideo(videoSrc);
          } else {
            console.warn(`No variants found for perturbation type: ${perturbationKey}`);
            videoPlayer.src = "";
          }
      }
    });
  });

  // --- INITIALIZATION ---
  const perturbationCarousel = perturbationSection.querySelector('.carousel');
  if (perturbationCarousel && typeof bulmaCarousel !== 'undefined') {
      bulmaCarousel.attach(perturbationCarousel, {
        slidesToScroll: 1,
        slidesToShow: 5,
        loop: true,
        pagination: false,
      });
  }

  if (sceneThumbnails.length > 0) {
    const firstSceneKey = sceneThumbnails[0].dataset.sceneKey;
    selectScene(firstSceneKey);
  }
});