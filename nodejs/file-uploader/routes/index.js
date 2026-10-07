const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const folderController = require('../controllers/folderController');
const fileController = require('../controllers/fileController');

function isLoggedIn(req, res, next) {
  if (req.user) return next();
  res.redirect('/login');
}

router.get('/', (req, res) => res.redirect('/folders'));

router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.createUser);
router.get('/login', authController.getLogin);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

router.get('/folders', isLoggedIn, folderController.getAllFolders);
router.get('/folders/new', isLoggedIn, folderController.getNewFolderForm);
router.post('/folders/new', isLoggedIn, folderController.createFolder);
router.get('/folders/:folderId', isLoggedIn, folderController.getFolderDetail);
router.get('/folders/:folderId/edit', isLoggedIn, folderController.getEditFolderForm);
router.post('/folders/:folderId/edit', isLoggedIn, folderController.updateFolder);
router.post('/folders/:folderId/delete', isLoggedIn, folderController.deleteFolder);

router.get('/files/:id', isLoggedIn, fileController.getFileDetail);
router.post('/folders/:folderId/upload', isLoggedIn, fileController.upload.single('file'), fileController.uploadFile);
router.post('/files/:id/:folderId/delete', isLoggedIn, fileController.deleteFile);

module.exports = router;