import { Wrench, Beaker, TerminalSquare } from 'lucide-react';

interface MechanicProps {
  id: string;
  categoryId: string;
  name: string;
  logicDescription: string;
  variables: Record<string, any>;
  visualUrl?: string;
}

export default function MechanicCard({ name, logicDescription, variables, categoryId }: MechanicProps) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      
      {/* Decorative gradient element */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-secondary bg-secondary/10 px-2 py-1 rounded-md border border-secondary/20">
              {categoryId.replace('-', ' ')}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <Wrench className="w-5 h-5 text-primary" />
            {name}
          </h3>
        </div>
      </div>

      <p className="text-slate-300 text-base leading-relaxed mb-8">
        {logicDescription}
      </p>

      {/* Variables Section */}
      <div className="bg-slate-900/50 rounded-xl border border-white/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TerminalSquare className="w-4 h-4 text-accent" />
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Variables & Parameters</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col">
              <span className="text-xs text-slate-400 font-mono mb-1">{key}</span>
              <span className="text-sm font-medium text-white break-words">
                {Array.isArray(value) ? value.join(', ') : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
