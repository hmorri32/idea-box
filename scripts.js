// Quality array- easy to select later.
var ideaQuality = ['swill', 'plausible', 'genius'];
var ideaTank = JSON.parse(localStorage.getItem("savedArrayObject")) || [];

// function onLoadStorage() {
//   console.log(localStorage);
// }
$(document).ready(function() {
  getLocalStorage();
  console.log(localStorage);
})

// functions to enable/disable the save button/ clear inputs
function enableSave() {
  $("#save-button").prop('disabled', false)
};

function disableSave() {
  $("#save-button").prop('disabled', true)
};

function resetInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
};

// keyup on input fields to enable save button
$('#title-input, #body-input').on('keyup', function(){
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  if(titleInput.length >= 1 && bodyInput.length >= 1){
    enableSave()
  } else {
    disableSave()
  }
});

// event listener on save btn
$('#save-button').on('click', function() {
  postIdea();
  disableSave();
  resetInputs();
});


$('.ideas').on('click', '.delete', function(e){
  $(e.target).closest('.new-ideas').remove();
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
  var title = titleInput.val();
  var body = bodyInput.val();
  var idea = new newIdeaFactory(title, body);
  createIdea(idea);
  ideaTank.push(idea);
  storeNewIdea(idea);
};

storeNewIdea = function() {
  localStorage.setItem("savedArrayObject", JSON.stringify(ideaTank));
};
// learn about splice

getLocalStorage = function() {
  var persist = JSON.parse(localStorage.getItem("savedArrayObject"));
  if (persist) {
    for (i = 0; i < persist.length; i++) {
      var idea = persist[i];
      createIdea(idea);
    }
  }
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
)};
