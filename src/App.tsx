import { useEffect } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import './App.css'
import { pieces } from './data/pieces'

function App() {
  useEffect(() => {
    const players = Array.from(document.querySelectorAll<HTMLAudioElement>('.piece-audio')).map(
      (audioElement) =>
        new Plyr(audioElement, {
          controls: ['play', 'progress', 'current-time', 'mute', 'volume']
        })
    )

    players.forEach((player) => {
      player.on('play', () => {
        players.forEach((otherPlayer) => {
          if (otherPlayer !== player) {
            otherPlayer.pause()
          }
        })
      })
    })

    return () => {
      players.forEach((player) => player.destroy())
    }
  }, [])

  return (
    <main className="poetry-page music-page">
      <header className="hero">
        <p className="eyebrow">Cuaderno digital</p>
        <h1>Honorato Rainbows</h1>
        <p className="intro">Un feed sencillo de piezas sonoras, notas breves y escucha directa.</p>
      </header>

      <section className="poem-list piece-list" aria-label="Listado de piezas musicales">
        {pieces.map((piece) => (
          <article className="poem-card piece-card" key={piece.title}>
            <h2>{piece.title}</h2>
            <p className="piece-description">{piece.description}</p>
            {piece.audioUrl ? (
              <audio className="piece-audio" controls preload="none">
                <source src={piece.audioUrl} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            ) : (
              <p className="pending-audio">Audio pendiente de publicar</p>
            )}
          </article>
        ))}
      </section>

      <footer className="page-footer">Santander, piezas entre la bruma y la montana.</footer>
    </main>
  )
}

export default App
