// Trong file account.models.js
const db = require("../database/database");

const LoginAccount = async ({ idNhanVien, matKhau }) => {
  try {
    const query = `SELECT idNhanVien, vaitro FROM nhanvien WHERE idNhanVien = ? AND matKhau = ?`;
    const usersAccount = await db.queryDatabase(query, [idNhanVien, matKhau]);

    return usersAccount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  LoginAccount
};
