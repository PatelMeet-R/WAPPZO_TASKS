import bcrypt from "bcryptjs";

import { hashValidation } from "../Interfaces/utilsInterface";
const verifyPassword = async (
  inputPass: string,
  dbPass: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPass, dbPass);
};
const genHashPass = async (inputPass: string): Promise<hashValidation> => {
  try {
    let hash = await bcrypt.hash(inputPass, 10);
    return { isValid: true, hashPass: hash };
  } catch (error) {
    console.log("Error hashing password:", error);
    return { isValid: false };
  }
};

export { verifyPassword, genHashPass };
