import { Timestamp } from "../types/global"; 

export default interface Reject {
  user_id: string;
  pet_id: number;
  created_at: Timestamp;
};