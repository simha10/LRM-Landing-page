// Register service worker
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Check for updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available, show update notification
                    console.log('New content is available; please refresh.');
                  } else {
                    // Content is cached for offline use
                    console.log('Content is cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.log('SW registration failed: ', error);
        });
    });
  }
}

// Unregister service worker
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.log('Error during service worker unregistration:', error);
      });
  }
}