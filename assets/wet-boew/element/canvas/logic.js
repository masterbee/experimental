/**
 * Canvas profiling JS
 */
define(['highlight','css!//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/default.min'] , function () {

  return {
    init: function( element )
    {
      var _class = ( element.hasAttribute('language') ) ? element.getAttribute('language') : 'plaintext';
      element.innerHTML =  '<code class="' + _class + '">' + element.innerHTML + '</code>';
      window.hljs.highlightBlock(element);
    }
  }
});