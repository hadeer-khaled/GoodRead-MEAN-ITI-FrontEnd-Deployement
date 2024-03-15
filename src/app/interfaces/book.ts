import { Author } from "./author";
import { Category } from "./category";

export interface Book {
    _id:string;
    id: number;
    title: string;
    description: string;
    author: Author;
    image: string;
    category: Category; 
    totalRating: number;
    countOfRating: number;
    reviews: string[];
    shelve: string;
}