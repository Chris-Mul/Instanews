var url = "https://api.nytimes.com/svc/topstories/v2/.json";
url += '?' + $.param({
  'api-key': "82f12f3e4189492f86578cb2d4e6add0"
});

console.log("test");
console.log($("select").val());

$("select").on("change", function () {
  var url = "https://api.nytimes.com/svc/topstories/v2/" + $("select").val() + ".json";
  url += '?' + $.param({
    'api-key': "82f12f3e4189492f86578cb2d4e6add0"
  });

  console.log(url);

  console.log($("select").val());

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function (result) {
    console.log(result);
  }).fail(function (err) {
    throw err;
  });


});



