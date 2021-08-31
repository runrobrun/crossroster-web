import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface scheduledMeet {
  meetName: string,
  meetId: string,
  season: number,
  date: Timestamp,
}
