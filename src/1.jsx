import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area } from "recharts";

const C = { bg:"#0a0f1a",card:"#111827",cardAlt:"#1a2235",border:"#1e2d4a",accent:"#e63946",accentAlt:"#f77f00",blue:"#457b9d",blueLight:"#a8dadc",green:"#2a9d8f",gold:"#e9c46a",text:"#e8e8e8",textMuted:"#8899aa",white:"#f1faee",iran:"#2a9d8f",us:"#e63946",saudi:"#e9c46a",israel:"#457b9d",purple:"#9b5de5" };

const tabs = ["Overview","Conflict Map","Casualty Tracker","Global Markets","Hormuz Crisis","Cost Asymmetry","GCC Vulnerabilities","Strategic Analysis","Actors & Motives","Economic Chain","Timeline","2026 Forecasts"];

// ── DATA ──
const predictions = [{p:"Trump wins election",s:"Confirmed",d:"Nov 2024",c:100},{p:"US goes to war with Iran",s:"Confirmed",d:"Feb 28, 2026",c:100},{p:"US will lose the war",s:"Active",d:"Ongoing",c:85}];

const casualtyData = {
  iran:{dead:"787+",injured:"1000+",note:"Red Crescent figures; includes 168+ schoolgirls in Minab strike",src:"Al Jazeera / Iranian Red Crescent"},
  us:{dead:"6",injured:"18+",note:"Shuaiba port, Kuwait - direct hit on tactical ops center",src:"CENTCOM / CNN"},
  israel:{dead:"11+",injured:"Multiple",note:"Beit Shemesh, Bnei Brak, Rosh HaAyin strikes",src:"Israeli media"},
  gulf:{dead:"8+",injured:"40+",note:"Bahrain (1 killed), Kuwait (1 killed, 32 wounded), UAE (1 killed, 7 injured), Dubai Airport (4 injured)",src:"Al Jazeera live tracker"},
  lebanon:{dead:"40+",injured:"246+",note:"Israeli retaliatory strikes after Hezbollah joined",src:"Lebanon Health Ministry / NPR"},
};
const casualtyTimeline = [
  {day:"Feb 28",us:0,iran:200,gulf:2,label:"Strikes begin"},
  {day:"Mar 1",us:3,iran:400,gulf:5,label:"First US deaths"},
  {day:"Mar 2",us:6,iran:555,gulf:8,label:"Shuaiba toll rises"},
  {day:"Mar 3",us:6,iran:787,gulf:8,label:"Ongoing"},
];

const interceptorMath = [{m:"Interceptors per missile",v:"11",n:"All 11 missed (viral video)"},{m:"Cost per Iranian drone",v:"$50,000",n:"Mass produced Shahed-series"},{m:"Cost per US interceptor",v:"$1M-$10M+",n:"Limited supply chains"},{m:"Cost ratio",v:"200:1",n:"Iran's favor"},{m:"Supply remaining",v:"3-4 days",n:"At current consumption rate"},{m:"Kuwait interceptions",v:"97 missiles + 283 drones",n:"Waves keep coming"},{m:"Jordan interceptions",v:"49 drones + ballistic missiles",n:"Jordanian armed forces"},{m:"US warplanes crashed (Kuwait)",v:"Several",n:"All crew survived - Defense Ministry"}];

const iranAdv = [{subject:"Preparation",Iran:95,US:40},{subject:"Cost Efficiency",Iran:95,US:20},{subject:"Proxy Networks",Iran:90,US:30},{subject:"Geography",Iran:90,US:25},{subject:"Ideological Will",Iran:85,US:35},{subject:"Attrition Capacity",Iran:80,US:45},{subject:"Regional Intel",Iran:85,US:50},{subject:"Air Power",Iran:30,US:95}];

const actors = [
  {name:"Trump / US",color:C.us,icon:"\u{1F1FA}\u{1F1F8}",items:["Kushner $2B Saudi PE fund","Adelson $20-50M for 3rd term","Emergency war powers","Hubris from Maduro op","'Regime change' - Trump video statement","'4-5 weeks' timeline given","Pentagon admits Iran wasn't planning to strike first","War Powers notification to Congress Mar 2"]},
  {name:"Iran (IRGC)",color:C.iran,icon:"\u{1F1EE}\u{1F1F7}",items:["20 years prep — 'Great Satan' war","Struck 27 US bases across 9 countries","Closed Strait of Hormuz","Proxy network: Hezbollah, Houthis, Iraqi militias","Shot down US MQ-9 Reaper drone","15 cruise missiles at Ali Al Salem","Targeting economic hubs across Middle East","Faster response vs June 2025 — new command structure"]},
  {name:"Saudi Arabia",color:C.saudi,icon:"\u{1F1F8}\u{1F1E6}",items:["Existential threat from Iranian theocracy","Allowed US/Israel airspace use","US Embassy in Riyadh hit by 2 drones","Shot down 2 drones targeting major refinery","Oil infrastructure directly threatened","NEOM/tourism economic pivot failing","Economy 85% oil-dependent"]},
  {name:"Israel",color:C.israel,icon:"\u{1F1EE}\u{1F1F1}",items:["200 jets — largest IAF sortie ever","1,200+ munitions dropped across 24/31 provinces","F-22s at Ovda (1st US offensive weapons in Israel)","20,000 additional reservists called up (+ 50,000 existing)","Bombed Assembly of Experts during leadership vote","Trump: 'knocked out most of the candidates'","Adelson financing Trump's political operation"]}
];

const econChain = [{s:1,t:"Iran Strikes GCC Infrastructure",d:"Energy, desalination, airports, ports across 9 countries",i:"\u{1F4A5}"},{s:2,t:"Oil & LNG Exports Halt",d:"20% world oil + 20% global LNG disrupted; Qatar production shutdown",i:"\u{1F6E2}\u{FE0F}"},{s:3,t:"Petrodollar Loop Severed",d:"Gulf states can't sell oil → can't recycle dollars into US economy",i:"\u{1F4B5}"},{s:4,t:"AI Bubble Exposed",d:"GCC investment dries up; Amazon UAE/Bahrain DCs hit; tech sector vulnerable",i:"\u{1F916}"},{s:5,t:"US Financial System Stress",d:"Inflation fears, rate cut odds falling, silver shortage, bond yields volatile",i:"\u{1F4C9}"},{s:6,t:"Hegemony Transition",d:"Multipolar world; China/Russia empowered; dollar reserve status questioned",i:"\u{1F30D}"}];

