import { timestamp } from "../firebase";;
type Timestamp = typeof timestamp;

export default interface User {
  uid: string;
  email: string;
  displayName: string;
  created_at: Timestamp;
}