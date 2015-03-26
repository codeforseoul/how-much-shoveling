(function (document) {
  'use strict';

  var DEFAULT_ROUTE = '/';
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  //app.appName = 'Shoveling';
  app.pages = [
    {name: '건설 재정 통계', route: '/'},
    {name: '전국 시/도별 비교', route: '/compare'},
    {name: '건설 지역 지도', route: '/map'}
  ];

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Our app is ready to rock!');

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
    if (detail.isSelected) {
      document.querySelector('#drawer-panel').closeDrawer();
    }
  };
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
