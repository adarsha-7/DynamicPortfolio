import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const params = {email, password};

    axios.get('/api/admin/login', {params})
    .then(res => {
        if(res.data.msg == "Incorrect admin email")
            document.querySelector("#error-message").innerHTML = "Incorrect admin email";
        if(res.data.msg == "Incorrect admin password")
            document.querySelector("#error-message").innerHTML = "Incorrect admin password";

        if(res.data.msg == "Login Success") {
            document.querySelector("#error-message").innerHTML = `Login Success. Go back to home page and go to admin page.`;
            form.reset();
            Notification.requestPermission();
        }
    })
    .catch(err => {
        console.error(err);
    });
});