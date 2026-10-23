// Original pixel artwork, drawn on an integer grid. No external art assets.
export const BED_POSITIONS=Array.from({length:6},(_,i)=>({x:444+(i%3)*47,y:248+Math.floor(i/3)*43,w:39,h:30}));
const ink='#576b57';
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
function oval(c,x,y,rx,ry,color){for(let yy=-ry;yy<=ry;yy+=3){const ww=Math.floor(rx*Math.sqrt(Math.max(0,1-yy*yy/(ry*ry)))/3)*3;rect(c,x-ww,y+yy,ww*2,3,color)}}
function star(c,x,y,color='#fff5cb'){rect(c,x,y-3,1,7,color);rect(c,x-3,y,7,1,color);}
export function flower(c,x,y,kind=0,size=1){c.save();c.translate(Math.round(x),Math.round(y));c.scale(size,size);rect(c,0,-1,2,13,'#68885f');rect(c,-4,5,5,2,'#87a573');rect(c,2,8,4,2,'#87a573');if(kind===2){rect(c,-2,-11,5,4,'#b39bd0');rect(c,-4,-6,7,4,'#9d87be');rect(c,-2,-2,6,3,'#c5b1dc');rect(c,-1,-12,2,3,'#e0ceef');}else{const petals=kind===0?'#eda7bc':'#fff1c2';rect(c,-3,-9,7,12,petals);rect(c,-6,-6,13,6,petals);rect(c,-3,-8,3,3,kind===0?'#f9cbda':'#fffbe7');rect(c,-1,-5,4,4,'#d6ad63');}c.restore();}
export function fairy(c,x,y,variant=0,t=0,scale=1){
 c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);
 const v=variant%4;
 const dress=['#b9a0d6','#94b9aa','#e8a8bc','#e7c28b'][v];
 const light=['#e2cef3','#cce6d5','#ffd5df','#ffe2af'][v];
 const hair=['#a67b69','#8d7760','#c39771','#ae8273'][v];
 // Four rounded, translucent-looking petal wings, each with a bright vein.
 oval(c,-11,-1,7,9,'#d1dce5');oval(c,11,-1,7,9,'#d1dce5');
 oval(c,-12,-3,5,7,'#edf0f1');oval(c,12,-3,5,7,'#edf0f1');
 oval(c,-9,7,5,5,'#e4dcef');oval(c,9,7,5,5,'#e4dcef');
 rect(c,-14,-5,2,7,'#fff9f2');rect(c,12,-5,2,7,'#fff9f2');
 // Tiny shoes, short legs and a scalloped petal dress.
 rect(c,-4,13,3,5,'#f3cfb4');rect(c,2,13,3,5,'#f3cfb4');
 rect(c,-5,17,4,2,dress);rect(c,2,17,4,2,dress);
 rect(c,-5,2,10,7,dress);rect(c,-7,8,14,5,dress);
 rect(c,-8,11,5,4,light);rect(c,-3,10,6,6,light);rect(c,3,11,5,4,light);
 rect(c,-4,3,8,2,light);rect(c,-1,3,2,3,'#fff3c5');
 rect(c,-8,4,3,5,'#f3cfb4');rect(c,5,4,3,5,'#f3cfb4');
 // Chibi proportions: soft hair silhouette, big bright eyes and rosy cheeks.
 oval(c,0,-10,10,11,hair);rect(c,-8,-15,16,14,'#f4d0b4');rect(c,-6,-2,12,3,'#f4d0b4');
 rect(c,-9,-18,18,5,hair);rect(c,-9,-14,3,9,hair);rect(c,7,-14,3,9,hair);
 rect(c,-6,-14,4,2,hair);rect(c,-3,-14,4,3,hair);rect(c,1,-14,5,2,hair);
 rect(c,-6,-9,3,4,'#65545c');rect(c,3,-9,3,4,'#65545c');
 rect(c,-6,-9,1,2,'#fffaf2');rect(c,3,-9,1,2,'#fffaf2');
 rect(c,-8,-4,4,2,'#eaa5ad');rect(c,4,-4,4,2,'#eaa5ad');
 rect(c,-1,-3,2,1,'#b37d7c');rect(c,0,-2,1,1,'#b37d7c');
 // Flower crown, a little side curl and one golden sparkle.
 rect(c,-8,-19,16,2,'#8eaa7e');rect(c,-10,-10,2,8,hair);rect(c,9,-8,2,6,hair);
 for(const xx of [-5,2,7]){rect(c,xx-1,-21,3,5,light);rect(c,xx-2,-20,5,3,light);rect(c,xx,-19,1,1,'#d6ab61');}
 if(t)star(c,20,-13+(Math.floor(t/500)%3),'#fff4bd');
 c.restore();
}
function mushroom(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(c,-2,0,5,11,'#f0dfb4');rect(c,-8,-3,17,4,'#a87477');rect(c,-6,-7,13,5,'#ca9190');rect(c,-3,-9,7,3,'#d9a29b');rect(c,-5,-5,3,2,'#f8dfba');rect(c,3,-4,3,2,'#f8dfba');c.restore();}
function tree(c,x,y,s,color){c.save();c.translate(x,y);c.scale(s,s);rect(c,-4,0,9,63,'#8a9270');rect(c,2,10,3,50,'#a6aa7c');oval(c,0,4,30,39,color);oval(c,-18,13,22,25,color);oval(c,18,16,25,27,color);oval(c,-11,-5,17,22,'#a3b88a');c.restore();}
function window(c,x,y){rect(c,x-3,y-3,39,44,'#8d8069');rect(c,x,y,33,38,'#f9d99f');rect(c,x+3,y+3,27,30,'#eec789');rect(c,x+4,y+4,10,11,'#fff0bc');rect(c,x+17,y+4,11,11,'#ffe6aa');rect(c,x+15,y,3,38,'#a29478');rect(c,x,y+17,33,3,'#a29478');rect(c,x-5,y+36,43,7,'#b69a79');}
export function drawScene(c,s,now,reduced=false){
 c.imageSmoothingEnabled=false;rect(c,0,0,640,360,'#d3dfbb');
 // The distant lavender sky and layers of forest.
 rect(c,0,0,640,92,'#dfdfe1');rect(c,0,60,640,50,'#cbd5c0');
 for(let i=0;i<13;i++){oval(c,i*56,72+(i%3)*8,44,52,['#bdcdb3','#c5d3b7','#b4c6ac'][i%3]);rect(c,i*56+3,65,5,64,'#b3bea4');}
 rect(c,0,109,640,251,'#bfd0a4');
 for(let i=0;i<7;i++)tree(c,i*112-12,20+(i%2)*11,1.2,['#9eb58c','#acc098'][i%2]);
 oval(c,328,256,240,63,'#cbdbac');oval(c,305,285,124,32,'#d6dbae');
 // Dappled grass is deterministic, so animation never flickers.
 for(let i=0;i<240;i++){const x=(i*137+13)%640,y=119+(i*83)%241;rect(c,x,y,3+(i%3)*2,2,i%4===0?'#dae2bb':'#aec698');if(i%6===0)rect(c,x+2,y-2,2,2,'#a3bb8c');}
 // Winding stepping-stone path.
 for(let i=0;i<10;i++){const x=315+Math.sin(i*.6)*19,y=247+i*13;oval(c,x,y,25,6,'#b6ba98');oval(c,x-1,y-2,23,5,'#e0dcc0');rect(c,x-10,y-5,12,2,'#eee7cd');}
 // Pond and lily pads.
 oval(c,100,275,67,29,'#93ac91');oval(c,100,271,62,27,'#afcec0');oval(c,100,269,54,21,'#bcd9cf');
 for(let i=0;i<8;i++)rect(c,58+(i*29)%80,252+(i*13)%30,12,2,'#d3e6d7');oval(c,75,266,10,4,'#8fae87');oval(c,122,280,12,4,'#94b78a');flower(c,124,275,0,.65);
 for(let i=0;i<7;i++){rect(c,40+i*4,257-i%3*3,2,13,'#7f9b77');rect(c,144+i*3,273-i%3*5,2,14,'#809b72');}
 // Shop shadow and raised foundation.
 oval(c,308,229,137,25,'#a5b58d');rect(c,190,126,228,109,'#c7aa89');rect(c,194,130,220,96,'#f0dbb5');
 for(let i=0;i<7;i++){rect(c,194,136+i*13,220,1,'#e3c9a5');rect(c,199+(i%2)*10,140+i*12,13,3,'#e8cfac');rect(c,387-(i%2)*6,140+i*12,12,3,'#e1c3a0');}
 rect(c,190,221,228,15,'#a68e70');rect(c,195,221,218,5,'#cfb58e');rect(c,205,237,205,7,'#bca483');rect(c,213,244,188,5,'#dbc59e');
 // Tall chimney.
 rect(c,365,63,23,47,'#be9f86');rect(c,362,61,29,6,'#aa8c7b');for(let i=0;i<5;i++)rect(c,366+(i%2)*9,70+i*7,11,2,'#dac0a1');
 // Stepped moss roof with hand-placed pixel tiles.
 for(let row=0;row<12;row++){const x=182+row*7,y=126-row*5,w=245-row*14;rect(c,x,y,w,6,row%3===0?'#7d9a70':row%3===1?'#8ca67b':'#9bb488');for(let k=0;k<w/20;k++)rect(c,x+4+k*20+(row%2)*5,y,9,2,'#abc095');}
 rect(c,179,132,252,6,'#647e60');rect(c,184,137,242,3,'#b6be90');
 for(let i=0;i<15;i++){const x=186+i*16;rect(c,x,135,5,7+i%3*3,'#8ba477');if(i%3===0)flower(c,x+3,133,i%2,.5);}
 // Sign, doorway and amber windows.
 rect(c,258,109,96,24,'#927c64');rect(c,261,111,90,19,'#f7e6bd');c.fillStyle='#6a785a';c.font='bold 9px monospace';c.textAlign='center';c.fillText('PETAL & PIXIE',306,123);
 window(c,208,151);window(c,367,151);rect(c,277,148,62,76,'#9a8069');rect(c,282,151,52,72,'#bead8b');rect(c,287,154,42,38,'#e3cc9e');rect(c,291,157,34,30,'#f4dfac');rect(c,305,155,3,34,'#b5a381');rect(c,288,170,40,3,'#b5a381');rect(c,324,202,3,4,'#f3d282');
 // Candy-striped shop canopy and wooden flower counter.
 rect(c,235,172,115,8,'#a87f83');for(let i=0;i<9;i++){rect(c,233+i*13,175,13,19,i%2===0?'#e6adad':'#f9e7cb');rect(c,233+i*13,193,13,5,i%2===0?'#c68f94':'#e5d3b4');}rect(c,235,194,3,35,'#aa8f72');rect(c,346,194,3,35,'#aa8f72');
 rect(c,243,216,97,21,'#b69573');rect(c,240,213,104,5,'#e0c39a');for(let i=0;i<5;i++)rect(c,246+i*19,219,2,15,'#9d8166');rect(c,275,220,35,10,'#ead5af');c.fillStyle='#8a8968';c.font='6px monospace';c.fillText('FLOWERS',292,227);
 for(let i=0;i<6;i++){rect(c,247+i*15,204,10,10,['#caab92','#b8b994','#bfabc2'][i%3]);flower(c,252+i*15,199,i%3,.7);}
 // Window boxes, climbing vines and lanterns.
 for(const x of [204,364]){rect(c,x,194,45,9,'#a28b72');for(let j=0;j<5;j++)flower(c,x+5+j*9,188,j%3,.65);}
 for(let i=0;i<10;i++){rect(c,197+(i%2)*4,140+i*8,3,8,'#86976a');rect(c,192+(i%2)*4,143+i*8,7,3,'#96ac78');if(i%3===1)flower(c,197,143+i*8,0,.5);}
 rect(c,424,157,3,67,'#9c8e6d');rect(c,413,157,22,3,'#9c8e6d');rect(c,414,161,13,18,'#c2a875');rect(c,417,164,7,12,'#ffe6a5');
 // Fence behind the raised beds.
 rect(c,439,235,153,4,'#d3c5a1');rect(c,439,244,153,3,'#d3c5a1');for(let i=0;i<11;i++){rect(c,440+i*14,229,5,23,'#eee0bb');rect(c,441+i*14,227,3,2,'#eee0bb');}
 BED_POSITIONS.forEach((b,i)=>{rect(c,b.x-2,b.y+3,b.w+4,b.h,'#a38d69');rect(c,b.x,b.y,b.w,b.h,'#c1a079');rect(c,b.x+3,b.y+3,b.w-6,b.h-6,'#8c8061');for(let k=0;k<5;k++)rect(c,b.x+5+k*6,b.y+6,2,16,'#9e8c69');const plant=s.beds[i];if(plant){if(plant.watered){rect(c,b.x+3,b.y+3,b.w-6,b.h-6,'#82775c');}if(plant.watered&&now>=plant.readyAt){for(let j=0;j<3;j++)flower(c,b.x+10+j*9,b.y+8+(j%2)*5,plant.flower,.8);star(c,b.x+32,b.y+3);}else{for(let j=0;j<3;j++){rect(c,b.x+8+j*9,b.y+12,2,7,'#8eb17c');rect(c,b.x+5+j*9,b.y+11,4,2,'#9db988');}if(!plant.watered){rect(c,b.x+27,b.y+1,3,6,'#b3d6e6');rect(c,b.x+26,b.y+4,5,4,'#b3d6e6');}}}else{rect(c,b.x+16,b.y+11,8,2,'#b9a783');rect(c,b.x+19,b.y+8,2,8,'#b9a783');}});
 // Signpost and flower cart.
 rect(c,166,207,4,42,'#a38a68');rect(c,146,205,46,16,'#e7d5a6');c.fillStyle='#7c8864';c.font='7px monospace';c.fillText('OPEN',169,216);
 rect(c,91,199,61,21,'#b69b78');rect(c,87,195,69,5,'#d7bd92');rect(c,100,221,8,8,'#867e61');rect(c,137,221,8,8,'#867e61');for(let i=0;i<5;i++){rect(c,95+i*11,186,10,10,'#ccb194');flower(c,100+i*11,183,i%3,.8);}
 // Fairies, cat, mushrooms, foreground foliage.
 const bob=reduced?0:Math.round(Math.sin(now/650)*2);fairy(c,361,240+bob,(s.day-1+s.served)%4,now,1.1);fairy(c,179,284-bob,2,now,.85);
 oval(c,252,255,11,4,'#a9b58c');rect(c,246,244,14,8,'#e5c49c');rect(c,257,239,9,12,'#e5c49c');rect(c,257,237,3,4,'#e5c49c');rect(c,263,237,3,4,'#e5c49c');rect(c,259,243,1,2,'#766651');rect(c,264,243,1,2,'#766651');rect(c,240,242,7,3,'#e5c49c');
 for(const [x,y,z] of [[35,213,1.3],[57,221,.8],[592,194,1.4],[612,207,.8],[402,305,.8],[28,323,1.4],[53,334,1],[604,328,1.5]])mushroom(c,x,y,z);
 for(let i=0;i<18;i++){const x=(i*79+7)%640,y=318+(i*17)%35;flower(c,x,y,i%3,.55);}
 for(const x of [-8,628]){oval(c,x,332,32,37,'#8fa87b');oval(c,x+8,355,37,21,'#9eb587');}
 // Fireflies and soft drifting petals are disabled by reduced-motion preference.
 for(let i=0;i<11;i++){const x=(i*57+36)%635,y=100+(i*37)%205+(reduced?0:Math.sin(now/1300+i)*4);if(i%3===0)star(c,x,y,'#fff1c6');else rect(c,x,y,2,2,'#fff1c6');}
 if(!reduced)for(let i=0;i<5;i++){const x=(i*137+now/85)%640,y=80+(i*47+now/210)%230;rect(c,x,y,3,2,'#edc4cc');}
}
