// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcryptjs");

const password = "rajakila";
bcrypt.hash(password, 10).then((hash) => console.log(hash));
