$(document).ready(function () {
  let name = getName()
  var  source = []
  
  changeName(name)

  $.getJSON('/data.json').then(function(response) {
    source = Object.keys(response)

    var image = getImage()
    

    if (response[name]) {
      image = response[name]
    }
    
    if (image) {
      setImage(name, image)
    }

    if (!name) {
      $('input').autocomplete({source})
    }
  })

  if (name) {
    setTimeout(() => {
      setHeight()
    }, 100);
  
    $("#card").flip().on('flip:done', setHeight)
  }
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
  let name = queries.to
  if (name) {
    return name.split('+').join(' ')
  }
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