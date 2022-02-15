import assert from "assert"
import mongodb from 'mongodb'
import Fastify from 'fastify'
import fastifyMultipart  from 'fastify-multipart'
import {getFilesHandler,getFileByNameHandler,getFileInfo, getCoverFile} from "./src/routes-handler/Get"
import {UploadBooksHandler} from "./src/routes-handler/Post-handlers"
import {DeleteFilesHandler} from "./src/routes-handler/Delete-handlers"

const DB_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const DB_NAME = "ReaderPdf"

const fastify = Fastify({
    logger: false
})


mongodb.MongoClient.connect(DB_URL, async function(error, client) {
    assert.ifError(error);
	

    const db = client.db(DB_NAME);
    const collectionFiles = db.collection("fs.files")
    const collectionFilesChunks = db.collection("fs.chunks")
    const bucket = new mongodb.GridFSBucket(db);
 
    fastify.register(fastifyMultipart)
    fastify.get('/FilesAll', (request, reply) => getFilesHandler(request, reply, collectionFiles))
    fastify.get('/FileForRead', (request, reply) => getFileByNameHandler(request, reply, bucket))
    fastify.get('/FileInfo', (request, reply) => getFileInfo(request, reply, collectionFiles))
    fastify.post("/UploadFile",  (request, reply) => UploadBooksHandler(request, reply, bucket, collectionFiles))
    fastify.delete("/DeleteFiles",  (request, reply) => DeleteFilesHandler(request, reply, bucket, collectionFiles, collectionFilesChunks))
	fastify.options("/DeleteFiles",  (request, reply) => {
		reply.header("Access-Control-Allow-Origin", "*");
		reply.header("Access-Control-Allow-Methods", "*");
		reply.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
		reply.send("ds")
	})
    fastify.get('/cdn/CoverFile', (request, reply) => getCoverFile(request, reply, collectionFiles, bucket))
    fastify.listen(5000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })

});

