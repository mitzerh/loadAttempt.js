# LoadAttempt Script

> Compact script to attempt execution for any type of condition.

> `js/` folder also contains files for use in `node` and `amd`

---

## Usage

`LoadAttempt(<attempts>, <millisecconds>, <check>, <success>, <expires/abort>)`

`attempt` - The number of load attempts

`milliseconds` - Time in `ms` in between attempts

`check` - callback `function` for the load attempt script to verify

`success` - callback `function` to execute if `check` returns true

`expires/abort` - callback `function` to execute on expire/abort (`function` returns "aborted" or "expired" as first argument)


```js
LoadAttempt(50, 150, function(){
    return (window.foo) ? true : false;
}, function(){
    alert("true");
});
````

By default, an attempt of `999` times every `500ms` is set if not present:

`LoadAttempt(<check function>, <success function>)`

```js
LoadAttempt(function(){
    return (window.foo) ? true : false;
}, function(){
    alert("true");
});
```

An attempt can be aborted by setting it up as a variable and calling `abort()`:

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

If you have an expires/abort function listener, you can listen for that event:

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