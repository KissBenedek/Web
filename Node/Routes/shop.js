import express from "express"
import root from "../util/roothpath.js"
import path from "path"

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop.ejs')
})


export default router