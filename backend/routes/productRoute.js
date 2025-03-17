import express from "express"
import { addProduct, listProduct, removeProduct ,updateProduct,decreaseProductQuantity} from "../controllers/productController.js"
import multer from "multer"

const productRouter =express.Router();
//Image storage engine 

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
})

const upload = multer ({storage:storage})
productRouter.post("/add",upload.single("image"),addProduct)
productRouter.get("/list",listProduct)
productRouter.post("/remove",removeProduct);
productRouter.post("/update",updateProduct);
//for decreasing th product quantity when the order is placed 
productRouter.post("/decrease-quantity", decreaseProductQuantity);



export default  productRouter;