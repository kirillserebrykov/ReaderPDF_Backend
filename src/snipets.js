import {Duplex} from "stream";

export function bufferToStream(myBuuffer) {
    let tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
}