const express = require('express');
const app = express();
const fs = require('fs');

app.set('port', process.env.PORT || 8888);
app.use(express.static(__dirname + '/public')); 

app.get('/', function(req, res) {
    const data = fs.readFileSync(__dirname + '/view/index.html')
    res.setHeader("content-type", "text/html; charset=utf-8")
    res.end(data)
})

app.listen(app.get('port'), function(){
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate.`);
});