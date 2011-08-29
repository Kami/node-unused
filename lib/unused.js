var fs = require('fs');

var sprintf = require('sprintf').sprintf;
var terminal = require('terminal');
var findit = require('findit');
var burrito = require('burrito');

exports.variables = {};


function increaseCount(filePath, variableName) {
  exports.variables[filePath][variableName]['count']++;
}

function processFile(filePath) {
  var content = fs.readFileSync(filePath).toString();

  exports.variables[filePath] = {};

  function inspect(node) {
    var variableName;

    if (node.name === 'var') {
      variableName = node.node[1][0][0];

      if (!exports.variables[filePath].hasOwnProperty(variableName)) {
        exports.variables[filePath][variableName] = {
          'count': 0,
          'line': parseInt(node.start.line, 10) + 1
        };
      }
    }
    else if (node.start && exports.variables[filePath].hasOwnProperty(node.start.value)) {
      variableName = node.start.value;
      increaseCount(filePath, variableName);
    }
    else if (node.end && exports.variables[filePath].hasOwnProperty(node.end.value)) {
      // handle var foo = 'bar';
      // exports.bar = foo;
      variableName = node.end.value;
      increaseCount(filePath, variableName);
    }
  }

  burrito(content, inspect);
}

function report(variables) {
  var filePath, vars, value, variableName, namePrinted = false, count = 0;

  terminal.puts('Unused variables \n');

  for (filePath in variables) {
    if (variables.hasOwnProperty(filePath)) {
      vars = variables[filePath];

      for (variableName in vars) {
        if (vars.hasOwnProperty(variableName)) {
          value = vars[variableName];

          if (value.count === 0) {
            count++;
            if (!namePrinted) {
              terminal.puts(sprintf('File: [red]%s[/red]:', filePath));
              namePrinted = true;
            }

            terminal.puts(sprintf('[bold]%s[/bold] - defined on line [bold]%s[/bold]', variableName, value.line));
          }
        }
      }

      if (namePrinted) {
        console.log('');
      }

      namePrinted = false;
    }
  }

  return count;
}

function main(path) {
  var finder = findit.find(path);

  finder.on('file', function(file) {
    if (file.indexOf('js') === (file.length - 2)) {
      processFile(file);
    }
  });
}

exports.main = main;
exports.report = report;
