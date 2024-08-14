async function decryptContent(T) {
  const m = 'vPl@yS3cureV1de0EnceyptionK3y201'
  const X = new Uint8Array(m.split('').map((l) => l.charCodeAt(0)))
  const v = atob(T)
  const G = new Uint8Array(
      v
        .slice(0, 16)
        .split('')
        .map((l) => l.charCodeAt(0))
    ),
    P = new Uint8Array(
      v
        .slice(16)
        .split('')
        .map((l) => l.charCodeAt(0))
    )
  try {
    const l = await crypto.subtle.importKey(
        'raw',
        X,
        {
          name: 'AES-CBC',
          length: 256,
        },
        false,
        ['decrypt']
      ),
      f = {
        name: 'AES-CBC',
        iv: G,
      }
    const F = await crypto.subtle.decrypt(f, l, P)
    return new TextDecoder().decode(F)
  } catch (K) {
    console.error('Decryption error:', K)
    throw K
  }
}
async function fetchAndProcessM3U8(T) {
  try {
    const m = await fetch(T),
      X = await m.text(),
      v = await decryptContent(X),
      G =
        new URL(T, window.location.href).href
          .split('/')
          .slice(0, -1)
          .join('/') + '/',
      P = v.split('\n'),
      l = [],
      f = []
    for (let V = 0; V < P.length; V++) {
      if (P[V].startsWith('#EXT-X-STREAM-INF:')) {
        l.push(P[V])
        V++
        if (V < P.length) {
          const R = P[V],
            n = new URL(R, G).href
          f.push(
            fetch(n).then((y) =>
              y.text().then(async (L) => {
                const D = await decryptContent(L),
                  t = { type: 'application/vnd.apple.mpegurl' }
                const p = new Blob([D], t),
                  O = URL.createObjectURL(p),
                  W = {}
                return (W.index = V), (W.url = O), W
              })
            )
          )
        }
      } else {
        l.push(P[V])
      }
    }
    const F = await Promise.all(f)
    F.forEach((D) => {
      l[D.index] = D.url
    })
    const Z = l.join('\n'),
      K = { type: 'application/vnd.apple.mpegurl' }
    const q = new Blob([Z], K)
    return URL.createObjectURL(q)
  } catch (t) {
    console.error('Error processing m3u8:', t)
    throw t
  }
}
function str2ab(T) {
  const X = new ArrayBuffer(T.length)
  const v = new Uint8Array(X)
  for (let G = 0; G < T.length; G++) {
    v[G] = T.charCodeAt(G)
  }
  return X
}
async function run() {
  const G = (function () {
      const V = {
        oyryG: function (J) {
          return J()
        },
        XuSan: function (J, R) {
          return J === R
        },
        dPiKd: 'xuTfd',
        xbVMV: function (J, R) {
          return J === R
        },
        NEsfO: 'vRbVV',
      }
      let R = true
      return function (n, y) {
        const L = R
          ? function () {
              if (V.XuSan(V.dPiKd, V.dPiKd)) {
                if (y) {
                  if (V.xbVMV(V.NEsfO, V.NEsfO)) {
                    const a = y.apply(n, arguments)
                    return (y = null), a
                  } else {
                    return false
                  }
                }
              } else {
                const p = v.levels.map((W) => W.height)
                G.quality = {
                  default: p[0],
                  options: p,
                  forced: true,
                  onChange: (W) => p(W),
                }
                var O = new l(f, F)
              }
            }
          : function () {}
        return (R = false), L
      }
    })(),
    P = G(this, function () {
      return P.toString()
        .search('(((.+)+)+)+$')
        .toString()
        .constructor(P)
        .search('(((.+)+)+)+$')
    })
  P()
  const l = (function () {
    let R = true
    return function (n, y) {
      const a = R
        ? function () {
            if (y) {
              const O = y.apply(n, arguments)
              return (y = null), O
            }
          }
        : function () {}
      return (R = false), a
    }
  })()
  ;(function () {
    l(this, function () {
      const n = new RegExp('function *\\( *\\)'),
        y = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
        L = B('init')
      if (!n.test(L + 'chain') || !y.test(L + 'input')) {
        L('0')
      } else {
        B()
      }
    })()
  })()
  const f = (function () {
      let R = true
      return function (n, y) {
        const a = R
          ? function () {
              if (y) {
                const t = y.apply(n, arguments)
                return (y = null), t
              }
            }
          : function () {}
        return (R = false), a
      }
    })(),
    F = f(this, function () {
      const R = function () {
          let D
          try {
            D = Function(
              'return (function() {}.constructor("return this")( ));'
            )()
          } catch (p) {
            D = window
          }
          return D
        },
        n = R(),
        y = (n.console = n.console || {}),
        L = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace']
      for (let a = 0; a < L.length; a++) {
        const t = f.constructor.prototype.bind(f),
          p = L[a],
          O = y[p] || t
        t['__proto__'] = f.bind(f)
        t.toString = O.toString.bind(O)
        y[p] = t
      }
    })
  F()
  var Z = document.getElementById('video'),
    K = await fetchAndProcessM3U8('/secure/' + window.videoId + '/master.txt')
  let q = {
    quality: {
      default: L[0],
      options: L,
      forced: true,
      onChange: (a) => i(a),
    },
  }
  function i(V) {
    window.hls.levels.forEach((R, n) => {
      R.height === V &&
        (console.log('Found quality match with ' + V),
        (window.hls.currentLevel = n))
    })
  }
  if (Hls.isSupported()) {
    const J = new Hls({
      debug: true,
      xhrSetup: async function (R, n) {
        if (n.includes('.key')) {
          const y =
              'lrBWge79qJyZ4jiOodV0WtFsFJX3pn62k0KgcjM10DF2+e8h5ecr2czLCEmzULh5Irs7w+LensKEt/h2LmQn6Q==',
            L = await decryptContent(y),
            a = { type: 'application/octet-stream' }
          const D = new Blob([L], a),
            t = URL.createObjectURL(D)
          R.open('GET', t, true)
        }
      },
    })
    J.loadSource(K)
    J.on(Hls.Events.MANIFEST_PARSED, function (R, n) {
      const L = J.levels.map((a) => a.height)
      var y = new Plyr(Z, q)
    })
    J.attachMedia(Z)
    window.hls = J
  }
}
run()
function B(b) {
  function I(m) {
    if (typeof m === 'string') {
      return function (X) {}.constructor('while (true) {}').apply('counter')
    } else {
      ;('' + m / m).length !== 1 || m % 20 === 0
        ? function () {
            return true
          }
            .constructor('debugger')
            .call('action')
        : function () {
            return false
          }
            .constructor('debugger')
            .apply('stateObject')
    }
    I(++m)
  }
  try {
    if (b) {
      return I
    } else {
      I(0)
    }
  } catch (m) {}
}
;(function () {
  const T = function () {
    let m
    try {
      m = Function('return (function() {}.constructor("return this")( ));')()
    } catch (X) {
      m = window
    }
    return m
  }
  const I = T()
  I.setInterval(B, 4000)
})()

let t = 'VAvnUzyfD9qgL9dkTQPWJ0Viym35YxJFTIVmpCzTF+6kIKUtFSif7fK5RwhSJKDVUUeAlAH9uEbZijDAyYshQbE94j3uDb8OWCJ97Gy0YQpE1bNB+WvllF3yGuACTTLqkw1KiJ3XhdONbaaPGfAX/aq8PZJaTAoZ+5dr657DkjZjX0uje7hIUOMhc8qCaY+h8iTAmqX8FJUjmE2ZFsX1ZOYKK9FD3vSIReR0kWHE6pDLIusPxU2Z5DHc+4QmHhJUUgLc++7l4pK0zSKy+5uRHVZD2lJ7ULWRfBl69QpdkdUcz3RzwiMEcz/xHGpNJ864'
// console.log(str2ab(t))
console.log(t)
