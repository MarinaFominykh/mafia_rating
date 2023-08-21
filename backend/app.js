const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const handlerErrors = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mafia_ratingdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

// mongoose.connect('mongodb://127.0.0.1/mafia_ratingdb', {
//   useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4,
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(cors());
app.use(router);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
