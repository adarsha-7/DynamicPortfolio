import axios from 'axios';

const baseURL = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_URL : '';

const callback = (res) => {
    //load content
    res = res.data;
    
    document.querySelector("#resume-btn").href = res.resume;
    document.querySelector(".about-image").src = res.about.image;
    document.querySelector(".about-content").innerHTML = res.about.description;

    const workContainer = document.querySelector("#work-container");

    res.works.sort((a, b) => a.position - b.position);

    for (let i = 0; i < res.works.length; i++) {
        workContainer.innerHTML += `
        <div id="${res.works[i].title}" class="project-card">
            <button class="work-edit w-12 h-6 border-1 flex items-center justify-center rounded fixed top-2 right-2 text-xs hover:cursor-pointer">
                Edit
            </button>
            <p class="project-position w-5 h-5 fixed top-3 left-3 text-xs">${res.works[i].position}</p>
            <h3 class="project-title">${res.works[i].title}</h3>
            <div id="tech-icons-f" class="tech-icons">${res.works[i].frontend}</div>
            <div id="tech-icons-b" class="tech-icons">${res.works[i].backend}</div>
            <div class="project-info">${res.works[i].description}</div>
        </div>
        `
    }

    workContainer.innerHTML += `<div id="add-project" class="bg-cards dark:bg-cards-dark text-gray-800 dark:text-gray-300 rounded-lg shadow-shadow p-4 w-80 h-50 flex flex-col gap-5 duration-500 
        hover:scale-120 hover:cursor-pointer border-gray-300 dark:border-gray-700 border-2 border-dotted justify-center items-center font-thin text-6xl">+</div>`

    document.querySelectorAll('.project-card').forEach(card => {
        //for all card, click event -> url
        card.addEventListener('click', () => {
            const url = res.works.find(work => work.title == card.id)?.url;
            if (url) window.open(url, '_blank');
        });

        //for all card, edit button click event -> form
        card.querySelector(".work-edit").addEventListener("click", (event) => {
            console.log(card.id);
            event.stopPropagation();
        
            const form = document.createElement('div');
            form.className = "work-edit-form bg-cards dark:bg-cards-dark text-gray-800 dark:text-gray-300 h-4/5 w-4/5 max-w-200 z-5 fixed top-1/2 left-1/2 rounded-lg shadow-shadow p-4 flex flex-col items-center gap-5 border-b-1 border-r-1 border-gray-300 dark:border-gray-700 transform -translate-x-1/2 -translate-y-1/2";
            form.innerHTML = `
            <div class="w-full flex justify-between items-start">
                <label class="text-md font-medium">Title</label>
                <button id="remove-work-btn" class="hover:text-red-500 text-sm p-1 hover:cursor-pointer rounded">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <input type="text" value="${card.querySelector(".project-title").textContent}" id="form-title" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="Enter title..." required/>
            
            <label class="w-full text-md font-medium">Description</label>
            <textarea id="form-description" class="w-full flex-1 resize-none px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="Enter description..." required>${card.querySelector(".project-info").innerHTML}</textarea>
            
            <label class="w-full text-md font-medium">Position</label>
            <input type="number" value="${card.querySelector(".project-position").textContent}" id="form-position" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="Enter position (example: 1)" required/>
            
            <button id="form-submit-btn" class="h-10 w-full px-4 py-2 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-cards dark:bg-cards-dark hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">Save</button>
            `;        

            //for form element, save click event-> update
            form.querySelector("#form-submit-btn").addEventListener("click", () => {
                const newData = {
                    title: card.id,
                    newTitle: form.querySelector("#form-title").value,
                    newDescription: form.querySelector("#form-description").value,
                    newPosition: form.querySelector("#form-position").value
                }
                axios.put(`${baseURL}/api/edit/update-work`, newData)
                    .then((res) => {
                        console.log("Updated work: ", res.data);
                        form.remove();
                        workContainer.innerHTML = '';
                        axios.get(`${baseURL}/api/content/`)
                        .then(callback)
                        .catch(err => console.error(err))
                    })
                .catch(err => console.error(err));             
            })

            //for form element, outside click event-> remove 
            const outsideClickListener = (e) => {
                if (!form.contains(e.target)) {
                    form.remove();
                    document.removeEventListener("click", outsideClickListener);
                }
            };
            setTimeout(() => {
                document.addEventListener("click", outsideClickListener);
            }, 0);

            //for the form element, remove button click event -> confirmation
            form.querySelector("#remove-work-btn").addEventListener("click", () => {
                const confirmation = document.createElement('div');
                confirmation.className = "z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cards dark:bg-cards-dark text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg shadow-shadow p-6 w-80 flex flex-col items-center gap-4";
                confirmation.innerHTML = `
                    <p class="text-center text-md">Are you sure you want to delete <span class="font-semibold">${card.id}</span>?</p>
                    <div class="flex gap-4 mt-2">
                        <button id="confirm" class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer">Delete</button>
                        <button id="cancel" class="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">Cancel</button>
                    </div>
                `;                

                //for confirmation element, confirm button click event-> delete 
                confirmation.querySelector("#confirm").addEventListener("click", () => {
                    axios.delete(`${baseURL}/api/edit/delete-work`, { data: { title: card.id } })
                    .then((res) => {
                        console.log("Deleted work: ", res.data);
                        form.remove();
                        confirmation.remove();
                        workContainer.innerHTML = '';
                        axios.get(`${baseURL}/api/content/`)
                        .then(callback)
                        .catch(err => console.error(err))
                    })
                    .catch(err => console.error(err));
                });

                //for confirmation element, cancel button click event-> remove 
                confirmation.querySelector("#cancel").addEventListener("click", () => {
                    confirmation.remove();
                });

                //for confirmation element, outside click event-> remove 
                const outsideClickListenerC = (e) => {
                    if (!confirmation.contains(e.target)) {
                        confirmation.remove();
                        document.removeEventListener("click", outsideClickListenerC);
                    }
                };
                setTimeout(() => {
                    document.addEventListener("click", outsideClickListenerC);
                }, 0);
                document.body.appendChild(confirmation);
            });
            document.body.appendChild(form);
        });        
    });

    //for add project
    document.querySelector("#add-project").addEventListener("click", () => {
        const addForm = document.createElement('div');
        addForm.className = "add-form bg-cards dark:bg-cards-dark text-gray-800 dark:text-gray-300 h-4/5 w-4/5 max-w-200 z-5 fixed top-1/2 left-1/2 rounded-lg shadow-shadow p-4 flex flex-col items-center gap-3 border-b-1 border-r-1 border-gray-300 dark:border-gray-700 transform -translate-x-1/2 -translate-y-1/2";
        
        addForm.innerHTML = `
            <label class="w-full text-md font-medium">Title</label>
            <input type="text" id="add-form-title" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="Enter title..." required/>
            
            <label class="w-full text-md font-medium">Tech Stack</label>
            <div class="w-full flex flex-wrap gap-4">
                <div class="flex flex-wrap gap-3">
                    <span class="text-sm font-normal w-full">Frontend:</span>
                    <label><input type="checkbox" value="html" /> HTML</label>
                    <label><input type="checkbox" value="css" /> CSS</label>
                    <label><input type="checkbox" value="tailwind" /> Tailwind CSS</label>
                    <label><input type="checkbox" value="javascript" /> JavaScript</label>
                    <label><input type="checkbox" value="react" /> React</label>
                </div>
                <div class="flex flex-wrap gap-3">
                    <span class="text-sm font-normal w-full">Backend:</span>
                    <label><input type="checkbox" value="node" /> Node.js</label>
                    <label><input type="checkbox" value="express" /> Express.js</label>
                    <label><input type="checkbox" value="mongo" /> MongoDB</label>
                    <label><input type="checkbox" value="jwt" /> JWT</label>
                </div>
            </div>
        
            <label class="w-full text-md font-medium">Description</label>
            <textarea id="add-form-description" class="w-full flex-1 resize-none px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="Enter description..." required></textarea>
            
            <label class="w-full text-md font-medium">Project link (GitHub)</label>
            <input type="url" id="add-form-url" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none" placeholder="example: github.com/adarsha-7/Portfolio" />
        
            <button id="add-form-submit-btn" class="h-10 w-full px-4 py-2 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-cards dark:bg-cards-dark hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">Save</button>
        `;         
    
        //for form element, save click event-> update
        addForm.querySelector("#add-form-submit-btn").addEventListener("click", () => {

            let frontend = "";
            let backend = "";
            
            frontend += addForm.querySelector('input[type="checkbox"][value="html"]').checked ? `<img src="/icons/html.png" alt="HTML logo">` : "";
            frontend += addForm.querySelector('input[type="checkbox"][value="css"]').checked ? `<img src="/icons/css.png" alt="CSS logo">` : "";
            frontend += addForm.querySelector('input[type="checkbox"][value="tailwind"]').checked ? `<img src="/icons/TailwindCSS.png" alt="TailwindCSS logo">` : "";
            frontend += addForm.querySelector('input[type="checkbox"][value="javascript"]').checked ? `<img src="/icons/JavaScript.png" alt="JavaScript logo">` : "";
            frontend += addForm.querySelector('input[type="checkbox"][value="react"]').checked ? `<img src="/icons/react.png" alt="React logo">` : "";
            
            backend += addForm.querySelector('input[type="checkbox"][value="node"]').checked ? `<img src="/icons/nodejs-sm.png" alt="Node.js logo">` : "";
            backend += addForm.querySelector('input[type="checkbox"][value="express"]').checked ? `<img src="/icons/expressjs-sm-gray.png" alt="Express.js logo">` : "";
            backend += addForm.querySelector('input[type="checkbox"][value="mongo"]').checked ? `<img src="/icons/mongodb-sm.png" alt="MongoDB logo">` : "";
            backend += addForm.querySelector('input[type="checkbox"][value="jwt"]').checked ? `<img src="/icons/jwt-sm.png" alt="JWT logo">` : "";

            axios.get(`${baseURL}/api/edit/next-position`)
            .then((res) => {
                const newProject = {
                    title: addForm.querySelector("#add-form-title").value,
                    description: addForm.querySelector("#add-form-description").value,
                    url: addForm.querySelector("#add-form-url").value,
                    position: res.data.nextPosition,
                    frontend: frontend,
                    backend: backend
                }
                axios.post(`${baseURL}/api/edit/add-work`, newProject)
                .then((res) => {
                    console.log("Added work: ", res.data);
                    addForm.remove();
                    workContainer.innerHTML = '';

                    axios.get(`${baseURL}/api/content/`)
                    .then(callback)
                    .catch(err => console.error(err))
                })
                .catch(err => console.error(err));   
            })
            .catch(err => console.error(err));          
        })

        //for form element, outside click event-> remove 
        const outsideClickListenerA = (e) => {
            if (!addForm.contains(e.target)) {
                addForm.remove();
                document.removeEventListener("click", outsideClickListenerA);
            }
        };
        setTimeout(() => {
            document.addEventListener("click", outsideClickListenerA);
        }, 0);
        document.body.appendChild(addForm);
    })
}

axios.get(`${baseURL}/api/content/`)
.then(callback)
.catch(err => console.error(err))