var http = require('http');

http.post('/pushtotable', function(req, res) {
    res.send('Username: ' + req.body.username);
    console.log(reaching);
});

http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});