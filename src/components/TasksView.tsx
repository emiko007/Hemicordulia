import React from 'react';
import { CheckCircle } from 'lucide-react';

export function TasksView() {
  return (
    <div className="p-12 text-center text-zinc-500 h-full flex flex-col items-center justify-center">
      <CheckCircle size={48} className="text-neon-lime mb-6 opacity-50" />
      <h2 className="text-3xl font-black uppercase mb-4 text-white">Mission Logs & Tasks</h2>
      <p className="max-w-md mx-auto leading-relaxed">
        Execution logs and objective queues governing the autonomous actions of the agent cluster.
      </p>
    </div>
  );
}
