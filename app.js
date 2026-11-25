const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString('ru-RU')+' ₽';
let cat='sets',cart=JSON.parse(localStorage.vk||'{}');
const save=()=>{localStorage.vk=JSON.stringify(cart);render()};
const tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().slice(0,10)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)}
let sub='all';const SUBS=[['all','Все'],['ham','Ветчина'],['sausage','Колбасы'],['cured','Сыровяленое'],['plate','Нарезка и наборы']];
function grid(){
 $('#tabs').innerHTML=window.ONLY?SUBS.map(s=>`<button data-s="${s[0]}" class="${s[0]==sub?'on':''}">${s[1]}</button>`).join(''):CATS.map(c=>`<button data-c="${c[0]}" class="${c[0]==cat?'on':''}">${c[1]}</button>`).join('');
 $('#grid').innerHTML=P.filter(p=>window.ONLY?(p.cat==ONLY&&(sub=='all'||p.sub==sub)):p.cat==cat).map(p=>`<div class="card">${window.ONLY?'<div class="nf">Фото будет с вашими товарами</div>':`<img src="${p.img}" alt="${p.name}" loading="lazy">`}<div class="b"><h3>${p.name}</h3><p>${p.desc}</p><div class="kb">На 100 г: ${p.k} ккал · Б ${n1(p.b)} · Ж ${n1(p.f)} · У ${n1(p.c)}</div><div class="good"><b>Польза:</b> ${p.good}</div><div class="row"><span>${fmt(p.price)}</span><button class="btn" data-a="${p.id}">В корзину</button></div></div></div>`).join('');
}
function totals(){
 const sub=Object.keys(cart).reduce((s,id)=>s+P[id].price*cart[id].q,0),m=$('#mode')?$('#mode').value:'msk';
 let d=0,note='';
 if(m=='out')note='обговаривается отдельно';else if(m=='msk')d=sub>=5000?0:sub>=3000?300:500;
 return{sub,d,note,total:sub+d}
}
function render(){
 const ids=Object.keys(cart);$('#cnt').textContent=ids.reduce((s,i)=>s+cart[i].q,0);
 $('#lines').innerHTML=ids.length?ids.map(id=>`<div class="line"><div class="t"><b>${P[id].name}</b><span>${fmt(P[id].price*cart[id].q)}</span></div><div class="q"><button data-m="${id}">−</button> ${cart[id].q} <button data-p="${id}">+</button></div><label>Дата получения<input type="date" min="${tomorrow()}" value="${cart[id].date||''}" data-d="${id}"></label></div>`).join(''):'<p>Корзина пуста</p>';
 const t=totals();const tk=ids.reduce((s,id)=>{const x=kbju(P[id],P[id].w*cart[id].q);return{k:s.k+x.k,b:s.b+ +x.b.replace(',','.'),f:s.f+ +x.f.replace(',','.'),c:s.c+ +x.c.replace(',','.')}},{k:0,b:0,f:0,c:0});$('#sum').innerHTML=`Товары: ${fmt(t.sub)}<br>${ids.length?`Всего в заказе: ${tk.k} ккал · Б ${n1(tk.b)} · Ж ${n1(tk.f)} · У ${n1(tk.c)}<br>`:''}`+(t.sub&&t.sub<1000?`<span class="err">Минимальный заказ — 1000 ₽, не хватает ${fmt(1000-t.sub)}</span>`:'');
}
document.addEventListener('click',e=>{
 const t=e.target;
 if(t.dataset.c){cat=t.dataset.c;grid()}if(t.dataset.s){sub=t.dataset.s;grid()}
 if(t.dataset.a){const id=t.dataset.a;cart[id]=cart[id]||{q:0,date:''};cart[id].q++;save();toast('Добавлено в корзину')}
 if(t.dataset.p){cart[t.dataset.p].q++;save()}
 if(t.dataset.m){if(--cart[t.dataset.m].q<1)delete cart[t.dataset.m];save()}
});
document.addEventListener('change',e=>{if(e.target.dataset.d){cart[e.target.dataset.d].date=e.target.value;localStorage.vk=JSON.stringify(cart)}});
$('#openCart').onclick=()=>$('#drawer').classList.add('open');
$('#closeCart').onclick=()=>$('#drawer').classList.remove('open');
function msum(){
 const t=totals();$('#addrw').style.display=/^p/.test($('#mode').value)?'none':'';
 $('#msum').innerHTML=`Товары: ${fmt(t.sub)}<br>Доставка: ${t.note||fmt(t.d)}<br><b>Итого: ${fmt(t.total)}${t.note?' + доставка':''}</b>`;
}
$('#toCheckout').onclick=()=>{
 const ids=Object.keys(cart),t=totals();
 if(!ids.length)return toast('Корзина пуста');
 if(t.sub<1000)return toast('Минимальный заказ — 1000 ₽');
 if(ids.some(i=>!cart[i].date))return toast('Укажите дату для каждой позиции');
 $('#drawer').classList.remove('open');$('#modal').classList.add('open');msum();
};
$('#mclose').onclick=()=>$('#modal').classList.remove('open');
$('#form').addEventListener('change',e=>{msum();$('#cardbox').style.display=$('#form').pay.value=='card'?'':'none'});
$('#form').onsubmit=e=>{
 e.preventDefault();const f=e.target;
 if(!/^p/.test(f.mode.value)&&!f.addr.value.trim()){$('#err').textContent='Укажите адрес доставки';return}
 $('#err').textContent='';cart={};save();$('#modal').classList.remove('open');f.reset();
 toast('Заказ принят! (демо) Заявка ушла бы на vkusolesye@mail.ru');
};
grid();render();