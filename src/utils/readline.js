import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export function ask (question) {
  return new Promise((resolve, reject) => {
    rl.question(question, answer => {
      resolve(answer)
      rl.close()
    })
  })
}
