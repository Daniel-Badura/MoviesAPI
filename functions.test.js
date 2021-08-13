// jshint esversion: 9
const functions=require('./functions');
// const {getMovies, getMovie, createMovie, fetchMovie} = require('./controllers/movies');
const { fetchUser } = require('./functions');

test('2+2=4', ()=> {
    expect(functions.add(2,2)).toBe(4);
});


test('Fetch "http://www.omdbapi.com/?apikey=f7196b6c&t=Batman" returns the Batman Movie object', ()=> {
    expect.assertions(1);
    return functions.fetchMovie("Batman").then(data=>{
        expect(data.Title).toEqual("Batman");
    });
});