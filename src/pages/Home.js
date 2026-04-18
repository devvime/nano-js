import { Component } from '../core/Component.js';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state.name = 'Mestre do JS';
    this.state.count = 0;
    this.state.title = 'Nano JS';
    this.state.tasks = [
      { id: 1, title: 'Aprender JavaScript' },
      { id: 2, title: 'Construir projetos' },
      { id: 3, title: 'Compartilhar conhecimento' }
    ];
    this.state.newTask = '';
  }

  addNewTask() {
    if (this.state.newTask.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: this.state.newTask
    };
    this.state.tasks = [...this.state.tasks, newTask];
    this.state.newTask = '';
  }

  render() {
    return {
      div: {
        content: [
          { h1: { content: this.state.title } },
          { p: { content: 'O framework mais leve do mundo' } },
          { a: { href: '/user/37', content: 'User page', 'data-link': true } },
          { hr: {} },
          { p: { content: 'Adicionar task' } },
          { p: { content: `Título da task: ${this.state.newTask}` } },
          {
            input: {
              type: 'text',
              placeholder: 'Digite a task',
              value: this.state.newTask,
              oninput: e => this.state.newTask = e.target.value
            }
          },
          { button: { content: 'Adicionar', onclick: () => this.addNewTask() } },
          { hr: {} },
          { p: { content: 'Task list' } },
          {
            ul: {
              content: this.state.tasks.map(task => ({
                li: {
                  content: task.title
                }
              }))
            }
          }
        ]
      }
    };
  }
}