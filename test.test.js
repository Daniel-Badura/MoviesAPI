// jshint esversion: 9
const functions=require('./test');


test('2+2=4', ()=> {
    expect(functions.add(2,2)).toBe(4);
});