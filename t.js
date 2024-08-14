// import fs from 'fs';
const fs = require('fs')

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
const url = 'https://vplay.su/secure/81362965c6a47d7/master.txt'
// const url = 'https://vplay.su/secure/81362965c6a47d7/1080/1080p.txt'
// const url = 'https://sv1.vplay101.online/down/2024/08/10/3bf79e6fdee15eaeced0a207e97c8c16/720/7269TKL0000.gif';
const referer = 'https://vplay.su/';
async function fetchAndProcessM3U8(T) {
  try {
    const m = await fetch(T,{'Referer':url}),
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
      console.log(v)
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

// fetchAndProcessM3U8('http://192.168.1.100:3030/81362965c6a47d7/file.m3u8')
// Decode base64 to a binary string


// const decodedData = atob(xyy);

// Convert binary string to buffer
// const buffer = Buffer.from(decodedData, 'binary');

// Write buffer to file
const data = fs.readFileSync('t.ts')
console.log(data)
function str2ab(T) {
  const X = new ArrayBuffer(T.length)
  const v = new Uint8Array(X)
  for (let G = 0; G < T.length; G++) {
    v[G] = T.charCodeAt(G)
  }
  return X
}
console.log(str2ab(data))

// fs.writeFileSync('xyz.ts',str2ab(xyy) );

// console.log('Data has been saved to xyz.ts');