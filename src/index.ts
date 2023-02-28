type TrieDictConstructor = {
	/**
	 * The initial words to add the Trie
	 */
	words: string[];
};

const completeWordSym = Symbol("Complete Word");

const traverse = (node: node, string: string): node | false => {
	let pointer = node;

	for (const char of string) {
		if (!Object.prototype.hasOwnProperty.call(pointer, char)) {
			return false;
		}
		pointer = pointer[char];
	}

	return pointer;
};

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
		add,

		has(word: string): boolean {
			const pointer = traverse(storage, word);
			return pointer && pointer[completeWordSym];
		},

		remove(word: string): boolean {
			let pointer = storage;
			const wordPath: Array<{ char: string; node: node }> = [
				{ node: pointer, char: "" },
			];

			for (const char of word) {
				if (!Object.prototype.hasOwnProperty.call(pointer, char)) {
					return false;
				}
				pointer = pointer[char];
				wordPath.push({ char, node: pointer });
			}

			if (!pointer[completeWordSym]) {
				return false;
			}

			pointer[completeWordSym] = false;

			wordPath.reverse();

			wordPath.forEach(({ char, node }, i) => {
				// Doesn't account for symbols
				if (Object.keys(node).length > 0) {
					return;
				}

				// Other word depend on the node
				if (node[completeWordSym]) {
					return;
				}

				// root node
				if (wordPath.length - 1 === i) {
					return;
				}

				const { node: parentNode } = wordPath[i + 1];

				delete parentNode[char];
			});

			return true;
		},

		startsWith(initial: string): boolean {
			const pointer = traverse(storage, initial);
			return (
				pointer && (pointer[completeWordSym] || Object.keys(pointer).length > 0)
			);
		},
	};
}
