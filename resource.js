
(function() {

function lazyLoadImgs() {
	var a=document.querySelectorAll("[data-img-scroll] img[data-img]");
	for(var i=0;i<a.length;i++) {
		a[i].setAttribute('data-img',a[i].src);
		a[i].src='data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
	}
}
lazyLoadImgs();

function addhandler(elem, type, func) {
    if ( elem.addEventListener ) {
        elem.addEventListener(type, func, false);
    }
    else if ( elem.attachEvent ) {
        elem.attachEvent("on" + type, func);
    }
}

/*
	scripts: []
		url:
			script url
		phase:
			-1: not loaded
			0:	loading
			1:	loaded

	callbacks: []
		keys: []
			scripts
		fns: []
			functions
		runned:
			bool
*/
function resources(options) {
	var scripts = [];
	var callbacks = [];
	var supportGoogle = !!(options && options.google);

	return {
		append: append,
		load: function(fn) {
			scripts.forEach(function(script) {
				if (script.phase === -1) {
					script.phase = 0;
					fn(script.url, function() {
						script.phase = 1;
						runCallback();
					});
				}
			});
		},
	};

	function runCallback() {
		callbacks.forEach(function(callback) {
			if (!callback.runned && callback.keys.every(function(url) {return url.phase === 1;})) {
				callback.runned = true;
				callback.fns.forEach(function(fn) {fn();});
			}
		});
	}

	function add(url) {
		scripts.push({'url': url, phase: -1});
	}
	function append(args) {
		var fns = [];
		var urls = []
		for (var i = 0; i < args.length; i++) {
			var arg = args[i];
			if (typeof arg === 'function') {
				fns.push(arg);
			} else {
				if (!has(arg)) {
					add(arg);
				}
				var script = get(arg);
				urls.push(script);
			}
		}
		if (urls.every(function(url){
			return url.phase === 1;
		})) {
			fns.forEach(function(fn){fn();});
		} else {
			fns.length > 0 && callbacks.push({keys: urls, 'fns': fns, runned: false});
		}
	}
	function get(url) {
		var result;
		scripts.forEach(function(script) {
			if (match(url, script.url)) {
				return result = script;
			}
		});
		return result;
	}
	function has(url) {
		return scripts.some(function(script){return match(script.url, url);});
	}
	function match(a, b) {
		if (supportGoogle) {
			return a.indexOf(b) >= 0 || b.indexOf(a) >= 0;
		}
		return a === b;
	}
}


/*
	var loadjs = loadJS();
	loadjs(url1, url2, fn1, url3, fn2);
	loadjs(url1);
	loadjs(url1, url4, fn3);
*/

function loadJS(){
	var res = resources({google: true});

	return function() {
		res.append(arguments);
		res.load(load);
	};

	function load(url, fn){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		if (fn) {
			var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.indexOf("msie")>-1) {
				script.onreadystatechange=function(){
					if((script.readyState==="loaded"||script.readyState==="complete")&&!script.loaded){
						fn(url);
						script.onload=script.onreadystatechange=null
					}
				};
			}
			else {
				script.onload=function(){
					fn(url);
					script.onload=script.onreadystatechange=null;
				}
			}
		}
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}

var Movoto = window.Movoto={LoadJS:loadJS()};

var googleUrl = 'http://maps.google.com/maps/api/js?v=3.3&libraries=places&' + context.googleMapKey;
var jqUrl = context.staticUrl + 'javascripts/desktop/libs/jquery.all.min.js';

var ress = [movotoUrl, mapUrl, jquiUrl];

var map_templates = [
	//_card.js
	'/tpls/search/components/desktop/mapview/views/agent.ejs',
	'/tpls/search/components/desktop/mapview/views/card.ejs',
	//_disclaimers.js
	'/tpls/search/components/desktop/mapview/views/disclaimers.ejs?tmp=1',
	//_mapcard.js
	'/tpls/search/components/desktop/mapview/views/mapcard.ejs',
	//'/tpls/search/components/desktop/mapview/views/card.ejs',
	//_mapoverlay.js
	'/tpls/search/components/desktop/mapview/views/mappin.ejs',
    '/tpls/search/components/desktop/mapview/views/multicard.ejs',
	//_pagination.js
	'/tpls/search/components/desktop/mapview/views/pagination.ejs',
	//More Filters
	'/tpls/search/components/desktop/mapview/views/morefilters.ejs',
	//page header
	'/tpls/components/desktop/include/rightmenu.ejs'	
];

var movotoUrl = context.staticUrl + 'javascripts/desktop/movoto.js';
var mapUrl = context.staticUrl + 'javascripts/desktop/map.js';
var jquiUrl = context.staticUrl + 'javascripts/desktop/libs/jquery.ui.js';

addhandler(document, 'DOMContentLoaded', function() {
	//Movoto.LoadJS(jqUrl, function(){
		Movoto.LoadJS(movotoUrl, mapUrl, jquiUrl, function(){
        	$(document).trigger('dom.load');
			window.startMap();
		});
		//Movoto.LoadJS(movotoUrl, mapUrl);
	//});
});

addhandler(window, 'load', function() {
	setTimeout(function() {
		map_templates.forEach(function(tmp){
			setTimeout(function() {
				new EJS({url: tmp});
			}, 50);
		});
	}, 0);

	setTimeout(loadadv, 100);
});

function loadadv() {	
	//advertise
	window.googletag = window.googletag || {};
	googletag.cmd = googletag.cmd || [];
	(function() {
		var gads = document.createElement('script');
		gads.async = true;
		gads.type = 'text/javascript';
		var useSSL = 'https:' == document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') +
		'//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);
	})();
}



// prevent google from loading roboto font, so that font will not flush
var head = document.getElementsByTagName('head')[0];
var insertBefore = head.insertBefore;
head.insertBefore = function (newElement, referenceElement) {
    if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') >= 0) {
        console.info('Prevented Roboto from loading!');
        return;
    }
    insertBefore.call(head, newElement, referenceElement);
};

})();
