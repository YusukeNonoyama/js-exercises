export function omitOddNumber(o){
    const ERROR_MESSAGE = "Object should have number type in every value.";
    if(!Object.values(o).every(element => typeof element === 'number')) throw new CustomTypeError(ERROR_MESSAGE);
    let newObj = {};  // 新しいobjectを作成して元のobjectは操作しない
    for ( let property in o){
        // 偶数の場合、は新しいobjectに代入
        if(o[property] % 2 === 0) newObj[property] = o[property];
    }
    return newObj;
}


class CustomTypeError extends Error {
    constructor(message) {
      super(message);
      this.name = 'CustomTypeError';
    }
  }

// const o1 = { x: 1, y: 2, z: 3 };
// const o2 = { x: 1, y: 2, z: "3" };
// const o3 = { x: 1, y: 2, z: true };
// const o4 = { x: 1, y: 2, z: 4, a: 11, b:12984 };
// const o5 = { x: 0, y: 2, z: 3 };
// const o6 = { x: -1, y: -2, z: -3 };

// try{console.log(omitOddNumber(o1));} catch(error){console.error(error.name, ":", error.message);}
// try{console.log(omitOddNumber(o2));} catch(error){console.error(error.name, ":", error.message);}
// try{console.log(omitOddNumber(o3));} catch(error){console.error(error.name, ":", error.message);}
// try{console.log(omitOddNumber(o4));} catch(error){console.error(error.name, ":", error.message);}
// try{console.log(omitOddNumber(o5));} catch(error){console.error(error.name, ":", error.message);}
// try{console.log(omitOddNumber(o6));} catch(error){console.error(error.name, ":", error.message);}