export interface Author {
  _id: string;
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  dob: Date;
  image: string;
  [Symbol.iterator](): Iterator<any>;
}
