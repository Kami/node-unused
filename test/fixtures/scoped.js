// the foo at global scope remains unused
// when a new foo inside bar is declared

var foo = 'bz';

function bar() {
    var foo = 'dog';
    foo = 'cat';
}

bar();
