import {Poppler} from "node-poppler";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';
import  fs  from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathOutputFile = `${__dirname}/cache/`



 const CreateImg = async (File, outputFile) =>{
     const poppler = new Poppler();
     const options = {
         firstPageToConvert: 1,
         jpegFile:true,
         singleFile: true
     };
     await poppler.pdfToCairo(File, pathOutputFile + outputFile, options);
     return  fs.readFileSync(pathOutputFile + outputFile + ".jpg")
 }








export const PdfBufferToImgBuffer = async (File, fileName) =>{

    const outputFile = Buffer.from(fileName.replace(".pdf", "")).toString("base64")

    try {
        return  fs.readFileSync(pathOutputFile + outputFile + ".jpg")
    }  catch (e) {
       return  CreateImg(File, outputFile)
    }


}
