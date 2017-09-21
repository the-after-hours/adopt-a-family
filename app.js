var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('landing');
});

// DASHBOARD ROUTE
app.get('/dashboard', (req, res) => {
  var sampleEjsText = 'DASHBOARD ROUTE';
  res.render('dashboard', {
    sampleEjsText: sampleEjsText // This is how you pass stuff to your EJS partial.
  });
});

// WISHLIST (SECURE) ROUTE
app.get('/wishlist', (req, res) => {
  var sampleEjsText = 'WISHLIST ROUTE';
  res.render('wishlist', {
    sampleEjsText: sampleEjsText
  });
});

// PAIRING (SECURE) ROUTE
app.get('/pairing', (req, res) => {
  var sampleEjsText = 'PAIRING ROUTE';
  res.render('pairing', {
    sampleEjsText: sampleEjsText
  });
});

// MESSAGING (SECURE) ROUTE
app.get('/messaging', (req, res) => {
  var sampleEjsText = 'MESSAGING ROUTE';
  res.render('messaging', {
    sampleEjsText: sampleEjsText
  });
});

// ORGANIZER (SECURE) ROUTE
app.get('/secure/org', (req, res) => {
  res.render('org/list');
});

// SHOW ROUTE
// this route will show the specific wishlist ":id" on a separate page
app.get('/secure/wishlist/:id', (req, res) => {

});

// CREATE ROUTE
// lets you create/add a new wishlist item to wishlist "id"
app.post('/secure/wishlist/:id', (req, res) => {
  // Look up wishlist using id
  // create new entries
  // connect new entry to wishlist
  // redirect to wishlist show page
});

app.listen(3000, () => {
  console.log('server running on port 3000');
  console.log('connect to localhost:3000');
});