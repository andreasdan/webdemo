import { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AlbumPicker />
    </div>
  )
}

function AlbumPicker() {
  const [albums, setAlbums] = useState<{ title: string, date: number}[]>([]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      artist: { value: string };
    };
    const artist = encodeURIComponent(target.artist.value);
    const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
    const response = await fetch(url);
    const mbResult = (await response.json()) as {
      releases: { title: string, date: number }[];
    };
    console.log(mbResult)
    const { releases } = mbResult;
    setAlbums(releases);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Artist name:
        <input name="artist" />
      </label>
      <button type="submit">Search</button>
      <p>Albums:</p>
      <ol>
        {albums.map((album) => (
          <li>{album.title} Release: {album.date}</li>
        ))}
      </ol>
    </form>
  );
}

export default App
