const IMG=['img/ref1.jpg','img/ref2.jpg','img/ref3.jpg','img/ref4.jpg'];
const CATS=[
['sets','Фуршетные сеты'],['cheese','Сырная коллекция'],['meat','Мясная лавка'],['dry','Солнечные сухофрукты'],
['tea','Чайная коллекция'],['drinks','Напитки из-за рубежа'],['sweet','Сладкая лавка'],['ny','Сезонная · Новый год']];
const P=[
['sets','Сет «Канапе-микс» на 10 гостей','40 канапе: сыр, ветчина, оливки, ягоды',3200,900,260,12,16,16,'Сыр даёт кальций и белок, ягоды — витамин C.'],
['sets','Сет «Сырно-мясной» на 15 гостей','Ассорти сыров и деликатесов, виноград, орехи',5400,1200,310,20,24,3,'Много белка и мало углеводов — сытно без хлеба.'],
['sets','Сет «Мини-тарталетки» на 20 гостей','60 тарталеток: лосось, паштет, творожный сыр',6900,1500,270,9,17,20,'Лосось — источник омега-3 жиров.'],
['sets','Сет «Корпоратив» на 40 гостей','Канапе, тарталетки, сырная и мясная нарезка',13500,3500,275,12,17,17,'Набор из разных продуктов: белки, жиры и немного углеводов.'],
['cheese','Сырная тарелка «Классика»','Пармезан, горгонзола, камамбер, гауда, 600 г',2400,600,340,22,27,1,'Кальций и витамин B12.'],
['cheese','Камамбер фермерский','Сыр с белой плесенью, 150 г',480,150,300,20,24,0.5,'Источник кальция и белка.'],
['cheese','Пармезан 24 мес.','Выдержанный твёрдый сыр, 200 г',720,200,392,33,28,0,'Самый белковый из сыров, почти без лактозы.'],
['cheese','Козий сыр с травами','Свежий козий сыр, 120 г',390,120,270,18,21,1,'Усваивается легче, чем сыр из коровьего молока.'],
['meat','Ветчина дубовая','Нарезка, 200 г',560,200,200,18,14,1,'Белок и витамины группы B.'],
['meat','Хамон серрано','Сыровяленый окорок, 100 г',890,100,241,31,13,0,'Белок и цинк.'],
['meat','Колбаса сыровяленая','Фермерская, 250 г',620,250,400,28,31,2,'Калорийная, лучше небольшими порциями.'],
['meat','Ассорти мясных деликатесов','Балык, бастурма, прошутто, 400 г',1500,400,260,28,16,1,'Белок, железо и цинк.'],
['dry','Курага отборная','Без сахара, 300 г',350,300,241,3.4,0.5,55,'Калий — для сердца и мышц.'],
['dry','Инжир вяленый','Турция, 300 г',480,300,257,3.3,1,58,'Клетчатка и калий.'],
['dry','Ассорти сухофруктов','Финики, чернослив, курага, изюм, 500 г',620,500,270,2.5,0.5,63,'Клетчатка и быстрая энергия вместо конфет.'],
['tea','Чай «Лесная ягода»','Фруктово-ягодный, 100 г',420,100,1,0,0,0.2,'Без калорий (КБЖУ на 100 мл заварки, без сахара).'],
['tea','Улун молочный','Листовой, 100 г',550,100,1,0,0,0.2,'Без калорий, содержит антиоксиданты (на 100 мл заварки).'],
['tea','Чайный набор «Уют»','5 сортов в подарочной коробке',1600,250,1,0,0,0.2,'Без калорий (на 100 мл заварки, без сахара).'],
['drinks','Просекко итальянское','0,75 л',1450,750,70,0,0,1.5,'Содержит алкоголь, только для взрослых.'],
['drinks','Лимонад итальянский','Апельсин, 0,33 л',210,330,42,0,0,10,'Содержит сахар: около 33 г в бутылке.'],
['drinks','Сидр французский','0,75 л',980,750,50,0,0,5,'Содержит алкоголь, только для взрослых.'],
['sweet','Макаронс ассорти','12 шт.',1100,200,420,6,18,58,'Миндальная мука даёт немного белка; порцию лучше ограничить.'],
['sweet','Бельгийский шоколад','Набор плиток, 300 г',760,300,540,6,33,55,'Магний и антиоксиданты какао.'],
['sweet','Пахлава','Ассорти, 400 г',650,400,430,7,25,46,'Орехи — полезные жиры, но сахара много.'],
['ny','Подарочный набор «Новогодний»','Сыр, ветчина, чай, сладости',3500,1000,330,12,17,32,'Всего понемногу — удобно для подарка.'],
['ny','Набор «Ёлочка»','Канапе-ёлочка из сыра и ягод на 8 гостей',2700,700,240,12,16,12,'Сыр и ягоды: белок и витамин C.'],
['ny','Новогодние сладости','Пряники, конфеты, мандарины',1300,1200,300,3,8,52,'Мандарины — витамин C.']
].map((r,i)=>({id:i,cat:r[0],name:r[1],desc:r[2],price:r[3],w:r[4],k:r[5],b:r[6],f:r[7],c:r[8],good:r[9],img:IMG[i%4]}));
const n1=x=>(Math.round(x*10)/10).toString().replace('.',',');
const kbju=(p,g)=>{const m=g/100;return{k:Math.round(p.k*m),b:n1(p.b*m),f:n1(p.f*m),c:n1(p.c*m)}};const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString('ru-RU')+' ₽';
let cat='sets',cart=JSON.parse(localStorage.vk||'{}');
const save=()=>{localStorage.vk=JSON.stringify(cart);render()};
const tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().slice(0,10)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)}
function grid(){
 $('#tabs').innerHTML=CATS.map(c=>`<button data-c="${c[0]}" class="${c[0]==cat?'on':''}">${c[1]}</button>`).join('');
 $('#grid').innerHTML=P.filter(p=>p.cat==cat).map(p=>`<div class="card"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="b"><h3>${p.name}</h3><p>${p.desc}</p><div class="kb">На 100 г: ${p.k} ккал · Б ${n1(p.b)} · Ж ${n1(p.f)} · У ${n1(p.c)}</div><div class="good"><b>Польза:</b> ${p.good}</div><div class="row"><span>${fmt(p.price)}</span><button class="btn" data-a="${p.id}">В корзину</button></div></div></div>`).join('');
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
 if(t.dataset.c){cat=t.dataset.c;grid()}
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
const cs=$('#cprod');cs.innerHTML=P.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
function calc(){const p=P[cs.value],g=+$('#cg').value||0,r=kbju(p,g);
 $('#cres').innerHTML=`<b>${r.k} ккал</b><span>Белки ${r.b} г</span><span>Жиры ${r.f} г</span><span>Углеводы ${r.c} г</span>`;$('#cgood').textContent='Польза: '+p.good}
cs.onchange=()=>{$('#cg').value=P[cs.value].w;calc()};$('#cg').oninput=calc;cs.onchange();
grid();render();