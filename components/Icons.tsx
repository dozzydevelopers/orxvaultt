

import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


export const LoginIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.642 20.669c-0.391 0.39-0.391 1.023-0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.39-0.39-1.023-0.39-1.414 0s-0.391 1.024 0 1.414l3.617 3.617h-19.264c-0.552 0-1 0.448-1 1s0.448 1 1 1h19.326zM30.005 0h-18c-1.105 0-2.001 0.895-2.001 2v9h2.014v-7.78c0-0.668 0.542-1.21 1.21-1.21h15.522c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-15.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.014 0.003v9.030c0 1.105 0.896 2 2.001 2h18c1.105 0 2-0.895 2-2v-28c-0.001-1.105-0.896-2-2-2z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g opacity="0.6">
      <path d="M9.58317 17.4993C13.9554 17.4993 17.4998 13.9549 17.4998 9.58268C17.4998 5.21043 13.9554 1.66602 9.58317 1.66602C5.21092 1.66602 1.6665 5.21043 1.6665 9.58268C1.6665 13.9549 5.21092 17.4993 9.58317 17.4993Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3332 18.3327L16.6665 16.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const PlayCircleIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9.97493 1.66699C5.37493 1.66699 1.6416 5.40033 1.6416 10.0003C1.6416 14.6003 5.37493 18.3337 9.97493 18.3337C14.5749 18.3337 18.3083 14.6003 18.3083 10.0003C18.3083 5.40033 14.5833 1.66699 9.97493 1.66699ZM12.4749 11.8587L10.0583 13.2503C9.75827 13.4253 9.42493 13.5087 9.09993 13.5087C8.7666 13.5087 8.4416 13.4253 8.1416 13.2503C7.5416 12.9003 7.18327 12.2837 7.18327 11.5837V8.79199C7.18327 8.10033 7.5416 7.47533 8.1416 7.12533C8.7416 6.77533 9.45827 6.77533 10.0666 7.12533L12.4833 8.51699C13.0833 8.86699 13.4416 9.48366 13.4416 10.1837C13.4416 10.8837 13.0833 11.5087 12.4749 11.8587Z" fill="currentColor" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.0402 6.81969L14.2802 2.78969C12.7102 1.68969 10.3002 1.74969 8.79023 2.91969L3.78023 6.82969C2.78023 7.60969 1.99023 9.20969 1.99023 10.4697V17.3697C1.99023 19.9197 4.06023 21.9997 6.61023 21.9997H17.3902C19.9402 21.9997 22.0102 19.9297 22.0102 17.3797V10.5997C22.0102 9.24969 21.1402 7.58969 20.0402 6.81969ZM12.7502 17.9997C12.7502 18.4097 12.4102 18.7497 12.0002 18.7497C11.5902 18.7497 11.2502 18.4097 11.2502 17.9997V14.9997C11.2502 14.5897 11.5902 14.2497 12.0002 14.2497C12.4102 14.2497 12.7502 14.5897 12.7502 14.9997V17.9997Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MarketplaceIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.33008 14.4898L9.71008 11.3998C10.0501 10.9598 10.6801 10.8798 11.1201 11.2198L12.9501 12.6598C13.3901 12.9998 14.0201 12.9198 14.3601 12.4898L16.6701 9.50977" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ProfileIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SignOutIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.66602 5.37258C1.66602 3.33008 3.35788 1.66675 5.43646 1.66675H9.57072C11.6451 1.66675 13.3327 3.32508 13.3327 5.36425V14.6276C13.3327 16.6709 11.6408 18.3334 9.56139 18.3334H5.42883C3.35364 18.3334 1.66602 16.6751 1.66602 14.6359V13.8526V5.37258Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.149 9.54579L15.7775 7.12162C15.5324 6.87162 15.138 6.87162 14.8937 7.12329C14.6502 7.37495 14.651 7.78079 14.8953 8.03079L16.1947 9.35828H14.9489H7.95696C7.61203 9.35828 7.33203 9.64579 7.33203 9.99995C7.33203 10.355 7.61203 10.6416 7.95696 10.6416H16.1947L14.8953 11.9691C14.651 12.2191 14.6502 12.625 14.8937 12.8766C15.0162 13.0025 15.1761 13.0658 15.3368 13.0658C15.4959 13.0658 15.6558 13.0025 15.7775 12.8783L18.149 10.455C18.2667 10.3341 18.3333 10.1708 18.3333 9.99995C18.3333 9.82995 18.2667 9.66662 18.149 9.54579Z" fill="currentColor" />
  </svg>
);

