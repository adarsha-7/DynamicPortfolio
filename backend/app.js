const express = require('express');
const app = express();

const PORT = 5500;

app.get('/api/click', (req, res) => res.json({msg: "Button Clicked"}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});