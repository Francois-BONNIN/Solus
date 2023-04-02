import { Equipment } from "./Equipment";
import { Image } from "./Image";
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
  avatar: Image;
}
