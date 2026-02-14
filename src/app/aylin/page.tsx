/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import RomanticHeartsBackground from "@/components/heartsBackground"
import { motion } from "framer-motion"
import React, { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [currentPageState, setCurrentPageState] = useState(0)
  const [heartSize, setCurrentHeartSize] = useState(0)
  const [showEmoji, setShowEmoji] = useState(false)
  const [inputFieldState, setInputFieldState] = useState(0)
  const [loadingBarState, setLoadingBarState] = useState(0)

  const [inputText, setInputText] = useState("")
  const [currentCheckBox, setCurrentCheckBox] = useState(-1)

  function getMeToOne() {
    setLoadingBarState((prev) => {
      const next = prev + 0.001

      if (next < 1) {
        setTimeout(getMeToOne, 5)
      } else {
        setInputFieldState(2)
      }

      return next
    })
  }

  return (
    <div className="w-full h-screen">
      <style>
        {`
      @keyframes rotateInline {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
      </style>
      <RomanticHeartsBackground />

      <div className="absolute w-full h-screen z-40 p-8">
        {currentPageState === 0 && (
          <div
            className="w-full h-screen z-40 bg-transparent"
            onClick={() => setCurrentPageState(1)}
          />
        )}

        {currentPageState === 1 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Hey Aylin, diese Seite habe ich nur für dich gemacht. Du kannst dir das alles in Zukunft immer wieder anschauen. Ich hoffe es gefällt dir ❤️️"
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>
            <div className="flex flex-row">
              <span
                onClick={() => setCurrentHeartSize(heartSize + 1)}
                className={`duration-150 ease-linear ${
                  heartSize === 0
                    ? "text-2xl"
                    : heartSize === 1
                    ? "text-9xl animate-bounce"
                    : "text-[190px] animate-bounce"
                }`}
              >
                ❤️{heartSize === 0 ? "   <-- Klick mich" : ""}
              </span>
              {heartSize === 1 && <span>Klick mich nochmal!</span>}
            </div>
            {heartSize === 2 && (
              <span className="duration-150 ease-linear">
                Mein Herz wenn ich dich sehe
              </span>
            )}
            <button
              onClick={() => {
                setCurrentPageState(2)
              }}
              className="bg-pink-400 opacity-30  p-4 rounded-lg animate-pulse text-white"
            >
              Weiter geht die Reise
            </button>
          </div>
        )}

        {currentPageState === 2 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Was wünschst du dir am meisten von Sela? Schreib es gerne unten in das Textfeld und sende es ab. Mal gucken was passiert 👀"
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>

            {inputFieldState === 0 ? (
              <div className="flex flex-col gap-2">
                <input
                  onChange={(e) => setInputText(e.currentTarget.value)}
                  type="text"
                  className="bg-transparent border rounded-lg text-lg p-2"
                />
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      if (inputText) {
                        getMeToOne()
                        setInputFieldState(1)
                      }
                    }}
                    className="bg-pink-900 p-4 rounded-lg text-white"
                  >
                    ➡️ Absenden
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <progress className="w-full h-8" value={loadingBarState} />
                <div className="flex flex-row justify-between">
                  <span>
                    {inputFieldState === 2
                      ? "Abgeschlossen!"
                      : "Eingabe wird verarbeitet..."}
                  </span>
                  <span>{(loadingBarState * 100).toFixed(1)}%</span>
                </div>
              </div>
            )}

            {inputFieldState === 2 ? (
              <button
                onClick={() => {
                  setShowEmoji(true)
                  setCurrentPageState(3)
                }}
                className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
              >
                Das Ergebnis auf der nächsten Seite sehen
              </button>
            ) : (
              <div />
            )}
          </div>
        )}

        {currentPageState === 3 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Du willst Sela also unbedingt eine Fußmassage geben, habe ich das so richtig registriert?? Sela sollte wohl schnell aus den Schuhen springen😂"
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>
            {showEmoji && (
              <Image
                src="/heckin_feet.png"
                width={300}
                height={300}
                alt="Picture of the author"
              />
            )}
            {showEmoji && (
              <span className="">
                Übrigens keine Kommentare gegen deine Füße 😡 !!!
              </span>
            )}

            <button
              onClick={() => {
                setShowEmoji(true)
                setCurrentPageState(4)
              }}
              className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
            >
              Wir sind noch nicht fertig, ab zur nächsten Seite
            </button>
          </div>
        )}

        {currentPageState === 4 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Hier mal ein kleines Quiz".split(" ").map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 15,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </p>

            <div className="flex flex-col gap-2">
              <span>Was mag Sela am meisten?</span>
              {[
                "BMW",
                "Game of Thrones",
                "Jujutsu Kaisen",
                "Römisches Reich",
                "Gym",
                "Aylinnnnnn 👀❤️",
              ].map(
                (value: string, index: number) =>
                  (index !== 5 || currentCheckBox === 10) && (
                    <div key={`${index}radio`} className="flex flex-row gap-2">
                      <input
                        className="w-8"
                        type="radio"
                        checked={
                          index === currentCheckBox ||
                          (currentCheckBox === 10 && index === 5)
                        }
                        onClick={() => {
                          if (currentCheckBox !== 10) setCurrentCheckBox(index)
                        }}
                      />

                      <span>{value}</span>
                    </div>
                  )
              )}

              <div>
                <button
                  onClick={() => setCurrentCheckBox(10)}
                  className="flex border p-2 rounded-md"
                >
                  Absenden
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setShowEmoji(true)
                setCurrentPageState(5)
              }}
              className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
            >
              Was wohl auf der nächsten Seite ist? 👀
            </button>
          </div>
        )}

        {currentPageState === 5 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Ehmmmmmmm, irgendetwas wollte ich dich gefragt haben 🤔🤔🤔 Hoffe es fällt mir gleich noch ein. In der Zeit kannst du dich selber mal fragen, ob dir die Seite bis jetzt gefällt. War nen Klacks für Sela natürlich."
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>
            {showEmoji && <span className="text-9xl">😝</span>}
            {showEmoji && (
              <span className="">
                Vielleicht muss du ja doch noch etwas warten
              </span>
            )}

            <button
              onClick={() => {
                setShowEmoji(true)
                setCurrentPageState(6)
              }}
              className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
            >
              Ist die Frage evtl. auf der nächsten Seite? 👀
            </button>
          </div>
        )}

        {currentPageState === 6 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Ich glaube die Frage fing an mit: Willst du..., aber wie gings nochmal weiter 😭😭 War ein langer Tag ok 😂"
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>

            <button
              onClick={() => {
                setCurrentPageState(7)
              }}
              className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
            >
              Besser zur nächsten Seite oder 😂😜
            </button>
          </div>
        )}

        {currentPageState === 7 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            <p className="text-base/8 ">
              {"Mist, mir fällts gerade nicht mehr ein. Ich glaube der echte Sela sollte hier übernehmen 👀❤️️"
                .split(" ")
                .map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: i / 15,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
            </p>
            <span className="text-9xl animate-bounce">😝</span>
            <button
              onClick={() => {
                setCurrentPageState(8)
              }}
              className="bg-pink-400 opacity-30 p-4 rounded-lg animate-pulse text-white"
            >
              Ciao und viel spaß noch ❤️
            </button>
          </div>
        )}
        {currentPageState === 8 && (
          <div className="flex flex-col gap-8 h-full justify-between">
            Hier ist Feierabend 😂😂 Was jetzt wohl kommt 👀❤️️ Antworte bloß
            richtig du
          </div>
        )}
      </div>
    </div>
  )
}
