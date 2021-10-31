import assert from "assert"
import fs from 'fs'
import mongodb from 'mongodb'
import Fastify from 'fastify'
import fastifyMultipart  from 'fastify-multipart'
import {UploadFile,getFiles} from "./src/DataBaseLeayer"
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

    fastify.get('/Books', async (request, reply) => {
        reply.send(JSON.stringify(await getFiles(colectionFiles)))
    })


   fastify.register(fastifyMultipart)


    fastify.post("/UploadBooks", async (req, reply) => {
        const data = await req.file()
        try {
            const filename = await data.filename
            const buffer = await data.toBuffer()
          const UploadFileLog =  await UploadFile(bucket,buffer, filename ,colectionFiles)
           console.log(UploadFileLog )
        } catch (err) { }

        reply.send(1)
    })

    

    fastify.listen(3000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })

});

