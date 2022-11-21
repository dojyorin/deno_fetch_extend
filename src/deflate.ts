import {streamConvert} from "./_utility.ts";

/**
* Compresses raw binary in "deflate" format (RFC1951 compliant).
* It does not include header information like "gzip" (RFC1952) or "zlib" (RFC1950) as it does purely "compression only".
* @param data The byte.
*/
export async function deflateEncode(data:Uint8Array){
    return await streamConvert(data, new CompressionStream("deflate-raw"));
}

/**
* Decompress "deflate" format (RFC1951 compliant) binary.
* Binaries containing header information like "gzip" (RFC1952) or "zlib" (RFC1950) cannot be decompressed.
* @param data The byte.
*/
export async function deflateDecode(data:Uint8Array){
    return await streamConvert(data, new DecompressionStream("deflate-raw"));
}