import {UploadFile} from "../DataBaseLeayer"

export const UploadBooksHandler = async (request, reply, bucket, colection) => {
    const data = await request.file()
    try {
        const query = request.query
        const request_metadata = {
            filename: data.filename,
            author: query.author,
            description: query.description,
            page:query.page,
            cover_img:query.cover_img
        }

        const buffer = await data.toBuffer()
        const UploadFileLog = await UploadFile(bucket, buffer, request_metadata ,colection)

        reply.send(UploadFileLog)

    } catch (err) { }


}