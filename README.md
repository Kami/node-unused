# unused

Identify unused variables in your javascript code.

## cli

```shell
$ unused /path/to/file.js
```

### --ignore-params

Comma separated list of function parameters to ignore during unused checks. You often want to know when you forgot to handle `err` or other parameters, but sometimes you have placeholders (`req`, `res`, etc) which you might want to ignore

```shell
$ unused /path/to/file.js --ignore-params req,res,_
```

### --ignore-all-params

A flag to ignore all function parameters during unused checks. If you're working in a large project, there are usually many unused function parameters that are simply placeholders to get to later parameters, so this options allows you to turn off this warning altogether.

```shell
$ unused /path/to/file.js --ignore-all-params
```

## api

### unused(src, options)

> src is a javascript source string

> options is an object containing configuration. like the following:
```javascript
{ ignore_all_params: true }
```


Returns an array of objects specifying the name, location, and if the variable is a function parameter

```javascript
{
    name: 'foo',
    loc: {
        line: 1,
        column: 1,
    },
    param: true || false
}
```

## install

```shell
npm install unused
```
