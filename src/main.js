export default function todoOrDie(message, by) {
  const now = new Date()
  by = new Date(by)

  if (now >= by) {
    return todoOrDie.config.die(message, by)
  }
}

const config = {
  die(message, by) {
    throw new OverdueError(message, by)
  },
}

todoOrDie.reset = () => {
  todoOrDie.config = Object.assign({}, config)
}
todoOrDie.reset()

export class OverdueError extends Error {
  constructor(message, by) {
    const date = by.toISOString().slice(0, 10)
    super(`TODO: "${message}" came due on ${date}. Do it!`)

    if (this.stack) {
      this.stack = this.stack
        .split('\n')
        .filter((line) => !line.includes(import.meta.url))
        .join('\n')
    }
  }
}
