import {deleteFile} from "../DataBaseLeayer"

export const DeleteFilesHandler =  async(request, reply, bucket, collection, collectionChunks) => {
	reply.header("Access-Control-Allow-Origin", "*");
	reply.header("Access-Control-Allow-Methods", "*");
	reply.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
    const {files} =   JSON.parse(request.body)
    try {
        files.map(file => {
            deleteFile(collection, collectionChunks, file)
        })
        reply.send("successful")

    } catch (err) { reply.send(err.message) }
	

}