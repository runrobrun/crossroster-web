import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MeetResult {
  distanceInMiles: number,
  meetName: string,
  place: number,
  season: number,
  meetId: string,
  time: string,
  timeInSeconds: number
}
