$(function() {
    // Your custom JavaScript goes here
    $('#pimaster-volume-mute').on('click', function(){
        var childSpan = $(this).find('span');
        childSpan.toggleClass('fa-microphone').toggleClass('fa-microphone-slash');

        var vol = childSpan.hasClass('fa-microphone-slash') ? 0 : 30;
        console.log(this.id, childSpan.hasClass('fa-microphone-slash'))

         $.get('pi/audio/' + vol, (data)=>{
            console.log(data)
        })
    })



    $('.piwall-video').on('click', function(event){        
        $.get('pi/video/' + this.alt, (data)=>{
            console.log(data)
        })
        //event.stopPropagation();
        return false
    })


    $('#restartTiles').on('click', function(event){        
        var num = $('.btn-toggle-screens.active').attr("screens")

        $.get(`pi/restartTiles/${num}`, (data)=>{
            console.log(data)
        })
        //event.stopPropagation();
        return false
    })



    var range = document.getElementById('volumeRange');

//range.style.height = '100px';
//range.style.margin = '0 auto 30px';

noUiSlider.create(range, {
	start: [ 30 ], // 4 handles, starting at...
	behaviour: 'tap', // Move handle on tap, bar is draggable
	step: 5,
	tooltips: true,	
	range: {
		'min': 0,
		'max': 100
	}
})


    range.noUiSlider.on('set', function(){
        var newVol = range.noUiSlider.get()

        $.get('pi/audio/' + newVol, (data)=>{
            console.log(data)
        })
    })


    $('.btn-toggle-screens').on('click', function(event){
        if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
             var num = $(this).attr("screens")
             $('.btn-toggle-screens').removeClass("active")
             $(this).addClass("active")
            $.get('pi/screens/' + num, (data) => {
                console.log(data)                
            })
        }
        //event.stopPropagation();
        return false
    })
    
     $('#shutdownAll').on('click', function(event){
         if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
            $.get('pi/shutdownSlaves', (data)=>{
                console.log(data)
            })
         }
        //event.stopPropagation();
        return false
    })

    $('#rebootAll').on('click', function(event){
         if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
            $.get('pi/rebootSlaves', (data)=>{
                console.log(data)
            })
         }
        //event.stopPropagation();
        return false
    })

    $('#togglePower').on('click', function(event){
        if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
            $.get('pi/togglePower', (data)=>{
                console.log(data)
                updatePowerState()
            })
        }
        //event.stopPropagation();
        return false
    })

    var updatePowerState = function() {
     $.get('pi/getPowerState', (data)=>{
            console.log(data)
            var but = $('#togglePower')

            but.removeClass('btn-danger').removeClass('btn-success')
            if(data.power == true) {
                but.text('Power off').addClass('btn-danger')
            }
            else {
                but.text('Power on').addClass('btn-success')
            }            
        })
    }

    updatePowerState();
  })
  