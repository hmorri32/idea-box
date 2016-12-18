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

$('#save-button').on('click', () => {
  console.log("fuck");
});

// constructor
function NewIdeaFactory(title, body, quality, uniqueid){
  this.title = title;
  this.body = body;
  this.quality =  quality || ideaQuality[0];
  this.uniqueid = uniqueid || Date.now();
};
