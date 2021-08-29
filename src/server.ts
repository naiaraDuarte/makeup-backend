import express from 'express';
import { ClienteRouter } from './routes/cliente.route';
import { EnderecoRouter } from './routes/endereco.route';
const cors = require('cors');

const app = express();
const port = 3000;

app.use('/', express.urlencoded({extended: true}));
app.use('/', express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "content-type")
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE")
    app.use(cors())
    next();
})


app.use('/cliente', ClienteRouter);
app.use('/endereco', EnderecoRouter);


app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});