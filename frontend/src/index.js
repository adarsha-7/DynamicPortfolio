const homePage = document.getElementById("home-page");
const skillsPage = document.getElementById("skills-page");
const projectsPage = document.getElementById("projects-page");

document.querySelector("#home-button").addEventListener("click", () => {
    homePage.style.display = "flex"; 

    setTimeout(() => {
        skillsPage.style.transform = "translateX(-100%)";  
        projectsPage.style.transform = "translateX(100%)";  
        homePage.style.transform = "translateX(0)"; 
    }, 0); 
});

document.querySelector("#skills-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    skillsPage.style.display = "flex"; 
    document.querySelector("#home-button").style.pointerEvents = "none";

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

    setTimeout(() => {
        homePage.style.transform = "translateX(-100%)";
        projectsPage.style.transform = "translateX(0)";  
    }, 0);

    setTimeout(() => {
        document.querySelector("#home-button").style.pointerEvents = "auto";
    }, 1100); 
});