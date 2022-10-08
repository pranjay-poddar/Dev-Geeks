const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

require('./db')();

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`server is listening on http://localhost:${port}`));