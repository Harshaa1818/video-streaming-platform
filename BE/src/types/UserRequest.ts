export interface UserRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
