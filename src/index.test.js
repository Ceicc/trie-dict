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

test("test the remove method", () => {
	expect(dict.remove("nodejs")).toBe(true);
	expect(dict.remove("nodejs")).toBe(false);
	expect(dict.has("nodejs")).toBe(false);
});

test("will remove fail if it's removing the only remaining word?", () => {
	const dict = TrieDict({ words: ["test"] });

	expect(dict.remove("test")).toBe(true);
	expect(dict.has("test")).toBe(false);
});

test("remove function won't delete word nodes if other words depend on it", () => {
	dict.add("daniel");
	dict.add("danielle");
	dict.remove("danielle");

	expect(dict.has("daniel")).toBe(true);
});

test("test the startsWith method", () => {
	expect(dict.startsWith("type")).toBe(true);
	expect(dict.startsWith("typescript")).toBe(true);
	expect(dict.startsWith("typescripts")).toBe(false);
	expect(dict.startsWith("node")).toBe(false);
});

test("Dict function initialize successfully with no option object", () => {
	const dict = TrieDict();
	dict.add("insensitive");
	expect(dict.has("insensitive")).toBe(true);
});
