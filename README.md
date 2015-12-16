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

seo

1. half spa, page load load cards, filters, results, paginations, headers, seo info. lazy load google map
2. after page load, spa

resource.js

1. lazyloadimg:  how to lazy load image in a high seo req page
2. loadjs
3. preloadtemplates
4. arrange resource loading order
5. 
