# unused [![Build Status](https://secure.travis-ci.org/Kami/node-unused.png?branch=master)](https://travis-ci.org/Kami/node-unused)

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

## api

### unused(src)

> src is a javascript source string

Returns an array of objects specifying the name, location, and if the variable is a function parameter

```
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