const timeline = [
  {date:"May 29, 2024",event:"Game theory analysis predicts Trump win, Iran war, US defeat",type:"prediction"},
  {date:"Nov 2024",event:"Trump wins — Prediction #1 confirmed",type:"confirmed"},
  {date:"Jun 2025",event:"12-day Iran-Israel war; Iran analyzes US/Israeli strike capacity",type:"conflict"},
  {date:"Jan 2026",event:"Iranian protests — thousands killed; Trump: 'help is on the way'",type:"conflict"},
  {date:"Jan 2026",event:"Analysis update: US economic crisis, AI bubble, civil war forecasts",type:"prediction"},
  {date:"Jan-Feb 2026",event:"Largest US military buildup since 2003 Iraq invasion",type:"military"},
  {date:"Feb 15-20",event:"Iran front-loads oil exports to 3x normal; Saudi does same",type:"military"},
  {date:"Feb 24, 2026",event:"12 F-22s deployed to Ovda, Israel — first US offensive weapons",type:"military"},
  {date:"Feb 28, 2:30 AM",event:"Trump 8-min video: regime change objective declared",type:"conflict"},
  {date:"Feb 28, 2026",event:"Operation Epic Fury: US+Israel strike Iran; Khamenei killed",type:"conflict"},
  {date:"Feb 28, 2026",event:"Iran retaliates within hours: 27 bases, GCC airports, Hormuz threats",type:"conflict"},
  {date:"Mar 1, 2026",event:"3 US troops killed at Shuaiba port, Kuwait; Trump warns of more",type:"conflict"},
  {date:"Mar 1, 2026",event:"Dubai/Abu Dhabi airports hit; 20,000+ travelers stranded",type:"conflict"},
  {date:"Mar 2, 2026",event:"6 US killed total; Hezbollah joins; Akrotiri Cyprus drone strike",type:"conflict"},
  {date:"Mar 2, 2026",event:"IRGC officially declares Hormuz closed; tanker traffic drops to ~0",type:"conflict"},
  {date:"Mar 2, 2026",event:"Trump: '4-5 weeks'; War Powers notification to Congress",type:"military"},
  {date:"Mar 3, 2026",event:"Qatar shuts all LNG; EU gas +40%; Brent $83; Gold $5,300+",type:"conflict"},
  {date:"Mar 3, 2026",event:"Pentagon admits Iran wasn't planning to strike US first",type:"confirmed"},
  {date:"Mar 3, 2026",event:"Dow -1,200 intraday; VIX spikes to 25.4; interceptors ~3-4 days",type:"conflict"},
];

const forecasts = [
  {topic:"US-Iran War Outcome",pred:"US loses — war of attrition, no regime change from air",st:"Active",c:85},
  {topic:"AI Bubble",pred:"Burst when GCC investment dries up + silver shortage",st:"Warning",c:75},
  {topic:"US Economic Crisis",pred:"Major financial crisis; 'Ponzi scheme' unravels",st:"Warning",c:70},
  {topic:"Petrodollar",pred:"Collapse of dollar reserve currency system",st:"Active",c:80},
  {topic:"Multipolar World",pred:"China/Russia empowered; US hegemony ends",st:"Active",c:80},
  {topic:"Ground Troops",pred:"Pressure inevitable; 3-4M soldiers needed for Iran",st:"Forecast",c:60},
  {topic:"Silver Shortage",pred:"Critical for AI/EVs; demand exceeds supply",st:"Active",c:75},
  {topic:"Trump-China",pred:"April state visit — 'grand bargain' attempt",st:"Forecast",c:65},
  {topic:"Global Trade",pred:"Tariff retreat to 1930s-style breakdown",st:"Warning",c:70},
  {topic:"US Civil War",pred:"When economic bubble collapses; society fractures",st:"Forecast",c:50},
];
const historicals = [{e:"Athens-Sicily\n415 BCE",r:85},{e:"Hitler-USSR\n1941",r:90},{e:"US-Vietnam\n1965-75",r:95},{e:"US-Ukraine\n2022+",r:80},{e:"US-Iran\n2026",r:100}];

// MARKET DATA
const oilPriceData = [{day:"Feb 27",brent:73,gold:5100},{day:"Feb 28",brent:76,gold:5200},{day:"Mar 1",brent:82,gold:5247},{day:"Mar 2",brent:82.5,gold:5317},{day:"Mar 3",brent:83,gold:5300}];
const marketImpact = [
  {metric:"Brent Crude Oil",before:"$73/bbl",after:"$83/bbl",change:"+13%",proj:"$120-$200/bbl",color:C.accent},
  {metric:"Gold",before:"$5,100/oz",after:"$5,300+/oz",change:"+4%",proj:"$6,300 (JPM target)",color:C.gold},
  {metric:"EU Natural Gas",before:"Baseline",after:"+30-40%",change:"+40%",proj:"60+ EUR/MWh",color:C.accentAlt},
  {metric:"LNG Freight Rates",before:"Baseline",after:"+40%",change:"+40%",proj:"Rising daily",color:C.blue},
  {metric:"S&P 500",before:"6,884",after:"6,882 (recovered)",change:"-1.2% intraday",proj:"Volatile",color:C.green},
  {metric:"Dow Jones",before:"48,978",after:"48,905",change:"-1,200 intraday",proj:"War premium",color:C.blue},
  {metric:"VIX (Fear Index)",before:"~20",after:"25.4",change:"+27%",proj:"Elevated",color:C.accent},
  {metric:"Bitcoin",before:"$68K",after:"$66.4K",change:"-2.6%",proj:"Risk-off",color:C.purple},
  {metric:"10Y Treasury Yield",before:"3.97%",after:"4.04%",change:"+7bps",proj:"Inflation fears",color:C.accentAlt},
  {metric:"USD Index",before:"Baseline",after:"+0.95%",change:"5-week high",proj:"Safe haven bid",color:C.green},
  {metric:"Airlines (avg)",before:"Baseline",after:"-4% to -10%",change:"Fuel + cancellations",proj:"Pressure",color:C.accent},
  {metric:"Defense Stocks",before:"Baseline",after:"+2-3%",change:"LMT, NOC, RTX",proj:"Demand surge",color:C.green},
  {metric:"Energy Stocks",before:"Baseline",after:"+3-5%",change:"XOM, CVX, BP",proj:"Oil premium",color:C.green},
  {metric:"Palantir (PLTR)",before:"~$137",after:"$143+",change:"+4.4%",proj:"Defense AI play",color:C.green},
];
const oilScenarios = [{scenario:"Base Case (1-2 weeks)",price:"$90-100",src:"OPEC+ / Analysts",prob:"Likely"},{scenario:"Sustained Closure (3+ weeks)",price:"$120/bbl",src:"JPMorgan",prob:"High if persists"},{scenario:"GCC Infra Damaged",price:"$150+/bbl",src:"Bank of America",prob:"If Ras Tanura hit"},{scenario:"Full Blockade + Mining",price:"$200/bbl",src:"Deutsche Bank",prob:"Tail risk"},{scenario:"US gas pump impact",price:"+10-30¢/gal",src:"GasBuddy",prob:"This week"}];

const hormuzData = [
  {stat:"20M",label:"Barrels/day through Hormuz",sub:"20% of global oil supply"},
  {stat:"27%",label:"Of global maritime oil trade",sub:"Largest chokepoint in the world"},
  {stat:"150+",label:"Ships stranded outside strait",sub:"Unable to pass; anchored"},
  {stat:"~0%",label:"Current tanker traffic",sub:"Down from 100% pre-war"},
  {stat:"5",label:"Tankers damaged / 2 killed",sub:"IRGC attacks on vessels"},
  {stat:"20%",label:"Global LNG at risk",sub:"Qatar shut down all production"},
];
const asiaExposure = [{country:"Pakistan",dep:"99% LNG from Gulf",risk:"Critical"},{country:"Bangladesh",dep:"72% LNG from Gulf",risk:"Critical"},{country:"India",dep:"53% LNG from Gulf",risk:"High"},{country:"China",dep:"40% oil via Hormuz",risk:"High"},{country:"South Korea",dep:"Major crude importer",risk:"High"},{country:"Japan",dep:"Major crude importer",risk:"High"},{country:"Europe",dep:"30% jet fuel via Hormuz",risk:"Elevated"},{country:"Thailand",dep:"High oil import dependence",risk:"Elevated"}];

