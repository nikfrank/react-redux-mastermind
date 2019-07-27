import score from './score';

it('scores the guess', ()=> {
  const secret = [1, 2, 3, 4];

  const guesses = [
    [4, 3, 2, 1],
    [5, 5, 5, 5],
    [2, 2, 2, 2],
    [2, 2, 2, 3],
    [1, 2, 3, 3],
    [1, 2, 3, 4],
  ];

  const scores = [
    [0, 4],
    [0, 0],
    [1, 0],
    [1, 1],
    [3, 0],
    [4, 0],
  ];

  const output = guesses.map(score(secret));

  output.forEach((o, i)=> expect( o ).toEqual( scores[i] ) )
});

it('scores the guess with duplicates in the secret', ()=> {
  const secret = [2, 2, 3, 3];

  const guesses = [
    [4, 3, 2, 1],
    [5, 5, 5, 5],
    [2, 2, 2, 2],
    [2, 2, 2, 3],
    [1, 3, 2, 3],
    [2, 2, 3, 3],
  ];

  const scores = [
    [0, 2],
    [0, 0],
    [2, 0],
    [3, 0],
    [1, 2],
    [4, 0],
  ];

  const output = guesses.map(score(secret));

  output.forEach((o, i)=> expect( o ).toEqual( scores[i] ) )
});
