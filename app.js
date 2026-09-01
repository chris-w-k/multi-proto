"use strict";
/* ─────────────────────────────────────────────────────────────
   Deniz speaks the target language and nothing else.
   Pip is silent until summoned — tap a word, or ask for help.
   A pack's `words` map is a phrase dictionary, matched longest-first,
   so "başka bir şey" glosses as one chunk rather than three.
   ───────────────────────────────────────────────────────────── */

const PACKS = {
  "en-tr": {
    label:"English → Turkish", native:"English", target:"Turkish",
    nativeLang:"en-GB", targetLang:"tr-TR", nCode:"EN", tCode:"TR",
    scenario:"Deniz's café, Istanbul",
    nativeMarkers:["i","want","the","a","is","there","please","coffee","tea","water","thanks","yes","no","some","have","can","would","like","hello","hi","sorry","any"],
    words:{
      "hoş geldiniz":"welcome","kusura bakmayın":"sorry about that","afiyet olsun":"enjoy it",
      "kolay gelsin":"hello — said to someone working","başka bir şey":"anything else",
      "ister misiniz":"would you like","ne":"what","istersiniz":"would you like",
      "istiyorum":"I want","tabii":"of course","bir":"a / one","kahve":"coffee","çay":"tea",
      "su":"water","var":"there is / we have","yok":"there isn't / we're out","ama":"but",
      "da":"as well","başka":"other","şey":"thing","lütfen":"please","buyurun":"here you are",
      "tekrar":"again","deneyin":"try","teşekkürler":"thank you","harika":"wonderful",
      "süper":"great","tamam":"okay","evet":"yes","hayır":"no","mı":"(makes it a question)",
      "mi":"(makes it a question)","wi-fi":"wi-fi","peki":"alright","hemen":"right away"
    },
    beats:[
      { id:"b1", newWords:["kahve","istiyorum"],
        say:{0:"Ne istersiniz?", 3:"Hoş geldiniz! Ne istersiniz?"},
        task:{0:"He's asking what you'd like. Coffee is <b>kahve</b> and “I want” is <b>istiyorum</b> — put them together.",
              2:"Order a coffee.", 4:"Order a coffee."},
        ideal:"Kahve istiyorum.", gloss:"I want coffee.",
        accept:["kahve istiyorum","ben kahve istiyorum","bir kahve lutfen","kahve lutfen","bir kahve","kahve"],
        repair:"For “I want coffee”, say Kahve istiyorum." },

      { id:"b2", newWords:["lütfen"],
        say:{0:"Tabii. Bir kahve.", 3:"Tabii! Hemen. Bir kahve."},
        task:{0:"Now be polite. “Please” is <b>lütfen</b> — say it.", 3:"Add “please”."},
        ideal:"Lütfen.", gloss:"Please.",
        accept:["lutfen","bir kahve lutfen","kahve lutfen","tesekkurler lutfen"],
        repair:"“Please” is Lütfen." },

      { id:"b3", newWords:["var","yok","çay"], production:false,
        say:{0:"Kusura bakmayın. Çay var, kahve yok.", 3:"Ah, kusura bakmayın! Çay var ama kahve yok."},
        task:{0:"Tap the words you don't know. Then answer in English: which one can't you have?",
              3:"Which one can't you have?"},
        ideal:"kahve", gloss:"coffee — they've run out",
        accept:["kahve","coffee","the coffee","kahve yok","no coffee"],
        repair:"Yok means there isn't any — so the kahve is off." },

      { id:"b4", newWords:[],
        say:{0:"Çay ister misiniz?", 3:"Peki, çay ister misiniz?"},
        task:{0:"Say you want tea — same shape as before, new word.", 3:"Take the tea."},
        ideal:"Çay istiyorum.", gloss:"I want tea.",
        accept:["cay istiyorum","ben cay istiyorum","bir cay lutfen","cay lutfen","bir cay","evet cay istiyorum"],
        repair:"Same shape as before — Çay istiyorum." },

      { id:"b5", newWords:["su"],
        say:{0:"Tabii. Su da var.", 3:"Tabii! Su da var."},
        task:{0:"He's mentioned water too. Ask for water instead.", 3:"Ask for water."},
        ideal:"Su istiyorum.", gloss:"I want water.",
        accept:["su istiyorum","ben su istiyorum","bir su lutfen","su lutfen","bir su"],
        repair:"Swap the word, keep the pattern — Su istiyorum." },

      { id:"b6", newWords:["başka bir şey","mı"],
        say:{0:"Başka bir şey?", 3:"Başka bir şey ister misiniz?"},
        task:{0:"To ask whether something exists, Turkish adds <b>var mı?</b> at the end. Ask: is there tea?",
              3:"Ask whether he has tea."},
        ideal:"Çay var mı?", gloss:"Is there tea?",
        accept:["cay var mi","cay var mi?","cay var midir"],
        repair:"For “Is there tea?” it's Çay var mı?" },

      { id:"b7", newWords:[], onlyIfFailed:"b6",
        say:{0:"Tekrar deneyin.", 3:"Tekrar deneyin — kolay!"},
        task:{0:"Once more with a different word. Ask: is there water?", 3:"Now ask about water."},
        ideal:"Su var mı?", gloss:"Is there water?",
        accept:["su var mi","su var mi?"],
        repair:"The thing first, then var mı — Su var mı?" },

      { id:"b8", newWords:["buyurun","afiyet olsun","kolay gelsin","wi-fi"],
        say:{0:"Buyurun. Afiyet olsun!", 3:"Buyurun, çayınız. Afiyet olsun!"},
        task:{0:"You finish your tea and go into the shop next door. Ask if there's Wi-Fi — same pattern as before.",
              3:"Next door now. Ask about Wi-Fi."},
        ideal:"Wi-Fi var mı?", gloss:"Is there Wi-Fi?",
        accept:["wifi var mi","wi-fi var mi","wi fi var mi","wifi var mi?"],
        repair:"The pattern travels — Wi-Fi var mı?" },

      { id:"b9", newWords:[], retrieval:true,
        say:{0:"Ne istersiniz?", 3:"Buyurun, ne istersiniz?"},
        task:{0:"You're thirsty. Answer him — no help this time.", 3:"You're thirsty. Answer."},
        ideal:"Su istiyorum.", gloss:"I want water.",
        accept:["su istiyorum","cay istiyorum","kahve istiyorum","bir su lutfen","bir cay lutfen","su lutfen","cay lutfen","ben su istiyorum"],
        repair:"Anything you've already used works — Su istiyorum." },

      { id:"b10", newWords:["teşekkürler"],
        say:{0:"Başka bir şey?", 3:"Başka bir şey var mı?"},
        task:{0:"You're done. Say no and thank him.", 3:"Wrap it up politely."},
        ideal:"Yok, teşekkürler.", gloss:"No, thank you.",
        accept:["yok tesekkurler","tesekkurler","yok","hayir tesekkurler","tesekkur ederim","hayir"],
        repair:"Yok, teşekkürler — and that's the whole exchange in Turkish." }
    ]
  },

  "es-en": {
    label:"Spanish → English", native:"Español", target:"English",
    nativeLang:"es-ES", targetLang:"en-GB", nCode:"ES", tCode:"EN",
    scenario:"La cafetería de Deniz",
    nativeMarkers:["quiero","por","favor","hay","gracias","agua","zumo","un","una","el","la","sí","hola","tienes","puedo","algo","más"],
    words:{
      "would you like":"¿qué quieres?","anything else":"¿algo más?","here you are":"aquí tiene",
      "of course":"claro","there is":"hay","there is no":"no hay","try again":"inténtalo otra vez",
      "thank you":"gracias","i want":"quiero","hello":"hola","what":"qué","one":"un / una",
      "water":"agua","juice":"zumo","but":"pero","sorry":"perdón","please":"por favor",
      "enjoy":"que aproveche","too":"también","yes":"sí","no":"no","great":"genial",
      "okay":"vale","is":"es / está","there":"ahí","right away":"enseguida","else":"más"
    },
    beats:[
      { id:"b1", newWords:["water","i want"],
        say:{0:"What would you like?", 3:"Hello! What would you like?"},
        task:{0:"Te pregunta qué quieres. Agua es <b>water</b> y “quiero” es <b>I want</b> — júntalos.",
              2:"Pide agua.", 4:"Pide agua."},
        ideal:"I want water.", gloss:"Quiero agua.",
        accept:["i want water","water please","a water please","can i have water","i want a water"],
        repair:"Di: I want water." },
      { id:"b2", newWords:["please"],
        say:{0:"Of course. One water.", 3:"Of course! Right away. One water."},
        task:{0:"Ahora sé educado. “Por favor” es <b>please</b>.", 3:"Añade “por favor”."},
        ideal:"Please.", gloss:"Por favor.",
        accept:["please","water please","thank you please"],
        repair:"“Por favor” es Please." },
      { id:"b3", newWords:["there is","there is no","juice"], production:false,
        say:{0:"Sorry. There is juice, there is no water.", 3:"Sorry! There is juice but there is no water."},
        task:{0:"Toca las palabras que no conozcas. ¿Qué no puedes pedir?", 3:"¿Qué no puedes pedir?"},
        ideal:"water", gloss:"agua — se ha acabado",
        accept:["water","the water","agua","no water"],
        repair:"There is no water — el agua se acabó." },
      { id:"b4", newWords:[],
        say:{0:"Would you like juice?", 3:"Okay, would you like juice?"},
        task:{0:"Pide zumo — el mismo patrón, palabra nueva.", 3:"Pide zumo."},
        ideal:"I want juice.", gloss:"Quiero zumo.",
        accept:["i want juice","juice please","a juice please","can i have juice","yes i want juice"],
        repair:"Mismo patrón — I want juice." },
      { id:"b5", newWords:["anything else"],
        say:{0:"Anything else?", 3:"Of course. Anything else?"},
        task:{0:"Para preguntar si algo existe, el inglés pone <b>is there…?</b> delante. Pregunta: ¿hay agua?",
              3:"Pregunta por el agua."},
        ideal:"Is there water?", gloss:"¿Hay agua?",
        accept:["is there water","is there water?","do you have water","have you got water"],
        repair:"Va delante — Is there water?" },
      { id:"b6", newWords:[], onlyIfFailed:"b5",
        say:{0:"Try again.", 3:"Try again — easy!"},
        task:{0:"Otra vez con otra palabra. Pregunta: ¿hay zumo?", 3:"Pregunta por el zumo."},
        ideal:"Is there juice?", gloss:"¿Hay zumo?",
        accept:["is there juice","is there juice?","do you have juice"],
        repair:"Is there juice?" },
      { id:"b7", newWords:["here you are","enjoy"], retrieval:true,
        say:{0:"Here you are. Enjoy!", 3:"Here you are. Enjoy! What would you like?"},
        task:{0:"Tienes sed otra vez. Responde — sin ayuda esta vez.", 3:"Tienes sed. Responde."},
        ideal:"I want water.", gloss:"Quiero agua.",
        accept:["i want water","i want juice","water please","juice please","can i have water"],
        repair:"Cualquiera que ya hayas usado sirve — I want water." },
      { id:"b8", newWords:["thank you"],
        say:{0:"Anything else?", 3:"Is there anything else?"},
        task:{0:"Ya está. Di que no y da las gracias.", 3:"Termina con educación."},
        ideal:"No, thank you.", gloss:"No, gracias.",
        accept:["no thank you","no thanks","thank you","thanks","no"],
        repair:"No, thank you — conversación entera en inglés." }
    ]
  },

  "tr-en": {
    label:"Turkish → English", native:"Türkçe", target:"English",
    nativeLang:"tr-TR", targetLang:"en-GB", nCode:"TR", tCode:"EN",
    scenario:"Deniz'in kafesi",
    nativeMarkers:["istiyorum","lütfen","var","yok","teşekkürler","su","çay","kahve","bir","evet","hayır","merhaba","başka"],
    words:{
      "would you like":"ne istersiniz","anything else":"başka bir şey","here you are":"buyurun",
      "of course":"tabii","there is":"var","there is no":"yok","try again":"tekrar deneyin",
      "thank you":"teşekkürler","i want":"istiyorum","hello":"merhaba","what":"ne","one":"bir",
      "water":"su","tea":"çay","but":"ama","sorry":"kusura bakmayın","please":"lütfen",
      "enjoy":"afiyet olsun","too":"da","yes":"evet","no":"hayır","great":"harika",
      "okay":"tamam","is":"-dir","there":"orada","right away":"hemen","else":"başka"
    },
    beats:[
      { id:"b1", newWords:["water","i want"],
        say:{0:"What would you like?", 3:"Hello! What would you like?"},
        task:{0:"Ne istediğini soruyor. Su <b>water</b>, “istiyorum” ise <b>I want</b> — birleştir.",
              2:"Su iste.", 4:"Su iste."},
        ideal:"I want water.", gloss:"Su istiyorum.",
        accept:["i want water","water please","a water please","can i have water"],
        repair:"Şöyle de: I want water." },
      { id:"b2", newWords:["please"],
        say:{0:"Of course. One water.", 3:"Of course! Right away. One water."},
        task:{0:"Şimdi kibar ol. “Lütfen” = <b>please</b>.", 3:"“Lütfen” ekle."},
        ideal:"Please.", gloss:"Lütfen.",
        accept:["please","water please","thank you please"],
        repair:"“Lütfen” = Please." },
      { id:"b3", newWords:["there is","there is no","tea"], production:false,
        say:{0:"Sorry. There is tea, there is no water.", 3:"Sorry! There is tea but there is no water."},
        task:{0:"Bilmediğin kelimelere dokun. Hangisi yok?", 3:"Hangisi yok?"},
        ideal:"water", gloss:"su — kalmamış",
        accept:["water","the water","su","no water"],
        repair:"There is no water — su kalmamış." },
      { id:"b4", newWords:[],
        say:{0:"Would you like tea?", 3:"Okay, would you like tea?"},
        task:{0:"Çay iste — aynı kalıp, yeni kelime.", 3:"Çay iste."},
        ideal:"I want tea.", gloss:"Çay istiyorum.",
        accept:["i want tea","tea please","a tea please","can i have tea","yes i want tea"],
        repair:"Aynı kalıp — I want tea." },
      { id:"b5", newWords:["anything else"],
        say:{0:"Anything else?", 3:"Of course. Anything else?"},
        task:{0:"Bir şey var mı diye sormak için İngilizce <b>is there…?</b> kalıbını başa koyar. Sor: su var mı?",
              3:"Suyu sor."},
        ideal:"Is there water?", gloss:"Su var mı?",
        accept:["is there water","is there water?","do you have water","have you got water"],
        repair:"Başa gelir — Is there water?" },
      { id:"b6", newWords:[], onlyIfFailed:"b5",
        say:{0:"Try again.", 3:"Try again — easy!"},
        task:{0:"Bir kez daha, başka kelimeyle. Sor: çay var mı?", 3:"Çayı sor."},
        ideal:"Is there tea?", gloss:"Çay var mı?",
        accept:["is there tea","is there tea?","do you have tea"],
        repair:"Is there tea?" },
      { id:"b7", newWords:["here you are","enjoy"], retrieval:true,
        say:{0:"Here you are. Enjoy!", 3:"Here you are. Enjoy! What would you like?"},
        task:{0:"Yine susadın. Cevap ver — bu sefer yardım yok.", 3:"Susadın. Cevap ver."},
        ideal:"I want water.", gloss:"Su istiyorum.",
        accept:["i want water","i want tea","water please","tea please","can i have water"],
        repair:"Daha önce kullandıkların işe yarar — I want water." },
      { id:"b8", newWords:["thank you"],
        say:{0:"Anything else?", 3:"Is there anything else?"},
        task:{0:"Bitti. Hayır de ve teşekkür et.", 3:"Kibarca bitir."},
        ideal:"No, thank you.", gloss:"Hayır, teşekkürler.",
        accept:["no thank you","no thanks","thank you","thanks","no"],
        repair:"No, thank you — sohbetin tamamı İngilizce." }
    ]
  }
};

