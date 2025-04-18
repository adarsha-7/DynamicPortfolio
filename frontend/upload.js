import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: "dqff5xmgb"
})

const url = cloudinary.url('cld-sample-2', {
    transformation: [
        {fetch_format: 'auto'},
        {quality: 'auto'},
        {width: 1200}
    ]
});
console.log(url);