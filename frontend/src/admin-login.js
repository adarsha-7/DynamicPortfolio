document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
});

import axios from 'axios';

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

        if(res.data.msg == "Login Success") //redirect to admin page
            document.querySelector("#error-message").innerHTML = "Login Success";
    })
    .catch(err => {
        console.error(err);
    });
});