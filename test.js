// jshint esversion: 9
const functions= {
add: (num1,num2)=> num1+num2
};


test('2+2=4', ()=> {
    expect(functions.add(2,2)).toBe(4);
});

module.exports = functions;