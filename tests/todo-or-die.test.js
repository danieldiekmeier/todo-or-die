import test, { beforeEach } from 'node:test'
import assert from 'node:assert'
import todoOrDie, { OverdueError } from '../src/main.js'

beforeEach(() => {
  todoOrDie.reset()
})

test('not due todo does nothing', () => {
  const later = new Date(Date.now() + 1000)

  assert.doesNotThrow(() => todoOrDie('Fix stuff', later))
})

test('due todo blows up', () => {
  const now = new Date('2010-02-04')

  assert.throws(() => todoOrDie('Fix stuff', now), OverdueError)
  assert.throws(() => todoOrDie('Fix stuff', now), {
    message: 'TODO: "Fix stuff" came due on 2010-02-04. Do it!',
  })
})

test('config custom explosion', () => {
  let actualMessage
  let actualBy

  todoOrDie.config.die = function (message, by) {
    actualMessage = message
    actualBy = by
    return 'pants'
  }

  const someTime = new Date('2010-02-04')

  const result = todoOrDie('kaka', someTime)

  assert.equal(result, 'pants')
  assert.equal(actualMessage, 'kaka')
  assert.deepEqual(actualBy, someTime)
})

test('config and reset', () => {
  const originalDie = todoOrDie.config.die

  function someLambda() {}
  todoOrDie.config.die = someLambda

  todoOrDie.reset()

  assert.equal(todoOrDie.config.die, originalDie)
})

test('todo or die file path removed from backtrace', () => {
  const now = new Date('2010-02-04')

  try {
    todoOrDie('Fix stuff', now)
  } catch (error) {
    assert.equal(error.stack.includes('todo-or-die/index.js'), false)
  }
})
