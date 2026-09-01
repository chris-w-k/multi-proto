"use strict";
/* ─── content packs (identical shape to the text prototype, plus BCP-47 codes) ─── */
const PACKS = {
  "en-tr": {
    label:"English → Turkish", native:"English", target:"Turkish",
    nativeLang:"en-GB", targetLang:"tr-TR", nCode:"EN", tCode:"TR",
    scenario:"Ordering in Deniz's café, then the shop next door",
    nativeMarkers:["i","want","the","a","is","there","please","coffee","tea","water","thanks","yes","no","some","have","can","would","like","hello","hi"],
    atoms:{"kahve":"coffee","çay":"tea","su":"water","istiyorum":"I want","lütfen":"please","bir":"one / a","var":"there is","yok":"there isn't","var mı":"is there…?","ne istersiniz":"what would you like?","teşekkürler":"thank you","hoş geldiniz":"welcome","başka bir şey":"anything else?"},
    beats:[
      {id:"b1",newAtoms:["kahve","istiyorum"],
       lines:{0:"Welcome! What would you like?",1:"**Hoş geldiniz!** What would you like?",3:"**Hoş geldiniz! Ne istersiniz?**"},
       ask:{0:"You want a coffee. Coffee is **kahve**, and “I want” is **istiyorum**. Say it.",2:"Order a coffee.",4:"Order a coffee."},
       ideal:"Kahve istiyorum.",gloss:"I want coffee.",
       accept:["kahve istiyorum","ben kahve istiyorum","bir kahve lutfen","kahve lutfen","bir kahve","kahve"],
       repair:"Almost — for “I want coffee” say **Kahve istiyorum**."},
      {id:"b2",newAtoms:["lütfen","bir"],
       lines:{0:"One coffee, coming up. Now add “please” — that's **lütfen**.",2:"**Bir kahve!** And “please” is **lütfen**.",4:"**Bir kahve!**"},
       ask:{0:"Finish it: **Bir kahve, _____**",3:"Finish it: **Bir kahve, _____**"},
       ideal:"lütfen",gloss:"please",accept:["lutfen","bir kahve lutfen"],
       repair:"“Please” is **lütfen**."},
      {id:"b3",newAtoms:["çay","var","yok"],production:false,
       lines:{0:"Bad news: **çay var ama kahve yok.**",2:"**Çay var ama kahve yok.**"},
       ask:{0:"**çay** is tea, **var** is there is, **yok** is there isn't. Which one can't you have?",3:"Which one can't you have?"},
       ideal:"kahve",gloss:"coffee — there's none left",accept:["kahve","coffee","the coffee","kahve yok"],
       repair:"**yok** means there isn't any — so the **kahve** is off."},
      {id:"b4",newAtoms:[],
       lines:{0:"But there is tea. **Çay.**",2:"Ama **çay var**."},
       ask:{0:"Take the tea instead. Say “I want tea.”",3:"Take the tea."},
       ideal:"Çay istiyorum.",gloss:"I want tea.",
       accept:["cay istiyorum","ben cay istiyorum","bir cay lutfen","cay lutfen","bir cay"],
       repair:"Same shape as before — **Çay istiyorum**."},
      {id:"b5",newAtoms:["su"],
       lines:{0:"Nice one. One more word: **su** is water.",3:"**Ve su?**"},
       ask:{0:"Ask for water with the same pattern.",3:"Ask for water."},
       ideal:"Su istiyorum.",gloss:"I want water.",
       accept:["su istiyorum","ben su istiyorum","bir su lutfen","su lutfen","bir su"],
       repair:"Swap the word, keep the pattern — **Su istiyorum**."},
      {id:"b6",newAtoms:["var mı"],
       lines:{0:"To ask whether something exists, Turkish puts **var mı?** at the end.",2:"**Başka bir şey?**",4:"**Başka bir şey?**"},
       ask:{0:"Ask Deniz: is there tea?",3:"Ask whether he has tea."},
       ideal:"Çay var mı?",gloss:"Is there tea?",accept:["cay var mi","cay var mi?"],
       repair:"Close — for “Is there tea?” it's **Çay var mı?**"},
      {id:"b7",newAtoms:[],onlyIfFailed:"b6",
       lines:{0:"Let's try that once more with a different word.",2:"Tekrar."},
       ask:{0:"Now ask: is there water?",3:"Now ask about water."},
       ideal:"Su var mı?",gloss:"Is there water?",accept:["su var mi","su var mi?"],
       repair:"**Su var mı?** — the thing, then **var mı**."},
      {id:"b8",newAtoms:[],
       lines:{0:"You finish your tea and walk to the shop next door.",2:"Kafeden çıkıyorsun. **Kolay gelsin!**"},
       ask:{0:"Ask the shopkeeper if there's Wi-Fi. Same pattern.",3:"Ask about Wi-Fi."},
       ideal:"Wi-Fi var mı?",gloss:"Is there Wi-Fi?",accept:["wifi var mi","wi-fi var mi","wi fi var mi","wifi var mi?"],
       repair:"The pattern travels — **Wi-Fi var mı?**"},
      {id:"b9",newAtoms:["ne istersiniz"],retrieval:true,
       lines:{2:"**Ne istersiniz?**",4:"**Ne istersiniz?**"},
       ask:{0:"You're thirsty. Answer him — no help this time.",3:"You're thirsty. Answer him."},
       ideal:"Su istiyorum.",gloss:"I want water.",
       accept:["su istiyorum","cay istiyorum","kahve istiyorum","bir su lutfen","bir cay lutfen","su lutfen","cay lutfen","ben su istiyorum"],
       repair:"Anything you've already used works — **Su istiyorum**."},
      {id:"b10",newAtoms:["teşekkürler","başka bir şey"],
       lines:{0:"**Başka bir şey?** — anything else?",3:"**Başka bir şey?**"},
       ask:{0:"You're done. Say no and thank him: **yok, teşekkürler**.",3:"Wrap it up politely."},
       ideal:"Yok, teşekkürler.",gloss:"No, thank you.",
       accept:["yok tesekkurler","tesekkurler","yok","hayir tesekkurler","tesekkur ederim"],
       repair:"**Yok, teşekkürler** — and that's the whole exchange in Turkish."}
    ]
  },
  "es-en": {
    label:"Spanish → English", native:"Español", target:"English",
    nativeLang:"es-ES", targetLang:"en-GB", nCode:"ES", tCode:"EN",
    scenario:"Pidiendo algo en la cafetería de Deniz",
    nativeMarkers:["quiero","por","favor","hay","gracias","agua","café","té","un","una","el","la","sí","no","hola","tienes","puedo"],
    atoms:{"water":"agua","I want":"quiero","please":"por favor","is there":"hay","thank you":"gracias","juice":"zumo","hello":"hola","anything else":"¿algo más?","no, thanks":"no, gracias"},
    beats:[
      {id:"b1",newAtoms:["water","I want"],
       lines:{0:"¡Hola! ¿Qué quieres?",1:"**Hello!** ¿Qué quieres?",3:"**Hello! What would you like?**"},
       ask:{0:"Quieres agua. Agua es **water**, y “quiero” es **I want**. Dilo.",2:"Pide agua.",4:"Pide agua."},
       ideal:"I want water.",gloss:"Quiero agua.",
       accept:["i want water","water please","a water please","can i have water","i want a water"],
       repair:"Casi — di **I want water**."},
      {id:"b2",newAtoms:["please"],
       lines:{0:"Una agua. Ahora añade “por favor” — es **please**.",2:"**One water!** Y “por favor” es **please**."},
       ask:{0:"Completa: **Water, _____**",3:"Completa: **Water, _____**"},
       ideal:"please",gloss:"por favor",accept:["please","water please"],
       repair:"“Por favor” es **please**."},
      {id:"b3",newAtoms:["juice","is there"],production:false,
       lines:{0:"**There is juice but there is no water.**",2:"**There is juice but there is no water.**"},
       ask:{0:"**juice** es zumo, **there is** es hay. ¿Qué no puedes pedir?",3:"¿Qué no puedes pedir?"},
       ideal:"water",gloss:"agua — no hay",accept:["water","the water","agua","no water"],
       repair:"**no water** — el agua se acabó."},
      {id:"b4",newAtoms:[],
       lines:{0:"Pero sí hay zumo. **Juice.**",2:"But there is **juice**."},
       ask:{0:"Pide zumo con el mismo patrón.",3:"Pide zumo."},
       ideal:"I want juice.",gloss:"Quiero zumo.",
       accept:["i want juice","juice please","a juice please","can i have juice"],
       repair:"Mismo patrón — **I want juice**."},
      {id:"b5",newAtoms:["is there"],
       lines:{0:"Para preguntar si algo existe, el inglés pone **is there…?** al principio.",3:"**Anything else?**"},
       ask:{0:"Pregunta: ¿hay agua?",3:"Pregunta por el agua."},
       ideal:"Is there water?",gloss:"¿Hay agua?",accept:["is there water","is there water?","do you have water"],
       repair:"Va delante — **Is there water?**"},
      {id:"b6",newAtoms:[],onlyIfFailed:"b5",
       lines:{0:"Otra vez, con otra palabra.",2:"Again."},
       ask:{0:"Pregunta: ¿hay zumo?",3:"Pregunta por el zumo."},
       ideal:"Is there juice?",gloss:"¿Hay zumo?",accept:["is there juice","is there juice?","do you have juice"],
       repair:"**Is there juice?**"},
      {id:"b7",newAtoms:[],retrieval:true,
       lines:{2:"**What would you like?**",4:"**What would you like?**"},
       ask:{0:"Tienes sed. Responde — sin ayuda esta vez.",3:"Tienes sed. Responde."},
       ideal:"I want water.",gloss:"Quiero agua.",
       accept:["i want water","i want juice","water please","juice please","can i have water"],
       repair:"Cualquiera que ya hayas usado sirve — **I want water**."},
      {id:"b8",newAtoms:["thank you","no, thanks"],
       lines:{0:"**Anything else?**",3:"**Anything else?**"},
       ask:{0:"Ya está. Di que no y da las gracias: **no, thank you**.",3:"Termina con educación."},
       ideal:"No, thank you.",gloss:"No, gracias.",accept:["no thank you","no thanks","thank you","thanks"],
       repair:"**No, thank you** — conversación entera en inglés."}
    ]
  },
  "tr-en": {
    label:"Turkish → English", native:"Türkçe", target:"English",
    nativeLang:"tr-TR", targetLang:"en-GB", nCode:"TR", tCode:"EN",
    scenario:"Deniz'in kafesinde sipariş vermek",
    nativeMarkers:["istiyorum","lütfen","var","yok","teşekkürler","su","çay","kahve","bir","evet","hayır","merhaba"],
    atoms:{"water":"su","I want":"istiyorum","please":"lütfen","is there":"var mı","thank you":"teşekkürler","tea":"çay","hello":"merhaba","anything else":"başka bir şey?","no, thanks":"hayır, teşekkürler"},
    beats:[
      {id:"b1",newAtoms:["water","I want"],
       lines:{0:"Merhaba! Ne istersiniz?",1:"**Hello!** Ne istersiniz?",3:"**Hello! What would you like?**"},
       ask:{0:"Su istiyorsun. Su **water**, “istiyorum” ise **I want**. Söyle.",2:"Su iste.",4:"Su iste."},
       ideal:"I want water.",gloss:"Su istiyorum.",
       accept:["i want water","water please","a water please","can i have water"],
       repair:"Az kaldı — **I want water** de."},
      {id:"b2",newAtoms:["please"],
       lines:{0:"Bir su. Şimdi “lütfen” ekle — İngilizce'de **please**.",2:"**One water!** Ve “lütfen” = **please**."},
       ask:{0:"Tamamla: **Water, _____**",3:"Tamamla: **Water, _____**"},
       ideal:"please",gloss:"lütfen",accept:["please","water please"],
       repair:"“Lütfen” = **please**."},
      {id:"b3",newAtoms:["tea","is there"],production:false,
       lines:{0:"**There is tea but there is no water.**",2:"**There is tea but there is no water.**"},
       ask:{0:"**tea** çay, **there is** var demek. Hangisi yok?",3:"Hangisi yok?"},
       ideal:"water",gloss:"su — yok",accept:["water","the water","su","no water"],
       repair:"**no water** — su kalmamış."},
      {id:"b4",newAtoms:[],
       lines:{0:"Ama çay var. **Tea.**",2:"But there is **tea**."},
       ask:{0:"Aynı kalıpla çay iste.",3:"Çay iste."},
       ideal:"I want tea.",gloss:"Çay istiyorum.",
       accept:["i want tea","tea please","a tea please","can i have tea"],
       repair:"Aynı kalıp — **I want tea**."},
      {id:"b5",newAtoms:["is there"],
       lines:{0:"Bir şeyin olup olmadığını sormak için İngilizce **is there…?** kalıbını başa koyar.",3:"**Anything else?**"},
       ask:{0:"Sor: su var mı?",3:"Suyu sor."},
       ideal:"Is there water?",gloss:"Su var mı?",accept:["is there water","is there water?","do you have water"],
       repair:"Başa gelir — **Is there water?**"},
      {id:"b6",newAtoms:[],onlyIfFailed:"b5",
       lines:{0:"Bir kez daha, başka bir kelimeyle.",2:"Again."},
       ask:{0:"Sor: çay var mı?",3:"Çayı sor."},
       ideal:"Is there tea?",gloss:"Çay var mı?",accept:["is there tea","is there tea?","do you have tea"],
       repair:"**Is there tea?**"},
      {id:"b7",newAtoms:[],retrieval:true,
       lines:{2:"**What would you like?**",4:"**What would you like?**"},
       ask:{0:"Susadın. Cevap ver — bu sefer yardım yok.",3:"Susadın. Cevap ver."},
       ideal:"I want water.",gloss:"Su istiyorum.",
       accept:["i want water","i want tea","water please","tea please","can i have water"],
       repair:"Daha önce kullandıkların işe yarar — **I want water**."},
      {id:"b8",newAtoms:["thank you","no, thanks"],
       lines:{0:"**Anything else?**",3:"**Anything else?**"},
       ask:{0:"Bitti. Hayır de ve teşekkür et: **no, thank you**.",3:"Kibarca bitir."},
       ideal:"No, thank you.",gloss:"Hayır, teşekkürler.",accept:["no thank you","no thanks","thank you","thanks"],
       repair:"**No, thank you** — sohbetin tamamı İngilizce."}
    ]
  }
};
const LADDER=["Pip says everything","single words from Deniz","mixed turns","Deniz leads, Pip glosses","Deniz only, Pip on standby","Deniz alone"];
const CONF_FLOOR=0.55;

