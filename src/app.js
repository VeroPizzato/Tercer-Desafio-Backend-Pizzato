const express = require('express')
const ProductManager = require('./ProductManager');

const app = express();

app.use(express.urlencoded({extended: true}))

const filename = `{__dirname}/../products.json`
const productsManager = new ProductManager(filename)

app.get('/products', async (req, res) => {
    try {  
        let cantLimite = req.query.limit       
        const listadoProductos = await productsManager.getProducts()

        const prodFiltrados = cantLimite
        ? listadoProductos.slice(0,cantLimite)
        : listadoProductos

        res.send(prodFiltrados)                  
    }
    catch (err) {
        res.send('Error al obtener productos!')
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const productByID = await productsManager.getProductById(req.params.id);
        console.log(productByID)
        if (!productByID) {
            res.send('Error: Id inexistente!')
            return;
        }
        res.send(productByID);       
    }
    catch (err) {
        res.send('Error al obtener id ' + req.params.id)
    }
});

const main = async () => {
    await productsManager.inicialize()

    app.listen(8080, () => {
        console.log('Servidor listo!')
    })
}

main()