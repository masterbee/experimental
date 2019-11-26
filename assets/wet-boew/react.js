define(function() {

function wb5React(dataObj) {
    var signals = {};
    var templates = {}; // Cached template
    var tmplsDefault = {}; // Default template
  
    observeData(dataObj);
  
    return {
      data: dataObj,
      observe: observe,
      notify: notify,
      template: template,
      tmplDefault: tmplDefault,
      debug_signals: signals
    };
  
    function observe(property, signalHandler) {
  
      if (!signals[property]) signals[property] = [];
  
      signals[property].push(signalHandler);
    }
  
    function notify(signal) {
      if (!signals[signal] || signals[signal].length < 1) return;
  
      signals[signal].forEach(function (signalHandler) {
        return signalHandler();
      });
    }
  
    function template( name, template ) {
        if ( !template ) {
            // Getter
            return templates[name] || false;
        } else {
            // Setter
            templates[name] = template;
        }
    }
  
    function tmplDefault( name, template ) {
        if ( !template ) {
            // Getter
            return tmplsDefault[name] || false;
        } else {
            // Setter
            tmplsDefault[name] = template;
        }
    }
  
    function makeReactive(obj, key, keyPrefix) {
      var val = obj[key];
  
      if ( Array.isArray( val) ) {
          // Just make reactive those special properties
          val.wbLen = parseInt( val.length ); // Length of the array (Updated before an iteration happend on it)
          val.wbActive = 0; // Number of items that was identified being "True"
  
          makeReactive( val, "wbLen", key );
          makeReactive( val, "wbActive", key );
          return;
      }
  
      Object.defineProperty(obj, key, {
        get: function get() {
          return val;
        },
        set: function set(newVal) {
          val = newVal;
          notify( !keyPrefix ? key : keyPrefix + "." + key );
        }
      });
    }
  
    function observeData(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          makeReactive(obj, key);
        }
      }
      // We can safely parse the DOM looking for bindings after we converted the dataObject.
      // parseDOM(document.body, obj);
    }
  
    function syncNode(node, observable, property) {
      node.textContent = observable[property];
      // We remove the `Seer.` as it is now available for us in our scope.
      observe(property, function () {
        return node.textContent = observable[property];
      });
    }
  
    function parseDOM(node, observable) {
      var nodes = document.querySelectorAll('[s-text]');
  
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
  
      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _node = _step.value;
  
          syncNode(_node, observable, _node.attributes['s-text'].value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }
  return wb5React;
});