/* ─── helpers ─── */
const $=id=>document.getElementById(id);
let S=null, voices=[], recog=null, listening=false, speaking=false;

function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")
  .replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/ç/g,"c").replace(/ö/g,"o").replace(/ü/g,"u")
  .replace(/[^\p{L}\p{N}\s-]/gu," ").replace(/\s+/g," ").trim();}
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;
  let p=Array.from({length:n+1},(_,j)=>j),c=new Array(n+1);
  for(let i=1;i<=m;i++){c[0]=i;for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));[p,c]=[c,p];}
  return p[n];}
function pickLevel(map,lvl){let best=null;for(const k of Object.keys(map).map(Number).sort((a,b)=>a-b))if(k<=lvl)best=k;return best===null?null:map[best];}
function esc(s){return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));}
function med(a){if(!a.length)return null;const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)];}

/* split a line into ordered speaker segments: **target** → Deniz, rest → Pip */
function segment(text){
  const out=[]; let i=0; const re=/\*\*(.+?)\*\*/g; let m;
  while((m=re.exec(text))){
    const before=text.slice(i,m.index).trim();
    if(before) out.push({who:"pip",text:before});
    out.push({who:"deniz",text:m[1].trim()});
    i=m.index+m[0].length;
  }
  const rest=text.slice(i).trim(); if(rest) out.push({who:"pip",text:rest});
  return out;
}
function renderLine(text,count){
  if(!text) return "";
  let tgt=0;
  const html=esc(text).replace(/\*\*(.+?)\*\*/g,(_,inner)=>{
    tgt+=inner.split(/\s+/).length;
    const g=S&&S.pack.atoms[inner.toLowerCase().replace(/[.?!,]/g,"")];
    return `<b class="tl" data-say="${esc(inner)}" data-g="${g?esc(g):""}" title="${g?esc(g)+" — tap to hear it":"tap to hear it"}">${inner}</b>`;
  });
  const nat=esc(text).replace(/\*\*(.+?)\*\*/g,"").split(/\s+/).filter(Boolean).length;
  if(count&&S){S.tokNative+=nat;S.tokTarget+=tgt;}
  return html;
}
function say(who,html,cls){
  const d=document.createElement("div");
  d.className="msg "+(cls||who);
  d.innerHTML=(who==="note"?"":`<div class="who">${who==="pal"?"Scene":"You"}</div>`)+`<div class="body">${html}</div>`;
  $("stream").appendChild(d);$("stream").scrollTop=$("stream").scrollHeight;return d;
}

