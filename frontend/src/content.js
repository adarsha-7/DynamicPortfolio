import axios from 'axios';
axios.get('/api/content/')
.then((res) => {
    res = res.data;
    
    document.querySelector("#resume-btn").href = res.resume;

    document.querySelector(".about-image").src = res.about.image;
    document.querySelector(".about-content").innerHTML = res.about.description;

    const workContainer = document.querySelector("#work-container");

    res.works.sort((a, b) => a.position - b.position);

    for (let i = 0; i < res.works.length; i++) {
        workContainer.innerHTML += `
        <a class="project-card" href="${res.works[i].url}" target="_blank">
        <h3 class="project-title">${res.works[i].title}</h3>
        <div id="tech-icons-f" class="tech-icons">
        ${res.works[i].frontend}
        </div>
        <div id="tech-icons-b" class="tech-icons">
        ${res.works[i].backend}
        </div>
        <div class="project-info">
          <p>
            ${res.works[i].description}
          </p>
        </div>
        </a>
        `
    }
})
.catch(err => console.error(err))