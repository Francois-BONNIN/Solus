import { Activity } from "./Activity";
import { ImageData } from "./Image";
import { Review } from "./Review";
import { User } from "./User";

export interface Equipment {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    specifications: string;
    price: number;
    image: {
      data: ImageData[];
    };
    favoriteBy: {
      data: User[];
    };
    activities: {
      data: Activity[];
    };
    reviews: {
      data: Review[];
    };
  };
}

export interface EquipmentResponse {
  data: Equipment[];
}
