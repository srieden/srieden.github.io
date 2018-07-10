$(document).ready(function () {
  $('.fb-share-button').attr('data-href', location.href)

  let name = getName()
  changeName(name)

  $.getJSON('/data.json').then(function(response) {
      var image = getImage()

      if (response[name]) {
          image = response[name]
      }
      
      if (image) {
          setImage(name, image)
      }
  })

  
  setTimeout(() => {
      setHeight()
  }, 100);

  $("#card").flip().on('flip:done', setHeight)
})

function setHeight () {
  var inHeight = $('#invitation').height() - 30;
  $('#photo .frame-inner, #photo img').css({'height': inHeight});
}

function changeName (name) {
  $('.to').html(name)
}

function setImage (name, src) {
  let image = '<img src="' + src + '" alt="' + name + '">';
  $('#imagehere').replaceWith(image)
}


function getName () {
  let queries = getQueries()
  
  return queries.to
}

function getImage () {
  let queries = getQueries()
  
  return queries.image
}

function getQueries () {
  var queries = {};

  $.each(document.location.search.substr(1).split('&'),function(c,q){
      if (q) {
          var i = q.split('=');
          queries[i[0].toString()] = decodeURIComponent(i[1].toString());
      }
  });

  return queries;
}