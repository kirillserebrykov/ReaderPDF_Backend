import assert from 'assert'
import {bufferToStream} from "./snipets"




export const UploadFile = async (bucket, buffer, request_metadata, collection) => {

        let isRepeatFileName = false
        const InfoDataFile = await collection.find().toArray()
        const ArrNameFile = InfoDataFile.map(elDB => {
            return elDB.filename
        })
        ArrNameFile.forEach(name => {
            if (name === request_metadata.filename) isRepeatFileName = true
        })

        try {
            if(isRepeatFileName) throw Error(`${request_metadata.filename} was created`)
            bufferToStream(buffer).
            pipe(bucket.openUploadStream(request_metadata.filename,{metadata:request_metadata})).
            on('error', function(error) {
                assert.ifError(error);
            }).
            on('finish', function() {});

         return  `${request_metadata.filename} upload`

        } catch (e) {return  e.message}

}
export const getFiles = (collection) => {
     return  collection.find().toArray()
}

export const DownloadFile = (bucket, file, reply) => {

    try {
     const stream  =  bucket.openDownloadStreamByName(file)
        stream.read();
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', data => {
                chunks.push(data);
            });

            stream.on('end', () => {
                const data = Buffer.concat(chunks);
                resolve(data);
            });

            stream.on('error', err => {
                reject(err);
            });
        })
    } catch (e) {
        reply.send(e.message)
    }

}








