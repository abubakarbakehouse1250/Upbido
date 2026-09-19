"use client";
import {useMemo,useState} from "react";
const demo=[
 {rank:1,name:"NOVA LABS",country:"USA",category:"Technology & Startups",bid:50},
 {rank:2,name:"KICKS PK",country:"Pakistan",category:"Fashion & Beauty",bid:35},
 {rank:3,name:"DUNE EATS",country:"UAE",category:"Food & Restaurants",bid:25},
 {rank:4,name:"PIXELHAUS",country:"UK",category:"Agencies & Services",bid:15},
 {rank:5,name:"SHOPORA",country:"India",category:"Ecommerce",bid:15},
 {rank:6,name:"SAMPLE CREATOR",country:"Saudi Arabia",category:"Creators & Influencers",bid:10}
];
export default function Battle(){
 const [window,setWindow]=useState("MONTH"); const [country,setCountry]=useState("ALL"); const [category,setCategory]=useState("ALL");
 const rows=useMemo(()=>demo.filter(x=>(country==="ALL"||x.country===country)&&(category==="ALL"||x.category===category)),[country,category]);
 return <main className="dash"><nav><a className="logo" href="/">UP<span>BIDO</span><i>↗</i></a><a className="primary btnlink" href="/join">JOIN BATTLE ↗</a></nav><div className="dashWrap">
 <div className="dashHead"><div><small>DEMO LEADERBOARD · SPONSORED RANKING</small><h1>Choose your<br/><em>battle.</em></h1></div><a href="/dashboard">MY DASHBOARD →</a></div>
 <div className="battleTabs">{["TODAY","MONTH","ALL-TIME"].map(x=><button key={x} className={window===x?"activeTab":""} onClick={()=>setWindow(x)}>{x}</button>)}</div>
 <div className="battleFilters"><label>COUNTRY<select value={country} onChange={e=>setCountry(e.target.value)}><option>ALL</option>{[...new Set(demo.map(x=>x.country))].map(x=><option key={x}>{x}</option>)}</select></label><label>CATEGORY<select value={category} onChange={e=>setCategory(e.target.value)}><option>ALL</option>{[...new Set(demo.map(x=>x.category))].map(x=><option key={x}>{x}</option>)}</select></label></div>
 <section><small>{window} BATTLE · SAMPLE DATA</small>{rows.length?rows.map((x,i)=><div className="leaderRow" key={x.name}><b>#{i+1}</b><span><strong>{x.name}</strong><small>{x.country} · {x.category}</small></span><strong>{"$"}{x.bid}</strong><a href="/join">OUTBID →</a></div>):<p>No sample listings match these filters.</p>}</section>
 <section><small>WHY COMPETE ON UPBIDO?</small><div className="metrics"><div><b>DISCOVERY</b><span>GET SEEN BY VISITORS</span></div><div><b>TRAFFIC</b><span>DIRECT CLICKS TO YOUR SITE</span></div><div><b>PROOF</b><span>MEASURABLE PERFORMANCE</span></div><div><b>STATUS</b><span>SHAREABLE RANK + ACHIEVEMENTS</span></div></div><p>UPBIDO is being built as competitive advertising inventory: rank attracts attention, the listing converts attention into outbound traffic, and analytics show the result.</p></section><div className="dashNotice"><b>UNLIMITED RANKING</b> Production leaderboards will continue beyond Top 100 with search/pagination. Every eligible participant can retain exact Global, Country and Category ranks.</div>
 <div className="dashNotice"><b>DEMO ONLY</b> Names, ranks and bid amounts on this page are sample product data, not real market activity. Paid position does not represent quality or popularity.</div>
 </div></main>
}