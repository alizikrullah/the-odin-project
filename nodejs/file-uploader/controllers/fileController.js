const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

async function getFileDetail(req, res) {
    const { id } = req.params;
    const file = await prisma.file.findUnique({ where: { id: parseInt(id) } });
    res.render('file-detail', { file, user: req.user });
}

async function uploadFile(req, res) {
    const { folderId } = req.params;
    await prisma.file.create({
        data: {
            name: req.file.originalname,
            size: req.file.size,
            url: req.file.path,
            folderId: parseInt(folderId),
            userId: req.user.id,
        }
    });
    res.redirect(`/folders/${folderId}`);
}

async function deleteFile(req, res) {
    const { id, folderId } = req.params;
    await prisma.file.delete({ where: { id: parseInt(id) } });
    res.redirect(`/folders/${folderId}`);
}

module.exports = {
    upload,
    getFileDetail,
    uploadFile,
    deleteFile,
};