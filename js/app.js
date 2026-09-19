document.addEventListener('DOMContentLoaded', () => {
    try {
        API.init();
        Auth.init();

        document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', () => UI.navigate(button.dataset.route));
        });

        window.addEventListener('error', event => {
            console.error('Global error:', event.error || event.message);
            UI.toast('Something went wrong. Please try again.');
        });

        window.addEventListener('unhandledrejection', event => {
            console.error('Unhandled promise rejection:', event.reason);
            UI.toast('Something went wrong. Please try again.');
        });

        UI.updateNavVisibility();
        console.log('Schwab simulator initialized successfully');
    } catch (error) {
        console.error('App initialization failed:', error);
    }
});
