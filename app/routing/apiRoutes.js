var friendsData = require("../data/friends.js");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate Javascript array
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // store newly submitted scores to var
    var subScores = req.body.scores;
    var smallDif = 50;
    var bestMatch;
    //loop through all people in friends.js
    for (var i = 0; i < friendsData.length; i++) {
      var compareScores = friendsData[i].scores;
      var scoreDifferences = [];
      // loop through each score, pushing the difference between the two into new array
      for (var j = 0; j < compareScores.length; j++) {
        scoreDifferences.push(Math.abs(compareScores[j] - subScores[j]));
      };
      // add score differences together to get final difference
      var sum = scoreDifferences.reduce(add, 0);
      function add(a, b) {
          return a + b;
      }

      // if it is smaller than the previous low score, set it as the match
      if (sum < smallDif) {
        smallDif = sum;
        bestMatch = friendsData[i];
      }

    }
    //send the match info to the user
    res.json(bestMatch);

    //then push the new submission to the friend.js array
    friendsData.push(req.body);

  });
};
