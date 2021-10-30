import assert from "assert"
import fs from 'fs'
import mongodb from 'mongodb'
import {UploadFile} from "./src/DataBaseLeayer"
const URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const dbName = "ReaderPdf"
mongodb.MongoClient.connect(URL, async function(error, client) {
    assert.ifError(error);
	// init db
    const db = client.db(dbName);
    const colectionFiles = db.collection("fs.files")
    const bucket = new mongodb.GridFSBucket(db);
	//
    console.log( await UploadFile(bucket,112,4343,colectionFiles))

});

