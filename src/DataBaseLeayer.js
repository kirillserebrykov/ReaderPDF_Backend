import assert from 'assert'
import fs from 'fs'
import {bufferToStream} from "./snipets"

const isRepeatFileName = async (nameFile,collection) => {

}


export const UploadFile = async (bucket, pathFile, nameFile, collection ) => {

    let isRepeatFileName = false
    const InfoDataFile = await collection.find().toArray()
    const ArrNameFile = InfoDataFile.map(elDB => {
        return elDB.filename
    })
    ArrNameFile.forEach(name => {
        if (name === nameFile) isRepeatFileName = true
    })


    try {
        if(isRepeatFileName) throw Error("this file was created")
        bufferToStream(pathFile).
        pipe(bucket.openUploadStream(nameFile)).
        on('error', function(error) {
            assert.ifError(error);
        }).
        on('finish', function() {

            process.exit(0);
        });
    return  `${nameFile} created`
    } catch (e) {

        return  e.message
    }

 /*  // check on repeat name file \\

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








