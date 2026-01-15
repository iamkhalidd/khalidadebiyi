import React, { useEffect } from 'react';

interface CredlyBadgeProps {
    badgeId: string;
    width?: number;
    height?: number;
}

const CredlyBadge: React.FC<CredlyBadgeProps> = ({ badgeId, width = 150, height = 270 }) => {
    return (
        <div
            data-iframe-width={width}
            data-iframe-height={height}
            data-share-badge-id={badgeId}
            data-share-badge-host="https://www.credly.com"
        />
    );
};

interface CredlyBadgesProps {
    badgeIds: string[];
}

const CredlyBadges: React.FC<CredlyBadgesProps> = ({ badgeIds }) => {
    useEffect(() => {
        // Load the Credly embed script
        const existingScript = document.querySelector('script[src*="credly.com"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = '//cdn.credly.com/assets/utilities/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // If script exists, trigger re-render of badges
            // Credly's script looks for data attributes and creates iframes
            if ((window as any).credlyBadgeEmbed) {
                (window as any).credlyBadgeEmbed();
            }
        }

        return () => {
            // Cleanup is handled by Credly's script
        };
    }, [badgeIds]);

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {badgeIds.map((badgeId) => (
                <div key={badgeId} className="transition-transform hover:scale-105">
                    <CredlyBadge badgeId={badgeId} />
                </div>
            ))}
        </div>
    );
};

export default CredlyBadges;
