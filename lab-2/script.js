(function() {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    // 1.2.2
    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }

    // 1.2.3
    var threshold = 500;
    console.log("---- Additional Functionality: Greeting based on ASCII sum ----");

    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var asciiSum = 0;

        for (var j = 0; j < name.length; j++) {
            asciiSum += name.charCodeAt(j);
        }

        if (asciiSum > threshold) {
            console.log("ASCII sum of " + name + " is " + asciiSum + " which is greater than " + threshold + ". Special Hello!");
        } else {
            console.log("ASCII sum of " + name + " is " + asciiSum + ".");
        }
    }
})();
