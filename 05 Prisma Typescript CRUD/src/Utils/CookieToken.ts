import { cookieOptions, user, BodyResponse } from "../Interfaces/UserInterface";
import { getJwtToken } from "../Helpers/GetJwtToken";

const cookieToken = (user: user, res: BodyResponse) => {
  const jwtToken = getJwtToken(user.id);
  const options: cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  const sanitizedUser = { ...user, password: undefined };
  res
    .status(200)
    .cookie("token", jwtToken as string, options)
    .json({
      success: true,
      token: jwtToken,
      user: sanitizedUser,
    });
};

export default cookieToken;
