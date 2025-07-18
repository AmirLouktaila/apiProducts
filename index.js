const express = require("express");
const app = express();
const cors = require('cors');
const database = require("./supabase_func");
const productsTable = database('products');
const categoryTable = database('category');
const usersTable = database('users');
app.use(express.json()); 
app.use(cors()); 
const PORT = 3000
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
app.get('/users', async (_req, res) => {
    try {
        const users = await usersTable.getAllProducts(); // ✅ استدعاء صحيح

        if (users.length > 0) {
            return res.send({
                success: true,
                users: users
            });
        }

        return res.send({
            success: false,
            message: 'no users',
            users: users // ✅ تصحيح المفتاح
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
app.get('/deleteProduct', async (req, res) => {
    const { id } = req.query;
    try {
        const deleteProduct = await productsTable.Delete(id);

        if (deleteProduct) {
            return res.send({
                success: true,
             
            });
        }

        return res.send({
            success: false,
 
  
        });

    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.post('/RequestUser', async (req, res) => {
    try {
        const {
            fullName,
            shippinginhome,
            phone,
            state,
            bladia,
            idProduct,
            finalPrice,
            quantity
        } = req.body;

        const { data, error } = await usersTable.createUser({
            fullName,
            shippinginhome,
            phone,
            state,
            bladia,
            idProduct,
            finalPrice,
            quantity
        });

        if (error) {
            console.error('Insert error:', error.message);
            return res.status(500).send({
                success: false,
                message: 'Error inserting user',
                error: error.message
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User added successfully',
            data
        });

    } catch (err) {
        console.error('Server error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
});

app.post('/PostProduct', async (req, res) => {
    try {
        const {
            title,
            price,
            originalPrice,
            image,
            imageList,
            category,
            description,
        } = req.body;

        const { data, error } = await productsTable.createUser({
            title,
            price,
            originalPrice,
            image,
            imageList,
            category,
            description,
        });

        if (error) {
            console.error('Insert error:', error.message);
            return res.status(500).send({
                success: false,
                message: 'Error inserting Product',
                error: error.message
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Product added successfully',
            data
        });

    } catch (err) {
        console.error('Server error:', err.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
});




app.listen(PORT, () =>
    console.log(`🚀 http://localhost:${PORT} قيد التشغيل`)
);
