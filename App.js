import assert from "assert"
import mongodb from 'mongodb'
import Fastify from 'fastify'
import fastifyMultipart  from 'fastify-multipart'
import {UploadFile} from "./src/DataBaseLeayer"
import {getFilesHandler} from "./src/routes-handler/Get-handlers"
import {UploadBooksHandler} from "./src/routes-handler/Post-handlers"
const URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const dbName = "ReaderPdf"

const fastify = Fastify({
    logger: false
})


mongodb.MongoClient.connect(URL, async function(error, client) {
    assert.ifError(error);

    const db = client.db(dbName);
    const colectionFiles = db.collection("fs.files")
    const bucket = new mongodb.GridFSBucket(db);

    fastify.get('/Books', (request, reply) => getFilesHandler(request, reply, colectionFiles))
    fastify.register(fastifyMultipart)

    fastify.post("/UploadBooks",  (request, reply) => UploadBooksHandler(request, reply, bucket, colectionFiles) )



    fastify.listen(3000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })

});

