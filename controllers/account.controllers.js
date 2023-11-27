const accountmodels = require('../models/account.models');

const LoginAccount = async (req, res) => {
  try {
    const { idNhanVien, matKhau } = req.body;
    const usersAccount = await accountmodels.LoginAccount({ idNhanVien, matKhau });

    if (usersAccount.length > 0) {
      res.json({ status: "success", userAccount: usersAccount[0] });
    } else {
      res.status(401).json({ status: "error", error: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Get Account Failed', error);
    res.status(500).json({ status: "error", error: "Internal Server Error", details: error.message });
  }  
};

module.exports = {
  LoginAccount
};
