import { timestamp } from "../utilities/firebase";;
type Timestamp = typeof timestamp;

export default interface User {
  uid: string;
  email: string;
  displayName: string;
  verified: boolean;
  member_since: Timestamp;
}