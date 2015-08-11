var express = require( 'express' );
var app = express( );
var port = process.env.PORT || 8080;
var bodyParser = require( 'body-parser' );

app.use( bodyParser.json( ) );
app.use( bodyParser.urlencoded( {

    extended: true
} ) );
app.use( express.static( __dirname ) );
app.listen( port );

console.log('View the app at http://localhost:' + port);