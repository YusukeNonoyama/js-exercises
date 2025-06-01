/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\n\nlet s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nlet average = stats.mean([...s]); \n\nconsole.log(s);\nconsole.log(average);\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/index.cjs?");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((module) => {

eval("/**\n* The AbstractSet class defines a single abstract method,\nhas().\n*/\nclass AbstractSet {\n    // Throw an error here so that subclasses are forced\n    // to define their own working version of this method.\n    has(x) { throw new Error(\"Abstract method\"); }\n}\n/**\n* NotSet is a concrete subclass of AbstractSet.\n* The members of this set are all values that are not members\nof some\n* other set. Because it is defined in terms of another set it\nis not\n* writable, and because it has infinite members, it is not\nenumerable.\n* All we can do with it is test for membership and convert it\nto a\n* string using mathematical notation.\n*/\nclass NotSet extends AbstractSet {\n    constructor(set) {\n        super();\n        this.set = set;\n    }\n    // Our implementation of the abstract method we inherited\n    has(x) { return !this.set.has(x); }\n    // And we also override this Object method\n    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }\n}\n/**\n* Range set is a concrete subclass of AbstractSet. Its members\nare\n* all values that are between the from and to bounds,\ninclusive.\n* Since its members can be floating point numbers, it is not\n* enumerable and does not have a meaningful size.\n*/\nclass RangeSet extends AbstractSet {\n    constructor(from, to) {\n        super();\n        this.from = from;\n        this.to = to;\n    }\n    has(x) { return x >= this.from && x <= this.to; }\n    toString() {\n        return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;\n    }\n}\n/*\n* AbstractEnumerableSet is an abstract subclass of\nAbstractSet. It defines\n* an abstract getter that returns the size of the set and also\ndefines an\n* abstract iterator. And it then implements concrete\nisEmpty(), toString(),\n* and equals() methods on top of those. Subclasses that\nimplement the\n* iterator, the size getter, and the has() method get these\nconcrete\n* methods for free.\n*/\nclass AbstractEnumerableSet extends AbstractSet {\n    get size() { throw new Error(\"Abstract method\"); }\n    [Symbol.iterator]() { throw new Error(\"Abstract method\"); }\n    isEmpty() { return this.size === 0; }\n    toString() { return `{${Array.from(this).join(\", \")}}`; }\n    equals(set) {\n        // If the other set is not also Enumerable, it isn't equal to this one\n        if (!(set instanceof AbstractEnumerableSet)) return\n        false;\n        // If they don't have the same size, they're not equal\n        if (this.size !== set.size) return false;\n        // Loop through the elements of this set\n        for (let element of this) {\n            // If an element isn't in the other set, they aren't equal\n            if (!set.has(element)) return false;\n        }\n        // The elements matched, so the sets are equal\n        return true;\n    }\n}\n/*\n* SingletonSet is a concrete subclass of\nAbstractEnumerableSet.\n* A singleton set is a read-only set with a single member.\n*/\nclass SingletonSet extends AbstractEnumerableSet {\n    constructor(member) {\n        super();\n        this.member = member;\n    }\n    // We implement these three methods, and inherit isEmpty, equals()\n    // and toString() implementations based on these methods.\n    has(x) { return x === this.member; }\n    get size() { return 1; }\n    *[Symbol.iterator]() { yield this.member; }\n}\n/*\n* AbstractWritableSet is an abstract subclass of\nAbstractEnumerableSet.\n* It defines the abstract methods insert() and remove() that\ninsert and\n* remove individual elements from the set, and then implements\nconcrete\n* add(), subtract(), and intersect() methods on top of those.\nNote that\n* our API diverges here from the standard JavaScript Set\nclass.\n*/\nclass AbstractWritableSet extends AbstractEnumerableSet {\n    insert(x) { throw new Error(\"Abstract method\"); }\n    remove(x) { throw new Error(\"Abstract method\"); }\n    add(set) {\n        for (let element of set) {\n            this.insert(element);\n        }\n    }\n    subtract(set) {\n        for (let element of set) {\n            this.remove(element);\n        }\n    }\n    intersect(set) {\n        for (let element of this) {\n            if (!set.has(element)) {\n                this.remove(element);\n            }\n        }\n    }\n}\n/**\n* A BitSet is a concrete subclass of AbstractWritableSet with\na\n* very efficient fixed-size set implementation for sets whose\n* elements are non-negative integers less than some maximum\nsize.\n*/\nclass BitSet extends AbstractWritableSet {\n    constructor(max) {\n        super();\n        this.max = max; // The maximum integer we can store.\n        this.n = 0; // How many integers are in the set\n        this.numBytes = Math.floor(max / 8) + 1; // How many bytes we need\n        this.data = new Uint8Array(this.numBytes); // The bytes\n    }\n    // Internal method to check if a value is a legal member of this set\n    _valid(x) {\n        return Number.isInteger(x) && x >= 0 && x <=\n            this.max;\n    }\n    // Tests whether the specified bit of the specified byte of our\n    // data array is set or not. Returns true or false.\n    _has(byte, bit) {\n        return (this.data[byte] &\n            BitSet.bits[bit]) !== 0;\n    }\n    // Is the value x in this BitSet?\n    has(x) {\n        if (this._valid(x)) {\n            let byte = Math.floor(x / 8);\n            let bit = x % 8;\n            return this._has(byte, bit);\n        } else {\n            return false;\n        }\n    }\n    // Insert the value x into the BitSet\n    insert(x) {\n        if (this._valid(x)) { // If the value is valid\n            let byte = Math.floor(x / 8); // convert to byte and bit\n            let bit = x % 8;\n            if (!this._has(byte, bit)) { // If that bit isnot set yet\n                this.data[byte] |= BitSet.bits[bit]; // then set it\n                this.n++; // and increment set size\n            }\n        } else {\n            throw new TypeError(\"Invalid set element: \" + x);\n        }\n    }\n    remove(x) {\n        if (this._valid(x)) { // If the value is\n            valid\n            let byte = Math.floor(x / 8); // compute the byte and bit\n            let bit = x % 8;\n            if (this._has(byte, bit)) { // If that bit is already set\n                this.data[byte] &= BitSet.masks[bit]; // then unset it\n                this.n--; // and decrement size\n            }\n        } else {\n            throw new TypeError(\"Invalid set element: \" + x);\n        }\n    }\n    // A getter to return the size of the set\n    get size() { return this.n; }\n    // Iterate the set by just checking each bit in turn.\n    // (We could be a lot more clever and optimize this substantially)\n    *[Symbol.iterator]() {\n        for (let i = 0; i <= this.max; i++) {\n            if (this.has(i)) {\n                yield i;\n            }\n        }\n    }\n}\n// Some pre-computed values used by the has(), insert() and remove() methods\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64,\n~128]);\n\nmodule.exports = {\n    BitSet\n};\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/sets.cjs?");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("const sum = (x, y) => x + y;\nconst square = x => x * x;\n\nexports.mean = data => data.reduce(sum) / data.length;\nexports.stddev = function (d) {\n    let m = exports.mean(d);\n    return Math.sqrt(d.map(x => x -\n        m).map(square).reduce(sum) / (d.length - 1));\n};\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/stats.cjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;