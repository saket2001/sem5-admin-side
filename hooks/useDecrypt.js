// Decrypt
import CryptoJS from "crypto-js";

export default function useDecrypt(text) {
  const bytes = CryptoJS.AES.decrypt(text, "1292939191922121");
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
