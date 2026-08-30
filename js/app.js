document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication
    Auth.init();
    
    // Navigation listeners
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => UI.navigate(btn.dataset.route));
    });

    // Initialize API data streaming
    API.init();
    
    // Error handling for any uncaught errors
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        UI.toast('An error occurred. Please refresh the page.');
    });
    
    console.log('App initialized successfully');
});
