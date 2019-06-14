# prom.js
![](https://img.shields.io/badge/version-1.0.1-brightgreen.svg) ![](https://img.shields.io/badge/author-Alley%20Luo-blue.svg)<br>
Enhanced version of Promise, also a polyfill for Promise.

<h2>What?</h2>
Prom covers all the features of Promise, but also extend extra features.<br>
new Prom( function(resolve, reject) {...} /* executor */  );<br>
Prom.all(iterable);<br>
Prom.race(iterable);<br>
Prom.reject(reason);<br>
Prom.resolve(value);<br>
Prom.each(iterable);<br>
<i>You could see more details in demo please.</i><br>
<h2>Why?</h2>
Prom is more concise and powerful. Not only full features, but also better browser compatibility.
## How?
### npm
```bash
$ npm install es-prom
```
```javascript
import Prom from 'es-prom'
```
