var net = require('net');
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('promise');
var midi = require('midi-node');
var request = require('request');

function createClient(port, address) {
  return new Promise(function(resolve, reject) {
    var client = new net.Socket();

    client.connect(port, address, function() {
      console.log('MIDI client connected');
      return resolve(client);
    }).on('error', function(err) {
      return reject(err);
    });
  });
}

var app = express();

app.use(bodyParser.raw({
  type: '*/*'
}));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/midi/register', function(req, res) {
  var body = req.body;
  var bodyString = body.toString('utf8');
  console.log('bodyString: ' + bodyString);
  var tokens = bodyString.split(':');
  console.log('tokens: ' + tokens);
  var address = tokens[0];
  var port = parseInt(tokens[1]);
  console.log('tokens: ' + tokens);

  createClient(port, address).then(function(client) {
      // midiWriter = new midi.Writer(client);
      // midiWriter.startFile(0, 1, 128);
      // midiWriter.startTrack();
      // midiWriter.noteOff(0, 0, 80, 100);
      // midiWriter.endOfTrack(0);
      res.send(body);
    })
    .catch(function(err) {
      console.log(err);
    });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});
