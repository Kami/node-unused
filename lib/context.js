
var Context = function(parent) {
    var self = this;

    self.parent = parent;
    self.variables = {};
};

Context.prototype.set = function(name, loc) {
    this.variables[name] = loc;
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
        return {
            name: key,
            loc: self.variables[key]
        };
    });
};

module.exports = Context;
