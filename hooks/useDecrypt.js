// Decrypt
import CryptoJS from "crypto-js";

export default function useDecrypt(text) {
  const bytes = CryptoJS.AES.decrypt(text, process.env.NEXT_PUBLIC_Dkey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
