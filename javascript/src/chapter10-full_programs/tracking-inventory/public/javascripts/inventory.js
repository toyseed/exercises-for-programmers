window.addEventListener('load', function() {
  var downloadButton = document.querySelector('.download .download-btn');

  downloadButton.addEventListener('click', function() {
    var fileType = document.querySelector('.download input.filetype:checked');
    window.location.href = '/download/' + fileType.value;
  });
});