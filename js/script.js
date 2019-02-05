$(function () {
    $('select').on('change', function (e) {
        const section = $(this).val();
        $('.articles').empty();

        if (section) {
            $('.container').addClass('loaded');
            const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=Z4Q0RWspjL4d7O2pBfSjdkmRjJZp7WNF`;
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
                        $('.articles').append(`<div class="articleContainer">
                              <a href="${artUrl}">
                                
                                  <p>${abstract}</p>
                              </a>
                          </div>`);
                        $('.articleContainer').last().css("background-image", 'url(' + imgUrl + ')');
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