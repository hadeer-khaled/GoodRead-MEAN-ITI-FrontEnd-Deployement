export interface Category {
  _id: string;
  id: number;
  name: string;
  [Symbol.iterator](): Iterator<any>;
}
