const db = require('../database/database');

// Lấy tất cả danh sách HĐCT từ database
const getContractDetails = async () => {
  const query = `SELECT hdct.*, sp.tenSanPham, sp.giaThue AS giaThueSanPham, dv.tenDichVu, dv.giaThue AS giaThueDichVu
  FROM hopdongchitiet hdct
  LEFT JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
  LEFT JOIN dichvu dv ON hdct.idDichVu = dv.idDichVu;
  `;
  return db.queryDatabase(query, []);
}

// Lấy tất cả danh sách HĐCT với mã HĐ tạm thời từ database
const getContractDetailsByContractIDTemporary = async (contractIDTemporary) => {
  const query = `SELECT hdct.*, sp.tenSanPham, sp.giaThue AS giaThueSanPham, dv.tenDichVu, dv.giaThue AS giaThueDichVu
  FROM hopdongchitiet hdct
  LEFT JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
  LEFT JOIN dichvu dv ON hdct.idDichVu = dv.idDichVu
  WHERE idHDTamThoi = ?;`;
  return db.queryDatabase(query, [contractIDTemporary]);
}

// Lấy tất cả danh sách HĐCT từ database với mã HĐ
const getContractDetailsByContractID = async (contractID) => {
  const query = `SELECT hdct.*, sp.tenSanPham, sp.giaThue AS giaThueSanPham, dv.tenDichVu, dv.giaThue AS giaThueDichVu
  FROM hopdongchitiet hdct
  LEFT JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
  LEFT JOIN dichvu dv ON hdct.idDichVu = dv.idDichVu
  WHERE idHopDong = ?;`;
  return db.queryDatabase(query, [contractID]);
}

// Thêm mới HĐCT với gói sản phẩm vào database
const insertContractDetailWithProduct = async (data) => {
  const query = `INSERT INTO hopdongchitiet (idHopDongChiTiet, ngayThue, ngayTra, idSanPham, idHDTamThoi) VALUES (?, ?, ?, ?, ?);`;
  const values = [
    data.contractDetailID,
    data.dateOfHire,
    data.dateOfReturn,
    data.productID,
    data.contractIDTemporary
  ];
  return await db.queryDatabase(query, values);
}

// Thêm mới HĐCT với gói dịch vụ vào database
const insertContractDetailWithService = async (data) => {
  const query = `INSERT INTO hopdongchitiet (idHopDongChiTiet, diaDiem, ngayThucHien, idDichVu, idHDTamThoi) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    data.contractDetailID,
    data.location,
    data.dateOfPerform,
    data.serviceID,
    data.contractIDTemporary
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật mã hợp đồng cho HĐCT theo mã HĐ tạm thời
const updateContractDetailContractID = async (data) => {
  const query = `UPDATE hopdongchitiet SET idHopDong = ? WHERE idHDTamThoi = ?`;
  const values = [
    data.contractID,
    data.contractIDTemporary
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật HĐCT với gói sản phẩm
const updateContractDetailWithProduct = async (data) => {
  const query = `UPDATE hopdongchitiet SET ngayThue = ?, ngayTra = ?, idSanPham = ? WHERE idHopDongChiTiet = ?`;
  const values = [
    data.dateOfHire,
    data.dateOfReturn,
    data.productID,
    data.contractDetailID
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật HĐCT với gói dịch vụ
const updateContractDetailWithService = async (data) => {
  const query = `UPDATE hopdongchitiet SET diaDiem = ?, ngayThucHien = ?, idDichVu = ? WHERE idHopDongChiTiet = ?`;
  const values = [
    data.location,
    data.dateOfPerform,
    data.serviceID,
    data.contractDetailID
  ];
  return await db.queryDatabase(query, values);
}

// Xoá HĐCT theo mã HĐ tạm thời
const removeContractDetailByContractIDTemporary = async (contractIDTemporary) => {
  const query = `DELETE FROM hopdongchitiet WHERE idHDTamThoi =?`;
  return db.queryDatabase(query, [contractIDTemporary]);
}

// Xoá HĐCT theo mã HĐCT
const removeContractDetailByContractDetailID = async (contractDetailID) => {
  const query = `DELETE FROM hopdongchitiet WHERE idHopDongChiTiet =?`;
  return db.queryDatabase(query, [contractDetailID]);
}
// Lấy danh sách dịch vụ
const getServices = async () => {
  const query = `SELECT * FROM dichvu WHERE hienThi = 1;`;
  return db.queryDatabase(query, []);
}

// Lấy danh sách sản phẩm ở trạng thái sẵn sàng
const getProductsByStatusReady = async () => {
  const query = `SELECT * FROM sanpham WHERE hienThi = 1 AND trangThai = 'Sẵn sàng';`;
  return db.queryDatabase(query, []);
}

module.exports = {
  getContractDetails,
  getContractDetailsByContractID,
  getContractDetailsByContractIDTemporary,
  insertContractDetailWithProduct,
  insertContractDetailWithService,
  updateContractDetailContractID,
  updateContractDetailWithProduct,
  updateContractDetailWithService,
  removeContractDetailByContractIDTemporary,
  removeContractDetailByContractDetailID,
  getServices,
  getProductsByStatusReady
}