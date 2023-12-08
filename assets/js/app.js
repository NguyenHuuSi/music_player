/* 
* Render songs
* Scroll top
* Play/ pause/ seek
* CD rotate
* Next/ prev
* Random
* Reload
*/
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const c = console.log
const player = $(".player")
const hending = $("header h2")
const cdElement = $(".cd")
const cdThumb = $(".cd-thumb")
const play = $(".fa-circle-play")
const pause = $(".fa-circle-pause")
const audio = $("#audio")
const progress = $("#progress")
const btnPlay = $(".btn-toggle-play")
const nextBtn = $(".btn-next")
const prevBtn = $(".btn-prev")
const randomBtn = $(".btn-random")

const app = {
    isPlaying: false,
    isRandom: false,
    currentIndex: 0,
    songs: [
        {
            name: 'Gió vẫn hát',
            singer: 'Long Phạm',
            path: './assets/music/GioVanHat-LongPham-6040263.mp3',
            image: './assets/img/Gió-vẫn-hát.jpg'
        },
        {
            name: 'Sarah',
            singer: 'Sarah',
            path: './assets/music/sarah-final.wav',
            image: './assets/img/sarah-final.webp'
        },
        {
            name: "Call Of Silence x Akuma No Ko",
            singer: "Japandee",
            path: "./assets/music/y2meta.com - Call Of Silence x Akuma No Ko - Mit Ft Japandee Remix _ Nhạc Hot Tik Tok Remix Mới Nhất 2023 (320 kbps).mp3",
            image: "./assets/img/gambar-lambang-attack-on-titan-18.jpg"
        },
        {
            name: "Yêu Người Có Ước Mơ (Lofi Ver)",
            singer: "buitruonglinh x CaoTri",
            path: "./assets/music/y2meta.com - Yêu Người Có Ước Mơ (Lofi Ver.) - buitruonglinh x CaoTri (320 kbps).mp3",
            image: "./assets/img/sddefault.jpg"
        },
        {
            name: "id 072019",
            singer: "3107 ft 267",
            path: "./assets/music/y2meta.com - W_n - id 072019 _ 3107 ft 267 _ Lofi Version (320 kbps).mp3",
            image: "./assets/img/artworks-II9KL8xJy3oYXzdn-10nPdQ-t500x500.jpg"
        },
        {
            name: "HỘI PHÁP SƯ (FAIRY TAIL)",
            singer: "QUANG NHẬT REMIX",
            path: "./assets/music/y2meta.com - HỘI PHÁP SƯ (FAIRY TAIL) - QUANG NHẬT REMIX _ BẢN THÁNH CA HỒI SINH REMIX HOT TIKTOK _ NEWT MUSIC √ (320 kbps).mp3",
            image: "./assets/img/natsu-fairy-tail.jpg"
        },
        {
            name: "BỐN BỂ ƯỚC THỀ REMIX",
            singer: "NHẠC TRUNG",
            path: "./assets/music/y2meta.com - BỐN BỂ ƯỚC THỀ REMIX ft TÚY HỒNG NHAN REMIX _ NHẠC TRUNG HOT TIKTOK 2023 (320 kbps).mp3",
            image: "./assets/img/thuy.jpg"
        },

        {
            name: "Suýt Nữa Thì (Lofi Ver.)",
            singer: "Andiez x Freak D",
            path: "./assets/music/y2meta.com - Suýt Nữa Thì (Lofi Ver.) - Andiez x Freak D (320 kbps).mp3",
            image: "./assets/img/artworks-dW2oyJhF6TdwX10I-3tqVag-t500x500.jpg"
        },
        {
            name: "Hẹn Em Ở Lần Yêu Thứ 2",
            singer: "Nguyenn x Đặng Tuấn Vũ x Freak D",
            path: "./assets/music/y2meta.com - Hẹn Em Ở Lần Yêu Thứ 2 (Lofi Ver.) - Nguyenn x Đặng Tuấn Vũ x Freak D (320 kbps).mp3",
            image: "./assets/img/1200x630bb.jpg"
        },
        {
            name: "Ngày Em Đẹp Nhất",
            singer: "Tama x Bell [Lofi Ver]",
            path: "./assets/music/song9.mp3",
            image: "./assets/img/sddefaultt.jpg"
        }
    ],
    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex]
            },
        })
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return  `
                <div class="song">
                    <div class="thumb" style="background-image: url(${song.image});"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            `
        })
        $(".playlist").innerHTML = htmls.join("")
    },
    
    handleEvents: function() {
        const cdWidth = cdElement.offsetWidth
        const _this = this
        // Cd animation stop/run 
        const cdAnimate = cdThumb.animate([
            { transform: "rotate(360deg)"}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdAnimate.pause()
        // Handle +/- CD
        document.onscroll = function() {
            let scrollTop = window.scrollY || document.documentElement.scrollTop
            let newCdWidth = cdWidth - scrollTop
            cdElement.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0
            cdElement.style.opacity = newCdWidth / cdWidth
        }
        // Handle when press play button
        btnPlay.addEventListener("click", () => {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()  
            }
        })

        // Handle event when play button is clicked
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add("playing")
            cdAnimate.play()
        }

        // Handle when pause button is clicked
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove("playing")
            cdAnimate.pause()
        }
        // Fires when the current playback of an audio has changed
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = audio.currentTime / audio.duration * 100
                progress.value = progressPercent
            }
        }
        // Fires when the current time of an audio has changed
        progress.oninput = function() {
            const seekTime = ((progress.value / 100) * audio.duration)
            audio.currentTime = seekTime
        }
        // When press next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }

        // Handle turn on/off random song  
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            const targetDiv = e.target.closest('.btn-random');
            if (targetDiv) {
                targetDiv.classList.toggle("active", _this.isRandom);
            }
        }
    },

    // Get current song 
    loadFirstSong: function() {
        hending.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    // Handle pressing next song
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex == this.songs.length) {
            this.currentIndex = 0
        }
        this.loadFirstSong()
    },
    // Handle pressing prev song
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadFirstSong()
    },
    playRandomSong: function() { 
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadFirstSong()
    }, 


    start: function() {
        // listenners/ handlers (DOM events)
        this.handleEvents()
        // Defined properties of this broject
        this.defineProperties()
        // Load current song in UI is runing app
        this.loadFirstSong()
        // Show songs 
        this.render()
    }
}

app.start()