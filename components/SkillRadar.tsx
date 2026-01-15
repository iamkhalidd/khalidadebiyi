import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS_DATA } from '../constants';

const SkillRadar: React.FC = () => {
  // Filter or process data if needed
  const data = SKILLS_DATA;

  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#30363d" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#8b949e', fontSize: 12 }} 
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#00ff41"
            strokeWidth={2}
            fill="#00ff41"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;