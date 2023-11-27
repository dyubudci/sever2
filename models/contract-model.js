const db = require('../database/database');

// lấy tất cả hợp đồng
const getContracts = async () => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang WHERE h.hienThi=1 ORDER BY h.ngayTao DESC`;
    return db.queryDatabase(query, []);
}

// lấy hợp đồng theo idHD
const getContractById = async (idHopDong) => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang  WHERE h.idHopDong=?`;
    return db.queryDatabase(query, [idHopDong]);
}

// lấy hợp đồng theo trạng thái thanh toán
const getContractByPayment = async (trangThaiThanhToan) => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang WHERE h.trangThaiThanhToan=?`;
    return db.queryDatabase(query, [trangThaiThanhToan]);
}

// lấy hợp đồng theo trạng thái hợp đồng
const getContractByProgess = async (trangThaiHopDong) => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang WHERE h.trangThaiHopDong=?`;
    return db.queryDatabase(query, [trangThaiHopDong]);
}

// lấy hợp đồng theo trạng thái phát sinh
const getContractByIncurrent = async (trangThaiPhatSinh) => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang WHERE h.trangThaiPhatSinh=?`;
    return db.queryDatabase(query, [trangThaiPhatSinh]);
}

// lấy phát sinh theo idHD
const getIncurrentByIdHD = async (idHopDong) => {
    const query = `SELECT t.* FROM phatsinh  WHERE idHopDong=?`;
    return db.queryDatabase(query, [idHopDong]);
}

// thêm hợp đồng mới
const insertContract = async (data) => {
    const query = `INSERT INTO hopdong (idHopDong, ngayThanhToan, tienCoc, giamGia, tongTien, trangThaiThanhToan, trangThaiHopDong, idKhachHang)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const insertValues = [
        data.idHopDong,
        data.ngayThanhToan,
        data.tienCoc,
        data.giamGia,
        data.tongTien,
        data.trangThaiThanhToan,
        data.trangThaiHopDong,
        data.idKhachHang
    ];
    return await db.queryDatabase(query, insertValues);
}

// thêm phát sinh
const insertIncurrent = async (data) => {
    const query = `INSERT INTO phatsinh ( phiPhatSinh, hanTra, noiDung, hienThi, idHopDong)
        VALUES (?, ?, ?, ?, ?)`;
    const insertValues = [
        data.phiPhatSinh,
        data.hanTra,
        data.noiDung,
        data.hienThi,
        data.idHopDong,
    ];
    return await db.queryDatabase(query, insertValues);
}

// cập nhật hợp đồng
const updateContract = async (data) => {
    const query = `UPDATE hopdong SET ngayThanhToan = ?, giamGia = ?, tongTien = ?, trangThaiThanhToan = ?,trangThaiPhatSinh = ? WHERE idHopDong=?`;
    const updateValues = [
        data.ngayThanhToan,
        data.giamGia,
        data.tongTien,
        data.trangThaiThanhToan,
        data.trangThaiPhatSinh,
        data.idHopDong
    ];
    return await db.queryDatabase(query, updateValues);
}

// xoá hợp đồng
const deleteContract=async(data)=>{
    const query = `UPDATE hopdong SET hienThi=? WHERE idHopDong=?`;
    const updateValues = [
        data.hienThi,
        data.idHopDong
    ];
    return await db.queryDatabase(query, updateValues);
}

// xoá phát sinh
const deleteIncurrent=async(data)=>{
    const query = `UPDATE phatsinh SET hienThi=? WHERE idPhatSinh=?`;
    const updateValues = [
        data.hienThi,
        data.idPhatSinh
    ];
    return await db.queryDatabase(query, updateValues);    
}
// lấy danh sách khách hàng
const getClients = async () => {
    const query = `SELECT * FROM khachhang WHERE hienThi=1`;
    return db.queryDatabase(query, []);
}
// lấy danh sách khách hàng
const getDetailContractByIdHDTT = async (idHDTamThoi) => {
    const query = `SELECT t.*, d.tenDichVu, d.giaThue AS giaThueDichVu, p.tenSanPham, p.giaThue AS giaThueSanPham
    FROM hopdongchitiet t LEFT JOIN dichvu d ON d.idDichVu =  t.idDichVu 
    LEFT JOIN sanpham p ON p.idSanPham=t.idSanPham WHERE idHDTamThoi=?`;
    return db.queryDatabase(query, [idHDTamThoi]);
}

module.exports = {
    getContracts,
    getContractById,
    getContractByPayment,
    getContractByProgess,
    getContractByIncurrent,
    getIncurrentByIdHD,
    insertContract,
    insertIncurrent,
    updateContract,
    deleteContract,
    deleteIncurrent,
    getClients,
    getDetailContractByIdHDTT
  }