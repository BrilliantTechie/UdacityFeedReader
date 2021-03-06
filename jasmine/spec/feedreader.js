/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', () => {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL are defined and is not empty', function() {

           allFeeds.forEach((feed) =>{
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });

         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Name are defined and is not empty', function() {
           allFeeds.forEach((feed) => {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', () => {
      // targeted DOM elements assigned to variables for use in the Meny suite
      const body = $('body');
      const mIcon = $('a.menu-icon-link');
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu element is hidden', () => {
           expect(body.hasClass('menu-hidden')).toBe(true);
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when clicked', function() {

            mIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false); // checks if menu opens when clicked
            mIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true); // checks if menu closes on second click

          });


    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', () => {
      // targeted DOM element assigned to a variable for use in the Meny suite
      const container = $('.feed');
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach((done) => {
           loadFeed(0, done);
         });

         it('if feed entry element in feed container', function() {
           expect(container.children().children().hasClass('entry')).toBe(true);
         });

    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
      //declare variables for first and second (updated) feed
      let currentFeed;
      let newFeed;
          /* Test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          */
      beforeEach(function(done) {

        loadFeed(0, () => {
          currentFeed = $('.feed').html(); // loading first feed
          loadFeed(1, () => {
            newFeed = $('.feed').html(); // loading new feed
            done();
          });
        });

      });

      it('content changes when new feeds loaded', function() {
        expect(currentFeed).not.toBe(newFeed); // checking if the feeds are different
      });
      
    });

}());
