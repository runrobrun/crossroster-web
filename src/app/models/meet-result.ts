import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MeetResult {
  date: Timestamp,
  distanceInMiles: number,
  meetName: string,
  place: number,
  time: string,
  timeInSeconds: number
}
