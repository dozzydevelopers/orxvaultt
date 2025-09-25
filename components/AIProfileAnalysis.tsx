
import React, { useState, useEffect, useRef } from 'react';
import type { Nft } from '../types';
import { SparklesIcon, XCircleIcon } from './Icons';
import { analyzeUserProfileStream } from '../services/geminiService';
import type { GenerateContentResponse } from '@google/genai';

interface AIProfileAnalysisProps {
    isOpen: boolean;
    onClose: () => void;
    nfts: Nft[];
}

const AIProfileAnalysis: React.FC<AIProfileAnalysisProps> = ({ isOpen, onClose, nfts }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (isOpen && !hasStarted.current) {
            hasStarted.current = true;
            const getAnalysis = async () => {
                setIsLoading(true);
                setError(null);
                setAnalysis('');
                try {
                    const stream = await analyzeUserProfileStream(nfts);
                    for await (const chunk of stream) {
                        setAnalysis(prev => prev + chunk.text);
                    }
                } catch (e) {
                    setError(e instanceof Error ? e.message : "Failed to generate analysis.");
                } finally {
                    setIsLoading(false);
                }
            };
            getAnalysis();
        } else if (!isOpen) {
            // Reset when closed
            hasStarted.current = false;
        }
    }, [isOpen, nfts]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-2xl w-full shadow-lg flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                    <SparklesIcon className="w-8 h-8 text-[var(--accent-text)]"/>
                    <h2 className="text-2xl font-bold">Your NFT Collection Analysis</h2>
                </div>
                <div className="flex-1 my-4 min-h-[200px] bg-[var(--background-primary)] p-4 rounded-lg overflow-y-auto">
                    {isLoading && !analysis && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--accent-secondary)]"></div>
                            <p className="mt-4 text-[var(--text-muted)]">Analyzing your collection with Gemini...</p>
                        </div>
                    )}
                    {error && (
                         <div className="flex flex-col items-center justify-center h-full text-center p-4">
                             <XCircleIcon className="w-12 h-12 text-red-500 mb-4" />
                            <p className="font-semibold text-[var(--error-text-header)]">Analysis Failed</p>
                            <p className="text-[var(--error-text-body)] mt-1">{error}</p>
                        </div>
                    )}
                    {analysis && (
                        <div className="prose prose-invert text-[var(--text-secondary)] whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
                    )}
                </div>
                <div className="flex">
                    <button type="button" onClick={onClose} className="w-full bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIProfileAnalysis;
