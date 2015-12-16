# resource
Some resource loading experiments when I'm work on map search page in Movoto.

http://www.movoto.com/san-jose-ca/

html/css

1. multi-layer card: info, fav, arrow, page, tag, mask, loading, hotlead, mls
2. seo info
3. responsive card
4. minify card dom structure

js

1. modular by injector
2. cache: multi-strategies, two layers
3. debounce: multi-action in short time, only trigger last one. support multi-fn share same timeout
4. rebounce: when multi-ajax/promise-actions triggered by user, cancel previous actions, only apply the last one. support different action types, keyed by fn.prototype
5. zero impact on global(windwo)

seo

1. half spa, page load load cards, filters, results, paginations, headers, seo info. lazy load google map
2. after page load, spa
3. because of half spa, same logic code need to be shared between backend & frontend

resource.js

1. lazyloadimg:  how to lazy load image in seo page
2. loadjs: concurrency download, load multi-times, multi-callbacks

/*
	var loadjs = loadJS();
	loadjs(url1, url2, fn1, url3, fn2);
	loadjs(url1);
	loadjs(url1, url4, fn3);
*/

3. arrange resource loading order
4. pre-load templates
5. pre-load imgs

