// for (let i = 1; i < 101; i++)
//     console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");

let output;
for (let i = 1; i < 101; i++) {
    if (i % 5) {
        if (i % 3) {
            if (i % 15) {
                output = i;
            } else {
                output = "FizzBuzz";
            };
        } else {
            output = "Fizz";
        };
    }
    else {
        output = "Buzz";
    }
    console.log(output);
}