const whyAttacked = [{name:"Hubris (Maduro)",value:30},{name:"Political Calculus",value:45},{name:"Eschatological",value:25}];
const PIE_C = [C.accent,C.accentAlt,C.blue];

const mapLocs = [
  {name:"Tehran",lat:35.69,lng:51.39,type:"iran_struck",note:"Capital; Khamenei compound, IRGC HQ, Parliament, state TV hit"},
  {name:"Isfahan/Natanz",lat:32.65,lng:51.67,type:"iran_struck",note:"Nuclear facility; IAEA says no evidence of nuclear sites hit"},
  {name:"Tabriz",lat:38.08,lng:46.29,type:"iran_struck",note:"NW Iran military targets"},
  {name:"Kermanshah",lat:34.31,lng:47.07,type:"iran_struck",note:"Western missile sites"},
  {name:"Shiraz",lat:29.59,lng:52.58,type:"iran_struck",note:"Southern military facilities"},
  {name:"Bushehr",lat:28.92,lng:50.82,type:"iran_struck",note:"Nuclear reactor site"},
  {name:"Minab",lat:27.15,lng:57.08,type:"iran_struck",note:"Girls school strike — 168+ children killed"},
  {name:"Qom",lat:34.64,lng:50.88,type:"iran_struck",note:"Religious center"},
  {name:"Bandar Abbas",lat:27.19,lng:56.28,type:"iran_struck",note:"Port city; explosions visible from Hormuz"},
  {name:"Al Udeid, Qatar",lat:25.12,lng:51.32,type:"us_base",note:"10K+ troops; Hamad Airport attacked"},
  {name:"Ras Laffan, Qatar",lat:25.91,lng:51.56,type:"gcc_target",note:"LNG facility — production SHUT DOWN after drone hits"},
  {name:"5th Fleet, Bahrain",lat:26.22,lng:50.59,type:"us_base",note:"Naval HQ; 8,300 personnel; Juffair area hit"},
  {name:"Ali Al Salem, Kuwait",lat:29.35,lng:47.52,type:"us_base",note:"15 cruise missiles; several US warplanes crashed"},
  {name:"Shuaiba Port, Kuwait",lat:29.05,lng:48.17,type:"us_base",note:"6 US troops killed — direct hit on tactical ops center"},
  {name:"Al Dhafra, UAE",lat:24.25,lng:54.55,type:"us_base",note:"IRGC confirmed strike; AWS data centers nearby"},
  {name:"Muwaffaq Salti, Jordan",lat:31.83,lng:36.78,type:"us_base",note:"49 drones/missiles intercepted by Jordan"},
  {name:"Erbil, Iraq",lat:36.19,lng:44.01,type:"us_base",note:"Airport & consulate targeted"},
  {name:"Victory Base, Baghdad",lat:33.26,lng:44.23,type:"us_base",note:"2 drones; Iraqi militias claimed responsibility"},
  {name:"Ovda, Israel",lat:29.94,lng:34.94,type:"us_base",note:"12 F-22s deployed — first US offensive weapons in Israel"},
  {name:"Strait of Hormuz",lat:26.57,lng:56.25,type:"chokepoint",note:"CLOSED — 20% world oil; insurance withdrawn Mar 5"},
  {name:"Bab el-Mandeb",lat:12.58,lng:43.33,type:"chokepoint",note:"Red Sea chokepoint — Houthi threat zone"},
  {name:"Riyadh",lat:24.71,lng:46.68,type:"gcc_target",note:"US Embassy hit by 2 drones; refinery targeted"},
  {name:"Dubai",lat:25.25,lng:55.37,type:"gcc_target",note:"Airport hit (4 injured); 20K+ travelers stranded; AWS DC damaged"},
  {name:"Abu Dhabi",lat:24.45,lng:54.65,type:"gcc_target",note:"Airport hit; 1 killed, 7 injured; Fujairah oil zone fire"},
  {name:"Manama, Bahrain",lat:26.23,lng:50.59,type:"gcc_target",note:"Residential buildings hit; 1 killed in Salman Industrial City"},
  {name:"Kuwait City",lat:29.38,lng:47.99,type:"gcc_target",note:"Airport drone; 1 killed, 32 wounded nationwide"},
  {name:"Muscat, Oman",lat:23.61,lng:58.59,type:"gcc_target",note:"Explosions reported; UKMTO reports incident near Kumzar"},
  {name:"Akrotiri, Cyprus",lat:34.58,lng:32.99,type:"proxy",note:"UK/US base — Hezbollah drone strike; no casualties"},
  {name:"Tel Aviv",lat:32.09,lng:34.78,type:"proxy",note:"40+ buildings damaged; Hezbollah + IRGC strikes"},
  {name:"Haifa",lat:32.79,lng:34.99,type:"proxy",note:"Hezbollah rockets; IDF base targeted"},
  {name:"Southern Lebanon",lat:33.27,lng:35.20,type:"proxy",note:"Israeli retaliatory strikes — 40+ killed, 246 injured"},
  {name:"USS Lincoln",lat:25.0,lng:58.0,type:"carrier",note:"Carrier Strike Group 3 — Indian Ocean"},
  {name:"USS Ford",lat:32.5,lng:34.2,type:"carrier",note:"CSG-12 — off Israeli coast"},
];

const sources = [
  {name:"Al Jazeera",type:"Live tracker, Hormuz analysis",url:"aljazeera.com"},
  {name:"CNN",type:"Casualty reports, market analysis, Pentagon briefings",url:"cnn.com"},
  {name:"CNBC",type:"Oil prices, market data, Hormuz impact",url:"cnbc.com"},
  {name:"NPR",type:"US casualties, Lebanon, White House objectives",url:"npr.org"},
  {name:"CBS News",type:"Trump statements, Rubio briefing, War Powers",url:"cbsnews.com"},
  {name:"Washington Post",type:"US troops killed, oil market, air defense concerns",url:"washingtonpost.com"},
  {name:"TIME",type:"Strait of Hormuz, LNG, Qatar shutdown",url:"time.com"},
  {name:"Wikipedia",type:"2026 Iran conflict, Hormuz crisis",url:"wikipedia.org"},
  {name:"Kpler",type:"Energy market analytics, tanker tracking",url:"kpler.com"},
  {name:"House of Commons Library",type:"UK parliamentary briefing",url:"parliament.uk"},
  {name:"Bloomberg",type:"Bond yields, dollar, inflation fears",url:"bloomberg.com"},
  {name:"JPMorgan / Deutsche Bank / BofA",type:"Oil price scenarios, gold targets",url:"—"},
  {name:"CENTCOM",type:"US military casualty reports",url:"centcom.mil"},
  {name:"Fortune / PBS / NBC",type:"Market analysis, shipping disruption",url:"—"},
  {name:"Congress.gov (CRS)",type:"Strait of Hormuz policy analysis",url:"congress.gov"},
];

