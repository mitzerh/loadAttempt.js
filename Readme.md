LoadAttempt Script
==================
Lightweight **Promise**-type script to attempt execution for any type of condition. You just need to return a `boolean` **true**.


Syntax
------

*Anonymous*
```
LoadAttempt([attempts:int], [interval:int], [check:function], [success:function], [expires|abort:function]);
```

*Methods*
```
var promise = LoadAttempt([attempts:int], [interval:int], [check:function]);

promise.success([success:function]);

promise.expires([expires|abort:function]);

```


**attempt** (optional)

- The number of attempts to run the **check** function
- NOTE: optional in conjuction with **interval** (see examples)

**interval** (optional)

- Time in ***ms*** in between attempts
- NOTE: optional in conjuction with **attempt** (see examples)

**check**

- `function` for the promise script to verify
- Must return a `boolean` **true** for success

**success**

- `function` to execute on successful **check**

**expires|abort** (optional)

- `function` to execute on expire/abort 
- the `function` returns `string` "aborted" or "expired" as first argument


Examples
--------

- Check if `window.foo` exists, checking `50` times every `150ms`

  ```js
  // anonymous
  LoadAttempt(50, 150, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // method
  var sample = LoadAttempt(50, 150, function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  
  ```
  
  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/)


- Without **attempts** and **interval** - by default, an attempt of `999` times every `500ms` is set

  ```js
  // anonymous
  LoadAttempt(function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // method
  var sample = LoadAttempt(function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  ```
  
  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/2/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/1/)


- Optional **attempts** only, default **interval**

  ```js
  // anonymouse
  LoadAttempt(50, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // method
  var sample = LoadAttempt(50, function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  ```

  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/3/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/2/)


- An attempt can be aborted by setting it up as a variable and calling `abort()` method

  ```js
  var sample = LoadAttempt(function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // abort loadAttempt
  setTimeout(function(){
      sample.abort();
  }, 1000);
  ```

  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/4/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/3/)


- If you have an expires/abort function listener, you can listen for that event

  ```js
  var sample = LoadAttempt(function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  
  sample.expires(function(type){
      alert((type === "aborted") ? "attempt aborted!" : "all attempts expired!");
  });
  
  // abort loadAttempt
  setTimeout(function(){
      sample.abort();
  }, 1000);
  ```

  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/5/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/4/)


- If attempts expires
  
  ```js
  var sample = LoadAttempt(15, 150, function(){
      return (window.foo) ? true : false;
  });
  
  sample.expires(function(type){
      alert((type === "aborted") ? "attempt aborted!" : "all attempts expired!");
  });
  ```

  JSFiddle Examples: [Anonymous](http://jsfiddle.net/mitzerh/d5psqsxg/6/) | [Method](http://jsfiddle.net/mitzerh/mjvfbsbp/5/)
  
