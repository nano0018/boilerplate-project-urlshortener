require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlChecker = require("./utils/urlChecker");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const urlStore = {
	lastId: 1,
	urls: [{ original_url: "https://forum.freecodecamp.org/", short_url: 1 }],
};
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async function (req, res) {
	const url = req.body.url;
	const status = await urlChecker(url);

	if (status) {
		urlStore.lastId++;
		urlStore.urls.push({ original_url: url, short_url: urlStore.lastId });
		res.json({ original_url: url, short_url: urlStore.lastId });
	} else {
		res.json({ error: "invalid url" });
	}
});

app.get("/api/shorturl/:id", function (req, res) {
  console.log(req.params.id)
	const condition = urlStore.urls.some(
		(url) => url.short_url === Number(req.params.id)
	);
	const url = urlStore.urls.find(
		(url) => url.short_url === Number(req.params.id)
	);
  console.log(condition);
	if (condition) {
		res.redirect(url.original_url);
	} else {
		res.json({ error: "invalid url" });
	}
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