// ── COMPONENTS ──
function Badge({text,color}){return <span style={{background:color+"22",color,border:`1px solid ${color}44`,padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>{text}</span>}
function Card({children,style}){return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"18px 20px",...style}}>{children}</div>}
function ST({children,sub}){return <div style={{marginBottom:16}}><h2 style={{color:C.white,fontSize:18,fontWeight:700,margin:0}}>{children}</h2>{sub&&<p style={{color:C.textMuted,fontSize:12,margin:"3px 0 0"}}>{sub}</p>}</div>}
function TH({children}){return <th style={{color:C.textMuted,fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1,padding:"8px 10px",textAlign:"left"}}>{children}</th>}
function TD({children,style}){return <td style={{padding:"10px",color:C.text,fontSize:12,...style}}>{children}</td>}
function PB({value,color,w=50}){return <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:w,height:5,background:C.border,borderRadius:3}}><div style={{width:`${value}%`,height:"100%",background:color,borderRadius:3}}/></div><span style={{color,fontSize:11,fontWeight:700}}>{value}%</span></div>}
function Note({color,title,children}){return <Card style={{borderLeft:`3px solid ${color}`}}><p style={{color:C.text,fontSize:12,margin:0,lineHeight:1.7}}><strong style={{color}}>{title}:</strong> {children}</p></Card>}
function StatBox({n,l,c,sub}){return <Card style={{textAlign:"center",borderTop:`2px solid ${c}`}}><div style={{fontSize:26,fontWeight:800,color:c}}>{n}</div><div style={{fontSize:10,color:C.textMuted,marginTop:2}}>{l}</div>{sub&&<div style={{fontSize:9,color:C.textMuted,marginTop:2}}>{sub}</div>}</Card>}
function Bullet({items,color}){return items.map((t,i)=><div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:color||C.accent,fontSize:8,marginTop:5}}>{">"}</span><span style={{color:C.text,fontSize:11,lineHeight:1.5}}>{t}</span></div>)}

// ── TAB 0: OVERVIEW ──
function OverviewTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ST sub="Game theory + historical pattern analysis applied to the US-Iran conflict">Analytical Framework</ST>
    <Card style={{borderLeft:`3px solid ${C.accent}`}}>
      <div style={{fontSize:14,fontWeight:700,color:C.white,marginBottom:10}}>Core Thesis</div>
      <p style={{color:C.text,fontSize:13,lineHeight:1.7,margin:0}}>Iran doesn't need to win a military war. It's fighting a war of economic attrition targeting the entire Gulf economic ecosystem. The US military was designed for Cold War-era power projection — sophisticated, expensive technology meant to intimidate. Iran has inverted the equation with cheap, mass-produced asymmetric warfare that exhausts defensive systems through volume and targets the global financial infrastructure that sustains American hegemony.</p>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {predictions.map((pr,i)=><Card key={i} style={{textAlign:"center",borderTop:`3px solid ${pr.s==="Confirmed"?C.green:C.accentAlt}`}}>
        <div style={{fontSize:10,color:C.textMuted,fontWeight:600,marginBottom:6}}>PREDICTION #{i+1}</div>
        <div style={{fontSize:13,color:C.white,fontWeight:600,marginBottom:8}}>{pr.p}</div>
        <Badge text={pr.s} color={pr.s==="Confirmed"?C.green:C.accentAlt}/>
        <div style={{fontSize:10,color:C.textMuted,marginTop:6}}>{pr.d}</div>
      </Card>)}
    </div>
    <ST sub="Methodology">Approach</ST>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <Card><div style={{color:C.blue,fontSize:12,fontWeight:700,marginBottom:8}}>GAME THEORY</div><Bullet color={C.blue} items={["Map each player's rational self-interest","Identify incentive structures, not ideology","Calculate cost-benefit for every actor","Find Nash equilibria — stable outcomes","Predict forced moves with no good exits"]}/></Card>
      <Card><div style={{color:C.purple,fontSize:12,fontWeight:700,marginBottom:8}}>HISTORICAL PATTERNS</div><Bullet color={C.purple} items={["Empire overextension → collapse cycle","Athens-Sicily, Hitler-USSR, US-Vietnam","Hubris after easy wins → catastrophic overreach","Asymmetric warfare favors defenders","Economic exhaustion > military defeat"]}/></Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      <StatBox n="27" l="US bases targeted" c={C.us}/><StatBox n="9" l="Countries hit by Iran" c={C.iran}/><StatBox n="787+" l="Killed in Iran" c={C.accent}/><StatBox n="Day 4" l="Of active conflict" c={C.accentAlt}/>
    </div>
    <Note color={C.textMuted} title="Methodology">This analysis uses game theory (rational self-interest mapping) and historical pattern recognition. All data sourced from verified reporting — see Sources tab. Forecasts represent probability-weighted assessments, not certainties.</Note>
  </div>
}

