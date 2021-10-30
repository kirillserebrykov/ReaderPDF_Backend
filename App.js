import assert from "assert"
import fs from 'fs'
import mongodb from 'mongodb'
import Fastify from 'fastify'
import FileUpload  from 'fastify-file-upload'
import {UploadFile,getFiles} from "./src/DataBaseLeayer"
const URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const dbName = "ReaderPdf"

const fastify = Fastify({
    logger: false
})
mongodb.MongoClient.connect(URL, async function(error, client) {
    assert.ifError(error);
	// init db
    const db = client.db(dbName);
    const colectionFiles = db.collection("fs.files")
    const bucket = new mongodb.GridFSBucket(db);



    fastify.get('/Books', async (request, reply) => {
        console.log(1)
        reply.send(JSON.stringify(await getFiles(colectionFiles)))
    })

    fastify.register(FileUpload,{debug : true})

    fastify.post('/uploadBooks',  (request, reply) => {

        const files = request.body


        console.log(files)
        reply.send(1)
    })

    //console.log( await UploadFile(bucket,112,4343,colectionFiles))




    fastify.listen(3000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    })

});

