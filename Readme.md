# LoadAttempt Script

> Compact script to attempt execution for any type of condition.

> `js/` folder also contains files for use in `node` and `amd`

---

## Usage

`loadAttempt(<attempts>, <millisecconds>, <check function>, <success function>)`

```js
loadAttempt(50, 150, function(){
    return (window.foo) ? true : false;
}, function(){
    alert("true");
});
````

`loadAttempt(<check function>, <success function>)`
By default, an attempt of `999` times every `500ms` is set if not present.

```js
loadAttempt(function(){
    return (window.foo) ? true : false;
}, function(){
    alert("true");
});
```

An attempt can be aborted by setting it up as a variable and calling `abort()`

```js
var sample = loadAttempt(function(){
    return (window.foo) ? true : false;
}, function(){
    alert("true");
});

// abort loadAttempt
sample.abort();
```

