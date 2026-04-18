Here is the translation of the documentation into English:

---

# 📘 NanoJS - Basic Documentation

This guide explains how to use the **NanoJS** framework based on the provided project.

---

## 🚀 Application Initialization

The main file `main.js` configures the routes and starts the router:

```javascript
import { Router } from "nanojs";
import { Home } from "./pages/Home.js";
import { UserDetail } from "./pages/UserDetail.js";

const routes = [
  { path: "/", component: Home },
  { path: "/user/:id", component: UserDetail },
];

const router = new Router(routes, "#app");
router.init();
```

### Explanation:

- **Router:** Manages SPA navigation.
- **routes:** Defines paths and components.
- **#app:** The element where everything will be rendered.

---

## 🧩 Creating Components

Components inherit from the `Component` class:

```javascript
import { Component } from "nanojs";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state.name = "JS Master";
    this.state.count = 0;
  }
}
```

### State

The `state` is reactive — when values change, the UI updates automatically.

---

## 🎨 Declarative Rendering

The `render()` method returns JS objects that represent HTML:

```javascript
render() {
  return {
    div: {
      content: [
        { h1: { content: this.state.title } },
        { p: { content: 'Example text' } }
      ]
    }
  };
}
```

### Rules:

- HTML tags are objects (`div`, `p`, etc.).
- `content` defines the inner content.
- It can be a string, an array, or another object.

---

## ⚡ Events

Events are defined directly as functions:

```javascript
{
  button: {
    content: 'Click me',
    onclick: () => alert('Clicked!')
  }
}
```

### Input example:

```javascript
{
  input: {
    type: 'text',
    value: this.state.newTask,
    oninput: e => this.state.newTask = e.target.value
  }
}
```

---

## 📌 List Handling

Use `map()` to render lists:

```javascript
{
  ul: {
    content: this.state.tasks.map((task) => ({
      li: { content: task.title },
    }));
  }
}
```

---

## ➕ Example: Adding a Task

```javascript
addNewTask() {
  if (this.state.newTask.trim() === '') return;

  const newTask = {
    id: Date.now(),
    title: this.state.newTask
  };

  this.state.tasks = [...this.state.tasks, newTask];
  this.state.newTask = '';
}
```

> This automatically updates the interface.

---

## 🔗 SPA Navigation

Use `data-link` for navigation without a page reload:

```javascript
{
  a: {
    href: '/user/37',
    content: 'User page',
    'data-link': true
  }
}
```

---

## 👤 Route Parameters

Routes with parameters:

```javascript
{ path: '/user/:id', component: UserDetail }
```

### Capturing the parameter:

```javascript
constructor(props) {
  super(props);
  this.state.userId = props.params[0];
}
```

---

## 📄 Details Page

```javascript
render() {
  return {
    div: {
      content: [
        { h1: { content: 'User Details' } },
        {
          p: {
            content: [
              'ID: ',
              { b: { content: this.state.userId } }
            ]
          }
        }
      ]
    }
  };
}
```

---

## ✅ Conclusion

- Lightweight and declarative framework.
- No direct HTML — everything via JS.
- Automatic reactive state.
- SPA with integrated routing.
