const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
// api key for Spoonacular API
const API_KEY = "01ca5b812aa74ef5a91015f1f7646bec";
// import path library
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/recipes/:word:number', (req, res) => {
	const word = req.params.word;
//	const number = req.params.number;
	const request = unirest.get(`https://api.spoonacular.com/recipes/complexSearch?query=${word}&maxFat=25&number=5&apiKey=${API_KEY}`)
	.then(response => {
	//	const results = response;
	//	const results = response.body.response; // grab array of results
	//	console.log(`Num results=${results.length}`);
		//console.log(response.raw_body);
		res.json(response);
	})
	.catch(error => {
		console.log(`error=${error}`);
		res.json({status:"Error", message: `${error}`});
	});
});
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
app.listen(port, () => {
  console.log(`word-app listening on port ${port}`);
});