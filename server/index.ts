import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use('/api', routes);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
