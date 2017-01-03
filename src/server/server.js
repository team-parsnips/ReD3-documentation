var express = require('express')
var app = express()
var path = require('path');

app.get('/data', function (req, res) {
  res.sendFile('sampleData.csv', {root: __dirname});
});

app.get('/usamap', function (req, res) {
  res.sendFile('usamap.json', {root: __dirname});
});

app.get('/flare', function (req, res) {
  res.sendFile('flare.json', {root: __dirname});
});

app.get('/tsvData', function (req, res) {
  res.sendFile('data.tsv', {root: __dirname});
});

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/public', express.static(path.join(__dirname, '../client/public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})