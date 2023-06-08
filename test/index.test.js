test('fails all the time', () => {
  expect(1).toBe(2);
});

test('this one works', () => {
  expect(1.5).toBe(1.5);
});

test('fails in a flaky way', () => {
  const rnd = Date.now();
  expect(rnd % 2).toBe(0);
});

