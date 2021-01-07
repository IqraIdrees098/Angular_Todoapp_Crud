import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }


  create_Task(Record){
    return this.fireservices.collection('Tasks').add(Record);
 }

 get_Alltask(){
  return this.fireservices.collection('Tasks').snapshotChanges();
}

update_task(recordid,record){
  this.fireservices.doc('Tasks/' + recordid).update(record);
}

delete_task(record_id){
  this.fireservices.doc('Tasks/' + record_id).delete();
}

 

}
