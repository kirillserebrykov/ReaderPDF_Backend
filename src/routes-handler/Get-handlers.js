import {getFiles} from "../DataBaseLeayer"

export const getFilesHandler = async (request, reply, colection) => {
           reply.send(JSON.stringify(await getFiles(colection)))
}