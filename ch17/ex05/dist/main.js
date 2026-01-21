(() => {
  'use strict';
  function e(e, t, n, l, o) {
    for (let c = 0; c < t; c++)
      for (let t = 0; t < n; t++) {
        const n = e[c][t];
        (l.beginPath(), l.rect(t * o, c * o, o, o), (l.fillStyle = n ? 'black' : 'white'), l.fill(), l.stroke());
      }
    return [e, l];
  }
  const t = document.querySelector('#screen'),
    n = t.getContext('2d'),
    l = document.querySelector('#start'),
    o = document.querySelector('#pause');
  ((t.width = 500), (t.height = 500));
  let c = null;
  const r = new Audio('/ch15.04-10/ex10/decision1.mp3');
  let i = new Array(50).fill(null).map(() => new Array(50).fill(null).map(() => !!Math.floor(2 * Math.random())));
  t.addEventListener('click', function (l) {
    const o = t.getBoundingClientRect(),
      c = l.clientX - o.left,
      a = l.clientY - o.top,
      u = Math.floor(a / 10),
      f = Math.floor(c / 10);
    ((i[u][f] = !i[u][f]), r.cloneNode().play(), e(i, 50, 50, n, 10));
  });
  let a = 0;
  function u(t) {
    (a || (a = t),
      t - a > 100 &&
        ((a = t),
        (i = (function (e) {
          const t = e.map((e) => [...e]);
          for (let n = 0; n < 50; n++)
            for (let l = 0; l < 50; l++) {
              let o = 0;
              ([
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
              ].forEach((t) => {
                const c = [n + t[0], l + t[1]];
                c.every((e) => e >= 0 && e < 50) && (o += e[c[0]][c[1]]);
              }),
                !0 === t[n][l] ? (t[n][l] = o >= 2 && o <= 3) : (t[n][l] = 3 === o));
            }
          return t;
        })(i)),
        e(i, 50, 50, n, 10)),
      (c = requestAnimationFrame(u)));
  }
  (l.addEventListener('click', () => {
    c || u();
  }),
    o.addEventListener('click', () => {
      c && (cancelAnimationFrame(c), (c = null));
    }),
    e(i, 50, 50, n, 10));
})();
