(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Shoveling';
  //app.route = 'info';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Our app is ready to rock!');
  });
  
  
  function info() {
    app.route = 'info';
  }
  function compare() {
    app.route = 'compare';
  }
  function map() {
    app.route = 'map';
  }
  
  // define routes
  page('/', info);
  page('/compare', compare);
  page('/map', map);
  
  // configure
  page({ hashbang: true });
  //page.base('');
  

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
