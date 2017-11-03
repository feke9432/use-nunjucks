const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoecape = opts.autoecape = undefined ? true: opts.autoecape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader('views', {
            noCache: noCache,
            watch: watch
        }), {
            autoescape: autoecape,
            throwOnUndeFined: throwOnUndefined
        }
    )
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views' ,{
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    fruits: [1,2]
});

// console.log(s);

console.log(env.render('extend.html', {
    header: '头',
    body: 'bla收到 bla bla...'
}));