const twitterbot = require('./twitterbot');
const Images = require('./src/images');
const ReplyTweet = require('./src/tweets/reply_tweet');
const RequestTweet = require('./src/tweets/request_tweet');

twitterbot.on('tweet_create_events', function(payload){

  let request_tweet = new RequestTweet(payload);
  console.log(request_tweet.getText());
  console.log('should reply: ' + request_tweet.shouldReply());

  if (request_tweet.shouldReply()) {
    let image = new Images().getFromText(request_tweet.getText());
    if (!image) { return; }

    let reply_tweet = new ReplyTweet(request_tweet, image);
    
    console.log(reply_tweet.getText());
    
    twitterbot.twit.post('statuses/update', {
    status: reply_tweet.getText(),
    in_reply_to_status_id: reply_tweet.id_str,
    auto_populate_reply_metadata: true
  }, function(err, data, response) {
    if (err){
      console.log('Error', err);
    }
  }); 
  }
});
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json

    Documentation for POST statuses/update:
    https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html
  */

/*
  See code samples inside the examples folder. Happy tweeting!
*/

twitterbot.on('direct_message_events', function(dm){

});

const dashboard = require('./dashboard')(twitterbot);