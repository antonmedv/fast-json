/**
 * Fast extract part of json by path.
 * Example: fastJSON('{...}', ['foo', 'bar'])
 *
 * @param {String} input JSON
 * @param {Array} path Path for extraction
 * @returns {*}
 * @throws SyntaxError
 */
function fastJSON(input, path) {
  let lookup = path.shift() // Holds key what we should find next

  let record = false // Triggers setting of next variables.
  let start = 0, end = 0 // Holds found offsets in input.

  const stack = [] // Count brackets and ":" sign.
  const isKeys = 0, isArray = 1, isValue = 2
  let level = 0 // Current depth level.
  let on = 1 // What level we are expecting right now.

  loop: for (let i = 0, len = input.length; i < len; i++) {
    const ch = input[i]
    switch (ch) {

      case '{': {
        stack.push(isKeys)
        level++
        break
      }

      case '}': {
        const t = stack.pop()
        if (t !== isValue && t !== isKeys) {
          throw new SyntaxError(`Unexpected token ${ch} in JSON at position ${i}`)
        }
        level--
        if (record && level < on) {
          end = i - 1
          break loop
        }
        break
      }

      case '[': {
        stack.push(isArray)
        level++
        break
      }

      case ']': {
        if (stack.pop() !== isArray) {
          throw new SyntaxError(`Unexpected token ${ch} in JSON at position ${i}`)
        }
        level--
        if (record && level < on) {
          end = i - 1
          break loop
        }
        break
      }

      case ':': {
        const t = stack[stack.length - 1]
        if (t === isKeys) {
          stack[stack.length - 1] = isValue
        }
        if (record && level === on) {
          start = i + 1
        }
        break
      }

      case ',': {
        const t = stack[stack.length - 1]
        if (t === isValue) {
          stack[stack.length - 1] = isKeys
        }
        if (record && level === on) {
          end = i - 1
          break loop
        }
        break
      }

      case '"':
        let j = ++i // next char after "

        // Consume whole string till next " symbol.
        for (; j < len; j++) {
          const ch = input[j]

          if (ch === '"' && input[j - 1] !== '\\') { // Make sure " doesn't escaped.
            break
          }
           else if (ch == '"' && input[j - 1] === '\\') { // handle case with \\",\\\\"
            let backslashCount = 1;
            while (input[j - 1 - backslashCount] === '\\') {
              backslashCount++;
            }

            if (backslashCount % 2 === 0) {
              break;
            }
          }
        }

        // Check if current key is what we was looking for.
        const t = stack[stack.length - 1]
        if (t === isKeys && level === on && input.slice(i, j) === lookup) {
          if (path.length > 0) {
            lookup = path.shift()
            on++
          } else {
            record = true
          }

        }

        i = j // Continue from end of string.
        break
    }
  }

  if (start !== 0 && start <= end) {
    const part = input.slice(start, end + 1) // We found it.
    return JSON.parse(part)
  } else if (level !== 0) {
    throw new SyntaxError(`JSON parse error`)
  }
}

module.exports = fastJSON
