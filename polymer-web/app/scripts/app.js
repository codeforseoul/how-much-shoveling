(function (document) {
  'use strict';

  var DEBUG = true;

  var DEFAULT_ROUTE = '/';
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var ajax, pages;
  var cache = {};
  //app.appName = 'Shoveling';
  app.pages = [
    {
      name: '건설 재정 통계',
      icon: 'account-balance',
      route: '/',
      desc: '',
      url: '/info.html'
    }
    , {
      name: '전국 시/도별 비교',
      icon: 'image:compare',
      route: '/compare',
      desc: '',
      url: '/compare.html'
    }
    , {
      name: '건설 지역 지도',
      icon: 'maps:map',
      route: '/map',
      desc: '나라 장터에 체결된 계약 정보입니다',
      url: '/map.html'
    }
  ];

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    if (DEBUG) console.log('Our app is ready to rock!');

    ajax = document.querySelector('#ajax');
    pages = document.querySelector('#pages');

    this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  });


  function info() {
    app.route = '/';
  }
  function compare() {
    app.route = '/compare';
  }
  function map() {
    app.route = '/map';
  }

  // define routes
  page('/', info);
  page('/compare', compare);
  page('/map', map);

  // configure
  page({ hashbang: true });
  //page.base('');

  app.menuItemSelected = function(e, detail, sender) {
    // Need to wait one rAF so <core-ajax> has it's URL set.
    this.async(function() {
      if (!cache[ajax.url]) {
        ajax.go();
      }

      document.querySelector('#drawer-panel').closeDrawer();
    });

  };

  app.ajaxLoad = function(e, detail, sender) {
    e.preventDefault(); // prevent link navigation.
  };

  app.onResponse = function(e, detail, sender) {
    var article = detail.response.querySelector('#content');

    // Fix up image paths to not be local.
    [].forEach.call(article.querySelectorAll('img'), function(img) {
      img.setAttribute('src', img.src);
    });

    var html = article.innerHTML;

    cache[ajax.url] = html; // Primitive caching by URL.

    this.injectBoundHTML(html, pages.selectedItem.firstElementChild);
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
