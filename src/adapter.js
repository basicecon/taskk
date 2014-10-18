
// ??
(function() {
    function e(h, a, c) {
        if (h === a) return h !== 0 || 1 / h == 1 / a;
        if (h == null) return h === a;
        var g = typeof h;
        if (g != typeof a) return false;
        if (!h != !a) return false;
        if (b.isNaN(h)) return b.isNaN(a);
        var d = b.isString(h),
            n = b.isString(a);
        if (d || n) return d && n && String(h) == String(a);
        d = b.isNumber(h);
        n = b.isNumber(a);
        if (d || n) return d && n && +h == +a;
        d = b.isBoolean(h);
        n = b.isBoolean(a);
        if (d || n) return d && n && +h == +a;
        d = b.isDate(h);
        n = b.isDate(a);
        if (d || n) return d && n && h.getTime() == a.getTime();
        d = b.isRegExp(h);
        n = b.isRegExp(a);
        if (d || n) return d &&
            n && h.source == a.source && h.global == a.global && h.multiline == a.multiline && h.ignoreCase == a.ignoreCase;
        if (g != "object") return false;
        if (h._chain) h = h._wrapped;
        if (a._chain) a = a._wrapped;
        if (b.isFunction(h.isEqual)) return h.isEqual(a);
        for (g = c.length; g--;)
            if (c[g] == h) return true;
        c.push(h);
        g = 0;
        d = true;
        if (h.length === +h.length || a.length === +a.length) {
            if (g = h.length, d = g == a.length)
                for (; g--;)
                    if (!(d = g in h == g in a && e(h[g], a[g], c))) break
        } else {
            for (var f in h)
                if (o.call(h, f) && (g++, !(d = o.call(a, f) && e(h[f], a[f], c)))) break;
            if (d) {
                for (f in a)
                    if (o.call(a,
                            f) && !g--) break;
                d = !g
            }
        }
        c.pop();
        return d
    }
    var j = this,
        f = j._,
        i = {},
        k = Array.prototype,
        p = Object.prototype,
        l = k.slice,
        B = k.unshift,
        t = p.toString,
        o = p.hasOwnProperty,
        u = k.forEach,
        y = k.map,
        v = k.reduce,
        z = k.reduceRight,
        w = k.filter,
        A = k.every,
        x = k.some,
        q = k.indexOf,
        r = k.lastIndexOf,
        p = Array.isArray,
        a = Object.keys,
        c = Function.prototype.bind,
        b = function(a) {
            return new s(a)
        };
    typeof module !== "undefined" && module.exports ? (module.exports = b, b._ = b) : j._ = b;
    b.VERSION = "1.2.0";
    var d = b.each = b.forEach = function(a, b, c) {
        if (a != null)
            if (u && a.forEach ===
                u) a.forEach(b, c);
            else if (a.length === +a.length)
            for (var g = 0, d = a.length; g < d; g++) {
                if (g in a && b.call(c, a[g], g, a) === i) break
            } else
                for (g in a)
                    if (o.call(a, g) && b.call(c, a[g], g, a) === i) break
    };
    b.map = function(a, b, c) {
        var g = [];
        if (a == null) return g;
        if (y && a.map === y) return a.map(b, c);
        d(a, function(a, h, d) {
            g[g.length] = b.call(c, a, h, d)
        });
        return g
    };
    b.reduce = b.foldl = b.inject = function(a, c, m, g) {
        var e = m !== void 0;
        a == null && (a = []);
        if (v && a.reduce === v) return g && (c = b.bind(c, g)), e ? a.reduce(c, m) : a.reduce(c);
        d(a, function(a, b, h) {
            e ? m = c.call(g,
                m, a, b, h) : (m = a, e = true)
        });
        if (!e) throw new TypeError("Reduce of empty array with no initial value");
        return m
    };
    b.reduceRight = b.foldr = function(a, c, m, g) {
        a == null && (a = []);
        if (z && a.reduceRight === z) return g && (c = b.bind(c, g)), m !== void 0 ? a.reduceRight(c, m) : a.reduceRight(c);
        a = (b.isArray(a) ? a.slice() : b.toArray(a)).reverse();
        return b.reduce(a, c, m, g)
    };
    b.find = b.detect = function(a, b, c) {
        var g;
        D(a, function(a, h, d) {
            if (b.call(c, a, h, d)) return g = a, true
        });
        return g
    };
    b.filter = b.select = function(a, b, c) {
        var g = [];
        if (a == null) return g;
        if (w && a.filter === w) return a.filter(b, c);
        d(a, function(a, h, d) {
            b.call(c, a, h, d) && (g[g.length] = a)
        });
        return g
    };
    b.reject = function(a, b, c) {
        var g = [];
        if (a == null) return g;
        d(a, function(a, h, d) {
            b.call(c, a, h, d) || (g[g.length] = a)
        });
        return g
    };
    b.every = b.all = function(a, b, c) {
        var g = true;
        if (a == null) return g;
        if (A && a.every === A) return a.every(b, c);
        d(a, function(a, h, d) {
            if (!(g = g && b.call(c, a, h, d))) return i
        });
        return g
    };
    var D = b.some = b.any = function(a, c, m) {
        var c = c || b.identity,
            g = false;
        if (a == null) return g;
        if (x && a.some === x) return a.some(c,
            m);
        d(a, function(a, b, h) {
            if (g |= c.call(m, a, b, h)) return i
        });
        return !!g
    };
    b.include = b.contains = function(a, b) {
        var c = false;
        if (a == null) return c;
        if (q && a.indexOf === q) return a.indexOf(b) != -1;
        D(a, function(a) {
            if (c = a === b) return true
        });
        return c
    };
    b.invoke = function(a, c) {
        var d = l.call(arguments, 2);
        return b.map(a, function(a) {
            return (c.call ? c || a : a[c]).apply(a, d)
        })
    };
    b.pluck = function(a, c) {
        return b.map(a, function(a) {
            return a[c]
        })
    };
    b.max = function(a, c, m) {
        if (!c && b.isArray(a)) return Math.max.apply(Math, a);
        if (!c && b.isEmpty(a)) return -Infinity;
        var g = {
            computed: -Infinity
        };
        d(a, function(a, b, h) {
            b = c ? c.call(m, a, b, h) : a;
            b >= g.computed && (g = {
                value: a,
                computed: b
            })
        });
        return g.value
    };
    b.min = function(a, c, m) {
        if (!c && b.isArray(a)) return Math.min.apply(Math, a);
        if (!c && b.isEmpty(a)) return Infinity;
        var g = {
            computed: Infinity
        };
        d(a, function(a, b, h) {
            b = c ? c.call(m, a, b, h) : a;
            b < g.computed && (g = {
                value: a,
                computed: b
            })
        });
        return g.value
    };
    b.shuffle = function(a) {
        var b = [],
            c;
        d(a, function(a, h) {
            h == 0 ? b[0] = a : (c = Math.floor(Math.random() * (h + 1)), b[h] = b[c], b[c] = a)
        });
        return b
    };
    b.sortBy = function(a,
        c, d) {
        return b.pluck(b.map(a, function(a, b, h) {
            return {
                value: a,
                criteria: c.call(d, a, b, h)
            }
        }).sort(function(a, b) {
            var h = a.criteria,
                c = b.criteria;
            return h < c ? -1 : h > c ? 1 : 0
        }), "value")
    };
    b.groupBy = function(a, b) {
        var c = {};
        d(a, function(a, h) {
            var d = b(a, h);
            (c[d] || (c[d] = [])).push(a)
        });
        return c
    };
    b.sortedIndex = function(a, c, d) {
        d || (d = b.identity);
        for (var g = 0, e = a.length; g < e;) {
            var f = g + e >> 1;
            d(a[f]) < d(c) ? g = f + 1 : e = f
        }
        return g
    };
    b.toArray = function(a) {
        return !a ? [] : a.toArray ? a.toArray() : b.isArray(a) ? l.call(a) : b.isArguments(a) ? l.call(a) :
            b.values(a)
    };
    b.size = function(a) {
        return b.toArray(a).length
    };
    b.first = b.head = function(a, b, c) {
        return b != null && !c ? l.call(a, 0, b) : a[0]
    };
    b.initial = function(a, b, c) {
        return l.call(a, 0, a.length - (b == null || c ? 1 : b))
    };
    b.last = function(a, b, c) {
        return b != null && !c ? l.call(a, a.length - b) : a[a.length - 1]
    };
    b.rest = b.tail = function(a, b, c) {
        return l.call(a, b == null || c ? 1 : b)
    };
    b.compact = function(a) {
        return b.filter(a, function(a) {
            return !!a
        })
    };
    b.flatten = function(a) {
        return b.reduce(a, function(a, c) {
            if (b.isArray(c)) return a.concat(b.flatten(c));
            a[a.length] = c;
            return a
        }, [])
    };
    b.without = function(a) {
        return b.difference(a, l.call(arguments, 1))
    };
    b.uniq = b.unique = function(a, c, d) {
        var d = d ? b.map(a, d) : a,
            g = [];
        b.reduce(d, function(d, m, e) {
            if (0 == e || (c === true ? b.last(d) != m : !b.include(d, m))) d[d.length] = m, g[g.length] = a[e];
            return d
        }, []);
        return g
    };
    b.union = function() {
        return b.uniq(b.flatten(arguments))
    };
    b.intersection = b.intersect = function(a) {
        var c = l.call(arguments, 1);
        return b.filter(b.uniq(a), function(a) {
            return b.every(c, function(c) {
                return b.indexOf(c, a) >= 0
            })
        })
    };
    b.difference = function(a, c) {
        return b.filter(a, function(a) {
            return !b.include(c, a)
        })
    };
    b.zip = function() {
        for (var a = l.call(arguments), c = b.max(b.pluck(a, "length")), d = Array(c), g = 0; g < c; g++) d[g] = b.pluck(a, "" + g);
        return d
    };
    b.indexOf = function(a, c, d) {
        if (a == null) return -1;
        var g;
        if (d) return d = b.sortedIndex(a, c), a[d] === c ? d : -1;
        if (q && a.indexOf === q) return a.indexOf(c);
        for (d = 0, g = a.length; d < g; d++)
            if (a[d] === c) return d;
        return -1
    };
    b.lastIndexOf = function(a, b) {
        if (a == null) return -1;
        if (r && a.lastIndexOf === r) return a.lastIndexOf(b);
        for (var c = a.length; c--;)
            if (a[c] === b) return c;
        return -1
    };
    b.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0);
        for (var c = arguments[2] || 1, d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = Array(d); e < d;) f[e++] = a, a += c;
        return f
    };
    b.bind = function(a, b) {
        if (a.bind === c && c) return c.apply(a, l.call(arguments, 1));
        var d = l.call(arguments, 2);
        return function() {
            return a.apply(b, d.concat(l.call(arguments)))
        }
    };
    b.bindAll = function(a) {
        var c = l.call(arguments, 1);
        c.length == 0 && (c = b.functions(a));
        d(c, function(c) {
            a[c] = b.bind(a[c], a)
        });
        return a
    };
    b.memoize = function(a, c) {
        var d = {};
        c || (c = b.identity);
        return function() {
            var b = c.apply(this, arguments);
            return o.call(d, b) ? d[b] : d[b] = a.apply(this, arguments)
        }
    };
    b.delay = function(a, b) {
        var c = l.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(a, c)
        }, b)
    };
    b.defer = function(a) {
        return b.delay.apply(b, [a, 1].concat(l.call(arguments, 1)))
    };
    var E = function(a, b, c) {
        var d;
        return function() {
            var e = this,
                f = arguments,
                i = function() {
                    d = null;
                    a.apply(e, f)
                };
            c && clearTimeout(d);
            if (c || !d) d = setTimeout(i, b)
        }
    };
    b.throttle =
        function(a, b) {
            return E(a, b, false)
        };
    b.debounce = function(a, b) {
        return E(a, b, true)
    };
    b.once = function(a) {
        var b = false,
            c;
        return function() {
            if (b) return c;
            b = true;
            return c = a.apply(this, arguments)
        }
    };
    b.wrap = function(a, b) {
        return function() {
            var c = [a].concat(l.call(arguments));
            return b.apply(this, c)
        }
    };
    b.compose = function() {
        var a = l.call(arguments);
        return function() {
            for (var b = l.call(arguments), c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
            return b[0]
        }
    };
    b.after = function(a, b) {
        return function() {
            if (--a < 1) return b.apply(this,
                arguments)
        }
    };
    b.keys = a || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [],
            c;
        for (c in a) o.call(a, c) && (b[b.length] = c);
        return b
    };
    b.values = function(a) {
        return b.map(a, b.identity)
    };
    b.functions = b.methods = function(a) {
        var c = [],
            d;
        for (d in a) b.isFunction(a[d]) && c.push(d);
        return c.sort()
    };
    b.extend = function(a) {
        d(l.call(arguments, 1), function(b) {
            for (var c in b) b[c] !== void 0 && (a[c] = b[c])
        });
        return a
    };
    b.defaults = function(a) {
        d(l.call(arguments, 1), function(b) {
            for (var c in b) a[c] == null && (a[c] =
                b[c])
        });
        return a
    };
    b.clone = function(a) {
        return b.isArray(a) ? a.slice() : b.extend({}, a)
    };
    b.tap = function(a, b) {
        b(a);
        return a
    };
    b.isEqual = function(a, b) {
        return e(a, b, [])
    };
    b.isEmpty = function(a) {
        if (b.isArray(a) || b.isString(a)) return a.length === 0;
        for (var c in a)
            if (o.call(a, c)) return false;
        return true
    };
    b.isElement = function(a) {
        return !!(a && a.nodeType == 1)
    };
    b.isArray = p || function(a) {
        return t.call(a) === "[object Array]"
    };
    b.isObject = function(a) {
        return a === Object(a)
    };
    b.isArguments = function(a) {
        return !(!a || !o.call(a, "callee"))
    };
    b.isFunction = function(a) {
        return !(!a || !a.constructor || !a.call || !a.apply)
    };
    b.isString = function(a) {
        return !!(a === "" || a && a.charCodeAt && a.substr)
    };
    b.isNumber = function(a) {
        return !!(a === 0 || a && a.toExponential && a.toFixed)
    };
    b.isNaN = function(a) {
        return a !== a
    };
    b.isBoolean = function(a) {
        return a === true || a === false || t.call(a) == "[object Boolean]"
    };
    b.isDate = function(a) {
        return !(!a || !a.getTimezoneOffset || !a.setUTCFullYear)
    };
    b.isRegExp = function(a) {
        return !(!a || !a.test || !a.exec || !(a.ignoreCase || a.ignoreCase === false))
    };
    b.isNull =
        function(a) {
            return a === null
        };
    b.isUndefined = function(a) {
        return a === void 0
    };
    b.noConflict = function() {
        j._ = f;
        return this
    };
    b.identity = function(a) {
        return a
    };
    b.times = function(a, b, c) {
        for (var d = 0; d < a; d++) b.call(c, d)
    };
    b.escape = function(a) {
        return ("" + a).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    b.mixin = function(a) {
        d(b.functions(a), function(c) {
            F(c, b[c] = a[c])
        })
    };
    var G = 0;
    b.uniqueId = function(a) {
        var b =
            G++;
        return a ? a + b : b
    };
    b.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    b.template = function(a, c) {
        var d = b.templateSettings,
            d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(d.escape, function(a, b) {
                return "',_.escape(" + b.replace(/\\'/g, "'") + "),'"
            }).replace(d.interpolate, function(a, b) {
                return "'," + b.replace(/\\'/g, "'") + ",'"
            }).replace(d.evaluate || null, function(a,
                b) {
                return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            d = new Function("obj", d);
        return c ? d(c) : d
    };
    var s = function(a) {
        this._wrapped = a
    };
    b.prototype = s.prototype;
    var C = function(a, c) {
            return c ? b(a).chain() : a
        },
        F = function(a, c) {
            s.prototype[a] = function() {
                var a = l.call(arguments);
                B.call(a, this._wrapped);
                return C(c.apply(b, a), this._chain)
            }
        };
    b.mixin(b);
    d("pop,push,reverse,shift,sort,splice,unshift".split(","),
        function(a) {
            var b = k[a];
            s.prototype[a] = function() {
                b.apply(this._wrapped, arguments);
                return C(this._wrapped, this._chain)
            }
        });
    d(["concat", "join", "slice"], function(a) {
        var b = k[a];
        s.prototype[a] = function() {
            return C(b.apply(this._wrapped, arguments), this._chain)
        }
    });
    s.prototype.chain = function() {
        this._chain = true;
        return this
    };
    s.prototype.value = function() {
        return this._wrapped
    }
})();
(function() {
    var e = this,
        j = e.Backbone,
        f;
    f = typeof exports !== "undefined" ? exports : e.Backbone = {};
    f.VERSION = "0.5.3";
    var i = e._;
    if (!i && typeof require !== "undefined") i = require("underscore")._;
    var k = e.jQuery || e.Zepto;
    f.noConflict = function() {
        e.Backbone = j;
        return this
    };
    f.emulateHTTP = false;
    f.emulateJSON = false;
    f.Events = {
        bind: function(a, c, b) {
            var d = this._callbacks || (this._callbacks = {});
            (d[a] || (d[a] = [])).push([c, b]);
            return this
        },
        unbind: function(a, c) {
            var b;
            if (a) {
                if (b = this._callbacks)
                    if (c) {
                        b = b[a];
                        if (!b) return this;
                        for (var d =
                                0, e = b.length; d < e; d++)
                            if (b[d] && c === b[d][0]) {
                                b[d] = null;
                                break
                            }
                    } else b[a] = []
            } else this._callbacks = {};
            return this
        },
        trigger: function(a) {
            var c, b, d, e, f = 2;
            if (!(b = this._callbacks)) return this;
            for (; f--;)
                if (c = f ? a : "all", c = b[c])
                    for (var i = 0, j = c.length; i < j; i++)(d = c[i]) ? (e = f ? Array.prototype.slice.call(arguments, 1) : arguments, d[0].apply(d[1] || this, e)) : (c.splice(i, 1), i--, j--);
            return this
        }
    };
    f.Model = function(a, c) {
        var b;
        a || (a = {});
        if (b = this.defaults) i.isFunction(b) && (b = b.call(this)), a = i.extend({}, b, a);
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = i.uniqueId("c");
        this.set(a, {
            silent: true
        });
        this._changed = false;
        this._previousAttributes = i.clone(this.attributes);
        if (c && c.collection) this.collection = c.collection;
        this.initialize(a, c)
    };
    i.extend(f.Model.prototype, f.Events, {
        _previousAttributes: null,
        _changed: false,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return i.clone(this.attributes)
        },
        get: function(a) {
            return this.attributes[a]
        },
        escape: function(a) {
            var c;
            if (c = this._escapedAttributes[a]) return c;
            c = this.attributes[a];
            return this._escapedAttributes[a] = (c == null ? "" : "" + c).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
        },
        has: function(a) {
            return this.attributes[a] != null
        },
        set: function(a, c) {
            c || (c = {});
            if (!a) return this;
            if (a.attributes) a = a.attributes;
            var b = this.attributes,
                d = this._escapedAttributes;
            if (!c.silent && this.validate && !this._performValidation(a, c)) return false;
            if (this.idAttribute in a) this.id = a[this.idAttribute];
            var e = this._changing;
            this._changing = true;
            for (var f in a) {
                var j = a[f];
                if (!i.isEqual(b[f], j)) b[f] = j, delete d[f], this._changed = true, c.silent || this.trigger("change:" + f, this, j, c)
            }!e && !c.silent && this._changed && this.change(c);
            this._changing = false;
            return this
        },
        unset: function(a, c) {
            if (!(a in this.attributes)) return this;
            c || (c = {});
            var b = {};
            b[a] = void 0;
            if (!c.silent && this.validate && !this._performValidation(b, c)) return false;
            delete this.attributes[a];
            delete this._escapedAttributes[a];
            a == this.idAttribute && delete this.id;
            this._changed = true;
            c.silent || (this.trigger("change:" + a, this, void 0, c), this.change(c));
            return this
        },
        clear: function(a) {
            a || (a = {});
            var c, b = this.attributes,
                d = {};
            for (c in b) d[c] = void 0;
            if (!a.silent && this.validate && !this._performValidation(d, a)) return false;
            this.attributes = {};
            this._escapedAttributes = {};
            this._changed = true;
            if (!a.silent) {
                for (c in b) this.trigger("change:" + c, this, void 0, a);
                this.change(a)
            }
            return this
        },
        fetch: function(a) {
            a || (a = {});
            var c = this,
                b = a.success;
            a.success = function(d, e, f) {
                if (!c.set(c.parse(d,
                        f), a)) return false;
                b && b(c, d)
            };
            a.error = r(a.error, c, a);
            return (this.sync || f.sync).call(this, "read", this, a)
        },
        save: function(a, c) {
            c || (c = {});
            if (a && !this.set(a, c)) return false;
            var b = this,
                d = c.success;
            c.success = function(a, e, f) {
                if (!b.set(b.parse(a, f), c)) return false;
                d && d(b, a, f)
            };
            c.error = r(c.error, b, c);
            var e = this.isNew() ? "create" : "update";
            return (this.sync || f.sync).call(this, e, this, c)
        },
        destroy: function(a) {
            a || (a = {});
            if (this.isNew()) return this.trigger("destroy", this, this.collection, a);
            var c = this,
                b = a.success;
            a.success =
                function(d) {
                    c.trigger("destroy", c, c.collection, a);
                    b && b(c, d)
                };
            a.error = r(a.error, c, a);
            return (this.sync || f.sync).call(this, "delete", this, a)
        },
        url: function() {
            var a = x(this.collection) || this.urlRoot || q();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(a) {
            return a
        },
        clone: function() {
            return new this.constructor(this)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(a) {
            this.trigger("change", this, a);
            this._previousAttributes = i.clone(this.attributes);
            this._changed = false
        },
        hasChanged: function(a) {
            return a ? this._previousAttributes[a] != this.attributes[a] : this._changed
        },
        changedAttributes: function(a) {
            a || (a = this.attributes);
            var c = this._previousAttributes,
                b = false,
                d;
            for (d in a) i.isEqual(c[d], a[d]) || (b = b || {}, b[d] = a[d]);
            return b
        },
        previous: function(a) {
            return !a || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function() {
            return i.clone(this._previousAttributes)
        },
        _performValidation: function(a, c) {
            var b = this.validate(a);
            return b ?
                (c.error ? c.error(this, b, c) : this.trigger("error", this, b, c), false) : true
        }
    });
    f.Collection = function(a, c) {
        c || (c = {});
        if (c.comparator) this.comparator = c.comparator;
        i.bindAll(this, "_onModelEvent", "_removeReference");
        this._reset();
        a && this.reset(a, {
            silent: true
        });
        this.initialize.apply(this, arguments)
    };
    i.extend(f.Collection.prototype, f.Events, {
        model: f.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(a) {
                return a.toJSON()
            })
        },
        add: function(a, c) {
            if (i.isArray(a))
                for (var b = 0, d = a.length; b < d; b++) this._add(a[b],
                    c);
            else this._add(a, c);
            return this
        },
        remove: function(a, c) {
            if (i.isArray(a))
                for (var b = 0, d = a.length; b < d; b++) this._remove(a[b], c);
            else this._remove(a, c);
            return this
        },
        get: function(a) {
            return a == null ? null : this._byId[a.id != null ? a.id : a]
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a]
        },
        at: function(a) {
            return this.models[a]
        },
        sort: function(a) {
            a || (a = {});
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            this.models = this.sortBy(this.comparator);
            a.silent || this.trigger("reset", this, a);
            return this
        },
        pluck: function(a) {
            return i.map(this.models, function(c) {
                return c.get(a)
            })
        },
        reset: function(a, c) {
            a || (a = []);
            c || (c = {});
            this.each(this._removeReference);
            this._reset();
            this.add(a, {
                silent: true
            });
            c.silent || this.trigger("reset", this, c);
            return this
        },
        fetch: function(a) {
            a || (a = {});
            var c = this,
                b = a.success;
            a.success = function(d, e, f) {
                c[a.add ? "add" : "reset"](c.parse(d, f), a);
                b && b(c, d)
            };
            a.error = r(a.error, c, a);
            return (this.sync || f.sync).call(this, "read", this, a)
        },
        create: function(a, c) {
            var b = this;
            c || (c = {});
            a = this._prepareModel(a,
                c);
            if (!a) return false;
            var d = c.success;
            c.success = function(a, e, f) {
                b.add(a, c);
                d && d(a, e, f)
            };
            a.save(null, c);
            return a
        },
        parse: function(a) {
            return a
        },
        chain: function() {
            return i(this.models).chain()
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(a, c) {
            if (a instanceof f.Model) {
                if (!a.collection) a.collection = this
            } else {
                var b = a,
                    a = new this.model(b, {
                        collection: this
                    });
                a.validate && !a._performValidation(b, c) && (a = false)
            }
            return a
        },
        _add: function(a, c) {
            c || (c = {});
            a = this._prepareModel(a,
                c);
            if (!a) return false;
            var b = this.getByCid(a);
            if (b) throw Error(["Can't add the same model to a set twice", b.id]);
            this._byId[a.id] = a;
            this._byCid[a.cid] = a;
            this.models.splice(c.at != null ? c.at : this.comparator ? this.sortedIndex(a, this.comparator) : this.length, 0, a);
            a.bind("all", this._onModelEvent);
            this.length++;
            c.silent || a.trigger("add", a, this, c);
            return a
        },
        _remove: function(a, c) {
            c || (c = {});
            a = this.getByCid(a) || this.get(a);
            if (!a) return null;
            delete this._byId[a.id];
            delete this._byCid[a.cid];
            this.models.splice(this.indexOf(a),
                1);
            this.length--;
            c.silent || a.trigger("remove", a, this, c);
            this._removeReference(a);
            return a
        },
        _removeReference: function(a) {
            this == a.collection && delete a.collection;
            a.unbind("all", this._onModelEvent)
        },
        _onModelEvent: function(a, c, b, d) {
            (a == "add" || a == "remove") && b != this || (a == "destroy" && this._remove(c, d), c && a === "change:" + c.idAttribute && (delete this._byId[c.previous(c.idAttribute)], this._byId[c.id] = c), this.trigger.apply(this, arguments))
        }
    });
    i.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,rest,last,without,indexOf,lastIndexOf,isEmpty,groupBy".split(","),
        function(a) {
            f.Collection.prototype[a] = function() {
                return i[a].apply(i, [this.models].concat(i.toArray(arguments)))
            }
        });
    f.Router = function(a) {
        a || (a = {});
        if (a.routes) this.routes = a.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var p = /:([\w\d]+)/g,
        l = /\*([\w\d]+)/g,
        B = /[-[\]{}()+?.,\\^$|#\s]/g;
    i.extend(f.Router.prototype, f.Events, {
        initialize: function() {},
        route: function(a, c, b) {
            f.history || (f.history = new f.History);
            i.isRegExp(a) || (a = this._routeToRegExp(a));
            f.history.route(a, i.bind(function(d) {
                d =
                    this._extractParameters(a, d);
                b.apply(this, d);
                this.trigger.apply(this, ["route:" + c].concat(d))
            }, this))
        },
        navigate: function(a, c) {
            f.history.navigate(a, c)
        },
        _bindRoutes: function() {
            if (this.routes) {
                var a = [],
                    c;
                for (c in this.routes) a.unshift([c, this.routes[c]]);
                c = 0;
                for (var b = a.length; c < b; c++) this.route(a[c][0], a[c][1], this[a[c][1]])
            }
        },
        _routeToRegExp: function(a) {
            a = a.replace(B, "\\$&").replace(p, "([^/]*)").replace(l, "(.*?)");
            return RegExp("^" + a + "$")
        },
        _extractParameters: function(a, c) {
            return a.exec(c).slice(1)
        }
    });
    f.History = function() {
        this.handlers = [];
        i.bindAll(this, "checkUrl")
    };
    var t = /^#*/,
        o = /msie [\w.]+/,
        u = false;
    i.extend(f.History.prototype, {
        interval: 50,
        getFragment: function(a, c) {
            if (a == null)
                if (this._hasPushState || c) {
                    var a = window.location.pathname,
                        b = window.location.search;
                    b && (a += b);
                    a.indexOf(this.options.root) == 0 && (a = a.substr(this.options.root.length))
                } else a = window.location.hash;
            return decodeURIComponent(a.replace(t, ""))
        },
        start: function(a) {
            if (u) throw Error("Backbone.history has already been started");
            this.options =
                i.extend({}, {
                    root: "/"
                }, this.options, a);
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
            var a = this.getFragment(),
                c = document.documentMode;
            if (c = o.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7)) this.iframe = k('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
            this._hasPushState ? k(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !c ? k(window).bind("hashchange",
                this.checkUrl) : setInterval(this.checkUrl, this.interval);
            this.fragment = a;
            u = true;
            a = window.location;
            c = a.pathname == this.options.root;
            if (this._wantsPushState && !this._hasPushState && !c) return this.fragment = this.getFragment(null, true), window.location.replace(this.options.root + "#" + this.fragment), true;
            else if (this._wantsPushState && this._hasPushState && c && a.hash) this.fragment = a.hash.replace(t, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment);
            if (!this.options.silent) return this.loadUrl()
        },
        route: function(a, c) {
            this.handlers.unshift({
                route: a,
                callback: c
            })
        },
        checkUrl: function() {
            var a = this.getFragment();
            a == this.fragment && this.iframe && (a = this.getFragment(this.iframe.location.hash));
            if (a == this.fragment || a == decodeURIComponent(this.fragment)) return false;
            this.iframe && this.navigate(a);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(a) {
            var c = this.fragment = this.getFragment(a);
            return i.any(this.handlers, function(a) {
                if (a.route.test(c)) return a.callback(c), true
            })
        },
        navigate: function(a,
            c) {
            var b = (a || "").replace(t, "");
            if (!(this.fragment == b || this.fragment == decodeURIComponent(b))) {
                if (this._hasPushState) {
                    var d = window.location;
                    b.indexOf(this.options.root) != 0 && (b = this.options.root + b);
                    this.fragment = b;
                    window.history.pushState({}, document.title, d.protocol + "//" + d.host + b)
                } else if (window.location.hash = this.fragment = b, this.iframe && b != this.getFragment(this.iframe.location.hash)) this.iframe.document.open().close(), this.iframe.location.hash = b;
                c && this.loadUrl(a)
            }
        }
    });
    f.View = function(a) {
        this.cid = i.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.delegateEvents();
        this.initialize.apply(this, arguments)
    };
    var y = /^(\S+)\s*(.*)$/,
        v = "model,collection,el,id,attributes,className,tagName".split(",");
    i.extend(f.View.prototype, f.Events, {
        tagName: "div",
        $: function(a) {
            return k(a, this.el)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            k(this.el).remove();
            return this
        },
        make: function(a, c, b) {
            a = document.createElement(a);
            c && k(a).attr(c);
            b && k(a).html(b);
            return a
        },
        delegateEvents: function(a) {
            if (a ||
                (a = this.events)) {
                i.isFunction(a) && (a = a.call(this));
                k(this.el).unbind(".delegateEvents" + this.cid);
                for (var c in a) {
                    var b = this[a[c]];
                    if (!b) throw Error('Event "' + a[c] + '" does not exist');
                    var d = c.match(y),
                        e = d[1],
                        d = d[2],
                        b = i.bind(b, this);
                    e += ".delegateEvents" + this.cid;
                    d === "" ? k(this.el).bind(e, b) : k(this.el).delegate(d, e, b)
                }
            }
        },
        _configure: function(a) {
            this.options && (a = i.extend({}, this.options, a));
            for (var c = 0, b = v.length; c < b; c++) {
                var d = v[c];
                a[d] && (this[d] = a[d])
            }
            this.options = a
        },
        _ensureElement: function() {
            if (this.el) {
                if (i.isString(this.el)) this.el =
                    k(this.el).get(0)
            } else {
                var a = this.attributes || {};
                if (this.id) a.id = this.id;
                if (this.className) a["class"] = this.className;
                this.el = this.make(this.tagName, a)
            }
        }
    });
    f.Model.extend = f.Collection.extend = f.Router.extend = f.View.extend = function(a, c) {
        var b = A(this, a, c);
        b.extend = this.extend;
        return b
    };
    var z = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    f.sync = function(a, c, b) {
        var d = z[a],
            b = i.extend({
                type: d,
                dataType: "json"
            }, b);
        if (!b.url) b.url = x(c) || q();
        if (!b.data && c && (a == "create" || a == "update")) b.contentType =
            "application/json", b.data = JSON.stringify(c.toJSON());
        if (f.emulateJSON) b.contentType = "application/x-www-form-urlencoded", b.data = b.data ? {
            model: b.data
        } : {};
        if (f.emulateHTTP && (d === "PUT" || d === "DELETE")) {
            if (f.emulateJSON) b.data._method = d;
            b.type = "POST";
            b.beforeSend = function(a) {
                a.setRequestHeader("X-HTTP-Method-Override", d)
            }
        }
        if (b.type !== "GET" && !f.emulateJSON) b.processData = false;
        return k.ajax(b)
    };
    var w = function() {},
        A = function(a, c, b) {
            var d;
            d = c && c.hasOwnProperty("constructor") ? c.constructor : function() {
                return a.apply(this,
                    arguments)
            };
            i.extend(d, a);
            w.prototype = a.prototype;
            d.prototype = new w;
            c && i.extend(d.prototype, c);
            b && i.extend(d, b);
            d.prototype.constructor = d;
            d.__super__ = a.prototype;
            return d
        },
        x = function(a) {
            return !a || !a.url ? null : i.isFunction(a.url) ? a.url() : a.url
        },
        q = function() {
            throw Error('A "url" property or function must be specified');
        },
        r = function(a, c, b) {
            return function(d) {
                a ? a(c, d, b) : c.trigger("error", c, d, b)
            }
        }
}).call(this);

function S4() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
}

function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}
var Store = function(e) {
    this.name = e;
    this.data = (e = localStorage.getItem(this.name)) && JSON.parse(e) || {}
};
_.extend(Store.prototype, {
    save: function() {
        localStorage.setItem(this.name, JSON.stringify(this.data))
    },
    create: function(e) {
        if (!e.id) e.id = e.attributes.id = guid();
        this.data[e.id] = e;
        this.save();
        return e
    },
    update: function(e) {
        this.data[e.id] = e;
        this.save();
        return e
    },
    find: function(e) {
        return this.data[e.id]
    },
    findAll: function() {
        return _.values(this.data)
    },
    destroy: function(e) {
        delete this.data[e.id];
        this.save();
        return e
    }
});
Backbone.sync = function(e, j, f) {
    var i, k = j.localStorage || j.collection.localStorage;
    switch (e) {
        case "read":
            i = j.id ? k.find(j) : k.findAll();
            break;
        case "create":
            i = k.create(j);
            break;
        case "update":
            i = k.update(j);
            break;
        case "delete":
            i = k.destroy(j)
    }
    i ? f.success(i) : f.error("Record not found")
};
