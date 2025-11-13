'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const TRANSITION_MS = 500; // animation length in ms

interface Company {
    bgColor: string;
    name: string;
    oneliner: string;
    description: string;
    images: string[];
    url: string;
    website?: string;
    isSiteComingSoon?: boolean;
}

interface CompanySidePanelProps {
    company: Company | null;
    isOpen: boolean;
    onClose: () => void;
}

const CompanySidePanel = ({ company, isOpen, onClose }: CompanySidePanelProps) => {
    // mounted = component exists in DOM; visible = CSS-open state that triggers transitions
    const [mounted, setMounted] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const panelRef = useRef<HTMLElement | null>(null);

    // Drive mounted/visible from isOpen + company
    useEffect(() => {
        if (isOpen && company) {
            // Mount the component first
            setMounted(true);

            // Then on next tick (small delay) flip visible to true so CSS transition runs
            const t = setTimeout(() => setVisible(true), 20);
            return () => clearTimeout(t);
        }

        // If closing: flip visible -> false to start exit animation, then unmount after TRANSITION_MS
        setVisible(false);
        const t2 = setTimeout(() => setMounted(false), TRANSITION_MS);
        return () => clearTimeout(t2);
    }, [isOpen, company]);

    // Prevent background scroll while panel is mounted and open
    useEffect(() => {
        if (!mounted) return;
        const original = document.body.style.overflow;
        if (isOpen) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [mounted, isOpen]);

    // Focus the panel when it becomes visible
    useEffect(() => {
        if (visible && panelRef.current) panelRef.current.focus();
    }, [visible]);

    // ESC to close (only when visible)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && visible) onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [visible, onClose]);

    if (!company || !mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden={!visible}
                role="button"
                tabIndex={-1}
            />

            {/* Side Panel */}
            <aside
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                className={`fixed top-0 right-0 h-full w-full max-w-4xl z-50 ${company?.bgColor} shadow-2xl transform-gpu transition-transform duration-500 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ willChange: 'transform, opacity' }}
            >
                <div className="h-full overflow-hidden relative">
                    <div className="flex flex-row justify-between items-center p-8">
                        <h1 className="text-5xl font-normal text-gray-900">{company.name}</h1>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                            aria-label="Close panel"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className={`w-full h-full p-8 flex flex-col gap-16 overflow-y-auto pb-50`}>
                        <div className="grid grid-cols-5 gap-16">
                            <div className="col-span-3 flex flex-col gap-6">
                                <h2 className="text-2xl font-bold text-gray-900">{company?.oneliner}</h2>
                                <p className="text-2xl font-light text-gray-900">{company?.description}</p>
                            </div>
                            <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-2xl font-semibold text-gray-900">Website</h3>
                                    <a href={company?.url} target="_blank" rel="noopener noreferrer" className={`poppins text-2xl font-thin text-gray-900 cursor-pointer ${company?.isSiteComingSoon ? "text-gray-500" : "underline"}`}>{company?.isSiteComingSoon ? "Coming Soon" : company?.website}</a>
                                </div>
                            </div>
                        </div>
                        {/* 3-column grid: left two columns used for A and the two bottom tiles;
          right column is the tall phone tile (B) spanning both rows */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* A: Top-left wide logo (spans 2 columns) */}
                            <div className="col-span-1">
                                <div className="w-full aspect-video flex items-center justify-center bg-[#5B3DF0] rounded-lg overflow-hidden relative">
                                    <Image src={company?.images[0]} alt={company?.name} fill className="object-cover" />
                                </div>

                                <div className="w-full aspect-square flex items-center justify-center bg-slate-100 mt-4 rounded-lg overflow-hidden relative">
                                    <Image src={company?.images[1]} alt={company?.name} fill className="object-cover" />
                                </div>
                            </div>

                            {/* B: Right column tall phones (spans 2 rows) */}
                            <div className="col-span-1">
                                <div className="w-full aspect-square flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden relative">
                                    <Image src={company?.images[2]} alt={company?.name} fill className="object-cover" />
                                </div>

                                <div className="w-full aspect-video flex items-center justify-center bg-[#5B3DF0] mt-4 rounded-lg overflow-hidden relative">
                                    <Image src={company?.images[3]} alt={company?.name} fill className="object-cover" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default CompanySidePanel;