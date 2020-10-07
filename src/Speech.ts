import Speech from "speak-tts";

function _prepareSpeakButton(speech: any) {
  const speakButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const resumeButton = document.getElementById("resume");
  const textarea: any = document.getElementById("text");
  const languages: any = document.getElementById("languages");
  speakButton?.addEventListener("click", () => {
    const language = languages?.value;
    const voice = languages?.options[languages?.selectedIndex].dataset.name;
    if (language) speech.setLanguage(languages?.value);
    if (voice) speech.setVoice(voice);
    speech
      .speak({
        text: textarea?.value,
        queue: false,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: (event: any) => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          },
        },
      })
      .then((data: any) => {
        console.log("Success !", data);
      })
      .catch((e: any) => {
        console.error("An error occurred :", e);
      });
  });

  pauseButton?.addEventListener("click", () => {
    speech.pause();
  });

  resumeButton?.addEventListener("click", () => {
    speech.resume();
  });
}

export default _prepareSpeakButton;
