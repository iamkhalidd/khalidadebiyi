import React, { useEffect, useRef } from 'react';
import { X, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { MODES } from '../constants';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const hasLive = project.liveUrl && project.liveUrl !== '#';

    return (
        <div
            className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-6"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
        >
            <div className="scrim -z-10" aria-hidden="true" />
            <div className="sheet rise relative max-h-[92vh] w-full max-w-4xl overflow-y-auto">
                <button
                    ref={closeRef}
                    onClick={onClose}
                    className="icon-btn absolute right-4 top-4 z-10 bg-porcelain/90"
                    aria-label="Close project"
                >
                    <X size={18} />
                </button>

                <div className="overflow-hidden rounded-t-lg bg-mist">
                    <img src={project.imageUrl} alt="" className="aspect-[16/9] w-full object-cover object-top" />
                </div>

                <div className="space-y-10 p-6 sm:p-10">
                    <div>
                        <p className="mono text-brass">{MODES.filter((m) => project.modes.includes(m.id)).map((m) => m.field).join(' · ')}</p>
                        <h2 id="project-title" className="disp mt-3 text-4xl font-bold leading-none tracking-[-.04em] sm:text-5xl">{project.title}</h2>
                        <p className="mt-5 max-w-[62ch] text-lg text-slate">{project.longDescription ?? project.description}</p>
                    </div>

                    {(project.challenge || project.solution) && (
                        <div className="grid gap-8 border-t border-tie pt-8 sm:grid-cols-2">
                            {project.challenge && (
                                <div>
                                    <p className="mono mb-3 text-slate">The problem</p>
                                    <p>{project.challenge}</p>
                                </div>
                            )}
                            {project.solution && (
                                <div>
                                    <p className="mono mb-3 text-slate">What I built</p>
                                    <p>{project.solution}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {project.techStack && project.techStack.length > 0 && (
                        <div>
                            <p className="mono mb-3 text-slate">Stack</p>
                            <div className="chips">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="chip">{tech}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {(project.githubUrl || hasLive) && (
                        <div className="flex flex-wrap gap-3 border-t border-mist pt-8">
                            {hasLive && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn border-tie bg-tie text-shirt hover:bg-tie-2">
                                    Open live site <ArrowUpRight size={17} />
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
                                    <Github size={17} /> View code
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
