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

export interface IQueryParams<T = undefined> {
  page?: number;
  search?: string;
  pageSize?: number;
  orderDirection?: string;
  orderBy?: string;
  status?: T;
}

export interface IAction<T = undefined> {
  payload: T;
}

export interface IExtraBase {
  id: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}
