const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 80

app.use(express.static('public'))
http.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});