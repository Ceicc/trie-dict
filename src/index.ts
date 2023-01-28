type TrieDictConstructor = {
	/**
	 * The initial words to add the Trie
	 */
	words: string[];
};

type node = {
	completeWord: boolean;
	[k: string]: node;
};

export default function TrieDict({ words }: TrieDictConstructor) {
	const storage: Record<string, node> = Object.create(null);

	words.forEach(add);

	function add(word: string) {
		let pointer = storage;
		// word.split("").forEach((char) => {
		for (const char of word) {
			if (Object.prototype.hasOwnProperty.call(pointer, char)) {
				pointer = pointer[char];
				continue;
			}
			pointer[char] = { completeWord: false };
			pointer = pointer[char];
		}
		pointer.completeWord = true;
	}

	console.log(storage);

	return {
		has(word: string) {
			let pointer = storage;
			for (const char of word) {
				if (!Object.prototype.hasOwnProperty.call(pointer, char)) {
					return false;
				}
				pointer = pointer[char];
			}
			return pointer.completeWord;
		},
		add,
	};
}
