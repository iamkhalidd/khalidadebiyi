import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SKILLS_DATA } from '../constants';
import { SkillCategory } from '../types';

interface SkillRadarProps {
  highlight: SkillCategory[];
  color: string;
}

const NAVY = '#1B2A4A';

// All skills on one radar; the chosen discipline's skills get the accent, the rest stay a faint navy outline.
const SkillRadar: React.FC<SkillRadarProps> = ({ highlight, color }) => {
  const data = SKILLS_DATA.map((s) => ({
    ...s,
    active: highlight.includes(s.category) ? s.value : 0,
  }));

  return (
    <div className="h-[340px] w-full sm:h-[460px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="62%" data={data}>
          <PolarGrid stroke={NAVY} strokeOpacity={0.14} />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#5A5F68', fontSize: 11, fontFamily: 'Geist Mono' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#F4F4F2', border: `1px solid ${NAVY}`, borderRadius: 4, fontFamily: 'Geist', color: NAVY }}
            formatter={(_v, _n, item) => [`${item.payload.value} / 100`, item.payload.category]}
          />
          <Radar name="All skills" dataKey="value" stroke={NAVY} strokeOpacity={0.3} fill={NAVY} fillOpacity={0.04} />
          <Radar
            name="Selected"
            dataKey="active"
            stroke={NAVY}
            strokeWidth={1.5}
            fill={color}
            fillOpacity={0.55}
            isAnimationActive
            animationDuration={500}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