const LADDER=["shortest phrases, full support","short phrases","natural phrases","fuller sentences","no written support","target language only"];
const CONF_FLOOR=0.55;

/* ─── helpers ─── */
const $=id=>document.getElementById(id);
let S=null, voices=[], recog=null, listening=false, speakSeq=0;

function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")
  .replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/ç/g,"c").replace(/ö/g,"o").replace(/ü/g,"u")
  .replace(/[^\p{L}\p{N}\s-]/gu," ").replace(/\s+/g," ").trim();}
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;
  let p=Array.from({length:n+1},(_,j)=>j),c=new Array(n+1);
  for(let i=1;i<=m;i++){c[0]=i;for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));[p,c]=[c,p];}
  return p[n];}
function pickLevel(map,lvl){let best=null;for(const k of Object.keys(map).map(Number).sort((a,b)=>a-b))if(k<=lvl)best=k;return best===null?null:map[best];}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function med(a){if(!a.length)return null;const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)];}

/* ─── phrase-aware tokeniser: longest dictionary match wins ─── */
function dictKeys(pack){
  if(!pack._keys) pack._keys=Object.keys(pack.words).sort((a,b)=>b.split(" ").length-a.split(" ").length||b.length-a.length);
  return pack._keys;
}
function tokenise(text){
  const pack=S.pack, keys=dictKeys(pack);
  const raw=text.split(/(\s+)/);                       // keep whitespace
  const out=[]; let i=0;
  while(i<raw.length){
    if(/^\s+$/.test(raw[i])){ out.push({sp:raw[i]}); i++; continue; }
    let hit=null;
    for(const k of keys){
      const n=k.split(" ").length;
      const slice=[]; let j=i, taken=0;
      while(j<raw.length&&taken<n){ if(!/^\s+$/.test(raw[j])){slice.push(raw[j]);taken++;} j++; }
      if(taken<n) continue;
      if(norm(slice.join(" "))===norm(k)){ hit={k,end:j,text:slice.join(" ")}; break; }
    }
    if(hit){
      // rebuild display text with original spacing between the matched words
      out.push({w:raw.slice(i,hit.end).join("").trim(), k:hit.k});
      i=hit.end;
    } else { out.push({w:raw[i], k:null}); i++; }
  }
  return out;
}
/* renders clickable word chips; unseen dictionary entries come out bold */
function chips(text, markNew){
  return tokenise(text).map(t=>{
    if(t.sp) return t.sp;
    if(!t.k) return `<span class="w plain">${esc(t.w)}</span>`;
    const isNew = markNew && !S.seen.has(t.k);
    return `<button type="button" class="w${isNew?" isnew":""}" data-k="${esc(t.k)}" data-say="${esc(t.w.replace(/[.,!?;:]+$/,""))}" aria-label="${esc(t.w)} — tap for meaning">${esc(t.w)}</button>`;
  }).join("");
}
function markSeen(text){ tokenise(text).forEach(t=>{ if(t.k) S.seen.add(t.k); }); }

