const { Store } = require("../modules/store.model");

const addProductToStore = async (req, res) => {
    const user_id = req.get("user-access");

    const body = req.body;
    const file = req.file;
    var image = file.path;
    if (!file) return res.status(400).send("something went wrong, file couldn't be proccessed")
    var product = new Store({
        ...body,
        image,
        userId: user_id,
    })
    product = await product.save();
    try {
        return res.status(201).json({ message: "Your product has been saved", data: product, productId: product._id })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const editProduct = async (req, res) => {
    const body = req.body;
    const product_id = req.params.id;
    await Store.findByIdAndUpdate(product_id, body).then(
        product => {
            return res.status(201).json({ message: "Updated successfully!", data: product })
        }
    ).catch(err => { return res.status(400).send(err) });
}

const getProduct = async (req, res) => {
    var products = await Store.find().sort({
        createdAt: "desc",
    })
    try {
        return res.status(200).json({ data: products })
    } catch (error) {
        res.status(400).send(error)
    }
}

const getSingleProduct = async (req, res) => {
    var product = await Store.findById(req.params.id);
    try {
        return res.status(200).json({ data: product })
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteProduct = async (req, res) => {
    await Store.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "deleted!" })
}

const sortByCategory = async (req, res) => {
    const body = req.body
    var product = await Store.find({ category: body.category })
    if (!product) return res.status(400).send("The item you are searching for does not exist")
    try {
        return res.status(200).json({ data: product })
    } catch (error) {
        res.status(400).send(error)
    }
}

const sortByType = async (req, res) => {
    const body = req.body
    var product = await Store.find({ type: body.type })
    if (product === null) return res.status(400).send("The item you are looking for does not exist")
    try {
        return res.status(200).json({ data: product })
    } catch (error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    addProductToStore,
    editProduct,
    getProduct,
    getSingleProduct,
    deleteProduct,
    sortByCategory,
    sortByType
}