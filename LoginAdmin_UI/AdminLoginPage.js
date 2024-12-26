const loginSection = document.querySelector('.login-section');
const loginLink = document.querySelector('.login-link');

loginLink.addEventListener('click', () => {
    loginSection.classList.remove('active');
});
