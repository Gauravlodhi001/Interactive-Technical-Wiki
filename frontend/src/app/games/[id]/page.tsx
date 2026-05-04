import MechanicCard from "@/components/MechanicCard";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getGame(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/games/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch game');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMechanics(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/mechanics/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch mechanics');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const game = await getGame(resolvedParams.id);
  
  if (!game) {
    notFound();
  }

  const mechanics = await getMechanics(resolvedParams.id);

  return (
    <main className="min-h-screen relative pb-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Databases</span>
        </Link>

        {/* Game Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-3xl flex items-center justify-center shrink-0">
            <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-primary opacity-80" />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-white/10">
                {game.genre}
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                v{game.version}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              {game.name}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Technical database covering internal logic, frame data, parameters, and mechanical systems.
            </p>
          </div>
        </div>

        {/* Mechanics Section */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-white">Documented Mechanics</h2>
            <span className="text-slate-500 font-mono text-sm">{mechanics.length} entries found</span>
          </div>

          {mechanics.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mechanics.map((mechanic: any) => (
                <MechanicCard
                  key={mechanic.id}
                  id={mechanic.id}
                  categoryId={mechanic.category_id}
                  name={mechanic.name}
                  logicDescription={mechanic.logic_description}
                  variables={mechanic.variables}
                  visualUrl={mechanic.visual_url}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border-dashed border-2 border-white/10">
              <p className="text-slate-400 text-lg">No mechanics documented for this game yet.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
