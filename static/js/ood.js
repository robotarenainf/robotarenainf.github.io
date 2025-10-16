document.addEventListener('DOMContentLoaded', function() {
    // Data for the OOD scenes. Assumes a specific file structure.
    // Add or modify scenes here as needed.
    const oodData = {
      scene1: {
        caption: "OOD Scenario 1: Pick up the salmon and put it in the pot.",
        videos: {
          original: "./static/videos/ood/scene1/original.mp4",
          policy1: "./static/videos/ood/scene1/policy1.mp4",
          policy2: "./static/videos/ood/scene1/policy2.mp4",
          policy3: "./static/videos/ood/scene1/policy3.mp4",
          policy4: "./static/videos/ood/scene1/policy4.mp4",
        }
      },
      scene2: {
        caption: "OOD Scenario 2: Put blue cube to left corner of the table.",
        videos: {
          original: "./static/videos/ood/scene2/original.mp4",
          policy1: "./static/videos/ood/scene2/policy1.mp4",
          policy2: "./static/videos/ood/scene2/policy2.mp4",
          policy3: "./static/videos/ood/scene2/policy3.mp4",
          policy4: "./static/videos/ood/scene2/policy4.mp4",
        }
      },
      scene3: {
        caption: "OOD Scenario 3: Put brown toy at the bottom center of the table.",
        videos: {
          original: "./static/videos/ood/scene3/original.mp4",
          policy1: "./static/videos/ood/scene3/policy1.mp4",
          policy2: "./static/videos/ood/scene3/policy2.mp4",
          policy3: "./static/videos/ood/scene3/policy3.mp4",
          policy4: "./static/videos/ood/scene3/policy4.mp4",
        }
      },
      scene4: {
        caption: "OOD Scenario 4: Put cucumber in cup.",
        videos: {
          original: "./static/videos/ood/scene4/original.mp4",
          policy1: "./static/videos/ood/scene4/policy1.mp4",
          policy2: "./static/videos/ood/scene4/policy2.mp4",
          policy3: "./static/videos/ood/scene4/policy3.mp4",
          policy4: "./static/videos/ood/scene4/policy4.mp4",
        }
      },
      scene5: {
        caption: "OOD Scenario 4: Put the potato to the left of the carrot.",
        videos: {
          original: "./static/videos/ood/scene5/original.mp4",
          policy1: "./static/videos/ood/scene5/policy1.mp4",
          policy2: "./static/videos/ood/scene5/policy2.mp4",
          policy3: "./static/videos/ood/scene5/policy3.mp4",
          policy4: "./static/videos/ood/scene5/policy4.mp4",
        }
      }
    };
  
    // Select elements within the new OOD section to avoid conflicts
    const oodSection = document.getElementById('ood-video-player').closest('.section');
    const sceneThumbnails = oodSection.querySelectorAll('#ood-carousel .thumbnail-item');
    const policyTabs = oodSection.querySelectorAll('#ood-tabs li');
    const videoPlayer = oodSection.querySelector('#ood-video-player');
    const captionElement = oodSection.querySelector('#ood-caption');
  
    let currentSceneKey = null;
  
    // Function to load a video into the player
    function loadVideo(videoSrc) {
      videoPlayer.src = videoSrc;
      videoPlayer.load();
      videoPlayer.play().catch(e => {
        console.error('Autoplay was prevented for OOD video:', e);
      });
    }
  
    // Function to select a scene
    function selectScene(sceneKey) {
      currentSceneKey = sceneKey;
      const scene = oodData[sceneKey];
      if (!scene) return;
  
      // Update caption
      captionElement.textContent = scene.caption;
  
      // Highlight the active thumbnail
      sceneThumbnails.forEach(thumb => {
        if (thumb.dataset.sceneKey === sceneKey) {
          thumb.classList.add('is-active');
        } else {
          thumb.classList.remove('is-active');
        }
      });
  
      // Reset to the 'Base Scene' tab and load its video
      policyTabs.forEach(tab => tab.classList.remove('is-active'));
      const originalTab = oodSection.querySelector('#ood-tabs li[data-key="original"]');
      if (originalTab) {
        originalTab.classList.add('is-active');
      }
      loadVideo(scene.videos.original);
    }
  
    // Add click listeners to scene thumbnails
    sceneThumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const sceneKey = thumb.dataset.sceneKey;
        selectScene(sceneKey);
      });
    });
  
    // Add click listeners to policy tabs
    policyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (!currentSceneKey) return; // Do nothing if no scene is selected
  
        const policyKey = tab.dataset.key;
        const scene = oodData[currentSceneKey];
        
        if (scene && scene.videos[policyKey]) {
          // Update active tab
          policyTabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
  
          // Load the corresponding video
          loadVideo(scene.videos[policyKey]);
        }
      });
    });
  
    // Initialize the carousel for the OOD section
    const oodCarousel = oodSection.querySelector('#ood-carousel');
    if (oodCarousel) {
      bulmaCarousel.attach(oodCarousel, {
        slidesToScroll: 1,
        slidesToShow: 4, // Adjust as needed
        loop: true,
        pagination: false,
        breakpoints: [
          { changePoint: 480, slidesToShow: 2, slidesToScroll: 1 },
          { changePoint: 640, slidesToShow: 3, slidesToScroll: 1 }
        ]
      });
    }
  
    // Initialize the view with the first scene
    if (sceneThumbnails.length > 0) {
      const firstSceneKey = sceneThumbnails[0].dataset.sceneKey;
      selectScene(firstSceneKey);
    }
  });