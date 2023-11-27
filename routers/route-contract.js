const router = require('express').Router();
const contract=require('../controllers/contract-controller');

// Hợp đồng
router.get('/contracts',contract.getContracts);
router.get('/contract/:idHopDong',contract.getContractById);
router.get('/contracts/payment/:trangThaiThanhToan',contract.getContractsByPayment);
router.get('/contracts/progess/:trangThaiHopDong',contract.getContractsByProgess);
router.get('/contracts/incurrent/:trangThaiPhatSinh',contract.getContractsByIncurrent);
router.get('/contracts/detail-contract/:idHDTamThoi',contract.getDetailContractByIdHDTT);
router.post('/contract/add',contract.insertContract);
router.put('/contract/update/:idHopDong',contract.updateContract);
router.put('/contract/delete/:idHopDong',contract.deleteContract);

// Phát sinh
router.get('/incurrent',contract.getIncurrent);
router.post('/incurrent/add',contract.insertIncurrent);
router.put('/incurrent/delete/:idPhatSinh',contract.deleteIncurrent);

// Route liên quan
router.get('/contracts/clients',contract.getAllClients);


module.exports=router;