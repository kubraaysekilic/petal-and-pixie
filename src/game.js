export const FLOWERS = [
  {id:'rose', name:'Pembe gül', color:'#e9a6bd', time:8000},
  {id:'daisy', name:'Ay papatyası', color:'#fff3cb', time:10000},
  {id:'lavender', name:'Yıldız lavanta', color:'#b9a0dc', time:12000}
];
export const CUSTOMERS = [
  {name:'Luna', title:'Ay ışığı perisi', wish:'Bir dostuma, küçük bir mutluluk.', recipe:[2,1,0], reward:18},
  {name:'Milo', title:'Ormanın postacısı', wish:'Bugün birinin yüzü gülsün istiyorum.', recipe:[0,2,1], reward:20},
  {name:'Flora', title:'Çiy damlası perisi', wish:'Yıldızların renginde bir buket olsun.', recipe:[1,0,2], reward:22},
  {name:'Pip', title:'Mantar köyünden', wish:'Evimi bahar gibi kokutacak çiçekler!', recipe:[1,1,1], reward:21}
];
export function fresh(){return {version:1,day:1,coins:12,served:0,total:0,level:0,stock:[3,3,3],beds:Array.from({length:6},()=>null),bouquet:[0,0,0]};}
export function customer(s){return CUSTOMERS[(s.day-1+s.served)%CUSTOMERS.length];}
export function ready(b,now){return !!b && b.watered && now>=b.readyAt;}
export function bedAction(s,index,flower,now=Date.now()){
  if(!Number.isInteger(index)||index<0||index>=6||!Number.isInteger(flower)||flower<0||flower>2)return 'Geçersiz seçim.';
  const b=s.beds[index];
  if(!b){s.beds[index]={flower,watered:false,readyAt:0};return 'Tohum ekildi. Bir kez daha dokun, can suyu ver.';}
  if(!b.watered){b.watered=true;b.readyAt=now+FLOWERS[b.flower].time*(1-s.level*.2);return 'Can suyu verildi. Çiçeğin birazdan açacak.';}
  if(!ready(b,now))return 'Çiçeğin büyüyor. Aceleye gerek yok.';
  s.stock[b.flower]+=1+s.level;s.beds[index]=null;return `${FLOWERS[b.flower].name} toplandı. +${1+s.level} çiçek`;
}
export function addFlower(s,i){if(!Number.isInteger(i)||i<0||i>2)return false;if(s.stock[i]<1||s.bouquet.reduce((a,b)=>a+b,0)>=3)return false;s.stock[i]--;s.bouquet[i]++;return true;}
export function clearBouquet(s){s.bouquet.forEach((v,i)=>s.stock[i]+=v);s.bouquet=[0,0,0];}
export function matches(s){return s.served<3&&s.bouquet.every((v,i)=>v===customer(s).recipe[i]);}
export function deliver(s){if(!matches(s))return false;s.coins+=customer(s).reward;s.served++;s.total++;s.bouquet=[0,0,0];return true;}
export function nextDay(s){if(s.served<3)return false;clearBouquet(s);s.day++;s.served=0;return true;}
export function upgrade(s){const cost=s.level===0?35:65;if(s.level>=2||s.coins<cost)return false;s.coins-=cost;s.level++;return true;}
export function restore(raw){
  try{
    const s=JSON.parse(raw);const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
    const arr=(a,max)=>Array.isArray(a)&&a.length===3&&a.every(v=>integer(v,0,max));
    if(!s||s.version!==1||!integer(s.day,1,1e7)||!integer(s.coins,0,1e9)||!integer(s.served,0,3)||!integer(s.total,0,1e9)||!integer(s.level,0,2)||!arr(s.stock,1e9)||!arr(s.bouquet,3)||s.bouquet.reduce((a,b)=>a+b,0)>3||!Array.isArray(s.beds)||s.beds.length!==6)return fresh();
    if(!s.beds.every(b=>b===null||(b&&integer(b.flower,0,2)&&typeof b.watered==='boolean'&&Number.isFinite(b.readyAt)&&b.readyAt>=0&&b.readyAt<=8640000000000000)))return fresh();
    return s;
  }catch{return fresh();}
}
