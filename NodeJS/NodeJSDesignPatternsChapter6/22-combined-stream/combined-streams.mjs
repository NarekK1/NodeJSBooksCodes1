import { createGzip, createGunzip } from 'zlib';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
import pumpify from 'pumpify';

//function to create a key from the password using encrypt
function createKey (password){
    //derive a key using scrypt with a salt and key length of 24 bytes
    return scryptSync(password, 'salt', 24)
}

//function to create a combined stream for compression and encryption
export function createCompressAndEncrypt(password, iv){
    //derive the encryption key from the password
    const key = createKey(password);
    //combine gzip compression and AES-192 encryption into a single stream
    const combinedStream = pumpify.obj(
        createGzip(),
        createCipheriv('aes192', key, iv)
    )

    //attach the iv to the combined stream for later use
    combinedStream.iv = iv;
    //return the combined stream
    return combinedStream;
}

//function to create a combined stream for decryption and decompression
export function createDecryptAndDecompress(password, iv){
    //derive the decryption key from the passwrord
    const key = createKey(password);
    //return a combined stream that first decrypts and then decompresses the data
    return pumpify(
        createDecipheriv('aes192', key, iv),
        createGunzip()
    )
}