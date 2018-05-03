$(document).ready(function(){

  $('#fileform').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url:'/api/fileupload',
        type:'POST',
        data: new FormData(this),
        cache: false,
        contentType: false,
        processData: false,
        success:function(){
            console.log("worked");
        },
        error: (e) => console.log(e)
    });
  })
});
