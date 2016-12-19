// Quality array- easy to select later.
var ideaQuality = ['swill', 'plausible', 'genius'];


function onLoadStorage() {
  console.log(localStorage);
}
// arrays ?

onLoadStorage();

// functions to enable/disable the save button/ clear inputs
function enableSave() {
  $("#save-button").prop('disabled', false);
};

function disableSave() {
  $("#save-button").prop('disabled', true);
}

function resetInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
};

// keyup on input fields to enable save button
$('#title-input, #body-input').on('keyup', function(){
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  if(titleInput.length >= 1 && bodyInput.length >= 1){
    enableSave();
  } else {
    disableSave();
  }
});

// event listener on buttons
$('#save-button').on('click', function() {
  postIdea();
  disableSave();
  resetInputs();
});

$('.ideas').on('click', '.delete', function() {
  $(this).parent().parent().parent().remove();
});


// constructor
function newIdeaFactory(title, body, quality, id){
  this.title = title;
  this.body = body;
  this.quality =  quality || ideaQuality[0];
  this.id = id || Date.now();
};

function postIdea() {
  var titleInput = $('#title-input');
  var bodyInput = $('#body-input');
  var idea = new newIdeaFactory(titleInput.val(), bodyInput.val());
  createIdea(idea);
  storeNewIdea(idea);
}

storeNewIdea = function(newIdeaFactory) {
  localStorage.setItem(newIdeaFactory.id, JSON.stringify(newIdeaFactory));
};

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
        <div class="idea-quality">quality: ${newIdeaFactory.quality}</div>
      </div>
    </div>`
);}
