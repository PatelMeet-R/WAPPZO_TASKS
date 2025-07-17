interface userID {
  id: string;
}
interface loginBody {
  email: string;
  password: string;
}

interface SignBody {
  email: string;
  name: string;
  password: string;
  department: string;
}
type LogStatus = "pending" | "reject" | "accepted";
type Role = "USER" | "ADMIN";

export { userID, SignBody, loginBody, Role };
