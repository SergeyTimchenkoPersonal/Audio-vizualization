const audio = document.getElementById('audio')
let logo = document.getElementById('logo').style

let context, analyzer, src, array

window.onclick = function() {
    if(!context) {
        preparation()
    }
    if(audio.paused) {
        audio.play()
        loop()
    } else {
        audio.pause()
    }
    
}

function preparation() {
    context = new AudioContext()
    analyzer = context.createAnalyser()
    src = context.createMediaElementSource(audio)
    src.connect(analyzer)
    analyzer.connect(context.destination)
    loop()
    
}

function loop() {
    if(!audio.paused) {
        requestAnimationFrame(loop)
    }
    array = new Uint8Array(analyzer.frequencyBinCount)
    analyzer.getByteFrequencyData(array)

    logo.minHeight = `${(array[40])}px`
    logo.width = `${(array[40])}px`
    logo.opacity = `${(array[40]) / 2}%`
}