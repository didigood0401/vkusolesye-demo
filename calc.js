const $=s=>document.querySelector(s);
const groups=CATS.map(c=>`<optgroup label="${c[1]}">${P.filter(p=>p.cat==c[0]).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('');
let rows=[{id:0,g:P[0].w}];
function drawRows(){
 $('#rows').innerHTML=rows.map((r,i)=>`<div class="crow"><select data-i="${i}">${groups}</select><input type="number" min="0" step="10" value="${r.g}" data-g="${i}" aria-label="Вес, г"><span>г</span><button type="button" data-x="${i}" aria-label="Убрать">×</button></div>`).join('');
 rows.forEach((r,i)=>{$('#rows').querySelector(`select[data-i="${i}"]`).value=r.id});
}
function calc(){
 let t={k:0,b:0,f:0,c:0};
 rows.forEach(r=>{const p=P[r.id],m=r.g/100;t.k+=p.k*m;t.b+=p.b*m;t.f+=p.f*m;t.c+=p.c*m});
 $('#tk').textContent=Math.round(t.k);$('#tb').textContent=n1(t.b);$('#tf').textContent=n1(t.f);$('#tc').textContent=n1(t.c);
 const pb=t.b*4,pf=t.f*9,pc=t.c*4,s=pb+pf+pc;
 if(s>0){const a=pb/s*100,b=a+pf/s*100;
  $('#donut').style.background=`conic-gradient(#3f4f2a 0 ${a}%,#b8863b ${a}% ${b}%,#d9c29a ${b}% 100%)`;
  $('#pb').textContent=Math.round(a)+'%';$('#pf').textContent=Math.round(b-a)+'%';$('#pc').textContent=Math.round(100-b)+'%';
 }else{$('#donut').style.background='#e7dcc6';['pb','pf','pc'].forEach(x=>$('#'+x).textContent='')}
 const seen=[...new Set(rows.map(r=>r.id))];
 $('#benefits').innerHTML=seen.map(id=>{const p=P[id];return`<div class="bcard"><img src="${p.img}" alt=""><div><h3>${p.name}</h3><p>${p.good}</p><small>На 100 г: ${p.k} ккал · Б ${n1(p.b)} · Ж ${n1(p.f)} · У ${n1(p.c)}</small></div></div>`}).join('');
}
$('#rows').addEventListener('change',e=>{const i=e.target.dataset.i;if(i!==undefined){rows[i].id=+e.target.value;rows[i].g=P[rows[i].id].w;drawRows()}calc()});
$('#rows').addEventListener('input',e=>{if(e.target.dataset.g!==undefined){rows[e.target.dataset.g].g=+e.target.value||0;calc()}});
$('#rows').addEventListener('click',e=>{const x=e.target.dataset.x;if(x!==undefined&&rows.length>1){rows.splice(x,1);drawRows();calc()}});
$('#addRow').onclick=()=>{rows.push({id:0,g:P[0].w});drawRows();calc()};
drawRows();calc();