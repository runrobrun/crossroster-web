import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Season {
  id: string,
  active: boolean,
  seasonYear: number,
  seasonTheme?: string,
  startDate?: Timestamp,
  endDate?: Timestamp
}