// ── TAB 1: MAP ──
function MapTab(){
  const tc={iran_struck:"#e63946",us_base:"#457b9d",gcc_target:"#e9c46a",chokepoint:"#f77f00",proxy:"#9b5de5",carrier:"#a8dadc"};
  const tl={iran_struck:"Iran Struck",us_base:"US Base",gcc_target:"GCC Target",chokepoint:"Chokepoint",proxy:"Proxy/Ally",carrier:"Carrier"};
  const [sel,setSel]=useState(null);const [f,setF]=useState("all");
  const fl=f==="all"?mapLocs:mapLocs.filter(l=>l.type===f);
  const b={minLat:10,maxLat:42,minLng:28,maxLng:62},W=840,H=500;
  const pr=(lat,lng)=>({x:((lng-b.minLng)/(b.maxLng-b.minLng))*W,y:((b.maxLat-lat)/(b.maxLat-b.minLat))*H});
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ST sub={`${mapLocs.length} locations tracked — Operation Epic Fury & Iranian retaliation`}>Conflict Map</ST>
    <Card>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        <button onClick={()=>{setF("all");setSel(null)}} style={{background:f==="all"?C.white+"22":"transparent",color:C.white,border:`1px solid ${C.border}`,borderRadius:4,padding:"4px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>All ({mapLocs.length})</button>
        {Object.entries(tl).map(([k,v])=>{const cnt=mapLocs.filter(l=>l.type===k).length;return <button key={k} onClick={()=>{setF(k);setSel(null)}} style={{background:f===k?tc[k]+"33":"transparent",color:tc[k],border:`1px solid ${tc[k]}55`,borderRadius:4,padding:"4px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}><span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:tc[k],marginRight:4}}/>{v} ({cnt})</button>})}
      </div>
      <div style={{background:"#0d1520",borderRadius:6,overflow:"hidden",border:`1px solid ${C.border}`}}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
          {[14,18,22,26,30,34,38].map(lat=>{const y=pr(lat,0).y;return <g key={lat}><line x1={0} y1={y} x2={W} y2={y} stroke={C.border} strokeWidth={.5} strokeDasharray="4,4"/><text x={4} y={y-3} fill={C.textMuted} fontSize={7}>{lat}°N</text></g>})}
          {[32,36,40,44,48,52,56,60].map(lng=>{const x=pr(0,lng).x;return <g key={lng}><line x1={x} y1={0} x2={x} y2={H} stroke={C.border} strokeWidth={.5} strokeDasharray="4,4"/><text x={x+2} y={H-4} fill={C.textMuted} fontSize={7}>{lng}°E</text></g>})}
          <line x1={pr(0,55.5).x} y1={pr(27.5,0).y} x2={pr(0,57).x} y2={pr(25.5,0).y} stroke={C.accentAlt} strokeWidth={2.5} strokeDasharray="6,3" opacity={.7}/>
          <text x={pr(0,57.5).x} y={pr(26.5,0).y} fill={C.accentAlt} fontSize={9} fontWeight={700}>HORMUZ</text>
          <line x1={pr(0,43).x} y1={pr(13,0).y} x2={pr(0,43.5).x} y2={pr(12,0).y} stroke={C.accentAlt} strokeWidth={2} strokeDasharray="6,3" opacity={.5}/>
          <text x={pr(0,43.8).x} y={pr(12.5,0).y} fill={C.accentAlt} fontSize={8} fontWeight={600}>BAB EL-MANDEB</text>
          {fl.map((loc,i)=>{const p=pr(loc.lat,loc.lng);const co=tc[loc.type];const is=sel===i;const r=loc.type==="carrier"?7:loc.type==="chokepoint"?8:5;
            return <g key={i} style={{cursor:"pointer"}} onClick={()=>setSel(is?null:i)}>
              {(loc.type==="chokepoint"||loc.type==="carrier")&&<circle cx={p.x} cy={p.y} r={r+4} fill="none" stroke={co} strokeWidth={1} opacity={.3}><animate attributeName="r" from={r+2} to={r+10} dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from=".4" to="0" dur="2s" repeatCount="indefinite"/></circle>}
              <circle cx={p.x} cy={p.y} r={is?r+2:r} fill={co} opacity={.85} stroke={is?C.white:"none"} strokeWidth={1.5}/>
              {(is||f!=="all")&&<text x={p.x+r+4} y={p.y+3} fill={C.text} fontSize={8} fontWeight={is?700:400}>{loc.name.length>25?loc.name.slice(0,23)+"...":loc.name}</text>}
              {is&&<foreignObject x={Math.min(p.x+10,W-220)} y={Math.max(p.y-55,5)} width={210} height={70}><div style={{background:C.cardAlt+"ee",border:`1px solid ${co}`,borderRadius:6,padding:8}}><div style={{color:co,fontSize:10,fontWeight:700}}>{loc.name}</div><div style={{color:C.text,fontSize:9,marginTop:3,lineHeight:1.4}}>{loc.note}</div></div></foreignObject>}
            </g>})}
        </svg>
      </div>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      <StatBox n="27" l="US bases targeted" c={C.us} sub="Across 9 countries"/><StatBox n="24/31" l="Iranian provinces struck" c={C.accent} sub="1,200+ munitions dropped"/><StatBox n="1,000+" l="US targets hit" c={C.blue} sub="In first 2 days"/><StatBox n="9" l="Countries retaliatory strikes" c={C.iran} sub="Bahrain to Cyprus"/>
    </div>
  </div>
}

// ── TAB 2: CASUALTY TRACKER ──
function CasualtyTab(){
  const rows = [
    {who:"Iran (total)",dead:"787+",inj:"1,000+",color:C.iran,details:"Includes 168+ schoolgirls in Minab; hospitals hit; state TV, parliament targeted"},
    {who:"United States",dead:"6",inj:"18+",color:C.us,details:"Shuaiba port Kuwait direct hit; remains recovered over 2 days"},
    {who:"Israel",dead:"11+",inj:"Multiple",color:C.israel,details:"Beit Shemesh, Bnei Brak, Rosh HaAyin; 40+ buildings damaged Tel Aviv"},
    {who:"Lebanon",dead:"40+",inj:"246+",color:C.purple,details:"Israeli retaliatory strikes; southern Lebanon; Hezbollah triggered by Khamenei killing"},
    {who:"Kuwait",dead:"1",inj:"32",color:C.gold,details:"Airport drone; several US warplanes crashed (crew survived)"},
    {who:"Bahrain",dead:"1",inj:"Multiple",color:C.accentAlt,details:"Residential buildings; Salman Industrial City; 5th Fleet area"},
    {who:"UAE",dead:"1",inj:"11+",color:C.blue,details:"Abu Dhabi (1 killed, 7 injured); Dubai Airport (4 injured); Fujairah oil zone fire"},
    {who:"Qatar",dead:"0",inj:"Minor",color:C.green,details:"Ras Laffan & Mesaieed LNG facilities hit → ALL production shut down"},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ST sub="As of March 4, 2026 — figures rapidly evolving">Casualty & Damage Tracker</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      <StatBox n="787+" l="Killed in Iran" c={C.accent} sub="Red Crescent figures"/><StatBox n="6" l="US troops killed" c={C.us} sub="Shuaiba port, Kuwait"/><StatBox n="40+" l="Killed in Lebanon" c={C.purple} sub="Israeli retaliatory strikes"/><StatBox n="850+" l="Total killed (all sides)" c={C.white} sub="Rapidly increasing"/>
    </div>
    <Card><ResponsiveContainer width="100%" height={200}><AreaChart data={casualtyTimeline} margin={{left:10,right:10}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="day" tick={{fill:C.textMuted,fontSize:11}}/><YAxis tick={{fill:C.textMuted,fontSize:11}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}}/><Area type="monotone" dataKey="iran" stroke={C.iran} fill={C.iran} fillOpacity={.15} strokeWidth={2} name="Iran dead"/><Area type="monotone" dataKey="us" stroke={C.us} fill={C.us} fillOpacity={.15} strokeWidth={2} name="US dead"/><Area type="monotone" dataKey="gulf" stroke={C.gold} fill={C.gold} fillOpacity={.15} strokeWidth={2} name="Gulf states dead"/><Legend wrapperStyle={{fontSize:10}}/></AreaChart></ResponsiveContainer></Card>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Party</TH><TH>Killed</TH><TH>Injured</TH><TH>Key Details</TH></tr></thead><tbody>{rows.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:r.color,fontWeight:700}}>{r.who}</TD><TD style={{color:C.white,fontWeight:700,fontFamily:"monospace"}}>{r.dead}</TD><TD style={{fontFamily:"monospace"}}>{r.inj}</TD><TD style={{fontSize:11,color:C.textMuted}}>{r.details}</TD></tr>)}</tbody></table></Card>
    <Note color={C.accent} title="Critical Context">Pentagon briefers admitted to Congress that Iran was NOT planning to strike US forces unless Israel attacked first. The Rubio justification of "preemptive self-defense" is contradicted by internal briefings (CNN, Mar 3). Trump told NYT he expects "quite a bit higher" casualties based on Pentagon projections.</Note>
    <Note color={C.textMuted} title="Sources">CENTCOM, Al Jazeera live tracker, Iranian Red Crescent, CNN, NPR, Lebanon Health Ministry, Kuwait Defense Ministry, Bahrain Interior Ministry</Note>
  </div>
}

// ── TAB 3: GLOBAL MARKETS ──
function MarketTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ST sub="Oil, gold, equities, bonds, crypto — full market reaction">Global Markets Impact</ST>
    <Card><ResponsiveContainer width="100%" height={200}><AreaChart data={oilPriceData} margin={{left:10,right:40}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="day" tick={{fill:C.textMuted,fontSize:11}}/><YAxis yAxisId="left" domain={[70,90]} tick={{fill:C.textMuted,fontSize:11}} label={{value:"Brent $/bbl",angle:-90,fill:C.accent,fontSize:9,position:"insideLeft"}}/><YAxis yAxisId="right" orientation="right" domain={[5000,5500]} tick={{fill:C.textMuted,fontSize:11}} label={{value:"Gold $/oz",angle:90,fill:C.gold,fontSize:9,position:"insideRight"}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}}/><Area yAxisId="left" type="monotone" dataKey="brent" stroke={C.accent} fill={C.accent} fillOpacity={.12} strokeWidth={2} name="Brent Crude"/><Area yAxisId="right" type="monotone" dataKey="gold" stroke={C.gold} fill={C.gold} fillOpacity={.08} strokeWidth={2} name="Gold"/><Legend wrapperStyle={{fontSize:10}}/></AreaChart></ResponsiveContainer></Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
      <StatBox n="+13%" l="Brent Crude" c={C.accent} sub="$73→$83"/><StatBox n="$5,300+" l="Gold (record)" c={C.gold} sub="+$200 session"/><StatBox n="+40%" l="EU Gas Futures" c={C.accentAlt} sub="Qatar LNG off"/><StatBox n="25.4" l="VIX Fear Index" c={C.us} sub="+27%"/><StatBox n="-1,200" l="Dow intraday" c={C.purple} sub="Mar 3"/>
    </div>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Metric</TH><TH>Pre-War</TH><TH>Current</TH><TH>Change</TH><TH>Projection</TH></tr></thead><tbody>{marketImpact.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:600,fontSize:11}}>{r.metric}</TD><TD style={{fontSize:11}}>{r.before}</TD><TD style={{color:r.color,fontWeight:700,fontSize:11}}>{r.after}</TD><TD><Badge text={r.change} color={r.color}/></TD><TD style={{color:C.textMuted,fontSize:11}}>{r.proj}</TD></tr>)}</tbody></table></Card>
    <ST sub="Bank projections for sustained conflict">Oil Price Scenarios</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Scenario</TH><TH>Price</TH><TH>Source</TH><TH>Probability</TH></tr></thead><tbody>{oilScenarios.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:500}}>{r.scenario}</TD><TD style={{color:C.accent,fontWeight:700,fontSize:14}}>{r.price}</TD><TD style={{color:C.textMuted,fontSize:11}}>{r.src}</TD><TD style={{fontSize:11}}>{r.prob}</TD></tr>)}</tbody></table></Card>
    <Note color={C.blue} title="Wall Street Context">Morgan Stanley: S&P 500 averages +2/6/8% at 1/6/12 months after geopolitical shocks (since Korean War). BUT Goldman Sachs warns: "only a severe and sustained oil disruption would have large effects" — this one qualifies if Hormuz stays closed. Wells Fargo 2026 S&P target: 7,500 (pre-war).</Note>
    <Note color={C.textMuted} title="Sources">CNN Business, CNBC, Bloomberg, Fortune, PBS, 24/7 Wall St, JPMorgan, Deutsche Bank, Bank of America, Goldman Sachs, Morgan Stanley, Wells Fargo, GasBuddy</Note>
  </div>
}

