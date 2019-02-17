# TODO or Die!

A JavaScript version of [Searls' todo_or_die gem](https://github.com/searls/todo_or_die).

## Usage

```
npm i todo-or-die
```

Import it and use it:

```js
import todoOrDie from 'todo-or-die'

todoOrDie('Update after APIv2 goes live', new Date('2019-02-04'))

// For convenience, todo-or-die accepts `new Date()` compatible strings:
todoOrDie('Update after APIv3 goes live', '2019-02-05')
```

To understand why you would ever call a method to write a comment, [read Searls' explanation](https://github.com/searls/todo_or_die).


### What kind of error?

`todo-or-die` throws an `OverdueError` when your time's up.

You can also `import { OverdueError } from 'todo-or-die'` if you need it.


### Custom Death

```
todoOrDie.config.die = (message, by) => {
  sendEmailToKaren('Oh no, Karen, your stuff broke')
}

// Reset it again!
todoOrDie.reset()
```
