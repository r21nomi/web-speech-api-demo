const synth = window.speechSynthesis

// https://stackoverflow.com/questions/49506716/speechsynthesis-getvoices-returns-empty-array-on-windows
let voices = []
const voiceValue = "こんにちは、ようこそ。"

setTimeout(() => {
  voices = synth.getVoices().sort((a, b) => {
    const aname = a.name.toUpperCase()
    const bname = b.name.toUpperCase()

    if (aname < bname) {
      return -1
    } else if (aname === bname) {
      return 0
    } else {
      return +1
    }
  })
  speak()
}, 500)

const speak = () => {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking")
    return
  }

  const utterThis = new SpeechSynthesisUtterance(voiceValue)

  utterThis.onend = function (event) {
    console.log("SpeechSynthesisUtterance.onend")
  }

  utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror")
  }

  const voiceName = "Kyoko"

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === voiceName) {
      utterThis.voice = voices[i]
      break
    }
  }
  // utterThis.pitch = pitch.value
  // utterThis.rate = rate.value
  synth.speak(utterThis)
}