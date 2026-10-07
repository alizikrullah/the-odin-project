const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllFolders(req, res) {
    const folders = await prisma.folder.findMany({
        where: { userId: req.user.id }
    });
    res.render('folders', { folders, user: req.user });
}

function getNewFolderForm(req, res) {
    res.render('new-folder');
}

async function createFolder(req, res) {
    const { name } = req.body;
    await prisma.folder.create({
        data: { name, userId: req.user.id }
    });
    res.redirect('/');
}

async function getFolderDetail(req, res) {
    const { folderId } = req.params;
    const folder = await prisma.folder.findUnique({
        where: { id: parseInt(folderId) },
        include: { files: true }
    });
    res.render('folder', { folder, user: req.user });
}

async function getEditFolderForm(req, res) {
    const { folderId } = req.params;
    const folder = await prisma.folder.findUnique({ where: { id: parseInt(folderId) } });
    res.render('edit-folder', { folder });
}

async function updateFolder(req, res) {
    const { folderId } = req.params;
    const { name } = req.body;
    await prisma.folder.update({
        where: { id: parseInt(folderId) },
        data: { name }
    });
    res.redirect('/folders');
}

async function deleteFolder(req, res) {
    const { folderId } = req.params;
    await prisma.folder.delete({ where: { id: parseInt(folderId) } });
    res.redirect('/folders');
}

module.exports = {
    getAllFolders,
    getNewFolderForm,
    createFolder,
    getFolderDetail,
    getEditFolderForm,
    updateFolder,
    deleteFolder,
};