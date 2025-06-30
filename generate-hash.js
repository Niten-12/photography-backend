const bcrypt = require("bcrypt");

(async () => {
  const hash = await bcrypt.hash("", 10);
  console.log("New bcrypt hash:", hash);
})();
// Satya@3264W
