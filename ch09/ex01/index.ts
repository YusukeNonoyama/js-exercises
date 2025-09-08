export class C {
  static method() {
    return 1;
  } // C.method()
  method() {
    return 2;
  } // new C().method()
  static C = class {
    static method() {
      return 3;
    } // C.C.method()
    method() {
      return 4;
    } // new C.C().method()
  };
  C = class {
    static method() {
      return 5;
    } // new C().C.method()
    method() {
      return 6;
    } // new new C().C().method()
  };
}
