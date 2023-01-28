import { test, expect } from "@jest/globals";
import TrieDict from "../dist/index.js";

const dict = TrieDict({ words: ["test", "work", "javascript"] });

test("has the words we just passed to it", () => {
	expect(dict.has("test")).toBe(true);
	expect(dict.has("work")).toBe(true);
});

test("doesn't have 'java', the initial of 'javascript'", () => {
	expect(dict.has("java")).toBe(false);
});

test("add words and test it", () => {
	["typescript", "nodejs"].forEach(dict.add);

	expect(dict.has("typescript")).toBe(true);
	expect(dict.has("nodejs")).toBe(true);
});
