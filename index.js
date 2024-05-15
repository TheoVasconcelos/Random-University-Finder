import express from 'express';
import axios from 'axios';
import bodyparser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

const apiKey = "AIzaSyAjrvHVuj2Bm5hkl6qRleN9F1vxT3sKDoU"
const searchEngineId = "22397f8ba8627473a"


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/search', async (req, res) => {
    let cityName = req.body.city
    try {
        // University Search API
        const uniSearchResponse = await axios.get("http://universities.hipolabs.com/search?country=" + cityName);
        let uni = JSON.stringify(uniSearchResponse.data[Math.floor(Math.random() * uniSearchResponse.data.length)].name);
        let dom = uniSearchResponse.data[Math.floor(Math.random() * uniSearchResponse.data.length)].domains[0];

        // Google Search API
        const searchResponse = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${uni}&searchType=image`)
        // console.log(searchResponse.data.items)

        let searchData = searchResponse.data.items;
        res.render('index.ejs', {
            university: uni,
            domain: dom,
            value: cityName,
            data: searchData,
        })

    } catch (error) {
        res.render("index.ejs")
        console.log(error.message);
    }
})



app.listen(port, () => {
    console.log(`server running on port ${port}`);
})