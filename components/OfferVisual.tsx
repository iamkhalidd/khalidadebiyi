import React, { useEffect, useState } from 'react';

export type OfferKind = 'web' | 'mobile' | 'business';

interface OfferVisualProps {
  kind: OfferKind;
  live: boolean;
}

const REVENUE = 12480;

// Counts up from zero each time the card comes alive; otherwise it shows the final figure
const useCountUp = (target: number, live: boolean) => {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!live || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return; }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, live]);
  return value;
};

const Web: React.FC = () => (
  <div className="v-web sf">
    <div className="bar"><i /><i /><i /><span className="url">yourbusiness.com</span></div>
    <div className="page">
      <div className="nav"><span className="logo" /><span className="ln" /><span className="ln" /><span className="ln" /></div>
      <span className="ln l1" />
      <span className="ln l2" />
      <span className="cta">
        Book now
        <svg className="cursor" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1l11 6.5-4.6 1.1L6.6 13z" fill="#F4F4F2" stroke="#26292E" strokeWidth="1" strokeLinejoin="round" /></svg>
      </span>
      <div className="grid"><span /><span /><span /></div>
    </div>
  </div>
);

const Mobile: React.FC = () => (
  <div className="v-phone">
    <div className="screen">
      <span className="notch" />
      <div className="toast"><i />New order · #1042</div>
      <div className="hdr"><span className="ln" /><b /></div>
      {[0, 1, 2, 3].map((i) => (
        <div className="row" key={i}><b /><div><span className="ln" /><span className="ln" /></div></div>
      ))}
    </div>
  </div>
);

const Business: React.FC<{ live: boolean }> = ({ live }) => {
  const revenue = useCountUp(REVENUE, live);
  return (
    <div className="v-ledger sf">
      <div>
        <p className="lbl">Revenue · this month</p>
        <strong>${revenue.toLocaleString('en-US')}</strong>
      </div>
      <div className="bars">{[38, 52, 44, 66, 58, 80, 100].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
      <div className="rows">
        <div><span>Debits</span><span>12,480.00</span></div>
        <div><span>Credits</span><span>12,480.00</span></div>
      </div>
      <span className="ok">✓ Balanced</span>
    </div>
  );
};

// A small drawn scene per card; it animates only while the card is open
const OfferVisual: React.FC<OfferVisualProps> = ({ kind, live }) => (
  <div className={`viz ${live ? 'live' : ''}`} aria-hidden="true">
    {kind === 'web' && <Web />}
    {kind === 'mobile' && <Mobile />}
    {kind === 'business' && <Business live={live} />}
  </div>
);

export default OfferVisual;
