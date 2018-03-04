$(function() {
    // Your custom JavaScript goes here
  
    $('button > .fa-microphone').on('click', function(){
        $(this).toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
    })


    $('.piwall-video').on('click', function(event){        
        $.get('pi/video/'+this.alt, (data)=>{
            console.log(data)
        })
        //event.stopPropagation();
        return false
    })


    $('#restartTiles').on('click', function(event){        
        $.get('pi/restartTiles', (data)=>{
            console.log(data)
        })
        //event.stopPropagation();
        return false
    })

  });
  