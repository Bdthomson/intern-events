const express = require('express');
const path = require('path');
const port = process.env.PORT || 7000;
const app = express();

const dir = process.env.NODE_ENV === 'heroku' ? __dirname : __dirname + '/build';

app.use(express.static(dir));

// Redirect all requests to our index.html file. -- Used with BrowserHistory in production.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dir, 'index.html'));
});

app.listen(port);

console.log("Server Started on Port " + port);
