import React from 'react';
import { X, Github, ExternalLink, Zap, Lightbulb } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d1117] border border-gray-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Hero Image */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
                        <p className="text-gray-300 text-sm md:text-base">{project.description}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-sm font-mono bg-cyber-green/10 text-cyber-green border border-cyber-green/30 rounded-lg"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.challenge && (
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                <div className="flex items-center gap-2 text-red-400 mb-2">
                                    <Zap size={18} />
                                    <h4 className="font-semibold">The Challenge</h4>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">{project.challenge}</p>
                            </div>
                        )}
                        {project.solution && (
                            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                                <div className="flex items-center gap-2 text-green-400 mb-2">
                                    <Lightbulb size={18} />
                                    <h4 className="font-semibold">The Solution</h4>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">{project.solution}</p>
                            </div>
                        )}
                    </div>

                    {/* Long Description */}
                    {project.longDescription && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">About This Project</h3>
                            <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <Github size={18} />
                                View Code
                            </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-cyber-green text-cyber-dark font-bold rounded-lg hover:bg-green-400 transition-colors"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
