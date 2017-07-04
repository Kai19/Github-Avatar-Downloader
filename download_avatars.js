var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


const GITHUB_USER =  process.argv[2];
const GITHUB_TOKEN = process.argv[3];

function getRequestOptions(path) {
  return {
    url: path,
    headers: {
      'User-Agent': "GitHub Avatar Downloader - Student Project"
    },
    qs: {
      access_token: GITHUB_TOKEN
    }
  };
}



function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  request(getRequestOptions(requestURL), function(err, response, body) {
    if (err){
    console.log("Failed to request URL");
    }else{
      const data = JSON.parse(body);
      cb(data);
    }
  });
}

var imageConsoleLog = (data) => {
  data.forEach((obj) => {
    console.log(obj.avatar_url);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream("./" + filePath + ".jpg"));
}

getRepoContributors("jquery", "jquery", imageConsoleLog);