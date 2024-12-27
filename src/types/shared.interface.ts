export interface IResponse<T = undefined> {
  data: T;
  status: number;
  message: string;
}
