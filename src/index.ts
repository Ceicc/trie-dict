type TrieDictConstructor = {
	/**
	 * The initial words to add the Trie
	 */
	words: string[];
};

const completeWordSym = Symbol("Complete Word");

type node = {
	[k: string]: node;
	[completeWordSym]: boolean;
};

export default function TrieDict({ words }: TrieDictConstructor) {
	const storage: node = Object.create(null);

	words.forEach(add);

	function add(word: string) {
		let pointer = storage;

		for (const char of word) {
			if (Object.prototype.hasOwnProperty.call(pointer, char)) {
				pointer = pointer[char];
				continue;
			}
			pointer[char] = { [completeWordSym]: false };
			pointer = pointer[char];
		}

		pointer[completeWordSym] = true;
	}

	return {
		has(word: string) {
			let pointer = storage;

			for (const char of word) {
				if (!Object.prototype.hasOwnProperty.call(pointer, char)) {
					return false;
				}
				pointer = pointer[char];
			}

			return pointer[completeWordSym];
		},
		add,
		remove(word: string) {
			let pointer = storage;

			for (const char of word) {
				if (!Object.prototype.hasOwnProperty.call(pointer, char)) {
					return false;
				}
				pointer = pointer[char];
			}

			if (!pointer[completeWordSym]) {
				return false;
			}

			pointer[completeWordSym] = false;
			return true;
		},
	};
}
