const router = require('express').Router();
const contractDetailController = require('../controllers/contract-detail.controller.js');

router.get('/contract-details', contractDetailController.getContractDetails);
router.get('/contract-details/:contractID', contractDetailController.getContractDetailsByContractID);
router.get('/contract-details/:contractIDTemporary/temporary', contractDetailController.getContractDetailsByContractIDTemporary);
router.post('/contract-details/with-product', contractDetailController.insertContractDetailWithProduct);
router.post('/contract-details/with-service', contractDetailController.insertContractDetailWithService);
router.put('/contract-details/:contractIDTemporary/contract', contractDetailController.updateContractDetailContractID);
router.put('/contract-details/:contractDetailID/with-product', contractDetailController.updateContractDetailWithProduct);
router.put('/contract-details/:contractDetailID/with-service', contractDetailController.updateContractDetailWithService);
router.delete('/contract-details/:contractIDTemporary', contractDetailController.removeContractDetailByContractIDTemporary);
router.delete('/contract-details/:contractDetailID/single', contractDetailController.removeContractDetailByContractDetailID);

// Router liên quan
router.get('/contract-details-services', contractDetailController.getServices);
router.get('/contract-details-products', contractDetailController.getProductsByStatusReady);

module.exports = router;