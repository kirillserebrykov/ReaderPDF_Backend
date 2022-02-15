import assert from 'assert'
import {bufferToStream} from "./snipets"




export const UploadFile = async (bucket, buffer, request_metadata, collection) => {

        let isRepeatFileName = false
        const InfoDataFile = await collection.find().toArray()
        const AllFileName = InfoDataFile.map(elDB => {
            return elDB.filename
        })

        AllFileName.forEach(name => {
            if (name === request_metadata.filename) isRepeatFileName = true
        })


        try {
            if(isRepeatFileName) throw Error(JSON.stringify({fileName :request_metadata.filename, statusCode:"0"}))
            bufferToStream(buffer).
            pipe(bucket.openUploadStream(request_metadata.filename,{metadata:request_metadata})).
            on('error', function(error) {
                assert.ifError(error);
            }).
            on('finish', function() {});
			return  JSON.stringify({fileName :request_metadata.filename, statusCode:"1"})

        } catch (e) {return  e.message}

}
export const getFiles = (collection,data) => {
     return  collection.find(data && data).toArray()
}
export const deleteFile = async (collection, collectionChunks,file) => {
     let fileID = await collection.find({ "filename":  file }).toArray()

    collection.deleteMany({ "filename":  file });
    collectionChunks.deleteMany({ "files_id" : fileID[0]["_id"] });

}

export const DownloadFile = (bucket, file, reply) => {

    try {
     const stream  =  bucket.openDownloadStreamByName(file)
        stream.read();
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', data => {chunks.push(data)});
            stream.on('end', () => {
                const data = Buffer.concat(chunks);
                resolve(data);
            });
            stream.on('error', err => {reject(err)});
        })

    } catch (e) {reply.send(e.message)}

}








