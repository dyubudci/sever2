const router = require('express').Router();
const product = require('../controllers/product-controllers');

// Định tuyến cho việc lấy tất cả sản phẩm
router.get('/products', product.getAllProducts);

// Định tuyến cho việc lấy một sản phẩm theo id
// router.get('/products/:idSanPham', product.getProductById);

// Định tuyến cho việc thêm sản phẩm mới
router.post('/products/add', product.addProduct);

// Định tuyến cho việc sửa thông tin sản phẩm
router.put('/products/update/:idSanPham', product.updateProduct);

// Định tuyến cho việc xóa sản phẩm theo id
router.delete('/products/delete/:idSanPham', product.deleteProductById);


module.exports = router;