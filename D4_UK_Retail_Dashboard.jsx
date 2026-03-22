import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ReferenceLine, Area, AreaChart, ComposedChart } from "recharts";

const RAW = [{"d":"2017-01","ar":96.6,"f":102.3,"nf":100.7,"tx":99.0,"hh":109.2,"ns":67.8,"on":92.7,"ds":108.4},{"d":"2017-02","ar":97.3,"f":102.8,"nf":101.8,"tx":100.2,"hh":110.3,"ns":67.6,"on":93.9,"ds":109.1},{"d":"2017-03","ar":96.9,"f":102.7,"nf":101.1,"tx":101.3,"hh":110.5,"ns":67.7,"on":90.2,"ds":110.0},{"d":"2017-04","ar":98.4,"f":103.0,"nf":103.2,"tx":99.8,"hh":116.0,"ns":70.7,"on":95.2,"ds":109.4},{"d":"2017-05","ar":96.6,"f":102.1,"nf":100.6,"tx":99.7,"hh":106.9,"ns":68.9,"on":92.8,"ds":108.3},{"d":"2017-06","ar":97.8,"f":101.3,"nf":103.0,"tx":101.1,"hh":109.1,"ns":72.0,"on":96.3,"ds":111.0},{"d":"2017-07","ar":97.7,"f":101.8,"nf":102.8,"tx":101.3,"hh":111.5,"ns":70.7,"on":94.0,"ds":111.1},{"d":"2017-08","ar":98.7,"f":102.2,"nf":103.6,"tx":101.4,"hh":105.9,"ns":73.9,"on":98.9,"ds":112.0},{"d":"2017-09","ar":98.6,"f":102.2,"nf":101.9,"tx":101.5,"hh":108.6,"ns":78.1,"on":92.9,"ds":110.9},{"d":"2017-10","ar":98.6,"f":102.6,"nf":102.5,"tx":100.3,"hh":111.6,"ns":75.6,"on":95.2,"ds":109.3},{"d":"2017-11","ar":98.8,"f":102.5,"nf":103.0,"tx":100.4,"hh":110.1,"ns":75.9,"on":97.3,"ds":109.2},{"d":"2017-12","ar":98.9,"f":102.5,"nf":103.4,"tx":99.3,"hh":108.5,"ns":75.1,"on":98.6,"ds":112.4},{"d":"2018-01","ar":97.9,"f":101.5,"nf":103.2,"tx":98.9,"hh":111.1,"ns":71.8,"on":96.9,"ds":112.2},{"d":"2018-02","ar":98.3,"f":102.5,"nf":102.3,"tx":98.5,"hh":112.0,"ns":74.2,"on":94.9,"ds":110.8},{"d":"2018-03","ar":97.3,"f":101.2,"nf":101.6,"tx":97.1,"hh":113.5,"ns":72.9,"on":93.4,"ds":110.7},{"d":"2018-04","ar":98.5,"f":102.7,"nf":102.6,"tx":97.9,"hh":114.3,"ns":74.2,"on":96.3,"ds":108.6},{"d":"2018-05","ar":100.4,"f":104.1,"nf":104.2,"tx":101.0,"hh":114.2,"ns":78.1,"on":96.1,"ds":112.7},{"d":"2018-06","ar":100.0,"f":104.0,"nf":103.5,"tx":101.3,"hh":112.0,"ns":77.8,"on":94.7,"ds":113.4},{"d":"2018-07","ar":101.1,"f":104.8,"nf":104.4,"tx":103.6,"hh":111.7,"ns":81.0,"on":96.0,"ds":112.3},{"d":"2018-08","ar":101.4,"f":104.0,"nf":105.4,"tx":100.3,"hh":115.7,"ns":82.1,"on":99.5,"ds":112.7},{"d":"2018-09","ar":101.1,"f":103.3,"nf":105.5,"tx":100.8,"hh":117.6,"ns":81.8,"on":99.3,"ds":111.2},{"d":"2018-10","ar":100.5,"f":103.4,"nf":104.2,"tx":101.0,"hh":116.1,"ns":80.9,"on":96.9,"ds":109.7},{"d":"2018-11","ar":101.6,"f":103.8,"nf":105.9,"tx":101.7,"hh":117.4,"ns":82.6,"on":101.3,"ds":108.5},{"d":"2018-12","ar":101.8,"f":104.1,"nf":106.1,"tx":103.2,"hh":116.4,"ns":82.2,"on":98.6,"ds":113.1},{"d":"2019-01","ar":101.5,"f":105.0,"nf":104.9,"tx":103.0,"hh":111.0,"ns":81.0,"on":98.8,"ds":111.5},{"d":"2019-02","ar":101.6,"f":103.7,"nf":105.2,"tx":102.5,"hh":110.0,"ns":84.5,"on":101.8,"ds":110.1},{"d":"2019-03","ar":102.9,"f":104.2,"nf":106.9,"tx":104.1,"hh":112.8,"ns":87.1,"on":104.6,"ds":108.5},{"d":"2019-04","ar":102.6,"f":104.7,"nf":105.6,"tx":105.7,"hh":110.3,"ns":87.5,"on":101.0,"ds":108.2},{"d":"2019-05","ar":101.8,"f":103.9,"nf":104.6,"tx":100.8,"hh":111.0,"ns":87.1,"on":101.6,"ds":108.8},{"d":"2019-06","ar":103.1,"f":103.9,"nf":107.4,"tx":104.6,"hh":112.2,"ns":88.2,"on":105.3,"ds":109.8},{"d":"2019-07","ar":104.3,"f":104.7,"nf":106.1,"tx":104.9,"hh":108.1,"ns":97.6,"on":103.0,"ds":110.4},{"d":"2019-08","ar":103.5,"f":104.7,"nf":105.5,"tx":103.6,"hh":109.6,"ns":93.6,"on":102.1,"ds":109.7},{"d":"2019-09","ar":103.6,"f":105.4,"nf":105.5,"tx":103.4,"hh":113.0,"ns":92.8,"on":101.8,"ds":106.9},{"d":"2019-10","ar":102.8,"f":105.2,"nf":104.2,"tx":102.4,"hh":111.2,"ns":91.4,"on":99.0,"ds":108.5},{"d":"2019-11","ar":102.4,"f":104.5,"nf":104.1,"tx":99.5,"hh":110.6,"ns":91.2,"on":100.3,"ds":110.7},{"d":"2019-12","ar":103.3,"f":105.7,"nf":104.8,"tx":101.6,"hh":111.8,"ns":91.9,"on":101.0,"ds":109.0},{"d":"2020-01","ar":103.6,"f":105.5,"nf":106.1,"tx":104.0,"hh":110.5,"ns":90.4,"on":102.9,"ds":109.5},{"d":"2020-02","ar":102.8,"f":105.0,"nf":105.0,"tx":101.8,"hh":111.3,"ns":90.1,"on":102.8,"ds":107.0},{"d":"2020-03","ar":97.8,"f":113.2,"nf":84.3,"tx":65.6,"hh":101.2,"ns":93.6,"on":77.4,"ds":107.8},{"d":"2020-04","ar":83.6,"f":109.8,"nf":49.0,"tx":32.3,"hh":54.3,"ns":112.0,"on":41.9,"ds":81.6},{"d":"2020-05","ar":93.5,"f":111.4,"nf":61.5,"tx":38.7,"hh":77.7,"ns":137.5,"on":53.6,"ds":94.0},{"d":"2020-06","ar":105.0,"f":110.8,"nf":88.6,"tx":67.9,"hh":110.9,"ns":137.3,"on":86.4,"ds":101.7},{"d":"2020-07","ar":108.3,"f":108.1,"nf":100.6,"tx":79.9,"hh":121.1,"ns":131.8,"on":105.8,"ds":102.7},{"d":"2020-08","ar":109.6,"f":110.4,"nf":102.8,"tx":88.4,"hh":123.5,"ns":127.6,"on":102.2,"ds":104.7},{"d":"2020-09","ar":111.2,"f":110.9,"nf":106.8,"tx":89.8,"hh":127.1,"ns":125.8,"on":109.8,"ds":106.7},{"d":"2020-10","ar":112.3,"f":109.3,"nf":107.9,"tx":88.5,"hh":132.7,"ns":134.2,"on":110.0,"ds":109.1},{"d":"2020-11","ar":108.2,"f":111.7,"nf":96.5,"tx":69.2,"hh":126.3,"ns":133.6,"on":96.6,"ds":108.2},{"d":"2020-12","ar":108.9,"f":107.4,"nf":105.3,"tx":90.0,"hh":126.7,"ns":123.9,"on":106.0,"ds":106.0},{"d":"2021-01","ar":100.6,"f":111.2,"nf":78.8,"tx":56.0,"hh":98.8,"ns":136.1,"on":80.0,"ds":91.2},{"d":"2021-02","ar":101.7,"f":112.3,"nf":81.4,"tx":52.9,"hh":112.7,"ns":132.1,"on":76.4,"ds":102.6},{"d":"2021-03","ar":105.1,"f":113.5,"nf":88.7,"tx":60.8,"hh":117.4,"ns":130.4,"on":86.0,"ds":107.2},{"d":"2021-04","ar":113.7,"f":112.6,"nf":109.8,"tx":99.3,"hh":131.4,"ns":129.1,"on":106.6,"ds":109.6},{"d":"2021-05","ar":111.1,"f":107.1,"nf":111.4,"tx":95.9,"hh":135.6,"ns":122.2,"on":114.4,"ds":105.8},{"d":"2021-06","ar":111.9,"f":110.7,"nf":110.1,"tx":96.4,"hh":125.2,"ns":120.5,"on":116.9,"ds":103.9},{"d":"2021-07","ar":108.8,"f":109.6,"nf":105.9,"tx":94.2,"hh":121.1,"ns":115.0,"on":109.7,"ds":101.6},{"d":"2021-08","ar":109.0,"f":109.1,"nf":107.1,"tx":98.3,"hh":118.2,"ns":114.4,"on":111.3,"ds":101.7},{"d":"2021-09","ar":108.6,"f":108.1,"nf":106.9,"tx":99.9,"hh":111.9,"ns":115.6,"on":111.2,"ds":104.2},{"d":"2021-10","ar":109.3,"f":108.3,"nf":109.1,"tx":103.0,"hh":114.8,"ns":112.7,"on":113.7,"ds":104.2},{"d":"2021-11","ar":108.4,"f":107.3,"nf":107.8,"tx":103.0,"hh":110.8,"ns":113.7,"on":113.9,"ds":101.1},{"d":"2021-12","ar":108.7,"f":108.2,"nf":106.3,"tx":100.2,"hh":115.6,"ns":117.6,"on":109.1,"ds":101.4},{"d":"2022-01","ar":107.8,"f":105.4,"nf":105.4,"tx":92.7,"hh":111.5,"ns":121.9,"on":115.3,"ds":101.1},{"d":"2022-02","ar":106.2,"f":104.5,"nf":105.2,"tx":100.1,"hh":110.5,"ns":114.0,"on":108.3,"ds":102.2},{"d":"2022-03","ar":105.4,"f":104.5,"nf":107.5,"tx":99.9,"hh":112.7,"ns":102.0,"on":112.7,"ds":104.6},{"d":"2022-04","ar":104.5,"f":103.7,"nf":104.1,"tx":99.9,"hh":108.7,"ns":108.0,"on":106.6,"ds":101.4},{"d":"2022-05","ar":103.1,"f":101.6,"nf":104.0,"tx":101.9,"hh":108.1,"ns":104.9,"on":105.9,"ds":100.0},{"d":"2022-06","ar":103.4,"f":104.5,"nf":103.4,"tx":100.7,"hh":102.8,"ns":100.3,"on":107.7,"ds":100.5},{"d":"2022-07","ar":103.7,"f":105.3,"nf":103.2,"tx":100.8,"hh":102.2,"ns":100.8,"on":106.5,"ds":101.8},{"d":"2022-08","ar":101.8,"f":104.6,"nf":99.8,"tx":96.0,"hh":102.2,"ns":99.8,"on":102.9,"ds":98.0},{"d":"2022-09","ar":100.4,"f":101.8,"nf":100.0,"tx":97.3,"hh":102.3,"ns":97.7,"on":102.3,"ds":97.7},{"d":"2022-10","ar":101.4,"f":101.7,"nf":102.0,"tx":100.2,"hh":101.7,"ns":98.7,"on":106.3,"ds":97.6},{"d":"2022-11","ar":100.5,"f":102.0,"nf":101.0,"tx":101.2,"hh":102.9,"ns":95.1,"on":101.6,"ds":97.6},{"d":"2022-12","ar":100.4,"f":101.1,"nf":101.2,"tx":103.6,"hh":101.7,"ns":96.1,"on":99.7,"ds":100.0},{"d":"2023-01","ar":100.5,"f":100.8,"nf":100.8,"tx":103.2,"hh":101.1,"ns":98.8,"on":99.1,"ds":100.0},{"d":"2023-02","ar":101.3,"f":101.2,"nf":101.9,"tx":103.2,"hh":99.2,"ns":99.6,"on":102.9,"ds":101.0},{"d":"2023-03","ar":100.0,"f":100.4,"nf":100.0,"tx":101.0,"hh":100.0,"ns":98.9,"on":98.9,"ds":100.4},{"d":"2023-04","ar":101.4,"f":101.1,"nf":102.4,"tx":102.6,"hh":102.4,"ns":99.4,"on":102.7,"ds":101.7},{"d":"2023-05","ar":100.7,"f":100.4,"nf":101.2,"tx":101.2,"hh":101.9,"ns":100.2,"on":100.2,"ds":102.1},{"d":"2023-06","ar":101.5,"f":101.4,"nf":102.2,"tx":102.7,"hh":101.5,"ns":100.0,"on":100.8,"ds":104.4},{"d":"2023-07","ar":99.8,"f":98.7,"nf":100.3,"tx":99.5,"hh":101.2,"ns":101.5,"on":100.6,"ds":100.0},{"d":"2023-08","ar":99.9,"f":99.9,"nf":99.4,"tx":98.3,"hh":101.1,"ns":101.5,"on":99.4,"ds":99.4},{"d":"2023-09","ar":98.4,"f":99.9,"nf":97.0,"tx":94.9,"hh":98.8,"ns":98.4,"on":97.4,"ds":97.7},{"d":"2023-10","ar":99.3,"f":100.4,"nf":97.9,"tx":98.3,"hh":97.2,"ns":100.4,"on":97.5,"ds":98.5},{"d":"2023-11","ar":100.8,"f":100.8,"nf":100.4,"tx":99.7,"hh":98.6,"ns":102.2,"on":102.6,"ds":99.3},{"d":"2023-12","ar":97.0,"f":95.6,"nf":97.4,"tx":96.6,"hh":97.3,"ns":99.9,"on":99.1,"ds":95.9},{"d":"2024-01","ar":100.0,"f":100.2,"nf":100.0,"tx":97.4,"hh":96.4,"ns":99.7,"on":105.3,"ds":98.3},{"d":"2024-02","ar":100.1,"f":99.9,"nf":100.2,"tx":96.1,"hh":96.1,"ns":100.6,"on":105.6,"ds":101.2},{"d":"2024-03","ar":99.6,"f":98.5,"nf":100.7,"tx":96.8,"hh":97.0,"ns":99.7,"on":108.7,"ds":96.9},{"d":"2024-04","ar":98.2,"f":98.1,"nf":98.0,"tx":92.4,"hh":94.5,"ns":99.0,"on":106.0,"ds":96.5},{"d":"2024-05","ar":101.3,"f":98.9,"nf":101.9,"tx":98.4,"hh":99.2,"ns":106.8,"on":107.8,"ds":99.7},{"d":"2024-06","ar":99.5,"f":97.7,"nf":99.7,"tx":96.6,"hh":95.8,"ns":104.3,"on":106.9,"ds":95.9},{"d":"2024-07","ar":100.0,"f":98.0,"nf":100.4,"tx":96.2,"hh":94.9,"ns":105.0,"on":107.5,"ds":100.3},{"d":"2024-08","ar":100.7,"f":99.7,"nf":101.0,"tx":97.8,"hh":96.8,"ns":102.7,"on":106.5,"ds":100.4},{"d":"2024-09","ar":100.5,"f":98.1,"nf":102.2,"tx":97.1,"hh":97.0,"ns":102.7,"on":110.6,"ds":100.7},{"d":"2024-10","ar":99.7,"f":97.4,"nf":101.1,"tx":95.6,"hh":96.7,"ns":102.5,"on":108.8,"ds":101.1},{"d":"2024-11","ar":99.8,"f":97.9,"nf":100.8,"tx":91.2,"hh":96.5,"ns":103.2,"on":112.1,"ds":100.1},{"d":"2024-12","ar":99.9,"f":97.6,"nf":102.1,"tx":95.5,"hh":97.5,"ns":100.3,"on":111.2,"ds":101.1},{"d":"2025-01","ar":98.9,"f":99.3,"nf":99.8,"tx":94.0,"hh":96.0,"ns":95.0,"on":105.7,"ds":102.4},{"d":"2025-02","ar":100.7,"f":98.2,"nf":103.2,"tx":97.0,"hh":102.8,"ns":100.9,"on":109.2,"ds":102.8},{"d":"2025-03","ar":102.1,"f":98.7,"nf":105.0,"tx":99.2,"hh":100.1,"ns":103.7,"on":114.1,"ds":103.0},{"d":"2025-04","ar":101.7,"f":99.4,"nf":103.0,"tx":97.3,"hh":100.1,"ns":104.6,"on":109.0,"ds":104.4},{"d":"2025-05","ar":100.2,"f":97.6,"nf":101.1,"tx":94.0,"hh":97.8,"ns":105.5,"on":108.4,"ds":102.6},{"d":"2025-06","ar":101.1,"f":98.9,"nf":101.6,"tx":96.1,"hh":98.5,"ns":106.2,"on":106.7,"ds":104.2},{"d":"2025-07","ar":102.5,"f":100.7,"nf":102.4,"tx":99.2,"hh":99.4,"ns":108.1,"on":106.5,"ds":103.1},{"d":"2025-08","ar":102.5,"f":99.6,"nf":103.2,"tx":99.5,"hh":99.9,"ns":109.5,"on":107.7,"ds":104.6},{"d":"2025-09","ar":103.4,"f":99.6,"nf":104.8,"tx":103.1,"hh":100.7,"ns":111.1,"on":108.7,"ds":104.8},{"d":"2025-10","ar":102.7,"f":99.0,"nf":104.5,"tx":100.4,"hh":103.0,"ns":108.9,"on":110.1,"ds":102.6},{"d":"2025-11","ar":102.0,"f":98.8,"nf":104.6,"tx":101.5,"hh":103.7,"ns":104.5,"on":108.0,"ds":104.2},{"d":"2025-12","ar":102.3,"f":99.0,"nf":103.3,"tx":99.9,"hh":100.8,"ns":109.9,"on":108.6,"ds":101.8},{"d":"2026-01","ar":104.4,"f":100.2,"nf":105.6,"tx":100.0,"hh":104.0,"ns":113.7,"on":114.4,"ds":100.5}];

