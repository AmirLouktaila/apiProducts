const express = require("express");
const app = express();
const database = require("./supabase_func");
const productsTable = database('products');
const categoryTable = database('category');
const cors = require('cors');
PORT = 3000
app.use(cors());
app.get('/products', async (_req, res) => {
    try {
        const products = await productsTable.getAllProducts();

        if (products.length > 0) {
            return res.send({
                success: true,
                products: products
            });
        }

        return res.send({
            success: false,
            message: 'no products',
            products: products
        });

    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.get('/product', async (req, res) => {
    const { id } = req.query;

    try {
        const product = await productsTable.prodcutID(id);

        if (product.length > 0) {
            return res.send({
                success: true,
                product: product
            });
        }

        return res.send({
            success: false,
            message: 'No products found',
            product: product
        });

    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
});
app.get('/categorys', async (_req, res) => {
    try {
        const categorys = await categoryTable.getAllProducts();

        if (categorys.length > 0) {
            return res.send({
                success: true,
                categorys: categorys
            });
        }

        return res.send({
            success: false,
            message: 'no products',
            products: products
        });

    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.post('/createProdcut', async (req, res) => { 
    
})
app.listen(PORT, () =>
    console.log(`🚀 http://localhost:${PORT} قيد التشغيل`)
);
