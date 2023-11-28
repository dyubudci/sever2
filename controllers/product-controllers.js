const productModel = require('../models/product-model');
// Hàm lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    res.status(500).send('Lỗi server');
  }
};

// Hàm lấy một sản phẩm theo idSanPham
const getProductById = async (req, res) => {
  const { idSanPham } = req.params;

  try {

    const product = await db.queryDatabase(query, [idSanPham]);

    if (product.length > 0) {
      res.json(product[0]);
    } else {
      res.status(404).send('Không tìm thấy sản phẩm');
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm theo id:', error);
    res.status(500).send('Lỗi server');
  }
};

// Hàm thêm sản phẩm
const addProduct = async (req, res) => {
  const { tenSanPham, giaThue, trangThai, hienThi, loaiSanPham } = req.body;

  try {
    const results = await productModel.addProduct({ tenSanPham, giaThue, trangThai, loaiSanPham });
    res.json({ id: results.insertId, message: 'Sản phẩm đã được thêm thành công' });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    res.status(500).send('Lỗi server');
  }
};

// Hàm sửa thông tin sản phẩm
const updateProduct = async (req, res) => {
  const { idSanPham } = req.params;
  const { tenSanPham, giaThue, trangThai, hienThi, loaiSanPham } = req.body;
  try {
    await productModel.updateProduct(idSanPham, { tenSanPham, giaThue, trangThai, hienThi, loaiSanPham })
    res.json({ message: 'Thông tin sản phẩm đã được cập nhật thành công' });
  } catch (error) {
    console.error('Lỗi khi sửa thông tin sản phẩm:', error);
    res.status(500).send('Lỗi server');
  }
};

// Hàm xóa sản phẩm theo id
const deleteProductById = async (req, res) => {
  const { idSanPham } = req.params;

  try {
    await productModel.deleteProductById(idSanPham)
    res.json({ message: 'Sản phẩm đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).send('Lỗi server');
  }
};
// Hàm lấy một sản phẩm theo tenSanPham
const getProductByName = async (req, res) => {
  const name = req.query.q;
  try {
    const product = await productModel.getAllProductsByName(name)
    if (product.length > 0) {
      res.json(product);
    } else {
      res.status(404).send('Không tìm thấy sản phẩm');
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm theo id:', error);
    res.status(500).send('Lỗi server');
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
  getProductByName
};