// ── TAB 4: HORMUZ ──
function HormuzTab(){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ST sub="The world's most critical energy chokepoint — de facto closed since Mar 2">Strait of Hormuz Crisis</ST>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
      {hormuzData.map((d,i)=><Card key={i} style={{textAlign:"center",borderTop:`2px solid ${[C.accent,C.accentAlt,C.gold,C.us,C.blue,C.purple][i]}`}}><div style={{fontSize:30,fontWeight:800,color:[C.accent,C.accentAlt,C.gold,C.us,C.blue,C.purple][i]}}>{d.stat}</div><div style={{fontSize:11,color:C.white,fontWeight:600,marginTop:4}}>{d.label}</div><div style={{fontSize:10,color:C.textMuted,marginTop:3}}>{d.sub}</div></Card>)}
    </div>
    <Card style={{borderLeft:`3px solid ${C.accent}`}}>
      <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:8}}>Shipping & Insurance Status</div>
      <Bullet color={C.accent} items={[
        "IRGC VHF transmission: 'No ship is allowed to pass the Strait of Hormuz'",
        "Mar 2: Senior IRGC official confirms strait CLOSED; threatens to set ships 'ablaze'",
        "Maersk, MSC, CMA CGM, Hapag-Lloyd, COSCO — all suspended Hormuz bookings",
        "Emirates SkyCargo suspended all operations",
        "Insurance withdrawn effective March 5 — economic risk too high for ship owners",
        "War-risk premiums surged from 0.125% to 0.4% of vessel value per transit",
        "Only Iranian and Chinese-flagged vessels still transiting (limited, AIS off)",
        "Iran pre-loaded oil exports 3x normal rate Feb 15-20 in anticipation",
        "150+ ships stranded; tanker traffic effectively zero since midnight Mar 2",
        "Qatar: Ras Laffan & Mesaieed LNG facilities hit — ALL production ceased",
        "UKMTO reports 'significant military activity' near Oman's Kumzar"
      ]}/>
    </Card>
    <ST sub="Countries most exposed to Hormuz closure">Global Dependency Map</ST>
    <Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Country/Region</TH><TH>Gulf Energy Dependency</TH><TH>Risk Level</TH></tr></thead><tbody>{asiaExposure.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:600}}>{r.country}</TD><TD style={{color:C.accentAlt,fontWeight:600}}>{r.dep}</TD><TD><Badge text={r.risk} color={r.risk==="Critical"?C.accent:r.risk==="High"?C.accentAlt:C.gold}/></TD></tr>)}</tbody></table></Card>
    <Note color={C.textMuted} title="Sources">Al Jazeera, CNBC, TIME, Kpler, Congress.gov (CRS R45281), Wikipedia (2026 Strait of Hormuz crisis), UKMTO, NBC News</Note>
  </div>
}

// ── REMAINING TABS ──
function CostTab(){return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="Why this war is mathematically unsustainable for the US">Cost Asymmetry Analysis</ST><Card><ResponsiveContainer width="100%" height={200}><BarChart data={[{name:"Iranian Drone",cost:.05},{name:"US Interceptor (Low)",cost:1},{name:"US Interceptor (High)",cost:10}]} layout="vertical" margin={{left:160,right:30}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis type="number" tick={{fill:C.textMuted,fontSize:11}}/><YAxis type="category" dataKey="name" tick={{fill:C.text,fontSize:12}} width={150}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}} formatter={v=>[`$${v}M`]}/><Bar dataKey="cost" radius={[0,4,4,0]}>{[C.iran,C.us,C.accent].map((c,i)=><Cell key={i} fill={c}/>)}</Bar></BarChart></ResponsiveContainer></Card><Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Metric</TH><TH>Value</TH><TH>Note</TH></tr></thead><tbody>{interceptorMath.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:500}}>{r.m}</TD><TD style={{color:C.accentAlt,fontWeight:700,fontFamily:"monospace"}}>{r.v}</TD><TD style={{color:C.textMuted}}>{r.n}</TD></tr>)}</tbody></table></Card><Note color={C.accent} title="Key Insight">The US military industrial complex was designed for Cold War power projection — expensive systems for deterrence. Iran inverted the equation with cheap, mass-produced, expendable weapons. This is 21st century asymmetric warfare, and the US is on the wrong side of the math.</Note></div>}

