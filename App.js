import assert from "assert"
import mongodb from 'mongodb'
import Fastify from 'fastify'
import fastifyMultipart  from 'fastify-multipart'
import {UploadFile} from "./src/DataBaseLeayer"
import {getFilesHandler,getFilesByNameHandler} from "./src/routes-handler/Get"
import {UploadBooksHandler} from "./src/routes-handler/Post-handlers"
const URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const DB_NAME = "ReaderPdf"

const fastify = Fastify({
    logger: false
})


mongodb.MongoClient.connect(URL, async function(error, client) {
    assert.ifError(error);

    const db = client.db(DB_NAME);
    const collectionFiles = db.collection("fs.files")
    const bucket = new mongodb.GridFSBucket(db);

    fastify.register(fastifyMultipart)
    fastify.get('/BooksAll', (request, reply) => getFilesHandler(request, reply, collectionFiles))
    fastify.get('/Books', (request, reply) => getFilesByNameHandler(request, reply,bucket))
    fastify.post("/UploadBooks",  (request, reply) => UploadBooksHandler(request, reply, bucket, collectionFiles) )



    fastify.listen(5000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })

});

