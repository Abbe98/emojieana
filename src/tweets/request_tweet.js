'use strict';

class RequestTweet {
  constructor(payload) {
    this.payload = payload;
  }

  shouldReply() {
    console.log('isMentioned: ' + this.isMentioned());
    console.log('isRetweet: ' + this.isRetweet());
    return this.isMentioned() && !this.isRetweet();
  }

  getText() {
    return this.payload.text;
  }

  getStatusID() {
    return this.payload.id_str;
  }

  getScreenName() {
    return this.payload.user.screen_name;
  }

  isMentioned(screen_name) {
    screen_name = screen_name || process.env.BOT_USERNAME;
    let mentions = this.payload.entities.user_mentions;

    return !!mentions.find((mention) => {
      return mention.screen_name === screen_name;
    });
  }

  isRetweet() {
    return !!this.payload.retweeted_status;
  }
}

module.exports = RequestTweet;
