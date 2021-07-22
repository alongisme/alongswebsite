'use strict';

console.log("new mrtc encrypt worker!");

var algorithm = "sm4";
var mode = "ECB";
var padding = "PKCS5Padding";

var NONCE = "";

var encodeSecretBytes;
var decodeSecretBytes;

var encodeCostTime = 0;
var decodeCostTime = 0;
var encodeCount = 0;
var decodeCount = 0;
var statInterval = 20000;

var k_encodeCostTime = 0;
var k_decodeCostTime = 0;
var k_encodeCount = 0;
var k_decodeCount = 0;
var k_statInterval = 50;

var d_encodeCostTime = 0;
var d_decodeCostTime = 0;
var d_encodeCount = 0;
var d_decodeCount = 0;
var d_statInterval = 20000;

var u_encodeCostTime = 0;
var u_decodeCostTime = 0;
var u_encodeCount = 0;
var u_decodeCount = 0;
var u_statInterval = 20000;

var encodeKeyCount = 0;
var decodeKeyCount = 0;

function encodeFunction(frame, controller) {

    let startTime = new Date().getTime();

    let view = new DataView(frame.data);
    let frameByteLength = frame.data.byteLength;

    let offset = findOffset(frame, view);
    // if (frame.type == "key") {
    //     console.log("[mrtc encrypt encode]", gethhmmss(), frame, offset, encodeKeyCount++);
    // }
    if (offset < 0 || offset >= frameByteLength) {
        console.log("[mrtc encrypt encode] offset invalid!", offset);
        controller.enqueue(frame);
        return;
    }

    let firstArray = new Array(offset);
    for (let i = 0; i < offset; i++) {
        firstArray[i] = view.getUint8(i);
    }
    // if (frame.type == "key") {
    //     console.log("[mrtc encrypt encode]", gethhmmss(), firstArray);
    // }
    let array = new Array(frameByteLength - offset);
    for (let i = offset; i < frameByteLength; i++) {
        array[i - offset] = view.getUint8(i);
    }

    let key = sm4_key_new();
    sm4_set_encrypt_key(key, encodeSecretBytes);
    let encodedArray = sm4_crypt_ecb_new(array, key, 1, true);

    let newData = new ArrayBuffer(encodedArray.length + offset);
    let newView = new DataView(newData);
    for (let i = 0; i < offset; i++) {
        newView.setInt8(i, firstArray[i]);
    }
    for (let i = 0; i < encodedArray.length; i++) {
        newView.setInt8(i + offset, encodedArray[i]);
    }

    frame.data = newData;

    let costTime = new Date().getTime() - startTime;

    // 统计耗时
    encodeCostTime += costTime;
    encodeCount++;
    if (encodeCount % statInterval == 0) {
        console.log("[mrtc encrypt encode] total_costTime=" + (encodeCostTime / statInterval) + "ms");
        encodeCostTime = 0;
    }

    if (frame.type == "key") {
        k_encodeCostTime += costTime;
        k_encodeCount++;
        if (k_encodeCount % k_statInterval == 0) {
            console.log("[mrtc encrypt encode] k_costTime=" + (k_encodeCostTime / k_statInterval) + "ms");
            k_encodeCostTime = 0;
        }
    } else if (frame.type == "delta") {
        d_encodeCostTime += costTime;
        d_encodeCount++;
        if (d_encodeCount % d_statInterval == 0) {
            console.log("[mrtc encrypt encode] d_costTime=" + (d_encodeCostTime / d_statInterval) + "ms");
            d_encodeCostTime = 0;
        }
    } else {
        u_encodeCostTime += costTime;
        u_encodeCount++;
        if (u_encodeCount % u_statInterval == 0) {
            console.log("[mrtc encrypt encode] u_costTime=" + (u_encodeCostTime / u_statInterval) + "ms");
            u_encodeCostTime = 0;
        }
    }

    controller.enqueue(frame);
}

