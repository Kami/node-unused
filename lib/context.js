
var Context = function(parent) {
    var self = this;

    self.parent = parent;
    self.variables = {};

    // map of used
    self.used = {};
};

Context.prototype.set = function(name, loc) {
    var self = this;

    // in javascript you can use variables before they are declared
    // yea, it is magical
    if (self.used[name]) {
        return;
    }

    self.variables[name] = loc;
};

Context.prototype.get = function(name) {
    var self = this;

    var val = self.variables[name];
    if (val) {
        return val;
    }

    if (!self.parent) {
        return;
    }

    return self.parent.get(name);
};

Context.prototype.remove = function(name) {
    var self = this;

    self.used[name] = true;

    // if in our scope, remove
    // otherwise we will start checking parent scope
    if (self.variables[name]) {
        return delete self.variables[name];
    }

    if (!self.parent) {
        return;
    }

    self.parent.remove(name);
};

// return list of the unused variables in this context
Context.prototype.unused = function() {
    var self = this;
    return Object.keys(self.variables).map(function(key) {
        return self.variables[key];
    });
};

module.exports = Context;
