var assert = require('assert');
var fs = require('fs');

var unused = require('..');

// run with TEST_GENERATE=yes to create new golden files
var gen_golden = process.env.TEST_GENERATE === 'yes';

var files = fs.readdirSync(__dirname + '/fixtures');

files.forEach(function(file) {
    test(file, function() {
        var path = __dirname + '/fixtures/' + file;

        var src = fs.readFileSync(path, 'utf8');
        var actual = JSON.stringify(unused(src), null, '  ');

        var expected_filename = __dirname + '/expected/' + file + '.json';
        if (gen_golden) {
            return fs.writeFileSync(expected_filename, actual, 'utf8');
        }

        var expected = fs.readFileSync(expected_filename, 'utf8');
        assert.equal(actual, expected);
    });
});

