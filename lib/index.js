var AssetsManager, fs, path, glob;

fs = require('fs-extra');
path = require("path");
glob = require("glob");

module.exports = AssetsManager = (function() {
    AssetsManager.prototype.brunchPlugin = true;

    AssetsManager.prototype.params = {
        copyTo: {},
        paths: {}
    }

    var extend = function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for(var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    function AssetsManager(config) {
        this.config = config;
        var _ref, _ref1;
        this.files = ((_ref = config.plugins) != null ? (_ref1 = _ref.assets_manager) != null ? _ref1.files : void 0 : void 0) || 'templates';
        this.base = ((_ref = config.plugins) != null ? (_ref1 = _ref.assets_manager) != null ? _ref1.base : void 0 : void 0) || '';
    }

    AssetsManager.prototype.onCompile = function(generatedFiles) {
        this.copy();
    };

    var copyFile = function copyFile(source, target, cb) {
        fs.copy(source, target, function(err) {
            if(err) {
                console.log('\u001b[31m' + err + '\u001b[0m');
            }
        });
    }

    AssetsManager.prototype.copy = function() {
        var params = this.config;
        var dest = path.join(params.paths.root, params.paths.public);
        fs.mkdirsSync(dest);
        for(var i = 0, ilen = this.files.length; i < ilen; i++) {
            var f = path.join(params.paths.root, this.files[i]);
            (function (eachDest) {
                glob(f, {}, function(err, files) {
                    if(err) {
                        console.log('\u001b[31m' + err + '\u001b[0m');
                    } else {
                        for(var j = 0, jlen = files.length; j < jlen; j++) {
                            var targetDir = path.join(eachDest, path.dirname(files[j]).replace("app/scripts/",""));
                            var target = path.join(targetDir, path.basename(files[j]));
                            fs.mkdirsSync(targetDir);
                            copyFile(files[j], target);
                        }
                    }
                });
            })(dest);
        }
    }
    return AssetsManager;
})();