function decodeFunction(frame, controller) {

    let startTime = new Date().getTime();

    let view = new DataView(frame.data);
    let frameByteLength = frame.data.byteLength;

    let offset = findOffset(frame, view);
    // if (frame.type == "key") {
    //     console.log("[mrtc encrypt decode]", gethhmmss(), frame, offset, decodeKeyCount++);
    // }
    if (offset < 0 || offset >= frameByteLength) {
        console.log("[mrtc encrypt decode] offset invalid!", offset);
        controller.enqueue(frame);
        return;
    }

    let firstArray = new Array(offset);
    for (let i = 0; i < offset; i++) {
        firstArray[i] = view.getUint8(i);
    }
    let array = new Array(frameByteLength - offset);
    for (let i = offset; i < frameByteLength; i++) {
        array[i - offset] = view.getUint8(i);
    }

    let key = sm4_key_new();
    sm4_set_decrypt_key(key, decodeSecretBytes);
    let decodedArray = sm4_crypt_ecb_new(array, key, 0, true);

    let newData = new ArrayBuffer(decodedArray.length + offset);
    let newView = new DataView(newData);
    for (let i = 0; i < offset; i++) {
        newView.setInt8(i, firstArray[i]);
    }
    for (let i = 0; i < decodedArray.length; i++) {
        newView.setInt8(i + offset, decodedArray[i]);
    }

    frame.data = newData;

    let costTime = new Date().getTime() - startTime;

    // 统计耗时
    decodeCostTime += costTime;
    decodeCount++;
    if (decodeCount % statInterval == 0) {
        console.log("[mrtc encrypt decode] total_costTime=" + (decodeCostTime / statInterval) + "ms");
        decodeCostTime = 0;
    }

    if (frame.type == "key") {
        k_decodeCostTime += costTime;
        k_decodeCount++;
        if (k_decodeCount % k_statInterval == 0) {
            console.log("[mrtc encrypt decode] k_costTime=" + (k_decodeCostTime / k_statInterval) + "ms");
            k_decodeCostTime = 0;
        }
    } else if (frame.type == "delta") {
        d_decodeCostTime += costTime;
        d_decodeCount++;
        if (d_decodeCount % d_statInterval == 0) {
            console.log("[mrtc encrypt decode] d_costTime=" + (d_decodeCostTime / d_statInterval) + "ms");
            d_decodeCostTime = 0;
        }
    } else {
        u_decodeCostTime += costTime;
        u_decodeCount++;
        if (u_decodeCount % u_statInterval == 0) {
            console.log("[mrtc encrypt decode] u_costTime=" + (u_decodeCostTime / u_statInterval) + "ms");
            u_decodeCostTime = 0;
        }
    }

    controller.enqueue(frame);
}

function findOffset(frame, view) {
    let frameType = frame.type;
    if (frameType != "key" && frameType != "delta") {
        return 0;
    }
    let byteLength = frame.data.byteLength;
    // 多个NALU会被编成一帧，这里拆解帧，获取单个NALU的头部
    let start_code = "";
    for (let i = 0; i < byteLength; i++) {
        let temp = view.getUint8(i);
        // 当前为NALU的第一个字节（已去除startCode）
        if (start_code == "0001" || start_code == "001") {
            // 获取NALU的类型（后5位）
            let nalu_header_binary_str = temp.toString(2);
            let nalu_header_binary_str_length = nalu_header_binary_str.length;
            let nalu_type;
            if (nalu_header_binary_str_length > 5) {
                nalu_type = parseInt(nalu_header_binary_str.substring(nalu_header_binary_str_length - 5), 2);
            } else {
                nalu_type = parseInt(nalu_header_binary_str, 2);
            }
            // if (frameType == "key") {
            //     console.log("[mrtc encrypt findOffset]", start_code, temp, nalu_header_binary_str, nalu_type);
            // }
            switch(nalu_type) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return i + 1;
                case 5:
                    return i + 5;   // I帧偏移4个字节
            }
            start_code = "";
        }
        // 拼接startCode
        switch(temp) {
            case 0:
                if (start_code == "" || start_code == "0" || start_code == "00") {
                    start_code += temp;
                    break;
                }
            case 1:
                if (start_code == "00" || start_code == "000") {
                    start_code += temp;
                    break;
                }
            default:
                start_code = "";
        }
    }
    // 非法，返回-1
    return -1;
}

