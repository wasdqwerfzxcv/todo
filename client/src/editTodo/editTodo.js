import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Prompt} from './confirmModal';
import {HttpClient} from 'aurelia-fetch-client';
import axios from '../../node_modules/axios/index';

@inject(DialogService)
export class todo{
  constructor(dialogService){
    this.todoList = [];
    this.dialogService = dialogService;
    this.axios = require('axios').default;
    this.httpClient = new HttpClient();
    this.displayTodo();
  }
  
  displayTodo(){
    this.httpClient.fetch('http://10.228.30.226:3000/todo/')
        .then(response => response.json())
        .then(data => {
            this.todoList = data;
        });
  }

  removeTodo(todo){
    let index = this.todoList.indexOf(todo);
    if(index !== -1){
      this.todoList.splice(index,1);
    }

    axios({
      method: 'DELETE',
      url: 'http://10.228.30.226:3000/todo/' + todo.ID
    });
  }

  confirmRemove(todo) {
    this.dialogService.open( {viewModel: Prompt, model: 'Are you sure you want to remove this todo?' }).then(openDialogResult => {
      setTimeout(() => {
        openDialogResult.controller.cancel('canceled outside after 5 sec')
      }, 5000);

      return openDialogResult.closeResult;}).then(response => {
      console.log(response);
      if (!response.wasCancelled) {
         console.log('OK');
         this.removeTodo(todo);
      } else {
         console.log('cancelled');
      }
      console.log(response.output);
   });
 }

//  updateTodo(todo){
//   axios({
//     method: 'POST',
//     url: 'http://10.228.30.226:3000/todo/' + todo.ID,
//     data: todo
//   });
//  }

 updateTodo(todoList){
  todoList.forEach(todo => {
    axios({
      method: 'POST',
      url: 'http://10.228.30.226:3000/todo/' + todo.ID,
      data: todo
    });
  });

  alert("Update successfully!")
 }

}

