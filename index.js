var net = require("net");
var port = 8989;
var host = "127.0.0.1";
var client = new net.Socket();
//创建socket客户端
client.setEncoding("binary");
//连接到服务端
client.connect(
    port,
    host,
    function() {
        client.write("hello server");
        //向端口写入数据到达服务端
    }
);
client.on("data", function(data) {
    console.log("from server:" + data);
    //得到服务端返回来的数据
    if (data.endsWith('1') || data.endsWith('2')) {
        var isPlaying = !vm.$refs.videoPlayer.player.paused();
        if (isPlaying) {
            vm.$refs.videoPlayer.player.pause();
        } else
            vm.$refs.videoPlayer.player.play()
            // setTimeout(() => {
            //     vm.$refs.videoPlayer.player.muted(false)
            // }, 2000)


    } else if (data.endsWith('3')) {
        vm.$refs.videoPlayer.player.reset();
    } else if (data.endsWith("4")) {
        // get
        var isVolumeMuted = vm.$refs.videoPlayer.player.muted();
        if (isVolumeMuted) {
            // set
            vm.$refs.videoPlayer.player.muted(false); // mute the volume
        }

        // get
        var howLoudIsIt = vm.$refs.videoPlayer.player.volume();
        var setSize = howLoudIsIt + 0.1;
        if (setSize >= 1.0) {
            // set
            vm.$refs.videoPlayer.player.volume(1.0); // Set volume to half 0.5
        } else {
            vm.$refs.videoPlayer.player.volume(setSize);
        }


    } else if (data.endsWith("5")) {
        // get
        var isVolumeMuted = vm.$refs.videoPlayer.player.muted();
        if (isVolumeMuted) {
            // set
            vm.$refs.videoPlayer.player.muted(false); // mute the volume
        }

        // get
        var howLoudIsIt = vm.$refs.videoPlayer.player.volume();
        var setSize = howLoudIsIt - 0.1;
        if (setSize <= 0) {
            // set
            vm.$refs.videoPlayer.player.volume(0); // Set volume to half 0.5
            vm.$refs.videoPlayer.player.muted(true);
        } else {
            vm.$refs.videoPlayer.player.volume(setSize);
        }


    }
});
client.on("error", function(error) {
    //错误出现之后关闭连接
    console.log("error:" + error);
    client.destory();
});
client.on("close", function() {
    //正常关闭连接
    console.log("Connection closed");
});

Vue.use(VueVideoPlayer)
var vm = new Vue({
    el: '#vueapp',
    data() {
        return {
            message: 'Hi from Vue',
            // videojs options
            playerOptions: {
                height: '360',
                autoplay: false,
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    // mp4
                    src: "./video.mp4",
                    // webm
                    // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                }]
            }
        }
    },
    mounted() {
        // console.log('this is current player instance object', this.player)
        setTimeout(() => {
            console.log('dynamic change options', this.player)
            // this.player.muted(false)
        }, 2000)
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    created: {

    },
    methods: {
        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },
        // player is ready
        playerReadied(player) {
            // seek to 10s
            console.log('example player 1 readied', player)
            // player.currentTime(10)
                // var clickEvent = document.createEvent('MouseEvent'); // 1.创建一个鼠标事件类型
                // clickEvent.initMouseEvent('click',false,false,window,0,0,0,0,0,false,false,false,false,0,null); // 2.初始化一个click事件
                // player.dispatchEvent(clickEvent); // 3.派发(触发)
                // console.log('example 01: the player is readied', player)
                // document.getElementById('vueapp').click()
        },
        btnClick() {
            console.log('on click')
        }
    }
})