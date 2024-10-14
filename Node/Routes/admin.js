import express from "express"
import root from "../util/roothpath.js"
import path from "path"
import { getaddProduct, postAddProduct } from "../controlles/products.js";

const router = express.Router();

router.get('/add-product', getaddProduct)

router.post('/add-product', postAddProduct)

export default router;