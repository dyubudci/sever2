const contractModel = require('../models/contract-model');

// Lấy tất cả danh sách HD
const getContracts = async (req, res) => {
  try {
    const contract = await contractModel.getContracts();
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy HD by IDHD
const getContractById = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  try {
    const contract = await contractModel.getContractById(idHopDong);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}
// Lấy danh sách HD by trangThaiTT
const getContractsByPayment = async (req, res) => {
  const trangThaiThanhToan = req.params.trangThaiThanhToan;
  try {
    const contract = await contractModel.getContractByPayment(trangThaiThanhToan);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy danh sách HD by trangThaiTT
const getContractsByProgess = async (req, res) => {
  const trangThaiHopDong = req.params.trangThaiHopDong;
  try {
    const contract = await contractModel.getContractByProgess(trangThaiHopDong);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}
// Lấy danh sách HD by trangThaiPhatSinh
const getContractsByIncurrent = async (req, res) => {
  const trangThaiPhatSinh = req.params.trangThaiPhatSinh;
  try {
    const contract = await contractModel.getContractByIncurrent(trangThaiPhatSinh);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy phát sinh theo idHD
const getIncurrent = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  try {
    const contract = await contractModel.getIncurrentByIdHD(idHopDong);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Thêm mới HD
const insertContract = async (req, res) => {
  const { idHopDong, ngayThanhToan, tienCoc, giamGia, tongTien, trangThaiThanhToan, idKhachHang } = req.body;
  const trangThaiHopDong = 'Đang thực hiện';
  try {
    await contractModel.insertContract({
      idHopDong,
      ngayThanhToan,
      tienCoc,
      giamGia,
      tongTien,
      trangThaiThanhToan,
      trangThaiHopDong,
      idKhachHang
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Erorr', error);
  }
}
// Thêm phát sinh
const insertIncurrent = async (req, res) => {
  const { phiPhatSinh, hanTra, noiDung, idHopDong } = req.body;
  const hienThi = 1;
  try {
    await contractModel.insertIncurrent({
      phiPhatSinh,
      hanTra,
      noiDung,
      hienThi,
      idHopDong
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Erorr', error);
  }
}

// Cập nhật hợp đồng
const updateContract = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  const { ngayThanhToan, giamGia, tongTien, trangThaiThanhToan, trangThaiPhatSinh } = req.body;
  try {
    const updateResults = await contractModel.updateContract({
      ngayThanhToan,
      giamGia,
      tongTien,
      trangThaiThanhToan,
      trangThaiPhatSinh,
      idHopDong

    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}
// Xoá hợp đồng
const deleteContract = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  const hienThi = 0;
  try {
    const updateResults = await contractModel.deleteContract({
      hienThi,
      idHopDong

    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}

//   Xoá phát sinh
const deleteIncurrent = async (req, res) => {
  const idPhatSinh = req.params.idPhatSinh;
  const hienThi = 0;
  try {
    const updateResults = await contractModel.deleteIncurrent({
      hienThi,
      idPhatSinh

    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}
// lấy tất cả danh sách khách hàng
const getAllClients = async (req, res) => {
  try {
    const contract = await contractModel.getClients();
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}
// lấy tất cả danh sách khách hàng
const getDetailContractByIdHDTT = async (req, res) => {
  const idHDTamThoi=req.params.idHDTamThoi;
  try {
    const contract = await contractModel.getDetailContractByIdHDTT(idHDTamThoi);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}


module.exports = {
  getContracts,
  getContractById,
  getContractsByPayment,
  getContractsByProgess,
  getContractsByIncurrent,
  getIncurrent,
  insertContract,
  insertIncurrent,
  updateContract,
  deleteContract,
  deleteIncurrent,
  getAllClients,
  getDetailContractByIdHDTT

}