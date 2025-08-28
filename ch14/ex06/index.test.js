import { createLoggingProxy } from './index.js';

describe('createLoggingProxy', () => {
    let obj;
    let objProxy;
    let objLogArr;
    beforeEach(() => {
        obj = {
            greet(name) { return `Hey, ${name}`; },
            add(a, b) { return a + b; },
            value: 42
        };
        [objProxy, objLogArr] = createLoggingProxy(obj);
    });
    test('methodが実行できる', () => {
        expect(objProxy.greet('guys')).toBe('Hey, guys');
        expect(objProxy.add(2, 3)).toBe(5);
    });
    test('呼び出したmethodの情報が配列に記録されている', () => {
        objProxy.greet('dude');
        objProxy.add(10, 20);
        expect(objLogArr.length).toBe(2);
        expect(objLogArr[0]).toMatchObject({
            methodName: 'greet',
            args: ['dude']
        });
        expect(objLogArr[1]).toMatchObject({
            methodName: 'add',
            args: [10, 20]
        });
        const timeFormat = /^\d{1,2}:\d{2}:\d{2}$/;
        expect(objLogArr[0].invokedAt).toMatch(timeFormat);
        expect(objLogArr[1].invokedAt).toMatch(timeFormat);
    });
    test('method以外を呼び出しても情報は配列に記録されない', () => {
        const val = objProxy.value;
        expect(val).toBe(42);
        expect(objLogArr.length).toBe(0);
    });
});
