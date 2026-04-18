import { Component } from '../core/Component.js';

export class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state.userId = props.params[0];
  }

  render() {
    return {
      div: {
        style: 'padding: 20px; font-family: sans-serif;',
        content: [
          {
            nav: {
              content: [
                { a: { href: '/', 'data-link': true, content: '← Voltar para Home' } }
              ]
            }
          },
          { h1: { content: 'Detalhes do Usuário' } },
          {
            p: {
              content: [
                'Você está visualizando o perfil do ID: ',
                { b: { content: this.state.userId } }
              ]
            }
          },
          {
            div: {
              style: 'background: #f0f0f0; padding: 15px; border-radius: 5px;',
              content: 'Página renderizada declarativamente com objetos JS!'
            }
          }
        ]
      }
    };
  }
}