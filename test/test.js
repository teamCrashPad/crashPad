var Nightmare = require("nightmare");
var expect = require("chai").expect;


 it("should not go to page but return a JSON error", function(done){
	new Nightmare({ show: true })
	  .goto("http://www.studentcrashpads.com/landlord")
	  .wait("body")
	  .evaluate(function() {
	    return JSON.parse(document.body.innerText);
	  })
	  .end()
	  .then(function(result) {
	    expect(JSON.stringify(result)).to.equal('{"error":"You must log in!"}');
	    done();
	  })
	  .catch(function(error) {
	    console.error("Search failed:", error);
	  });

});
