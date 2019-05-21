const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/zbx3-f'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname,'/dist/zbx3-f/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);