const bcrypt = require("bcryptjs");

const password = "rajakila";
bcrypt.hash(password, 10).then((hash) => console.log(hash));
