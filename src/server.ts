import express from 'express';
import { CartaoRouter } from './routes/cartao.route';
import { ClienteRouter } from './routes/cliente.route';
import { EnderecoRouter } from './routes/endereco.route';
import { CalculaFreteRouter } from './routes/calculaFrete.route';
import { ProdutoRouter } from './routes/produto.route';
import { CupomRouter } from './routes/cupom.route';
import { PedidoRouter } from './routes/pedido.route';

const cors = require('cors');

const app = express();
const port = 3001;

app.use('/', express.urlencoded({extended: true}));
app.use('/', express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "content-type")
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH")
    app.use(cors())
    next();
})

app.use('/cliente', ClienteRouter);
app.use('/endereco', EnderecoRouter);
app.use('/cartao', CartaoRouter);
app.use('/frete', CalculaFreteRouter);
app.use('/produto', ProdutoRouter);
app.use('/cupom', CupomRouter);
app.use('/pedido', PedidoRouter);

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});