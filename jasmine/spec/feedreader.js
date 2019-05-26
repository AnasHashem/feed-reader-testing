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
    
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it(`URLs' are defined`, function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        it(`names' are defined`, function() {
            for (const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    describe(`The menu`, function(){

        it ('is hidden', function() {
            let bodyElement = document.getElementsByTagName('body')[0];
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });

        it(`toggles visibility`, function() {
            let bodyElement = document.getElementsByTagName('body')[0];
            let icon = document.querySelector('a.menu-icon-link');
            icon.dispatchEvent(new Event('click'));
            expect(bodyElement.classList.contains('menu-hidden')).toBe(false);
            icon.dispatchEvent(new Event('click'));
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });
    });
         

    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are there', function() {
            let feed = document.getElementsByClassName('feed')[0];
            expect(feed.getElementsByClassName('entry').length).toBeGreaterThan(0);
        });
    });
        
    
    describe('New Feed Selection', function() {
        let feed;

        beforeEach(function(done){
            loadFeed(0, function(){
                feed = document.querySelector('.feed').innerHTML; //Original Feed
                loadFeed(1, done);
            });
        });

        it('content changes', function() {
            //feed should've been change by now ..
            expect(document.querySelector('.feed').innerHTML).not.toBe(feed);
        });
    });
}());
