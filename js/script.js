
/*
var X;



let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
  'api-key': "82f12f3e4189492f86578cb2d4e6add0"
});
alert('test');

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) { 
  var newsCounter = 0
for ( var i=0;i < data.results.length;  i++){

let abstract = data.results[i].abstract;
let artUrl = data.results[i].url;
let imgUrl = data.results[i].multimedia[4].url;
if  (data.results[i].multimedia < 4){
  continue;
}

console.log(abstract);
console.log(artUrl);
console.log(imgUrl)


$(".artcontainer").append('<a href=""><div><p>test</p></div>></a>');
$('.article').append('<a href="'+ artUrl +'" class="link"><img src="' + imgUrl + '"class="img" /><h1 class="abstract">' + abstract + '</h1></a>');

newsCounter ++ ;
if (newsCounter >= 12){
  break;
}

}


}).fail(function(err) {
  throw err;
});


*/

$(function () {
  $('select').on('change', function (e) {
      const section = $(this).val();
      $('.articles').empty();

      if (section) {
          $('.container').addClass('loaded');
          const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=82f12f3e4189492f86578cb2d4e6add0`;
          $.ajax({
              url: url,
              method: 'GET',
          }).done(function (data) {
              let i = 0;
              let articleAdded = 0;
              while (i < data.results.length && articleAdded < 12) {
                  i++;
                  let currentResult = data.results[i];
                  if (currentResult.multimedia.length) {
                      articleAdded++;
                      let abstract = currentResult.abstract;
                      let artUrl = currentResult.url;
                      let imgUrl = currentResult.multimedia[4].url;
                      $('.articles').append(`
                          <div class="articleContainer">
                              <a href="${artUrl}">
                                
                                  <p>${abstract}</p>
                              </a>
                          </div>`);
                          $('.articleContainer').last().css("background-image", 'url('+ imgUrl +')');
                  }
              }
          }).fail(function (err) {
              throw err;
          });

      } else {
          $('.container').removeClass('loaded');
      }

  })
});

