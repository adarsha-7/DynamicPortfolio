import axios from 'axios';
axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_URL : '';

axios.get(`${baseURL}/api/content/`)
.then((res) => {
    res = res.data;
    
    document.querySelector("#resume-btn").href = res.resume;
    document.querySelector(".about-image").src = res.about.image;
    document.querySelector(".about-content").innerHTML = res.about.description;

    const workContainer = document.querySelector("#work-container");

    res.works.sort((a, b) => a.position - b.position);

    for (let i = 0; i < res.works.length; i++) {
        workContainer.innerHTML += `
        <div id="${res.works[i].title}" class="project-card">
            <h3 class="project-title">${res.works[i].title}</h3>
            <div id="tech-icons-f" class="tech-icons">${res.works[i].frontend}</div>
            <div id="tech-icons-b" class="tech-icons">${res.works[i].backend}</div>
            <div class="project-info"><p>${res.works[i].description}</p></div>
        </div>
        `
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const url = res.works.find(work => work.title == card.id)?.url;
            if (url) window.open(url, '_blank');
        });
    });
})
.catch(err => console.error(err))