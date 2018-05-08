async function concurrentChunks (concurrency, items) {
  const chunked = []

  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency)

    const result = await Promise.all(
      chunk.map(item => {
        return typeof item === 'function'
          ? item()
          : item
      })
    )

    result.forEach(res => chunked.push(res))
  }

  return chunked
}

module.exports = {
  concurrentChunks,
}

// var Worker = require('webworker-threads').Worker;
// // var w = new Worker('worker.js'); // Standard API

// // You may also pass in a function:
// var worker = new Worker(function(){
//   postMessage("I'm working before postMessage('ali').");
//   this.onmessage = function(event) {
//     postMessage('Hi ' + event.data);
//     self.close();
//   };
// });
// worker.onmessage = function(event) {
//   console.log("Worker said : " + event.data);
// };
// worker.postMessage('ali');

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');
//   }).listen(8000);
// }
