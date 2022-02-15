import {getFiles,DownloadFile} from "../DataBaseLeayer"
import fs from 'fs';
import {pdfToPng} from 'pdf-to-png-converter';
import { Buffer } from 'buffer';
import { PdfBufferToImgBuffer } from "./PdfBuffer-to-ImgBuffer/PdfBuffer-to-ImgBuffer";
import pdf from "pdf-page-counter"


export const getFilesHandler = async (request, reply, collection) => {
	reply.header("Access-Control-Allow-Origin", "*");
    reply.send(JSON.stringify(await getFiles(collection)))

}

export const getFileInfo = async (request, reply, collection) => {
    reply.header("Access-Control-Allow-Origin", "*");
    const fileName = request.query.fileName
    reply.send(JSON.stringify(await getFiles(collection,{filename:fileName})))

}

export const getFileByNameHandler =  async  (request, reply, bucket) => {
    //reply.header("Content-Type", "application/pdf")
	reply.header("Access-Control-Allow-Origin", "*");
    const fileName = request.query.fileName
    DownloadFile(bucket, fileName,reply).then(value => {
        reply.send([Buffer.from(value).toString("base64")])
    }).catch(err => {
        reply.send(err)
    })


}


export const getCoverFile =  async  (request, reply, collectionFiles, bucket) => {
    const fileName = request.query.fileName
	reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Content-Type", "image/png")
    /**/

    const FilePDF = await DownloadFile(bucket, fileName,reply)
    const FileIMG = await  PdfBufferToImgBuffer(FilePDF, fileName)

    reply.send(FileIMG)








}