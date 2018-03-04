$(function() {
    // Your custom JavaScript goes here
  
    $('button > .fa-microphone').on('click', function(){
        $(this).toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
    })
    $('.piwall-video').on('click', function(event){
        console.log(this.id)
        event.stopPropagation();
    })
  });
  