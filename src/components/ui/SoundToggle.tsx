import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../../lib/soundEffects';

export const SoundToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(soundFX.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundFX.toggle();
    setIsEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
      title={isEnabled ? 'Audio FX: Ativado (Clique para desativar)' : 'Audio FX: Silenciado (Clique para ativar som)'}
      className="p-2 rounded-lg bg-[#111726]/80 hover:bg-[#1A243D] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all flex items-center gap-1.5 text-xs font-mono select-none"
    >
      {isEnabled ? (
        <>
          <Volume2 className="w-4 h-4 text-[#00FFFF] animate-pulse" />
          <span className="hidden md:inline text-[11px] text-[#00FFFF]">FX ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline text-[11px] text-slate-500">FX OFF</span>
        </>
      )}
    </button>
  );
};
