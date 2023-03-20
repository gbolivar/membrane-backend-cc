// Import lib native
import express from 'express';
import session from 'express-session'
import cors from 'cors';


import { ErrorHandler } from './src/webService/middlewares/index.js';
import router from './src/webService/router/index.js';

const app = express();
const sess = {
  secret: 'Membrane Challenge',
  cookie: {},
  saveUninitialized: false,
  resave: true,
}

// Use component
app.use(express.json());
app.use(cors('*'));
app.use(session(sess));
app.use('/', router);

const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
});

// Error handlers
app.use(ErrorHandler);