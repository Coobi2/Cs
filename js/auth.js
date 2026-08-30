const Auth = {
    isAuthenticated: false,
    sessionTimer: null,
    
    init: () => {
        // Check WebAuthn support
        if (window.PublicKeyCredential) {
            Auth.checkBiometric();
        } else {
            Auth.showFallback();
        }

        document.getElementById('bio-btn').addEventListener('click', Auth.authenticateBiometric);
        document.getElementById('bio-fallback').addEventListener('click', Auth.showFallback);

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

    checkBiometric: async () => {
        try {
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            if (!available) {
                document.getElementById('bio-prompt').innerText = "Biometrics not available. Use password.";
                document.getElementById('bio-btn').innerText = "Enter Password";
            }
        } catch (error) {
            console.error("Biometric check error:", error);
            Auth.showFallback();
        }
    },

    authenticateBiometric: async () => {
        try {
            // Generate challenge
            const challenge = new Uint8Array(32);
            crypto.getRandomValues(challenge);
            
            const publicKey = {
                challenge: challenge,
                timeout: 60000,
                userVerification: "required",
                authenticatorSelection: { 
                    userVerification: "required",
                    authenticatorAttachment: "platform"
                }
            };
            
            const cred = await navigator.credentials.get({ publicKey });
            if (cred) {
                Auth.success();
            }
        } catch (err) {
            console.error("Authentication error:", err);
            document.getElementById('bio-prompt').innerText = "Authentication failed. Try again or use password.";
            Auth.showFallback();
        }
    },

    showFallback: () => {
        const bioPrompt = document.getElementById('bio-prompt');
        const bioBtn = document.getElementById('bio-btn');
        
        bioPrompt.innerHTML = `
            <input type="password" placeholder="Password" style="margin-bottom:10px; padding:15px; width:100%; border-radius:8px; border:1px solid #ccc;" id="pwd-input">
            <input type="text" placeholder="2FA Code" style="padding:15px; width:100%; border-radius:8px; border:1px solid #ccc; margin-bottom:10px;" id="2fa-input">
        `;
        bioBtn.innerText = "Login";
        bioBtn.onclick = () => {
            const pwd = document.getElementById('pwd-input').value;
            const tfa = document.getElementById('2fa-input').value;
            if (pwd.length > 0 && tfa.length > 0) {
                Auth.success();
            } else {
                UI.toast("Enter valid credentials");
            }
        };
    },

    success: () => {
        Auth.isAuthenticated = true;
        document.getElementById('biometric-overlay').classList.add('hidden');
        document.getElementById('bottom-nav').classList.remove('hidden');
        UI.navigate('dashboard');
        Auth.resetSessionTimer();
    },

    resetSessionTimer: () => {
        clearTimeout(Auth.sessionTimer);
        Auth.sessionTimer = setTimeout(() => {
            Auth.isAuthenticated = false;
            document.getElementById('biometric-overlay').classList.remove('hidden');
            document.getElementById('bottom-nav').classList.add('hidden');
        }, 5 * 60 * 1000); // 5 minutes
    }
};
