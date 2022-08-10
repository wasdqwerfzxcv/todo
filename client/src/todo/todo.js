import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Prompt} from './confirmModal.js';

@inject(DialogService)
export class todo{
  constructor(dialogService){
    this.todos = [];
    this.todoDescription = ' ';
    this.todoTitle = ' ';
    this.todoDeadline = '-';
    this.dialogService = dialogService;
  }
  
  addTodo(){
    if(this.todoDescription){
      let todoData = {title:this.todoTitle,
                     description: this.todoDescription,
                     deadline: this.todoDeadline,
                     done:false};

      this.todos.push(todoData);

      const axios = require('axios').default;
      axios({
        method: 'post',
        url: 'http://localhost:3000/todo',
        data: todoData
      });
      
      this.todoTitle =' ';
      this.todoDescription = ' ';

    }
    
  }

  removeTodo(todo){
    let index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }
  }

  confirmRemove(todo) {
    this.dialogService.open( {viewModel: Prompt, model: 'Are you sure you want to remove this todo?' }).then(openDialogResult => {
      // Note you get here when the dialog is opened, and you are able to close dialog
      setTimeout(() => {
        openDialogResult.controller.cancel('canceled outside after 5 sec')
      }, 5000);

      // Promise for the result is stored in openDialogResult.closeResult property
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

}




