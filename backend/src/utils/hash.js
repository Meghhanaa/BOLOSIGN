const crypto = require("crypto");

module.exports.sha256 = buffer =>
  crypto.createHash("sha256").update(buffer).digest("hex");
