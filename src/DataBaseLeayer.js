import assert from 'assert'
import fs from 'fs'


const isRepeatFileName = async (nameFile,collection) => {

}


export const UploadFile = async (bucket, pathFile, nameFile, collection ) => {




 /*  // check on repeat name file \\
    let isRepeatFileName = false
    let Err
    const InfoDataFile = await collection.find().toArray()
    const ArrNameFile = InfoDataFile.map(elDB => {
        return elDB.filename
    })
    ArrNameFile.forEach(name => {
        if (name === nameFile) isRepeatFileName = true
    })
    // ============================= \\



*/

}
export const getFiles = (collection,file) => {
     return  collection.find().toArray()
}

export const DownloadFile =  (bucket, file, path) => {

    try {
        bucket.openDownloadStreamByName(file).
        pipe(fs.createWriteStream(`${path}${file}`)).
        on('error', function(error) {
            assert.ifError(error);
        }).
        on('finish', function() {
            console.log('done!');
            process.exit(0);
        });
    } catch (e) {
        return e
    }

}