onmessage = async (event) => {
    let {operation} = event.data;
    let {readableStream, writableStream} = event.data;
    let {secret} = event.data;
    let {transformation} = event.data;
    let {nonce} = event.data;

    if (transformation) {
        let transformation_arr = transformation.split("/");
        algorithm = transformation_arr[0];
        mode = transformation_arr[1];
        padding = transformation_arr[2];
    }
    NONCE = nonce;

    if (operation === 'encode') {
        let transformStream = new TransformStream({transform: encodeFunction});
        readableStream.pipeThrough(transformStream).pipeTo(writableStream); 
        encodeSecretBytes = stringToByte(secret);
    } else if (operation === 'decode') {
        let transformStream = new TransformStream({transform: decodeFunction});
        readableStream.pipeThrough(transformStream).pipeTo(writableStream);
        decodeSecretBytes = stringToByte(secret);
    }
};

// 创建补0函数
function timeFormat(s) {
    return s < 10 ? "0" + s : s;
}

//获取当前时间戳
function gethhmmss() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    return `[${timeFormat(year)}-${timeFormat(month)}-${timeFormat(date)} ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}.${timeFormat(milliseconds)}]`;
};

// ######################### sm4.js (https://github.com/guanzhi/GmSSL/blob/master/js/sm4.js) #####################
function sm4_memcpy(dst, dst_offset, src, src_offset, len) {
	while (len--) {
		dst[dst_offset++] = src[src_offset++];
	}
}

function SM4_GETU32(data, offset) {
	return ((data[offset] << 24)
		| (data[offset + 1] << 16)
		| (data[offset + 2] << 8)
		| data[offset + 3]) >>> 0;
}

function SM4_PUTU32(data, offset, value) {
	data[offset + 3] = (value & 0xff) >>> 0;
	value >>>= 8;
	data[offset + 2] = (value & 0xff) >>> 0;
	value >>>= 8;
	data[offset + 1] = (value & 0xff) >>> 0;
	value >>>= 8;
	data[offset] = (value & 0xff) >>> 0;
}

const SM4_KEY_LENGTH = 16
const SM4_BLOCK_SIZE = 16
const SM4_IV_LENGTH = SM4_BLOCK_SIZE
const SM4_NUM_ROUNDS = 32

const SM4_S = [
	0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7,
	0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
	0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3,
	0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
	0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a,
	0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
	0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95,
	0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
	0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba,
	0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
	0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b,
	0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
	0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2,
	0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
	0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52,
	0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
	0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5,
	0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
	0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55,
	0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
	0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60,
	0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
	0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f,
	0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
	0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f,
	0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
	0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd,
	0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
	0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e,
	0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
	0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20,
	0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48,
];

const SM4_FK = [
	0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc,
];

const SM4_CK = [
	0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
	0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
	0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
	0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
	0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
	0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
	0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
	0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279,
];

function SM4_ROL32(x, n) {
	return ((x << n) | (x >>> (32 - n))) >>> 0;
}

function SM4_S32(A) {
	return (
		(SM4_S[A >>> 24] << 24) ^
		(SM4_S[(A >>> 16) & 0xff] << 16) ^
		(SM4_S[(A >>> 8) & 0xff] << 8) ^
		(SM4_S[A & 0xff])) >>> 0;
}

function SM4_L32(x) {
	return (
		x ^
		SM4_ROL32(x, 2) ^
		SM4_ROL32(x, 10) ^
		SM4_ROL32(x, 18) ^
		SM4_ROL32(x, 24)) >>> 0;
}

function SM4_L32_(x) {
	return (
		x ^
		SM4_ROL32(x, 13) ^
		SM4_ROL32(x, 23)) >>> 0;
}


function sm4_key_new() {
	var key = {
		rk: new Array(SM4_NUM_ROUNDS),
	};
	return key;
}

function sm4_key_free(key) {
	for (var i = 0; i < SM4_NUM_ROUNDS; i++) {
		key.rk[i] = 0;
	}
	// delete key;
}

