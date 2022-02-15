import {UploadFile} from "../DataBaseLeayer"

export const  UploadBooksHandler = async (request, reply, bucket, collection) => {
    const data = await request.file()

	reply.header("Access-Control-Allow-Origin", "*");
	reply.header("Access-Control-Allow-Methods", "POST");
	
    try {
        const query = request.query

        const request_metadata = {
            filename: data.filename,
            author: query.author,
            description: query.description,
            page:query.page,
            cover_img:query.cover_img,
            type:query.type
        }

        const buffer = await data.toBuffer()
        const UploadFileLog = await UploadFile(bucket, buffer, request_metadata ,collection)
		
        reply.send(UploadFileLog)

    } catch (err) { reply.send(err.message) }

}