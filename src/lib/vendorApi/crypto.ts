import CryptoJS from "crypto-js";
import PBKDF2 from "crypto-js/pbkdf2";
import Utf8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

const PassPhrase = String(import.meta.env.REACT_APP_PassPhrase);
const SaltValue = String(import.meta.env.REACT_APP_SaltValue);
const InitVector = String(import.meta.env.REACT_APP_InitVector);
const PasswordIterations = Number.parseInt(
  String(import.meta.env.REACT_APP_PasswordIterations)
);
const Blocksize = Number.parseInt(String(import.meta.env.REACT_APP_Blocksize));

export const encrypt = async (data) => {
  var keys = import.meta.env.REACT_APP_SECRET_AES_KEY || "";
  const key = CryptoJS.enc.Utf8.parse(keys);
  const enc = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7, // Zero-Byte-Padding
  });
  var finalEncrypted = CryptoJS.enc.Base64.stringify(enc.ciphertext);
  return finalEncrypted;
  // return finalEncrypted;
};

export const encryptRequest =  async (request) => {
  // var CryptoJS = require("crypto-js");
  // console.log(request);

  // var keyClass = new VerificationKeys();

  var key = PBKDF2(PassPhrase, Utf8.parse(SaltValue), {
    keySize: 256 / Blocksize,
    iterations: PasswordIterations,
  });
  var parsedIV = Utf8.parse(InitVector);

  // Encrypt
  var encrypted = AES.encrypt(JSON.stringify(request), key, {
    iv: parsedIV,
    // mode: CryptoJS.mode.CFB,
    // padding: CryptoJS.pad.AnsiX923
  }).toString();

  return encrypted;
};
// Decryption Service
export const decryptResponse = async (response) => {
  // var keyClass = new VerificationKeys();
  // console.log(response)

  var key = PBKDF2(PassPhrase, Utf8.parse(SaltValue), {
    keySize: 256 / Blocksize,
    iterations: PasswordIterations,
  });
  var parsedIV = Utf8.parse(InitVector);

  // Decrypt
  var bytes = AES.decrypt(response, key, { iv: parsedIV });
  var decryptedResponse = bytes.toString(Utf8);

  // console.log(JSON.parse(decryptedResponse));
  return JSON.parse(decryptedResponse);
};
export const decrypt = async (data) => {
  var keys = import.meta.env.REACT_APP_SECRET_AES_KEY || "";
  const key = CryptoJS.enc.Utf8.parse(keys);
  const enc = CryptoJS.AES.decrypt(data, key, {
    // iv: import.meta.env.REACT_APP_SECRET_AES_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  return enc;
};
