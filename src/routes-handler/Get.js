import {getFiles,DownloadFile} from "../DataBaseLeayer"
import fs from 'fs'
export const getFilesHandler = async (request, reply, colection) => {
	reply.header("Access-Control-Allow-Origin", "*");
    reply.send(JSON.stringify(await getFiles(colection)))

}
export const getFilesByNameHandler =  async  (request, reply, bucket) => {
    //reply.header("Content-Type", "application/pdf")
	reply.header("Access-Control-Allow-Origin", "*");
    const fileName = request.query.fileName
    const tempFile = `./temp/${fileName}`;
          DownloadFile(bucket, fileName,reply,tempFile).then(value => {
			  
              reply.send([Buffer.from(value).toString('base64')])
          }).catch(err => {
              reply.send(err)
          })




}