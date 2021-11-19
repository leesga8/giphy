import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'

$(document).ready(function(){
  $('#getGif').click(function(){
    const search = $('#search').val();
    $('#gif').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=g&lang=en`;
    
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      response.data.forEach(element => $('ul#showGif').append(
        `<li><a href='${element.url}'><img src='${element.images.downsized.url}'></a></li>`));
      }
  });
});