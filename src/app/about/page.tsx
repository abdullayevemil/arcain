import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AnimatedCounter from "../../components/about/animated-counter"
import FlipCard from "../../components/about/flip-card"
import { Globe, Home, FileText, GraduationCap } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-background pt-20">
      <section className="mx-auto p-16 border-t border-red-400">
        <p className="text-sm uppercase tracking-widest text-red-400">
          About Arcain
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Borders are the worst thing to happen to humanity after natural calamities
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Imagine a world without borders. Old maps looked unified. Modern maps look like
          mosaics — fragmented, patched together, and fragile.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <Separator className="bg-red-400/20" />
      </section>

      <section className="mx-auto p-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">
              Students move. Housing shouldn’t resist.
            </h2>

            <p className="mt-6 text-muted-foreground">
              Every year, millions of students leave their home countries to study abroad.
              Their biggest challenge isn’t academics — it’s finding a safe, reliable place
              to live before classes even begin.
            </p>

            <p className="mt-4 text-muted-foreground">
              Arcain exists to remove uncertainty from student accommodation, no matter
              the country, language, or system.
            </p>
          </div>

          <Card className="border-red-400/20 bg-gradient-to-br from-red-400/10 to-transparent">
            <CardContent className="p-8">
              <p className="text-xl font-medium">
                Student housing is not a luxury.
              </p>

              <p className="mt-4 text-muted-foreground">
                It’s foundational. A stable home lets students focus on learning, adapting,
                and building their future — not surviving logistics.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* <section className="bg-red-400/5">
        <div className="mx-auto p-16">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-red-400">
                <AnimatedCounter value={80} suffix="M+" />
              </p>
              <p className="mt-2 text-muted-foreground">
                Students relocating globally every year
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-red-400">
                <AnimatedCounter value={120} suffix="+" />
              </p>
              <p className="mt-2 text-muted-foreground">
                University cities covered
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-red-400">
                <AnimatedCounter value={500} suffix="K+" />
              </p>
              <p className="mt-2 text-muted-foreground">
                Verified student-friendly homes
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="mx-auto p-16">
        <h2 className="text-center text-3xl font-semibold">
          Our Approach to Student Accommodation
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <FlipCard
            front={
              <>
                <SearchIcon />
                <p className="mt-4 text-xl font-medium">Designed for students</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Search built around academic life.
                </p>
              </>
            }
            back={
              <p className="text-base text-muted-foreground">
                Location near campus, flexible lease lengths, and student-safe housing —
                not generic rentals.
              </p>
            }
          />

          <FlipCard
            front={
              <>
                <Home className="h-6 w-6 text-red-400" />
                <p className="mt-4 text-xl font-medium">No negotiation stress</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear pricing upfront.
                </p>
              </>
            }
            back={
              <p className="text-base text-muted-foreground">
                Students shouldn’t bargain in foreign markets. Arcain standardizes pricing
                so decisions stay simple.
              </p>
            }
          />

          <FlipCard
            front={
              <>
                <FileText className="h-6 w-6 text-red-400" />
                <p className="mt-4 text-xl font-medium">Student-safe paperwork</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  One unified booking flow.
                </p>
              </>
            }
            back={
              <p className="text-base text-muted-foreground">
                Clear contracts, transparent terms, and payments designed for international
                students and parents.
              </p>
            }
          />
        </div>
      </section>

      <section className="border-t border-red-400/20">
        <div className="mx-auto p-16 text-center">
          <GraduationCap className="mx-auto h-6 w-6 text-red-400" />

          <h2 className="mt-6 text-3xl font-semibold">
            A student’s journey deserves a stable start
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Arcain is building a world where students can cross borders confidently,
            knowing their home is already taken care of.
          </p>
        </div>
      </section>
    </main>
  )
}

function SearchIcon() {
  return <Globe className="h-6 w-6 text-red-400" />
}