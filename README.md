# prom.js
Enhanced version of promise, also a polyfill for promise

<h2>What?</h2>
Prom covers all the features of Promise, but also extend extra features.<br>
new Prom( function(resolve, reject) {...} /* executor */  );<br>
Prom.all(iterable);<br>
Prom.race(iterable);<br>
Prom.reject(reason);<br>
Prom.resolve(value);<br>
Prom.each(iterable);<br>
<i>You could see details in demo please.</i><br>
<h2>Why?</h2>
Prom is more concise and powerful. You could not only use extra features, but also comprehend the internal implementation principle.
