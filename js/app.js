document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
    
    // Navigation listeners
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => UI.navigate(btn.dataset.route));
    });

    // Initialize API data streaming
    API.init();
});
