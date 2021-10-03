import { Timestamp } from "../types/global"; 

export default interface User {
  uid: string;
  email: string;
  displayName: string;
  verified: boolean;
  member_since: Timestamp;
}