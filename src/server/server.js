import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../client/app/modules/routes';

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

app.get('/csvData', function (req, res) {
  res.sendFile('data.csv', {root: __dirname});
});

app.get('/*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml));
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>ReD3</title>
    <link rel="stylesheet" href="./styles.css">
    <div id=app>${appHtml}</div>
    <script src="./flare.json" charset="utf-8"></script>
    `
}

app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/public', express.static(path.join(__dirname, '../client/public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})