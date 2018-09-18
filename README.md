# fast-json

This package implements fast extraction of part of JSON. 

* 3.5x times faster than jq
* 4.5x times faster than JSON.parse

Notes:

* Fastest way of extracting part of JSON from file
* Arrays not supported currently
* Does not check for valid JSON (you can grab "foo" from here: `{"foo": "bar", here goes anything`)

## Install

```bash
npm i @medv/jast-json
```

## Usage

```js
const fastJSON = require('@medv/fast-json')

const result = fastJSON(input, path)
```

Another example:

```js
const result = fastJSON('{"foo": {"bar": 1}}', ['foo', 'bar'])
```

## CLI

```bash
npm i -g @medv/fast-json
```

```bash
cat data.json | fast-json path to field
```

## Benchmarks

Benchmarks were made with [hyperfine](https://github.com/sharkdp/hyperfine) on a big json (around 400mb).

```
Benchmark #1: cat data.json | fast-json gates aeroflot_ndc_gate gates_info airline_iatas

  Time (mean ± σ):      4.080 s ±  0.181 s    [User: 3.206 s, System: 1.205 s]

  Range (min … max):    3.877 s …  4.292 s

Benchmark #2: cat data.json | jq .gates.aeroflot_ndc_gate.gates_info.airline_iatas

  Time (mean ± σ):     14.938 s ±  0.198 s    [User: 13.009 s, System: 2.170 s]

  Range (min … max):   14.808 s … 15.347 s

Benchmark #3: cat data.json | fx .gates.aeroflot_ndc_gate.gates_info.airline_iatas

  Time (mean ± σ):     18.443 s ±  0.356 s    [User: 17.495 s, System: 2.661 s]

  Range (min … max):   17.731 s … 19.179 s

```

# License

MIT
