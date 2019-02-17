import test from 'ava'
import todoOrDie, { OverdueError } from '../src/main.js'

test.beforeEach(t => {
  todoOrDie.reset()
})

test.serial('not due todo does nothing', t => {
  const later = new Date(Date.now() + 1000)

  t.notThrows(() => todoOrDie('Fix stuff', later))
})

test.serial('due todo blows up', t => {
  const now = new Date('2010-02-04')

  t.throws(
    () => todoOrDie('Fix stuff', now), {
      instanceOf: OverdueError,
      message: 'TODO: "Fix stuff" came due on 2010-02-04. Do it!'
    }
  )
})

test.serial('config custom explosion', t => {
  let actualMessage
  let actualBy

  todoOrDie.config.die = function (message, by) {
    actualMessage = message
    actualBy = by
    return 'pants'
  }

  const someTime = new Date('2010-02-04')

  const result = todoOrDie('kaka', someTime)

  t.is(result, 'pants')
  t.is(actualMessage, 'kaka')
  t.deepEqual(actualBy, someTime)
})

test.serial('config and reset', t => {
  const originalDie = todoOrDie.config.die

  function someLambda () {}
  todoOrDie.config.die = someLambda

  todoOrDie.reset()

  t.is(todoOrDie.config.die, originalDie)
})

test.serial('todo or die file path removed from backtrace', t => {
  const now = new Date('2010-02-04')
  const error = t.throws(() => todoOrDie('Fix stuff', now))

  t.false(error.stack.includes('todo-or-die/index.js'))
})
