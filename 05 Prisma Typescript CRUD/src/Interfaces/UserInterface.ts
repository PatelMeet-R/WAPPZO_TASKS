interface Signupbody {
  name: string;
  email: string;
  password: string;
}
interface LoginBody {
  email: string;
  password: string;
}
interface PostBody {
  postTitle: string;
  postDescription: string;
}
interface user extends Signupbody {
  id: string;
}

interface cookieOptions {
  expires: Date;
  httpOnly: boolean;
}
interface BodyResponse {
  status: (code: number) => BodyResponse;
  cookie: (
    name: string,
    value: string,
    options?: cookieOptions
  ) => BodyResponse;
  json: (body: any) => void;
  send: (body: any) => void;
}
interface UpdatePostBody {
  postTitle?: string;
  postDescription?: string;
}

export {
  Signupbody,
  user,
  cookieOptions,
  BodyResponse,
  LoginBody,
  PostBody,
  UpdatePostBody,
};