function GCCTab(){const g=[{n:"Water from\nDesalination",v:60,d:"Riyadh: 10M people dry in 2 weeks if hit"},{n:"Food via\nHormuz",v:90,d:"De facto closed — supply chain cut"},{n:"Economy\nfrom Oil",v:85,d:"Saudi completely reliant"}];return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="Iran targeting Gulf states' existence, not just military">GCC Vulnerabilities</ST><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>{g.map((d,i)=><Card key={i} style={{textAlign:"center",borderTop:`3px solid ${[C.blue,C.accentAlt,C.gold][i]}`}}><div style={{fontSize:42,fontWeight:800,color:[C.blue,C.accentAlt,C.gold][i]}}>{d.v}%</div><div style={{fontSize:12,color:C.white,fontWeight:600,whiteSpace:"pre-line"}}>{d.n}</div><div style={{fontSize:10,color:C.textMuted,marginTop:6}}>{d.d}</div></Card>)}</div><Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Target</TH><TH>Impact</TH><TH>Status</TH></tr></thead><tbody>{[{t:"Strait of Hormuz",i:"20% world oil + 90% GCC food imports",s:"Closed",c:C.accent},{t:"Qatar LNG (Ras Laffan + Mesaieed)",i:"20% global LNG — all production ceased",s:"Shut Down",c:C.accent},{t:"Riyadh (Saudi capital)",i:"US Embassy hit; refinery drones shot down",s:"Hit",c:C.accent},{t:"Dubai Airport + Abu Dhabi Airport",i:"20,000+ travelers stranded; damaged",s:"Hit",c:C.accent},{t:"AWS Data Centers (UAE/Bahrain)",i:"AI infrastructure directly damaged",s:"Hit",c:C.accent},{t:"Fujairah Oil Zone (UAE)",i:"Fire from debris; critical export terminal",s:"Hit",c:C.accentAlt},{t:"Desalination Plants",i:"60% freshwater for region",s:"Threatened",c:C.gold},{t:"5th Fleet HQ (Bahrain)",i:"Naval headquarters; Juffair area explosions",s:"Hit",c:C.accent},{t:"Kuwait Airport + Shuaiba Port",i:"6 US killed; 1 civilian killed; 32 wounded",s:"Hit",c:C.accent},{t:"Hamad Int'l Airport (Qatar)",i:"Attack stopped by Qatari forces",s:"Defended",c:C.green}].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:600}}>{r.t}</TD><TD>{r.i}</TD><TD><Badge text={r.s} color={r.c}/></TD></tr>)}</tbody></table></Card></div>}

function StratTab(){return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="Why Iran holds structural advantages in a war of attrition">Strategic Analysis — Iran vs US</ST><Card><ResponsiveContainer width="100%" height={320}><RadarChart data={iranAdv}><PolarGrid stroke={C.border}/><PolarAngleAxis dataKey="subject" tick={{fill:C.textMuted,fontSize:10}}/><PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:C.textMuted,fontSize:9}}/><Radar name="Iran" dataKey="Iran" stroke={C.iran} fill={C.iran} fillOpacity={.25} strokeWidth={2}/><Radar name="US" dataKey="US" stroke={C.us} fill={C.us} fillOpacity={.15} strokeWidth={2}/><Legend wrapperStyle={{fontSize:11}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}}/></RadarChart></ResponsiveContainer></Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><Card style={{borderTop:`2px solid ${C.iran}`}}><div style={{color:C.iran,fontSize:12,fontWeight:700,marginBottom:8}}>IRAN ADVANTAGES</div><Bullet color={C.iran} items={["20 years specific preparation for this war","Faster response vs June 2025 — evolved command structure","Proxy networks battle-tested: Hezbollah, Houthis, Iraqi militias","Mountainous terrain: 3-4M soldiers needed to conquer","Existential/religious framing: extreme pain tolerance","Economic warfare: targeting global system, not just military","Cost asymmetry: 200:1 ratio in drone vs interceptor","Shot down US MQ-9 Reaper drone","Struck across 9 countries simultaneously"]}/></Card><Card style={{borderTop:`2px solid ${C.us}`}}><div style={{color:C.us,fontSize:12,fontWeight:700,marginBottom:8}}>US ADVANTAGES</div><Bullet color={C.us} items={["Overwhelming air superiority","1,000+ targets hit in first 48 hours","1,200+ munitions in largest IAF sortie","Khamenei + command structure eliminated","Nuclear/missile sites damaged","Navy, air force, radar 'knocked out' (Trump claim)","F-22 stealth capability","Carrier strike groups positioned","Global alliance coordination"]}/></Card></div><Note color={C.accentAlt} title="The Trap">Air power can destroy but can't occupy. No historical precedent for regime change from air alone. US declared regime change as objective — but who takes over? Trump admitted the attack 'knocked out most of the candidates.' Ground troops would require 3-4M soldiers in mountainous terrain. 78% of Americans opposed initial strikes.</Note></div>}

function ActorTab(){return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="Mapping each player's rational self-interest">Game Theory — Actors & Motives</ST><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{actors.map((a,i)=><Card key={i} style={{borderTop:`3px solid ${a.color}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:18}}>{a.icon}</span><span style={{color:a.color,fontSize:14,fontWeight:700}}>{a.name}</span></div><Bullet color={a.color} items={a.items}/></Card>)}</div><ST sub="Why Trump attacked — weighted analysis">Decision Calculus</ST><Card><div style={{display:"flex",gap:20,alignItems:"center"}}><ResponsiveContainer width="40%" height={200}><PieChart><Pie data={whyAttacked} outerRadius={75} innerRadius={40} dataKey="value" paddingAngle={3}>{whyAttacked.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}</Pie><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}}/></PieChart></ResponsiveContainer><div style={{flex:1}}>{whyAttacked.map((d,i)=><div key={i} style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:2,background:PIE_C[i]}}/><span style={{color:C.white,fontSize:13,fontWeight:600}}>{d.name} ({d.value}%)</span></div></div>)}<div style={{marginTop:8,padding:"8px 12px",background:C.cardAlt,borderRadius:4}}><span style={{color:C.textMuted,fontSize:11}}>Pentagon admitted to Congress: Iran was NOT planning to strike US first (CNN, Mar 3)</span></div></div></div></Card></div>}

function EconTab(){return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="How Iran's strategy targets the global financial system">Economic Domino Chain</ST>{econChain.map((s,i)=><div key={i}><Card style={{borderLeft:`3px solid ${i<2?C.iran:i<4?C.accentAlt:C.accent}`,display:"flex",gap:14,alignItems:"center"}}><div style={{width:42,height:42,borderRadius:"50%",background:`${i<2?C.iran:i<4?C.accentAlt:C.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.i}</div><div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:C.textMuted,fontSize:10,fontWeight:700}}>STEP {s.s}</span><span style={{color:C.white,fontSize:13,fontWeight:700}}>{s.t}</span></div><p style={{color:C.textMuted,fontSize:11,margin:"3px 0 0"}}>{s.d}</p></div></Card>{i<econChain.length-1&&<div style={{textAlign:"center",color:C.border,fontSize:14,margin:"1px 0"}}>{"▼"}</div>}</div>)}<Note color={C.accent} title="Real-Time Evidence">Steps 1-3 are actively happening. Amazon UAE/Bahrain DCs hit (Step 4 beginning). Brent $83, gold $5,300+, VIX 25.4, bond yields rising on inflation fears (Step 5 forming). China CSI 300 rose +0.38% while everyone else fell (Step 6 signal).</Note></div>}

