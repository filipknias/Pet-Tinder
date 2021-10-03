import { Timestamp } from "../types/global"; 

export default interface Like {
  user_id: string;
  pet_id: number;
  created_at: Timestamp;
};