import { Equipment } from "./Equipment";
import { User } from "./User";

export interface Review {
  id: number;
  attributes: {
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user: {
      data: User;
    };
    equipment: {
      data: Equipment;
    };
  };
}

export interface ReviewResponse {
  data: Review[];
}