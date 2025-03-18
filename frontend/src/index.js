const homePage = document.getElementById("home-page");
const skillsPage = document.getElementById("skills-page");
const projectsPage = document.getElementById("projects-page");

document.querySelector("#home-button").addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    homePage.style.display = "flex"; 

    setTimeout(() => {
        skillsPage.style.transform = "translateX(-100%)";  
        projectsPage.style.transform = "translateX(100%)";  
        homePage.style.transform = "translateX(0)"; 
    }, 0); 

    setTimeout(() => {
        skillsPage.style.display = "none";
        projectsPage.style.display = "none";
        document.body.style.overflow = "auto";
    }, 1100); 
});

document.querySelector("#skills-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    skillsPage.style.display = "flex"; 

    setTimeout(() => {
        homePage.style.transform = "translateX(100%)";
        skillsPage.style.transform = "translateX(0)";  
    }, 0);

 
    setTimeout(() => {
        homePage.style.display = "none";
        document.body.style.overflow = "auto"; 
    }, 1100); 
});

document.querySelector("#projects-btn").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    projectsPage.style.display = "flex"; 

    setTimeout(() => {
        homePage.style.transform = "translateX(-100%)";
        projectsPage.style.transform = "translateX(0)";  
    }, 0);

 
    setTimeout(() => {
        homePage.style.display = "none";
        document.body.style.overflow = "auto"; 
    }, 1100); 
});