function log(who,html,cls){
  const d=document.createElement("div");
  d.className="msg "+(cls||who);
  d.innerHTML=(who==="note"?"":`<div class="who">${who==="deniz"?"Deniz":"You"}</div>`)+`<div class="body">${html}</div>`;
  $("stream").appendChild(d);$("stream").scrollTop=$("stream").scrollHeight;return d;
}

/* ─── voices ─── */
function loadVoices(){ try{ voices=speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
if("speechSynthesis" in window){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }
function voiceFor(lang){
  const base=lang.split("-")[0];
  return voices.find(v=>v.lang&&v.lang.toLowerCase()===lang.toLowerCase())
      || voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(base)) || null;
}
function utter(text,lang,rate,pitch,onBoundary){
  return new Promise(res=>{
    if(!("speechSynthesis" in window)){ setTimeout(res, Math.min(2800, 400+text.length*48)); return; }
    let done=false; const fin=()=>{ if(!done){done=true;res();} };
    const u=new SpeechSynthesisUtterance(text);
    u.lang=lang; const v=voiceFor(lang); if(v) u.voice=v;
    u.rate=rate; u.pitch=pitch;
    if(onBoundary) u.onboundary=e=>{ try{ onBoundary(e.charIndex); }catch(err){} };
    u.onend=fin; u.onerror=fin;
    try{ speechSynthesis.speak(u); }catch(e){ fin(); }
    setTimeout(fin, 1800+text.length*130);
  });
}

/* ─── Deniz: the only voice in the room ─── */
async function denizSays(text){
  const seq=++speakSeq;
  const bub=$("bubble");
  bub.classList.remove("pending");
  bub.innerHTML=`<div class="tag">Deniz</div><div class="line" id="line">${chips(text,true)}</div>`;
  const words=[...bub.querySelectorAll(".w")];
  words.forEach(w=>w.classList.add("veiled"));
  $("deniz").classList.add("talking");
  $("bubble-wrap").classList.add("live");

  // reveal words as he reaches them; if the engine gives no boundaries, reveal on a timer
  let idx=0;
  const revealNext=()=>{ while(idx<words.length && words[idx].classList.contains("veiled")===false) idx++;
                         if(idx<words.length) words[idx++].classList.remove("veiled"); };
  const timer=setInterval(revealNext, Math.max(150, (text.length*55)/Math.max(words.length,1)));
  await utter(text, S.pack.targetLang, 0.70+S.level*0.05, 0.92, ()=>revealNext());
  clearInterval(timer);
  if(seq!==speakSeq) return;
  words.forEach(w=>w.classList.remove("veiled"));
  $("deniz").classList.remove("talking");
  $("bubble-wrap").classList.remove("live");
  markSeen(text);
}

/* ─── Pip: silent until summoned ─── */
async function pipSays(text, kind){
  S.pipCalls++;
  const p=$("pip-bubble");
  p.innerHTML=`<div class="tag">Pip</div><div class="line">${esc(text)}</div>`;
  p.classList.add("show");
  $("pip").classList.add("talking","awake");
  await utter(text, S.pack.nativeLang, 0.95, 1.2);
  $("pip").classList.remove("talking");
  clearTimeout(S.pipHide);
  S.pipHide=setTimeout(()=>{ p.classList.remove("show"); $("pip").classList.remove("awake"); }, kind==="long"?6000:3200);
  paint();
}

/* ─── engine ─── */
function currentBeat(){ while(S.i<S.pack.beats.length){const b=S.pack.beats[S.i]; if(b.onlyIfFailed&&!S.failed[b.onlyIfFailed]){S.i++;continue;} return b;} return null; }
function banner(kind,msg){ const b=$("banner"); b.className="banner show "+kind; b.textContent=msg; }

async function start(){
  const key=$("pack").value,pack=PACKS[key];
  S={key,pack,level:+$("lvl").value,adapt:$("adapt").value==="on",voiceMode:$("mode").value==="voice",
     i:0,t0:Date.now(),ttfp:null,log:[],turns:0,prodTurns:0,indepTurns:0,correct:0,indepCorrect:0,
     natives:0,freezes:0,lost:0,help:0,taps:0,pipCalls:0,spoken:0,typed:0,confs:[],lowconf:0,thinks:[],
     seen:new Set(),failed:{},mastery:{},streakGood:0,streakBad:0,awaiting:false,hintUsed:false,pipHide:null};
  $("stream").innerHTML=""; $("heard").textContent="";
  $("pip-bubble").classList.remove("show");
  $("scene-name").textContent=pack.scenario;
  $("dl").textContent=pack.tCode; $("pl").textContent=pack.nCode;
  ["say","send","hint","lost","skip","export","again"].forEach(id=>$(id).disabled=false);
  if(S.voiceMode){
    if(!window.SR){ banner("warn","This browser has no speech recognition (Chrome, Edge and Safari have it). Deniz will still speak — type your answers."); S.voiceMode=false; }
    else recog=recog||setupRecog();
    if(!("speechSynthesis" in window)) banner("warn","No speech synthesis here — Deniz's words appear in the bubble without sound.");
  }
  $("mic").disabled=!S.voiceMode;
  await nextBeat(); paint();
}

async function nextBeat(){
  const b=currentBeat(); if(!b){ finish(); return; }
  (b.newWords||[]).forEach(w=>{ if(!(w in S.mastery)) S.mastery[w]=0; });
  const line=pickLevel(b.say,S.level), task=pickLevel(b.task,S.level);
  S.line=line;
  $("task").innerHTML = task ? task : '<span class="muted">No prompt — you\'re on your own.</span>';
  $("task").hidden = !task;
  await denizSays(line);
  log("deniz", chips(line,false));
  S.shown=norm((task||"").replace(/<[^>]+>/g," "));
  S.awaiting=true; S.listenStart=Date.now(); S.spokeAt=null;
  $("micstate").textContent=S.voiceMode?"your turn — tap to speak":"your turn — type it";
  if(!S.voiceMode) $("say").focus();
  paint();
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
  const anyT=iT.some(t=>aT.includes(t))||Object.keys(S.pack.words).some(k=>aT.includes(norm(k)));
  if(!anyT&&aT.some(t=>nat.includes(t))) return {k:"native_fallback"};
  if(anyT) return {k:"partial"};
  return {k:"unrecognised"};
}
const VERDICT={correct:{c:"v-ok",d:2,ok:true},typo:{c:"v-ok",d:1,ok:true},word_order:{c:"v-warn",d:0,ok:false},
  morphology:{c:"v-warn",d:0,ok:false},partial:{c:"v-warn",d:0,ok:false},native_fallback:{c:"v-warn",d:-1,ok:false},
  unrecognised:{c:"v-err",d:-1,ok:false},freeze:{c:"v-err",d:-1,ok:false}};

function setupRecog(){
  const r=new window.SR();
  r.continuous=false; r.interimResults=true; r.maxAlternatives=5;
  r.onstart=()=>{ listening=true; S.listenStart=Date.now(); $("mic").classList.add("live"); $("micstate").textContent="listening…"; };
  r.onspeechstart=()=>{ if(S&&S.listenStart&&!S.spokeAt) S.spokeAt=Date.now(); };
  r.onresult=e=>{ const res=e.results[e.results.length-1];
    const alts=[...res].map(a=>({t:a.transcript,c:a.confidence}));
    $("heard").textContent="“"+alts[0].t+"”";
    if(res.isFinal) finalise(alts); };
  r.onerror=e=>{ listening=false; $("mic").classList.remove("live");
    if(e.error==="not-allowed"||e.error==="service-not-allowed"){
      banner("err","Your browser blocked the microphone for this page — voice input is off. Everything else works; type your answers.");
      $("mode").value="text"; $("micstate").textContent="mic blocked — type instead";
    } else if(e.error==="no-speech"){ $("micstate").textContent="didn't hear anything — tap again"; }
    else $("micstate").textContent="recogniser error: "+e.error; };
  r.onend=()=>{ listening=false; $("mic").classList.remove("live");
    if($("micstate").textContent==="listening…") $("micstate").textContent="tap to speak"; };
  return r;
}

/* low recogniser confidence is never a wrong answer */
function finalise(alts){
  if(!S||!S.awaiting) return;
  const b=currentBeat(); if(!b) return;
  const best=alts[0], conf=typeof best.c==="number"&&best.c>0?best.c:null;
  if(conf!==null) S.confs.push(conf);
  if(S.spokeAt&&S.listenStart) S.thinks.push(S.spokeAt-S.listenStart);
  let chosen=best.t, matched=false;
  for(const a of alts){ const r=classify(a.t,b); if(r.k==="correct"||r.k==="typo"){ chosen=a.t; matched=true; break; } }
  if(!matched&&conf!==null&&conf<CONF_FLOOR){
    S.lowconf++;
    log("note",`<span class="verdict v-warn">Not caught clearly — not marked wrong.<span class="conf">heard “${esc(best.t)}” · conf ${conf.toFixed(2)}</span></span>`);
    denizSays(S.pack.tCode==="TR"?"Anlamadım. Tekrar söyler misiniz?":"Sorry, say that again?");
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
  log("you",esc(raw||"…")+(opts.conf!=null?`<span class="conf">spoken · conf ${opts.conf.toFixed(2)}</span>`:opts.spoken?'<span class="conf">spoken</span>':""));

  const r=classify(raw,b),v=VERDICT[r.k];
  const idealTok=norm(b.ideal).split(" ").filter(Boolean);
  const ans=norm(raw).split(" ").filter(Boolean);
  const produced=idealTok.some(t=>ans.includes(t))||Object.keys(S.pack.words).some(k=>ans.includes(norm(k)));
  const visible=idealTok.some(t=>S.shown.includes(t))||S.hintUsed;
  const isProd=b.production!==false;

  if(produced&&S.ttfp===null) S.ttfp=Date.now()-S.t0;
  if(isProd){ if(produced){S.prodTurns++; if(!visible)S.indepTurns++;}
              if(v.ok){S.correct++; if(!visible)S.indepCorrect++;} }
  if(r.k==="native_fallback") S.natives++;
  if(r.k==="freeze") S.freezes++;
  (b.newWords||[]).forEach(w=>{S.mastery[w]=Math.max(0,(S.mastery[w]||0)+v.d);});
  Object.keys(S.mastery).forEach(w=>{ if(ans.includes(norm(w))&&v.ok) S.mastery[w]=Math.min(9,S.mastery[w]+1); });

  const head={correct:"Correct",typo:"Correct",word_order:"Right words, wrong order.",
    morphology:"Nearly — the ending is off.",partial:"Part of it.",
    native_fallback:`That's ${S.pack.native} — try it in ${S.pack.target}.`,
    unrecognised:"",freeze:"No problem."}[r.k];
  const body=v.ok?`<b>${esc(b.ideal)}</b> · <em>${esc(b.gloss)}</em>`:esc(b.repair);
  log("note",`<span class="verdict ${v.c}">${head?esc(head)+" — ":""}${body}</span>`);

  S.log.push({beat:b.id,level:S.level,type:r.k,input:raw,ideal:b.ideal,spoken:!!opts.spoken,
    confidence:opts.conf??null,thinkMs:S.spokeAt&&S.listenStart?S.spokeAt-S.listenStart:null,
    produced,independent:produced&&!visible,tapsUsed:S.hintUsed,t:Date.now()-S.t0});
  if(!v.ok) S.failed[b.id]=true;
  S.hintUsed=false;

  if(S.adapt){
    if(v.ok&&!visible){S.streakGood++;S.streakBad=0;} else if(!v.ok){S.streakBad++;S.streakGood=0;}
    if(S.streakGood>=2&&S.level<5){S.level++;S.streakGood=0;log("note",`<em>Support reduced → level ${S.level}: ${LADDER[S.level]}.</em>`);}
    else if(S.streakBad>=2&&S.level>0){S.level--;S.streakBad=0;log("note",`<em>Support increased → level ${S.level}: ${LADDER[S.level]}.</em>`);}
  }
  S.i++; paint();
  setTimeout(nextBeat, v.ok?700:400);
}

function finish(){
  const mins=Math.max((Date.now()-S.t0)/60000,.01); S.awaiting=false;
  ["say","send","hint","lost","skip","again"].forEach(id=>$(id).disabled=true);
  $("mic").disabled=true; $("micstate").textContent="session complete"; $("scene-beat").textContent="done";
  $("task").hidden=true;
  log("note",`<div class="done"><strong>Session complete.</strong><br>
    ${S.indepCorrect} independent ${esc(S.pack.target)} turns in ${mins.toFixed(1)} min · ${S.spoken} spoken, ${S.typed} typed ·
    ${S.taps} word taps · Pip summoned ${S.pipCalls}× · first production ${S.ttfp===null?"never":(S.ttfp/1000).toFixed(0)+"s"}.</div>`);
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
  $("m-taps").textContent=S.taps;
  $("m-pip").textContent=S.pipCalls;
  $("m-native").textContent=S.natives; $("m-freeze").textContent=S.freezes;
  $("m-lost").textContent=S.lost;
  $("m-seen").textContent=S.seen.size+" / "+Object.keys(S.pack.words).length;
  $("ladder").innerHTML=LADDER.map((t,i)=>`<div class="rung ${i===S.level?"on":(i<S.level?"done":"")}"><span class="n">${i}</span><span>${t}</span></div>`).join("");
  const keys=Object.keys(S.mastery);
  $("atoms").innerHTML=keys.length?keys.map(a=>`<div class="atom"><span class="a">${esc(a)}</span><span class="s s-${stateName(S.mastery[a])}">${stateName(S.mastery[a])}</span></div>`).join(""):'<span class="empty">Nothing introduced yet.</span>';
}

/* ─── word taps: tooltip + Pip translates ─── */
function closeTip(){ const t=document.querySelector(".tip"); if(t) t.remove();
  document.querySelectorAll(".w.open").forEach(w=>w.classList.remove("open")); }

document.addEventListener("click",e=>{
  const w=e.target.closest("button.w");
  if(!w){ closeTip(); return; }
  if(!S) return;
  const key=w.dataset.k, gloss=S.pack.words[key];
  if(!gloss) return;
  const wasOpen=w.classList.contains("open");
  closeTip();
  if(wasOpen) return;
  w.classList.add("open");
  const tip=document.createElement("span");
  tip.className="tip"; tip.textContent=gloss;
  w.appendChild(tip);
  S.taps++; S.help++; S.hintUsed=true;
  pipSays(gloss);
  paint();
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeTip(); });

/* ─── wiring ─── */
window.SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
Object.entries(PACKS).forEach(([k,p])=>{const o=document.createElement("option");o.value=k;o.textContent=p.label;$("pack").appendChild(o);});
if(!window.SR) banner("warn","This browser has no speech recognition — Deniz still speaks and you can type your answers. Chrome, Edge and Safari support voice; embedded frames usually block the microphone.");

$("railtoggle").onclick=()=>{
  const r=$("rail"), open=r.hasAttribute("hidden");
  if(open){ r.removeAttribute("hidden"); $("railtoggle").textContent="Hide metrics"; $("railtoggle").setAttribute("aria-expanded","true"); document.body.classList.add("railopen"); }
  else { r.setAttribute("hidden",""); $("railtoggle").textContent="Metrics"; $("railtoggle").setAttribute("aria-expanded","false"); document.body.classList.remove("railopen"); }
};
$("start").onclick=start;
$("reset").onclick=()=>{ try{speechSynthesis.cancel();}catch(e){} S=null; speakSeq++;
  $("stream").innerHTML='<div class="msg note"><div class="body">Reset. Pick a pair and press Start session.</div></div>';
  $("bubble").innerHTML='<div class="tag">Deniz</div><div class="line muted">Press <strong>Start session</strong> and Deniz will greet you.</div>';
  $("pip-bubble").classList.remove("show"); $("task").hidden=true;
  ["say","send","hint","lost","skip","export","again"].forEach(id=>$(id).disabled=true);
  $("mic").disabled=true; $("micstate").textContent="press start"; $("heard").textContent="";
  $("scene-name").textContent="No session running"; $("scene-lvl").textContent="—"; $("scene-beat").textContent="—"; };
$("send").onclick=()=>submit(undefined,{spoken:false});
$("say").addEventListener("keydown",e=>{ if(e.key==="Enter") submit(undefined,{spoken:false}); });
$("mic").onclick=()=>{ if(!S||!recog) return;
  if(listening){ try{recog.stop();}catch(e){} return; }
  try{ speechSynthesis.cancel(); }catch(e){}
  recog.lang=S.pack.targetLang; S.listenStart=Date.now(); S.spokeAt=null;
  try{ recog.start(); }catch(e){ $("micstate").textContent="couldn't start mic"; } };
$("again").onclick=()=>{ if(S&&S.line) denizSays(S.line); };
$("hint").onclick=()=>{ const b=currentBeat(); if(!b||!S) return;
  S.help++; S.hintUsed=true;
  log("note",`<span class="verdict v-warn">Pip: try <b>${esc(b.ideal)}</b> — <em>${esc(b.gloss)}</em></span>`);
  pipSays(`Try saying: ${b.ideal}. It means ${b.gloss}`,"long"); };
$("lost").onclick=()=>{ const b=currentBeat(); if(!b||!S) return;
  S.lost++; S.help++;
  if(S.adapt&&S.level>0){ S.level--; log("note",`<em>Support increased → level ${S.level}: ${LADDER[S.level]}.</em>`); }
  log("note",`<span class="verdict v-warn">${esc(b.repair)} <em>(${esc(b.gloss)})</em></span>`);
  pipSays(b.repair,"long"); };
$("skip").onclick=()=>{ if(!S||!S.awaiting) return;
  const b=currentBeat(); S.freezes++; S.turns++; S.awaiting=false;
  S.log.push({beat:b.id,level:S.level,type:"skipped",input:"",ideal:b.ideal,spoken:false,produced:false,independent:false,t:Date.now()-S.t0});
  log("you","<em>skipped</em>"); log("note",`<span class="verdict v-err">${esc(b.repair)}</span>`);
  if(S.adapt&&S.level>0) S.level--;
  S.failed[b.id]=true; S.i++; paint(); setTimeout(nextBeat,400); };
$("export").onclick=async()=>{
  if(!S) return;
  const payload={pack:S.key,pair:S.pack.label,scenario:S.pack.scenario,inputMode:S.voiceMode?"voice":"text",
    startLevel:+$("lvl").value,endLevel:S.level,adaptive:S.adapt,durationSec:Math.round((Date.now()-S.t0)/1000),
    metrics:{turns:S.turns,spoken:S.spoken,typed:S.typed,
      meanConfidence:S.confs.length?S.confs.reduce((a,c)=>a+c,0)/S.confs.length:null,
      lowConfidenceUngraded:S.lowconf,medianThinkMs:med(S.thinks),productionTurns:S.prodTurns,
      independentProduction:S.indepTurns,correct:S.correct,independentCorrect:S.indepCorrect,
      timeToFirstProductionMs:S.ttfp,nativeFallbacks:S.natives,freezes:S.freezes,dontUnderstand:S.lost,
      wordTaps:S.taps,pipSummoned:S.pipCalls,wordsEncountered:S.seen.size},
    wordsSeen:[...S.seen],mastery:S.mastery,turnLog:S.log};
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
    log("note",`<em>Couldn't start a download — log below:</em><pre class="dump">${esc(data)}</pre>`);
  }
};
setInterval(()=>{ if(S&&S.turns) paint(); },5000);
