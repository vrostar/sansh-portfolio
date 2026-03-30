import Scene from "@/components/three/Scene"
import HeroText from "@/components/ui/HeroText"
import IntroText from "@/components/ui/IntroText"

export default function Page() {
  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Scene />
      </div>

      <section className="h-screen">
        <HeroText />
      </section>

      <section className="h-screen flex items-center justify-center">
        <IntroText />
      </section>
    </main>
  )
}