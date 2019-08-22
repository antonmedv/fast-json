const test = require('ava')
const fastJSON = require('.')

function get(json, ...path) {
  return fastJSON(JSON.stringify(json), path)
}

test(t => {
  const json = 'foo'
  t.is(get(json, 'foo'), void 0)
})

test(t => {
  const json = 1
  t.is(get(json, 'foo'), void 0)
})

test(t => {
  const json = [1, 2, 3]
  t.is(get(json, 'foo'), void 0)
})

test(t => {
  const json = {foo: 'bar'}
  t.is(get(json, 'foo'), 'bar')
  t.is(get(json, 'bar'), void 0)
})

test(t => {
  const r = fastJSON('{"foo": "bar", "baz": 1}', ['bar'])
  t.is(r, void 0)
})

test(t => {
  const r = fastJSON('{"foo": "bar", here goes anything', ['foo'])
  t.is(r, 'bar')
})

test(t => {
  const json = {foo: '"quote"'}
  t.is(get(json, 'foo'), '"quote"')
})

test(t => {
  const json = {foo: {}}
  t.deepEqual(get(json, 'foo'), {})
})

test(t => {
  const json = {foo: 1}
  t.is(get(json, 'foo'), 1)
})

test(t => {
  const json = {foo: 123}
  t.is(get(json, 'foo'), 123)
})

test(t => {
  const json = {foo: 1, bar: 2}
  t.is(get(json, 'foo'), 1)
  t.is(get(json, 'bar'), 2)
})

test(t => {
  const json = {foo: 'foo', bar: 'bar'}
  t.is(get(json, 'foo'), 'foo')
  t.is(get(json, 'bar'), 'bar')
})

test(t => {
  const json = {foo: {bar: 'bar'}}
  t.deepEqual(get(json, 'foo'), json.foo)
  t.is(get(json, 'foo', 'bar'), 'bar')
})

test(t => {
  const json = {foo: {bar: 'bar'}, baz: 1}
  t.deepEqual(get(json, 'foo'), json.foo)
  t.is(get(json, 'foo', 'bar'), 'bar')
  t.is(get(json, 'baz'), 1)
})

test(t => {
  const json = {foo: {bar: 'bar'}, baz: 1}
  const r = fastJSON(JSON.stringify(json, null, 2), ['foo'])
  t.deepEqual(r, json.foo)
})

test(t => {
  const json = {foo: {bar: 'bar'}, baz: 1}
  t.deepEqual(get(json, 'foo'), json.foo)
  t.is(get(json, 'foo', 'bar'), 'bar')
  t.is(get(json, 'baz'), 1)
})

test(t => {
  const json = data()
  t.deepEqual(get(json, 'name'), json.name)
  t.deepEqual(get(json, 'friends'), json.friends)
  t.deepEqual(get(json, 'tags'), json.tags)
  t.deepEqual(get(json, 'range'), json.range)
  t.is(get(json, 'name', 'first'), json.name.first)
  t.is(get(json, 'age'), json.age)
  t.is(get(json, 'about'), json.about)
})

test(t=>{
  const json = {foo: "\\"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const json = {foo: "\\\\"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const json = {foo: "\\\\\\"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const json = {foo: "\\b"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const json = {foo: "b\\"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const json = {foo: "b\\"}
  t.deepEqual(get(json, 'foo'), json.foo)
})

test(t=>{
  const r = fastJSON('{"foo-1": "bar"}', ['foo-1'])
  t.is(r, 'bar')
})

test(t=>{
  const r = fastJSON('{"foo\\"": "bar"}', ['foo\\"']) /**This is wrong lookup, it should be foo" only, may need to fix later */
  t.is(r, 'bar')
})

test(t=>{
  const r = fastJSON('{"foo\\\\": "bar"}', ['foo\\\\']) /**This is wrong lookup, it should be foo\\ only, may need to fix later */
  t.is(r, 'bar')
})

test(t=>{
  const r = fastJSON('{"\\\\": "bar"}', ['\\\\']) /**This is wrong lookup, it should be \\ only, may need to fix later */
  t.is(r, 'bar')
})



function data() {
  return {
    "_id": "5b9cc0c64c0c3df825daf917",
    "index": 0,
    "guid": "63b2461a-4b87-4cc6-a7c5-fc4e797cffe5",
    "isActive": false,
    "balance": "$2,418.18",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "brown",
    "name": {
      "first": "Felicia",
      "last": "Neal"
    },
    "company": "TALKALOT",
    "email": "felicia.neal@talkalot.tv",
    "phone": "+1 (915) 582-3658",
    "address": "994 Grand Avenue, Bakersville, Nebraska, 3554",
    "about": "Dolor quis culpa aute amet elit aute labore eiusmod nostrud mollit. Dolor nostrud qui ex laboris Lorem ullamco nisi aliquip fugiat ipsum eiusmod reprehenderit elit ullamco. Minim occaecat aliquip excepteur reprehenderit tempor ea proident ad eu quis magna tempor. Nisi exercitation do et culpa excepteur magna reprehenderit enim duis dolor elit. Aute culpa enim occaecat fugiat deserunt. Nulla commodo veniam non elit adipisicing adipisicing adipisicing reprehenderit ex sit nostrud non.",
    "registered": "Wednesday, June 13, 2018 11:49 PM",
    "latitude": "3.388267",
    "longitude": "-95.363031",
    "tags": [
      "nulla",
      "in",
      "ipsum",
      "deserunt",
      "do"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kidd Hoover"
      },
      {
        "id": 1,
        "name": "Bessie Norman"
      },
      {
        "id": 2,
        "name": "Carr Evans"
      }
    ],
    "greeting": "Hello, Felicia! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  }
}
