const express = require('express')
const ProductManager = require('./ProductManager');

const app = express();

const filename = `{__dirname}/../Products.txt`
const productsManager = new ProductManager(filename)

app.get('/products', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.send(products);
        return;
    }
    catch (err) {
        res.send('Error al obtener productos!')
    } 
});

app.get('/products/:id', async (req, res) => {
    try {
        const productByID = await productsManager.getProductById(req.params.id);
        if (!productByID) {
            res.send('Error: Id inexistente!')
        }
        res.send(productByID);
        return;
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