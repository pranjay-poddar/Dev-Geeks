const SingleFile = require('../models/singlefile');
const MultipleFile = require('../models/multiplefile');

const singleFileUpload = async (req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        const newFile = await file.save();
        res.status(201).json({ singleFileId: newFile._id});
    }catch (error) {
        return res.status(500).json({ error: "500 Internal Error" });
    }
}

const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            files: filesArray 
        });

        const newMulFiles = await multipleFiles.save();
        res.status(201).json({ multipleFilesId : newMulFiles._id});
    }catch (error) {
        return res.status(500).json({ error: "500 Internal Error" });
    }
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
}