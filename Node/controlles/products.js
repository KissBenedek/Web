import {Product} from "../Model/product.js"


export const getaddProduct = (req, res, next) => {
    res.render('add_product.ejs', {
        pageTitle: "Add product",
        path: '/admin/add-product'
    })
};

export const postAddProduct = (req, res, next) =>{
    const product = new Product({title: req.body.title})
    product.save()
    res.status(301).redirect('/')
}

export const getAllProducts = (req, res, next) =>{
    res.render('shop.ejs'), {
        pageTitle: 'Products',
        prods: Product.fetchAll(),
        path: '/'
    }
}