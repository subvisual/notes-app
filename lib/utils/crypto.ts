import cryptojs from "crypto-js";

export const encryptData = (data: string, key: string) =>
  cryptojs.AES.encrypt(data, key).toString();

export const decryptData = (encData: string, key: string) =>
  cryptojs.AES.decrypt(encData, key).toString(cryptojs.enc.Utf8);
