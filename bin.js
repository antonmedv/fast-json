#!/usr/bin/env node --max-old-space-size=8192
'use strict'
const fastJSON = require('.')

const usage = `
  Usage
    $ fast-json [path ...]

  Examples
    $ cat data.json | fast-json london geo point
    {...}

`

function main(input) {
  if (input === '') {
    console.log(usage)
    process.exit(2)
  }

  const path = process.argv.slice(2)
  const result = fastJSON(input, path)

  if (typeof result === 'undefined') {
    process.stderr.write('undefined\n')
    process.exit(1)
  } else if (typeof result === 'string') {
    console.log(result)
  } else {
    console.log(JSON.stringify(result, null, 2))
  }
}

const stdin = process.stdin
let buff = ''

if (stdin.isTTY) {
  main(buff)
}

stdin.setEncoding('utf8')

stdin.on('readable', () => {
  let chunk

  while ((chunk = stdin.read())) {
    buff += chunk
  }
})

stdin.on('end', () => {
  main(buff)
})
