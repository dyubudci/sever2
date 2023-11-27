// Model 
const database = require('../../database/database.js');

const getBanners = async () => {
  const query = `SELECT * FROM Banner WHERE hienThi = 1`;
  return await database.queryDatabase(query, []);
}

const insertBanner = async (imgUrl) => {
  const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
  return await database.queryDatabase(query, [imgUrl]);
}

const removeBanner = async (bannerID) => {
  const query = `UPDATE Banner SET hienThi = 0 WHERE id = ?`;
  return await database.queryDatabase(query, [bannerID]);
}
const getUsersAccount = async () => {
  const query = `SELECT * FROM nhanvien`;
  return await database.queryDatabase(query, []);
}


module.exports = {
  getBanners,
  insertBanner,
  removeBanner,
  getUsersAccount
}

// Controller
// Khái báo model
const bannerModel = require('../../models/banner.model.js');

const renderPageBanner = async (req, res) => {
  try {
    const banners = await bannerModel.getBanners(); // Dùng hàm của bannerModel
  } catch (error) {
    console.error('Rendering banner failed', error);
  }
}

// Router
// Khái báo controller
const bannerController = require('../../controllers/admin/banner.controller.js');

// Đặt phương thức và đường đẫn api xem tại example/namefile.doc
router.get('/banner', bannerController.renderPageBanner); 

// Gán router vào index chuyển qua file index đã có mẫu
const bannerRouter = require("./routers/admin/banner.router.js");
app.use("/api", bannerRouter);
