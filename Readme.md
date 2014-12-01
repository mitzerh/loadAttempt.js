LoadAttempt Script
==================
Lightweight **Promise** script to attempt execution for any type of condition.



Syntax
------

    LoadAttempt([attempts:int], [interval:int], [check:function], [success:function], [expires|abort:function]);

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

**expires|abort**

- `function` to execute on expire/abort 
- the `function` returns `string` "aborted" or "expired" as first argument


Examples
--------

- Check if `window.foo` exists, checking `50` times every `150ms`

  ```js
  LoadAttempt(50, 150, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  ```

- Without **attempts** and **interval** - by default, an attempt of `999` times every `500ms` is set

  ```js
  LoadAttempt(function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  ```

- Optional **attempts** only, default **interval**

  ```js
  LoadAttempt(50, function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  });
  ```
        

- An attempt can be aborted by setting it up as a variable and calling `abort()`:

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


- If you have an expires/abort function listener, you can listen for that event:

  ```js
  var sample = LoadAttempt(function(){
      return (window.foo) ? true : false;
  }, function(){
      alert("true");
  }, function(type){
      alert((type === "aborted") ? "attempt aborted!" : "all attempts expired!");
  });
  
  // abort loadAttempt
  setTimeout(function(){
      sample.abort();
  }, 1000);
  ```

