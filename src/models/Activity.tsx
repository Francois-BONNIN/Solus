import { Image } from "./Image";
import { Equipment } from "./Equipment";

export interface Activity {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    equipments: {
      data: Equipment[];
    };
  };
}

export interface ActivityResponse {
  data: Activity[];
}
