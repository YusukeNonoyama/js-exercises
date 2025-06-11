import { nodeModuleNameResolver } from "typescript";

interface Person {
    name: string;
}

interface Employee extends Person {
    employeeId: number;
}

function getEmployee(obj: Employee){
    return obj.name + obj.employeeId;
}


console.log(getEmployee({name: "nono", employeeId: 33}));


// const html = "<p> hello </p>"
// const regex = /<p>/g;

// let match, positions = [];
// while((match = regex.exec(html)) !== null){
//     positions.push(match.index);
// }

// let dictionary = [ "apple", "book", "coffee"];
// let doubleLetterWords = [];
// let doubleLetter = /(\w)\1/

// for (let word of dictionary){
//     if (doubleLetter.test(word)){
//         doubleLetterWords.push(word);
//     }
// }

// console.log(doubleLetterWords);