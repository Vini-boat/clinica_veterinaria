// components/CanvaEmbed.tsx
import React from 'react';

const CanvaEmbed = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      {/* Container Responsivo com Tailwind */}
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <iframe
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-none"
          src={embedUrl}
          allowFullScreen
          allow="fullscreen"
        ></iframe>
      </div>
      
      {/* Opcional: Link para o Canva (créditos) */}
      <div className="mt-2 text-sm text-gray-500 italic">
        Apresentação criada por <span className="font-semibold text-blue-600">Vini</span>
      </div>
    </div>
  );
};

export default CanvaEmbed;