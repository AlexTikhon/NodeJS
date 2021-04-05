import express from 'express';
import serverRoutes from './routes/server.mjs';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(serverRoutes);

app.listen(PORT);
