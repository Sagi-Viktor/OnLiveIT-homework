import express from "express";
import bodyParser from 'body-parser';
import usersRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js'
import dotenv from 'dotenv';


const app = express();
const PORT = 5000;

// CORS | the built in cors not working somehow |
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

dotenv.config();
app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/products', productRoutes);


app.get("/", (req, resp) => {
    resp.json("Api Works");
});


app.listen(PORT, () => {
    console.log(`server runing on port: http://localhost:${PORT}`);
})
