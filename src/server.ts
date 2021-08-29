import express from 'express';
import { ClienteRouter } from './routes/cliente.route';
import { EnderecoRouter } from './routes/endereco.route';

const app = express();
const port = 3000;

app.use('/', express.urlencoded({extended: true}));
app.use('/', express.json());

app.use('/cliente', ClienteRouter);
app.use('/endereco', EnderecoRouter);


app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});