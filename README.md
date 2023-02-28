Trie Dictionary
===============

Fast and memory efficient dictionary using [Trie Structure](https://en.wikipedia.org/wiki/Trie).

Install
-------

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```sh
$ npm install trie-dict
```
```js
import TrieDict from "trie-dict";

const dict = TrieDict({ words: ["Trie", "dictionary"], caseSensitive: fasle });;
```

The options object
------------------

### `words`

	- default: `[]`
	- type: `string[]`

	The initial words to add the Trie.

### `caseSensitive`

	- default: `true`
	- type: `boolean`

	Case sensitive dictionary.

API
---

### `dict.add(word: string)`

Add new `word` to the dictionary.

### `dict.has(word: string): boolean`

Check if `word` exist in the dictionary.

### `dict.remove(word: string): boolean`

Remove the `word` from the dictionary if it exist.

### `dict.startsWith(initial: string): boolean`

Check if the dictionary has any word that starts with `initial`.