export const VerifiedIcon: React.FC<IconProps> = (props) => (
    <svg fill="#2664ED" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M14.3731 7.16036L13.4664 6.10703C13.2931 5.90703 13.1531 5.5337 13.1531 5.26703V4.1337C13.1531 3.42703 12.5731 2.84703 11.8664 2.84703H10.7331C10.4731 2.84703 10.0931 2.70703 9.89309 2.5337L8.83976 1.62703C8.37976 1.2337 7.62643 1.2337 7.15976 1.62703L6.11309 2.54036C5.91309 2.70703 5.53309 2.84703 5.27309 2.84703H4.11976C3.41309 2.84703 2.83309 3.42703 2.83309 4.1337V5.2737C2.83309 5.5337 2.69309 5.90703 2.52643 6.10703L1.62643 7.16703C1.23976 7.62703 1.23976 8.3737 1.62643 8.8337L2.52643 9.8937C2.69309 10.0937 2.83309 10.467 2.83309 10.727V11.867C2.83309 12.5737 3.41309 13.1537 4.11976 13.1537H5.27309C5.53309 13.1537 5.91309 13.2937 6.11309 13.467L7.16643 14.3737C7.62643 14.767 8.37976 14.767 8.84643 14.3737L9.89976 13.467C10.0998 13.2937 10.4731 13.1537 10.7398 13.1537H11.8731C12.5798 13.1537 13.1598 12.5737 13.1598 11.867V10.7337C13.1598 10.4737 13.2998 10.0937 13.4731 9.8937L14.3798 8.84036C14.7664 8.38036 14.7664 7.62036 14.3731 7.16036ZM10.7731 6.74036L7.55309 9.96036C7.45976 10.0537 7.33309 10.107 7.19976 10.107C7.06643 10.107 6.93976 10.0537 6.84643 9.96036L5.23309 8.34703C5.03976 8.1537 5.03976 7.8337 5.23309 7.64036C5.42643 7.44703 5.74643 7.44703 5.93976 7.64036L7.19976 8.90036L10.0664 6.0337C10.2598 5.84036 10.5798 5.84036 10.7731 6.0337C10.9664 6.22703 10.9664 6.54703 10.7731 6.74036Z" />
    </svg>
);

export const ShareIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" />
    </svg>
);

export const WethIcon: React.FC<IconProps> = (props) => (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5.99684 19.8631L0 11.6428L5.99684 15.6599V19.8631Z" fill="#C5C5C5"/>
        <path d="M6.00288 19.8631V15.6599L12 11.6428L6.00288 19.8631Z" fill="white"/>
        <path d="M5.99684 14.481L0 10.4639L5.99684 0V14.481Z" fill="#C5C5C5"/>
        <path d="M6.00288 14.481V0L12 10.4639L6.00288 14.481Z" fill="white"/>
        <path d="M5.99684 15.6599L0 11.6428L5.99684 14.481V15.6599Z" fill="#7E7E7E"/>
        <path d="M6.00288 15.6599V14.481L12 11.6428L6.00288 15.6599Z" fill="#C5C5C5"/>
    </svg>
);

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z" fill="currentColor"/>
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const WalletIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0-2.25-4.5M3 12l2.25-4.5M12 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0-2.25 4.5M3 12l2.25 4.5M12 12a2.25 2.25 0 0 1 2.25 2.25h4.5a2.25 2.25 0 0 1 2.25-2.25M12 12a2.25 2.25 0 0 0-2.25 2.25H5.25A2.25 2.25 0 0 0 3 12m18 0l-2.25 4.5M3 12l2.25 4.5" />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const InformationCircleIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

export const PaperClipIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.122 2.122l7.81-7.81" />
  </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.455.09-.934.09-1.423A8.25 8.25 0 0 1 12 3.75c5.026 0 9 3.694 9 8.25Z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

export const StatsIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const CollectionIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-3.75 2.25M12 13.5l-3.75 2.25L12 18l3.75-2.25-3.75-2.25M12 13.5V18m0 4.5V18m0 0-3.75-2.25m3.75 2.25 3.75-2.25M17.571 12l4.179-2.25-4.179-2.25m-11.142 4.5 5.571 3 5.571-3" />
  </svg>
);

export const ExhibitionIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6ZM3.75 12h16.5" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
    </svg>
);

