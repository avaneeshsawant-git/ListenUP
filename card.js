function createcard(imag, title, artist) {
    let html = `<div class="card">
                    <img class="dhad" src="${imag}" alt="">
                    <img class="play" src="photos/play.svg" alt="">
                    <h3 class="wcolor pop">${title}</h3>
                    <div class="artname scolor">${artist}</div>
                </div>`

    document.querySelector(".cards").innerHTML = document.querySelector(".cards").innerHTML + html
}

createcard("photos/square_image_1.png", "Drive Breakbeat", "Rockot")
createcard("photos/square_image_2.png", "Positive Spring Day", "White_Records")
createcard("photos/square_image_3.png", "Fast Rock", "Dmitry Taras")
createcard("photos/square_image_2.png", "Bella Ciao", "White_Records")
createcard("photos/square_image_5.png", "Happy Rock", "Top-Flow")
createcard("photos/square_image_3.png", "Winter", "White_Records")
createcard("photos/square_image_8.png", "Tarantella Neapolitan", "White_Records")
createcard("photos/square_image_9.png", "Stalker", "Grand_Project")
createcard("photos/square_image_10.png", "Time", "Grand_Project")
createcard("photos/square_image_11.png", "Silver Wind", "Top-Flow")
createcard("photos/square_image_1.png", "Whistle Joyride", "Top-Flow")
createcard("photos/square_image_4.png", "Halloween", "AlexGrohl")
createcard("photos/square_image_6.png", "Spinning Head", "Gvidon")
createcard("photos/square_image_7.png", "Roadkill", "Gvidon")
createcard("photos/square_image_7.png", "Legacy of Grieg", "White_Records")
createcard("photos/square_image_12.png", "Powerful Energy", "FASSounds")
createcard("photos/square_image_8.png", "Energetic Rock", "Dmitry Taras")
createcard("photos/square_image_8.png", "Stomping Rock", "Dmitry Taras")

function createslate(imag, song, art) {

    let exists = [...document.querySelectorAll(".slate h3")].some(e => e.textContent.trim() === song.trim());

    if (exists) {
        return;
    }

    let html = `<div class="slate flex llc">
                    <img src="${imag}" alt="">
                    <div class="content">
                        <h3 class="snm wcolor pop lister">${song}</h3>
                        <div class="sar  pop">${art}</div>
                    </div>
                    <img class="img sp cross" src="photos/cross.svg" alt="">
                    <img class="img sp invious lc mate" src="photos/played.svg" alt="">
                    <img class=" sp invious fate lc" src="photos/paused.svg" alt="">
                </div>`
    document.querySelector(".slates").innerHTML = document.querySelector(".slates").innerHTML + html



    let crs = document.querySelectorAll(".cross")
    crs.forEach(cr => {
        cr.addEventListener("click", (cr) => {
            const slate = cr.target.closest(".slate")
            if (slate) {
                slate.remove()
                curentsong.pause()
                curentsong.currentTime = 0
                updatearray()
            }

        }
        )
    });

    let butn = document.querySelectorAll(".mate")
    butn.forEach(element => {
        element.addEventListener("click", (e) => {
            track = e.target.closest(".slate").querySelector("h3").textContent
            console.log(track)
            playsong(track)
            setindex(track)
            active()

        }
        )

    });
    let buton = document.querySelectorAll(".fate")
    buton.forEach(element => {
        element.addEventListener("click", () => {
            if (curentsong.paused) {
                curentsong.play()
                pp.src = `photos/paused.svg`
                active()
            }
            else {
                curentsong.pause()
                pp.src = `photos/pause.svg`
                active()
            }
        }
        )
    });



    active()
    updatearray()

}

let listarray = []
let index = -1

function updatearray() {
    let all = [...document.querySelectorAll(".slate h3")]
        .map(e => e.textContent.trim());

    listarray = [...new Set(all)];
    console.log("Updated List:", listarray);
}

function setindex(track) {
    index = listarray.indexOf(track)
}

