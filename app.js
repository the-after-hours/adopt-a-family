var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.render('landing');
});

// DASHBOARD ROUTE
app.get('/dashboard', function(req, res) {
    var sampleEjsText = 'DASHBOARD ROUTE';
    res.render('dashboard', {
        sampleEjsText: sampleEjsText // This is how you pass stuff to your EJS partial.
    });
});

// WISHLIST (SECURE) ROUTE
app.get("/secure/wishlist", function(req, res) {

});

// ORGANIZER (SECURE) ROUTE
app.get("/secure/org", function(req, res) {
    res.render('org/list');
});

// SHOW ROUTE
// this route will show the specific wishlist ":id" on a separate page
app.get("/secure/wishlist/:id", function(req, res) {

});

// CREATE ROUTE
// lets you create/add a new wishlist item to wishlist "id"
app.post("/secure/wishlist/:id", function(req, res) {
    // look up wishlist using id
    // create new entries
    // connect new entry to wishlist
    // redirect to wishlist show page
});

app.listen(3000, function() {
    console.log('server running on port 3000');
    console.log('connect to localhost:3000');
});