const NAMES = { ar:"All Retail (exc. fuel)", f:"Food Stores", nf:"Non-Food Stores", tx:"Textiles & Clothing", hh:"Household Goods", ns:"Non-Store (Online)", on:"Other Non-Food", ds:"Dept. Stores" };
const COLORS = { ar:"#1F4E79", f:"#2E7D32", nf:"#C62828", tx:"#F57F17", hh:"#6A1B9A", ns:"#00838F", on:"#E65100", ds:"#37474F" };

const VIEWS = ["Sector Trends","Indexed to 2019","Year-on-Year Change","Seasonal Patterns","Non-Store Growth","Sector Comparison"];

export default function Dashboard() {
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState(["ar","nf","tx","hh","ns"]);
  const [startYear, setStartYear] = useState(2019);

  const filtered = useMemo(() => RAW.filter(r => parseInt(r.d) >= startYear), [startYear]);

  const baseline = useMemo(() => {
    const jan19 = RAW.find(r => r.d === "2019-01");
    return jan19 || {};
  }, []);

  const indexed = useMemo(() => filtered.map(r => {
    const out = { d: r.d };
    Object.keys(NAMES).forEach(k => {
      if (r[k] != null && baseline[k]) out[k] = +((r[k] / baseline[k]) * 100).toFixed(1);
    });
    return out;
  }), [filtered, baseline]);

  const yoy = useMemo(() => {
    const result = [];
    filtered.forEach(r => {
      const yr = parseInt(r.d); const mo = r.d.slice(5);
      const prev = RAW.find(x => x.d === `${yr-1}-${mo}`);
      if (!prev) return;
      const out = { d: r.d };
      Object.keys(NAMES).forEach(k => {
        if (r[k] != null && prev[k] && prev[k] > 0) out[k] = +(((r[k]-prev[k])/prev[k])*100).toFixed(1);
      });
      result.push(out);
    });
    return result;
  }, [filtered]);

  const seasonal = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const pre = RAW.filter(r => r.d >= "2017-01" && r.d < "2020-01");
    const post = RAW.filter(r => r.d >= "2022-01" && r.d <= "2025-12");
    return months.map((m, i) => {
      const mo = String(i+1).padStart(2,"0");
      const out = { month: m };
      ["nf","tx","hh"].forEach(k => {
        const preVals = pre.filter(r => r.d.endsWith(`-${mo}`)).map(r => r[k]).filter(Boolean);
        const postVals = post.filter(r => r.d.endsWith(`-${mo}`)).map(r => r[k]).filter(Boolean);
        out[`${k}_pre`] = preVals.length ? +(preVals.reduce((a,b)=>a+b,0)/preVals.length).toFixed(1) : null;
        out[`${k}_post`] = postVals.length ? +(postVals.reduce((a,b)=>a+b,0)/postVals.length).toFixed(1) : null;
      });
      return out;
    });
  }, []);

  const latest = RAW[RAW.length - 1];
  const latestDate = latest.d;

  const toggle = k => setSelected(s => s.includes(k) ? s.filter(x=>x!==k) : [...s, k]);

  const kpiCards = [
    { label: "All Retail", val: latest.ar, vs19: ((latest.ar/baseline.ar-1)*100).toFixed(1), key: "ar" },
    { label: "Non-Food", val: latest.nf, vs19: ((latest.nf/baseline.nf-1)*100).toFixed(1), key: "nf" },
    { label: "Textiles", val: latest.tx, vs19: ((latest.tx/baseline.tx-1)*100).toFixed(1), key: "tx" },
    { label: "Household", val: latest.hh, vs19: ((latest.hh/baseline.hh-1)*100).toFixed(1), key: "hh" },
    { label: "Non-Store", val: latest.ns, vs19: ((latest.ns/baseline.ns-1)*100).toFixed(1), key: "ns" },
  ];

  const fmt = v => { const d = new Date(v+"-15"); return d.toLocaleDateString("en-GB",{month:"short",year:"2-digit"}); };

  const renderChart = () => {
    switch(view) {
      case 0: return (
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={filtered} margin={{top:10,right:30,left:10,bottom:10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="d" tickFormatter={fmt} tick={{fontSize:11}} interval={5}/>
            <YAxis domain={['auto','auto']} tick={{fontSize:11}} label={{value:'Index (2019=100)',angle:-90,position:'insideLeft',style:{fontSize:12}}}/>
            <Tooltip labelFormatter={v=>fmt(v)} formatter={(v,n)=>[v,NAMES[n]]}/>
            <ReferenceLine x="2020-03" stroke="#999" strokeDasharray="3 3" label={{value:"COVID",position:"top",fontSize:10}}/>
            {selected.map(k => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[k]} strokeWidth={2} dot={false} name={k}/>)}
          </LineChart>
        </ResponsiveContainer>
      );
      case 1: return (
        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={indexed} margin={{top:10,right:30,left:10,bottom:10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="d" tickFormatter={fmt} tick={{fontSize:11}} interval={5}/>
            <YAxis domain={['auto','auto']} tick={{fontSize:11}} label={{value:'Jan 2019 = 100',angle:-90,position:'insideLeft',style:{fontSize:12}}}/>
            <Tooltip labelFormatter={v=>fmt(v)} formatter={(v,n)=>[v,NAMES[n]]}/>
            <ReferenceLine y={100} stroke="#333" strokeDasharray="4 4" strokeWidth={1.5}/>
            <ReferenceLine x="2020-03" stroke="#999" strokeDasharray="3 3"/>
            {selected.map(k => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[k]} strokeWidth={2} dot={false} name={k}/>)}
          </LineChart>
        </ResponsiveContainer>
      );
      case 2: return (
        <ResponsiveContainer width="100%" height={420}>
          <ComposedChart data={yoy} margin={{top:10,right:30,left:10,bottom:10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="d" tickFormatter={fmt} tick={{fontSize:11}} interval={5}/>
            <YAxis tick={{fontSize:11}} label={{value:'YoY Change %',angle:-90,position:'insideLeft',style:{fontSize:12}}}/>
            <Tooltip labelFormatter={v=>fmt(v)} formatter={(v,n)=>[`${v}%`,NAMES[n]]}/>
            <ReferenceLine y={0} stroke="#333" strokeWidth={1.5}/>
            {selected.map(k => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[k]} strokeWidth={2} dot={false} name={k}/>)}
          </ComposedChart>
        </ResponsiveContainer>
      );
      case 3: return (
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={seasonal} margin={{top:10,right:30,left:10,bottom:10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="month" tick={{fontSize:11}}/>
            <YAxis domain={[90,115]} tick={{fontSize:11}} label={{value:'Avg Index',angle:-90,position:'insideLeft',style:{fontSize:12}}}/>
            <Tooltip formatter={(v,n)=>{
              const labels = {nf_pre:"Non-Food (2017-19)",nf_post:"Non-Food (2022-25)",tx_pre:"Textiles (2017-19)",tx_post:"Textiles (2022-25)",hh_pre:"Household (2017-19)",hh_post:"Household (2022-25)"};
              return [v, labels[n]||n];
            }}/>
            <Legend formatter={n=>{
              const labels = {nf_pre:"Non-Food (Pre)",nf_post:"Non-Food (Post)",tx_pre:"Textiles (Pre)",tx_post:"Textiles (Post)",hh_pre:"Household (Pre)",hh_post:"Household (Post)"};
              return labels[n]||n;
            }}/>
            <Bar dataKey="nf_pre" fill="#C6282866" name="nf_pre"/>
            <Bar dataKey="nf_post" fill="#C62828" name="nf_post"/>
            <Bar dataKey="tx_pre" fill="#F57F1766" name="tx_pre"/>
            <Bar dataKey="tx_post" fill="#F57F17" name="tx_post"/>
          </BarChart>
        </ResponsiveContainer>
      );
      case 4: {
        const nsData = RAW.filter(r => r.d >= "2017-01").map(r => ({ d: r.d, ns: r.ns, ar: r.ar }));
        return (
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart data={nsData} margin={{top:10,right:30,left:10,bottom:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
              <XAxis dataKey="d" tickFormatter={fmt} tick={{fontSize:11}} interval={8}/>
              <YAxis tick={{fontSize:11}} label={{value:'Index (2019=100)',angle:-90,position:'insideLeft',style:{fontSize:12}}}/>
              <Tooltip labelFormatter={v=>fmt(v)} formatter={(v,n)=>[v, n==="ns"?"Non-Store Retail":"All Retail"]}/>
              <ReferenceLine x="2020-03" stroke="#999" strokeDasharray="3 3" label={{value:"COVID",position:"top",fontSize:10}}/>
              <Area type="monotone" dataKey="ns" stroke="#00838F" fill="#00838F33" strokeWidth={2} name="ns"/>
              <Area type="monotone" dataKey="ar" stroke="#1F4E79" fill="#1F4E7922" strokeWidth={2} name="ar"/>
            </AreaChart>
          </ResponsiveContainer>
        );
      }
      case 5: {
        const compData = RAW.filter(r => r.d >= "2019-01").map(r => {
          const out = { d: r.d };
          Object.keys(NAMES).forEach(k => { if(baseline[k]) out[k] = +((r[k]/baseline[k])*100).toFixed(1); });
          return out;
        });
        const latestComp = compData[compData.length - 1];
        const sorted = Object.keys(NAMES).filter(k=>latestComp[k]).sort((a,b)=>latestComp[b]-latestComp[a]).map(k=>({
          name: NAMES[k], value: latestComp[k], color: COLORS[k], change: (latestComp[k]-100).toFixed(1)
        }));
        return (
          <div style={{padding:"0 20px"}}>
            <p style={{fontSize:13,color:"#666",marginBottom:16}}>Change since Jan 2019 (baseline = 100) as of {fmt(latestDate)}</p>
            {sorted.map((s,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",marginBottom:10,gap:12}}>
                <div style={{width:160,fontSize:13,fontWeight:600,color:"#333"}}>{s.name}</div>
                <div style={{flex:1,background:"#f0f0f0",borderRadius:4,height:28,position:"relative",overflow:"hidden"}}>
                  <div style={{
                    position:"absolute",left:s.value>=100?"50%":"auto",right:s.value<100?"50%":"auto",
                    width:`${Math.abs(s.value-100)/2}%`,height:"100%",
                    background: s.value>=100 ? "#2E7D32" : "#C62828",
                    borderRadius:4,opacity:0.8,
                    ...(s.value>=100?{}:{right:`${50}%`})
                  }}/>
                  <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:2,background:"#333"}}/>
                </div>
                <div style={{width:70,textAlign:"right",fontSize:14,fontWeight:700,color:s.value>=100?"#2E7D32":"#C62828"}}>
                  {s.value >= 100 ? "+" : ""}{s.change}%
                </div>
              </div>
            ))}
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f8f9fb",minHeight:"100vh",color:"#1a1a2e"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1F4E79 0%,#2E75B6 100%)",padding:"24px 32px",color:"white"}}>
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:2,opacity:0.8,marginBottom:4}}>Business Analysis Portfolio — Deliverable 4</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:700}}>UK Retail Sales Dashboard</h1>
        <p style={{margin:"6px 0 0",fontSize:14,opacity:0.85}}>ONS Retail Sales Index — Chained Volume, Seasonally Adjusted (2019=100) — Data to {fmt(latestDate)}</p>
      </div>

      {/* KPI Cards */}
      <div style={{display:"flex",gap:12,padding:"16px 24px",flexWrap:"wrap"}}>
        {kpiCards.map((c,i) => (
          <div key={i} style={{flex:"1 1 160px",background:"white",borderRadius:8,padding:"14px 16px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",borderLeft:`4px solid ${COLORS[c.key]}`}}>
            <div style={{fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:1}}>{c.label}</div>
            <div style={{fontSize:28,fontWeight:700,color:"#1a1a2e",marginTop:2}}>{c.val}</div>
            <div style={{fontSize:13,color:parseFloat(c.vs19)>=0?"#2E7D32":"#C62828",fontWeight:600}}>
              {parseFloat(c.vs19)>=0?"+":""}{c.vs19}% vs Jan 2019
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div style={{display:"flex",gap:4,padding:"0 24px",flexWrap:"wrap"}}>
        {VIEWS.map((v,i) => (
          <button key={i} onClick={()=>setView(i)} style={{
            padding:"8px 16px",border:"none",borderRadius:"6px 6px 0 0",cursor:"pointer",fontSize:13,fontWeight:view===i?700:400,
            background:view===i?"white":"transparent",color:view===i?"#1F4E79":"#666",
            boxShadow:view===i?"0 -1px 3px rgba(0,0,0,0.08)":"none",transition:"all 0.2s"
          }}>{v}</button>
        ))}
      </div>

      {/* Chart Area */}
      <div style={{background:"white",margin:"0 24px 16px",borderRadius:"0 8px 8px 8px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",padding:"20px 16px"}}>
        {/* Controls */}
        {view < 5 && (
          <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
            {view < 3 && (
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {Object.entries(NAMES).map(([k,n]) => (
                  <button key={k} onClick={()=>toggle(k)} style={{
                    padding:"4px 10px",borderRadius:12,border:`2px solid ${COLORS[k]}`,fontSize:11,cursor:"pointer",
                    background:selected.includes(k)?COLORS[k]:"transparent",
                    color:selected.includes(k)?"white":COLORS[k],fontWeight:600,transition:"all 0.2s"
                  }}>{n.replace(" (exc. fuel)","").replace(" Stores","")}</button>
                ))}
              </div>
            )}
            {view !== 4 && (
              <select value={startYear} onChange={e=>setStartYear(+e.target.value)} style={{
                padding:"4px 8px",borderRadius:6,border:"1px solid #ddd",fontSize:12,background:"white"
              }}>
                {[2017,2018,2019,2020,2021,2022,2023].map(y=><option key={y} value={y}>From {y}</option>)}
              </select>
            )}
          </div>
        )}
        {renderChart()}
      </div>

      {/* Methodology Note */}
      <div style={{margin:"0 24px 24px",padding:"16px 20px",background:"white",borderRadius:8,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",borderLeft:"4px solid #2E75B6"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1F4E79",marginBottom:4}}>Data Source & Methodology</div>
        <p style={{fontSize:12,color:"#666",margin:0,lineHeight:1.6}}>
          ONS Retail Sales Index (Dataset ID: DRSI) — Chained volume of retail sales, seasonally adjusted, index 2019=100. 
          {" "}109 monthly observations from January 2017 to January 2026. All sub-sector classifications follow SIC 2007. 
          Indexed views use January 2019 as the baseline (=100). Year-on-year change calculated as percentage change on same month 
          of previous year. Seasonal patterns compare pre-pandemic (2017–2019) averages with post-pandemic (2022–2025) averages by month.
        </p>
      </div>
    </div>
  );
}
