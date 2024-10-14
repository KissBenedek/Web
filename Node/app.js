import express from "express"
import adminRoutes from "./Routes/admin.js"
import shopRoutes from "./Routes/shop.js"
import bodyParser from "body-parser"
import __dirname from "./util/roothpath.js"
import  path  from "path"

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.ejs')
})

app.listen(3000, () => console.log("A szerver fut a 3000-es porton."));

