import { QueryParameterBag } from "./http";
export type URI = {
  protocol: string;
  hostname: string;
  port?: number;
  path: string;
  query?: QueryParameterBag;
  username?: string;
  password?: string;
  fragment?: string;
};
