export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: "success" | "failed";
  error: boolean;
  message?: string;
  accessToken?: string;
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
  username: string;
  avatar: string;
  fakeEmail: string;
  likedPosts: [];
  posts: [];
}

export interface PostResponse {
  data: Post;
  error: boolean;
  status: string;
}

export interface Comment {
  content: string;
  post: Post;
  created_by: IUser;
}

export interface Post {
    _id: string;
    cover?: string;
    body?: string;
    created_by: IUser;
    likes: [IUser];
    comments?: [Comment];
    caption?: string;
    created_at: Date
}
