function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

const rawKey = "2222222323232fddfadfdfdfdfdf323232322222222323232fddfadfdfdfdfdf323232322222222323232fddfadfdfdfdfdf32323232";
const salt = "salt";
const info = "???";

async function a () {
    const ikm = await window.crypto.subtle.importKey(
        "raw",
        new ArrayBuffer(stringToByte(rawKey)),
        "PBKDF2",
        false,
        ["deriveKey", "deriveBits"]
    );
    console.log(ikm);
    const key = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", hash: "SHA-256", salt: new ArrayBuffer(stringToByte(salt)), iterations: 64 },
        ikm,
        { name : "AES-GCM", length : 256 }, // Note: for this demo we don't actually need a cipher suite, but the api requires that it must be specified.
        true,
        ["encrypt", "decrypt"]
    );
    console.log(key);
    const exportKey = await crypto.subtle.exportKey("raw", key);
    console.log(exportKey);
}

a();