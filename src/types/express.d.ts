declare namespace Express {
  interface Response {
    result: (data: any) => void;
    error: (error: Error) => void;
  }
}
