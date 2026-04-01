import { useMemo, useState } from 'react';

const MaterialCalculator = () => {
  const [cementArea, setCementArea] = useState(100);
  const [cementThickness, setCementThickness] = useState(0.1);
  const [brickArea, setBrickArea] = useState(200);
  const [tileArea, setTileArea] = useState(120);

  const cementBags = useMemo(() => Math.ceil((cementArea * cementThickness) / 0.035), [cementArea, cementThickness]);
  const bricks = useMemo(() => Math.ceil(brickArea * 7), [brickArea]);
  const tileBoxes = useMemo(() => Math.ceil(tileArea / 15), [tileArea]);

  return (
    <section className="card">
      <h2 className="mb-4 text-xl font-bold">คำนวณวัสดุเบื้องต้น</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm">พื้นที่เทปูน (ตร.ม.)</label>
          <input type="number" className="mt-1 w-full rounded border p-2" value={cementArea} onChange={(e) => setCementArea(Number(e.target.value))} />
          <label className="mt-2 block text-sm">ความหนา (เมตร)</label>
          <input type="number" step="0.01" className="mt-1 w-full rounded border p-2" value={cementThickness} onChange={(e) => setCementThickness(Number(e.target.value))} />
          <p className="mt-2 text-sm font-semibold">ถุงปูนที่คาดว่าจะใช้: {cementBags}</p>
        </div>
        <div>
          <label className="text-sm">พื้นที่ผนังอิฐ (ตร.ม.)</label>
          <input type="number" className="mt-1 w-full rounded border p-2" value={brickArea} onChange={(e) => setBrickArea(Number(e.target.value))} />
          <p className="mt-2 text-sm font-semibold">จำนวนอิฐที่คาดว่าจะใช้: {bricks}</p>
        </div>
        <div>
          <label className="text-sm">พื้นที่ปูกระเบื้อง (ตร.ม.)</label>
          <input type="number" className="mt-1 w-full rounded border p-2" value={tileArea} onChange={(e) => setTileArea(Number(e.target.value))} />
          <p className="mt-2 text-sm font-semibold">จำนวนกล่องกระเบื้องที่คาดว่าจะใช้: {tileBoxes}</p>
        </div>
      </div>
    </section>
  );
};

export default MaterialCalculator;
