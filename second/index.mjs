import express from 'express';
import serverRoutes from './routes/server.mjs';
import { validateRequest } from './validation/validation.mjs';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validateRequest);
app.use(serverRoutes);

app.listen(PORT);
