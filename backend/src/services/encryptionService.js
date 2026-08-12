import CryptoJS from 'crypto-js';
import { config } from '../config/index.js';

export function encryptToken(token) {
  if (!token) return null;
  return CryptoJS.AES.encrypt(token, config.encryptionSecret).toString();
}

export function decryptToken(encryptedToken) {
  if (!encryptedToken) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, config.encryptionSecret);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt token:', error.message);
    return null;
  }
}
