import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import axios from '../../node_modules/axios/index';

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
    this.httpClient = new HttpClient();
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
                     deadline: this.todoDeadline,
                     done:false};
      this.todoList.push(todoData);
      axios({
        method: 'post',
        url: 'http://10.228.30.226:3000/todo/',
        data: todoData
      });
      this.todoTitle ='';
      this.todoDescription = '';
      
    }

  }

  displayTodo(){
    this.httpClient.fetch('http://10.228.30.226:3000/todo/')
        .then(response => response.json())
        .then(data => {
            this.todoList = data;
        });
  }


}





