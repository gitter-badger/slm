(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Ctx"] = factory();
	else
		root["Ctx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ampRe = /&/g;
	var escapeRe = /[&<>"]/;
	var gtRe = />/g;
	var ltRe = /</g;
	var quotRe = /"/g;

	function safe(val) {
	  if (!val || val.htmlSafe) {
	    return val;
	  }

	  var res = new String(val);
	  res.htmlSafe = true;
	  return res;
	}

	function escape(str) {
	  if (typeof str !== 'string') {
	    if (!str) {
	      return '';
	    }
	    if (str.htmlSafe) {
	      return str.toString();
	    }
	    str = str.toString();
	  }

	  if (escapeRe.test(str) ) {
	    if (str.indexOf('&') !== -1) {
	      str = str.replace(ampRe, '&amp;');
	    }
	    if (str.indexOf('<') !== -1) {
	      str = str.replace(ltRe, '&lt;');
	    }
	    if (str.indexOf('>') !== -1) {
	      str = str.replace(gtRe, '&gt;');
	    }
	    if (str.indexOf('"') !== -1) {
	      str = str.replace(quotRe, '&quot;');
	    }
	  }

	  return str;
	}

	function rejectEmpty(arr) {
	  var res = [];

	  for (var i = 0, l = arr.length; i < l; i++) {
	    var el = arr[i];
	    if (el !== null && el.length) {
	      res.push(el);
	    }
	  }

	  return res;
	}

	function flatten(arr) {
	  return arr.reduce(function (acc, val) {
	    if (val === null) {
	      return acc;
	    }
	    return acc.concat(val.constructor === Array ? flatten(val) : val.toString());
	  }, []);
	}

	function Ctx() {
	  this.reset();
	  this.template = this.basePath = null;
	}

	Ctx.cache = {};

	var CtxProto = Ctx.prototype;

	/*
	  Prepare ctx for next template rendering
	*/
	CtxProto.reset = function() {
	  this._contents = {};
	  this.res = '';
	  this.stack = [];
	  this.m = null;
	};

	/*
	  Pop stack to sp
	*/
	CtxProto.pop = function(sp) {
	  var l = this.stack.length;
	  var filename = this.filename;
	  while (sp < l--) {
	    var path = this._resolvePath(this.stack.pop());
	    var fn = this._load(path);
	    this.filename = path;
	    fn.call(this.m, this);
	  }
	  this.filename = filename;
	  return this.res;
	};

	CtxProto.partial = function(path, model, cb) {
	  if (cb) {
	    this.res = cb.call(this.m, this);
	  }

	  path = this._resolvePath(path);

	  var f = this._load(path), oldModel = this.m, filename = this.filename;
	  this.filename = path;
	  var res = safe(f.call(this.m = model, this));
	  this.m = oldModel;
	  this.filename = filename;
	  return res;
	};

	CtxProto.extend = function(path) {
	  this.stack.push(path);
	};

	CtxProto.content = function() {
	  switch(arguments.length) {
	    case 0:
	      return safe(this.res);
	    case 1:
	      return this._contents[arguments[0]] || '';
	    case 2:
	      var name = arguments[0], cb = arguments[1];
	      if (name) {
	        // capturing block
	        this._contents[name] = cb.call(this.m);
	        return '';
	      } else {
	        return cb.call(this.m);
	      }
	  }
	};

	module.exports = {
	  Ctx: Ctx,
	  escape: escape,
	  flatten: flatten,
	  rejectEmpty: rejectEmpty,
	  safe: safe
	};


/***/ }
/******/ ])
});
