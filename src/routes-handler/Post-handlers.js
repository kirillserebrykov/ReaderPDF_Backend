import {UploadFile} from "../DataBaseLeayer"

export const UploadBooksHandler = async (request, reply, bucket, colection) => {
    const data = await request.file()
    try {
        const filename = await data.filename
        const buffer = await data.toBuffer()
        const UploadFileLog = await UploadFile(bucket, buffer, filename ,colection)
        console.log( )
        reply.send(UploadFileLog)
    } catch (err) { }


}