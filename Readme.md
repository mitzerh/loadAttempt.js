LoadAttempt Script
==================
Lightweight **Promise**-type script to attempt execution for any type of condition. You just need to return a `boolean` **true**.


Syntax
------

*Anonymous*
```
LoadAttempt([attempts:int], [interval:int], [check:function], [success:function], [expires|abort:function]);
```

*Variable*
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

- Check if `window.foo` exists, checking `50` times every `150ms` ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/))

  ```js
  // anonymous
  LoadAttempt(50, 150, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // variable
  var sample = LoadAttempt(50, 150, function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  
  ```



- Without **attempts** and **interval** - by default, an attempt of `999` times every `500ms` is set ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/2/))

  ```js
  // anonymous
  LoadAttempt(function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // variable
  var sample = LoadAttempt(function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  ```

- Optional **attempts** only, default **interval** ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/3/))

  ```js
  // anonymouse
  LoadAttempt(50, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  
  // variable
  var sample = LoadAttempt(50, function(){
      return (window.foo) ? true : false;
  });
  
  sample.success(function(){
      alert("true");
  });
  ```
        

- An attempt can be aborted by setting it up as a variable and calling `abort()` ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/4/))

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


- If you have an expires/abort function listener, you can listen for that event ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/5/))

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

- If attempts expires ([Example @ JS Fiddle](http://jsfiddle.net/mitzerh/d5psqsxg/6/))
  
  ```js
  var sample = LoadAttempt(15, 150, function(){
      return (window.foo) ? true : false;
  });
  
  sample.expires(function(type){
      alert((type === "aborted") ? "attempt aborted!" : "all attempts expired!");
  });
  ```