let btn = document.querySelectorAll(".play")
btn.forEach(element => {
    element.addEventListener("click", (e) => {
        track = e.target.closest(".card").querySelector("h3").textContent
        console.log(track)

        setindex(track)
        playsong(track)
        active()

    }
    )

});

document.querySelector(".nt").addEventListener("click", () => {
    let xm = decodeURIComponent(curentsong.src);
    xm = xm.substring(xm.lastIndexOf("/") + 1, xm.lastIndexOf("."));
    index = listarray.indexOf(xm);

    if (index !== -1 && index < listarray.length - 1) {
        nextsong = listarray[index + 1]
        playsong(nextsong)
        setindex(nextsong)
        active()
    }

}
)

document.querySelector(".pv").addEventListener("click",() => {
  let xm = decodeURIComponent(curentsong.src);
    xm = xm.substring(xm.lastIndexOf("/") + 1, xm.lastIndexOf("."));
    index = listarray.indexOf(xm);

    if (index !== -1 && index > 0) {
    prevsong = listarray[index - 1]
    playsong(prevsong)
    setindex(prevsong)
    active()
}
}
)


function active() {
    let sl = document.querySelectorAll(".slate")
    sl.forEach(e => {
        let xm = decodeURIComponent(curentsong.src)
        xm = xm.substring(xm.lastIndexOf("/") + 1, xm.lastIndexOf("."));
        let cv = e.querySelector("h3").textContent.trim()
        if (xm.includes(cv)) {
            e.style.backgroundColor = "#0A1A2F"
        }
        else {
            e.style.backgroundColor = "#222222"
        }
    })
}







// createslate("photos/ART.jpeg", "Do I Wanna Know?", "Artic Monkeys")
// createslate("photos/ART.jpeg", "Do I Wanna Know?", "Artic Monkeys")


let cds = document.getElementsByClassName("card");
// console.log(cds)

for (let e of cds) {
    e.addEventListener("click", () => {
        const a = e.querySelector("img").src
        const b = e.querySelector("h3").textContent
        const c = e.querySelector("div").textContent
        console.log(a)
        console.log(b)
        console.log(c)
        createslate(a, b, c)
    }
    )
}

const curentsong = new Audio();

function playsong(track) {
    curentsong.src = `songs/${track}.mp3`
    curentsong.play()
    pp.src = `photos/paused.svg`

    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = ""
}



curentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatSecondsToMMSS(curentsong.currentTime)}/${formatSecondsToMMSS(curentsong.duration)}`
    document.querySelector(".circle").style.left = (curentsong.currentTime / curentsong.duration) * 100 + "%";
}
)

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = per + "%";
    curentsong.currentTime = ((curentsong.duration) * per) / 100

}
)

let pp = document.querySelector(".pp")
pp.addEventListener("click", () => {
    if (curentsong.paused) {
        curentsong.play()
        pp.src = `photos/paused.svg`
    }
    else {
        curentsong.pause()
        pp.src = `photos/pause.svg`
    }

}
)



function formatSecondsToMMSS(seconds) {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


document.querySelector(".pl").addEventListener("input", () => {
    const search = document.querySelector(".pl").value.toLowerCase()
    let cds = document.getElementsByClassName("card");
    Array.from(cds).forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase()
        if (title.includes(search) || search == '') {
            card.style.display = 'block'
        }
        else {
            card.style.display = 'none';
        }


    });

}
)

document.querySelector(".hammer").addEventListener("click", () => {
    document.querySelector(".left").style.left = 0

}
)
document.querySelector(".cancel").addEventListener("click", () => {
    document.querySelector(".left").style.left = `-102%`

}
)

document.querySelector(".infor").addEventListener("click", () => {
    let showup = document.querySelector(".showup")
    if (showup.style.opacity == 1) {

        showup.style.opacity = 0
        showup.style.right =`110%`
    }
    else {

        showup.style.opacity = 1
        showup.style.right =`-6px`
    }

}
)