/* ─── speech out ─── */
function loadVoices(){ try{ voices=speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
if("speechSynthesis" in window){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }
function voiceFor(lang){
  const base=lang.split("-")[0];
  return voices.find(v=>v.lang&&v.lang.toLowerCase()===lang.toLowerCase())
      || voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(base))
      || null;
}
function speak(who,text){
  return new Promise(res=>{
    const g=$(who==="deniz"?"deniz":"pip"), other=$(who==="deniz"?"pip":"deniz");
    const bub=$(who==="deniz"?"b-deniz":"b-pip"), bt=$(who==="deniz"?"b-deniz-t":"b-pip-t");
    bt.textContent=text; bub.classList.add("show");
    g.classList.add("talking"); g.classList.remove("dim"); other.classList.add("dim");
    let fired=false;
    if(!("speechSynthesis" in window)){ setTimeout(done, Math.min(2600, 420+text.length*46)); return; }
    const lang = who==="deniz" ? S.pack.targetLang : S.pack.nativeLang;
    const u=new SpeechSynthesisUtterance(text);
    u.lang=lang; const v=voiceFor(lang); if(v) u.voice=v;
    u.rate = who==="deniz" ? (0.72+S.level*0.05) : 0.95;
    u.pitch= who==="deniz" ? 0.9 : 1.25;
    u.onend=done; u.onerror=done;
    speaking=true;
    try{ speechSynthesis.speak(u); }catch(e){ done(); }
    setTimeout(done, 1500+text.length*130);
    function done(){ if(fired) return; fired=true; speaking=false;
      g.classList.remove("talking");
      setTimeout(()=>bub.classList.remove("show"),900);
      res(); }
  });
}
async function perform(text){
  for(const seg of segment(text)){ await speak(seg.who, seg.text); await new Promise(r=>setTimeout(r,140)); }
  $("deniz").classList.remove("dim"); $("pip").classList.remove("dim");
}

/* ─── speech in ─── */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
function setupRecog(){
  if(!SR) return null;
  const r=new SR();
  r.continuous=false; r.interimResults=true; r.maxAlternatives=5;
  r.onstart=()=>{ listening=true; S.listenStart=Date.now(); $("mic").classList.add("live"); $("micstate").textContent="listening…"; };
  r.onaudiostart=()=>{ $("micstate").textContent="listening…"; };
  r.onspeechstart=()=>{ if(S && S.listenStart && !S.spokeAt) S.spokeAt=Date.now(); };
  r.onresult=e=>{
    const res=e.results[e.results.length-1];
    const alts=[...res].map(a=>({t:a.transcript,c:a.confidence}));
    $("heard").textContent="“"+alts[0].t+"”";
    if(res.isFinal) finalise(alts);
  };
  r.onerror=e=>{ listening=false; $("mic").classList.remove("live");
    if(e.error==="not-allowed"||e.error==="service-not-allowed"){
      banner("err","Your browser blocked microphone access for this page — voice input is off, but everything else works. Type your answers instead.");
      $("mode").value="text"; $("micstate").textContent="mic blocked — type instead";
    } else if(e.error==="no-speech"){ $("micstate").textContent="didn't hear anything — tap again"; }
    else { $("micstate").textContent="recogniser error: "+e.error; } };
  r.onend=()=>{ listening=false; $("mic").classList.remove("live");
    if($("micstate").textContent==="listening…") $("micstate").textContent="tap to speak"; };
  return r;
}
function banner(kind,msg){ const b=$("banner"); b.className="banner show "+kind; b.textContent=msg; }

/* ─── engine ─── */
function currentBeat(){ while(S.i<S.pack.beats.length){const b=S.pack.beats[S.i]; if(b.onlyIfFailed&&!S.failed[b.onlyIfFailed]){S.i++;continue;} return b;} return null; }

async function start(){
  const key=$("pack").value,pack=PACKS[key];
  S={key,pack,level:+$("lvl").value,adapt:$("adapt").value==="on",voiceMode:$("mode").value==="voice",
     i:0,t0:Date.now(),ttfp:null,log:[],turns:0,prodTurns:0,indepTurns:0,correct:0,indepCorrect:0,
     natives:0,freezes:0,lost:0,help:0,spoken:0,typed:0,confs:[],lowconf:0,thinks:[],
     tokNative:0,tokTarget:0,failed:{},mastery:{},streakGood:0,streakBad:0,awaiting:false,hintUsed:false};
  $("stream").innerHTML=""; $("heard").textContent="";
  $("scene-name").textContent=pack.scenario;
  $("dl").textContent=pack.tCode; $("pl").textContent=pack.nCode;
  ["say","send","hint","lost","skip","export","again"].forEach(id=>$(id).disabled=false);
  $("say").placeholder="…or type your answer";
  say("note",`<em>${esc(pack.label)} · ${esc(pack.scenario)} · level ${S.level}${S.adapt?"":" (fixed)"}</em>`);

  if(S.voiceMode){
    if(!SR){ banner("warn","This browser has no speech recognition (Chrome, Edge or Safari have it). Voice output still works — type your answers."); S.voiceMode=false; }
    else { recog=recog||setupRecog(); }
    if(!("speechSynthesis" in window)) banner("warn","No speech synthesis in this browser — Deniz and Pip will appear silently, with the transcript.");
  }
  $("mic").disabled=!S.voiceMode;
  $("micstate").textContent=S.voiceMode?"tap to speak":"type your answer";
  await nextBeat(); paint();
}

async function nextBeat(){
  const b=currentBeat(); if(!b){ finish(); return; }
  (b.newAtoms||[]).forEach(a=>{ if(!(a in S.mastery)) S.mastery[a]=0; });
  const line=pickLevel(b.lines,S.level), ask=pickLevel(b.ask,S.level);
  let html=line?renderLine(line,true):"";
  if(ask) html+=`<div class="ask">${renderLine(ask,true)}</div>`;
  S.shown=norm((line||"")+" "+(ask||""));
  say("pal",html);
  paint();
  if(line) await perform(line);
  if(ask){ await new Promise(r=>setTimeout(r,180)); await perform(ask); }
  S.awaiting=true; S.listenStart=Date.now(); S.spokeAt=null;
  $("micstate").textContent=S.voiceMode?"your turn — tap to speak":"your turn — type it";
  if(!S.voiceMode) $("say").focus();
}

function classify(raw,b){
  const a=norm(raw),ideal=norm(b.ideal);
  if(!a||/^[?.\s]*$/.test(a)||["idk","dunno","no se","bilmiyorum","?"].includes(a)) return {k:"freeze"};
  for(const acc of b.accept) if(a===norm(acc)) return {k:"correct"};
  for(const acc of b.accept) if(lev(a,norm(acc))<=2) return {k:"typo"};
  const iT=ideal.split(" ").filter(Boolean),aT=a.split(" ").filter(Boolean);
  if(iT.every(t=>aT.includes(t))&&a!==ideal) return {k:"word_order"};
  if(iT.some(t=>t.length>3&&aT.some(x=>x!==t&&x.slice(0,3)===t.slice(0,3)))) return {k:"morphology"};
  const nat=S.pack.nativeMarkers.map(norm);
  const anyT=iT.some(t=>aT.includes(t))||Object.keys(S.pack.atoms).some(k=>aT.includes(norm(k)));
  if(!anyT&&aT.some(t=>nat.includes(t))) return {k:"native_fallback"};
  if(anyT) return {k:"partial"};
  return {k:"unrecognised"};
}
const VERDICT={correct:{c:"v-ok",d:2,ok:true},typo:{c:"v-ok",d:1,ok:true},word_order:{c:"v-warn",d:0,ok:false},
  morphology:{c:"v-warn",d:0,ok:false},partial:{c:"v-warn",d:0,ok:false},native_fallback:{c:"v-warn",d:-1,ok:false},
  unrecognised:{c:"v-err",d:-1,ok:false},freeze:{c:"v-err",d:-1,ok:false}};

/* voice result: try every alternative, refuse to grade low confidence */
function finalise(alts){
  if(!S||!S.awaiting) return;
  const b=currentBeat(); if(!b) return;
  const best=alts[0]; const conf=typeof best.c==="number"&&best.c>0?best.c:null;
  if(conf!==null) S.confs.push(conf);
  if(S.spokeAt&&S.listenStart) S.thinks.push(S.spokeAt-S.listenStart);

  let chosen=best.t, matched=false;
  for(const a of alts){ const r=classify(a.t,b); if(r.k==="correct"||r.k==="typo"){ chosen=a.t; matched=true; break; } }

  if(!matched && conf!==null && conf<CONF_FLOOR){
    S.lowconf++; S.help++;
    say("note",`<span class="verdict v-warn">Pip didn't catch that clearly — it isn't marked wrong.<span class="conf">heard “${esc(best.t)}” · conf ${conf.toFixed(2)}</span></span>`);
    perform("Sorry, I didn't catch that. Say it again?");
    S.listenStart=Date.now(); S.spokeAt=null; paint(); return;
  }
  submit(chosen,{spoken:true,conf});
}

function submit(rawIn,opts){
  if(!S||!S.awaiting) return;
  const b=currentBeat(); if(!b) return;
  opts=opts||{};
  const raw=(rawIn!==undefined?rawIn:$("say").value).trim();
  $("say").value=""; $("heard").textContent="";
  S.awaiting=false; S.turns++;
  if(opts.spoken) S.spoken++; else S.typed++;
  say("you",esc(raw||"…")+(opts.conf!=null?`<span class="conf">spoken · conf ${opts.conf.toFixed(2)}</span>`:opts.spoken?'<span class="conf">spoken</span>':""));

  const r=classify(raw,b),v=VERDICT[r.k];
  const idealTok=norm(b.ideal).split(" ").filter(Boolean);
  const ans=norm(raw).split(" ").filter(Boolean);
  const produced=idealTok.some(t=>ans.includes(t))||Object.keys(S.pack.atoms).some(k=>ans.includes(norm(k)));
  const visible=idealTok.some(t=>S.shown.includes(t))||S.hintUsed;
  const isProd=b.production!==false;

  if(produced&&S.ttfp===null) S.ttfp=Date.now()-S.t0;
  if(isProd){ if(produced){S.prodTurns++; if(!visible)S.indepTurns++;}
              if(v.ok){S.correct++; if(!visible)S.indepCorrect++;} }
  if(r.k==="native_fallback") S.natives++;
  if(r.k==="freeze") S.freezes++;
  (b.newAtoms||[]).forEach(a=>{S.mastery[a]=Math.max(0,(S.mastery[a]||0)+v.d);});
  Object.keys(S.mastery).forEach(a=>{ if(ans.includes(norm(a))&&v.ok) S.mastery[a]=Math.min(9,S.mastery[a]+1); });

  const msgs={correct:`Correct — **${b.ideal}**`,
    typo:`Correct — **${b.ideal}**`,
    word_order:`Right words, wrong order. ${b.repair}`,
    morphology:`Nearly — the ending is off. ${b.repair}`,
    partial:`Part of it. ${b.repair}`,
    native_fallback:`That's ${S.pack.native} — try it in ${S.pack.target}. ${b.repair}`,
    unrecognised:b.repair, freeze:`No problem. ${b.repair}`};
  const tail=(r.k==="correct"||r.k==="typo")?` <em>· ${esc(b.gloss)}</em>`:"";
  say("note",`<span class="verdict ${v.c}">${renderLine(msgs[r.k],false)}${tail}</span>`);

  S.log.push({beat:b.id,level:S.level,type:r.k,input:raw,ideal:b.ideal,spoken:!!opts.spoken,
    confidence:opts.conf??null,thinkMs:S.spokeAt&&S.listenStart?S.spokeAt-S.listenStart:null,
    produced,independent:produced&&!visible,hint:S.hintUsed,t:Date.now()-S.t0});
  if(!v.ok) S.failed[b.id]=true;
  S.hintUsed=false;

  if(S.adapt){
    if(v.ok&&!visible){S.streakGood++;S.streakBad=0;} else if(!v.ok){S.streakBad++;S.streakGood=0;}
    if(S.streakGood>=2&&S.level<5){S.level++;S.streakGood=0;say("note",`<em>Pip steps back → level ${S.level}: ${LADDER[S.level]}.</em>`);}
    else if(S.streakBad>=2&&S.level>0){S.level--;S.streakBad=0;say("note",`<em>Pip steps in → level ${S.level}: ${LADDER[S.level]}.</em>`);}
  }
  S.i++; paint();
  setTimeout(()=>{ if(v.ok) perform(pickCheer()); setTimeout(nextBeat,v.ok?900:300); },260);
}
function pickCheer(){ const c=["**Harika!**","**Süper!**","Nice one.","Perfect.","**Tamam!**"];
  return S.pack.nCode==="EN"?c[Math.floor(Math.random()*c.length)]:"Perfect."; }

function finish(){
  const mins=Math.max((Date.now()-S.t0)/60000,.01); S.awaiting=false;
  ["say","send","hint","lost","skip","again"].forEach(id=>$(id).disabled=true);
  $("mic").disabled=true; $("micstate").textContent="session complete"; $("scene-beat").textContent="done";
  say("note",`<div style="border-top:1px solid var(--rule);padding-top:12px"><strong style="color:var(--ink)">Session complete.</strong><br>
    ${S.indepCorrect} independent ${esc(S.pack.target)} turns in ${mins.toFixed(1)} min · ${S.spoken} spoken, ${S.typed} typed ·
    first production ${S.ttfp===null?"never":(S.ttfp/1000).toFixed(0)+"s"} · ended at level ${S.level}.</div>`);
  paint();
}

function stateName(v){return v>=7?"mastered":v>=5?"strong":v>=3?"emerging":v>=1?"recognition":"weak";}
function paint(){
  if(!S) return;
  const b=currentBeat();
  $("scene-lvl").textContent=S.level+" · "+LADDER[S.level];
  $("scene-beat").textContent=b?(S.i+1)+" / "+S.pack.beats.length:"done";
  const mins=Math.max((Date.now()-S.t0)/60000,.01);
  $("m-north").textContent=(S.indepCorrect/mins).toFixed(1);
  $("m-ttfp").textContent=S.ttfp===null?"—":(S.ttfp/1000).toFixed(0)+"s";
  $("m-mode").textContent=(S.spoken+S.typed)?`${S.spoken} / ${S.typed}`:"—";
  $("m-conf").textContent=S.confs.length?(S.confs.reduce((a,c)=>a+c,0)/S.confs.length).toFixed(2):"—";
  $("m-lowconf").textContent=S.lowconf;
  const t=med(S.thinks); $("m-think").textContent=t===null?"—":(t/1000).toFixed(1)+"s";
  $("m-prod").textContent=S.turns?`${S.prodTurns}/${S.turns}`:"—";
  $("m-indep").textContent=S.prodTurns?`${S.indepTurns}/${S.prodTurns}`:"—";
  $("m-correct").textContent=S.turns?`${S.correct}/${S.turns}`:"—";
  $("m-native").textContent=S.natives; $("m-freeze").textContent=S.freezes;
  $("m-lost").textContent=S.lost; $("m-help").textContent=S.help;
  $("ladder").innerHTML=LADDER.map((t,i)=>`<div class="rung ${i===S.level?"on":(i<S.level?"done":"")}"><span class="n">${i}</span><span>${t}</span></div>`).join("");
  const tot=S.tokNative+S.tokTarget||1,pt=Math.round(100*S.tokTarget/tot);
  $("r-native").style.width=(100-pt)+"%"; $("r-target").style.width=pt+"%";
  $("r-lab-n").textContent=`Pip ${100-pt}%`; $("r-lab-t").textContent=`Deniz ${pt}%`;
  const keys=Object.keys(S.mastery);
  $("atoms").innerHTML=keys.length?keys.map(a=>`<div class="atom"><span class="a">${esc(a)}</span><span class="s s-${stateName(S.mastery[a])}">${stateName(S.mastery[a])}</span></div>`).join(""):'<span class="empty">Nothing introduced yet.</span>';
}

/* ─── wiring ─── */
Object.entries(PACKS).forEach(([k,p])=>{const o=document.createElement("option");o.value=k;o.textContent=p.label;$("pack").appendChild(o);});
if(!SR) banner("warn","This browser has no speech recognition — Deniz and Pip will still speak, and you can type your answers. Chrome, Edge and Safari support voice input; embedded frames often block the microphone.");

$("start").onclick=start;
$("reset").onclick=()=>{ try{speechSynthesis.cancel();}catch(e){} S=null;
  $("stream").innerHTML='<div class="msg note"><div class="body">Reset. Pick a pair and press Start session.</div></div>';
  ["say","send","hint","lost","skip","export","again"].forEach(id=>$(id).disabled=true);
  $("mic").disabled=true; $("micstate").textContent="Press start"; $("heard").textContent="";
  $("scene-name").textContent="No session running"; $("scene-lvl").textContent="—"; $("scene-beat").textContent="—"; };
$("send").onclick=()=>submit(undefined,{spoken:false});
$("say").addEventListener("keydown",e=>{ if(e.key==="Enter") submit(undefined,{spoken:false}); });
$("mic").onclick=()=>{ if(!S||!recog) return;
  if(listening){ try{recog.stop();}catch(e){} return; }
  try{ speechSynthesis.cancel(); }catch(e){}
  recog.lang=S.pack.targetLang; S.listenStart=Date.now(); S.spokeAt=null;
  try{ recog.start(); }catch(e){ $("micstate").textContent="couldn't start mic"; } };
$("again").onclick=async()=>{ const b=currentBeat(); if(!b||!S) return;
  const line=pickLevel(b.lines,S.level); if(line) await perform(line); };
$("hint").onclick=async()=>{ const b=currentBeat(); if(!b||!S) return;
  S.help++; S.hintUsed=true;
  say("note",`<span class="verdict v-warn">Pip: try <b>${esc(b.ideal)}</b> — <em>${esc(b.gloss)}</em></span>`);
  paint(); await perform(`Try saying **${b.ideal}** — it means ${b.gloss}`); };
$("lost").onclick=async()=>{ const b=currentBeat(); if(!b||!S) return;
  S.lost++; S.help++;
  if(S.adapt&&S.level>0){ S.level--; say("note",`<em>Pip steps in → level ${S.level}: ${LADDER[S.level]}.</em>`); }
  say("note",`<span class="verdict v-warn">${renderLine(b.repair,false)} <em>(${esc(b.gloss)})</em></span>`);
  paint(); await perform(b.repair); };
$("skip").onclick=()=>{ if(!S||!S.awaiting) return;
  const b=currentBeat(); S.freezes++; S.turns++; S.awaiting=false;
  S.log.push({beat:b.id,level:S.level,type:"skipped",input:"",ideal:b.ideal,spoken:false,produced:false,independent:false,t:Date.now()-S.t0});
  say("you","<em>skipped</em>"); say("note",`<span class="verdict v-err">${renderLine(b.repair,false)}</span>`);
  if(S.adapt&&S.level>0) S.level--;
  S.failed[b.id]=true; S.i++; paint(); setTimeout(nextBeat,400); };
$("export").onclick=async()=>{
  if(!S) return;
  const payload={pack:S.key,pair:S.pack.label,scenario:S.pack.scenario,inputMode:S.voiceMode?"voice":"text",
    startLevel:+$("lvl").value,endLevel:S.level,adaptive:S.adapt,durationSec:Math.round((Date.now()-S.t0)/1000),
    metrics:{turns:S.turns,spoken:S.spoken,typed:S.typed,meanConfidence:S.confs.length?S.confs.reduce((a,c)=>a+c,0)/S.confs.length:null,
      lowConfidenceUngraded:S.lowconf,medianThinkMs:med(S.thinks),productionTurns:S.prodTurns,independentProduction:S.indepTurns,
      correct:S.correct,independentCorrect:S.indepCorrect,timeToFirstProductionMs:S.ttfp,nativeFallbacks:S.natives,
      freezes:S.freezes,dontUnderstand:S.lost,helpOpened:S.help,pipTokens:S.tokNative,denizTokens:S.tokTarget},
    mastery:S.mastery,turnLog:S.log};
  const data=JSON.stringify(payload,null,2);
  const name=`deniz-pip-${S.key}-${Date.now()}.json`;
  let dl=null;
  try{ if(typeof claude!=="undefined"&&claude&&claude.use) dl=await claude.use("downloads"); }catch(e){}
  if(dl){ try{ await dl.save({filename:name,data}); return; }catch(e){} }
  try{
    const url=URL.createObjectURL(new Blob([data],{type:"application/json"}));
    const a=document.createElement("a"); a.href=url; a.download=name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
  }catch(e){
    say("note",`<em>Couldn't start a download — log below, copy it out:</em><pre style="font-family:var(--mono);font-size:11px;white-space:pre-wrap;background:var(--surface-2);padding:10px;border:1px solid var(--rule);max-height:220px;overflow:auto">${esc(data)}</pre>`);
  }
};
/* tap a highlighted word: hear it, see it, counted as help */
document.addEventListener("click",e=>{
  const t=e.target.closest("b.tl"); if(!t||!S) return;
  speak("deniz", t.dataset.say||t.textContent);
  if(!t.dataset.done){ t.dataset.done="1"; S.help++; S.hintUsed=true;
    if(t.dataset.g){ const g=document.createElement("div"); g.className="gloss"; g.textContent="↳ "+t.dataset.g; t.closest(".body").appendChild(g); }
    paint(); }
});
setInterval(()=>{ if(S&&S.turns) paint(); },5000);
