const userNameInput = document.querySelector('[name="usuario"]');
const userPassInput = document.querySelector('[name="usuario_senha"]');

const defaultUser = {
    username: "admin",
    password: "admin",
    token: "e40da6f4-4a5e-4a8f-8156-360393242a8e"
};

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async e => {
    const userName = userNameInput.value;
    const userPass = userPassInput.value;

    if (!userName || !userPass) {
        e.preventDefault();
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (userName !== defaultUser.username || userPass !== defaultUser.password) {
        e.preventDefault();
        alert("O usuário ou senha estão errados.");
        return;
    }

    if (userName === defaultUser.username && userPass === defaultUser.password) {
        e.preventDefault();
        await cookieStore.set({ name: "user", value: defaultUser.token, path: "/" });
        window.location.href = "index.html";
    }

});