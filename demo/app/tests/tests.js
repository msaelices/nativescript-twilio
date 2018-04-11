var Twilio = require("nativescript-twilio").Twilio;
var twilio = new Twilio();

describe("greet function", function() {
    it("exists", function() {
        expect(twilio.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(twilio.greet()).toEqual("Hello, NS");
    });
});