
$(document).on("ready",function(){
  $(".js-btn-search").on("click", getSong);
});

var getSong = function (){
  $('.title').empty();
  $('.author').empty();
  var title = $('.input_search').val().replace(" ","%20");
  var request = $.get('https://api.spotify.com/v1/search?type=track&q='+title);
  // debugger
  request.fail(handleError);
  request.done(show_artist);
};

function handleError (error){
  console.log(error);
  $(".error").text("Error: Sorry song title not found!!");
};

function show_artist (response){
  console.log(response);
      if (response.tracks.items.length === 0){
        $('.errors').append("<a class='error label label-primary'> NO TRACKS FOUND</a>");
      }
      else {
        $('.title').text(response.tracks.items[0].name)
        $('.author').text(response.tracks.items[0].artists[0].name)
        $('.album_cover').attr("src",response.tracks.items[0].album.images[0].url)
        $('.js-player').attr("src",response.tracks.items[0].preview_url)
      }
    $('.btn-play').on('click', function(){

      if ($('.btn-play').hasClass("disabled")){
        $('.btn-play').removeClass("disabled")
        $('.js-player').trigger("play");
      }
      else {
        $('.btn-play').addClass("disabled")
        $('.js-player').trigger("pause");
      }

    });
};
