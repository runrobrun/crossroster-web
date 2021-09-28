import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MeetResult {
    distanceInMiles: number;
    meetName: string;
    meetDateTime: Timestamp;
    place: number;
    season: number;
    meetId: string;
    time: string;
    timeInSeconds: number;
}
