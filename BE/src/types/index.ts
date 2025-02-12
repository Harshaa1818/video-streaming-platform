export * from "./UserRequest";
export * from "./User";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
