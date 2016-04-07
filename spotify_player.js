
$(document).on("ready",function(){
  $(".js-btn-search").on("click", getSong);
  // Have printTime be called when the time is updated
  $('.js-player').on('timeupdate', printTime);
});

var getSong = function (){
  $('.title').empty();
  $('.author').empty();
  var title = $('.input_search').val().replace(" ","%20");
  var request = $.get('https://api.spotify.com/v1/search?type=track&q='+title);
  request.fail(handleError);
  request.done(show_artist);
};

function handleError (error){
  console.log(error);
  $(".error").text("Error: Sorry song title not found!!");
};

function show_artist (response){
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

    // response.tracks.items[0].artists[0].id
    getArtist(response.tracks.items[0].artists[0].href)
};

// Define a function to print the player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
  $('.progress_bar').attr("value",current);
}

var getArtist = function(href) {
  var request = $.get(href);
  request.fail(handleError);
  request.done(show_artist_info);
}

function show_artist_info (response){
  console.log(response);
  $('.author').on('click', function(){
    $('.js-modal').modal("show");
  });

  $('.artist_name').empty();
  $('.artist_name').append("<div>name: "+response.name+
  "</div>\n <div>genres: "+response.genres[0]+
  "</div>\n <div>followers: "+response.followers.total+
  "</div>\n <div>Popularity: "+response.popularity+"</div>")
  $('.artist_image').attr('src',response.images[0].url)

}
