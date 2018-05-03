const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// setup
const UPLOAD_PATH = 'uploads';

const storage = multer.memoryStorage();
const upload = multer({storage: storage, limits: {fileSize: 1000*1000*50}}); // multer configuration

// app
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/html', 'index.html')));

app.post('/api/fileupload', upload.single('testfile'), (req, res) => {
  const file = req.file;
  console.log('request to upload');
  console.log(file);
  res.sendStatus(200);
});


const portNum = 3001;
const server = app.listen(portNum, '0.0.0.0', () => {
  console.log('Server running. Connect to http://localhost:' + portNum)
})


module.exports = app;
