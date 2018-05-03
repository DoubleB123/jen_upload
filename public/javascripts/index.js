$(document).ready(function(){

  $('#fileform').submit(function(e) {
    const uploadText = 'Uploading';

    $('.loading-header').text(uploadText);
    e.preventDefault();
    $('.loading').show();

    let dots = 0;
    const interval = setInterval(() => {
      let text = $('.loading-header').text();
      if (dots < 3) {
        $('.loading-header').text(text + ' . ')
        dots++;
      }
      else {
        $('.loading-header').text(uploadText);
        dots = 0;
      }

    }, 200)

    $.ajax({
        url:'/api/fileupload',
        type:'POST',
        data: new FormData(this),
        cache: false,
        contentType: false,
        processData: false,
        success: () => {
          console.log("worked");
          $('.loading').hide();
          clearInterval(interval);
        },
        error: (e) => {
          console.log(e)
          alert('ERROR, something went wrong!')
          $('.loading').hide()
          clearInterval(interval);
        }
    });
  })
});
