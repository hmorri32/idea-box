var ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// grabs local storage on load. Persisting.
$(document).ready(function() {
  getLocalStorageThenAppendIt();
  console.log(localStorage);
});


var getLocalStorageThenAppendIt = function() {
  for (i = 0; i < ideaTank.length; i++) {
    var idea = ideaTank[i];
    createIdea(idea);
  }
};

// functions to enable/disable the save button/ clear inputs
function enableSaveButton() {
  $("#save-button").prop('disabled', false)
}

function disableSaveButton() {
  $("#save-button").prop('disabled', true)
}

function resetInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
}

// keyup on input fields to enable save button
$('#title-input, #body-input').on('keyup', function(){
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  if(titleInput.length >= 1 && bodyInput.length >= 1){
    enableSaveButton();
  } else {
    disableSaveButton();
  }
});

// function for enter button
$(document).keypress(function(e) {
    if(e.which == 13) {
      $('.idea-header').focusout();
      $('#title-input').focus();
      e.preventDefault();
    }
});

$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#title-input').focusout();
    $('#body-input').focus();
    e.preventDefault();
  }
})

$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#body-input')
  }
})


// event listener on save btn
$('#save-button').on('click', function() {
  postAndStoreIdea();
  disableSaveButton();
  resetInputs();
});

// Delete button redux
$('.ideas').on('click', '.delete', function() {
  $(this).closest('.new-ideas').remove();

  var divId = $(this).closest('.new-ideas').prop('id')

  for (i = 0; i < ideaTank.length; i++){
    if (Number(divId) === ideaTank[i].id) {
      ideaTank.splice(i, 1);
      storeNewIdea();
    }
  }
});

// Event listener on upvote button
$('.ideas').on('click', '.up', function(){
  var ideaQuality = $(this).closest('.new-ideas').find('.quality')
  var ideaQualityVal = ideaQuality.text();
  var upVotedText = upvoteButton(ideaQualityVal);
  ideaQuality.text(upVotedText);

  var divId = $(this).closest('.new-ideas').prop('id')
  for (i = 0; i < ideaTank.length; i++) {
    if(Number(divId) === ideaTank[i].id) {
      ideaTank[i].quality = upVotedText;
      storeNewIdea();
    }
  }
});

// Event listener on downvote button
$('.ideas').on('click', '.down', function() {
  var ideaQuality = $(this).closest('.new-ideas').find('.quality')
  var ideaQualityVal = ideaQuality.text();
  var downvotedText = downvoteButton(ideaQualityVal);
  ideaQuality.text(downvotedText);

  var divId = $(this).closest('.new-ideas').prop('id')
  for (i = 0; i < ideaTank.length; i++) {
    if(Number(divId) === ideaTank[i].id) {
      ideaTank[i].quality = downvotedText;
      storeNewIdea();
    }
  }
});

// Button helpers
function upvoteButton(quality) {
  switch (quality) {
    case 'swill':
      return 'plausible'
    case 'plausible':
      return 'genius'
    default:
      return 'genius';
  }
}

function downvoteButton(quality) {
  switch (quality) {
    case 'genius':
      return 'plausible'
    case 'plausible':
      return 'swill'
    default:
      return 'swill';
  }
}


// blur edit function
$('.ideas').on('blur', '.idea-header', function() {
  var storedIdea;
  var ideaElement = $(this).closest('.new-ideas');
  var ideaHeader = ideaElement.find('.idea-header');
  var ideaHeaderEdit = ideaHeader.text();

  var id = parseInt($(this).closest('.new-ideas').prop('id'), 10);
  console.log(id);
  var savedArrayObject = JSON.parse(localStorage.getItem('savedArrayObject'));

  for (var index in savedArrayObject) {
    var idea = savedArrayObject[index];

      if (idea.id === id) {
          storedIdea = idea;
          storedIdea.title = ideaHeaderEdit;
          console.log(storedIdea);

          ideaTank[index] = storedIdea;
          storeNewIdea();
      }
  }
});

$('.ideas').on('blur', '.idea-body', function() {
  var storedIdea;
  var ideaElement = $(this).closest('.new-ideas');
  var ideaBody = ideaElement.find('.idea-body');
  var ideaBodyEdit = ideaBody.text();

  var id = parseInt($(this).closest('.new-ideas').prop('id'), 10);
  console.log(id);
  var savedArrayObject = JSON.parse(localStorage.getItem('savedArrayObject'));

  for (var index in savedArrayObject) {
    var idea = savedArrayObject[index];

      if (idea.id === id) {
          storedIdea = idea;
          storedIdea.body = ideaBodyEdit;
          console.log(storedIdea);

          ideaTank[index] = storedIdea;
          storeNewIdea();
      }
  }
})


// constructor
function newIdeaFactory(title, body){
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function postAndStoreIdea() {
  var titleInput = $('#title-input');
  var bodyInput = $('#body-input');
  var title = titleInput.val();
  var body = bodyInput.val();
  var idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  storeNewIdea();
}

storeNewIdea = function() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
}

function createIdea(newIdeaFactory) {
  $('.ideas').prepend(
    `<div id=${newIdeaFactory.id} class="new-ideas">
      <div class="idea-header">
        <h2 contentEditable="true">${newIdeaFactory.title}
          <button class="delete"></button>
        </h2>
      </div>
      <div class="idea-body">
        <p class="body" contentEditable="true"> ${newIdeaFactory.body}</p>
      </div>
      <div class="footer">
        <button class="up"></button>
        <button class="down"></button>
        <div class="idea-quality"><span>quality:</span> <span class="quality">${newIdeaFactory.quality}</span></div>
      </div>
    </div>`
)}



// Search

var searchInput = $('#live-search-ideas');

searchInput.on('keyup', function(){
  var searchTerm = $(this).val().toLowerCase();
  $('.new-ideas').each(function (index, element) {
    var text = $(element).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(element).toggle(match);
  })
});
