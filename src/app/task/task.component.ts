import { Component, OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';


interface tasktype{
  name : any;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [CrudService]
})

export class TaskComponent implements OnInit {

  constructor(public crudservice:CrudService) { }

 public data:tasktype[]=[];


  task:any;
  taskName: any;
  message:any;


  ngOnInit()  {

    this.crudservice.get_Alltask().subscribe( data => {
    // console.log(data);
     this.task = data.map( e => {
    //  let  data:any= e.payload.doc.data();
        return{
          id: e.payload.doc.id,
          isedit: false,
     //    name: data.name,
          name: e.payload.doc.data()['name']
        };
      })
      console.log(this.task)
  }) 
 
  }
  
  CreateTask(){
    let Record = {};
    Record['name'] = this.taskName;

    this.crudservice.create_Task(Record).then(res =>{
      this.taskName = "";
      console.log(res);
      this.message = alert("Data Save");
    }).catch(error => {
      console.log(error);
      } 
   );

}

EditTask(Record){
  Record.isedit = true;
  Record.edittask = Record.name;
}

UpdateTask(recorddata){
  let record = {};
  record['name'] = recorddata.edittask; 
  this.crudservice.update_task(recorddata.id,record);
  recorddata.isedit = false;
}

DeleteTask(record_id){
  if(confirm('Are you sure to delete this record ?') == true )
  this.crudservice.delete_task(record_id);
}




  }


