const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PythonShell = require('python-shell');
// setup
const UPLOAD_PATH = 'uploads';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage, limits: {fileSize: 1000*1000*50}}); // multer configuration

// app
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/html', 'index.html')));

app.post('/api/fileupload', upload.single('testfile'), (req, res) => {
  const file = req.file;
  console.log(file);
  // do python stuff
  const pyOptions = {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    scriptPath: path.join(__dirname, 'public/python'),
    args: [file.originalname]
  }
  PythonShell.run('test.py', pyOptions, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err)
    }
    else {
      console.log(results);
      res.status(200).send(results[0])
    }
  })
});


const portNum = 3001;
const server = app.listen(portNum, '0.0.0.0', () => {
  console.log('Server running. Connect to http://localhost:' + portNum)
})


module.exports = app;
