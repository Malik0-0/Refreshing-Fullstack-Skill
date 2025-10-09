import bcrypt from "bcrypt";

const hashed = await bcrypt.hash("@Basori_120", 10);
console.log(hashed);