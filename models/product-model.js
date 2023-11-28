const db = require('../database/database');

const getAllProducts = async () => {
  const query = `SELECT anhSanPham, tenSanPham, idSanPham, giaThue, trangThai, hienThi, loaiSanPham FROM sanpham`;
  return db.queryDatabase(query, []);
}

const getProductById = async (idSanPham) => {
  const query = `SELECT anhSanPham, idSanPham, tenSanPham, giaThue, trangThai, hienThi, loaiSanPham FROM sanpham WHERE idSanPham = ?`;
  return db.queryDatabase(query, [idSanPham]);
}

const getAllProductsByStatus = async (trangThai) => {
  const query = `SELECT anhSanPham, idSanPham, tenSanPham, giaThue, trangThai, hienThi, loaiSanPham FROM sanpham WHERE trangThai = ? ORDER BY trangThai`;
  return db.queryDatabase(query, [trangThai]);
}

const addProduct = async (newProduct) => {
  const { tenSanPham, giaThue, trangThai, loaiSanPham } = newProduct;
  const query = `INSERT INTO sanpham (tenSanPham, giaThue, trangThai,  loaiSanPham) VALUES (?, ?, ?, ?)`;
  return db.queryDatabase(query, [tenSanPham, giaThue, trangThai, loaiSanPham]);
}

const updateProduct = async (idSanPham, updatedProductData) => {
  const { tenSanPham, giaThue, trangThai, hienThi, loaiSanPham } = updatedProductData;
  const query = `
    UPDATE sanpham
    SET tenSanPham = ?, giaThue = ?, trangThai = ?, hienThi = ?, loaiSanPham = ?
    WHERE idSanPham = ?`;
  return db.queryDatabase(query, [tenSanPham, giaThue, trangThai, hienThi, loaiSanPham, idSanPham]);
}

const deleteProductById = async (idSanPham) => {
  const query = `DELETE FROM sanpham WHERE idSanPham = ?`;
  return db.queryDatabase(query, [idSanPham]);
}
const getAllProductsByName = async (tenSanPham) => {
  const query = `SELECT anhSanPham, idSanPham, tenSanPham, giaThue, trangThai, hienThi, loaiSanPham FROM sanpham WHERE tenSanPham like ? ORDER BY tenSanPham`;
  return db.queryDatabase(query, [`%${tenSanPham}%`]);
}

module.exports = {
  getAllProducts,
  getProductById,
  getAllProductsByStatus,
  addProduct,
  updateProduct,
  deleteProductById,
  getAllProductsByName
};
