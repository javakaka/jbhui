var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !! (typeof window !== "undefined" && typeof navigator !== "undefined" && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]",
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
            return ostring.call(it) === "[object Function]"
        }
    function isArray(it) {
            return ostring.call(it) === "[object Array]"
        }
    function each(ary, func) {
            if (ary) {
                var i;
                for (i = 0; i < ary.length; i += 1) {
                    if (ary[i] && func(ary[i], i, ary)) {
                        break
                    }
                }
            }
        }
    function eachReverse(ary, func) {
            if (ary) {
                var i;
                for (i = ary.length - 1; i > -1; i -= 1) {
                    if (ary[i] && func(ary[i], i, ary)) {
                        break
                    }
                }
            }
        }
    function hasProp(obj, prop) {
            return hasOwn.call(obj, prop)
        }
    function getOwn(obj, prop) {
            return hasProp(obj, prop) && obj[prop]
        }
    function eachProp(obj, func) {
            var prop;
            for (prop in obj) {
                if (hasProp(obj, prop)) {
                    if (func(obj[prop], prop)) {
                        break
                    }
                }
            }
        }
    function mixin(target, source, force, deepStringMixin) {
            if (source) {
                eachProp(source, function (value, prop) {
                    if (force || !hasProp(target, prop)) {
                        if (deepStringMixin && typeof value === "object" && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                            if (!target[prop]) {
                                target[prop] = {}
                            }
                            mixin(target[prop], value, force, deepStringMixin)
                        } else {
                            target[prop] = value
                        }
                    }
                })
            }
            return target
        }
    function bind(obj, fn) {
            return function () {
                return fn.apply(obj, arguments)
            }
        }
    function scripts() {
            return document.getElementsByTagName("script")
        }
    function defaultOnError(err) {
            throw err
        }
    function getGlobal(value) {
            if (!value) {
                return value
            }
            var g = global;
            each(value.split("."), function (part) {
                g = g[part]
            });
            return g
        }
    function makeError(id, msg, err, requireModules) {
            var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
            e.requireType = id;
            e.requireModules = requireModules;
            if (err) {
                e.originalError = err
            }
            return e
        }
    if (typeof define !== "undefined") {
            return
        }
    if (typeof requirejs !== "undefined") {
            if (isFunction(requirejs)) {
                return
            }
            cfg = requirejs;
            requirejs = undefined
        }
    if (typeof require !== "undefined" && !isFunction(require)) {
            cfg = require;
            require = undefined
        }
    function newContext(contextName) {
            var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
                registry = {},
                enabledRegistry = {},
                undefEvents = {},
                defQueue = [],
                defined = {},
                urlFetched = {},
                bundlesMap = {},
                requireCounter = 1,
                unnormalizedCounter = 1;

            function trimDots(ary) {
                    var i, part, length = ary.length;
                    for (i = 0; i < length; i++) {
                        part = ary[i];
                        if (part === ".") {
                            ary.splice(i, 1);
                            i -= 1
                        } else {
                            if (part === "..") {
                                if (i === 1 && (ary[2] === ".." || ary[0] === "..")) {
                                    break
                                } else {
                                    if (i > 0) {
                                        ary.splice(i - 1, 2);
                                        i -= 2
                                    }
                                }
                            }
                        }
                    }
                }
            function normalize(name, baseName, applyMap) {
                    var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split("/"),
                        normalizedBaseParts = baseParts,
                        map = config.map,
                        starMap = map && map["*"];
                    if (name && name.charAt(0) === ".") {
                            if (baseName) {
                                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                name = name.split("/");
                                lastIndex = name.length - 1;
                                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "")
                                }
                                name = normalizedBaseParts.concat(name);
                                trimDots(name);
                                name = name.join("/")
                            } else {
                                if (name.indexOf("./") === 0) {
                                    name = name.substring(2)
                                }
                            }
                        }
                    if (applyMap && map && (baseParts || starMap)) {
                            nameParts = name.split("/");
                            outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");
                                if (baseParts) {
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = getOwn(map, baseParts.slice(0, j).join("/"));
                                        if (mapValue) {
                                            mapValue = getOwn(mapValue, nameSegment);
                                            if (mapValue) {
                                                foundMap = mapValue;
                                                foundI = i;
                                                break outerLoop
                                            }
                                        }
                                    }
                                }
                                if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                                    foundStarMap = getOwn(starMap, nameSegment);
                                    starI = i
                                }
                            }
                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI
                            }
                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join("/")
                            }
                        }
                    pkgMain = getOwn(config.pkgs, name);
                    return pkgMain ? pkgMain : name
                }
            function removeScript(name) {
                    if (isBrowser) {
                        each(scripts(), function (scriptNode) {
                            if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) {
                                scriptNode.parentNode.removeChild(scriptNode);
                                return true
                            }
                        })
                    }
                }
            function hasPathFallback(id) {
                    var pathConfig = getOwn(config.paths, id);
                    if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                        pathConfig.shift();
                        context.require.undef(id);
                        context.require([id]);
                        return true
                    }
                }
            function splitPrefix(name) {
                    var prefix, index = name ? name.indexOf("!") : -1;
                    if (index > -1) {
                        prefix = name.substring(0, index);
                        name = name.substring(index + 1, name.length)
                    }
                    return [prefix, name]
                }
            function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
                    var url, pluginModule, suffix, nameParts, prefix = null,
                        parentName = parentModuleMap ? parentModuleMap.name : null,
                        originalName = name,
                        isDefine = true,
                        normalizedName = "";
                    if (!name) {
                            isDefine = false;
                            name = "_@r" + (requireCounter += 1)
                        }
                    nameParts = splitPrefix(name);
                    prefix = nameParts[0];
                    name = nameParts[1];
                    if (prefix) {
                            prefix = normalize(prefix, parentName, applyMap);
                            pluginModule = getOwn(defined, prefix)
                        }
                    if (name) {
                            if (prefix) {
                                if (pluginModule && pluginModule.normalize) {
                                    normalizedName = pluginModule.normalize(name, function (name) {
                                        return normalize(name, parentName, applyMap)
                                    })
                                } else {
                                    normalizedName = normalize(name, parentName, applyMap)
                                }
                            } else {
                                normalizedName = normalize(name, parentName, applyMap);
                                nameParts = splitPrefix(normalizedName);
                                prefix = nameParts[0];
                                normalizedName = nameParts[1];
                                isNormalized = true;
                                url = context.nameToUrl(normalizedName)
                            }
                        }
                    suffix = prefix && !pluginModule && !isNormalized ? "_unnormalized" + (unnormalizedCounter += 1) : "";
                    return {
                            prefix: prefix,
                            name: normalizedName,
                            parentMap: parentModuleMap,
                            unnormalized: !! suffix,
                            url: url,
                            originalName: originalName,
                            isDefine: isDefine,
                            id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
                        }
                }
            function getModule(depMap) {
                    var id = depMap.id,
                        mod = getOwn(registry, id);
                    if (!mod) {
                            mod = registry[id] = new context.Module(depMap)
                        }
                    return mod
                }
            function on(depMap, name, fn) {
                    var id = depMap.id,
                        mod = getOwn(registry, id);
                    if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                            if (name === "defined") {
                                fn(defined[id])
                            }
                        } else {
                            mod = getModule(depMap);
                            if (mod.error && name === "error") {
                                fn(mod.error)
                            } else {
                                mod.on(name, fn)
                            }
                        }
                }
            function onError(err, errback) {
                    var ids = err.requireModules,
                        notified = false;
                    if (errback) {
                            errback(err)
                        } else {
                            each(ids, function (id) {
                                var mod = getOwn(registry, id);
                                if (mod) {
                                    mod.error = err;
                                    if (mod.events.error) {
                                        notified = true;
                                        mod.emit("error", err)
                                    }
                                }
                            });
                            if (!notified) {
                                req.onError(err)
                            }
                        }
                }
            function takeGlobalQueue() {
                    if (globalDefQueue.length) {
                        apsp.apply(defQueue, [defQueue.length, 0].concat(globalDefQueue));
                        globalDefQueue = []
                    }
                }
            handlers = {
                    require: function (mod) {
                        if (mod.require) {
                            return mod.require
                        } else {
                            return (mod.require = context.makeRequire(mod.map))
                        }
                    },
                    exports: function (mod) {
                        mod.usingExports = true;
                        if (mod.map.isDefine) {
                            if (mod.exports) {
                                return (defined[mod.map.id] = mod.exports)
                            } else {
                                return (mod.exports = defined[mod.map.id] = {})
                            }
                        }
                    },
                    module: function (mod) {
                        if (mod.module) {
                            return mod.module
                        } else {
                            return (mod.module = {
                                id: mod.map.id,
                                uri: mod.map.url,
                                config: function () {
                                    return getOwn(config.config, mod.map.id) || {}
                                },
                                exports: mod.exports || (mod.exports = {})
                            })
                        }
                    }
                };

            function cleanRegistry(id) {
                    delete registry[id];
                    delete enabledRegistry[id]
                }
            function breakCycle(mod, traced, processed) {
                    var id = mod.map.id;
                    if (mod.error) {
                        mod.emit("error", mod.error)
                    } else {
                        traced[id] = true;
                        each(mod.depMaps, function (depMap, i) {
                            var depId = depMap.id,
                                dep = getOwn(registry, depId);
                            if (dep && !mod.depMatched[i] && !processed[depId]) {
                                    if (getOwn(traced, depId)) {
                                        mod.defineDep(i, defined[depId]);
                                        mod.check()
                                    } else {
                                        breakCycle(dep, traced, processed)
                                    }
                                }
                        });
                        processed[id] = true
                    }
                }
            function checkLoaded() {
                    var err, usingPathFallback, waitInterval = config.waitSeconds * 1000,
                        expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                        noLoads = [],
                        reqCalls = [],
                        stillLoading = false,
                        needCycleCheck = true;
                    if (inCheckLoaded) {
                            return
                        }
                    inCheckLoaded = true;
                    eachProp(enabledRegistry, function (mod) {
                            var map = mod.map,
                                modId = map.id;
                            if (!mod.enabled) {
                                    return
                                }
                            if (!map.isDefine) {
                                    reqCalls.push(mod)
                                }
                            if (!mod.error) {
                                    if (!mod.inited && expired) {
                                        if (hasPathFallback(modId)) {
                                            usingPathFallback = true;
                                            stillLoading = true
                                        } else {
                                            noLoads.push(modId);
                                            removeScript(modId)
                                        }
                                    } else {
                                        if (!mod.inited && mod.fetched && map.isDefine) {
                                            stillLoading = true;
                                            if (!map.prefix) {
                                                return (needCycleCheck = false)
                                            }
                                        }
                                    }
                                }
                        });
                    if (expired && noLoads.length) {
                            err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads);
                            err.contextName = context.contextName;
                            return onError(err)
                        }
                    if (needCycleCheck) {
                            each(reqCalls, function (mod) {
                                breakCycle(mod, {}, {})
                            })
                        }
                    if ((!expired || usingPathFallback) && stillLoading) {
                            if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                                checkLoadedTimeoutId = setTimeout(function () {
                                    checkLoadedTimeoutId = 0;
                                    checkLoaded()
                                }, 50)
                            }
                        }
                    inCheckLoaded = false
                }
            Module = function (map) {
                    this.events = getOwn(undefEvents, map.id) || {};
                    this.map = map;
                    this.shim = getOwn(config.shim, map.id);
                    this.depExports = [];
                    this.depMaps = [];
                    this.depMatched = [];
                    this.pluginMaps = {};
                    this.depCount = 0
                };
            Module.prototype = {
                    init: function (depMaps, factory, errback, options) {
                        options = options || {};
                        if (this.inited) {
                            return
                        }
                        this.factory = factory;
                        if (errback) {
                            this.on("error", errback)
                        } else {
                            if (this.events.error) {
                                errback = bind(this, function (err) {
                                    this.emit("error", err)
                                })
                            }
                        }
                        this.depMaps = depMaps && depMaps.slice(0);
                        this.errback = errback;
                        this.inited = true;
                        this.ignore = options.ignore;
                        if (options.enabled || this.enabled) {
                            this.enable()
                        } else {
                            this.check()
                        }
                    },
                    defineDep: function (i, depExports) {
                        if (!this.depMatched[i]) {
                            this.depMatched[i] = true;
                            this.depCount -= 1;
                            this.depExports[i] = depExports
                        }
                    },
                    fetch: function () {
                        if (this.fetched) {
                            return
                        }
                        this.fetched = true;
                        context.startTime = (new Date()).getTime();
                        var map = this.map;
                        if (this.shim) {
                            context.makeRequire(this.map, {
                                enableBuildCallback: true
                            })(this.shim.deps || [], bind(this, function () {
                                return map.prefix ? this.callPlugin() : this.load()
                            }))
                        } else {
                            return map.prefix ? this.callPlugin() : this.load()
                        }
                    },
                    load: function () {
                        var url = this.map.url;
                        if (!urlFetched[url]) {
                            urlFetched[url] = true;
                            context.load(this.map.id, url)
                        }
                    },
                    check: function () {
                        if (!this.enabled || this.enabling) {
                            return
                        }
                        var err, cjsModule, id = this.map.id,
                            depExports = this.depExports,
                            exports = this.exports,
                            factory = this.factory;
                        if (!this.inited) {
                                this.fetch()
                            } else {
                                if (this.error) {
                                    this.emit("error", this.error)
                                } else {
                                    if (!this.defining) {
                                        this.defining = true;
                                        if (this.depCount < 1 && !this.defined) {
                                            if (isFunction(factory)) {
                                                if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError) {
                                                    try {
                                                        exports = context.execCb(id, factory, depExports, exports)
                                                    } catch (e) {
                                                        err = e
                                                    }
                                                } else {
                                                    exports = context.execCb(id, factory, depExports, exports)
                                                }
                                                if (this.map.isDefine && exports === undefined) {
                                                    cjsModule = this.module;
                                                    if (cjsModule) {
                                                        exports = cjsModule.exports
                                                    } else {
                                                        if (this.usingExports) {
                                                            exports = this.exports
                                                        }
                                                    }
                                                }
                                                if (err) {
                                                    err.requireMap = this.map;
                                                    err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                                    err.requireType = this.map.isDefine ? "define" : "require";
                                                    return onError((this.error = err))
                                                }
                                            } else {
                                                exports = factory
                                            }
                                            this.exports = exports;
                                            if (this.map.isDefine && !this.ignore) {
                                                defined[id] = exports;
                                                if (req.onResourceLoad) {
                                                    req.onResourceLoad(context, this.map, this.depMaps)
                                                }
                                            }
                                            cleanRegistry(id);
                                            this.defined = true
                                        }
                                        this.defining = false;
                                        if (this.defined && !this.defineEmitted) {
                                            this.defineEmitted = true;
                                            this.emit("defined", this.exports);
                                            this.defineEmitComplete = true
                                        }
                                    }
                                }
                            }
                    },
                    callPlugin: function () {
                        var map = this.map,
                            id = map.id,
                            pluginMap = makeModuleMap(map.prefix);
                        this.depMaps.push(pluginMap);
                        on(pluginMap, "defined", bind(this, function (plugin) {
                                var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id),
                                    name = this.map.name,
                                    parentName = this.map.parentMap ? this.map.parentMap.name : null,
                                    localRequire = context.makeRequire(map.parentMap, {
                                        enableBuildCallback: true
                                    });
                                if (this.map.unnormalized) {
                                        if (plugin.normalize) {
                                            name = plugin.normalize(name, function (name) {
                                                return normalize(name, parentName, true)
                                            }) || ""
                                        }
                                        normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                                        on(normalizedMap, "defined", bind(this, function (value) {
                                            this.init([], function () {
                                                return value
                                            }, null, {
                                                enabled: true,
                                                ignore: true
                                            })
                                        }));
                                        normalizedMod = getOwn(registry, normalizedMap.id);
                                        if (normalizedMod) {
                                            this.depMaps.push(normalizedMap);
                                            if (this.events.error) {
                                                normalizedMod.on("error", bind(this, function (err) {
                                                    this.emit("error", err)
                                                }))
                                            }
                                            normalizedMod.enable()
                                        }
                                        return
                                    }
                                if (bundleId) {
                                        this.map.url = context.nameToUrl(bundleId);
                                        this.load();
                                        return
                                    }
                                load = bind(this, function (value) {
                                        this.init([], function () {
                                            return value
                                        }, null, {
                                            enabled: true
                                        })
                                    });
                                load.error = bind(this, function (err) {
                                        this.inited = true;
                                        this.error = err;
                                        err.requireModules = [id];
                                        eachProp(registry, function (mod) {
                                            if (mod.map.id.indexOf(id + "_unnormalized") === 0) {
                                                cleanRegistry(mod.map.id)
                                            }
                                        });
                                        onError(err)
                                    });
                                load.fromText = bind(this, function (text, textAlt) {
                                        var moduleName = map.name,
                                            moduleMap = makeModuleMap(moduleName),
                                            hasInteractive = useInteractive;
                                        if (textAlt) {
                                                text = textAlt
                                            }
                                        if (hasInteractive) {
                                                useInteractive = false
                                            }
                                        getModule(moduleMap);
                                        if (hasProp(config.config, id)) {
                                                config.config[moduleName] = config.config[id]
                                            }
                                        try {
                                                req.exec(text)
                                            } catch (e) {
                                                return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [id]))
                                            }
                                        if (hasInteractive) {
                                                useInteractive = true
                                            }
                                        this.depMaps.push(moduleMap);
                                        context.completeLoad(moduleName);
                                        localRequire([moduleName], load)
                                    });
                                plugin.load(map.name, localRequire, load, config)
                            }));
                        context.enable(pluginMap, this);
                        this.pluginMaps[pluginMap.id] = pluginMap
                    },
                    enable: function () {
                        enabledRegistry[this.map.id] = this;
                        this.enabled = true;
                        this.enabling = true;
                        each(this.depMaps, bind(this, function (depMap, i) {
                            var id, mod, handler;
                            if (typeof depMap === "string") {
                                depMap = makeModuleMap(depMap, (this.map.isDefine ? this.map : this.map.parentMap), false, !this.skipMap);
                                this.depMaps[i] = depMap;
                                handler = getOwn(handlers, depMap.id);
                                if (handler) {
                                    this.depExports[i] = handler(this);
                                    return
                                }
                                this.depCount += 1;
                                on(depMap, "defined", bind(this, function (depExports) {
                                    this.defineDep(i, depExports);
                                    this.check()
                                }));
                                if (this.errback) {
                                    on(depMap, "error", bind(this, this.errback))
                                }
                            }
                            id = depMap.id;
                            mod = registry[id];
                            if (!hasProp(handlers, id) && mod && !mod.enabled) {
                                context.enable(depMap, this)
                            }
                        }));
                        eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                            var mod = getOwn(registry, pluginMap.id);
                            if (mod && !mod.enabled) {
                                context.enable(pluginMap, this)
                            }
                        }));
                        this.enabling = false;
                        this.check()
                    },
                    on: function (name, cb) {
                        var cbs = this.events[name];
                        if (!cbs) {
                            cbs = this.events[name] = []
                        }
                        cbs.push(cb)
                    },
                    emit: function (name, evt) {
                        each(this.events[name], function (cb) {
                            cb(evt)
                        });
                        if (name === "error") {
                            delete this.events[name]
                        }
                    }
                };

            function callGetModule(args) {
                    if (!hasProp(defined, args[0])) {
                        getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2])
                    }
                }
            function removeListener(node, func, name, ieName) {
                    if (node.detachEvent && !isOpera) {
                        if (ieName) {
                            node.detachEvent(ieName, func)
                        }
                    } else {
                        node.removeEventListener(name, func, false)
                    }
                }
            function getScriptData(evt) {
                    var node = evt.currentTarget || evt.srcElement;
                    removeListener(node, context.onScriptLoad, "load", "onreadystatechange");
                    removeListener(node, context.onScriptError, "error");
                    return {
                        node: node,
                        id: node && node.getAttribute("data-requiremodule")
                    }
                }
            function intakeDefines() {
                    var args;
                    takeGlobalQueue();
                    while (defQueue.length) {
                        args = defQueue.shift();
                        if (args[0] === null) {
                            return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]))
                        } else {
                            callGetModule(args)
                        }
                    }
                }
            context = {
                    config: config,
                    contextName: contextName,
                    registry: registry,
                    defined: defined,
                    urlFetched: urlFetched,
                    defQueue: defQueue,
                    Module: Module,
                    makeModuleMap: makeModuleMap,
                    nextTick: req.nextTick,
                    onError: onError,
                    configure: function (cfg) {
                        if (cfg.baseUrl) {
                            if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                                cfg.baseUrl += "/"
                            }
                        }
                        var shim = config.shim,
                            objs = {
                                paths: true,
                                bundles: true,
                                config: true,
                                map: true
                            };
                        eachProp(cfg, function (value, prop) {
                                if (objs[prop]) {
                                    if (!config[prop]) {
                                        config[prop] = {}
                                    }
                                    mixin(config[prop], value, true, true)
                                } else {
                                    config[prop] = value
                                }
                            });
                        if (cfg.bundles) {
                                eachProp(cfg.bundles, function (value, prop) {
                                    each(value, function (v) {
                                        if (v !== prop) {
                                            bundlesMap[v] = prop
                                        }
                                    })
                                })
                            }
                        if (cfg.shim) {
                                eachProp(cfg.shim, function (value, id) {
                                    if (isArray(value)) {
                                        value = {
                                            deps: value
                                        }
                                    }
                                    if ((value.exports || value.init) && !value.exportsFn) {
                                        value.exportsFn = context.makeShimExports(value)
                                    }
                                    shim[id] = value
                                });
                                config.shim = shim
                            }
                        if (cfg.packages) {
                                each(cfg.packages, function (pkgObj) {
                                    var location, name;
                                    pkgObj = typeof pkgObj === "string" ? {
                                        name: pkgObj
                                    } : pkgObj;
                                    name = pkgObj.name;
                                    location = pkgObj.location;
                                    if (location) {
                                        config.paths[name] = pkgObj.location
                                    }
                                    config.pkgs[name] = pkgObj.name + "/" + (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                                })
                            }
                        eachProp(registry, function (mod, id) {
                                if (!mod.inited && !mod.map.unnormalized) {
                                    mod.map = makeModuleMap(id)
                                }
                            });
                        if (cfg.deps || cfg.callback) {
                                context.require(cfg.deps || [], cfg.callback)
                            }
                    },
                    makeShimExports: function (value) {
                        function fn() {
                            var ret;
                            if (value.init) {
                                ret = value.init.apply(global, arguments)
                            }
                            return ret || (value.exports && getGlobal(value.exports))
                        }
                        return fn
                    },
                    makeRequire: function (relMap, options) {
                        options = options || {};

                        function localRequire(deps, callback, errback) {
                            var id, map, requireMod;
                            if (options.enableBuildCallback && callback && isFunction(callback)) {
                                callback.__requireJsBuild = true
                            }
                            if (typeof deps === "string") {
                                if (isFunction(callback)) {
                                    return onError(makeError("requireargs", "Invalid require call"), errback)
                                }
                                if (relMap && hasProp(handlers, deps)) {
                                    return handlers[deps](registry[relMap.id])
                                }
                                if (req.get) {
                                    return req.get(context, deps, relMap, localRequire)
                                }
                                map = makeModuleMap(deps, relMap, false, true);
                                id = map.id;
                                if (!hasProp(defined, id)) {
                                    return onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")))
                                }
                                return defined[id]
                            }
                            intakeDefines();
                            context.nextTick(function () {
                                intakeDefines();
                                requireMod = getModule(makeModuleMap(null, relMap));
                                requireMod.skipMap = options.skipMap;
                                requireMod.init(deps, callback, errback, {
                                    enabled: true
                                });
                                checkLoaded()
                            });
                            return localRequire
                        }
                        mixin(localRequire, {
                            isBrowser: isBrowser,
                            toUrl: function (moduleNamePlusExt) {
                                var ext, index = moduleNamePlusExt.lastIndexOf("."),
                                    segment = moduleNamePlusExt.split("/")[0],
                                    isRelative = segment === "." || segment === "..";
                                if (index !== -1 && (!isRelative || index > 1)) {
                                        ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                                        moduleNamePlusExt = moduleNamePlusExt.substring(0, index)
                                    }
                                return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true)
                            },
                            defined: function (id) {
                                return hasProp(defined, makeModuleMap(id, relMap, false, true).id)
                            },
                            specified: function (id) {
                                id = makeModuleMap(id, relMap, false, true).id;
                                return hasProp(defined, id) || hasProp(registry, id)
                            }
                        });
                        if (!relMap) {
                            localRequire.undef = function (id) {
                                takeGlobalQueue();
                                var map = makeModuleMap(id, relMap, true),
                                    mod = getOwn(registry, id);
                                removeScript(id);
                                delete defined[id];
                                delete urlFetched[map.url];
                                delete undefEvents[id];
                                eachReverse(defQueue, function (args, i) {
                                        if (args[0] === id) {
                                            defQueue.splice(i, 1)
                                        }
                                    });
                                if (mod) {
                                        if (mod.events.defined) {
                                            undefEvents[id] = mod.events
                                        }
                                        cleanRegistry(id)
                                    }
                            }
                        }
                        return localRequire
                    },
                    enable: function (depMap) {
                        var mod = getOwn(registry, depMap.id);
                        if (mod) {
                            getModule(depMap).enable()
                        }
                    },
                    completeLoad: function (moduleName) {
                        var found, args, mod, shim = getOwn(config.shim, moduleName) || {},
                            shExports = shim.exports;
                        takeGlobalQueue();
                        while (defQueue.length) {
                                args = defQueue.shift();
                                if (args[0] === null) {
                                    args[0] = moduleName;
                                    if (found) {
                                        break
                                    }
                                    found = true
                                } else {
                                    if (args[0] === moduleName) {
                                        found = true
                                    }
                                }
                                callGetModule(args)
                            }
                        mod = getOwn(registry, moduleName);
                        if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                                if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                                    if (hasPathFallback(moduleName)) {
                                        return
                                    } else {
                                        return onError(makeError("nodefine", "No define call for " + moduleName, null, [moduleName]))
                                    }
                                } else {
                                    callGetModule([moduleName, (shim.deps || []), shim.exportsFn])
                                }
                            }
                        checkLoaded()
                    },
                    nameToUrl: function (moduleName, ext, skipExt) {
                        var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                        if (pkgMain) {
                            moduleName = pkgMain
                        }
                        bundleId = getOwn(bundlesMap, moduleName);
                        if (bundleId) {
                            return context.nameToUrl(bundleId, ext, skipExt)
                        }
                        if (req.jsExtRegExp.test(moduleName)) {
                            url = moduleName + (ext || "")
                        } else {
                            paths = config.paths;
                            syms = moduleName.split("/");
                            for (i = syms.length; i > 0; i -= 1) {
                                parentModule = syms.slice(0, i).join("/");
                                parentPath = getOwn(paths, parentModule);
                                if (parentPath) {
                                    if (isArray(parentPath)) {
                                        parentPath = parentPath[0]
                                    }
                                    syms.splice(0, i, parentPath);
                                    break
                                }
                            }
                            url = syms.join("/");
                            url += (ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js"));
                            url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url
                        }
                        return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url
                    },
                    load: function (id, url) {
                        req.load(context, id, url)
                    },
                    execCb: function (name, callback, args, exports) {
                        return callback.apply(exports, args)
                    },
                    onScriptLoad: function (evt) {
                        if (evt.type === "load" || (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                            interactiveScript = null;
                            var data = getScriptData(evt);
                            context.completeLoad(data.id)
                        }
                    },
                    onScriptError: function (evt) {
                        var data = getScriptData(evt);
                        if (!hasPathFallback(data.id)) {
                            return onError(makeError("scripterror", "Script error for: " + data.id, evt, [data.id]))
                        }
                    }
                };
            context.require = context.makeRequire();
            return context
        }
    req = requirejs = function (deps, callback, errback, optional) {
            var context, config, contextName = defContextName;
            if (!isArray(deps) && typeof deps !== "string") {
                config = deps;
                if (isArray(callback)) {
                    deps = callback;
                    callback = errback;
                    errback = optional
                } else {
                    deps = []
                }
            }
            if (config && config.context) {
                contextName = config.context
            }
            context = getOwn(contexts, contextName);
            if (!context) {
                context = contexts[contextName] = req.s.newContext(contextName)
            }
            if (config) {
                context.configure(config)
            }
            return context.require(deps, callback, errback)
        };
    req.config = function (config) {
            return req(config)
        };
    req.nextTick = typeof setTimeout !== "undefined" ?
    function (fn) {
            setTimeout(fn, 4)
        } : function (fn) {
            fn()
        };
    if (!require) {
            require = req
        }
    req.version = version;
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
            contexts: contexts,
            newContext: newContext
        };
    req({});
    each(["toUrl", "undef", "defined", "specified"], function (prop) {
            req[prop] = function () {
                var ctx = contexts[defContextName];
                return ctx.require[prop].apply(ctx, arguments)
            }
        });
    if (isBrowser) {
            head = s.head = document.getElementsByTagName("head")[0];
            baseElement = document.getElementsByTagName("base")[0];
            if (baseElement) {
                head = s.head = baseElement.parentNode
            }
        }
    req.onError = defaultOnError;
    req.createNode = function (config, moduleName, url) {
            var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            node.type = config.scriptType || "text/javascript";
            node.charset = "utf-8";
            node.async = true;
            return node
        };
    req.load = function (context, moduleName, url) {
            var config = (context && context.config) || {},
                node;
            if (isBrowser) {
                    node = req.createNode(config, moduleName, url);
                    node.setAttribute("data-requirecontext", context.contextName);
                    node.setAttribute("data-requiremodule", moduleName);
                    if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) {
                        useInteractive = true;
                        node.attachEvent("onreadystatechange", context.onScriptLoad)
                    } else {
                        node.addEventListener("load", context.onScriptLoad, false);
                        node.addEventListener("error", context.onScriptError, false)
                    }
                    node.src = url;
                    currentlyAddingScript = node;
                    if (baseElement) {
                        head.insertBefore(node, baseElement)
                    } else {
                        head.appendChild(node)
                    }
                    currentlyAddingScript = null;
                    return node
                } else {
                    if (isWebWorker) {
                        try {
                            importScripts(url);
                            context.completeLoad(moduleName)
                        } catch (e) {
                            context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [moduleName]))
                        }
                    }
                }
        };

    function getInteractiveScript() {
            if (interactiveScript && interactiveScript.readyState === "interactive") {
                return interactiveScript
            }
            eachReverse(scripts(), function (script) {
                if (script.readyState === "interactive") {
                    return (interactiveScript = script)
                }
            });
            return interactiveScript
        }
    if (isBrowser && !cfg.skipDataMain) {
            eachReverse(scripts(), function (script) {
                if (!head) {
                    head = script.parentNode
                }
                dataMain = script.getAttribute("data-main");
                if (dataMain) {
                    mainScript = dataMain;
                    if (!cfg.baseUrl) {
                        src = mainScript.split("/");
                        mainScript = src.pop();
                        subPath = src.length ? src.join("/") + "/" : "./";
                        cfg.baseUrl = subPath
                    }
                    mainScript = mainScript.replace(jsSuffixRegExp, "");
                    if (req.jsExtRegExp.test(mainScript)) {
                        mainScript = dataMain
                    }
                    cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
                    return true
                }
            })
        }
    define = function (name, deps, callback) {
            var node, context;
            if (typeof name !== "string") {
                callback = deps;
                deps = name;
                name = null
            }
            if (!isArray(deps)) {
                callback = deps;
                deps = null
            }
            if (!deps && isFunction(callback)) {
                deps = [];
                if (callback.length) {
                    callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep)
                    });
                    deps = (callback.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(deps)
                }
            }
            if (useInteractive) {
                node = currentlyAddingScript || getInteractiveScript();
                if (node) {
                    if (!name) {
                        name = node.getAttribute("data-requiremodule")
                    }
                    context = contexts[node.getAttribute("data-requirecontext")]
                }
            }(context ? context.defQueue : globalDefQueue).push([name, deps, callback])
        };
    define.amd = {
            jQuery: true
        };
    req.exec = function (text) {
            return eval(text)
        };
    req(cfg)
}(this));
var Zepto = function () {
    function L(t) {
        return null == t ? String(t) : j[T.call(t)] || "object"
    }
    function Z(t) {
        return "function" == L(t)
    }
    function $(t) {
        return null != t && t == t.window
    }
    function _(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }
    function D(t) {
        return "object" == L(t)
    }
    function R(t) {
        return D(t) && !$(t) && Object.getPrototypeOf(t) == Object.prototype
    }
    function M(t) {
        return "number" == typeof t.length
    }
    function k(t) {
        return s.call(t, function (t) {
            return null != t
        })
    }
    function z(t) {
        return t.length > 0 ? n.fn.concat.apply([], t) : t
    }
    function F(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function q(t) {
        return t in f ? f[t] : f[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }
    function H(t, e) {
        return "number" != typeof e || c[F(t)] ? e : e + "px"
    }
    function I(t) {
        var e, n;
        return u[t] || (e = a.createElement(t), a.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), u[t] = n),
        u[t]
    }
    function V(t) {
        return "children" in t ? o.call(t.children) : n.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }
    function U(n, i, r) {
        for (e in i) {
            r && (R(i[e]) || A(i[e])) ? (R(i[e]) && !R(n[e]) && (n[e] = {}), A(i[e]) && !A(n[e]) && (n[e] = []), U(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e])
        }
    }
    function B(t, e) {
        return null == e ? n(t) : n(t).filter(e)
    }
    function J(t, e, n, i) {
        return Z(e) ? e.call(t, n, i) : e
    }
    function X(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }
    function W(e, n) {
        var i = e.className,
            r = i && i.baseVal !== t;
        return n === t ? r ? i.baseVal : i : void(r ? i.baseVal = n : e.className = n)
    }
    function Y(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? n.parseJSON(t) : t : e) : t
        } catch (i) {
            return t
        }
    }
    function G(t, e) {
        e(t);
        for (var n in t.childNodes) {
            G(t.childNodes[n], e)
        }
    }
    var t, e, n, i, C, N, r = [],
        o = r.slice,
        s = r.filter,
        a = window.document,
        u = {},
        f = {},
        c = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        l = /^\s*<(\w+|!)[^>]*>/,
        h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        d = /^(?:body|html)$/i,
        m = /([A-Z])/g,
        g = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        v = ["after", "prepend", "before", "append"],
        y = a.createElement("table"),
        x = a.createElement("tr"),
        b = {
            tr: a.createElement("tbody"),
            tbody: y,
            thead: y,
            tfoot: y,
            td: x,
            th: x,
            "*": a.createElement("div")
        },
        w = /complete|loaded|interactive/,
        E = /^[\w-]*$/,
        j = {},
        T = j.toString,
        S = {},
        O = a.createElement("div"),
        P = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        A = Array.isArray ||
    function (t) {
            return t instanceof Array
        };
    return S.matches = function (t, e) {
            if (!e || !t || 1 !== t.nodeType) {
                return !1
            }
            var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n) {
                return n.call(t, e)
            }
            var i, r = t.parentNode,
                o = !r;
            return o && (r = O).appendChild(t),
            i = ~S.qsa(r, e).indexOf(t),
            o && O.removeChild(t),
            i
        },
    C = function (t) {
            return t.replace(/-+(.)?/g, function (t, e) {
                return e ? e.toUpperCase() : ""
            })
        },
    N = function (t) {
            return s.call(t, function (e, n) {
                return t.indexOf(e) == n
            })
        },
    S.fragment = function (e, i, r) {
            var s, u, f;
            return h.test(e) && (s = n(a.createElement(RegExp.$1))),
            s || (e.replace && (e = e.replace(p, "<$1></$2>")), i === t && (i = l.test(e) && RegExp.$1), i in b || (i = "*"), f = b[i], f.innerHTML = "" + e, s = n.each(o.call(f.childNodes), function () {
                f.removeChild(this)
            })),
            R(r) && (u = n(s), n.each(r, function (t, e) {
                g.indexOf(t) > -1 ? u[t](e) : u.attr(t, e)
            })),
            s
        },
    S.Z = function (t, e) {
            return t = t || [],
            t.__proto__ = n.fn,
            t.selector = e || "",
            t
        },
    S.isZ = function (t) {
            return t instanceof S.Z
        },
    S.init = function (e, i) {
            var r;
            if (!e) {
                return S.Z()
            }
            if ("string" == typeof e) {
                if (e = e.trim(), "<" == e[0] && l.test(e)) {
                    r = S.fragment(e, RegExp.$1, i),
                    e = null
                } else {
                    if (i !== t) {
                        return n(i).find(e)
                    }
                    r = S.qsa(a, e)
                }
            } else {
                if (Z(e)) {
                    return n(a).ready(e)
                }
                if (S.isZ(e)) {
                    return e
                }
                if (A(e)) {
                    r = k(e)
                } else {
                    if (D(e)) {
                        r = [e],
                        e = null
                    } else {
                        if (l.test(e)) {
                            r = S.fragment(e.trim(), RegExp.$1, i),
                            e = null
                        } else {
                            if (i !== t) {
                                return n(i).find(e)
                            }
                            r = S.qsa(a, e)
                        }
                    }
                }
            }
            return S.Z(r, e)
        },
    n = function (t, e) {
            return S.init(t, e)
        },
    n.extend = function (t) {
            var e, n = o.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = n.shift()),
            n.forEach(function (n) {
                U(t, n, e)
            }),
            t
        },
    S.qsa = function (t, e) {
            var n, i = "#" == e[0],
                r = !i && "." == e[0],
                s = i || r ? e.slice(1) : e,
                a = E.test(s);
            return _(t) && a && i ? (n = t.getElementById(s)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : o.call(a && !i ? r ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        },
    n.contains = function (t, e) {
            return t !== e && t.contains(e)
        },
    n.type = L,
    n.isFunction = Z,
    n.isWindow = $,
    n.isArray = A,
    n.isPlainObject = R,
    n.isEmptyObject = function (t) {
            var e;
            for (e in t) {
                return !1
            }
            return !0
        },
    n.inArray = function (t, e, n) {
            return r.indexOf.call(e, t, n)
        },
    n.camelCase = C,
    n.trim = function (t) {
            return null == t ? "" : String.prototype.trim.call(t)
        },
    n.uuid = 0,
    n.support = {},
    n.expr = {},
    n.map = function (t, e) {
            var n, r, o, i = [];
            if (M(t)) {
                for (r = 0; r < t.length; r++) {
                    n = e(t[r], r),
                    null != n && i.push(n)
                }
            } else {
                for (o in t) {
                    n = e(t[o], o),
                    null != n && i.push(n)
                }
            }
            return z(i)
        },
    n.each = function (t, e) {
            var n, i;
            if (M(t)) {
                for (n = 0; n < t.length; n++) {
                    if (e.call(t[n], n, t[n]) === !1) {
                        return t
                    }
                }
            } else {
                for (i in t) {
                    if (e.call(t[i], i, t[i]) === !1) {
                        return t
                    }
                }
            }
            return t
        },
    n.grep = function (t, e) {
            return s.call(t, e)
        },
    window.JSON && (n.parseJSON = JSON.parse),
    n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
            j["[object " + e + "]"] = e.toLowerCase()
        }),
    n.fn = {
            forEach: r.forEach,
            reduce: r.reduce,
            push: r.push,
            sort: r.sort,
            indexOf: r.indexOf,
            concat: r.concat,
            map: function (t) {
                return n(n.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function () {
                return n(o.apply(this, arguments))
            },
            ready: function (t) {
                return w.test(a.readyState) && a.body ? t(n) : a.addEventListener("DOMContentLoaded", function () {
                    t(n)
                }, !1),
                this
            },
            get: function (e) {
                return e === t ? o.call(this) : this[e >= 0 ? e : e + this.length]
            },
            toArray: function () {
                return this.get()
            },
            size: function () {
                return this.length
            },
            remove: function () {
                return this.each(function () {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function (t) {
                return r.every.call(this, function (e, n) {
                    return t.call(e, n, e) !== !1
                }),
                this
            },
            filter: function (t) {
                return Z(t) ? this.not(this.not(t)) : n(s.call(this, function (e) {
                    return S.matches(e, t)
                }))
            },
            add: function (t, e) {
                return n(N(this.concat(n(t, e))))
            },
            is: function (t) {
                return this.length > 0 && S.matches(this[0], t)
            },
            not: function (e) {
                var i = [];
                if (Z(e) && e.call !== t) {
                    this.each(function (t) {
                        e.call(this, t) || i.push(this)
                    })
                } else {
                    var r = "string" == typeof e ? this.filter(e) : M(e) && Z(e.item) ? o.call(e) : n(e);
                    this.forEach(function (t) {
                        r.indexOf(t) < 0 && i.push(t)
                    })
                }
                return n(i)
            },
            has: function (t) {
                return this.filter(function () {
                    return D(t) ? n.contains(this, t) : n(this).find(t).size()
                })
            },
            eq: function (t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function () {
                var t = this[0];
                return t && !D(t) ? t : n(t)
            },
            last: function () {
                var t = this[this.length - 1];
                return t && !D(t) ? t : n(t)
            },
            find: function (t) {
                var e, i = this;
                return e = "object" == typeof t ? n(t).filter(function () {
                    var t = this;
                    return r.some.call(i, function (e) {
                        return n.contains(e, t)
                    })
                }) : 1 == this.length ? n(S.qsa(this[0], t)) : this.map(function () {
                    return S.qsa(this, t)
                })
            },
            closest: function (t, e) {
                var i = this[0],
                    r = !1;
                for ("object" == typeof t && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : S.matches(i, t));) {
                        i = i !== e && !_(i) && i.parentNode
                    }
                return n(i)
            },
            parents: function (t) {
                for (var e = [], i = this; i.length > 0;) {
                    i = n.map(i, function (t) {
                        return (t = t.parentNode) && !_(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                    })
                }
                return B(e, t)
            },
            parent: function (t) {
                return B(N(this.pluck("parentNode")), t)
            },
            children: function (t) {
                return B(this.map(function () {
                    return V(this)
                }), t)
            },
            contents: function () {
                return this.map(function () {
                    return o.call(this.childNodes)
                })
            },
            siblings: function (t) {
                return B(this.map(function (t, e) {
                    return s.call(V(e.parentNode), function (t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function () {
                return this.each(function () {
                    this.innerHTML = ""
                })
            },
            pluck: function (t) {
                return n.map(this, function (e) {
                    return e[t]
                })
            },
            show: function () {
                return this.each(function () {
                    "none" == this.style.display && (this.style.display = ""),
                    "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = I(this.nodeName))
                })
            },
            replaceWith: function (t) {
                return this.before(t).remove()
            },
            wrap: function (t) {
                var e = Z(t);
                if (this[0] && !e) {
                    var i = n(t).get(0),
                        r = i.parentNode || this.length > 1
                }
                return this.each(function (o) {
                    n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(!0) : i)
                })
            },
            wrapAll: function (t) {
                if (this[0]) {
                    n(this[0]).before(t = n(t));
                    for (var e;
                    (e = t.children()).length;) {
                        t = e.first()
                    }
                    n(t).append(this)
                }
                return this
            },
            wrapInner: function (t) {
                var e = Z(t);
                return this.each(function (i) {
                    var r = n(this),
                        o = r.contents(),
                        s = e ? t.call(this, i) : t;
                    o.length ? o.wrapAll(s) : r.append(s)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    n(this).replaceWith(n(this).children())
                }),
                this
            },
            clone: function () {
                return this.map(function () {
                    return this.cloneNode(!0)
                })
            },
            hide: function () {
                return this.css("display", "none")
            },
            toggle: function (e) {
                return this.each(function () {
                    var i = n(this);
                    (e === t ? "none" == i.css("display") : e) ? i.show() : i.hide()
                })
            },
            prev: function (t) {
                return n(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function (t) {
                return n(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function (t) {
                return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (e) {
                    var i = this.innerHTML;
                    n(this).empty().append(J(this, t, e, i))
                })
            },
            text: function (e) {
                return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
                    this.textContent = e === t ? "" : "" + e
                })
            },
            attr: function (n, i) {
                var r;
                return "string" == typeof n && i === t ? 0 == this.length || 1 !== this[0].nodeType ? t : "value" == n && "INPUT" == this[0].nodeName ? this.val() : !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : this.each(function (t) {
                    if (1 === this.nodeType) {
                        if (D(n)) {
                            for (e in n) {
                                X(this, e, n[e])
                            }
                        } else {
                            X(this, n, J(this, i, t, this.getAttribute(n)))
                        }
                    }
                })
            },
            removeAttr: function (t) {
                return this.each(function () {
                    1 === this.nodeType && X(this, t)
                })
            },
            prop: function (e, n) {
                return e = P[e] || e,
                n === t ? this[0] && this[0][e] : this.each(function (t) {
                    this[e] = J(this, n, t, this[e])
                })
            },
            data: function (e, n) {
                var i = this.attr("data-" + e.replace(m, "-$1").toLowerCase(), n);
                return null !== i ? Y(i) : t
            },
            val: function (t) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function (e) {
                    this.value = J(this, t, e, this.value)
                })
            },
            offset: function (t) {
                if (t) {
                    return this.each(function (e) {
                        var i = n(this),
                            r = J(this, t, e, i.offset()),
                            o = i.offsetParent().offset(),
                            s = {
                                top: r.top - o.top,
                                left: r.left - o.left
                            };
                        "static" == i.css("position") && (s.position = "relative"),
                        i.css(s)
                    })
                }
                if (0 == this.length) {
                    return null
                }
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function (t, i) {
                if (arguments.length < 2) {
                    var r = this[0],
                        o = getComputedStyle(r, "");
                    if (!r) {
                            return
                        }
                    if ("string" == typeof t) {
                            return r.style[C(t)] || o.getPropertyValue(t)
                        }
                    if (A(t)) {
                            var s = {};
                            return n.each(A(t) ? t : [t], function (t, e) {
                                s[e] = r.style[C(e)] || o.getPropertyValue(e)
                            }),
                            s
                        }
                }
                var a = "";
                if ("string" == L(t)) {
                    i || 0 === i ? a = F(t) + ":" + H(t, i) : this.each(function () {
                        this.style.removeProperty(F(t))
                    })
                } else {
                    for (e in t) {
                        t[e] || 0 === t[e] ? a += F(e) + ":" + H(e, t[e]) + ";" : this.each(function () {
                            this.style.removeProperty(F(e))
                        })
                    }
                }
                return this.each(function () {
                    this.style.cssText += ";" + a
                })
            },
            index: function (t) {
                return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (t) {
                return t ? r.some.call(this, function (t) {
                    return this.test(W(t))
                }, q(t)) : !1
            },
            addClass: function (t) {
                return t ? this.each(function (e) {
                    i = [];
                    var r = W(this),
                        o = J(this, t, e, r);
                    o.split(/\s+/g).forEach(function (t) {
                            n(this).hasClass(t) || i.push(t)
                        }, this),
                    i.length && W(this, r + (r ? " " : "") + i.join(" "))
                }) : this
            },
            removeClass: function (e) {
                return this.each(function (n) {
                    return e === t ? W(this, "") : (i = W(this), J(this, e, n, i).split(/\s+/g).forEach(function (t) {
                        i = i.replace(q(t), " ")
                    }), void W(this, i.trim()))
                })
            },
            toggleClass: function (e, i) {
                return e ? this.each(function (r) {
                    var o = n(this),
                        s = J(this, e, r, W(this));
                    s.split(/\s+/g).forEach(function (e) {
                            (i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e)
                        })
                }) : this
            },
            scrollTop: function (e) {
                if (this.length) {
                    var n = "scrollTop" in this[0];
                    return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ?
                    function () {
                        this.scrollTop = e
                    } : function () {
                        this.scrollTo(this.scrollX, e)
                    })
                }
            },
            scrollLeft: function (e) {
                if (this.length) {
                    var n = "scrollLeft" in this[0];
                    return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ?
                    function () {
                        this.scrollLeft = e
                    } : function () {
                        this.scrollTo(e, this.scrollY)
                    })
                }
            },
            position: function () {
                if (this.length) {
                    var t = this[0],
                        e = this.offsetParent(),
                        i = this.offset(),
                        r = d.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                    return i.top -= parseFloat(n(t).css("margin-top")) || 0,
                    i.left -= parseFloat(n(t).css("margin-left")) || 0,
                    r.top += parseFloat(n(e[0]).css("border-top-width")) || 0,
                    r.left += parseFloat(n(e[0]).css("border-left-width")) || 0,
                    {
                            top: i.top - r.top,
                            left: i.left - r.left
                        }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || a.body; t && !d.test(t.nodeName) && "static" == n(t).css("position");) {
                        t = t.offsetParent
                    }
                    return t
                })
            }
        },
    n.fn.detach = n.fn.remove,
    ["width", "height"].forEach(function (e) {
            var i = e.replace(/./, function (t) {
                return t[0].toUpperCase()
            });
            n.fn[e] = function (r) {
                var o, s = this[0];
                return r === t ? $(s) ? s["inner" + i] : _(s) ? s.documentElement["scroll" + i] : (o = this.offset()) && o[e] : this.each(function (t) {
                    s = n(this),
                    s.css(e, J(this, r, t, s[e]()))
                })
            }
        }),
    v.forEach(function (t, e) {
            var i = e % 2;
            n.fn[t] = function () {
                var t, o, r = n.map(arguments, function (e) {
                    return t = L(e),
                    "object" == t || "array" == t || null == e ? e : S.fragment(e)
                }),
                    s = this.length > 1;
                return r.length < 1 ? this : this.each(function (t, a) {
                        o = i ? a : a.parentNode,
                        a = 0 == e ? a.nextSibling : 1 == e ? a.firstChild : 2 == e ? a : null,
                        r.forEach(function (t) {
                            if (s) {
                                t = t.cloneNode(!0)
                            } else {
                                if (!o) {
                                    return n(t).remove()
                                }
                            }
                            G(o.insertBefore(t, a), function (t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                        })
                    })
            },
            n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function (e) {
                return n(e)[t](this),
                this
            }
        }),
    S.Z.prototype = n.fn,
    S.uniq = N,
    S.deserializeValue = Y,
    n.zepto = S,
    n
}();
window.Zepto = Zepto,
void 0 === window.$ && (window.$ = Zepto),


function (B) {
    function M(a) {
        return a._zid || (a._zid = S++)
    }
    function P(b, d, e, a) {
        if (d = C(d), d.ns) {
            var c = U(d.ns)
        }
        return (D[M(b)] || []).filter(function (f) {
            return !(!f || d.e && f.e != d.e || d.ns && !c.test(f.ns) || e && M(f.fn) !== M(e) || a && f.sel != a)
        })
    }
    function C(a) {
        var b = ("" + a).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        }
    }
    function U(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
    }
    function L(a, b) {
        return a.del && !z && a.e in R || !! b
    }
    function Q(a) {
        return V[a] || z && R[a] || a
    }
    function H(g, c, d, a, b, h, j) {
        var f = M(g),
            e = D[f] || (D[f] = []);
        c.split(/\s/).forEach(function (l) {
                if ("ready" == l) {
                    return B(document).ready(d)
                }
                var m = C(l);
                m.fn = d,
                m.sel = b,
                m.e in V && (d = function (o) {
                    var p = o.relatedTarget;
                    return !p || p !== this && !B.contains(this, p) ? m.fn.apply(this, arguments) : void 0
                }),
                m.del = h;
                var n = h || d;
                m.proxy = function (p) {
                    if (p = N(p), !p.isImmediatePropagationStopped()) {
                        p.data = a;
                        var o = n.apply(g, p._args == G ? [p] : [p].concat(p._args));
                        return o === !1 && (p.preventDefault(), p.stopPropagation()),
                        o
                    }
                },
                m.i = e.length,
                e.push(m),
                "addEventListener" in g && g.addEventListener(Q(m.e), m.proxy, L(m, j))
            })
    }
    function q(b, c, e, d, a) {
        var f = M(b);
        (c || "").split(/\s/).forEach(function (g) {
            P(b, g, e, d).forEach(function (h) {
                delete D[f][h.i],
                "removeEventListener" in b && b.removeEventListener(Q(h.e), h.proxy, L(h, a))
            })
        })
    }
    function N(b, a) {
        return (a || !b.isDefaultPrevented) && (a || (a = b), B.each(K, function (e, d) {
            var c = a[e];
            b[e] = function () {
                return this[d] = I,
                c && c.apply(a, arguments)
            },
            b[d] = W
        }), (a.defaultPrevented !== G ? a.defaultPrevented : "returnValue" in a ? a.returnValue === !1 : a.getPreventDefault && a.getPreventDefault()) && (b.isDefaultPrevented = I)),
        b
    }
    function k(b) {
        var c, a = {
            originalEvent: b
        };
        for (c in b) {
            J.test(c) || b[c] === G || (a[c] = b[c])
        }
        return N(a, b)
    }
    var G, S = 1,
        O = Array.prototype.slice,
        A = B.isFunction,
        F = function (a) {
            return "string" == typeof a
        },
        D = {},
        X = {},
        z = "onfocusin" in window,
        R = {
            focus: "focusin",
            blur: "focusout"
        },
        V = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    X.click = X.mousedown = X.mouseup = X.mousemove = "MouseEvents",
    B.event = {
            add: H,
            remove: q
        },
    B.proxy = function (b, c) {
            if (A(b)) {
                var a = function () {
                    return b.apply(c, arguments)
                };
                return a._zid = M(b),
                a
            }
            if (F(c)) {
                return B.proxy(b[c], b)
            }
            throw new TypeError("expected function")
        },
    B.fn.bind = function (a, b, c) {
            return this.on(a, b, c)
        },
    B.fn.unbind = function (a, b) {
            return this.off(a, b)
        },
    B.fn.one = function (b, c, d, a) {
            return this.on(b, c, d, a, 1)
        };
    var I = function () {
            return !0
        },
        W = function () {
            return !1
        },
        J = /^([A-Z]|returnValue$|layer[XY]$)/,
        K = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    B.fn.delegate = function (a, b, c) {
            return this.on(b, a, c)
        },
    B.fn.undelegate = function (a, b, c) {
            return this.off(b, a, c)
        },
    B.fn.live = function (a, b) {
            return B(document.body).delegate(this.selector, a, b),
            this
        },
    B.fn.die = function (a, b) {
            return B(document.body).undelegate(this.selector, a, b),
            this
        },
    B.fn.on = function (c, e, d, g, a) {
            var h, b, f = this;
            return c && !F(c) ? (B.each(c, function (l, j) {
                f.on(l, e, d, j, a)
            }), f) : (F(e) || A(g) || g === !1 || (g = d, d = e, e = G), (A(d) || d === !1) && (g = d, d = G), g === !1 && (g = W), f.each(function (j, l) {
                a && (h = function (m) {
                    return q(l, m.type, g),
                    g.apply(this, arguments)
                }),
                e && (b = function (m) {
                    var o, n = B(m.target).closest(e, l).get(0);
                    return n && n !== l ? (o = B.extend(k(m), {
                        currentTarget: n,
                        liveFired: l
                    }), (h || g).apply(n, [o].concat(O.call(arguments, 1)))) : void 0
                }),
                H(l, c, g, d, e, b || h)
            }))
        },
    B.fn.off = function (a, c, d) {
            var b = this;
            return a && !F(a) ? (B.each(a, function (f, e) {
                b.off(f, c, e)
            }), b) : (F(c) || A(d) || d === !1 || (d = c, c = G), d === !1 && (d = W), b.each(function () {
                q(this, a, d, c)
            }))
        },
    B.fn.trigger = function (a, b) {
            return a = F(a) || B.isPlainObject(a) ? B.Event(a) : N(a),
            a._args = b,
            this.each(function () {
                "dispatchEvent" in this ? this.dispatchEvent(a) : B(this).triggerHandler(a, b)
            })
        },
    B.fn.triggerHandler = function (c, d) {
            var a, b;
            return this.each(function (f, e) {
                a = k(F(c) ? B.Event(c) : c),
                a._args = d,
                a.target = e,
                B.each(P(e, c.type || c), function (g, h) {
                    return b = h.proxy(a),
                    a.isImmediatePropagationStopped() ? !1 : void 0
                })
            }),
            b
        },
    "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (a) {
            B.fn[a] = function (b) {
                return b ? this.bind(a, b) : this.trigger(a)
            }
        }),
    ["focus", "blur"].forEach(function (a) {
            B.fn[a] = function (b) {
                return b ? this.bind(a, b) : this.each(function () {
                    try {
                        this[a]()
                    } catch (c) {}
                }),
                this
            }
        }),
    B.Event = function (b, d) {
            F(b) || (d = b, b = d.type);
            var e = document.createEvent(X[b] || "Events"),
                a = !0;
            if (d) {
                    for (var c in d) {
                        "bubbles" == c ? a = !! d[c] : e[c] = d[c]
                    }
                }
            return e.initEvent(b, a, !0),
            N(e)
        }
}(Zepto),


function (t) {
    function l(e, n, i) {
        var r = t.Event(n);
        return t(e).trigger(r, i),
        !r.isDefaultPrevented()
    }
    function h(t, e, i, r) {
        return t.global ? l(e || n, i, r) : void 0
    }
    function p(e) {
        e.global && 0 === t.active++ && h(e, null, "ajaxStart")
    }
    function d(e) {
        e.global && !--t.active && h(e, null, "ajaxStop")
    }
    function m(t, e) {
        var n = e.context;
        return e.beforeSend.call(n, t, e) === !1 || h(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void h(e, n, "ajaxSend", [t, e])
    }
    function g(t, e, n, i) {
        var r = n.context,
            o = "success";
        n.success.call(r, t, o, e),
        i && i.resolveWith(r, [t, o, e]),
        h(n, r, "ajaxSuccess", [e, n, t]),
        y(o, e, n)
    }
    function v(t, e, n, i, r) {
        var o = i.context;
        i.error.call(o, n, e, t),
        r && r.rejectWith(o, [n, e, t]),
        h(i, o, "ajaxError", [n, i, t || e]),
        y(e, n, i)
    }
    function y(t, e, n) {
        var i = n.context;
        n.complete.call(i, e, t),
        h(n, i, "ajaxComplete", [e, n]),
        d(n)
    }
    function x() {}
    function b(t) {
        return t && (t = t.split(";", 2)[0]),
        t && (t == f ? "html" : t == u ? "json" : s.test(t) ? "script" : a.test(t) && "xml") || "text"
    }
    function w(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }
    function E(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
        !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = w(e.url, e.data), e.data = void 0)
    }
    function j(e, n, i, r) {
        return t.isFunction(n) && (r = i, i = n, n = void 0),
        t.isFunction(i) || (r = i, i = void 0),
        {
            url: e,
            data: n,
            success: i,
            dataType: r
        }
    }
    function S(e, n, i, r) {
        var o, s = t.isArray(n),
            a = t.isPlainObject(n);
        t.each(n, function (n, u) {
                o = t.type(u),
                r && (n = i ? r : r + "[" + (a || "object" == o || "array" == o ? n : "") + "]"),
                !r && s ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? S(e, u, i, n) : e.add(n, u)
            })
    }
    var i, r, e = 0,
        n = window.document,
        o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        s = /^(?:text|application)\/javascript/i,
        a = /^(?:text|application)\/xml/i,
        u = "application/json",
        f = "text/html",
        c = /^\s*$/;
    t.active = 0,
    t.ajaxJSONP = function (i, r) {
            if (!("type" in i)) {
                return t.ajax(i)
            }
            var f, h, o = i.jsonpCallback,
                s = (t.isFunction(o) ? o() : o) || "jsonp" + ++e,
                a = n.createElement("script"),
                u = window[s],
                c = function (e) {
                    t(a).triggerHandler("error", e || "abort")
                },
                l = {
                    abort: c
                };
            return r && r.promise(l),
            t(a).on("load error", function (e, n) {
                    clearTimeout(h),
                    t(a).off().remove(),
                    "error" != e.type && f ? g(f[0], l, i, r) : v(null, n || "error", l, i, r),
                    window[s] = u,
                    f && t.isFunction(u) && u(f[0]),
                    u = f = void 0
                }),
            m(l, i) === !1 ? (c("abort"), l) : (window[s] = function () {
                    f = arguments
                }, a.src = i.url.replace(/\?(.+)=\?/, "?$1=" + s), n.head.appendChild(a), i.timeout > 0 && (h = setTimeout(function () {
                    c("timeout")
                }, i.timeout)), l)
        },
    t.ajaxSettings = {
            type: "GET",
            beforeSend: x,
            success: x,
            error: x,
            complete: x,
            context: null,
            global: !0,
            xhr: function () {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: u,
                xml: "application/xml, text/xml",
                html: f,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        },
    t.ajax = function (e) {
            var n = t.extend({}, e || {}),
                o = t.Deferred && t.Deferred();
            for (i in t.ajaxSettings) {
                    void 0 === n[i] && (n[i] = t.ajaxSettings[i])
                }
            p(n),
            n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
            n.url || (n.url = window.location.toString()),
            E(n),
            n.cache === !1 && (n.url = w(n.url, "_=" + Date.now()));
            var s = n.dataType,
                a = /\?.+=\?/.test(n.url);
            if ("jsonp" == s || a) {
                    return a || (n.url = w(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")),
                    t.ajaxJSONP(n, o)
                }
            var j, u = n.accepts[s],
                f = {},
                l = function (t, e) {
                    f[t.toLowerCase()] = [t, e]
                },
                h = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
                d = n.xhr(),
                y = d.setRequestHeader;
            if (o && o.promise(d), n.crossDomain || l("X-Requested-With", "XMLHttpRequest"), l("Accept", u || "*/*"), (u = n.mimeType || u) && (u.indexOf(",") > -1 && (u = u.split(",", 2)[0]), d.overrideMimeType && d.overrideMimeType(u)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && l("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers) {
                    for (r in n.headers) {
                        l(r, n.headers[r])
                    }
                }
            if (d.setRequestHeader = l, d.onreadystatechange = function () {
                    if (4 == d.readyState) {
                        d.onreadystatechange = x,
                        clearTimeout(j);
                        var e, i = !1;
                        if (d.status >= 200 && d.status < 300 || 304 == d.status || 0 == d.status && "file:" == h) {
                            s = s || b(n.mimeType || d.getResponseHeader("content-type")),
                            e = d.responseText;
                            try {
                                "script" == s ? (1, eval)(e) : "xml" == s ? e = d.responseXML : "json" == s && (e = c.test(e) ? null : t.parseJSON(e))
                            } catch (r) {
                                i = r
                            }
                            i ? v(i, "parsererror", d, n, o) : g(e, d, n, o)
                        } else {
                            v(d.statusText || null, d.status ? "error" : "abort", d, n, o)
                        }
                    }
                }, m(d, n) === !1) {
                    return d.abort(),
                    v(null, "abort", d, n, o),
                    d
                }
            if (n.xhrFields) {
                    for (r in n.xhrFields) {
                        d[r] = n.xhrFields[r]
                    }
                }
            var T = "async" in n ? n.async : !0;
            d.open(n.type, n.url, T, n.username, n.password);
            for (r in f) {
                    y.apply(d, f[r])
                }
            return n.timeout > 0 && (j = setTimeout(function () {
                    d.onreadystatechange = x,
                    d.abort(),
                    v(null, "timeout", d, n, o)
                }, n.timeout)),
            d.send(n.data ? n.data : null),
            d
        },
    t.get = function () {
            return t.ajax(j.apply(null, arguments))
        },
    t.post = function () {
            var e = j.apply(null, arguments);
            return e.type = "POST",
            t.ajax(e)
        },
    t.getJSON = function () {
            var e = j.apply(null, arguments);
            return e.dataType = "json",
            t.ajax(e)
        },
    t.fn.load = function (e, n, i) {
            if (!this.length) {
                return this
            }
            var a, r = this,
                s = e.split(/\s/),
                u = j(e, n, i),
                f = u.success;
            return s.length > 1 && (u.url = s[0], a = s[1]),
            u.success = function (e) {
                    r.html(a ? t("<div>").html(e.replace(o, "")).find(a) : e),
                    f && f.apply(r, arguments)
                },
            t.ajax(u),
            this
        };
    var T = encodeURIComponent;
    t.param = function (t, e) {
            var n = [];
            return n.add = function (t, e) {
                this.push(T(t) + "=" + T(e))
            },
            S(n, t, e),
            n.join("&").replace(/%20/g, "+")
        }
}(Zepto),


function (a) {
    a.fn.serializeArray = function () {
        var c, b = [];
        return a([].slice.call(this.get(0).elements)).each(function () {
            c = a(this);
            var d = c.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && b.push({
                name: c.attr("name"),
                value: c.val()
            })
        }),
        b
    },
    a.fn.serialize = function () {
        var b = [];
        return this.serializeArray().forEach(function (c) {
            b.push(encodeURIComponent(c.name) + "=" + encodeURIComponent(c.value))
        }),
        b.join("&")
    },
    a.fn.submit = function (b) {
        if (b) {
            this.bind("submit", b)
        } else {
            if (this.length) {
                var c = a.Event("submit");
                this.eq(0).trigger(c),
                c.isDefaultPrevented() || this.get(0).submit()
            }
        }
        return this
    }
}(Zepto),


function (b) {
    "__proto__" in {} || b.extend(b.zepto, {
        Z: function (d, e) {
            return d = d || [],
            b.extend(d, b.fn),
            d.selector = e || "",
            d.__Z = !0,
            d
        },
        isZ: function (d) {
            return "array" === b.type(d) && "__Z" in d
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (c) {
        var a = getComputedStyle;
        window.getComputedStyle = function (d) {
            try {
                return a(d)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto);
if (typeof define === "function" && define.amd) {
    define("zepto", [], function () {
        return Zepto
    })
}(function (b) {
    function a(A) {
        var s = this.os = {},
            c = this.browser = {},
            o = A.match(/WebKit\/([\d.]+)/),
            d = A.match(/(Android)\s+([\d.]+)/),
            h = !! A.match(/\(Macintosh\; Intel /),
            t = A.match(/(iPad).*OS\s([\d_]+)/),
            k = !t && A.match(/(iPhone\sOS)\s([\d_]+)/),
            B = A.match(/(iPod)(.*OS\s([\d_]+))?/),
            j = A.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            n = A.match(/Windows Phone ([\d.]+)/),
            w = j && A.match(/TouchPad/),
            q = A.match(/Kindle\/([\d.]+)/),
            e = A.match(/Silk\/([\d._]+)/),
            u = A.match(/(BlackBerry).*Version\/([\d.]+)/),
            ab = A.match(/(BB10).*Version\/([\d.]+)/),
            m = A.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            f = A.match(/PlayBook/),
            y = A.match(/Chrome\/([\d.]+)/) || A.match(/CriOS\/([\d.]+)/),
            r = A.match(/Firefox\/([\d.]+)/),
            x = A.match(/MSIE\s([\d.]+)/) || A.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
            p = !y && A.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            D = p || A.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
            v = A.match(/Baidu\/([\d.]+)/) || A.match(/baiduboxapp\/([\d.]+)/),
            l = A.match(/MQQBrowser\/([\d.]+)/),
            C = A.match(/MiuiBrowser\/([\d.]+)/),
            z = A.match(/MicroMessenger\/([\d.]+)/),
            g = A.match(/UCBrowser\/([\d.]+)/) || A.match(/UCWEB\/([\d.]+)/);
        if (c.webkit = !! o) {
                c.version = o[1]
            }
        if (d) {
                s.android = true,
                s.version = d[2]
            }
        if (k) {
                s.ios = s.iphone = true,
                s.version = k[2].replace(/_/g, ".")
            }
        if (t) {
                s.ios = s.ipad = true,
                s.version = t[2].replace(/_/g, ".")
            }
        if (j) {
                s.webos = true,
                s.version = j[2]
            }
        if (w) {
                s.touchpad = true
            }
        if (u) {
                s.blackberry = true,
                s.version = u[2]
            }
        if (ab) {
                s.bb10 = true,
                s.version = ab[2]
            }
        if (m) {
                s.rimtabletos = true,
                s.version = m[2]
            }
        if (f) {
                c.playbook = true
            }
        if (q) {
                s.kindle = true,
                s.version = q[1]
            }
        if (e) {
                c.silk = true,
                c.version = e[1]
            }
        if (!e && s.android && A.match(/Kindle Fire/)) {
                c.silk = true
            }
        if (y) {
                c.chrome = true,
                c.version = y[1]
            }
        if (r) {
                c.firefox = true,
                c.version = r[1]
            }
        if (x) {
                c.ie = true,
                c.version = x[1]
            }
        if (D && (h || s.ios)) {
                c.safari = true;
                if (h) {
                    c.version = D[1]
                }
            }
        if (p) {
                c.webview = true
            }
        if (v) {
                c.baidu = true,
                c.version = v[1]
            }
        if (g) {
                c.uc = true,
                c.version = g[1]
            }
        if (l) {
                c.qq = true,
                c.version = l[1]
            }
        if (C) {
                c.xiaomi = true,
                c.version = C[1]
            }
        if (z) {
                c.weixin = true,
                c.version = z[1]
            }
        s.tablet = !! (t || f || (d && !A.match(/Mobile/)) || (r && A.match(/Tablet/)));
        s.phone = !! (!s.tablet && (d || k || j || u || ab || y || r))
    }
    a.call(b, navigator.userAgent);
    b.__detect = a
})(Zepto);
(function (a) {
    a.extend(a.fn, {
        cookie: function (d, c, b) {
            var e, f, g, h;
            if (arguments.length > 1 && String(c) !== "[object Object]") {
                b = a.extend({}, b);
                if (c === null || c === undefined) {
                    b.expires = -1
                }
                return typeof b.expires == "number" && (e = b.expires * 24 * 60 * 60 * 1000, f = b.expires = new Date, f.setTime(f.getTime() + e)),
                c = String(c),
                document.cookie = [encodeURIComponent(d), "=", b.raw ? c : encodeURIComponent(c), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("")
            }
            return b = c || {},
            h = b.raw ?
            function (j) {
                return j
            } : decodeURIComponent,
            (g = (new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)")).exec(document.cookie)) ? h(g[1]) : null
        }
    })
})(Zepto);
(function () {
    function b(n, o) {
        var q = /^[1-9]+[0-9]*]*$/;
        var v = 1;
        var e = 0;
        var d = "_";
        var f = e + d;
        var j = 10000000003;
        var h = 10000000003;
        var x = 2654404609;
        var m = 1;
        var g = 0;
        var S = {};
        S.tag = null;
        S.expParam = null;

        function t(C) {
            var y = document.cookie;
            var z = y.split("; ");
            for (var A = 0; A < z.length; A++) {
                var B = z[A].split("=");
                if (B[0] == C) {
                    return B[1]
                }
            }
            return null
        }
        function r(y, z) {
            if (y && y.length && y.length > 0) {
                var A = y.length;
                for (var B = 0; B < A; B++) {
                    if (y[B] == z) {
                        return true
                    }
                }
            }
            return false
        }
        function p(y) {
            var A = 0,
                z = 0,
                B;
            for (B = y.length - 1; B >= 0; B--) {
                    z = y.charCodeAt(B);
                    A = (A << 6 & 268435455) + z + (z << 14);
                    z = A & 266338304;
                    A = z != 0 ? A ^ z >> 21 : A
                }
            return A
        }
        function c(y) {
            var C = [];
            if (typeof(y) != "undefined" && y != null) {
                y = $.trim(y);
                if (y != "") {
                    var E = y.split(",");
                    var D = E.length;
                    for (var B = 0; B < D; B++) {
                        var G = $.trim(E[B]);
                        if (G.indexOf("-") > 0) {
                            var H = G.split("-", 2);
                            var z = $.trim(H[0]);
                            var F = $.trim(H[1]);
                            if ((q.test(z) || (!isNaN(z) && z == 0)) && q.test(F)) {
                                z = parseInt(z, 10);
                                F = parseInt(F, 10);
                                for (var A = z; A <= F; A++) {
                                    C.push(A)
                                }
                            }
                        } else {
                            C.push(G)
                        }
                    }
                }
            }
            return C
        }
        function l(y) {
            if (q.test(y) || (!isNaN(y) && y == 0)) {
                return true
            } else {
                return false
            }
        }
        function k(F, y) {
            if (F && F.length && F.length > 0) {
                var A = F.length;
                for (var D = 0; D < A; D++) {
                    var C = F[D];
                    var E = C.bucketNum;
                    var z = C.validFlag;
                    if (z == v) {
                        var B = c(E);
                        if (r(B, y)) {
                            return C
                        }
                    }
                }
            }
            return null
        }
        function s(A, C, y, D) {
            var B = 0;
            var z = Math.abs(((((A + h) >>> 32) * ((C + j) >>> 32)) >>> 32 * x) >>> (16)) % y + 1;
            B = z + D;
            return B
        }
        function w() {
            var I = null;
            var P = t("guid");
            var E = t("bucketNum");
            var C = n.glBase;
            var A = n.glExp;
            var O = n.bxBase;
            var z = n.bxExp;
            var R = c(C);
            var F = c(A);
            var B = c(O);
            var Q = c(z);
            var J = R.length + F.length;
            var N = B.length + Q.length;
            var H = J + N;
            if (l(E)) {
                bucketNum = parseInt(E)
            } else {
                if (typeof(P) != "undefined" && P != null && H > 0) {
                    I = Math.abs(p(P));
                    bucketNum = (I % H) + 1
                } else {
                    return null
                }
            }
            S.tag = f + bucketNum;
            if (r(R, bucketNum)) {
                return
            } else {
                if (o && o.id && o.detailList) {
                    var K = o.id;
                    var D = o.detailList;
                    var M = o.isolationLevel;
                    if (M == m && J > 0 && r(F, bucketNum)) {
                        var L = k(D, bucketNum);
                        if (L != null) {
                            var y = L.id;
                            S.expParam = L.expParam;
                            S.tag = K + d + bucketNum + d + y;
                            return
                        } else {
                            return
                        }
                    } else {
                        if (M == g && N > 0 && (r(Q, bucketNum) || r(B, bucketNum))) {
                            var G = bucketNum;
                            if (!l(E) && typeof(P) != "undefined" && P != null) {
                                G = s(I, K, N, J)
                            }
                            if (r(B, G)) {
                                S.tag = f + G;
                                return
                            } else {
                                if (r(Q, G)) {
                                    var L = k(D, G);
                                    if (L != null) {
                                        var y = L.id;
                                        S.expParam = L.expParam;
                                        S.tag = K + d + G + d + y;
                                        return
                                    } else {
                                        S.tag = K + d + G;
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (n) {
            try {
                w()
            } catch (u) {}
        }
        return S
    }
    var a = window.loli;
    if (a) {
        a.abtest = {};
        a.abtest.getABTestExpResult = b
    }
    if (typeof define === "function" && define.amd) {
        define("global_abtest", [], function () {
            var c = {};
            c.getABTestExpResult = b;
            return c
        })
    }
})();
define("common_yhd_webp", function () {
    var m = {};

    function g(a) {
        if (a && typeof(a) == "string") {
            return a.replace(/(^\s*)|(\s*$)/g, "")
        } else {
            return a
        }
    }
    function l() {
        if (typeof(localStorage) == "undefined") {
            return false
        }
        var b = localStorage.getItem("webp");
        if (b) {
            return true
        }
        var a = document.createElement("canvas");
        if ( !! (a.getContext && a.getContext("2d"))) {
            var c = a.toDataURL("image/webp").indexOf("data:image/webp") == 0;
            if (c) {
                localStorage.setItem("webp", true)
            }
            return c
        } else {
            return false
        }
    }
    var j = false;
    try {
        j = l()
    } catch (k) {}
    function h(a) {
        if (!j || !a) {
            return a
        }
        a = g(a);
        var c = /^[https:]*\/\/d(\d+).(yihaodian||yhd)[img]*.com/;
        if (a.search(c) == -1) {
            return a
        }
        var b = a.split(".");
        if (b.length > 1) {
            if (b[b.length - 1].toLowerCase() == "gif") {
                return a
            }
            b[b.length - 1] = "webp"
        }
        return b.join(".")
    }
    m.replaceWebP = h;
    return m
});
define("util_yhd.url", ["tracker_ref_yhd.uid"], function (d) {
    var f = {};

    function e(a) {
        if (!a) {
            return true
        }
        for (var b in a) {
            return false
        }
        return true
    }
    f.getCookie = function (a) {
        if (a) {
            var j = document.cookie;
            var c = j.split("; ");
            for (var k = 0; k < c.length; k++) {
                var b = c[k].split("=");
                if (b[0] == a) {
                    return b[1]
                }
            }
        }
        return null
    };
    f.setCookie = function (j, l, b, k) {
        var c = k || 30;
        var a = new Date();
        a.setTime(a.getTime() + c * 60 * 1000);
        document.cookie = j + "=" + l + ";expires=" + a.toGMTString() + ";domain=" + b + ";path=/;"
    };
    f.getParams = function (a) {
        a = $.trim(a);
        var b = f.parseUrl(a);
        return b ? b.params : null
    };
    f.appendParams = function (b, l) {
        var a = f;
        if (e(l)) {
            return b
        }
        var j = a.parseUrl(b);
        if (!j) {
            return b
        }
        var k = j.params;
        for (var c in l) {
            if (l.hasOwnProperty(c) && (l[c] != null && typeof l[c] !== "undefined" && $.trim(l[c]).length > 0)) {
                k[c] = l[c]
            } else {
                if (l.hasOwnProperty(c) && (l[c] == null || typeof l[c] === "undefined" || $.trim(l[c]) == "")) {
                    delete k[c]
                }
            }
        }
        j.params = k;
        return a.toCusString(j)
    };
    f.appendAppParams = function (j, l) {
        var b = f;
        if (!j) {
            return ""
        }
        var k = b.parseUrl(j);
        var a = k.params || {};
        if (a.body) {
            bodyObj = JSON.parse(a.body);
            for (var c in l) {
                if (l.hasOwnProperty(c) && (l[c] != null && typeof l[c] !== "undefined" && $.trim(l[c]).length > 0)) {
                    bodyObj[c] = l[c]
                }
            }
            a.body = JSON.stringify(bodyObj);
            return b.toCusString(k)
        } else {
            if (!e(l)) {
                a.body = JSON.stringify(l);
                return b.toCusString(k)
            }
        }
        return j
    };
    f.parseUrl = function (G) {
        var B = "";
        var y = "";
        var A = "";
        var b = {};
        G = $.trim(G);
        if (G == "") {
            return null
        }
        var v = G.split("#");
        var u = v[0];
        if (v.length >= 2) {
            for (var w = 1, c = v.length; w < c; w++) {
                B += "#" + v[w]
            }
        }
        var C = u.indexOf("?");
        var D = u.length;
        if (C > 0) {
            y = u.substring(0, C);
            A = u.substring(C + 1, D)
        } else {
            y = u
        }
        if (A) {
            var E = A.split("&");
            for (var w = 0, c = E.length; w < c; w++) {
                var z = E[w].indexOf("=");
                if (z == -1) {
                    continue
                }
                var x = E[w].substring(0, z);
                var a = E[w].substring(z + 1);
                b[x] = a
            }
        }
        var F = {
            loc: y,
            params: b,
            append: B
        };
        return F
    };
    f.toCusString = function (j) {
        var b = [];
        b.push(j.loc);
        var c = j.params;
        if (!e(c)) {
            b.push("?");
            var a = 0;
            for (var k in c) {
                if (c.hasOwnProperty(k) && (c[k] != null && typeof c[k] !== "undefined" && $.trim(c[k]).length > 0)) {
                    if (a) {
                        b.push("&")
                    }
                    b.push(k + "=" + c[k]);
                    a++
                }
            }
        }
        if (j.append) {
            b.push(j.append)
        }
        return b.join("")
    };
    f.addPosition = function (N, K) {
        var T = this;
        var V = T.getParams(K || "") || {};
        var R = V.tp;
        if (R && d.generateMixed) {
            var L = R.split(".");
            if (L.length >= 6 && d.isValidUID(L[5])) {
                var aa = L[5];
                if (aa && aa.indexOf("-") > 0) {
                    var H = aa.split("-")[0];
                    if (H && N != null) {
                        var E = "x" + N.xrate + "y" + N.yrate;
                        var c = "x:" + N.xrate + "|y:" + N.yrate;
                        var P = new Date();
                        var S = P.getMinutes();
                        var X = P.getSeconds();
                        var I = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                        var J = I.split("");
                        var F = J[S];
                        var a = J[X];
                        var Y = d.generateMixed(4) + F + a;
                        var G = Y;
                        var O = H + "_" + G;
                        var Z = false;
                        try {
                            var Q = null;
                            var M = "yhd.com";
                            var ab = /([\.\w]*)\.yihaodian\.com\.hk/;
                            var b = document.domain;
                            if (!ab.test(b)) {
                                T.setCookie(O, c, M, 5);
                                Q = T.getCookie(O);
                                if (Q == c) {
                                    Z = true
                                }
                            }
                        } catch (U) {}
                        var W = {
                            ti: G,
                            tps: ""
                        };
                        if (!Z) {
                            W = {
                                ti: "",
                                tps: E
                            }
                        }
                        K = T.appendParams(K, W)
                    }
                }
            }
        }
        return K
    };
    f.isSpider = function () {
        var c = navigator.userAgent.toLowerCase();
        var m = c.match(/baiduspider/i) == "baiduspider";
        var a = c.match(/360spider/i) == "360spider";
        var o = c.match(/sogou web spider/i) == "sogou web spider";
        var p = c.match(/sosospider/i) == "sosospider";
        var b = c.match(/yisouspider/i) == "yisouspider";
        var l = c.match(/googlebot/i) == "googlebot";
        var n = c.match(/bingbot/i) == "bingbot";
        if (m || a || o || p || b || l || n) {
            return true
        } else {
            return false
        }
    };
    return f
});
define("tracker_ref_yhd.uid", function () {
    var e = {};
    var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`^abcdefghijklmnopqrstuvwxyz";
    var b = a.split("");
    var d = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    e.generateMixed = function (j) {
        var h = "";
        for (var g = 0; g < j; g++) {
            var f = Math.floor(Math.random() * 32);
            h += d[f]
        }
        return h
    };
    e.genUID = function () {
        var f = new Date().getTime();
        var g = e.hashClientInfo("11");
        return e.base64(f) + "-" + g
    };
    e.base64 = function (j) {
        var g = j;
        var o = [];
        var k = f(g);
        var l = k.length;
        for (var h = 0; h < l; h++) {
            o.push(b[parseInt(k[h], 2).toString(10)])
        }
        return o.join("");

        function f(w) {
            var q = parseInt(w).toString(2);
            var p = q.length;
            var m = [];
            var r = p % 6;
            if (r > 0) {
                m.push(q.substring(0, r))
            }
            var n = r;
            while (n < p) {
                m.push(q.substring(n, n + 6));
                n += 6
            }
            return m
        }
    };
    e.parseUID = function (g) {
        if (!g) {
            return null
        }
        var l = g.length;
        if (l != 7) {
            return null
        }
        var q = [];
        for (var j = 0; j < l; j++) {
            var f = g.charAt(j);
            var k = a.indexOf(f);
            if (k == -1) {
                return null
            }
            var h = k.toString(2);
            for (var m = 6; m > h.length;) {
                h = "0" + h
            }
            q[j] = h
        }
        return parseInt(q.join(""), 2).toString(10)
    };
    e.isValidUID = function (k) {
        if (c("frameworkver")) {
            return 1
        }
        var j = k.split("-");
        if (j.length == 3) {
            var g = e.parseUID(j[0]);
            var f = new Date().getTime();
            if (!g || (f - g > 30 * 60 * 1000)) {
                return 0
            }
            var h = e.hashClientInfo(j[1]);
            if (!h) {
                return 0
            }
            h = h.split("-");
            if (h.length == 2 && h[1] != j[2]) {
                return 0
            }
        } else {
            return 1
        }
        return 1
    };
    e.hashClientInfo = function (h) {
        var k = window.navigator;
        var g = c("guid");
        k = k.appName + k.platform + k.userAgent;
        var j = "";
        if (g && g != "" && h[0] == 1) {
            k += g;
            j += "1"
        } else {
            j += "0"
        }
        var f = c("yihaodian_uid");
        if (f && f != "" && h[1] == 1) {
            k += f;
            j += "1"
        } else {
            j += "0"
        }
        return j + "-" + e.base64(e.hash(k))
    };
    e.hash = function (j) {
        var h = 0,
            g = 0,
            f;
        if (j) {
                for (f = j.length - 1; f >= 0; f--) {
                    g = j.charCodeAt(f);
                    h = (h << 6 & 268435455) + g + (g << 14);
                    g = h & 266338304;
                    h = g != 0 ? h ^ g >> 21 : h
                }
            }
        return h
    };

    function c(k) {
        var g = document.cookie;
        var h = g.split("; ");
        for (var f = 0; f < h.length; f++) {
            var j = h[f].split("=");
            if (j[0] == k) {
                return j[1]
            }
        }
        return null
    }
    return e
});
define("biz_loli_page", ["util_yhd.url", "tracker_ref_yhd.uid"], function (b, a) {
    var c = {};
    var e = {};
    var d = ".";
    e.getElementTopLeft = function (g) {
        var f = 0;
        var h = 0;
        while (g) {
            f += g.offsetTop;
            h += g.offsetLeft;
            g = g.offsetParent
        }
        return {
            top: f,
            left: h
        }
    };
    e.isVisual = function (g) {
        if (!g) {
            return false
        }
        var f = g.offsetHeight;
        var j = document.documentElement.clientHeight;
        var k = document.documentElement.scrollTop || document.body.scrollTop;
        var h = e.getElementTopLeft(g).top + f / 2;
        if (h < j + k && h > k) {
            return true
        } else {
            return false
        }
    };
    e.isVisualByTop = function (g) {
        if (!g) {
            return false
        }
        var j = e.getElementTopLeft(g).top;
        var k = document.documentElement.clientHeight - 8;
        var h = j + g.offsetHeight;
        var f = document.documentElement.scrollTop || document.body.scrollTop;
        if ((j <= k + f && j >= f) || (j <= f && h >= f)) {
            return true
        } else {
            return false
        }
    };
    e.checkTpPage = function (g) {
        if (!g) {
            g = $("meta[name=tp_page]").attr("content");
            if (!g) {
                return null
            }
        }
        var f = g.split(d);
        return f.length == 2 ? f : null
    };
    e.glSpmcodeToId = function (f, h) {
        if (typeof(_globalSpmDataModelJson) != "undefined" && _globalSpmDataModelJson) {
            var g = 0;
            if (f) {
                g = _globalSpmDataModelJson[f] ? _globalSpmDataModelJson[f][h] : ""
            } else {
                g = _globalSpmDataModelJson[h]
            }
            if (g) {
                return g
            }
        }
        return h
    };
    e.getCurrPageInfo = function () {
        var f = e.checkTpPage();
        if (!f) {
            return null
        }
        return {
            pageType: e.glSpmcodeToId(null, f[0]),
            pageValue: f[1]
        }
    };
    e.getReferPageInfo = function () {
        var h = b.getParams(location.href) || {};
        var g = h.tp;
        if (g) {
            var f = g.split(".");
            if (a.isValidUID(f[5])) {
                return {
                    refPageType: f[0] || "",
                    refPageValue: f[1] || ""
                }
            }
        }
        return null
    };
    e.getMousePos = function (n) {
        try {
            var w = n || window.event;
            if (w) {
                var p = document.body.scrollWidth;
                var l = document.body.scrollHeight;
                var k = document.documentElement.scrollLeft || document.body.scrollLeft;
                var j = document.documentElement.scrollTop || document.body.scrollTop;
                var h, g, o, m;
                h = w.pageX || w.clientX + k;
                g = w.pageY || w.clientY + j;
                if (h && g) {
                    o = h / p;
                    m = g / l;
                    return {
                        xrate: o.toFixed(5),
                        yrate: m.toFixed(5)
                    }
                }
            }
        } catch (f) {}
        return null
    };
    c.page = e;
    return c
});
var h5tonative = {
    urlList: {
        apphome: "yhd://home/",
        appcart: "yhd://cart/",
        appgroupone: "yhd://groupon/"
    },
    functionlist: {
        shake: "yhdiosfun://shake/",
        playAudio: "yhdiosfun://playAudio/",
        addCart: "yhdiosfun://addCart/",
        share: "yhdiosfun://share/",
        goback: "yhdiosfun://back/",
        unionlogin: "yhdiosfun://unionloginback/",
        buoyCart: "yhdiosfun://buoyCart/",
        getRemoteData: "yhdiosfun://getRemoteData/",
        saveH5Data: "yhdiosfun://saveH5Data/",
        getH5Data: "yhdiosfun://getH5Data/",
        h5Init: "yhdiosfun://h5Init/",
        h5Refresh: "yhdiosfun://h5Refresh/",
        hideTab: "yhdiosfun://hideTab/",
        showShareButton: "yhdiosfun://showShareButton/",
        setHomeBtn: "yhdiosfun://setHomeBtn/",
        setCanReload: "yhdiosfun://setCanReload/"
    },
    getAllCookie: function () {
        return unescape(document.cookie)
    },
    getCookie: function (d, b) {
        var c = "\\b" + (b ? d + "=(?:.*?&)*?" + b + "=([^&;$]*)" : d + "=([^;$]*)");
        var a = new RegExp(c, "i");
        return a.test(unescape(document.cookie)) ? RegExp["$1"] : ""
    },
    getUserAgent: function () {
        return navigator.userAgent
    },
    yhdplatform: {
        isandroid: function () {
            return h5tonative.getUserAgent().indexOf("yhdandroid") > 0
        },
        isios: function () {
            return h5tonative.getUserAgent().indexOf("yhdios") > 0
        },
        isother: function () {
            return h5tonative.getUserAgent().indexOf("yhdandroid") < 0 && h5tonative.getUserAgent().indexOf("yhdios") < 0
        }
    },
    getClientInfo: function () {
        return h5tonative.getCookie("clientinfo", "")
    },
    getUserToken: function () {
        return h5tonative.getCookie("usertoken", "")
    },
    getProvinceid: function () {
        return h5tonative.getCookie("provinceid", "")
    },
    getFrom: function () {
        return h5tonative.getCookie("from", "")
    },
    getSessionid: function () {
        return h5tonative.getCookie("sessionid", "")
    },
    isWireless2: function () {
        if (h5tonative.getCookie("frameworkver", "") != "") {
            return true
        }
        return false
    },
    goToNative: function (a, b) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.gotToNative(a, b)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = a + "?body=" + b
        }
    },
    playAudio: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.playAudio(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.playAudio + "?body=" + a
        }
    },
    addCart: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.addCart(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.addCart + "?body=" + a
        }
    },
    shake: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.shake(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.shake + "?body=" + a
        }
    },
    share: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            h5tonative.goToNative("yhd://share/", a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.share + "?body=" + a
        }
    },
    appBack: function () {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.back()
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.goback
        }
    },
    unionloginback: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.unionloginback(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.unionlogin + "?body=" + a
        }
    },
    buoyCart: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.buoyCart(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.buoyCart + "?body=" + a
        }
    },
    h5Init: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.h5Init(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.h5Init + "?body=" + a
        }
    },
    getRemoteData: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.getRemoteData(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.getRemoteData + "?body=" + a
        }
    },
    saveH5Data: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.saveH5Data(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.saveH5Data + "?body=" + a
        }
    },
    getH5Data: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.getH5Data(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.getH5Data + "?body=" + a
        }
    },
    h5Refresh: function () {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.h5Refresh()
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.h5Refresh
        }
    },
    hideTab: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.hideTab(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.hideTab + "?body=" + a
        }
    },
    showShareButton: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.showShareButton(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.showShareButton + "?body=" + a
        }
    },
    setHomeBtn: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.setHomeBtn(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.setHomeBtn + "?body=" + a
        }
    },
    setCanReload: function (a) {
        if (h5tonative.yhdplatform.isios()) {
            if (typeof h5tonative.functionlist != "undefined") {
                window.location.href = h5tonative.functionlist.setCanReload + "?body=" + a
            }
        }
    },
    alertsomthing: function () {
        alert(h5tonative.isWireless2())
    },
    setKey: function (a) {
        if (h5tonative.yhdplatform.isandroid()) {
            window.yhd.setKey(a)
        }
        if (h5tonative.yhdplatform.isios()) {
            window.location.href = h5tonative.functionlist.setKey + "?body=" + a
        }
    }
};
define("global_env", function (d, c, e) {
    var b = h5tonative;
    c.getGlobalEnvValues = function () {
        if (c.isWireless2()) {
            return c.getWireless2GlobalEnvValues()
        }
        var f = $.fn.cookie("provinceId");
        return {
            provinceId: f,
            osType: 20
        }
    };
    c.getProvinceId = function () {
        return c.getGlobalEnvValues()["provinceId"]
    };
    c.getOSType = function () {
        return c.getGlobalEnvValues()["osType"]
    };
    c.isInApp = function () {
        var f = c.getOSType();
        if ($.trim(f) == "" || f == "20") {
            return false
        }
        return true
    };
    c.setProvinceId = function (f) {
        $.fn.cookie("provinceId", f, {
            domain: ".yhd.com",
            path: "/",
            expires: 30
        })
    };
    c.isValidProvinceId = function (f) {
        if (f >= 1 && f < 33) {
            return 1
        }
        return 0
    };
    c.adapterNewListenner = function () {
        var f = c.getOSType();
        var g = $.fn.cookie("ClientAppVersion");
        if (g) {
            g = a(g);
            if (f == 30) {
                if (g >= 3.22) {
                    return 1
                }
            }
        }
        return 0
    };

    function a(h) {
        var f = h.split(".");
        var k = "";
        for (var g = 0, j = f.length; g < j; g++) {
            if (g == 1) {
                k += "."
            }
            k += f[g]
        }
        return k
    }
    c.isWireless2 = function () {
        return b.isWireless2()
    };
    c.getWireless2ProvinceId = function () {
        return b.getProvinceid()
    };
    c.getWireless2OSType = function () {
        if (b.yhdplatform.isandroid()) {
            return 10
        } else {
            if (b.yhdplatform.isios()) {
                return 30
            } else {
                return 20
            }
        }
    };
    c.getWireless2GlobalEnvValues = function () {
        var h = c.getWireless2OSType();
        var g = c.getWireless2ProvinceId();
        if ($.trim(h) == "") {
            var f = /([\?\&])osType=([^\&]*)(.*)/;
            if (f.test(location.href)) {
                h = f.exec(location.href)[2]
            }
        }
        return {
            provinceId: g,
            osType: h
        }
    };
    c.goToNative = function (f, g) {
        if (g && typeof g != "string") {
            g = JSON.stringify(g)
        }
        b.goToNative(f, g)
    };
    return c
});
define("tracker_ref_yhd.global_spm", ["tracker_ref_yhd.uid", "util_yhd.url", "global_abtest", "biz_loli_page"], function (g, l, n, r) {
    var v = {};
    var w = ".";
    var c = "0";
    var x = "1";
    var q = {
        TPA: "tpa",
        TPC: "tpc",
        TPI: "tpi",
        TCS: "tcs",
        TCD: "tcd",
        TCI: "tci",
        PC: "pc",
        TP: "tp",
        TC: "tc",
        TCE: "tce",
        ABTEST: "abtest",
        ABTEST_TAG: "abtest_tag",
        EXPR_TAG: "a,area,button",
        TPA_CHILD_SIZE: "tpaChildSize",
        TPC_CHILD_SIZE: "tpcChildSize",
        TC_CHILD_SIZE: "tcChildSize",
        RESULT: {
            RESULT: "result",
            TP: "tp",
            TC: "tc",
            UNIID: "uniId",
            PAGETYPE: "pageType",
            PAGEID: "pageId"
        }
    };
    var h = {};
    var W = null,
        p = null,
        b = 0;
    var t = g.genUID();
    v.getData = function (z, A) {
            if (l.isSpider()) {
                return {}
            }
            u();
            if (b == -1 || b == 2) {
                return null
            }
            var y = new m(z, A);
            return y.getData()
        };
    v.getNewPageData = function () {
            u();
            var G = l.getParams(location.href) || {};
            var C = G.tp;
            var y = G.tc;
            var z = G.tce;
            var D = G.abtest;
            var E = G.ti;
            var H = G.tps;
            var B = 0;
            var F = f();
            if (F && F.length > 0) {
                D = c + w + F;
                B = 1
            }
            var A = {
                tp: C,
                tc: y,
                tce: z,
                abtest: D,
                unValidAB: B,
                ti: E,
                tps: H
            };
            return k(A)
        };
    v.reloadPage = function (y) {
            v.refreshPage(window.location.href, y)
        };
    v.refreshPage = function (C, D, y, z) {
            var A = null;
            if (z && z.event) {
                A = z.event
            }
            var B = a(C, D, y, A);
            window.location.href = B
        };
    v.openPage = function (G, C, D, F, y) {
            var B = null;
            if (y && y.event) {
                B = y.event
            }
            var E = a(C, G, B);
            var A = "";
            if (typeof(D) != "undefined" && D) {
                A = D
            }
            var z = "";
            if (typeof(F) != "undefined" && F) {
                z = F
            }
            window.open(E, A, z)
        };
    v.getABExpParam = function (y) {
            var z = s(y);
            return z
        };
    v.glABcodeToTag = function (z) {
            var y = e(z);
            return y
        };

    function a(M, D, J, F) {
            if (!M) {
                return ""
            }
            var E = typeof(D);
            if (E == "undefined" || !D) {
                return M
            }
            var N = null;
            if (E == "string") {
                var K = D;
                var y = D.indexOf("#");
                if (y === -1) {
                    K = "#" + K
                }
                N = $(K)
            } else {
                if (E == "object") {
                    N = D
                }
            }
            if (!N) {
                return M
            }
            var L = v.getData(N, J);
            if (L) {
                var G = L.tp;
                var A = L.tc;
                var C = L.tce;
                var I = L.abtestValue;
                var B = {
                    tp: G,
                    tc: A,
                    tce: C,
                    abtest: I
                };
                var z = l.appendParams(M, B);
                if (r.page.getMousePos) {
                    var H = r.page.getMousePos(F);
                    if (H != null) {
                        z = l.addPosition(H, z)
                    }
                }
                return z
            } else {
                return M
            }
        }
    function d(y, A) {
            if (typeof(_globalSpmDataModelJson) != "undefined" && _globalSpmDataModelJson) {
                var z = 0;
                if (y) {
                    z = _globalSpmDataModelJson[y] ? _globalSpmDataModelJson[y][A] : ""
                } else {
                    z = _globalSpmDataModelJson[A]
                }
                if (z) {
                    return z
                }
            }
            return A
        }
    function u() {
            var y = $("meta[name=tp_page]").attr("content");
            y = o(y);
            if (!y) {
                b = -1;
                return
            }
            W = d(null, y[0]);
            p = y[1];
            if (W && W == "0") {
                b = 2
            }
        }
    function f() {
            var y = $("meta[name=global-abtest]");
            if (y && y.length > 0) {
                var z = y.attr("content");
                var A = e(z);
                return A
            }
            return ""
        }
    function e(y) {
            if (y && y.length > 0) {
                if (h[y]) {
                    return h[y].tag
                } else {
                    if (typeof(_globalABTestBucketWholeJson) != "undefined" && _globalABTestBucketWholeJson && _globalABTestBucketWholeJson.h5 && typeof(_globalABTestExpDetailJson) != "undefined" && _globalABTestExpDetailJson && _globalABTestExpDetailJson[y]) {
                        var z = n.getABTestExpResult(_globalABTestBucketWholeJson.h5, _globalABTestExpDetailJson[y]);
                        h[y] = z;
                        return z.tag
                    } else {
                        if (typeof(_globalABTestExpDataJson) != "undefined" && _globalABTestExpDataJson && _globalABTestExpDataJson[y]) {
                            var A = _globalABTestExpDataJson[y]["tag"];
                            h[y] = {};
                            h[y].tag = A;
                            return A
                        }
                    }
                }
            }
            return ""
        }
    function s(A) {
            if (A && A.length > 0) {
                if (h[A]) {
                    return h[A].expParam
                } else {
                    if (typeof(_globalABTestBucketWholeJson) != "undefined" && _globalABTestBucketWholeJson && _globalABTestBucketWholeJson.h5 && typeof(_globalABTestExpDetailJson) != "undefined" && _globalABTestExpDetailJson && _globalABTestExpDetailJson[A]) {
                        var z = n.getABTestExpResult(_globalABTestBucketWholeJson.h5, _globalABTestExpDetailJson[A]);
                        h[A] = z;
                        return z.expParam
                    } else {
                        if (typeof(_globalABTestExpDataJson) != "undefined" && _globalABTestExpDataJson && _globalABTestExpDataJson[A]) {
                            var y = _globalABTestExpDataJson[A]["expParam"];
                            h[A] = {};
                            h[A].expParam = y;
                            return y
                        }
                    }
                }
            }
            return ""
        }
    function m(z, A) {
            var y = this;
            y._dom = z;
            y._opt = {};
            y.TAG = A || q.EXPR_TAG;
            y.init()
        }
    m.prototype = {
            init: function () {
                var F = this,
                    E = F._dom;
                if (!E) {
                        F.set(q.RESULT.RESULT, 0);
                        return
                    }
                if (!(E instanceof $)) {
                        E = $(E)
                    }
                var G = E.data(q.PC);
                if (G == 1) {
                        F.set(q.RESULT.RESULT, 1);
                        return
                    } else {
                        if (G == -1) {
                            F.set(q.RESULT.RESULT, 0);
                            return
                        }
                    }
                var B = j(E, q.TPA);
                if (B.length < 1) {
                        if (W) {
                            F.set(q.RESULT.RESULT, 1);
                            F.set(q.TPA, 0);
                            F.set(q.TPC, 0);
                            F.set(q.TPI, 0)
                        } else {
                            F.set(q.RESULT.RESULT, 0)
                        }
                        return
                    }
                F.set(q.TPA, B.data(q.TPA));
                F.initTpaIndex(B);
                var A = E.data(q.TPI);
                if (!A) {
                        F.initNewTpaIndex(E, B)
                    }
                F.set(q.TPC, E.data(q.TPC));
                F.set(q.TPI, E.data(q.TPI));
                var C = j(E, q.TC);
                if (C && C.length > 0) {
                        F.set(q.TC, C.data(q.TC))
                    } else {
                        F.initTcdIndex(B);
                        var y = j(E, q.TCS);
                        var D = j(E, q.TCD);
                        if (D.length > 0) {
                            if (!y.data(q.TCD)) {
                                F.initNewTcdIndex(D, B)
                            }
                            F.set(q.TCS, y.data(q.TCS));
                            F.set(q.TCD, D.data(q.TCD));
                            F.set(q.TCI, D.data(q.TCI) || 1)
                        }
                    }
                var z = j(E, q.ABTEST);
                if (z && z.length > 0) {
                        F.set(q.ABTEST, z.data(q.ABTEST))
                    }
                F.set(q.RESULT.RESULT, 1)
            },
            rebuildTP: function (A) {
                A += "";
                var z = A.split(w);
                var y = d("SPM_AREA", z[2]);
                var B = d("SPM_COM", z[3]);
                return (z[0] || "0") + w + (z[1] || "0") + w + (y || "0") + w + (B || "0") + w + (z[4] || "0") + w + (z[5] || "0")
            },
            rebuildTC: function (A) {
                if (!A) {
                    return A
                }
                A += "";
                var y = A.split(w);
                var z = d("SPM_SYSTEM_TYPE", y[0] || "0");
                var B = d("SPM_DATA_TYPE", y[2] || "0");
                return z + w + (y[1] || "0") + w + (B || "0") + w + (y[3] || "0") + w + (y[4] || "1")
            },
            getData: function () {
                var S = this,
                    R = $(S._dom);
                var y = S.get(q.RESULT.RESULT);
                if (!y) {
                        R.data(q.PC, -1);
                        return null
                    }
                var G = R.data(q.PC);
                var P = "";
                var N = j(R, q.TCE);
                if (N && N.length > 0) {
                        P = N.attr("data-" + q.TCE)
                    }
                if (G == 1) {
                        var L = R.data(q.TP);
                        var Q = R.data(q.TC);
                        var A = R.data(q.ABTEST_TAG);
                        var z = {
                            tp: L,
                            tc: Q,
                            tce: P,
                            abtest: A
                        };
                        var C = k(z);
                        return C
                    }
                var H = S.get(q.TPA);
                var F = S.get(q.TPC);
                var B = S.get(q.TPI);
                var J = S.get(q.TCS);
                var O = S.get(q.TCD);
                var D = S.get(q.TCI);
                var Q = S.get(q.TC);
                var K = W + w + p + w + H + w + (F || "0") + w + B + w + t;
                var I = "";
                if (Q) {
                        I = Q
                    } else {
                        if ($.trim(J) != "" || $.trim(O) != "") {
                            if ($.trim(J) != "") {
                                I += J + w
                            } else {
                                I += "0.0" + w
                            }
                            if ($.trim(O) != "") {
                                I += O + w
                            } else {
                                I += "0.0" + w
                            }
                            I += D
                        }
                    }
                I = this.rebuildTC(I);
                K = this.rebuildTP(K);
                var E = "";
                var A = S.get(q.ABTEST);
                if (A) {
                        if (A.indexOf(c + w) < 0) {
                            var M = e(A);
                            if (M) {
                                E = x + w + M
                            }
                        } else {
                            E = A
                        }
                    }
                R.data(q.TP, K);
                R.data(q.TC, I);
                R.data(q.ABTEST_TAG, E);
                R.data(q.PC, 1);
                var z = {
                        tp: K,
                        tc: I,
                        tce: P,
                        abtest: E
                    };
                var C = k(z);
                return C
            },
            initTpaIndex: function (A) {
                var K = A.data(q.TPA_CHILD_SIZE);
                var y = this;
                if (K) {
                    return
                }
                var D = A.find(y.TAG);
                K = 1;
                var E = {};
                for (var F = 0, C; C = D[F]; F++) {
                    C = $(C);
                    var z = j(C, q.TPC);
                    if (z.length < 1) {
                        C.data(q.TPI, K);
                        C.data(q.TPC, 0);
                        K++
                    } else {
                        var J = z.find(y.TAG);
                        if (J.length == 0) {
                            J = z
                        }
                        var I = z.data(q.TPC);
                        var H = E[I] || 1;
                        for (var G = 0, B; B = J[G]; G++) {
                            if ($(B).data(q.TPI)) {
                                continue
                            }
                            $(B).data(q.TPC, I);
                            $(B).data(q.TPI, H);
                            H++
                        }
                        E[I] = H + J.length;
                        z.data(q.TPC_CHILD_SIZE, E[I])
                    }
                }
                A.data(q.TPA_CHILD_SIZE, K)
            },
            initNewTpaIndex: function (C, z) {
                var y = j(C, q.TPC);
                if (y.length < 1) {
                    var A = z.data(q.TPA_CHILD_SIZE);
                    A++;
                    C.data(q.TPC, 0);
                    C.data(q.TPI, A);
                    z.data(q.TPA_CHILD_SIZE, A)
                } else {
                    var B = y.data(q.TPC_CHILD_SIZE);
                    B++;
                    C.data(q.TPC, y.data(q.TPC));
                    C.data(q.TPI, B);
                    y.data(q.TPC_CHILD_SIZE, B)
                }
            },
            initTcdIndex: function (C) {
                var z = C.data(q.TC_CHILD_SIZE);
                if (z != null) {
                    return
                }
                var A = C.find("[data-tcd]");
                for (var y = 0, B; B = A[y]; y++) {
                    B = $(B);
                    B.data(q.TCI, y + 1)
                }
                C.data(q.TC_CHILD_SIZE, A.length)
            },
            initNewTcdIndex: function (z, y) {
                var A = y.data(q.TC_CHILD_SIZE);
                A++;
                y.data(q.TC_CHILD_SIZE, A);
                z.data(q.TCI, A)
            },
            get: function (y) {
                return this._opt[y]
            },
            set: function (z, y) {
                this._opt[z] = y
            }
        };

    function k(O) {
            var X = O.tce,
                G = O.abtest,
                ab = O.unValidAB,
                L = O.ti,
                ad = O.tps;
            var C = O.tp || "";
            var af = O.tc || "";
            var I = "";
            var F = "";
            var z = "";
            var U = "";
            var M = "";
            var ac = "";
            var K = "";
            var S = "";
            var A = "";
            var Q = "";
            var R = "";
            var P = "";
            var Z = "";
            var aa = "";
            if (C) {
                    C = decodeURIComponent(C);
                    var N = C.split(".");
                    if (N.length >= 6 && g.isValidUID(N[5])) {
                        I = N[2] || "0";
                        F = N[3] || "0";
                        z = N[4] || "0";
                        A = N[0] || "0";
                        Q = N[5] || "0";
                        R = N[1] || "0";
                        if (af) {
                            var T = af.split(".");
                            U = T[0] || "0";
                            M = T[1] || "0";
                            ac = T[2] || "0";
                            K = T[3] || "0";
                            S = T[4] || "1"
                        }
                        P = G;
                        if (L) {
                            var Y = N[5].split("-")[0];
                            var H = Y + "_" + L;
                            var ah = l.getCookie(H);
                            if (ah) {
                                var y = ah.split("|");
                                if (y) {
                                    for (var D = 0; D < y.length; D++) {
                                        var E = y[D];
                                        if (E && E.indexOf(":") > 0) {
                                            var J = E.split(":");
                                            var ae = J[0];
                                            var B = J[1];
                                            if (ae == "x") {
                                                Z = B
                                            } else {
                                                if (ae == "y") {
                                                    aa = B
                                                }
                                            }
                                        }
                                    }
                                }
                                l.setCookie(H, "", "yhd.com", -60 * 24)
                            }
                        } else {
                            if (ad && ad.indexOf("x") == 0 && ad.indexOf("y") > 1 && ad.indexOf("y") != ad.length - 1) {
                                var V = ad.indexOf("y");
                                Z = ad.substring(1, V);
                                aa = ad.substring(V + 1)
                            }
                        }
                    }
                }
            if (!P && ab) {
                    P = G
                }
            return {
                    tp: C,
                    tc: af,
                    tpa: I,
                    tpc: F,
                    tpi: z,
                    tcs: U,
                    tcsa: M,
                    tcd: ac,
                    tcdt: K,
                    tci: S,
                    tce: X || "",
                    abtestValue: P || "",
                    pageTypeId: W,
                    pageValue: p,
                    unid: t,
                    refPageTypeId: A,
                    refUnid: Q,
                    refPageValue: R,
                    eventXRate: Z,
                    eventYRate: aa
                }
        }
    function o(z) {
            if (!z) {
                return null
            }
            var y = z.split(w);
            return y.length == 2 ? y : null
        }
    function j(y, z) {
            return y.closest("[data-" + z + "]")
        }
    return v
});
(function () {
    function a(b) {
        if (typeof(b) == "undefined" || !b || b == "#" || b.indexOf("#") == 0 || b == "###" || b.toLowerCase().indexOf("javascript") >= 0) {
            return false
        }
        return true
    }
    require(["tracker_ref_yhd.global_spm", "util_yhd.url", "global_env", "biz_loli_page"], function (e, b, d, c) {
        if (!d.isWireless2() && d.isInApp()) {
            return
        }
        $("body").on("click", "a,area", function (q) {
            var A = $(this);
            var f = $.trim(A.attr("href"));
            var g = A.data("globalRewrite");
            var l = e.getData(A);
            var k = null;
            if (c.page.getMousePos) {
                k = c.page.getMousePos(q);
                if (k != null) {
                    l = l || {};
                    l.eventXRate = k.xrate;
                    l.eventYRate = k.yrate
                }
            }
            if (g && g == 1) {
                if (l && l.tp && l.pageTypeId) {
                    var p = b.addPosition(k, f);
                    if (p != f) {
                        A.attr("href", p)
                    }
                }
                return
            }
            if (a(f)) {
                if (l) {
                    var o = l.tc;
                    var h = l.tp;
                    var n = l.tce;
                    var j = l.abtestValue;
                    var m = {
                        tc: o,
                        tp: h,
                        tce: n,
                        abtest: j
                    };
                    f = b.appendParams(f, m);
                    if (l.tp && l.pageTypeId) {
                        f = b.addPosition(k, f)
                    }
                    A.attr("href", f);
                    A.data("globalRewrite", 1)
                }
            }
        });
        $("body").on("click", "[data-trackerSend]", function (q) {
            var k = $(this);
            var l = e.getData(k);
            if (c.page.getMousePos) {
                var h = c.page.getMousePos(q);
                if (h != null) {
                    l = l || {};
                    l.eventXRate = h.xrate;
                    l.eventYRate = h.yrate
                }
            }
            var f = k.attr("data-event");
            if (f && f == "add_cart") {
                var j = k.attr("data-pmid") || 2;
                var g = k.attr("data-proid");
                l.positionTypeId = "4";
                gotracker(j, f, g, l)
            } else {
                if (f) {
                    gotracker(2, f, null, l)
                } else {
                    if (l) {
                        gotracker(2, "buttonPosition", null, l)
                    }
                }
            }
        })
    })
})();
Array.prototype.toTRACKERJSONString = function () {
    var a = "[";
    for (var b = 0; b < this.length; b++) {
        if (this[b] instanceof Parameter) {
            if (this[b].value instanceof Array) {
                a += "{" + this[b].key + "=" + this[b].value.toTRACKERJSONString() + "},"
            } else {
                a += this[b].toJSONString() + ","
            }
        }
    }
    if (a.indexOf(",") > 0) {
        a = a.substring(0, a.length - 1)
    }
    return a + "]"
};
Date.prototype.globalDateFormat = function (b) {
    var a = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var c in a) {
        if (new RegExp("(" + c + ")").test(b)) {
            b = b.replace(RegExp.$1, (RegExp.$1.length == 1) ? (a[c]) : (("00" + a[c]).substr(("" + a[c]).length)))
        }
    }
    return b
};

function Parameter(a, b) {
    this.key = a;
    if (this.key == "internalKeyword") {
        this.value = encodeURIComponent(b)
    } else {
        this.value = b
    }
    this.toJSONString = function () {
        return "{" + this.key + "=" + this.value + "}"
    }
}
function addPublicParameter(a) {
    a += "&w_url=" + encodeURIComponent(location.href);
    a += "&s_iev=" + navigator.userAgent || "";
    a += "&s_rst=" + window.screen.width + "*" + window.screen.height;
    a += "&w_rfu=" + encodeURIComponent(document.referrer || "");
    return a
}
var trackerSupportKey = new Object();
trackerSupportKey.infoPageId = "w_pif";
trackerSupportKey.tp = "w_tp";
trackerSupportKey.tc = "w_tc";
trackerSupportKey.guid = "guid";
trackerSupportKey.attachedInfo = "b_ai";
trackerSupportKey.tracker_u = "b_tu";
trackerSupportKey.tracker_type = "b_trt";
trackerSupportKey.ip = "u_ip";
trackerSupportKey.infoTrackerSrc = "w_ts";
trackerSupportKey.infoTrackerSrc = "w_ts";
trackerSupportKey.cookie = "w_ck";
trackerSupportKey.orderCode = "b_oc";
trackerSupportKey.endUserId = "u_uid";
trackerSupportKey.firstLink = "w_flk";
trackerSupportKey.productId = "b_pid";
trackerSupportKey.curMerchantId = "u_cm";
trackerSupportKey.provinceId = "u_pid";
trackerSupportKey.fee = "b_fee";
trackerSupportKey.edmActivity = "b_ea";
trackerSupportKey.edmEmail = "b_ee";
trackerSupportKey.edmJobId = "b_ejb";
trackerSupportKey.internalKeyword = "b_ik";
trackerSupportKey.resultSum = "b_rs";
trackerSupportKey.currentPage = "b_scp";
trackerSupportKey.linkPosition = "b_lp";
trackerSupportKey.buttonPosition = "b_bp";
trackerSupportKey.adgroupKeywordID = "b_ak";
trackerSupportKey.extField3 = "b_set";
trackerSupportKey.extField6 = "b_adt";
trackerSupportKey.extField7 = "b_pmi";
trackerSupportKey.extField8 = "b_tid";
trackerSupportKey.extField9 = "b_cid";
trackerSupportKey.extField10 = "s_and";
trackerSupportKey.pageTypeId = "w_pt";
trackerSupportKey.unid = "w_un";
trackerSupportKey.pageValue = "w_pv";
trackerSupportKey.refPageTypeId = "w_rpt";
trackerSupportKey.refUnid = "w_run";
trackerSupportKey.refPageValue = "w_rpv";
trackerSupportKey.eventId = "b_ei";
trackerSupportKey.labelId = "b_li";
trackerSupportKey.filterInfo = "b_fi";
trackerSupportKey.activityId = "b_aci";
trackerSupportKey.listCategoryId = "b_lci";
trackerSupportKey.pmStatusTypeId = "b_pms";
trackerSupportKey.container = "s_ct";
trackerSupportKey.containerVersion = "s_ctv";
trackerSupportKey.platVersion = "s_pv";
trackerSupportKey.platform = "s_plt";
trackerSupportKey.phoneType = "s_pt";
trackerSupportKey.provider = "s_pro";
trackerSupportKey.netType = "s_nt";
trackerSupportKey.tpa = "w_tpa";
trackerSupportKey.tpc = "w_tpc";
trackerSupportKey.tpi = "w_tpi";
trackerSupportKey.tcs = "w_tcs";
trackerSupportKey.tcsa = "w_tca";
trackerSupportKey.tcdt = "w_tct";
trackerSupportKey.tcd = "w_tcd";
trackerSupportKey.tci = "w_tci";
trackerSupportKey.tce = "w_tce";
trackerSupportKey.positionTypeId = "b_pyi";
trackerSupportKey.siteType = "b_st";
trackerSupportKey.latitude = "u_lat";
trackerSupportKey.longitude = "u_lon";
trackerSupportKey.clientTime = "b_clt";
trackerSupportKey.abtestValue = "b_abv";
trackerSupportKey.newUserFlag = "b_nu";
trackerSupportKey.eventXRate = "b_exr";
trackerSupportKey.eventYRate = "b_eyr";
trackerSupportKey.serverTime = "b_svt";
trackerSupportKey.infoType = "b_it";

function TrackerContainer() {
    this.url = ("https:" == document.location.protocol ? "https://" : "http://") + "tracker.yhd.com/tracker/newInfo.do?1=1";
    this.url = addPublicParameter(this.url);
    this.parameterArray = [];
    this.stockArray = [];
    this.commonAttached = [];
    this.addParameter = function (a) {
        for (var c = 0, b = this.parameterArray.length; c < b; c++) {
            if (this.parameterArray[c] && a && this.parameterArray[c].key == a.key) {
                this.parameterArray[c].value = a.value;
                return
            }
        }
        this.parameterArray.push(a)
    };
    this.addStock = function (b, a) {
        this.stockArray.push(new Parameter(b, a))
    };
    this.addCommonAttached = function (a, b) {
        this.commonAttached.push(new Parameter(a, b))
    };
    this.buildAttached = function () {
        if (this.stockArray.length > 0) {
            this.commonAttached.push(new Parameter("1", this.stockArray))
        }
        if (this.commonAttached.length > 0) {
            this.addParameter(new Parameter("attachedInfo", this.commonAttached.toTRACKERJSONString("attachedInfo")))
        }
    };
    this.toUrl = function () {
        this.buildAttached();
        var d = "&bd={";
        for (var b = 0;
        b < this.parameterArray.length; b++) {
            var a = trackerSupportKey[this.parameterArray[b].key];
            var c = this.parameterArray[b].value;
            if (a) {
                d += a + "=" + c;
                if (b < this.parameterArray.length - 1) {
                    d += "|"
                }
            }
        }
        d += "}";
        return this.url + d
    }
}
function addTrackPositionToCookie(a, b) {
    document.cookie = "linkPosition=" + encodeURIComponent(b) + ";path=/;domain=." + tracker_domain_url + ";"
}
function addPageMsgToCookie(a) {
    if (typeof(a) == "object" && a) {
        if (typeof(a.pmInfoId) != "undefined") {
            document.cookie = "pmInfoId=" + a.pmInfoId + ";path=/;domain=." + tracker_domain_url + ";"
        }
        if (typeof(a.productId) != "undefined") {
            document.cookie = "productId=" + a.productId + ";path=/;domain=." + tracker_domain_url + ";"
        }
    }
}
function trackerGetCookie(d) {
    var a = document.cookie;
    var b = a.split("; ");
    for (var e = 0; e < b.length; e++) {
        var c = b[e].split("=");
        if (c[0] == d) {
            return c[1]
        }
    }
    return null
}
function trackerClearCookieWithName(c, a) {
    var b = new Date();
    b.setTime(b.getTime() - 10000);
    document.cookie = c + "=" + a + ";path=/;domain=." + tracker_domain_url + ";expires=" + b.toGMTString()
}
var e1 = /exfield1=[^;]*;*/i;
var e2 = new RegExp("exfield2=[^;]*;*", "i");
var e3 = new RegExp("exfield3=[^;]*;*", "i");
var e4 = new RegExp("exfield4=[^;]*;*", "i");
var e5 = new RegExp("exfield5=[^;]*;*", "i");

function batchRecordTrackerInfo(c) {
    if (c && c.length > 0) {
        var b = ("https:" == document.location.protocol ? "https://" : "http://") + "tracker.yhd.com/related/newInfo.do?1=1";
        b = addPublicParameter(b);
        var a = [];
        if (trackerGetCookie("yihaodian_uid")) {
            a.push(new Parameter("endUserId", trackerGetCookie("yihaodian_uid")))
        }
        require(["tracker_ref_yhd.global_spm"], function (f) {
            var g = f.getNewPageData();
            if (g && typeof(g) == "object") {
                var h = g.pageTypeId;
                var k = g.pageValue;
                a.push(new Parameter("pageTypeId", h));
                a.push(new Parameter("pageValue", k))
            }
            a.push(new Parameter("infoType", c[0].type));
            var m = "&bd={";
            for (var j = 0; j < a.length; j++) {
                var e = trackerSupportKey[a[j].key];
                var d = a[j].value;
                if (e) {
                    m += e + "=" + d;
                    if (j < a.length - 1) {
                        m += "|"
                    }
                }
            }
            m += "}";
            b += m;
            var n = [];
            for (var j = 0, l = c.length; j < l; j++) {
                delete c[j].type;
                delete c[j].paramObj.w_pt;
                delete c[j].paramObj.w_pv;
                var m = recordTrackerGroup(c[j]);
                n[j] = '{"bd":"{' + m + '}"}'
            }
            b += "&batchInfo=[" + n.join(",") + "]";
            sendImgUrl(b)
        })
    }
}
function recordTrackInfoWithType(a, c, h, d, g) {
    var e = ("https:" == document.location.protocol ? "https://" : "http://") + "tracker.yhd.com/related/newInfo.do?1=1";
    e = addPublicParameter(e);
    e += "&bd={";
    var f = {};
    if (trackerGetCookie("yihaodian_uid")) {
        f[trackerSupportKey.endUserId] = trackerGetCookie("yihaodian_uid")
    }
    e += trackerSupportKey.endUserId + "=" + f[trackerSupportKey.endUserId] + "|" + trackerSupportKey.infoType + "=" + a + "|";
    var b = {
        info: c,
        others: h,
        extend: d,
        paramObj: g
    };
    sendImgUrl(e + recordTrackerGroup(b) + "}")
}
function recordTrackerGroup(f) {
    if (!f) {
        return
    }
    var g = f.info;
    var d = f.others;
    var n = f.extend;
    var o = f.paramObj;
    var c = {};
    if (o) {
        for (var m in o) {
            var e = trackerSupportKey[m];
            if (e) {
                c[e] = o[m]
            } else {
                c[m] = o[m]
            }
        }
    }
    if (g) {
        c.b_ri = encodeURIComponent(g) || "";
        c.b_ai = encodeURIComponent(d) || "";
        if (n) {
            var p = e1.exec(n);
            if (p) {
                c.b_e1 = encodeURIComponent(p[0].replace(/exfield1=/i, "").replace(";", ""))
            }
            var l = e2.exec(n);
            if (l) {
                c.b_e2 = encodeURIComponent(l[0].replace(/exfield2=/i, "").replace(";", ""))
            }
            var j = e3.exec(n);
            if (j) {
                c.b_e3 = encodeURIComponent(j[0].replace(/exfield3=/i, "").replace(";", ""))
            }
            var b = e4.exec(n);
            if (b) {
                c.b_e4 = encodeURIComponent(b[0].replace(/exfield4=/i, "").replace(";", ""))
            }
            var a = e5.exec(n);
            if (a) {
                c.b_e5 = encodeURIComponent(a[0].replace(/exfield5=/i, "").replace(";", ""))
            }
        }
        var h = "";
        for (var k in c) {
            if (h != "") {
                h += "|"
            }
            h += k + "=" + c[k]
        }
        return h
    }
}
function gotracker(g, b, d, f, a) {
    var c = new TrackerContainer();
    if (trackerGetCookie("provinceId")) {
        c.addParameter(new Parameter("provinceId", trackerGetCookie("provinceId")))
    }
    if (typeof setTrackerPublicParams != "undefined") {
        setTrackerPublicParams(c)
    }
    if (b) {
        c.addParameter(new Parameter("buttonPosition", b))
    } else {
        c.addParameter(new Parameter("buttonPosition", "defaultButton"))
    }
    if (d) {
        c.addParameter(new Parameter("productId", d))
    }
    if (typeof(g) == "number" && (g > 2 || g < 0)) {
        c.addParameter(new Parameter("extField7", g))
    } else {
        if (typeof(g) == "string") {
            var e = Number(g);
            if (e > 2 || e < 0) {
                c.addParameter(new Parameter("extField7", e))
            }
        }
    }
    if (typeof(f) == "object" && f) {
        for (var h in f) {
            c.addParameter(new Parameter(h, f[h]))
        }
        if (!f.positionTypeId) {
            c.addParameter(new Parameter("positionTypeId", "2"))
        }
    } else {
        c.addParameter(new Parameter("positionTypeId", "2"))
    }
    var s = trackerGetCookie("edmEmail");
    if (s) {
        c.addParameter(new Parameter("edmEmail", s))
    }
    if (trackerGetCookie("yihaodian_uid")) {
        c.addParameter(new Parameter("endUserId", trackerGetCookie("yihaodian_uid")))
    }
    c.addParameter(new Parameter("clientTime", encodeURIComponent(new Date().globalDateFormat("yyyy-MM-dd HH:mm:ss S"))));
    if (!f || (typeof(f) == "object" && f && !f.pageTypeId)) {
        require(["tracker_ref_yhd.global_spm", "biz_loli_page"], function (m, k) {
            var n = m.getNewPageData();
            if (n && typeof(n) == "object") {
                var j = n.pageTypeId;
                var o = n.pageValue;
                c.addParameter(new Parameter("pageTypeId", j));
                c.addParameter(new Parameter("pageValue", o));
                c.addParameter(new Parameter("refPageTypeId", j));
                c.addParameter(new Parameter("refPageValue", o))
            }
            if (n && !n.eventXRate && !n.eventYRate) {
                var l = k.page.getMousePos(a);
                if (l != null) {
                    c.addParameter(new Parameter("eventXRate", l.xrate));
                    c.addParameter(new Parameter("eventYRate", l.yrate))
                }
            }
            sendImgUrl(c.toUrl())
        })
    } else {
        if (typeof(f) == "object" && f && !f.eventXRate && !f.eventYRate) {
            require(["biz_loli_page"], function (j) {
                var k = j.page.getMousePos(a);
                if (k != null) {
                    c.addParameter(new Parameter("eventXRate", k.xrate));
                    c.addParameter(new Parameter("eventYRate", k.yrate))
                }
                sendImgUrl(c.toUrl())
            })
        } else {
            sendImgUrl(c.toUrl())
        }
    }
}
function bindLinkClickTracker(b, a) {
    var c = $("#" + b + " a");
    c.click(function () {
        var d = $(this).text();
        d = a + "_" + encodeURIComponent($.trim(d));
        addTrackPositionToCookie("1", d)
    })
}
var trackerContainer = new TrackerContainer();

function sendImgUrl(a) {
    var b = "timg" + new Date().getTime();
    window[b] = new Image(1, 1);
    window[b].src = a
}
var tracker_domain_url = "yhd.com";

function getQueryStringRegExp(c) {
    var b = location.href;
    if (b && b.indexOf("#") > 0) {
        b = b.substring(0, b.indexOf("#"))
    }
    var a = new RegExp("(^|\\?|&)" + c + "=([^&]*)(\\s|&|$)", "i");
    if (a.test(b)) {
        return unescape(RegExp.$2.replace(/\+/g, " "))
    } else {
        return ""
    }
}
var referrer = document.referrer ? document.referrer : "";
var referrerDomain = referrer.match(/http[s]?:\/\/([^\/]+)/);
var ref = getQueryStringRegExp("tracker_u");
var uid = getQueryStringRegExp("uid");
var websiteid = getQueryStringRegExp("website_id");
var utype = getQueryStringRegExp("tracker_type");
var adgroupKeywordID = getQueryStringRegExp("adgroupKeywordID");
var edmEmail = getQueryStringRegExp("emailId");
var expire_time_day = new Date((new Date()).getTime() + 1 * 24 * 3600000).toGMTString();
var expire_time_mouth = new Date((new Date()).getTime() + 30 * 24 * 3600000).toGMTString();
if (ref && !isNaN(ref)) {
    document.cookie = "unionKey=" + ref + ";expires=" + expire_time_day + ";domain=." + tracker_domain_url + ";path=/";
    if (uid) {
        document.cookie = "uid=" + uid + ";expires=" + expire_time_day + ";domain=." + tracker_domain_url + ";path=/"
    } else {
        document.cookie = "uid=;expires=" + -1 + ";domain=." + tracker_domain_url + ";path=/"
    }
    if (websiteid) {
        document.cookie = "websiteid=" + websiteid + ";expires=" + expire_time_day + ";domain=." + tracker_domain_url + ";path=/"
    } else {
        document.cookie = "websiteid=;expires=" + -1 + ";domain=." + tracker_domain_url + ";path=/"
    }
}
if (adgroupKeywordID) {
    document.cookie = "adgroupKeywordID=" + adgroupKeywordID + ";expires=" + expire_time_day + ";domain=." + tracker_domain_url + ";path=/"
}
if (utype) {
    document.cookie = "unionType=" + utype + ";expires=" + expire_time_mouth + ";domain=." + tracker_domain_url + ";path=/"
}
if (edmEmail) {
    document.cookie = "edmEmail=" + edmEmail + ";domain=." + tracker_domain_url + ";path=/"
}
function setTrackerPublicParams(k) {
    if (!k) {
        k = trackerContainer
    }
    function E() {
        var q = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {
            type: "unknown"
        };
        var p = ["unknown", "ethernet", "wifi", "2g", "3g", "4g", "none"];
        if (typeof(q.type) == "number") {
            q.type_text = p[q.type]
        } else {
            q.type_text = q.type
        }
        return q.type_text
    }
    var c = $.os.version;
    var d = j();
    var b = e();
    var n = $.browser.version;
    var m = "";
    var l = "";
    var o = "";
    var g = E();
    f();

    function f() {
        var p = $.fn.cookie("osType");
        if (p && p != 20) {
            n = $.fn.cookie("ClientAppVersion");
            d = $.fn.cookie("clientInfo");
            b = "yhdapp"
        }
        if (typeof h5tonative != "undefined" && h5tonative.isWireless2()) {
            var s = $.fn.cookie("clientinfo");
            var q = $.fn.cookie("appid");
            b = "yhdapp";
            if (s) {
                try {
                    s = JSON.parse(s);
                    c = s.clientVersion;
                    n = s.clientAppVersion;
                    d = s.clientSystem;
                    if (q != "huawei") {
                        m = s.latitude;
                        l = s.longitude
                    }
                    g = s.nettype;
                    o = s.phoneType
                } catch (r) {}
            }
        }
        if (!d) {
            d = j()
        }
    }
    function j() {
        var r = "iPod|iTouch|iPhone|iPad";
        var p = "Android|BlackBerry|SymbianOS|SymbOS|Windows Phone OS|WAP|Kindle|pad|pod";
        var s = window.navigator.userAgent;
        var t = new RegExp(r, "i");
        var q = new RegExp(p, "i");
        if (t.test(s)) {
            return "IOSSystem"
        } else {
            if (q.test(s)) {
                return "AndroidSystem"
            }
        }
        return navigator.platform
    }
    function e() {
        if ($.browser.chrome) {
            return "br_chrome"
        } else {
            if ($.browser.firefox) {
                return "br_firefox"
            } else {
                if ($.browser.safari || $.browser.webview) {
                    return "safari"
                } else {
                    if ($.browser.ie) {
                        return "br_ie"
                    } else {
                        if ($.browser.uc) {
                            return "br_uc"
                        } else {
                            if ($.browser.baidu) {
                                return "br_baidu"
                            } else {
                                if ($.browser.qq) {
                                    return "br_qq"
                                } else {
                                    if ($.browser.xiaomi) {
                                        return "br_xiaomi"
                                    } else {
                                        if ($.browser.weixin) {
                                            return "weixin"
                                        } else {
                                            return "unknown"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    k.addParameter(new Parameter("container", b));
    k.addParameter(new Parameter("containerVersion", n));
    k.addParameter(new Parameter("platform", d));
    k.addParameter(new Parameter("platVersion", c));
    k.addParameter(new Parameter("netType", g));
    k.addParameter(new Parameter("phoneType", o));
    if (m) {
        k.addParameter(new Parameter("latitude", m))
    }
    if (l) {
        k.addParameter(new Parameter("longitude", l))
    }
    var a = h();
    if (a) {
        a = encodeURIComponent(a);
        trackerContainer.addParameter(new Parameter("infoPageId", a))
    }
    function h() {
        var p = null;
        try {
            if (parent !== window) {
                try {
                    p = parent.location.href
                } catch (q) {
                    p = document.referrer
                }
            }
        } catch (q) {}
        return p
    }
}
setTrackerPublicParams(trackerContainer);
define("abtestPv_tracker", ["base_observer", "biz_loli_page", "tracker_ref_yhd.global_spm"], function (a, f, d) {
    var e = {};
    var b = [];
    a.subscribe("abtestPvEvent", function (j) {
        if (!j) {
            return
        }
        var l = j.data("abtestPvFlag");
        if (l != "1") {
            var k = j.attr("data-abtest") || 0;
            if (k) {
                var o = d.glABcodeToTag(k);
                if (o) {
                    var h = ".";
                    var m = "1";
                    var g = d.getData(j);
                    k = m + h + o;
                    gotracker(2, "abtest-pv", "", g)
                }
            }
            j.data("abtestPvFlag", 1)
        }
    });

    function c() {
        if (typeof(a) == "object") {
            if (b.length > 0) {
                var g = 0;
                while (g < b.length) {
                    if (b[g] && b[g].style && b[g].style.display != "none" && f.page.isVisualByTop(b[g])) {
                        a.fire("abtestPvEvent", $(b[g]));
                        b[g] = null
                    }
                    g++
                }
            }
        }
    }
    e.run = function (g) {
        var h = 200,
            j = null;
        if (g) {
                b = g
            }
        if (b.length < 1) {
                b = $("[data-abtest]")
            }
        setTimeout(function () {
                c()
            }, 500);
        $(window).bind("scroll", function () {
                j && clearTimeout(j);
                j = setTimeout(function () {
                    c()
                }, h)
            })
    };
    return e
});
if (typeof common_globalTimingRely != "undefined" && common_globalTimingRely) {
    common_globalTimingRely.addResource("TRICKERT")
}
if (trackerGetCookie("unionKey")) {
    trackerContainer.addParameter(new Parameter("tracker_u", trackerGetCookie("unionKey")))
}
if (trackerGetCookie("unionType")) {
    trackerContainer.addParameter(new Parameter("tracker_type", trackerGetCookie("unionType")))
}
if (trackerGetCookie("adgroupKeywordID")) {
    trackerContainer.addParameter(new Parameter("adgroupKeywordID", trackerGetCookie("adgroupKeywordID")))
}
if (trackerGetCookie("edmEmail")) {
    trackerContainer.addParameter(new Parameter("edmEmail", trackerGetCookie("edmEmail")))
}
if (trackerGetCookie("yihaodian_uid")) {
    trackerContainer.addParameter(new Parameter("endUserId", trackerGetCookie("yihaodian_uid")))
}
if (trackerGetCookie("abtest")) {
    trackerContainer.addParameter(new Parameter("extField6", trackerGetCookie("abtest")))
}
if (trackerGetCookie("provinceId")) {
    trackerContainer.addParameter(new Parameter("provinceId", trackerGetCookie("provinceId")))
}
if (trackerGetCookie("extField8")) {
    trackerContainer.addParameter(new Parameter("extField8", trackerGetCookie("extField8")))
}
if (trackerGetCookie("extField9")) {
    trackerContainer.addParameter(new Parameter("extField9", trackerGetCookie("extField9")))
}
if (trackerGetCookie("extField10")) {
    trackerContainer.addParameter(new Parameter("extField10", trackerGetCookie("extField10")))
}
var sendTrackerCookie = "";
if (trackerGetCookie("msessionid")) {
    sendTrackerCookie = "msessionid:" + trackerGetCookie("msessionid")
}
if (trackerGetCookie("uname")) {
    sendTrackerCookie += ",uname:" + trackerGetCookie("uname")
}
if (trackerGetCookie("unionKey")) {
    sendTrackerCookie += ",unionKey:" + trackerGetCookie("unionKey")
}
if (trackerGetCookie("unionType")) {
    sendTrackerCookie += ",unionType:" + trackerGetCookie("unionType")
}
if (trackerGetCookie("tracker")) {
    sendTrackerCookie += ",tracker:" + trackerGetCookie("tracker")
}
if (trackerGetCookie("LTINFO")) {
    sendTrackerCookie += ",LTINFO:" + trackerGetCookie("LTINFO")
}
if (sendTrackerCookie) {
    trackerContainer.addParameter(new Parameter("cookie", sendTrackerCookie))
}
if (getQueryStringRegExp("tracker_src")) {
    trackerContainer.addParameter(new Parameter("infoTrackerSrc", getQueryStringRegExp("tracker_src")))
}
if (getQueryStringRegExp("fee")) {
    trackerContainer.addParameter(new Parameter("fee", getQueryStringRegExp("fee")))
}
if (typeof tracker_global != "undefined" && tracker_global) {
    for (var i in tracker_global) {
        trackerContainer.addParameter(new Parameter(i, tracker_global[i]))
    }
}
if (new Date().globalDateFormat) {
    trackerContainer.addParameter(new Parameter("clientTime", encodeURIComponent(new Date().globalDateFormat("yyyy-MM-dd HH:mm:ss S"))))
} else {
    trackerContainer.addParameter(new Parameter("clientTime", new Date().getTime()))
}
function sendPvTrackerInH5() {
    var e = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    function d(k) {
        var j = "";
        for (var h = 0; h < k; h++) {
            var g = Math.floor(Math.random() * 32);
            j += e[g]
        }
        return j
    }
    var c = trackerGetCookie("linkPosition");
    if (c) {
        trackerContainer.addParameter(new Parameter("linkPosition", c));
        trackerClearCookieWithName("linkPosition", c)
    }
    var a = trackerGetCookie("guid");
    if (a) {
        trackerContainer.addParameter(new Parameter("guid", a))
    } else {
        document.cookie = "newUserFlag=1;domain=.yhd.com;path=/";
        var f = new Date();
        f.setTime(f.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
        a = d(36);
        document.cookie = "guid=" + a + ";domain=.yhd.com;path=/;expires=" + f.toGMTString();
        var b = trackerGetCookie("guid");
        if (b != a) {
            a = "guid_" + a
        }
        trackerContainer.addParameter(new Parameter("guid", a))
    }
    require(["tracker_ref_yhd.global_spm"], function (g) {
        if (window.performance && typeof common_globalTimingRely != "undefined" && common_globalTimingRely) {
            var j = -1;
            try {
                var u = new Date().getTime();
                var s = window.performance,
                    w = s.timing;
                j = u - w.navigationStart;
                common_globalTimingRely.setRelyResource("TRICKERT", j)
            } catch (h) {}
        }
        var p = g.getNewPageData();
        if (p && typeof(p) == "object") {
            var o = p.pageTypeId;
            var k = p.pageValue;
            var l = p.unid;
            var m = o + "." + k + ".0.0.0." + l;
            trackerContainer.addParameter(new Parameter("infoPageId", m));
            for (var n in p) {
                trackerContainer.addParameter(new Parameter(n, p[n]))
            }
            if (!p.positionTypeId) {
                trackerContainer.addParameter(new Parameter("positionTypeId", "1"))
            }
        } else {
            trackerContainer.addParameter(new Parameter("positionTypeId", "1"))
        }
        var y = trackerGetCookie("pmInfoId");
        if (y) {
            trackerContainer.addParameter(new Parameter("extField7", y));
            trackerClearCookieWithName("pmInfoId", y)
        }
        var v = trackerGetCookie("productId");
        if (v) {
            trackerContainer.addParameter(new Parameter("productId", v));
            trackerClearCookieWithName("productId", v)
        }
        if ($("#span_server_time_tracker").length > 0) {
            var r = $("#span_server_time_tracker").text();
            trackerContainer.addParameter(new Parameter("serverTime", r))
        }
        var q = new Image(1, 1);
        q.src = trackerContainer.toUrl()
    })
}
$(document).ready(function () {
    if (trackerContainer && trackerContainer.timeout) {
        var b = trackerContainer.timeout;
        setTimeout(function () {
            sendPvTrackerInH5()
        }, b)
    } else {
        sendPvTrackerInH5()
    }
    try {
        require(["abtestPv_tracker"], function (c) {
            c.run()
        })
    } catch (a) {}
});
$(document).ready(function () {
    try {
        var l = [".yihaodianimg.com", ".yhd.com", ".yihaodian.com", "yhd://", "//yhd.bm724.com/forms/index.html", "//api.map.baidu.com", "//static1.baifendian.com/service/yihaodian/yihaodian_sc.js", "//ds.api.baifendian.com"];
        $("#global_top_bar,#footer").find("a[href*='//']").each(function () {
            var a = $.trim($(this).attr("href"));
            if (a.indexOf("?") > 0) {
                a = a.substr(0, a.indexOf("?"))
            }
            if (a.indexOf(".yihaodianimg.com") < 0 && a.indexOf(".yhd.com") < 0 && a.indexOf(".yihaodian.com") < 0 && a.indexOf("yhd://") < 0) {
                l.push(a)
            }
        });
        if (hijackMonitorWhiteUrl && hijackMonitorWhiteUrl.length > 0) {
            var u = $.trim(hijackMonitorWhiteUrl).split(",");
            for (var o = 0; o < u.length; o++) {
                if (turlWhiteTmpList[o] && $.trim(turlWhiteTmpList[o]).length > 0) {
                    l.push($.trim(turlWhiteTmpList[o]))
                }
            }
        }
        function s(a) {
            return (typeof a !== "undefined") && a != null
        }
        function p() {
            var c = null;
            var b = document.getElementsByTagName("meta");
            for (var d = 0; d < b.length; d++) {
                if (b[d].getAttribute("name") == "tp_page") {
                    var a = b[d].getAttribute("content");
                    a = $.trim(a);
                    var e = ".";
                    if (s(a)) {
                        if (a.indexOf(e) > 0) {
                            c = a.split(e);
                            if (c.length == 1) {
                                c.push(0)
                            }
                        } else {
                            if (a.indexOf(e) != 0) {
                                c = [a, 0]
                            }
                        }
                    }
                    break
                }
            }
            return c
        }
        function r(b, d) {
            var a = [];
            if (b && b.length > 0) {
                var c = {};
                b.each(function () {
                    var j = $(this).data("data-judge-hijack");
                    if (j != 1) {
                        var g = $.trim($(this).attr(d));
                        if (g.indexOf("?") > 0) {
                            g = g.substr(0, g.indexOf("?"))
                        }
                        if (c[g] != 1) {
                            var e = true;
                            for (var h = 0; h < l.length; h++) {
                                var f = l[h];
                                if (g.indexOf(f) >= 0) {
                                    e = false;
                                    break
                                }
                            }
                            if (e) {
                                a.push(g);
                                c[g] = 1;
                                $(this).data("data-judge-hijack", 1)
                            }
                        } else {
                            $(this).data("data-judge-hijack", 1)
                        }
                    }
                })
            }
            return a
        }
        function t(j, c, d) {
            if (d.length > 0) {
                var k = 10;
                var b = [];
                var f = "";
                for (var g = 1; g < d.length + 1; g++) {
                    var e = d[g - 1];
                    f += "," + e;
                    if (g % k == 0 || g == d.length) {
                        b.push(f);
                        f = ""
                    }
                }
                for (var h = 0; h < b.length; h++) {
                    var f = b[h];

                    function a(y) {
                        var w = [];
                        w.push(["setCustomVar", "logType", "hijackMonitor"]);
                        w.push(["setCustomVar", "url", encodeURIComponent(j)]);
                        w.push(["setCustomVar", "warnUrl", encodeURIComponent(y)]);
                        w.push(["setCustomVar", "iev", encodeURIComponent(navigator.userAgent || "")]);
                        if (s(c)) {
                            w.push(["setCustomVar", "pageTypeId", c[0] || 0]);
                            w.push(["setCustomVar", "pageValue", c[1] || 0])
                        } else {
                            w.push(["setCustomVar", "pageTypeId", 0]);
                            w.push(["setCustomVar", "pageValue", 0])
                        }
                        if (window.EventEntity && window.EventEntity.notifyLogSend) {
                            if (!window.EventEntity.paramObj) {
                                window.EventEntity.paramObj = {}
                            }
                            if (!window.EventEntity.paramObj.logSendEvent) {
                                window.EventEntity.paramObj.logSendEvent = []
                            }
                            window.EventEntity.paramObj.logSendEvent.push(w);
                            window.EventEntity.notifyLogSend()
                        }
                    }
                    setTimeout(a(f), 0)
                }
            }
        }
        function n(a, b) {
            var e = [];
            var c = $("script[src*='//'],iframe[src*='//']");
            var d = $("a[href*='//']");
            if (c && c.length > 0) {
                e = e.concat(r(c, "src"))
            }
            if (d && d.length > 0) {
                e = e.concat(r(d, "href"))
            }
            t(a, b, e)
        }
        function q() {
            var b = location.href;
            if (s(b)) {
                var e = p();
                n(b, e);
                try {
                    var g = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    var f = document.body;
                    var d = new g(function (h) {
                        n(b, e)
                    });
                    var c = {
                        childList: true
                    };
                    d.observe(f, c)
                } catch (a) {}
            }
        }
        if (hijackMonitorFlag) {
            q()
        }
    } catch (m) {}
});