import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MeetResult {
  distanceInMiles: number,
  meetName: string,
  place: number,
  scheduleId: string,
  time: string,
  timeInSeconds: number
}
