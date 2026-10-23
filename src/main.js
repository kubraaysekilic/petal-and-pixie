import {FLOWERS,fresh,restore,customer,ready,bedAction,addFlower,clearBouquet,matches,deliver,nextDay,upgrade} from './game.js';
import {drawScene,fairy,BED_POSITIONS} from './art.js';
const $=id=>document.getElementById(id),KEY='petal-and-pixie-v1';
let state=fresh(),seed=0,sound=false,audio=null,storageAvailable=true;
try{const raw=localStorage.getItem(KEY);if(raw)state=restore(raw);}catch{storageAvailable=false;}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{storageAvailable=false;}$('save-status').textContent=storageAvailable?'Bu tarayıcıda otomatik kayıt':'Kayıt kapalı · ilerleme yalnızca bu oturumda';}
function chime(){if(!sound)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();[523.25,659.25,783.99].forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.09;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.5);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.5)});}catch{sound=false;$('sound').setAttribute('aria-pressed','false');toast('Bu tarayıcıda ses açılamadı.');}}
function toast(message){$('toast').textContent=message;}
const img=(i,alt='')=>`<img src="assets/${FLOWERS[i].id}.svg" alt="${alt}">`;
$('seeds').innerHTML=FLOWERS.map((f,i)=>`<button data-seed="${i}" aria-pressed="${i===0}">${img(i)}${f.name}</button>`).join('');
$('beds').innerHTML=Array.from({length:6},(_,i)=>`<button class="bed" data-bed="${i}"><b>＋</b><span>Ek</span></button>`).join('');
$('flowers').innerHTML=FLOWERS.map((f,i)=>`<button class="flower" data-flower="${i}">${img(i)}<strong>3</strong><span>${f.name}</span></button>`).join('');
function renderBeds(){const now=Date.now();document.querySelectorAll('[data-bed]').forEach((el,i)=>{const b=state.beds[i];const done=ready(b,now);let label=!b?'Ek':!b.watered?'Sula':done?'Topla':`${Math.max(1,Math.ceil((b.readyAt-now)/1000))} sn`;el.querySelector('b').textContent=!b?'＋':!b.watered?'♧':done?'✿':'· · ·';el.querySelector('span').textContent=label;el.classList.toggle('ready',done);el.setAttribute('aria-label',`Tarh ${i+1}: ${b?FLOWERS[b.flower].name+', ':''}${label}`);});}
function render(){
 const c=customer(state),ended=state.served===3;$('day').textContent=String(state.day).padStart(2,'0');$('coins').textContent=state.coins;$('total').textContent=state.total;
 $('customer').textContent=ended?'Ne güzel bir gün!':c.name;$('customer-title').textContent=ended?'Üç küçük mutluluk paylaşıldı.':c.title;$('wish').textContent=ended?'“Dükkânın ışığı, ormanı biraz daha güzelleştirdi.”':`“${c.wish}”`;
 $('order-number').textContent=`${Math.min(state.served+1,3)} / 3`;
 $('recipe').innerHTML=ended?'<span>✧ Bugünkü siparişler tamamlandı</span>':c.recipe.map((v,i)=>v?`<span title="${FLOWERS[i].name}">${img(i,FLOWERS[i].name)} × ${v}</span>`:'').join('');
 $('reward').textContent=ended?'Teşekkürler!':`${c.reward} yaprak`;
 const contents=state.bouquet.flatMap((v,i)=>Array(v).fill(i));$('bouquet').innerHTML=[0,1,2].map(n=>`<span>${contents[n]!==undefined?img(contents[n],FLOWERS[contents[n]].name):'✧'}</span>`).join('');
 $('bouquet-count').textContent=`${contents.length} / 3 çiçek`;$('clear').disabled=!contents.length;$('deliver').disabled=!matches(state);$('next').hidden=!ended;$('deliver').hidden=ended;
 $('order-hint').textContent=ended?'Hazır olduğunda yeni güne geç. Bahçen seninle kalır.':matches(state)?'Tam da istediği gibi! Buketin hazır.':'Raftan siparişteki çiçekleri seç. Yanlış seçersen buketi çöz.';
 document.querySelectorAll('[data-flower]').forEach((el,i)=>{el.querySelector('strong').textContent=state.stock[i];el.disabled=ended||state.stock[i]===0||contents.length>=3;el.setAttribute('aria-label',`${FLOWERS[i].name} ekle, rafta ${state.stock[i]} adet`);});
 document.querySelectorAll('[data-seed]').forEach((el,i)=>el.setAttribute('aria-pressed',String(seed===i)));
 const cost=state.level===0?35:65;$('upgrade').textContent=state.level===2?'Bahçen ışıl ışıl':`${cost} yaprak · Geliştir`;$('upgrade').disabled=state.level===2||state.coins<cost;$('upgrade-title').textContent=state.level===2?'Peri bahçesi · Seviye 3':'Bir tutam peri tozu';$('upgrade-copy').textContent=state.level===2?'%40 hızlı büyüme, her hasatta 3 çiçek.':`Daha hızlı büyüme, her hasatta ${state.level+2} çiçek.`;
 $('journal').textContent=`${state.day}. gün · ${state.served} buket paylaşıldı · aceleye gerek yok`;
 const pc=$('portrait').getContext('2d');pc.clearRect(0,0,48,48);fairy(pc,24,25,(state.day-1+state.served)%4,0,1.2);renderBeds();save();drawScene(ctx,state,Date.now(),reduced);
}
function actBed(i){const message=bedAction(state,i,seed);toast(message);chime();render();}
$('seeds').addEventListener('click',e=>{const b=e.target.closest('[data-seed]');if(b){seed=Number(b.dataset.seed);render();toast(`${FLOWERS[seed].name} seçildi. Boş bir tarha dokun.`);}});
$('beds').addEventListener('click',e=>{const b=e.target.closest('[data-bed]');if(b)actBed(Number(b.dataset.bed));});
$('flowers').addEventListener('click',e=>{const b=e.target.closest('[data-flower]');if(b&&state.served<3&&addFlower(state,Number(b.dataset.flower))){chime();render();toast('Buketine bir çiçek daha eklendi.');}});
$('clear').onclick=()=>{clearBouquet(state);render();toast('Çiçekler rafa geri döndü. Yeniden deneyebilirsin.');};
$('deliver').onclick=()=>{const name=customer(state).name;if(deliver(state)){chime();render();toast(`${name}: “Tam hayal ettiğim gibi! Teşekkür ederim.”`);}};
$('next').onclick=()=>{if(nextDay(state)){render();toast('Yeni bir gün, yeni küçük mutluluklar.');}};
$('upgrade').onclick=()=>{if(upgrade(state)){chime();render();toast('Peri tozu bahçene yayıldı! Yeni ekimler daha bereketli.');}};
$('sound').onclick=()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'Sesi kapat':'Sesi aç');if(sound)chime();};
$('help').onclick=()=>$('help-dialog').showModal();$('close-help').onclick=()=>$('help-dialog').close();$('reset').onclick=()=>$('reset-dialog').showModal();$('cancel-reset').onclick=()=>$('reset-dialog').close();$('confirm-reset').onclick=()=>{state=fresh();seed=0;render();$('reset-dialog').close();toast('Yeni hikâyene hoş geldin. İlk buketin Luna için.');};
const canvas=$('world'),ctx=canvas.getContext('2d');canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*640/r.width,y=(e.clientY-r.top)*360/r.height;const i=BED_POSITIONS.findIndex(b=>x>=b.x-2&&x<=b.x+b.w+2&&y>=b.y&&y<=b.y+b.h+3);if(i>=0)actBed(i);});
let last=0;function animate(t){if(!document.hidden&&t-last>80){drawScene(ctx,state,Date.now(),reduced);last=t;}requestAnimationFrame(animate);}render();toast(state.total>0?'Bahçene tekrar hoş geldin. Hikâyen kaldığı yerden devam ediyor.':'Hoş geldin, küçük çiçekçi. Luna seni bekliyor!');if(!reduced)requestAnimationFrame(animate);setInterval(()=>{if(!document.hidden){renderBeds();if(reduced)drawScene(ctx,state,Date.now(),true);}},500);
