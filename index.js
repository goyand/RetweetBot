const express = require('express');

var Twit = require('twit');

var fs = require('fs');
var path = require('path');
var Twit = require('twit');
var config = require(path.join(__dirname, 'config.js'));

const isDevelopment = process.env.ENV === 'development';

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = isDevelopment ?
    `http://localhost:${DEFAULT_PORT}` :
    'https://agile-island-75017.herokuapp.com/';

const app = express();
var T = new Twit(config);

// function random_from_array(images){
//     return images[Math.floor(Math.random() * images.length)];
// }

// function upload_random_image(images) {
//     console.log('Opening an image...');
//     var image_path = path.join(__dirname, '/images/' + random_from_array(images))
//     var b64content = fs.readFileSync(image_path, { encoding: 'base64' });

//     console.log('Uploading an image...');
    
//     T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//         // now we can assign alt text to the media, for use by screen readers and
//         // other text-based presentations and interpreters
//         // var mediaIdStr = data.media_id_string
//         // var altText = "Small flowers in a planter on a sunny balcony, blossoming."
//         // var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

//         if (err) {
//             console.log('ERROR:', err);
//         } else {
//             console.log('Image uploaded!');

//             console.log('Now tweeting it...');

//             T.post('statuses/update', {media_ids: new Array(data.media_id_string)}, function(err, data, response) {
//                 if (err) {
//                     console.log('ERROR: ',err);
//                 } else {
//                     console.log('Posted an image!');
//                 }
//             })
//         }
//     })      
// }

// fs.readdir(__dirname + '/images', function(err, files) {
//     if (err){
//       console.log(err);
//     }
//     else{
//       var images = [];
//       files.forEach(function(f) {
//         images.push(f);
//       });
  
//       setInterval(function(){
//         upload_random_image(images);
//       }, 40000);
//     }
// });


var users = ["1074502055589343232, 1024038145443151872", "894231710065446912", "1333467482", "1022151998756384768"];

var stream = T.stream('statuses/filter', {follow: users});

stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
            console.log(data)
        })
    }
})

// T.post('statuses/update', { status: 'test1' }, function(err, data, response) {
//     console.log(data)
// })

// T.get('search/tweets', { q: 'BitMart since:2019-05-01', count: 100 }, function(err, data, response) {
//     console.log(data)
// })

// T.get('followers/ids', { screen_name: 'bitmartjapan' },  function (err, data, response) {
//     console.log(data)
// })


const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening at a localhost${PORT}`);
})