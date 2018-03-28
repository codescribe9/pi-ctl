$(function() {

    var volSlider;
    // Volume Control

    $('#btnAdjustVolume').popover({ html : true});

    $('#btnAdjustVolume').on('inserted.bs.popover', function () {
        setTimeout(() => {
            
            volSlider = $('#txtVolume')
                .slider({
                    tooltip: 'always',
                    focus: true,
                    formatter: function(value) {
                        return value;
                    }
                })
                .on('slide', volChange)

            $('#btnPiMasterVolumeMute').on('click', function (){                
                // Apply setValue to redraw slider
                volSlider.slider('setValue', 0);
                volChange();
            })
        }, 100);
        
      })

    var volChange = function() {
        var vol = volSlider.slider('getValue')
         $.get('pi/audio/' + vol, (data)=>{
            console.log(data)
        })
    }

    const gids = [
        slow= "zrPphZ4WJxc",
        italy= "f-9ijiN31LI",
        ireland= "eyA2WaUw0gI",
        light= "E8Ecz_sntDo",
        wildlife= "TxbE79-1OSI",
        ink= "BmBh0NNEm00",
        hubble= "R5bkXdiVDg4",
        world= "tO01J-M3g0U",
        drone2017= "Ay5JlGvHDag",
        patagonia= "ChOhcHD8fBA",
        sony= "jyzexrN0m40",
        new1 = "uzpxrx7NZBA",
        scotland= "KA_CLal14u4",
        rio= "Mat2sUGDspU",
        planet= "KgMpKsp23yY",
        macro= "K8rpo9e7tvg",
        Fourk= "3xGJZoaTODQ",
        landscapes= "9ZfN87gSjvI",
        canada= "5lWkZ-JaEOc",
        iss= "oFDeNcu3mnc",
        iceland= "bYVebL_BYqo",
        norway= "fq-ywVIg2A8",
        tajmahal= "DMtsWSptQQw",    
    ];

    var videoHtml = '';
    $.each(gids, function(key, value){
        videoHtml += `<img src="https://i.ytimg.com/vi/${value}/default.jpg" id="video-${key}" alt="${key}" width="120px"  class="img-thumbnail piwall-video">`
    });

    $('#divVideoList').html(videoHtml);
    

      

        //start playing the clicked video
    $('.piwall-video').on('click', function(event){        
        $.get('pi/video/' + this.alt, (data)=>{
            console.log(data)
        })
        return false
    })


    $('#restartTiles').on('click', function(event){        
        var num = $('.btn-toggle-screens.active').attr("screens")

        $.get(`pi/restartTiles/${num}`, (data)=>{
            console.log(data)
        })
        return false
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
        return false
    })
    
     $('#shutdownAll').on('click', function(event){
         if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
            $.get('pi/shutdownSlaves', (data)=>{
                console.log(data)
            })
         }
        return false
    })

    $('#rebootAll').on('click', function(event){
         if($('#cbxConfirm').prop("checked")) {
             $('#cbxConfirm').prop("checked", false)
            $.get('pi/rebootSlaves', (data)=>{
                console.log(data)
            })
         }
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

    //$('#divCurrentYear').text((new Date()).getFullYear());    
    var daysTill = getDaysTill(12, 31)
    $('#divDaysInYear').text(daysTill);

    $('#divDaysToBirthday1').text(getDaysTill(6, 27));
    $('#divDaysToBirthday2').text(getDaysTill(8, 15));
    $('#divDaysToBirthday3').text(getDaysTill(6, 20));
    $('#divDaysToBirthday4').text(getDaysTill(11, 5));

    updatePowerState();        
})

function getDaysTill(month, day){
    today = new Date();
    var currentYear = today.getFullYear();
    var inputData = new Date(currentYear, month - 1, day);
    
    if (today.getMonth() >= month  && today.getDate() >= date) 
    {
        inputData.setFullYear(currentYear + 1); 
    } 

    var oneDay =1000*60*60*24;
    return Math.ceil((inputData.getTime() - today.getTime()) / oneDay) 
}