import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
// import {HttpClient} from 'aurelia-fetch-client';
import axios from '../../node_modules/axios/index';
import {faPenToSquare,
        faCirclePlus
       } from "@fortawesome/free-solid-svg-icons";

@inject(DialogService)
export class todo{
  constructor(dialogService){
    this.todoList = [];
    this.todoID = 0;
    this.todoDescription = '';
    this.todoTitle = '';
    this.todoDeadline = '';
    this.dialogService = dialogService;
    this.axios = require('axios').default;
    this.penIcon = faPenToSquare;
    this.plusIcon = faCirclePlus;
    // this.httpClient = new HttpClient();
  }

  created(){
    this.displayTodo();
  }

  generateID(){
    const { 
      v1: uuidv1,
      v4: uuidv4,
    } = require('uuid');
    this.todoID = uuidv1();
  }

  addTodo(){
    if(this.todoDescription){
      this.generateID();
      let todoData = {ID: this.todoID,
                     title:this.todoTitle,
                     description: this.todoDescription,
                     deadline: this.todoDeadline
                     };
      this.todoList.push(todoData);
      axios({
        method: 'post',
        url: 'https://10.228.30.226:443/todo/',
        data: todoData
      });
      this.todoTitle ='';
      this.todoDescription = '';
      
    }

  }

  displayTodo(){
    // this.httpClient.fetch('http://10.228.30.226:3000/todo/')
    //     .then(response => response.json())
    //     .then(data => {
    //         this.todoList = data;
    //     });

    this.axios.get('https://10.228.30.226:443/todo/')
        .then((response)=>{
         this.todoList = response.data;
        })
  }

}





