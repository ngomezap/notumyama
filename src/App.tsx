import { useEffect } from 'react'
import './App.css'
import { pieces } from './data/pieces'

function App() {
  useEffect(() => {
    const players = Array.from(document.querySelectorAll<HTMLAudioElement>('.piece-audio'))
    const handlers = new Map<HTMLAudioElement, () => void>()

    const handlePlay = (currentPlayer: HTMLAudioElement) => {
      players.forEach((otherPlayer) => {
        if (otherPlayer !== currentPlayer) {
          otherPlayer.pause()
        }
      })
    }

    players.forEach((player) => {
      const onPlay = () => {
        handlePlay(player)
      }

      player.addEventListener('play', onPlay)
      handlers.set(player, onPlay)
    })

    return () => {
      players.forEach((player) => {
        const handler = handlers.get(player)
        if (handler) {
          player.removeEventListener('play', handler)
        }
      })
    }
  }, [])

  return (
    <main className="poetry-page music-page">
      <header className="hero">
        <p className="eyebrow">Cuaderno musical</p>
        <h1>notumyama</h1>
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

      <footer className="page-footer">Santander, piezas entre la bruma y la montaña.</footer>
    </main>
  )
}

export default App
