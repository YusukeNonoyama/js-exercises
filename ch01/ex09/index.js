class DefaultMap extends Map {
    constructor(defaultValue) {
        super();                          // Invoke superclass constructor
        this.defaultValue = defaultValue; // Remember the default value
    }

    get(key) {
        if (this.has(key)) {              // If the key is already in the map
            return super.get(key);        // return its value from superclass.
        }
        else {
            return this.defaultValue;     // Otherwise return the default value
        }
    }
}

// This class computes and displays letter frequency histograms
class Histogram {
    constructor() {
        this.wordCounts = new DefaultMap(0);  // Map from WORDS to counts
        this.totalWords = 0;                  // How many WORDS in all
    }

    // This function updates the histogram with the WORDS of text.
    add(text) {
        // Remove whitespace from the text, and convert to upper case
        // text = text.replace(/\s/g, "").toUpperCase();
        const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
        // const matches = text.toLowerCase().matchAll(/\w+/g);
        const words = [...matches].map((r) => r[0]);


        // Now loop through the WORDS of the WORD LIST
        for (let word of words) {
            let count = this.wordCounts.get(word); // Get old count
            this.wordCounts.set(word, count + 1);    // Increment it
            this.totalWords++;
        }
    }

    // Convert the histogram to a string that displays an ASCII graphic
    toString() {
        // Convert the Map to an array of [key,value] arrays
        let entries = [...this.wordCounts];

        // Sort the array by count, then alphabetically
        entries.sort((a, b) => {              // A function to define sort order.
            if (a[1] === b[1]) {             // If the counts are the same
                return a[0] < b[0] ? -1 : 1; // sort alphabetically.
            } else {                         // If the counts differ
                return b[1] - a[1];          // sort by largest count.
            }
        });

        // Convert the counts to percentages
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalWords * 100;
        }

        // 出現頻度 0.5% 以上を取得
        entries = entries.filter((entry) => entry[1] >= 0.5);

        // padStart で表示幅を揃える / # の数を n ではなく 10 * n に変更
        const lines = entries.map(
            ([l, n]) =>
                `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
        );

        // And return the concatenated lines, separated by newline characters.
        return lines.join("\n");
    }
}

// This async (Promise-returning) function creates a Histogram object,  
// asynchronously reads chunks of text from standard input, and adds those chunks to
// the histogram. When it reaches the end of the stream, it returns this histogram
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // Read Unicode strings, not bytes
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}


// This one final line of code is the main body of the program.
// It makes a Histogram object from standard input, then prints the histogram.
histogramFromStdin().then(histogram => { console.log(histogram.toString()); });