function sm4_set_encrypt_key(key, user_key) {
	var x0, x1, x2, x3, x4;
	x0 = SM4_GETU32(user_key,  0) ^ SM4_FK[0];
	x1 = SM4_GETU32(user_key,  4) ^ SM4_FK[1];
	x2 = SM4_GETU32(user_key,  8) ^ SM4_FK[2];
	x3 = SM4_GETU32(user_key, 12) ^ SM4_FK[3];
	key.rk[ 0] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[ 0]))) >>> 0;
	key.rk[ 1] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[ 1]))) >>> 0;
	key.rk[ 2] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[ 2]))) >>> 0;
	key.rk[ 3] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[ 3]))) >>> 0;
	key.rk[ 4] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[ 4]))) >>> 0;
	key.rk[ 5] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[ 5]))) >>> 0;
	key.rk[ 6] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[ 6]))) >>> 0;
	key.rk[ 7] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[ 7]))) >>> 0;
	key.rk[ 8] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[ 8]))) >>> 0;
	key.rk[ 9] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[ 9]))) >>> 0;
	key.rk[10] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[10]))) >>> 0;
	key.rk[11] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[11]))) >>> 0;
	key.rk[12] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[12]))) >>> 0;
	key.rk[13] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[13]))) >>> 0;
	key.rk[14] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[14]))) >>> 0;
	key.rk[15] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[15]))) >>> 0;
	key.rk[16] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[16]))) >>> 0;
	key.rk[17] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[17]))) >>> 0;
	key.rk[18] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[18]))) >>> 0;
	key.rk[19] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[19]))) >>> 0;
	key.rk[20] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[20]))) >>> 0;
	key.rk[21] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[21]))) >>> 0;
	key.rk[22] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[22]))) >>> 0;
	key.rk[23] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[23]))) >>> 0;
	key.rk[24] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[24]))) >>> 0;
	key.rk[25] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[25]))) >>> 0;
	key.rk[26] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[26]))) >>> 0;
	key.rk[27] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[27]))) >>> 0;
	key.rk[28] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[28]))) >>> 0;
	key.rk[29] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[29]))) >>> 0;
	key.rk[30] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[30]))) >>> 0;
	key.rk[31] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[31]))) >>> 0;
	x0 = x1 = x3 = x3 = x4 = 0;
}

function sm4_set_decrypt_key(key, user_key) {
	var x0, x1, x2, x3, x4;
	x0 = SM4_GETU32(user_key,  0) ^ SM4_FK[0];
	x1 = SM4_GETU32(user_key,  4) ^ SM4_FK[1];
	x2 = SM4_GETU32(user_key,  8) ^ SM4_FK[2];
	x3 = SM4_GETU32(user_key, 12) ^ SM4_FK[3];
	key.rk[31] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[ 0]))) >>> 0;
	key.rk[30] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[ 1]))) >>> 0;
	key.rk[29] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[ 2]))) >>> 0;
	key.rk[28] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[ 3]))) >>> 0;
	key.rk[27] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[ 4]))) >>> 0;
	key.rk[26] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[ 5]))) >>> 0;
	key.rk[25] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[ 6]))) >>> 0;
	key.rk[24] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[ 7]))) >>> 0;
	key.rk[23] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[ 8]))) >>> 0;
	key.rk[22] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[ 9]))) >>> 0;
	key.rk[21] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[10]))) >>> 0;
	key.rk[20] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[11]))) >>> 0;
	key.rk[19] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[12]))) >>> 0;
	key.rk[18] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[13]))) >>> 0;
	key.rk[17] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[14]))) >>> 0;
	key.rk[16] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[15]))) >>> 0;
	key.rk[15] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[16]))) >>> 0;
	key.rk[14] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[17]))) >>> 0;
	key.rk[13] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[18]))) >>> 0;
	key.rk[12] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[19]))) >>> 0;
	key.rk[11] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[20]))) >>> 0;
	key.rk[10] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[21]))) >>> 0;
	key.rk[ 9] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[22]))) >>> 0;
	key.rk[ 8] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[23]))) >>> 0;
	key.rk[ 7] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[24]))) >>> 0;
	key.rk[ 6] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[25]))) >>> 0;
	key.rk[ 5] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[26]))) >>> 0;
	key.rk[ 4] = x1 = (x2 ^ SM4_L32_(SM4_S32(x3 ^ x4 ^ x0 ^ SM4_CK[27]))) >>> 0;
	key.rk[ 3] = x2 = (x3 ^ SM4_L32_(SM4_S32(x4 ^ x0 ^ x1 ^ SM4_CK[28]))) >>> 0;
	key.rk[ 2] = x3 = (x4 ^ SM4_L32_(SM4_S32(x0 ^ x1 ^ x2 ^ SM4_CK[29]))) >>> 0;
	key.rk[ 1] = x4 = (x0 ^ SM4_L32_(SM4_S32(x1 ^ x2 ^ x3 ^ SM4_CK[30]))) >>> 0;
	key.rk[ 0] = x0 = (x1 ^ SM4_L32_(SM4_S32(x2 ^ x3 ^ x4 ^ SM4_CK[31]))) >>> 0;
	x0 = x1 = x3 = x3 = x4 = 0;
}

