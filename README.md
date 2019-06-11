# prom.js
Enhanced version of promise, also a polyfill for promise

What?
Prom covers all the features of Promise, but also extend extra features.
new Prom( function(resolve, reject) {...} /* executor */  );
Prom.all(iterable);
Prom.race(iterable);
Prom.reject(reason);
Prom.resolve(value);
Prom.each(iterable);
You could see details in demo please.

Why?
Prom is more concise and powerful. You could not only use extra features, but also comprehend the internal implementation principle.
