import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL =
    import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_URL : "";

const homePage = document.getElementById("home-page");
const skillsPage = document.getElementById("skills-page");
const projectsPage = document.getElementById("projects-page");
const aboutPage = document.getElementById("about-page");
const contactPage = document.getElementById("contact-page");

document.querySelector("#home-button").addEventListener("click", () => {
    homePage.style.display = "flex";
    document.querySelector("#about-btn").style.pointerEvents = "auto";
    document.querySelector("#contact-btn").style.pointerEvents = "auto";

    setTimeout(() => {
        skillsPage.style.transform = "translateX(-100%)";
        projectsPage.style.transform = "translateX(100%)";
        aboutPage.style.transform = "translateY(-100%)";
        contactPage.style.transform = "translateY(100%)";
        homePage.style.transform = "translateX(0)";
    }, 0);
});

document.querySelector("#skills-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    skillsPage.style.display = "flex";
    document.querySelector("#home-button").style.pointerEvents = "none";
    document.querySelector("#about-btn").style.pointerEvents = "none";
    document.querySelector("#contact-btn").style.pointerEvents = "none";

    setTimeout(() => {
        homePage.style.transform = "translateX(100%)";
        skillsPage.style.transform = "translateX(0)";
    }, 0);

    setTimeout(() => {
        document.querySelector("#home-button").style.pointerEvents = "auto";
    }, 1100);
});

document.querySelector("#works-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    projectsPage.style.display = "flex";
    document.querySelector("#home-button").style.pointerEvents = "none";
    document.querySelector("#about-btn").style.pointerEvents = "none";
    document.querySelector("#contact-btn").style.pointerEvents = "none";

    setTimeout(() => {
        homePage.style.transform = "translateX(-100%)";
        projectsPage.style.transform = "translateX(0)";
    }, 0);

    setTimeout(() => {
        document.querySelector("#home-button").style.pointerEvents = "auto";
    }, 1100);

    setTimeout(() => {
        alert(
            "Content of this page might require 15-20 seconds to load due to cold start of server."
        );
    }, 1000);
});

document.querySelector("#about-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    aboutPage.style.display = "flex";
    document.querySelector("#home-button").style.pointerEvents = "none";
    document.querySelector("#contact-btn").style.pointerEvents = "none";

    setTimeout(() => {
        homePage.style.transform = "translateY(100%)";
        aboutPage.style.transform = "translateY(0)";
    }, 0);

    setTimeout(() => {
        document.querySelector("#home-button").style.pointerEvents = "auto";
    }, 1100);

    setTimeout(() => {
        alert(
            "Content of this page might require 15-20 seconds to load due to cold start of server."
        );
    }, 1000);
});

document.querySelector("#contact-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    contactPage.style.display = "flex";
    document.querySelector("#home-button").style.pointerEvents = "none";
    document.querySelector("#about-btn").style.pointerEvents = "none";

    setTimeout(() => {
        homePage.style.transform = "translateY(-100%)";
        contactPage.style.transform = "translateY(0)";
    }, 0);

    setTimeout(() => {
        document.querySelector("#home-button").style.pointerEvents = "auto";
    }, 1100);
});

//theme
if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");

const themeBtn = document.querySelector(".theme-button");

themeBtn.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");

    if (theme === "light") {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        const iconElement = document.querySelector(".theme-button i");
        iconElement.classList.remove("fas", "fa-moon");
        iconElement.classList.add("fas", "fa-circle");
    } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
        const iconElement = document.querySelector(".theme-button i");
        iconElement.classList.remove("fas", "fa-circle");
        iconElement.classList.add("fas", "fa-moon");
    }
});

// Apply theme on page load
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        const iconElement = document.querySelector(".theme-button i");
        iconElement.classList.add("fas", "fa-circle");
    } else {
        document.documentElement.classList.remove("dark");
        const iconElement = document.querySelector(".theme-button i");
        iconElement.classList.add("fas", "fa-moon");
    }
});

const l1 = "Web developer specializing in";
const l2 = "front-end and back-end";
const l3 = "for websites.";

function typein() {
    let index = 0;
    let interval = setInterval(() => {
        if (index < l1.length) {
            document.querySelector("#l1").innerHTML += l1[index];
            index++;
        } else {
            clearInterval(interval);
            type2();
        }
    }, 50);

    function type2() {
        let index = 0;
        let interval = setInterval(() => {
            if (index < l2.length) {
                document.querySelector("#l2").innerHTML += l2[index];
                index++;
            } else {
                clearInterval(interval);
                type3();
            }
        }, 50);
    }

    function type3() {
        let index = 0;
        let interval = setInterval(() => {
            if (index < l3.length) {
                document.querySelector("#l3").innerHTML += l3[index];
                index++;
            } else {
                clearInterval(interval);
                setTimeout(typeout, 3000);
            }
        }, 50);
    }
}

function typeout() {
    function detype3() {
        let elem = document.querySelector("#l3");
        let interval = setInterval(() => {
            if (elem.innerHTML.length > 0) {
                elem.innerHTML = elem.innerHTML.slice(0, -1);
            } else {
                clearInterval(interval);
                detype2();
            }
        }, 50);
    }

    function detype2() {
        let elem = document.querySelector("#l2");
        let interval = setInterval(() => {
            if (elem.innerHTML.length > 0) {
                elem.innerHTML = elem.innerHTML.slice(0, -1);
            } else {
                clearInterval(interval);
                detype1();
            }
        }, 50);
    }

    function detype1() {
        let elem = document.querySelector("#l1");
        let interval = setInterval(() => {
            if (elem.innerHTML.length > 0) {
                elem.innerHTML = elem.innerHTML.slice(0, -1);
            } else {
                clearInterval(interval);
                setTimeout(typein, 500);
            }
        }, 50);
    }

    detype3();
}

window.onload = typein;

//contact
const form = document.querySelector("#contact");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
    };

    axios
        .post(`${baseURL}/api/contact/send-message`, data)
        .then((res) => {
            console.log(res.data);
            form.reset();
            document.querySelector("#error-message").innerHTML =
                "Message Sent Successfully";
        })
        .catch((err) => {
            console.error(err);
        });
});

//admin

const adminBtn = document.querySelector("#admin");
adminBtn.addEventListener("click", () => {
    if (localStorage.getItem("mode") == "visitor") {
        axios.get(`${baseURL}/api/admin`).then((res) => {
            if (res.data.Authenticated)
                window.location.href = "admin-page.html";
            else window.location.href = "admin-login.html";
        });
    } else if (localStorage.getItem("mode") == "admin")
        window.location.href = "/";
});
