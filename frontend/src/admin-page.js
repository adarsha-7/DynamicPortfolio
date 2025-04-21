import axios from 'axios';
const editBtn = document.querySelector('.edit-about-info');
const aboutContent = document.querySelector('.about-content');

editBtn.addEventListener('click', () => {
    const textarea = aboutContent.querySelector('textarea');

    if (textarea) {
        const newText = textarea.value;
        axios.post('/api/edit/about-text', {newText: newText})
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
            
            axios.post('/api/edit/about-image', formData)
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