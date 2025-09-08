// export default () => {return "Arrow function from models.ts"};
export default function defaultFuncRenamed() {
  return "Default function from models.ts";
}

export function fooRenamed2() {
  return "Function foo() from module.ts";
}

export class BarRenamed {
  bazReanamed() {
    return "Bar class method baz() from module.ts";
  }
}