function sm4_encrypt(inbuf, in_offset, outbuf, out_offset, key) {
	var x0, x1, x2, x3, x4;
	x0 = SM4_GETU32(inbuf, in_offset);
	x1 = SM4_GETU32(inbuf, in_offset + 4);
	x2 = SM4_GETU32(inbuf, in_offset + 8);
	x3 = SM4_GETU32(inbuf, in_offset + 12);
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[0]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[1]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[2]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[3]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[4]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[5]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[6]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[7]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[8]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[9]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[10]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[11]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[12]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[13]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[14]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[15]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[16]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[17]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[18]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[19]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[20]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[21]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[22]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[23]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[24]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[25]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[26]));
	x1 = x2 ^ SM4_L32(SM4_S32(x3 ^ x4 ^ x0 ^ key.rk[27]));
	x2 = x3 ^ SM4_L32(SM4_S32(x4 ^ x0 ^ x1 ^ key.rk[28]));
	x3 = x4 ^ SM4_L32(SM4_S32(x0 ^ x1 ^ x2 ^ key.rk[29]));
	x4 = x0 ^ SM4_L32(SM4_S32(x1 ^ x2 ^ x3 ^ key.rk[30]));
	x0 = x1 ^ SM4_L32(SM4_S32(x2 ^ x3 ^ x4 ^ key.rk[31]));
	SM4_PUTU32(outbuf, out_offset, x0);
	SM4_PUTU32(outbuf, out_offset + 4, x4);
	SM4_PUTU32(outbuf, out_offset + 8, x3);
	SM4_PUTU32(outbuf, out_offset + 12, x2);
}

function sm4_decrypt(inbuf, in_offset, outbuf, out_offset, key) {
	return sm4_encrypt(inbuf, in_offset, outbuf, out_offset, key);
}

function sm4_crypt_ecb_new(input, key, mode, is_padding) {
    if (input == null | input == '') {
        Error("input is null!");
    }
    if ((is_padding) && (mode == 1)) {
        if (padding == "PKCS5Padding") {
            input = PKCS5Padding(input, 1);
        }
    }
    var outbuf = new Array(input.length);
    for (var offset = 0; offset < input.length; offset += 16) {
        if (mode == 1) {
            sm4_encrypt(input, offset, outbuf, offset, key);
        } else {
            sm4_decrypt(input, offset, outbuf, offset, key);
        }
    }
    if (is_padding && mode == 0) {
        if (padding == "PKCS5Padding") {
            outbuf = PKCS5Padding(outbuf, 0);
        }
    }
    return outbuf;
}

// PKCS5Padding
function PKCS5Padding(input, mode) {
    if (input == undefined) {
        return null;
    }
    var ret = [];
    ret = ret.concat(input);
    if (mode == 1) {
        var p = 16 - input.length % 16;
        for (let i = 0; i < p; i++) {
            ret[input.length + i] = p;
        }
    } else {
        var p = input[input.length - 1];
        for (var t = 0; t < p; t++) {
            ret.pop();
        }
    }
    return ret;
}

// #################### byte&string.js ##########################
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
