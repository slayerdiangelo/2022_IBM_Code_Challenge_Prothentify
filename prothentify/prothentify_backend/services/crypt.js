const crypto = require("crypto");
const secret = require("../keys/crypt-keys.json");

const passphrase = secret.passphrase;

encode = async (string) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(passphrase, "", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const part1 = cipher.update(string, "utf-8");
  const part2 = cipher.final();
  const encrypted = Buffer.concat([part1, part2]).toString("base64");
  return {
    encoded: encrypted,
    iv: iv,
  };
};

decode = async (string, iv) => {
  const key = crypto.scryptSync(passphrase, "", 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  var decrypted = decipher.update(string, "base64", "utf-8");
  decrypted = decrypted + decipher.final();
  return decrypted;
};

module.exports = { encode, decode };
