import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the JourneyDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class JourneyData {
  key: string;
  title: string;
  note: string;
  dateTime: any;
  location: any;
  stars: number;
}

@Injectable()
export class JourneyDataProvider {

  constructor() {
    console.log('Hello JourneyDataProvider Provider');
  }


  createJourney(journey: JourneyData): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
      .push({
        title: journey.title,
        note: journey.note,
        dateTime: journey.dateTime,
        location: journey.location,
        stars: journey.stars,
      });
  }

  getJourneyList(): Promise<JourneyData[]> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
        .on('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {
            let itm: JourneyData = new JourneyData();
            itm.key = snap.key;
            itm.title = snap.val().title;
            itm.note = snap.val().note;
            itm.dateTime = snap.val().dateTime;
            itm.location = snap.val().location;
            itm.stars = snap.val().stars;
            rawList.push(itm);
            return false;
          });
          resolve(rawList);
        });
    });
  }

  getJourneyDetail(journeyKey: string): Promise<JourneyData> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
        .child(journeyKey).on('value', snap => {
          let itm: JourneyData = new JourneyData();
          itm.key = snap.key;
          itm.title = snap.val().title;
          itm.note = snap.val().note;
          itm.dateTime = snap.val().dateTime;
          itm.location = snap.val().location;
          itm.stars = snap.val().stars;
          resolve(itm);
        });
    });
  }
}
