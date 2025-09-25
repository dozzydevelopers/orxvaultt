
import React from 'react';
import { PlayCircleIcon } from './Icons';
import type { SiteSettings } from '../types';

interface PromoBannerProps {
  promoBanner: SiteSettings['promoBanner'];
}


const PromoBanner: React.FC<PromoBannerProps> = ({ promoBanner }) => {
  return (
    <div 
      className="relative my-8 p-6 rounded-2xl overflow-hidden bg-cover bg-center min-h-[180px] flex flex-col justify-between"
      style={{ backgroundImage: `url('${promoBanner.imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <h6 className="text-xl font-bold text-white capitalize" dangerouslySetInnerHTML={{ __html: promoBanner.title.replace('<br />', '<br>') }}>
        </h6>
        <p className="text-sm text-gray-300 mt-2">
          {promoBanner.subtitle}
        </p>
      </div>
      <a href={promoBanner.link} className="relative z-10 mt-4 flex items-center gap-2 text-white font-semibold group">
        <div className="bg-[var(--accent-primary)] rounded-full group-hover:bg-[var(--accent-secondary)] transition-colors">
          <PlayCircleIcon />
        </div>
        <span className="text-sm">{promoBanner.buttonText}</span>
      </a>
    </div>
  );
};

export default PromoBanner;