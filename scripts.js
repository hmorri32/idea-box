// Sets auto quality to crap
var ideaQuality = ['swill', 'plausible', 'genius'];

// functions to enable/disable the save button
function enableSave() {
  $("#save-button").prop('disabled', false)
};

function disableSave() {
  $("#save-button").prop('disabled', true)
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

// event listener on save
$('#save-button').on('click', () => {
  console.log("fuck");
  createIdea(NewIdeaFactory);
});

// constructor
function NewIdeaFactory(title, body, quality, uniqueid){
  this.title = title;
  this.body = body;
  this.quality =  quality || ideaQuality[0];
  this.uniqueid = uniqueid;
};


function createIdea(NewIdeaFactory) {
  $('.ideas-list').prepend(
    `<div id=${NewIdeaFactory.uniqueid}>
      <div class="new-website-title-bookmark">${NewIdeaFactory.title}</div>
      <hr>
      <div class="new-website-url-bookmark">
      <a href="${NewIdeaFactory.url}" target="_blank"> ${NewIdeaFactory.url}</a>
      </div>
      <hr>
      <div class="buttons">
      <button class="read-button">Read</button>
      <button class="delete-button">Delete</button>
      </div>
    </div>`
)};
