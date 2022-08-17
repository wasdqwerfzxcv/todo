import { PLATFORM } from "aurelia-framework";

export class App {
  constructor(){
    this.heading = 'Todo App';
  }

  configureRouter(config, router) {
    config.title = 'To Do App';
    config.map([
       { route: ['','todo'],  name: 'todo',  
         moduleId: PLATFORM.moduleName("./todo/todo"),    nav: true, title:'Todo' },
       { route: 'about',  name: 'about',
         moduleId: PLATFORM.moduleName("./about/about"), nav: true,    title:'About' },
       { route: 'editTodo',  name: 'editTodo',
         moduleId: PLATFORM.moduleName("./editTodo/editTodo"), nav: false,    title:'Edit Todo' }
    ]);
    this.router = router;
  }
 
}

