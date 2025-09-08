function loggingProxy(o, objname) {
  const handlers = {
    get(target, property, receiver) {
      console.log(`Handler get(${objname},${property.toString()})`);
      let value = Reflect.get(target, property, receiver);
      if (
        Reflect.ownKeys(target).includes(property) &&
        (typeof value === "object" || typeof value === "function")
      ) {
        return loggingProxy(value, `${objname}.${property.toString()}`);
      }
      return value;
    },
    set(target, prop, value, receiver) {
      console.log(`Handler set(${objname},${prop.toString()},${value})`);
      return Reflect.set(target, prop, value, receiver);
    },
    apply(target, receiver, args) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.apply(target, receiver, args);
    },
    construct(target, args, receiver) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.construct(target, args, receiver);
    },
  };
  // We can automatically generate the rest of the handlers. Metaprogramming FTW!
  Reflect.ownKeys(Reflect).forEach((handlerName) => {
    if (!(handlerName in handlers)) {
      handlers[handlerName] = function (target, ...args) {
        console.log(`Handler ${handlerName}(${objname},${args})`);
        return Reflect[handlerName](target, ...args);
      };
    }
  });
  return new Proxy(o, handlers);
}

// Define an array of data and an object with a function property
let data = [10, 20];
let methods = { square: (x) => x * x };
// Create logging proxies for the array and the object
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

console.log("proxyData.methods", proxyData.methods);

// Suppose we want to understand how the Array.map() method works
data.map(methods.square); // => [100, 400]
console.log("====================================================");
console.log(data.map(methods.square)); // => [100, 400]
console.log("====================================================");

// First, let's try it with a logging Proxy array
console.log("proxyData.map(methods.square):", proxyData.map(methods.square)); // => [100, 400]
// // It produces this output:
// // Handler get(data,map)
// // Handler get(data,length)
// // Handler get(data,constructor)
// // Handler has(data,0)
// // Handler get(data,0)
// // Handler has(data,1)
// // Handler get(data,1)
console.log("====================================================");

// // Now lets try with a proxy methods object
console.log("data.map(proxyMethods.square)", data.map(proxyMethods.square)); // => [100, 400]
// // Log output:
// // Handler get(methods,square)
// // Handler methods.square(10,0,10,20)
// // Handler methods.square(20,1,10,20)
console.log("====================================================");

console.log(
  "proxyData.map(proxyMethods.square)",
  proxyData.map(proxyMethods.square),
); // => [100, 400]

console.log("====================================================");

// // Finally, let's use a logging proxy to learn about the iteration protocol
console.log("====================================================");
for (let x of proxyData) console.log("Datum", x);
// // Log output:
// // Handler get(data,Symbol(Symbol.iterator))
// // Handler get(data,length)
// // Handler get(data,0)
// // Datum 10
// // Handler get(data,length)
// // Handler get(data,1)
// // Datum 20
// // Handler get(data,length)
console.log("====================================================");

console.log("proxyData", (proxyData[0] = 8));
