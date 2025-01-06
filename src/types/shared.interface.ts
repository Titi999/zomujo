export interface IResponse<T = undefined> {
  data: T;
  status: number;
  message: string;
}

export interface IPagination<T> {
  rows: T[];
  total: number;
  pageSize: number;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
}
