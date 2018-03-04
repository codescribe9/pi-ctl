var shell = require('shelljs');
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

exports.restartTiles = function(req, res){
  shell.exec('../starttiles.sh;', {async:true})
  res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'result': 'restarted tiles'}))
}

exports.playVideo = function(req, res){
    // if(_.indexOf(["rio", "italy"], req.params.vid) > -1) {
    //     console.log('Restarting tiles')
    //     shell.exec('../starttiles.sh;', {async:true})
    // }
      

    var child = shell.exec('../vm.sh ' + req.params.vid, {async:true})

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'result': 'started playing video: ' + req.params.vid}))
    //res.send(JSON.stringify({ version: version, video: req.params.vid }, null, 3 ));
}

exports.loadPiesInfo = function (req, res) {

  const gids = {
    slow: "zrPphZ4WJxc",
    italy: "f-9ijiN31LI",
    ireland: "eyA2WaUw0gI",
    light: "E8Ecz_sntDo",
    wildlife: "TxbE79-1OSI",
    ink: "BmBh0NNEm00",
    hubble: "R5bkXdiVDg4",
    world: "tO01J-M3g0U",
    drone2017: "Ay5JlGvHDag",
    patagonia: "ChOhcHD8fBA",
    sony: "jyzexrN0m40",
    new: "uzpxrx7NZBA",
    scotland: "KA_CLal14u4",
    rio: "Mat2sUGDspU",
    planet: "KgMpKsp23yY",
    macro: "K8rpo9e7tvg",
    "4k": "3xGJZoaTODQ",
    landscapes: "9ZfN87gSjvI",
    canada: "5lWkZ-JaEOc"
  }

  var videoPath = '/home/pi/Videos'
  var files = fs.readdirSync(videoPath)
  var vf = _.filter(files, (f) => { return _.endsWith(f, '.mp4')})
  var vdat = _.map(vf, function(f) {    
    var fname = path.basename(f, '.mp4');
    return {
      title: fname,
      thumbnail: `https://i.ytimg.com/vi/${gids[fname]}/default.jpg`,
      hasAudio: fs.existsSync(path.join(videoPath, fname + '.mp3'))
    }
  })

  //console.log(vdat)

  res.render('pies', {
    title: 'Pies',
    master: {
      name: 'PiMaster',
      ip: '192.168.1.200',
      data: {
        videos: vdat
      }
    },
    slaves: {
      "slave1": {
        name: 'PI201',
        ip: '192.168.1.201'
      },
      "slave2": {
        name: 'PI202',
        ip: '192.168.1.202'
      },
      "slave3": {
        name: 'PI203',
        ip: '192.168.1.203'
      },
      "slave4": {
        name: 'PI204',
        ip: '192.168.1.204'
      },
      "slave5": {
        name: 'PI205',
        ip: '192.168.1.205'
      },
      "slave6": {
        name: 'PI206',
        ip: '192.168.1.206'
      },
      "slave7": {
        name: 'PI207',
        ip: '192.168.1.207'
      },
      "slave8": {
        name: 'PI208',
        ip: '192.168.1.208'
      },
      "slave9": {
        name: 'PI209',
        ip: '192.168.1.209'
      },
    }
  })
}
