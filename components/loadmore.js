"use strict";
var Loadmore = {
  template: "\n\t<article  id=\"list\">\n\t   <slot></slot>\n\t</article>\n\t",
  mounted: function() {
    var $__2 = this;
    window.onscroll = function() {
      if ($__2.getScrollTop() + $__2.getClientHeight() >= $__2.getScrollHeight()) {
        if (!document.getElementById('noData')) {
          $__2.$emit('loadmore');
        }
      }
    };
  },
  data: function() {
    return {};
  },
  methods: {
    getScrollTop: function() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    getClientHeight: function() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
    },
    getScrollHeight: function() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }
};
