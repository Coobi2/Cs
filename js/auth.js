const Auth = {
    isAuthenticated: false,
    sessionTimer: null,
    
    init: () => {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', Auth.login);
        }

        // Privacy Mode on App Switch
        document.addEventListener('visibilitychange', () => {
            const overlay = document.getElementById('privacy-overlay');
            if (document.hidden) {
                if (Auth.isAuthenticated) overlay.classList.remove('hidden');
            } else {
                overlay.classList.add('hidden');
                Auth.resetSessionTimer();
            }
        });
    },

    login: () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // For demo, accept any input
        if (email && password) {
            Auth.isAuthenticated = true;
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('bottom-nav').classList.remove('hidden');
            UI.navigate('dashboard');
            Auth.resetSessionTimer();
        } else {
            UI.toast("Please enter your login ID and password");
        }
    },

    resetSessionTimer: () => {
        clearTimeout(Auth.sessionTimer);
        Auth.sessionTimer = setTimeout(() => {
            Auth.isAuthenticated = false;
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('bottom-nav').classList.add('hidden');
            document.getElementById('main-view').innerHTML = '';
            UI.toast("Session expired for security. Please log in again.");
        }, 5 * 60 * 1000); // 5 minutes
    }
};