function TimeTab(){const tc={prediction:C.purple,confirmed:C.green,conflict:C.accent,military:C.blue};return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="May 2024 predictions through Day 4 of active conflict">Complete Timeline</ST><Card>{timeline.map((t,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:2,paddingBottom:8,borderBottom:i<timeline.length-1?`1px solid ${C.border}15`:"none"}}><div style={{minWidth:110,textAlign:"right"}}><span style={{color:C.textMuted,fontSize:10,fontWeight:600}}>{t.date}</span></div><div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:16}}><div style={{width:10,height:10,borderRadius:"50%",background:tc[t.type],flexShrink:0}}/>{i<timeline.length-1&&<div style={{width:1,flex:1,background:C.border,marginTop:2}}/>}</div><div style={{flex:1}}><span style={{color:C.text,fontSize:11,lineHeight:1.5}}>{t.event}</span></div></div>)}</Card><div style={{display:"flex",gap:16}}>{Object.entries(tc).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:"50%",background:v}}/><span style={{color:C.textMuted,fontSize:10,textTransform:"capitalize"}}>{k}</span></div>)}</div></div>}

function ForecastTab(){return <div style={{display:"flex",flexDirection:"column",gap:14}}><ST sub="Probability-weighted assessments based on game theory + pattern analysis">2026 Forecast Spectrum</ST><Card><ResponsiveContainer width="100%" height={300}><BarChart data={forecasts} layout="vertical" margin={{left:130,right:20}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis type="number" domain={[0,100]} tick={{fill:C.textMuted,fontSize:10}}/><YAxis type="category" dataKey="topic" tick={{fill:C.text,fontSize:11}} width={120}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}} formatter={v=>[`${v}%`,"Confidence"]}/><Bar dataKey="c" radius={[0,4,4,0]}>{forecasts.map((f,i)=><Cell key={i} fill={f.c>=80?C.accent:f.c>=70?C.accentAlt:f.c>=60?C.gold:C.blue}/>)}</Bar></BarChart></ResponsiveContainer></Card><Card><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}><TH>Topic</TH><TH>Prediction</TH><TH>Status</TH><TH>Confidence</TH></tr></thead><tbody>{forecasts.map((f,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}15`}}><TD style={{color:C.white,fontWeight:600,fontSize:11}}>{f.topic}</TD><TD style={{fontSize:11}}>{f.pred}</TD><TD><Badge text={f.st} color={f.st==="Active"?C.accent:f.st==="Warning"?C.accentAlt:C.blue}/></TD><TD><PB value={f.c} color={f.c>=80?C.accent:f.c>=60?C.accentAlt:C.blue} w={40}/></TD></tr>)}</tbody></table></Card><ST sub="Structural parallels — relevance to current conflict">Historical Pattern Analysis</ST><Card><ResponsiveContainer width="100%" height={180}><BarChart data={historicals} margin={{left:10}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="e" tick={{fill:C.textMuted,fontSize:9}} height={50}/><YAxis tick={{fill:C.textMuted,fontSize:10}} domain={[0,100]} label={{value:"Relevance %",angle:-90,fill:C.textMuted,fontSize:9,position:"insideLeft"}}/><Tooltip contentStyle={{background:C.cardAlt,border:`1px solid ${C.border}`,borderRadius:6,color:C.text,fontSize:12}}/><Bar dataKey="r" radius={[4,4,0,0]} name="Relevance">{historicals.map((_,i)=><Cell key={i} fill={i===historicals.length-1?C.accent:C.blue}/>)}</Bar></BarChart></ResponsiveContainer></Card><Note color={C.purple} title="The Pattern">Empires follow a predictable cycle: hubris → overextension → attrition → collapse. Every comparable case (Athens, Nazi Germany, Vietnam) ended the same way. The US-Iran conflict activates all systemic weaknesses simultaneously — military, economic, political, social.</Note></div>}

const TABS=[OverviewTab,MapTab,CasualtyTab,MarketTab,HormuzTab,CostTab,GCCTab,StratTab,ActorTab,EconTab,TimeTab,ForecastTab];

export default function Dashboard(){
  const [at,setAt]=useState(0);const T=TABS[at];
  const [showSrc,setShowSrc]=useState(false);
  return <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:C.text}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <div style={{background:`linear-gradient(135deg,${C.card},${C.cardAlt})`,borderBottom:`1px solid ${C.border}`,padding:"20px 24px 14px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><div style={{width:8,height:8,borderRadius:"50%",background:C.accent,boxShadow:`0 0 8px ${C.accent}88`}}/><span style={{color:C.textMuted,fontSize:10,textTransform:"uppercase",letterSpacing:2,fontWeight:600}}>LIVE ANALYSIS | Game Theory + Historical Patterns</span><Badge text="DAY 4" color={C.accent}/></div>
          <h1 style={{color:C.white,fontSize:22,fontWeight:800,margin:"0 0 3px"}}>US-Iran War — Complete Intelligence Dashboard</h1>
          <p style={{color:C.textMuted,fontSize:12,margin:0}}>Real-time conflict tracking, market impact, strategic analysis & forecasts | Updated March 4, 2026</p>
        </div>
        <button onClick={()=>setShowSrc(!showSrc)} style={{background:C.cardAlt,color:C.textMuted,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 14px",fontSize:11,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{showSrc?"Hide":"Show"} Sources ({sources.length})</button>
      </div>
    </div>
    {showSrc&&<div style={{background:C.cardAlt,borderBottom:`1px solid ${C.border}`,padding:"12px 24px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{sources.map((s,i)=><div key={i} style={{fontSize:10,color:C.textMuted}}><span style={{color:C.blue,fontWeight:600}}>{s.name}</span> — {s.type}</div>)}</div></div>}
    <div style={{display:"flex",gap:1,padding:"0 24px",background:C.card,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {tabs.map((t,i)=><button key={t} onClick={()=>setAt(i)} style={{background:at===i?C.bg:"transparent",color:at===i?C.white:C.textMuted,border:"none",borderBottom:at===i?`2px solid ${C.accent}`:"2px solid transparent",padding:"10px 13px",fontSize:11,fontWeight:at===i?700:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>{t}</button>)}
    </div>
    <div style={{padding:"18px 24px 36px",maxWidth:900,margin:"0 auto"}}><T/></div>
    <div style={{textAlign:"center",padding:"16px",borderTop:`1px solid ${C.border}`}}><p style={{color:C.textMuted,fontSize:10,margin:0}}>Data sourced from {sources.length}+ verified outlets | Game theory & historical pattern methodology | All forecasts are probability-weighted assessments</p></div>
  </div>
}
