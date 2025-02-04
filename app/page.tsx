import TextScramble from "../components/text-scramble"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-24">
      <div className="text-center">
        <TextScramble text="👾 Italo Adler" />
        <TextScramble text="Software Engineer" />
        <TextScramble text="Media Artist" />
        <TextScramble text="Teacher" />
        <TextScramble text="Researcher" />
      </div>
    </main>
  )
}

