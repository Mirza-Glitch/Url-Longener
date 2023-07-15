const express = require("express");
const morgan = require("morgan");
const axios = require("axios")
const app = express();

app.use(express.json());
app.use(morgan('tiny'))
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.post("/url", async (req, res)=> {
  let url = req.body.url
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;
  if (!urlRegex.test(url)) {
    return res.json({
      success: false
    })
  }
  let extendedUrl = await getOriginalUrl(url)
  res.json({
    success: !extendedUrl ? false : true, extendedUrl
  })
})

async function getOriginalUrl(url) {
  try {
    const response = await axios.get(url);
    let finalUrl = response.request.socket._httpMessage.socket._httpMessage.socket._httpMessage.socket._httpMessage.res.responseUrl;
    return finalUrl;
  } catch (error) {
    console.error(error);
    return false
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});