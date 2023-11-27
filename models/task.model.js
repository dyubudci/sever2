const database = require('../database/database.js')

const readTask = async () => {
    const query = "SELECT " +
        "c.idCongViec, " +
        "hdct.idHopDong, " +
        "MAX(ngayThucHien) AS ngayThucHien, " +
        "MAX(trangThaiCongViec) AS trangThaiCongViec, " +
        "MAX(tenDichVu) AS tenDichVu, " +
        "MAX(diaDiem) AS diaDiem, " +
        "MAX(ngayGiatSanPham) AS ngayGiatSanPham, " +
        "MAX(ngaySanSang) AS ngaySanSang, " +
        "REPLACE(GROUP_CONCAT(DISTINCT hoVaTen), ',', ', ') AS hoVaTen " +
        "FROM db_wedding.congviec c " +
        "LEFT JOIN db_wedding.thamgia t ON t.idCongViec = c.idCongViec " +
        "LEFT JOIN db_wedding.hopdongchitiet hdct ON c.idHDCT = hdct.idHopDongChiTiet " +
        "LEFT JOIN db_wedding.dichvu d ON hdct.idDichVu = d.idDichVu " +
        "LEFT JOIN db_wedding.nhanvien nv ON t.idNhanVien = nv.idNhanVien " +
        "WHERE c.hienThi = 1 " +
        "GROUP BY idHopDongChiTiet "
    return await database.queryDatabase(query, [])
}

const readTaskByRole = (role) => {
    const query = "SELECT " +
        "hdct.idHopDong, " +
        "MAX(ngayThucHien) AS ngayThucHien, " +
        "MAX(trangThaiCongViec) AS trangThaiCongViec, " +
        "MAX(tenDichVu) AS tenDichVu, " +
        "MAX(diaDiem) AS diaDiem, " +
        "MAX(ngayGiatSanPham) AS ngayGiatSanPham, " +
        "MAX(ngaySanSang) AS ngaySanSang, " +
        "REPLACE(GROUP_CONCAT(DISTINCT hoVaTen), ',', ', ') AS hoVaTen " +
        "FROM db_wedding.congviec c " +
        "LEFT JOIN db_wedding.thamgia t ON t.idCongViec = c.idCongViec " +
        "LEFT JOIN db_wedding.hopdongchitiet hdct ON c.idHDCT = hdct.idHopDongChiTiet " +
        "LEFT JOIN db_wedding.dichvu d ON hdct.idDichVu = d.idDichVu " +
        "LEFT JOIN db_wedding.nhanvien nv ON t.idNhanVien = nv.idNhanVien " +
        "WHERE nv.vaiTro = ? AND c.hienThi = 1 " +
        "GROUP BY idHopDongChiTiet "

    return database.queryDatabase(query, [role])
}

const deleteTask = (id) => {
    const query = "UPDATE CongViec SET hienThi = 0 WHERE idCongViec = ?"
    return database.queryDatabase(query, [id])
}

const updateTask = (id, statusTask) => {
    const query = "UPDATE CongViec SET trangThaiCongViec = ? WHERE idCongViec = ?"
    return database.queryDatabase(query, [statusTask, id])
}


module.exports = {
    readTask,
    readTaskByRole,
    deleteTask,
    updateTask

}