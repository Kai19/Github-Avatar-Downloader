var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

//implemented command line arguments at the start by accident

const GITHUB_USER =  process.argv[2];
const GITHUB_TOKEN = process.argv[3];

function getRequestOptions(path) {
  return {
    url: path,
    headers: {
      'User-Agent': "GitHub Avatar Downloader - Student Project"
    },
    qs: {
      accessToken: GITHUB_TOKEN
    }
  };
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream("./" + filePath + ".jpg"));
}


function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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
    downloadImageByURL(obj.avatar_url, obj.login);
  });
};


if(GITHUB_USER === undefined || GITHUB_TOKEN === undefined){
  console.log("Unable to run function. Please input GITHUB_USER & GITHUB_TOKEN in command line.");
}else{
  getRepoContributors("jquery", "jquery", imageConsoleLog);
}