export const TwitterIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props} fill="currentColor">
    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
  </svg>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
  </svg>
);
export const ArrowTopRightOnSquareIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);
export const ArrowUpRightIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);
export const ArrowDownLeftIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
    </svg>
);
export const SalesIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-9-12h18M3 9h18M3 15h18" />
    </svg>
);
export const BillingIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
);
export const WithdrawalIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
    </svg>
);
export const SettingsIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);
export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-2.31 3.75 3.75 0 0 0-4.125-6.04M15 19.128v-3.376a3.75 3.75 0 0 0-3.75-3.75h-1.5a3.75 3.75 0 0 0-3.75 3.75v3.376M15 19.128a9.38 9.38 0 0 0 2.625.372M6.375 19.128a9.38 9.38 0 0 1 2.625.372m-2.625-.372a9.337 9.337 0 0 1-4.125-2.31 3.75 3.75 0 0 1 4.125-6.04M6.375 19.128v-3.376a3.75 3.75 0 0 1 3.75-3.75h1.5a3.75 3.75 0 0 1 3.75 3.75v3.376m-1.5-6.375a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" />
    </svg>
);
export const ContentIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
export const RocketIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 2.25a14.98 14.98 0 0 0-12.12 6.16.035.035 0 0 0 .017.036l4.8 5.84a6 6 0 0 1 7.38-5.84Z" />
    </svg>
);
export const EditIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);
export const DeleteIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);
export const WalletConnectIcon: React.FC<IconProps> = (props) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 10.6667C8 9.19391 9.19391 8 10.6667 8H21.3333C22.8061 8 24 9.19391 24 10.6667V21.3333C24 22.8061 22.8061 24 21.3333 24H10.6667C9.19391 24 8 22.8061 8 21.3333V10.6667Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.4088 12.4088C11.7421 13.0754 11.7421 14.1611 12.4088 14.8278L14.8278 17.2467C15.4944 17.9134 16.5801 17.9134 17.2467 17.2467L19.6657 14.8278C20.3323 14.1611 20.3323 13.0754 19.6657 12.4088C19.0042 11.7473 17.9257 11.7421 17.2541 12.4014L17.2467 12.4088L15.9997 13.6558L14.7527 12.4088C14.0861 11.7421 13.0754 11.7421 12.4088 12.4088Z" fill="white"/>
    </svg>
);
export const MetaMaskFoxIcon: React.FC<IconProps> = (props) => (
    <svg width="32" height="32" viewBox="0 0 92.5 83.6" {...props}>
        <path d="M88.9 26.6c-4.3-1-8.3-2.3-12.1-3.9-2-2-4.1-3.9-6.3-5.7-4-3.3-8.2-6.4-12.7-9.1-1.3-.8-2.8-1-4.3-1s-3 .2-4.3 1c-4.5 2.7-8.7 5.8-12.7 9.1-2.2 1.8-4.3 3.7-6.3 5.7-3.8 1.6-7.8 2.9-12.1 3.9-3.2.7-5.2 2.1-5.2 4.4 0 1.2.5 2.3 1.5 3.3l1.8 1.8c.3.3.6.5.9.7 0 .1.1.1.1.2 1.3 2.1 2.8 4.2 4.5 6.1 3.3 3.8 7.1 7.2 11.2 10.2l.2.1.2.1c5.2 3.1 11.1 4.8 17.2 4.8s12-1.7 17.2-4.8l.2-.1.2-.1c4.1-3 7.9-6.4 11.2-10.2 1.7-1.9 3.2-4 4.5-6.1 0-.1.1-.1.1-.2.3-.2.6-.4.9-.7l1.8-1.8c1-.9 1.5-2 1.5-3.3.1-2.3-1.9-3.7-5.2-4.4zM39.6 47.9c-2.8-.8-5.3-2-7.5-3.6-1.2-2.1-1.9-4.5-1.9-7.1 0-2.4.7-4.8 1.9-7 .8-1.4 1.8-2.7 2.9-3.9 1.8-1.8 3.9-3.3 6.1-4.4 3.1-1.5 6.4-2.3 9.8-2.3h.1c3.4 0 6.7.8 9.8 2.3 2.2 1.1 4.3 2.5 6.1 4.4 1.1 1.1 2.1 2.4 2.9 3.9 1.2 2.2 1.9 4.6 1.9 7 0 2.6-.7 5-1.9 7.1-2.2 1.6-4.7 2.8-7.5 3.6-2.5 1.5-5.3 2.6-8.3 3.3-1 .2-2.1.4-3.1.4-1.1 0-2.1-.1-3.1-.4-3-.7-5.8-1.8-8.3-3.3z" fill="#E2761B"/>
    </svg>
);
export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);
export const AtSymbolIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
    </svg>
);
export const KeyIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
    </svg>
);
export const FireIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 3.75 3.75 0 0 0-1.993-2.158c.133-.261.278-.52.44-.766A4.5 4.5 0 0 1 12 6c1.248 0 2.37.67 3 1.663a4.5 4.5 0 0 1-1.996 5.663c-.83.39-1.59.923-2.22 1.583A3.75 3.75 0 0 0 12 18Z" />
    </svg>
);
export const RainbowIcon: React.FC<IconProps> = (props) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="currentColor"/>
        <path d="M22.0435 12.0435C22.652 11.4349 23.5 11.7826 23.5 12.6521V19.3478C23.5 20.2173 22.652 20.565 22.0435 19.9564L19.5652 17.4782C19.2609 17.1738 18.7392 17.1738 18.4348 17.4782L16 19.9129L13.5652 17.4782C13.2609 17.1738 12.7392 17.1738 12.4348 17.4782L9.95652 19.9564C9.34795 20.565 8.5 20.2173 8.5 19.3478V12.6521C8.5 11.7826 9.34795 11.4349 9.95652 12.0435L12.4348 14.5217C12.7392 14.826 13.2609 14.826 13.5652 14.5217L16 12.0869L18.4348 14.5217C18.7392 14.826 19.2609 14.826 19.5652 14.5217L22.0435 12.0435Z" fill="white"/>
    </svg>
);

export const EthIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L5 12L12 15L19 12L12 2Z" fill="currentColor"/>
    <path d="M12 16L5 13L12 22L19 13L12 16Z" fill="currentColor"/>
  </svg>
);

export const LockClosedIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const EyeOffIcon: React.FC<IconProps> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.572M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.75 2.75 18.5 18.5" />
    </svg>
);