import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
// import adminRouter from './routes/admin.js';

const app = express();
app.use(express.json());
app.use('/users', usersRouter);
app.use('/auth', authRouter);
// app.use('/admin', adminRouter);

try {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`);  // eslint-disable-line
  });
} catch (error) {
  console.error(`Error al iniciar el servidor: ${error.message}`);     // eslint-disable-line
}