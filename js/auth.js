const Auth = {
    isAuthenticated: false,
    sessionTimer: null,

    init: () => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.addEventListener('submit', event => {
            event.preventDefault();
            Auth.login();
        });

        document.getElementById('forgot-password')?.addEventListener('click', event => {
            event.preventDefault();
            UI.toast('Password recovery is disabled in this local simulator.');
        });

        document.addEventListener('visibilitychange', () => {
            const overlay = document.getElementById('privacy-overlay');
            if (!overlay) return;

            if (document.hidden && Auth.isAuthenticated) {
                overlay.classList.remove('hidden');
            } else {
                overlay.classList.add('hidden');
                if (Auth.isAuthenticated) Auth.resetSessionTimer();
            }
        });
    },

    login: () => {
        const email = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;

        if (!email || !password) {
            UI.toast('Please enter your login ID and password.');
            return;
        }

        Auth.isAuthenticated = true;
        document.getElementById('login-screen')?.classList.add('hidden');
        document.getElementById('bottom-nav')?.classList.remove('hidden');
        UI.navigate('dashboard');
        Auth.resetSessionTimer();
    },

    logout: () => {
        Auth.isAuthenticated = false;
        clearTimeout(Auth.sessionTimer);
        document.getElementById('privacy-overlay')?.classList.add('hidden');
        document.getElementById('login-screen')?.classList.remove('hidden');
        document.getElementById('bottom-nav')?.classList.add('hidden');
        document.getElementById('main-view').innerHTML = '';
        document.getElementById('login-password').value = '';
    },

    resetSessionTimer: () => {
        clearTimeout(Auth.sessionTimer);
        Auth.sessionTimer = setTimeout(() => {
            Auth.logout();
            UI.toast('Session expired for security. Please log in again.');
        }, 30 * 60 * 1000);
    }
};
