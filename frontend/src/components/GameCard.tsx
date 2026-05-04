import Link from 'next/link';
import { Gamepad2, ChevronRight } from 'lucide-react';

interface GameProps {
  id: string;
  name: string;
  genre: string;
  version: string;
  imageUrl?: string;
}

export default function GameCard({ id, name, genre, version, imageUrl }: GameProps) {
  return (
    <Link href={`/games/${id}`} className="block h-full">
      <div className="glass-card glass-card-hover rounded-2xl p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">
              <Gamepad2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs font-medium tracking-wider uppercase text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
              v{version}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {name}
          </h3>
          
          <p className="text-slate-400 text-sm mb-6">
            Explore the intricate mechanics, frame data, and logic of this {genre.toLowerCase()} title.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
          <span className="text-sm font-medium text-slate-300">
            {genre}
          </span>
          <div className="flex items-center text-primary group-hover:text-secondary transition-colors duration-300">
            <span className="text-sm font-semibold mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              View Database
            </span>
            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
