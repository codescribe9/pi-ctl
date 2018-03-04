
exports.loadPiesInfo = function (req, res) {
  res.render('pies', {
    title: 'Pies',
    master: {
      name: 'PiMaster',
      ip: '192.168.1.200',
      data: {
        videos: [{
          title: "Ireland",
          filePath: "https://www.youtube.com/watch?v=yK6wVa6Awdk",
          thumbnail: "https://i3.ytimg.com/vi/yK6wVa6Awdk/hqdefault.jpg",
          duration: "4:11"
          
        },{
          title: "Ink In Motion",
          filePath: "https://www.youtube.com/watch?v=BmBh0NNEm00",
          thumbnail: "https://i3.ytimg.com/vi/BmBh0NNEm00/hqdefault.jpg",
          duration: "3:54"
        },{
          title: "Hubble The Final Frontier",
          filePath: "https://www.youtube.com/watch?v=R5bkXdiVDg4",
          thumbnail: "https://i3.ytimg.com/vi/R5bkXdiVDg4/hqdefault.jpg",
          duration: "12:13"
        }]
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
