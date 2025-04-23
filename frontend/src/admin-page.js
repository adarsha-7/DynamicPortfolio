import axios from 'axios';

const baseURL = import.meta.env.VITE_ENV === 'production' ? 'https://dynamicportfolio-production-ae6c.up.railway.app/' : '';

const editBtn = document.querySelector('.edit-about-info');
const aboutContent = document.querySelector('.about-content');

editBtn.addEventListener('click', () => {
    const textarea = aboutContent.querySelector('textarea');

    if (textarea) {
        const newText = textarea.value;
        axios.post(`${baseURL}/api/edit/about-text`, {newText: newText})
        .then((res) => {
            textarea.remove();
            aboutContent.innerHTML = res.data.text;
        })
        .catch(err => console.error(err));
        editBtn.textContent = 'Edit';
    } 
    else {
        const currentText = aboutContent.innerHTML;
        const width = aboutContent.offsetWidth;
        const height = aboutContent.offsetHeight;

        aboutContent.innerHTML = `
        <textarea class="w-full resize-none p-2 rounded-md border-2" 
            style="width:${width}px; height:${height}px;">${currentText}</textarea>
        `;
        editBtn.textContent = 'Save';
    }
});

const uploadBtn = document.querySelector('.edit-about-photo');

uploadBtn.addEventListener('click', () => {
    if (!document.querySelector('.image-input')) {
        uploadBtn.insertAdjacentHTML('afterend', `
            <input type="file" accept="image/*" class="image-input hidden" required>
            <div class="submit-cancel-btn flex gap-3 mt-2">
                <button class="submit-btn border border-gray-400 px-4 py-1 rounded-md">Submit</button>
                <button class="cancel-btn border border-gray-400 px-4 py-1 rounded-md">Cancel</button>
            </div>
        `);

        const fileInput = document.querySelector('.image-input');
        fileInput.click();

        fileInput.addEventListener('change', () => {
            if (fileInput.files[0]) {
                uploadBtn.textContent = fileInput.files[0].name;
            }
        });

        document.querySelector(".submit-btn").addEventListener("click", () => {
            if (fileInput.files.length == 0) {
                alert("Please select an image before submitting.");
                return;
            }

            const formData = new FormData();
            formData.append('newImage', fileInput.files[0]);
            
            axios.post(`${baseURL}/api/edit/about-image`, formData)
            .then((res) => {
                console.log(res.data.image);
                document.querySelector(".about-image").src = res.data.image;
                document.querySelector(".upload-message").innerHTML = "Image updated successfully"
            })
            .catch(err => console.error(err));
            document.querySelector(".cancel-btn").click();
        });

        document.querySelector(".cancel-btn").addEventListener("click", () => {
            document.querySelector('.image-input').remove();
            document.querySelector('.submit-cancel-btn').remove();
            uploadBtn.textContent = "Upload New";
        });
    }
});

// messages badge
const badge = document.getElementById("message-badge");
const updateMessageBadge = () => {
    axios.get(`${baseURL}/api/edit/messages`)
    .then(res => {
        let unseenCount = 0;
        const messages = res.data;
        messages.forEach((message) => {
            if(!(message.seen)) unseenCount++;
        })
        if (unseenCount > 0) {
            badge.textContent = unseenCount;
            badge.classList.remove("hidden");
            badge.classList.add("flex");
        } 
        else {
            badge.classList.remove("flex");
            badge.classList.add("hidden");
        }
    })
}

updateMessageBadge();

const messageIcon = document.getElementById("message-icon");
const messageBox = document.getElementById("message-box");
const messageList = document.getElementById("message-list");

messageIcon.addEventListener("click", () => {
    messageBox.classList.toggle("hidden");
    axios.get(`${baseURL}/api/edit/messages`)
    .then((res) => {
        const messages = res.data;
        messageList.innerHTML = "";
        messages.forEach(msg => {
            const fontWeight = msg.seen ? 'font-light' : 'font-bold';
            
            const block = `
            <div class="message-block bg-background dark:bg-background-dark p-3 rounded-md text-sm border border-gray-300 dark:border-gray-800 cursor-pointer" data-created="${msg.created}">
                <p class="${fontWeight}">${msg.value}</p>
                <div class="${fontWeight} font-bold flex justify-between text-xs text-gray-500 mt-2">
                    <span>${msg.name} (${msg.email})</span>
                    <span>${new Date(msg.created).toLocaleString()}</span>
                </div>
            </div>
            `;
            messageList.innerHTML += block;
        });

        document.querySelectorAll(".message-block").forEach((block) => {
            block.addEventListener("click", () => {
                const value = block.querySelector("p").textContent.trim();
                const nameEmail = block.querySelector("span:first-child").textContent.trim();
                const time = block.querySelector("span:last-child").textContent.trim();
                const created = block.getAttribute("data-created"); 

                axios.put(`${baseURL}/api/edit/mark-seen`, { created })
                    .catch(err => console.error(err));

                const el = `
                <div id="modal" class="fixed inset-0 bg-black/20 flex items-center justify-center z-10">
                    <div class="bg-white dark:bg-background-dark p-6 rounded-lg w-full max-w-md relative shadow-lg">
                        <button class="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg hover:cursor-pointer" id="closeModal">&times;</button>
                        <h2 class="text-lg font-light mb-2">${nameEmail}</h2>
                        <p class="text-lg mb-4 font-normal">${value}</p>
                        <p class="text-xs text-right text-gray-400">${time}</p>
                    </div>
                </div>
                `;

                document.body.insertAdjacentHTML('beforeend', el);
                const modal = document.getElementById("modal");

                modal.querySelector('#closeModal').addEventListener('click', () => {
                    modal.remove();
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
                updateMessageBadge();
            });
        });
    })
    .catch((err) => {
        console.error(err);
    });
});

document.addEventListener("click", (e) => {
    if (!messageBox.contains(e.target) && !messageIcon.contains(e.target))
        messageBox.classList.add("hidden");
});