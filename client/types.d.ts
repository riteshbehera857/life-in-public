export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: "success" | "failed";
  error: boolean;
  message?: string;
  token?: string;
}

export interface IRegisterResponse {
  status: "failed" | "success";
  error: boolean;
  message?: string;
  data?: {
    user: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };
  };
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  likedPosts: [];
  posts: [];
}

export interface PostResponse {
  data: Post;
  error: boolean;
  status: string;
}

export interface Post {
  posts: any[];
}
