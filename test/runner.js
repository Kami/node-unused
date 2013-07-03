var assert = require('assert');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var BINARY = path.join(__dirname, '../bin/unused');

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

test('cli_help_option', function(done) {
    var child = exec(BINARY, ' --help', function(err, stdout, stderr) {
        assert.ok(err);
        assert.equal(err.code, 1);
        assert.ok(stdout.indexOf('Usage: unused') === 0);
        done();
    });
});

test('cli_no_options_should_print_help', function(done) {
    var child = exec(BINARY, function(err, stdout, stderr) {
        assert.ok(err);
        assert.equal(err.code, 1);
        assert.ok(stdout.indexOf('Usage: unused') === 0);
        done();
    });
});

test('cli_basic_single_file', function(done) {
    var child, cmd;

    cmd = BINARY + ' test/fixtures/basic.js'
    child = exec(cmd, function(err, stdout, stderr) {
        assert.ok(err);
        assert.equal(err.code, 255);
        assert.ok(stdout.indexOf('a - on line 3') !== -1);
        done();
    });
});

test('cli_function_single_file', function(done) {
    var child, cmd;

    cmd = BINARY + ' test/fixtures/function-with-params.js'
    child = exec(cmd, function(err, stdout, stderr) {
        assert.equal(err.code, 255);
        assert.ok(stdout.indexOf('a - on line 2') !== -1);
        assert.ok(stdout.indexOf('b - on line 2') !== -1);
        done();
    });
});

test('cli_function_single_file_ignore_params_options', function(done) {
    var child, cmd;

    cmd = BINARY + ' test/fixtures/function-with-params.js --ignore-params a'
    child = exec(cmd, function(err, stdout, stderr) {
        assert.equal(err.code, 255);
        assert.ok(stdout.indexOf('a - on line') === -1);
        assert.ok(stdout.indexOf('b - on line 2') !== -1);
        done();
    });
});
