const express = require("express");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/public/html/index.html");
})

app.get('/posts*', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
})


app.listen(PORT, () => {
	console.log(`listening on localhost:${PORT}`);
});