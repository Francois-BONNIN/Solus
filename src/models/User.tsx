import { Equipment } from "./Equipment";
import { Review } from "./Review";

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  reviews: {
    data: Review[];
  };
  favorites: {
    data: Equipment[];
  };
}
