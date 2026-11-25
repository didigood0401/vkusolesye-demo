const IMG=['img/ref1.jpg','img/ref2.jpg','img/ref3.jpg','img/ref4.jpg'];
const CATS=[
['sets','Фуршетные сеты'],['cheese','Сырная коллекция'],['meat','Мясная лавка'],['dry','Солнечные сухофрукты'],
['tea','Чайная коллекция'],['drinks','Напитки из-за рубежа'],['sweet','Сладкая лавка'],['ny','Сезонная · Новый год']];
const P=[
['sets','Сет «Канапе-микс» на 10 гостей','40 канапе: сыр, ветчина, оливки, ягоды',3200],
['sets','Сет «Сырно-мясной» на 15 гостей','Ассорти сыров и деликатесов, виноград, орехи',5400],
['sets','Сет «Мини-тарталетки» на 20 гостей','60 тарталеток: лосось, паштет, творожный сыр',6900],
['sets','Сет «Корпоратив» на 40 гостей','Канапе, тарталетки, сырная и мясная нарезка',13500],
['cheese','Сырная тарелка «Классика»','Пармезан, горгонзола, камамбер, гауда, 600 г',2400],
['cheese','Камамбер фермерский','Нежный сыр с белой плесенью, 150 г',480],
['cheese','Пармезан 24 мес.','Выдержанный твёрдый сыр, 200 г',720],
['cheese','Козий сыр с травами','Свежий козий сыр, 120 г',390],
['meat','Ветчина дубовая','Нарезка, 200 г',560],
['meat','Хамон серрано','Сыровяленый окорок, 100 г',890],
['meat','Колбаса сыровяленая','Фермерская, 250 г',620],
['meat','Ассорти мясных деликатесов','Балык, бастурма, прошутто, 400 г',1500],
['dry','Курага отборная','Солнечная, без сахара, 300 г',350],
['dry','Инжир вяленый','Турция, 300 г',480],
['dry','Ассорти сухофруктов','Финики, чернослив, курага, изюм, 500 г',620],
['tea','Чай «Лесная ягода»','Фруктово-ягодный, 100 г',420],
['tea','Улун молочный','Листовой, 100 г',550],
['tea','Чайный набор «Уют»','5 сортов в подарочной коробке',1600],
['drinks','Просекко итальянское','0,75 л',1450],
['drinks','Лимонад итальянский','Апельсин, 0,33 л',210],
['drinks','Сидр французский','0,75 л',980],
['sweet','Макаронс ассорти','12 шт.',1100],
['sweet','Бельгийский шоколад','Набор плиток, 300 г',760],
['sweet','Пахлава','Ассорти, 400 г',650],
['ny','Подарочный набор «Новогодний»','Сыр, ветчина, чай, сладости',3500],
['ny','Набор «Ёлочка»','Канапе-ёлочка из сыра и ягод на 8 гостей',2700],
['ny','Новогодние сладости','Пряники, конфеты, мандарины',1300]
].map((r,i)=>({id:i,cat:r[0],name:r[1],desc:r[2],price:r[3],img:IMG[i%4]}));
const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString('ru-RU')+' ₽';
let cat='sets',cart=JSON.parse(localStorage.vk||'{}');
const save=()=>{localStorage.vk=JSON.stringify(cart);render()};
const tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return d.toISOString().slice(0,10)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)}
function grid(){
 $('#tabs').innerHTML=CATS.map(c=>`<button data-c="${c[0]}" class="${c[0]==cat?'on':''}">${c[1]}</button>`).join('');
 $('#grid').innerHTML=P.filter(p=>p.cat==cat).map(p=>`<div class="card"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="b"><h3>${p.name}</h3><p>${p.desc}</p><div class="row"><span>${fmt(p.price)}</span><button class="btn" data-a="${p.id}">В корзину</button></div></div></div>`).join('');
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
 const t=totals();$('#sum').innerHTML=`Товары: ${fmt(t.sub)}<br>`+(t.sub&&t.sub<1000?`<span class="err">Минимальный заказ — 1000 ₽, не хватает ${fmt(1000-t.sub)}</span>`:'');
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
grid();render();