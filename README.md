# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Built using HTML, CSS, JS, jQuery and AJAX for front-end, with Node, Express and MongoDB for the back-end.

## Expected Usage

This program requires several dependencies and should be installed:

`node install`

This program should be executed from the command line, in the following manner:

`npm run local`

## Features

1. Click compose to send out new tweets!
2. View tweets in descending order so the newest is at the top.
3. Animated buttons available to like, retweet or flag tweets!
4. Random information generated to simulate multiple users.
5. Tweets saved to a local Mongo DB.
6. Keeps track of the tweet length, ensuring 140 characters or less and notifying the user of any problems.

## Dependencies

- Express
- Node 5.10.x or above
- Moment

## Screenshots
View all tweets on the home page!
!["Screenshot of tweeter home page"](https://github.com/d-mclean/tweeter/blob/master/docs/home-page.png)

Tweets scroll vertically across the page for easy reading.
!["Screenshot of multiple tweets"](https://github.com/d-mclean/tweeter/blob/master/docs/multiple-tweets.png)

Compose new tweets!
!["Screenshot of a new tweet being composed"](https://github.com/d-mclean/tweeter/blob/master/docs/new-tweet.png)

Basic warning system to invalid tweets.
!["Screenshot of tweet error handling"](https://github.com/d-mclean/tweeter/blob/master/docs/new-tweet-error.png)

Flag bad tweets!
!["Screenshot of flagging a tweet"](https://github.com/d-mclean/tweeter/blob/master/docs/flag-tweet.png)

Retweet interesting tweets!
!["Screenshot of retweeting"](https://github.com/d-mclean/tweeter/blob/master/docs/retweet-tweet.png)

Like your favourite tweets!
!["Screenshot of liking a tweet"](https://github.com/d-mclean/tweeter/blob/master/docs/like-tweet.png)

## Acknowledgements

Originally forked from lighthouse-labs/tweeter:
<https://github.com/lighthouse-labs/tweeter>