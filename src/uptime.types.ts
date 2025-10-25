// type status = 'UP' | 'DOWN';

export interface siteEntityInterface {
  host: string;
  status: string;
  updateAt?: number | string;
}

export interface responseInterface {
  status: number;
  content: any;
}
