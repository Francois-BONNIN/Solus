import { ImageData } from "./Image";
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
    icon: {
      data: ImageData;
    };
  };
}

export interface ActivityResponse {
  data: Activity[];
}
