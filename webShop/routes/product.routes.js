import express from 'express';
import { getAllProduct, createProduct } from '../db/product.model.js';
import authenticateToken from '../tokenAuthentication.js';

const router = express.Router();

router.get("/get-all", async (req, resp) => {
    console.log("response sent")
    const data = await getAllProduct();
    resp.send(data);
})

router.post("/create", authenticateToken, async (req, resp) => {
    const data = req.body;
    const product = await createProduct(data);
    resp.send(product);
})

export default router;
