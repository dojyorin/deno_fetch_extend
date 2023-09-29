import {base64Encode} from "./base64.ts";

/**
* Assignment of types convertible from blob.
*/
export interface BlobType{
    "text": string;
    "base64": string;
    "byte": Uint8Array;
    "buffer": ArrayBuffer;
}

/**
* Convert from blob to specified data type.
* @example
* ```ts
* const file = new File(["my-text"], "example.txt");
* const data = await blobConvert(file, "text");
* ```
*/
export async function blobConvert<T extends keyof BlobType>(blob:Blob, type:T):Promise<BlobType[T]>{
    switch(type){
        case "text": return <BlobType[T]>await blob.text();
        case "base64": return <BlobType[T]>base64Encode(new Uint8Array(await blob.arrayBuffer()));
        case "byte": return <BlobType[T]>new Uint8Array(await blob.arrayBuffer());
        case "buffer": return <BlobType[T]>await blob.arrayBuffer();
        default: throw new Error();
    }
}

/**
* Concat multiple buffer sources into single Uint8Array.
* @example
* ```ts
* const byte = byteConcat(new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]));
* ```
*/
export function byteConcat(...parts:BufferSource[]):Uint8Array{
    const output = new Uint8Array(parts.reduce((n, {byteLength}) => n + byteLength , 0));
    let i = 0;

    for(const part of parts){
        output.set(new Uint8Array(part instanceof ArrayBuffer ? part : part.buffer), i);
        i += part.byteLength;
    }

    return output;
}