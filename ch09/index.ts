// declare global {
//   interface Number {
//     times(f: (i: number) => void, context?: any): void;
//   }
// }

{
(Number.prototype as any).times = function (f: any, context: any) {
  let n = this.valueOf();
  for (let i = 0; i < n; i++) f.call(context, i);
};

let n = 3;
(n as any).times((i: any) => { console.log(`hello ${i}`); });
}


{
class A {
  public analyzeCategory: any;
  public analyze;
  constructor(analyze: any){
    this.analyze = analyze;
  }
}
new A(3);
}

