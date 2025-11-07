const express = require("express");
const ProductController = require("../controllers/productController");
const isAuthenticated = require("../utils/isAuthenticated");

const router = express.Router();
const productController = new ProductController();

router.post("/", isAuthenticated, productController.createProduct);
router.post("/buy", isAuthenticated, productController.createOrder);
router.get("/", isAuthenticated, productController.getProducts);
router.get("/:id", isAuthenticated, productController.getPID);


// router.get("/:id", isAuthenticated, productController.getPid);

// router.get("/:id", isAuthenticated, productController.getPid);

// router.get("/:id", isAuthenticated, productController.getP_ID);
// router.get("/:id", isAuthenticated, productController.getProductsid);

//router.get("/:id", isAuthenticated, productController.getProductById);
// router.get("/:orderId", isAuthenticated, productController.getOrderStatus); //code bổ sung (Câu 8)


module.exports = router;
