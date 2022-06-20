var express = require('express');
var cors = require('cors');
var app = express();

require('dotenv').config();
const multer = require('multer');
const upload = multer();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.any(), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.files[0];
  return res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
