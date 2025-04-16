let a = ["1", "2", "3"];
let b = a.map(Number);

console.log(a);
console.log(b);

const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("data loaded!");
      }, 1000);
    });
  };

