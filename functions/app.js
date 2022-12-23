const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./config/database');
database.authenticate().then(() => console.log('database connected!'));

app.use(express.json());
app.use(cors());

const Parent = require('./models/parent');
const Children = require('./models/children');
const ParentProduct = require('./models/product_parent');
const ChildrenProduct = require('./models/product_children');
const Product = require('./models/product');

const productService = require('./service/product-service');

app.get('/', (req, res) => res.send("responded"));

// Parent route

app.post('/items', async (req, res) => {
    try {
        console.log(req.body);
        const {name, gender, type, parent_id} = req.body;
        let newItem = null;
        if (type === 'parent') {
            newItem = new Parent({name, gender});
        } else if (type === 'children') {
            newItem = new Children({name, gender, parent_id});
        }
        if (newItem === null) {
            throw new Error('newItem variable cannot be null!');
        }
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.get('/items/:type', async (req, res) => {
    try {
        const type = req.params.type;
        let result = null;
        if (type === 'parent') {
            result = await Parent.findAll({raw: true});
            console.log(`result origin`, result);
            for (const [idx, item] of result.entries()) {
                console.log(`finding childrens of [${item}]`);
                const childrens = await Children.findAll({where: {parent_id: item.parent_id}});
                result[idx].childrens = childrens;
            }
        } else if (type === 'children') {
            result = await Children.findAll({raw: true});
            for (const [idx, item] of result.entries()) {
                const parents = await Parent.findAll({where: {parent_id: item.parent_id}});
                result[idx].parents = parents;
            }
        }
        if (result === null) {
            throw new Error('result variable cannot be null!');
        }
        res.json(result);
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.get('/item/:type/:itemId', async (req, res) => {
    try {
        const itemId = parseInt(req.params.itemId);
        const type = req.params.type;
        let result = null;
        if (type === 'parent') {
            result = await Parent.findOne({where: {parent_id: itemId}, raw: true});
            const parentProducts = [];
            const assignmentIds = await ParentProduct.findAll({where: {parents_parent_id: itemId}, raw: true});
            for (const assignmentId of assignmentIds) {
                const product = await Product.findOne({where: {item_id: assignmentId.items_item_id}, raw: true});
                if (product) {
                    parentProducts.push(product);
                }
            }
            result.assignedProducts = parentProducts;
        } else if (type === 'children') {
            result = await Children.findOne({where: {children_id: itemId}, raw: true});
            const childrenProducts = [];
            const assignmentIds = await ChildrenProduct.findAll({where: {childrens_children_id: itemId}, raw: true});
            for (const assignmentId of assignmentIds) {
                const product = await Product.findOne({where: {item_id: assignmentId.items_item_id}, raw: true});
                if (product) {
                    childrenProducts.push(product);
                }
            }
            result.assignedProducts = childrenProducts;
        }
        if (result === null) {
            throw new Error('result variable cannot be null!');
        }
        res.json(result);
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.delete('/item/:type/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const type = req.params.type;
        if (type === 'parent') {
            await Parent.destroy({where: {parent_id: itemId}});
        } else if (type === 'children') {
            await Children.destroy({where: {children_id: itemId}});
        }
        res.json({deletedItem: itemId});
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.put('/item/:itemId', async (req, res) => {
    try {
        const {name, gender, type} = req.body;
        const itemId = req.params.itemId;
        if (type === 'parent') {
            await Parent.update({name, gender}, {where: {parent_id: itemId}});
        } else if (type === 'children') {
            await Children.update({name, gender}, {where: {children_id: itemId}});
        }
        res.json({updatedItem: itemId});
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.get('/products/', async (req, res) => {
    try {
        const products = await productService.getProducts(null);
        res.json(products);
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.post('/assignItem', async (req, res) => {
    try {
        const {itemId, type, productIds, parentId} = req.body;
        for (const productId of productIds) {
            const getProduct = await productService.getProducts(productId);
            if (getProduct) {
                const newProduct = new Product({
                    item_name: getProduct.title,
                    price: getProduct.price,
                    product_id: getProduct.id,
                });
                await newProduct.save();
                if (type === 'parent') {
                    const newParentProduct = new ParentProduct({
                        item_id: newProduct.productId,
                        parent_id: itemId,
                    })
                    newParentProduct.save();
                } else if (type === 'children') {
                    const newChildrenProduct = new ChildrenProduct({
                        item_id: newProduct.productId,
                        children_id: itemId,
                        parent_id: parentId,
                    })
                    newChildrenProduct.save();
                }
            }
        }
        res.json({itemId: itemId});
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.delete('/deleteItemAssignment/:assignmentId', async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        await Product.destroy({where: {item_id: assignmentId}});
        res.json({deletedItem: itemId});
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.get('/asset/:type', async (req, res) => {
    try {
        const type = req.params.type;
        if (type === 'parent') {
            const findAllProductParent = await ParentProduct.findAll({raw: true});
            for (const [idx, productParent] of findAllProductParent.entries()) {
                const findParent = await Parent.findOne({where: {parent_id: productParent.parents_parent_id}});
                findAllProductParent[idx].parent = findParent;
                const findProduct = await Product.findOne({where: {item_id: productParent.items_item_id}});
                findAllProductParent[idx].product = findProduct;
            }
            res.json(findAllProductParent);
        } else if (type === 'children') {
            const findAllChildrenProduct = await ChildrenProduct.findAll({raw: true});
            for (const [idx, productChildren] of findAllChildrenProduct.entries()) {
                const findChildren = await Children.findOne({where: {children_id: productChildren.childrens_children_id}});
                findAllChildrenProduct[idx].children = findChildren;
                const findProduct = await Product.findOne({where: {item_id: productChildren.items_item_id}});
                findAllChildrenProduct[idx].product = findProduct;
            }
            res.json(findAllChildrenProduct);
        }
    } catch (error) {
        console.error(`Error happened`, error.message);
        res.status(500).send(`Error while trying to execute function.`);
    }
});

app.listen(5000, () => console.log('Port 5000!'));