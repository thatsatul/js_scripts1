// const bar1 = () => console.log('bar1')

// const baz1 = () => console.log('baz1')

// const foo1 = () => {
//   console.log('foo1')
//   setTimeout(bar1, 0) // Callback function goes in message queue
//   Promise goes in Job queue to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.
//   new Promise((resolve, reject) =>//     resolve('should be right after baz1, before bar1')
//   ).then(mssg => console.log(mssg))
//   baz1()
// }

// foo1()

const bar2 = () => console.log('bar2')

const baz2 = () => console.log('baz2')

const foo2 = () => {
  console.log('foo2')
  setTimeout(bar2, 0)
  const pr = new Promise((resolve, reject) =>
    resolve('should be right after baz2, before bar2')
  )
  baz2()
  pr.then(mssg => console.log(mssg))
}

foo2()
