document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.addEventListener('click', function(event) {
        const loginDropdown = document.querySelector('.btn-login + .dropdown-content');
        const registerDropdown = document.querySelector('.btn-register + .dropdown-content');
        const loginButton = document.querySelector('.btn-login');
        const registerButton = document.querySelector('.btn-register');

        if (!loginButton.contains(event.target) && !loginDropdown.contains(event.target)) {
            loginDropdown.style.display = 'none';
        }

        if (!registerButton.contains(event.target) && !registerDropdown.contains(event.target)) {
            registerDropdown.style.display = 'none';
        }
    });

    document.querySelector('.btn-login').addEventListener('click', function(event) {
        const loginDropdown = document.querySelector('.btn-login + .dropdown-content');
        loginDropdown.style.display = loginDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelector('.btn-register').addEventListener('click', function(event) {
        const registerDropdown = document.querySelector('.btn-register + .dropdown-content');
        registerDropdown.style.display = registerDropdown.style.display === 'block' ? 'none' : 'block';
    });

    function showSuccessMessage(message) {
        document.querySelector('.btn-login').style.display = 'none';
        document.querySelector('.btn-register').style.display = 'none';

        document.querySelector('.btn-login + .dropdown-content').style.display = 'none';
        document.querySelector('.btn-register + .dropdown-content').style.display = 'none';

        const loggedInButton = document.querySelector('.btn-logged-in');
        loggedInButton.textContent = message;
        loggedInButton.style.display = 'block';
    }

    function showAuthButtons() {
        document.querySelector('.btn-login').style.display = 'inline-block';
        document.querySelector('.btn-register').style.display = 'inline-block';
        document.querySelector('.btn-logged-in').style.display = 'none';
    }

    document.querySelector('#login-form form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        
        fetch('submit_login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(responseText => {
            if (responseText.includes("Accesso effettuato con successo!")) {
                showSuccessMessage("Hai effettuato l'accesso");
            } else {
                alert(responseText);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.querySelector('#register-form form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        
        fetch('submit_register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(responseText => {
            if (responseText.includes("success")) {
                showSuccessMessage("Registrazione completata. Hai effettuato l'accesso");
            } else {
                alert(responseText);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.querySelector('.btn-logged-in').addEventListener('click', function() {
        fetch('logout.php', {
            method: 'POST'
        })
        .then(response => response.text())
        .then(responseText => {
            if (responseText.includes("Logout effettuato con successo!")) {
                showAuthButtons();
            } else {
                alert(responseText);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
