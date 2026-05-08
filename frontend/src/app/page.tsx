import GameCard from "@/components/GameCard";
import { Database, Sparkles, Terminal } from "lucide-react";

async function getGames() {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    
    let baseUrl = '';
    if (apiUrl) {
      baseUrl = apiUrl;
    } else if (vercelUrl) {
      baseUrl = `https://${vercelUrl}`;
    } else if (isDev) {
      baseUrl = 'http://127.0.0.1:8000';
    }

    const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/games` : '/api/games';
    
    console.log(`Fetching games from: ${url}`);
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch games');
    return res.json();
  } catch (error) {
    console.error("Error in getGames:", error);
    return [];
  }
}

export default async function Home() {
  const games = await getGames();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border-primary/20 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Beta v0.1.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
            The Interactive <br />
            <span className="text-gradient">Technical Wiki</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the underlying mechanics, frame data, and logic systems of your favorite games. Built for engineers and min-maxers.
          </p>

          <div className="flex items-center justify-center gap-6">
            <a href="#games" className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-colors shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]">
              Explore Databases
            </a>
            <div className="px-8 py-4 rounded-xl glass-card text-white font-bold text-lg flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
              <Terminal className="w-5 h-5" />
              API Docs
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 max-w-5xl mx-auto">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
            <Database className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Live Data</h3>
            <p className="text-slate-400 text-sm">Directly synced with the latest patches and variable states.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
            <Terminal className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Variables API</h3>
            <p className="text-slate-400 text-sm">Explore raw parameters like tick speeds and frame windows.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
            <Sparkles className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Interactive</h3>
            <p className="text-slate-400 text-sm">Rich visualizers for complex interconnected systems.</p>
          </div>
        </div>

        {/* Games Grid Section */}
        <div id="games" className="pt-10 scroll-mt-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Supported Titles</h2>
              <p className="text-slate-400 text-lg">Select a game to view its technical encyclopedia.</p>
            </div>
            <div className="hidden md:block text-slate-500 font-mono text-sm">
              {games.length} databases active
            </div>
          </div>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game: any) => (
                <div key={game.id} className="h-[300px]">
                  <GameCard
                    id={game.id}
                    name={game.name}
                    genre={game.genre}
                    version={game.version}
                    imageUrl={game.image_url}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Database className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">Backend Disconnected</h3>
              <p className="text-slate-400">Make sure the FastAPI server is running on localhost:8000.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
