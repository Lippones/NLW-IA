import { Header } from '@/components/header'
import { Playground } from '@/components/playground'
import { Sidebar } from '@/components/sidebar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 gap-6 flex">
        <Playground />
        <Sidebar />
      </main>
    </div>
  )
}
