const myEmitter = new EventEmitter()

function test () {
    alert('hi')
}

myEmitter.on('testEvent', test)