import axios from 'axios';
function refreshToken() {
    axios.post('/api/admin/refresh')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

refreshToken()
setInterval(refreshToken, 290 * 1000)