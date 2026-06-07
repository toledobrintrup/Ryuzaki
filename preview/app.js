/* ============================================================
   RYUZAKI — app.js  (prototype / preview)
   ============================================================ */

/* ---------- nav config ---------- */
const NAV = [
  { id:'dashboard',  label:'Dashboard',            group:'PRINCIPAL' },
  { id:'fin-pers',   label:'Finanzas Personales',   group:'PRINCIPAL' },
  { id:'futuro',     label:'Corporación Futuro',     group:'NEGOCIOS' },
  { id:'bosquemar',  label:'C.D. Bosquemar',         group:'NEGOCIOS' },
  { id:'construcc',  label:'Construcciones',         group:'NEGOCIOS' },
  { id:'finanzas',   label:'Finanzas',               group:'NEGOCIOS' },
  { id:'mix',        label:'Mix / Mastering',        group:'CREATIVO' },
  { id:'musica',     label:'Creación Musical',       group:'CREATIVO' },
  { id:'contenido',  label:'Creación de Contenido',  group:'CREATIVO' },
  { id:'ingles',     label:'Aprender Inglés',        group:'APRENDIZAJE' },
  { id:'interprete', label:'Intérprete',             group:'APRENDIZAJE', children:[
      { id:'bajo',     label:'Bajo' },
      { id:'piano',    label:'Piano' },
      { id:'guitarra', label:'Guitarra' },
  ]},
  { id:'filosofia',  label:'Filosofía / Teología',   group:'APRENDIZAJE' },
];

/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const el = (h)=>{ const t=document.createElement('template'); t.innerHTML=h.trim(); return t.content.firstChild; };
const spark = (arr,hl=-1)=> `<div class="spark">${arr.map((v,i)=>`<i class="${i===((hl<0)?arr.length-1:hl)?'hl':''}" style="height:${v}%"></i>`).join('')}</div>`;
const heat = (n=80)=>{ let s=''; for(let i=0;i<n;i++){ const r=Math.random(); const l=r>.85?'l4':r>.65?'l3':r>.4?'l2':r>.2?'l1':''; s+=`<i class="${l}"></i>`; } return `<div class="heat">${s}</div>`; };
const donut = (pct,label)=>{ const r=46,c=2*Math.PI*r,off=c-(pct/100)*c; return `<div class="donut-wrap"><div class="donut"><svg width="120" height="120"><circle class="track" cx="60" cy="60" r="${r}" fill="none" stroke-width="10"/><circle class="val" cx="60" cy="60" r="${r}" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg></div><div class="center"><b>${pct}%</b><small>${label}</small></div></div>`; };

/* ============================================================
   COMPONENT BUILDERS
   ============================================================ */
function head(tag,title,desc,actions){ return `<div class="view-head fade"><div class="view-title"><span class="vt-tag">${tag}</span><h1>${title}</h1><p>${desc}</p></div><div class="view-actions">${actions.join('')}</div></div>`; }
function btn(t,c=''){ return `<button class="btn ${c}">${t}</button>`; }
function cl(label,tag){ return `<div class="card-head"><span class="card-label"><i></i>${label}</span>${tag?`<span class="card-tag">${tag}</span>`:''}</div>`; }
function clr(label,tag){ return `<span class="card-label"><i></i>${label}</span>${tag?`<span class="card-tag">${tag}</span>`:''}`; }
function li(time,title,meta,dot=''){ return `<div class="list-item"><span class="li-time">${time}</span><span class="li-dot ${dot}"></span><div class="li-body"><div class="li-title">${title}</div><div class="li-meta">${meta}</div></div></div>`; }
function chk(t,done,pri){ return `<div class="check ${done?'done':''}"><div class="box"></div><span>${t}</span><span class="pri">${pri}</span></div>`; }
function prog(label,pct){ return `<div class="prog"><div class="prog-top"><span>${label}</span><b>${pct}%</b></div><div class="prog-bar"><i style="width:${pct}%"></i></div></div>`; }
function kpi(label,val,sub,dir,col){ return `<div class="card ${col}">${cl(label,'')}<div class="metric sm">${val}</div><div class="metric-sub"><span class="delta ${dir==='up'?'up':'down'}">${dir==='up'?'▲':'▼'}</span>${sub}</div></div>`; }
function table(cols,rows){ return `<table class="tbl"><thead><tr>${cols.map((c,i)=>`<th class="${i===cols.length-1?'num':''}">${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td class="${i===r.length-1?'num':''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
function art(cat,title,excerpt,meta){ return `<div class="card c-4 art"><div class="art-cat">${cat}</div><div class="art-title">${title}</div><div class="art-excerpt">${excerpt}</div><div class="art-meta">${meta}<span class="art-arrow">→</span></div></div>`; }

/* instrument page builder (Bajo / Piano / Guitarra) */
function instrPage(c){ return `
  ${head('INTÉRPRETE · '+c.up, c.title, c.desc, [btn('Metrónomo'),btn('+ Sesión','accent')])}
  <div class="grid">
    ${kpi('NIVEL',c.level,c.levelSub,'up','c-3')}
    ${kpi('HORAS/SEM',c.hours,'práctica','up','c-3')}
    ${kpi('CANCIONES',c.songs,'repertorio','up','c-3')}
    ${kpi('RACHA',c.streak,'récord','up','c-3')}

    <div class="card c-6 row-2">${cl('TÉCNICA','DOMINIO')}${c.tech.map(t=>prog(t[0],t[1])).join('')}</div>
    <div class="card c-6">${cl('PRÁCTICA · 14 DÍAS','MIN/DÍA')}${spark(c.spark,c.spark.length-1)}<div class="metric-sub" style="margin-top:14px">${c.practiceNote}</div></div>
    <div class="card c-6">${cl('CONSTANCIA','HÁBITO')}<div style="margin:4px 0 14px">${heat(60)}</div><div class="kpi-row"><div class="kpi"><div class="k-val">${c.streak}</div><div class="k-lab">RACHA</div></div><div class="kpi"><div class="k-val">${c.totalH}</div><div class="k-lab">HORAS TOT.</div></div><div class="kpi"><div class="k-val">${c.levelSub}</div><div class="k-lab">EXPERIENCIA</div></div></div></div>

    <div class="card c-8">${cl('REPERTORIO','')}${table(['CANCIÓN','ARTISTA','ESTADO'],c.rep)}</div>
    <div class="card c-4">${cl('OBJETIVOS','')}<div class="list">${c.goals.map(g=>li('',g[0],g[1],g[2])).join('')}</div></div>
  </div>`;
}

/* ============================================================
   PAGE CONTENT
   ============================================================ */
const PAGES = {

  /* ---------------- DASHBOARD ---------------- */
  dashboard:()=>`
  ${head('SISTEMA · 07 JUN 2026','Buenas tardes, Gabriel','Balanced scorecard de tu vida. Todo lo que importa, en un solo plano.',[btn('+ Nota rápida'),btn('Reporte diario','accent')])}
  <div class="grid">
    <div class="card c-3">${cl('CLP / USD','LIVE')}<div class="metric sm">$945,30</div><div class="metric-sub"><span class="delta down">▼ 0,8%</span> hoy</div>${spark([60,58,62,55,50,48,52,46,44,40])}</div>
    <div class="card c-3">${cl('UF','SBIF')}<div class="metric sm">$38.402</div><div class="metric-sub"><span class="delta up">▲ 0,1%</span> hoy</div>${spark([40,42,44,43,46,48,50,52,55,58])}</div>
    <div class="card c-3">${cl('PATRIMONIO','NETO')}<div class="metric sm">$1.84B</div><div class="metric-sub"><span class="delta up">▲ 4,2%</span> mes</div>${spark([30,34,38,36,42,46,50,55,60,68])}</div>
    <div class="card c-3">${cl('CLIMA','PTO VARAS')}<div class="weather"><div class="wx-ico">☁</div><div class="wx-temp">8°</div><div class="wx-meta">Nublado<br/>↑12° ↓4°<br/>Lluvia 60%<br/>Viento 14km/h</div></div></div>

    <div class="card c-6 row-2">${cl('AGENDA · HOY','5 EVENTOS')}<div class="list">
      ${li('08:30','Revisión consejo Corporación Futuro','Sala directorio · Colegio I','a')}
      ${li('11:00','Inspección obra — Edificio Bosquemar','Construcciones','w')}
      ${li('13:30','Almuerzo con arquitecto','Casa matriz','')}
      ${li('16:00','Sesión de mezcla — single nuevo','Estudio','g')}
      ${li('20:00','Lectura: Summa Theologiae','Bloque profundo','')}
    </div></div>

    <div class="card c-6 row-2">${cl('BALANCED SCORECARD','UNIDADES')}
      ${prog('Corporación Futuro',82)}${prog('Centro Deportivo Bosquemar',64)}${prog('Construcciones',47)}${prog('Finanzas Personales',91)}${prog('Inglés (B2)',68)}${prog('Intérprete',55)}
    </div>

    <div class="card c-4">${cl('TAREAS PRIORITARIAS','4/9')}<div class="list">
      ${chk('Firmar contrato proveedor áridos',true,'P1')}${chk('Aprobar nómina colegios',true,'P1')}${chk('Master final track 03',false,'P2')}${chk('Llamar contador',false,'P2')}${chk('Guion video YouTube',false,'P3')}
    </div></div>

    <div class="card c-4">${cl('HÁBITOS · RACHA','21 DÍAS')}<div style="margin:6px 0 14px">${heat(60)}</div>
      <div class="kpi-row"><div class="kpi"><div class="k-val">94%</div><div class="k-lab">CONSTANCIA</div></div><div class="kpi"><div class="k-val">5</div><div class="k-lab">HÁBITOS</div></div><div class="kpi"><div class="k-val">21</div><div class="k-lab">RACHA</div></div></div>
    </div>

    <div class="card c-4">${cl('ENFOQUE','SEMANA')}<div class="donut" style="position:relative">${donut(72,'DEEP WORK')}</div></div>

    <div class="card c-12">${cl('PENSAMIENTO DEL DÍA','FILOSOFÍA')}<div class="quote">“El que tiene un porqué para vivir puede soportar casi cualquier cómo.”<div class="quote-by">— FRIEDRICH NIETZSCHE · GUARDADO EN MENTE</div></div></div>
  </div>`,

  /* ---------------- FINANZAS PERSONALES ---------------- */
  'fin-pers':()=>`
  ${head('UNIDAD · PATRIMONIO','Finanzas Personales','Flujo, patrimonio neto, inversiones y presupuesto bajo control.',[btn('Importar cartola'),btn('+ Movimiento','accent')])}
  <div class="grid">
    ${kpi('PATRIMONIO NETO','$1.84B','4,2% mes','up','c-3')}
    ${kpi('LÍQUIDO','$92,4M','1,1%','up','c-3')}
    ${kpi('GASTO MES','$8,9M','6%','up','c-3')}
    ${kpi('AHORRO','41%','meta 35%','up','c-3')}

    <div class="card c-8"><div class="card-head">${clr('FLUJO · ÚLTIMOS 12 MESES','INGRESO vs GASTO')}</div>${spark([55,60,58,66,70,64,72,75,80,78,85,90])}<div class="metric-sub" style="margin-top:14px"><span class="delta up">▲ 18%</span> ingreso anual · superávit promedio $11,2M / mes</div></div>
    <div class="card c-4 row-2">${cl('ASIGNACIÓN','PORTAFOLIO')}<div class="donut" style="position:relative">${donut(58,'RENTA FIJA')}</div><div class="chips" style="margin-top:18px"><span class="chip on">Renta fija 58%</span><span class="chip on">Acciones 22%</span><span class="chip">Inmob. 14%</span><span class="chip">Cripto 6%</span></div></div>

    <div class="card c-8">${cl('MOVIMIENTOS RECIENTES','')}${table(['FECHA','CONCEPTO','CATEGORÍA','MONTO'],[
      ['07/06','Arriendo local comercial','Ingreso','<span class="pos">+$2.400.000</span>'],
      ['06/06','Mercado / supermercado','Hogar','-$340.500'],
      ['05/06','Dividendo fondo mutuo','Inversión','<span class="pos">+$612.000</span>'],
      ['04/06','Bencina + peajes','Transporte','-$98.200'],
      ['03/06','Cuota crédito hipotecario','Deuda','-$1.180.000'],
    ])}</div>
  </div>
  <div class="sec-title">PRESUPUESTO MENSUAL</div>
  <div class="grid">
    <div class="card c-6">${cl('CATEGORÍAS','JUNIO')}${prog('Hogar',68)}${prog('Transporte',42)}${prog('Educación hijos',80)}${prog('Ocio',55)}${prog('Salud',30)}</div>
    <div class="card c-6">${cl('METAS','2026')}${prog('Fondo de emergencia (6 meses)',88)}${prog('Pie segunda propiedad',54)}${prog('Aporte APV',73)}${prog('Viaje familiar',40)}</div>
  </div>`,

  /* ---------------- CORPORACIÓN FUTURO ---------------- */
  futuro:()=>`
  ${head('NEGOCIO · EDUCACIÓN','Corporación Futuro','Sostenedor de 2 colegios. Matrícula, asistencia, finanzas y SEP.',[btn('Ver colegios'),btn('Reporte mensual','accent')])}
  <div class="grid">
    ${kpi('MATRÍCULA TOTAL','1.482','3,4%','up','c-3')}${kpi('ASISTENCIA','92,1%','meta 90%','up','c-3')}${kpi('SUBVENCIÓN MES','$284,5M','2%','up','c-3')}${kpi('SIMCE PROM.','276','8 pts','up','c-3')}

    <div class="card c-6 row-2">${cl('COLEGIO I · LOS ÁNGELES','892 ALUMNOS')}${prog('Asistencia',93)}${prog('Matrícula vs capacidad',86)}${prog('Ejecución presupuesto SEP',71)}${prog('Convivencia escolar',88)}<div class="kpi-row" style="margin-top:18px"><div class="kpi"><div class="k-val">34</div><div class="k-lab">CURSOS</div></div><div class="kpi"><div class="k-val">68</div><div class="k-lab">DOCENTES</div></div><div class="kpi"><div class="k-val">A</div><div class="k-lab">CAT. DESEMP.</div></div></div></div>
    <div class="card c-6 row-2">${cl('COLEGIO II · CONCEPCIÓN','590 ALUMNOS')}${prog('Asistencia',91)}${prog('Matrícula vs capacidad',79)}${prog('Ejecución presupuesto SEP',64)}${prog('Convivencia escolar',82)}<div class="kpi-row" style="margin-top:18px"><div class="kpi"><div class="k-val">24</div><div class="k-lab">CURSOS</div></div><div class="kpi"><div class="k-val">49</div><div class="k-lab">DOCENTES</div></div><div class="kpi"><div class="k-val">B</div><div class="k-lab">CAT. DESEMP.</div></div></div></div>

    <div class="card c-8">${cl('FINANZAS CONSOLIDADAS','2026')}${table(['ÍTEM','PRESUPUESTO','EJECUTADO','SALDO'],[
      ['Subvención base','$2.840M','$1.190M','<span class="pos">$1.650M</span>'],
      ['Aporte SEP','$680M','$310M','<span class="pos">$370M</span>'],
      ['Remuneraciones','$1.920M','$880M','<span class="neg">$1.040M</span>'],
      ['Infraestructura','$420M','$190M','$230M'],
      ['Materiales y operación','$360M','$170M','$190M'],
    ])}</div>
    <div class="card c-4">${cl('ALERTAS','3')}<div class="list">${li('!','Renovar reconocimiento oficial','Colegio II · vence 30 días','a')}${li('!','Plan de mejoramiento PME','Entrega MINEDUC','w')}${li('✓','Auditoría SEP aprobada','Colegio I','g')}</div></div>
  </div>`,

  /* ---------------- BOSQUEMAR ---------------- */
  bosquemar:()=>`
  ${head('NEGOCIO · DEPORTE','Centro Deportivo Bosquemar','Socios, ocupación de canchas, ingresos y operación del recinto.',[btn('Reservas'),btn('+ Socio','accent')])}
  <div class="grid">
    ${kpi('SOCIOS ACTIVOS','1.146','28 mes','up','c-3')}${kpi('OCUPACIÓN','74%','5%','up','c-3')}${kpi('INGRESO MES','$48,2M','9%','up','c-3')}${kpi('RETENCIÓN','88%','meta 85%','up','c-3')}

    <div class="card c-8">${cl('OCUPACIÓN POR HORA','HOY')}${spark([20,28,35,30,45,60,72,68,55,80,92,88,70,50],10)}<div class="metric-sub" style="margin-top:14px">Peak 19:00–21:00 · 92% ocupación · 6 canchas activas</div></div>
    <div class="card c-4 row-2">${cl('DISCIPLINAS','TOP')}${prog('Pádel',92)}${prog('Tenis',71)}${prog('Fútbol 7',64)}${prog('Gimnasio',58)}${prog('Natación',44)}</div>

    <div class="card c-4">${cl('INGRESOS','DESGLOSE')}<div class="donut" style="position:relative">${donut(46,'MEMBRESÍAS')}</div></div>
    <div class="card c-4">${cl('CANCHAS','ESTADO')}<div class="chips"><span class="chip on">P1</span><span class="chip on">P2</span><span class="chip on">P3</span><span class="chip">P4 mant.</span><span class="chip on">T1</span><span class="chip on">T2</span><span class="chip on">F7</span></div><div class="kpi-row" style="margin-top:20px"><div class="kpi"><div class="k-val">7/8</div><div class="k-lab">OPERATIVAS</div></div><div class="kpi"><div class="k-val">312</div><div class="k-lab">RESERVAS/SEM</div></div></div></div>
    <div class="card c-4">${cl('PRÓXIMAS RESERVAS','HOY')}<div class="list">${li('18:00','Pádel P1 — M. González','2h · pagado','g')}${li('18:30','Tenis T2 — Liga interna','1h','a')}${li('19:00','Fútbol 7 — Empresa SC','1h · pagado','g')}${li('20:00','Pádel P3 — Clase grupal','1h','w')}</div></div>
  </div>`,

  /* ---------------- CONSTRUCCIONES ---------------- */
  construcc:()=>`
  ${head('NEGOCIO · OBRAS','Construcciones','Proyectos en ejecución, avance físico-financiero y presupuestos.',[btn('Gantt'),btn('+ Proyecto','accent')])}
  <div class="grid">
    ${kpi('PROYECTOS ACTIVOS','4','2 en obra','up','c-3')}${kpi('AVANCE PROM.','51%','6% mes','up','c-3')}${kpi('BACKLOG','$3,2B','contratado','up','c-3')}${kpi('MARGEN PROM.','18,4%','meta 17%','up','c-3')}

    <div class="card c-12">${cl('CARTERA DE PROYECTOS','')}${table(['PROYECTO','TIPO','AVANCE FÍSICO','PRESUPUESTO','ESTADO'],[
      ['Edificio Bosquemar','Residencial','78%','$1.420M','<span class="pos">En plazo</span>'],
      ['Pabellón Colegio II','Educacional','54%','$680M','<span class="pos">En plazo</span>'],
      ['Bodega industrial','Industrial','32%','$540M','<span class="neg">Atraso 8d</span>'],
      ['Remodelación gimnasio','Deportivo','40%','$310M','En plazo'],
    ])}</div>

    <div class="card c-6">${cl('AVANCE FÍSICO vs PROGRAMADO','EDIF. BOSQUEMAR')}${prog('Obra gruesa',95)}${prog('Terminaciones',62)}${prog('Instalaciones',71)}${prog('Urbanización',40)}</div>
    <div class="card c-6">${cl('CONTROL DE COSTOS','GLOBAL')}${spark([30,38,42,48,55,60,58,65,70,74,78,82])}<div class="metric-sub" style="margin-top:14px"><span class="delta up">▲</span> Costo real 96% de lo presupuestado · sin desviaciones críticas</div></div>

    <div class="card c-4">${cl('PROVEEDORES','PENDIENTES')}<div class="list">${li('','Hormigón Polpaico','OC #4821 · $42M','w')}${li('','Áridos del Sur','Por firmar','a')}${li('','Fierro y acero','Pagado','g')}</div></div>
    <div class="card c-4">${cl('SEGURIDAD','HSE')}<div class="kpi-row"><div class="kpi"><div class="k-val">142</div><div class="k-lab">DÍAS S/ACC.</div></div><div class="kpi"><div class="k-val">0</div><div class="k-lab">INCIDENTES</div></div><div class="kpi"><div class="k-val">100%</div><div class="k-lab">EPP</div></div></div></div>
    <div class="card c-4">${cl('PERSONAL EN OBRA','HOY')}<div class="metric sm">86</div><div class="metric-sub">trabajadores activos · 4 frentes</div>${spark([50,60,70,65,80,86,78])}</div>
  </div>`,

  /* ---------------- FINANZAS (corp) ---------------- */
  finanzas:()=>`
  ${head('NEGOCIO · CONSOLIDADO','Finanzas','Estados consolidados de todas las unidades de negocio. EBITDA, caja y deuda.',[btn('Exportar'),btn('Cierre mensual','accent')])}
  <div class="grid">
    ${kpi('INGRESOS YTD','$6,84B','11%','up','c-3')}${kpi('EBITDA','$1,52B','22,3% mg','up','c-3')}${kpi('CAJA','$412M','saludable','up','c-3')}${kpi('DEUDA / EBITDA','1,8x','desde 2,3x','up','c-3')}

    <div class="card c-8">${cl('INGRESO POR UNIDAD','YTD 2026')}${spark([70,85,60,40,55,30],-2)}<div class="chips" style="margin-top:16px"><span class="chip on">Corp. Futuro 41%</span><span class="chip on">Construcciones 28%</span><span class="chip on">Bosquemar 14%</span><span class="chip">Inmob. 11%</span><span class="chip">Otros 6%</span></div></div>
    <div class="card c-4 row-2">${cl('SALUD FINANCIERA','SCORE')}<div class="donut" style="position:relative">${donut(84,'GLOBAL')}</div><div class="kpi-row" style="margin-top:16px"><div class="kpi"><div class="k-val">2,4</div><div class="k-lab">LIQUIDEZ</div></div><div class="kpi"><div class="k-val">A-</div><div class="k-lab">RATING INT.</div></div></div></div>

    <div class="card c-8">${cl('ESTADO DE RESULTADOS CONSOLIDADO','')}${table(['CONCEPTO','MES','YTD','VAR. AÑO'],[
      ['Ingresos operacionales','$1.140M','$6.840M','<span class="pos">+11%</span>'],
      ['Costos directos','-$680M','-$4.080M','<span class="neg">+8%</span>'],
      ['Gastos administración','-$190M','-$1.140M','<span class="neg">+4%</span>'],
      ['EBITDA','$270M','$1.520M','<span class="pos">+19%</span>'],
      ['Resultado neto','$148M','$840M','<span class="pos">+22%</span>'],
    ])}</div>
    <div class="card c-4">${cl('VENCIMIENTOS','30 DÍAS')}<div class="list">${li('12/06','IVA + PPM','SII · $84M','a')}${li('20/06','Cuota leasing','Banco · $32M','w')}${li('28/06','Remuneraciones','Consolidado','')}</div></div>
  </div>`,

  /* ---------------- MIX / MASTERING ---------------- */
  mix:()=>`
  ${head('CREATIVO · AUDIO','Mix / Mastering','Gestiona tus proyectos de cliente y haz crecer tu oficio. Sesiones + base de conocimiento.',[btn('Plantillas'),btn('+ Sesión','accent')])}

  <div class="sec-title">GESTIÓN · PROYECTOS</div>
  <div class="grid">
    ${kpi('SESIONES ACTIVAS','6','3 en mezcla','up','c-3')}${kpi('ENTREGAS MES','11','4','up','c-3')}${kpi('LUFS OBJETIVO','-14','streaming','up','c-3')}${kpi('SATISFACCIÓN','4,9★','24 reviews','up','c-3')}

    <div class="card c-8">${cl('NIVEL · MASTER ACTUAL','TRACK 03')}${spark([40,55,62,70,58,75,80,72,85,90,84,78,88,92,86],13)}<div class="metric-sub" style="margin-top:14px">Peak -0,9 dBTP · Integrated -14,1 LUFS · DR 9 · listo para entrega</div></div>
    <div class="card c-4 row-2">${cl('CADENA DE SEÑAL','MASTER BUS')}<div class="list">${li('1','EQ corrección','Pultec emulación','g')}${li('2','Compresión bus','SSL · 2dB GR','g')}${li('3','Saturación','Tape · sutil','g')}${li('4','EQ tonal','Curva sonrisa','g')}${li('5','Limiter','True peak -1dB','a')}</div></div>

    <div class="card c-8">${cl('COLA DE TRABAJO','CLIENTES')}${table(['PROYECTO','CLIENTE','TIPO','ESTADO','ENTREGA'],[
      ['Single "Hikari"','Artista indie','Mastering','<span class="pos">Listo</span>','08/06'],
      ['EP 4 tracks','Sello local','Mix + Master','En mezcla','15/06'],
      ['Podcast ep.12','Productora','Edición + Master','Revisión','10/06'],
      ['Demo banda','Banda rock','Mix','Pendiente','22/06'],
    ])}</div>
  </div>

  <div class="sec-title">APRENDER · BASE DE CONOCIMIENTO</div>
  <div class="grid">
    <div class="card c-8">${cl('RUTA DE APRENDIZAJE','MASTERING PRO')}${prog('Fundamentos de loudness',88)}${prog('Cadena de mastering',72)}${prog('Mezcla en mono & balance tonal',64)}${prog('Saturación & color analógico',45)}${prog('Mastering para vinilo',20)}</div>
    <div class="card c-4">${cl('SIGUIENTE LECCIÓN','HOY')}<div class="list">${li('','Compresión multibanda','Técnica · 14 min','a')}${li('','Referencias A/B','Workflow · 8 min','w')}${li('','Stereo imaging','Teoría · 11 min','')}</div></div>

    ${art('FUNDAMENTOS','La cadena de mastering, paso a paso','El orden óptimo de EQ, compresión, saturación y limiting — y por qué cada eslabón importa para un master transparente.','12 min · GUÍA')}
    ${art('LOUDNESS','-14 LUFS: la verdad sobre el loudness','Cómo normalizan Spotify, Apple Music y YouTube, y cómo entregar sin perder pegada ni dinámica.','8 min · ARTÍCULO')}
    ${art('MEZCLA','Balance tonal: la curva de los grandes','Referencias, gestión de graves y por qué revisar siempre en mono cambia tus decisiones.','10 min · APUNTES')}
    ${art('TÉCNICA','Compresión paralela en el bus','Cuándo y cómo aplicarla para ganar pegada sin aplastar la dinámica natural.','6 min · TUTORIAL')}
    ${art('FLUJO','Plantilla de sesión que ahorra horas','Routing, buses y marcadores listos para empezar a mezclar al instante.','7 min · WORKFLOW')}
    ${art('OÍDO','Entrenamiento de oído para ingenieros','Ejercicios para reconocer frecuencias y afinar tus decisiones de EQ con el tiempo.','9 min · PRÁCTICA')}
  </div>`,

  /* ---------------- CREACIÓN MUSICAL ---------------- */
  musica:()=>`
  ${head('CREATIVO · COMPOSICIÓN','Creación Musical','Tu pipeline creativo: ideas, demos, producciones y lanzamientos.',[btn('Banco de ideas'),btn('+ Idea','accent')])}
  <div class="grid">
    ${kpi('IDEAS / LOOPS','37','banco','up','c-3')}${kpi('EN PRODUCCIÓN','5','tracks','up','c-3')}${kpi('LANZADOS 2026','3','singles','up','c-3')}${kpi('OYENTES/MES','12,4K','18%','up','c-3')}

    <div class="card c-6 row-2">${cl('PIPELINE CREATIVO','KANBAN')}<div class="sec-title" style="margin:4px 0 10px">IDEA</div><div class="chips"><span class="chip on">Loop synth Dm</span><span class="chip on">Beat 90bpm</span><span class="chip">Melodía piano</span></div><div class="sec-title" style="margin:16px 0 10px">DEMO</div><div class="chips"><span class="chip on">"Niebla"</span><span class="chip on">"Reflejo"</span></div><div class="sec-title" style="margin:16px 0 10px">PRODUCCIÓN</div><div class="chips"><span class="chip on">"Hikari"</span></div><div class="sec-title" style="margin:16px 0 10px">MASTER / LISTO</div><div class="chips"><span class="chip on">"Origen"</span></div></div>
    <div class="card c-6">${cl('PROGRESO · "HIKARI"','SINGLE')}${prog('Composición',100)}${prog('Arreglos',90)}${prog('Grabación',75)}${prog('Mezcla',55)}${prog('Master',20)}</div>
    <div class="card c-6">${cl('INSPIRACIÓN','SESIÓN')}<div class="kpi-row"><div class="kpi"><div class="k-val">128</div><div class="k-lab">BPM</div></div><div class="kpi"><div class="k-val">Dm</div><div class="k-lab">TONALIDAD</div></div><div class="kpi"><div class="k-val">4/4</div><div class="k-lab">COMPÁS</div></div></div><div class="metric-sub" style="margin-top:16px">Referencias: ambient · neoclásico · electrónica melódica</div></div>

    <div class="card c-12">${cl('LANZAMIENTOS','2026')}${table(['TRACK','FECHA','PLATAFORMAS','REPRODUCCIONES'],[
      ['Origen','12/02','Spotify · Apple · YT','<span class="pos">48.200</span>'],
      ['Reflejo','28/03','Spotify · Apple','21.500'],
      ['Niebla','15/05','Todas','12.800'],
      ['Hikari','— prog.','—','—'],
    ])}</div>
  </div>

  <div class="sec-title">APRENDER · COMPOSICIÓN & PRODUCCIÓN</div>
  <div class="grid">
    <div class="card c-8">${cl('RUTA DE APRENDIZAJE','PRODUCTOR')}${prog('Teoría musical aplicada',76)}${prog('Arreglos & orquestación',58)}${prog('Sound design (síntesis)',64)}${prog('Estructura de canción',70)}${prog('Sampling & resampling',40)}</div>
    <div class="card c-4">${cl('SIGUIENTE LECCIÓN','HOY')}<div class="list">${li('','Progresiones que emocionan','Armonía · 12 min','a')}${li('','Diseñar un bajo analógico','Síntesis · 15 min','w')}${li('','Automatización con intención','Producción · 9 min','')}</div></div>
    ${art('ARMONÍA','Progresiones que conmueven y por qué','Cómo el préstamo modal y las dominantes secundarias crean tensión y emoción en tus tracks.','11 min · GUÍA')}
    ${art('SÍNTESIS','Sound design: del oscilador al patch','Osciladores, filtros y envolventes para crear tus propios sonidos desde cero.','14 min · TUTORIAL')}
    ${art('ARREGLO','La regla del contraste en el arreglo','Mantén el interés sección a sección con energía, densidad y registro.','8 min · APUNTES')}
    ${art('RITMO','Groove: el secreto está en el timing','Swing, microtiming y velocity para que tus beats respiren.','7 min · ARTÍCULO')}
    ${art('MÉTODO','Cómo terminar canciones y no abandonarlas','Un sistema simple para llevar ideas de loop a track terminado.','9 min · MÉTODO')}
    ${art('MEZCLA','Pre-mezcla: decisiones que facilitan todo','Ganancia, paneo y referencia desde el primer día de producción.','6 min · WORKFLOW')}
  </div>`,

  /* ---------------- CONTENIDO ---------------- */
  contenido:()=>`
  ${head('CREATIVO · MEDIA','Creación de Contenido','Calendario editorial, performance por plataforma y pipeline de producción.',[btn('Calendario'),btn('+ Pieza','accent')])}
  <div class="grid">
    ${kpi('SEGUIDORES','86,2K','2,1K','up','c-3')}${kpi('PUBLICADO MES','18','piezas','up','c-3')}${kpi('ALCANCE','420K','24%','up','c-3')}${kpi('ENGAGEMENT','6,8%','0,9pp','up','c-3')}

    <div class="card c-8">${cl('ALCANCE · 30 DÍAS','TODAS LAS PLATAFORMAS')}${spark([40,52,48,60,72,68,80,75,88,92,85,96,90,100],13)}<div class="metric-sub" style="margin-top:14px">Mejor día: 96K · video "Estrategia de vida" viralizó</div></div>
    <div class="card c-4 row-2">${cl('POR PLATAFORMA','SEGUIDORES')}${prog('Instagram',74)}${prog('YouTube',58)}${prog('TikTok',81)}${prog('X / Twitter',32)}${prog('LinkedIn',45)}</div>

    <div class="card c-4">${cl('PIPELINE','ESTADO')}<div class="list">${li('1','Guion video filosofía','Idea','a')}${li('2','Reel estudio musical','Grabado','w')}${li('3','Carrusel finanzas','Edición','w')}${li('4','Short Bosquemar','Listo','g')}</div></div>
    <div class="card c-8">${cl('CALENDARIO EDITORIAL','PRÓX. 7 DÍAS')}${table(['DÍA','PIEZA','FORMATO','PLATAFORMA'],[
      ['Lun','Detrás del estudio','Reel','Instagram'],
      ['Mié','¿Cómo pienso una estrategia?','Video','YouTube'],
      ['Vie','3 hábitos financieros','Carrusel','Instagram'],
      ['Sáb','Día en Bosquemar','Short','TikTok'],
    ])}</div>
  </div>`,

  /* ---------------- APRENDER INGLÉS ---------------- */
  ingles:()=>`
  ${head('APRENDIZAJE · IDIOMA','Aprender Inglés','Camino a la fluidez: nivel, vocabulario, práctica diaria y plan de estudio.',[btn('Flashcards'),btn('Práctica diaria','accent')])}
  <div class="grid">
    ${kpi('NIVEL · CEFR','B2','rumbo a C1','up','c-3')}${kpi('RACHA','34d','récord','up','c-3')}${kpi('VOCABULARIO','2.480','palabras','up','c-3')}${kpi('HORAS/SEM','6,5','1,2','up','c-3')}

    <div class="card c-6 row-2">${cl('HABILIDADES','CEFR')}${prog('Listening',78)}${prog('Speaking',62)}${prog('Reading',86)}${prog('Writing',70)}${prog('Grammar',75)}${prog('Vocabulary',82)}</div>
    <div class="card c-6">${cl('PRÁCTICA · 30 DÍAS','MIN/DÍA')}${spark([30,42,38,50,46,60,55,48,65,70,62,75,68,80,72,85],15)}<div class="metric-sub" style="margin-top:14px">Promedio 56 min/día · mejor racha del trimestre</div></div>
    <div class="card c-6">${cl('CONSTANCIA','HÁBITO')}<div style="margin:4px 0 14px">${heat(60)}</div><div class="kpi-row"><div class="kpi"><div class="k-val">34</div><div class="k-lab">RACHA</div></div><div class="kpi"><div class="k-val">96%</div><div class="k-lab">CONSTANCIA</div></div><div class="kpi"><div class="k-val">128</div><div class="k-lab">LECCIONES</div></div></div></div>

    <div class="card c-8">${cl('VOCABULARIO RECIENTE','')}${table(['PALABRA','SIGNIFICADO','EJEMPLO','DOMINIO'],[
      ['Leverage','Apalancar / influencia','"Leverage your skills"','<span class="pos">Alto</span>'],
      ['Thorough','Minucioso','"A thorough review"','Medio'],
      ['Endeavor','Esfuerzo / empresa','"A new endeavor"','Medio'],
      ['Resilient','Resiliente','"A resilient system"','<span class="pos">Alto</span>'],
      ['Compelling','Convincente','"A compelling story"','Bajo'],
    ])}</div>
    <div class="card c-4">${cl('HOY','PLAN')}<div class="list">${li('','Lección 129 — Conditionals','Gramática','a')}${li('','15 flashcards','Vocabulario','w')}${li('','Shadowing 10 min','Speaking','w')}${li('','Podcast en inglés','Listening','')}</div></div>

    <div class="card c-12">${cl('PLAN DE ESTUDIO','RUMBO A C1')}${prog('Módulo: Advanced Grammar',64)}${prog('Módulo: Business English',48)}${prog('Módulo: Pronunciation',72)}${prog('Módulo: Idioms & Phrasal Verbs',40)}</div>
  </div>

  <div class="sec-title">APRENDER · RECURSOS & LECTURA</div>
  <div class="grid">
    ${art('GRAMÁTICA','Conditionals sin dolor: los 4 tipos','Zero, first, second y third conditional con ejemplos reales del día a día.','9 min · GUÍA')}
    ${art('VOCABULARIO','Phrasal verbs que sí se usan','Los 30 phrasal verbs más frecuentes en conversación y trabajo.','8 min · LISTA')}
    ${art('BUSINESS','Inglés para reuniones y correos','Frases listas para sonar profesional y claro en contextos de negocio.','10 min · ARTÍCULO')}
    ${art('PRONUNCIACIÓN','Los sonidos que el español no tiene','TH, schwa y vocales largas/cortas: cómo entrenarlos.','7 min · TUTORIAL')}
    ${art('LISTENING','Entender inglés a velocidad real','Conexiones, reducciones y shadowing para destrabar el oído.','9 min · MÉTODO')}
    ${art('HÁBITO','30 minutos al día que sí funcionan','Una rutina simple y sostenible para avanzar de B2 a C1.','6 min · APUNTES')}
  </div>`,

  /* ---------------- INTÉRPRETE (overview) ---------------- */
  interprete:()=>`
  ${head('APRENDIZAJE · MÚSICA','Intérprete','Tu faceta de músico ejecutante. Bajo, piano y guitarra: técnica, repertorio y práctica.',[btn('Metrónomo'),btn('+ Sesión','accent')])}
  <div class="grid">
    ${kpi('HORAS TOTAL','570','acumuladas','up','c-3')}${kpi('INSTRUMENTOS','3','activos','up','c-3')}${kpi('REPERTORIO','28','piezas','up','c-3')}${kpi('RACHA GLOBAL','15d','récord','up','c-3')}

    <div class="card c-4">${cl('BAJO','4 AÑOS')}${prog('Dominio general',68)}<div class="metric-sub">Foco: slap & walking bass</div><div class="chips" style="margin-top:14px"><span class="chip on">9 canciones</span><span class="chip">5,0 h/sem</span></div></div>
    <div class="card c-4">${cl('PIANO','3 AÑOS')}${prog('Dominio general',60)}<div class="metric-sub">Foco: voicings de jazz</div><div class="chips" style="margin-top:14px"><span class="chip on">7 canciones</span><span class="chip">6,0 h/sem</span></div></div>
    <div class="card c-4">${cl('GUITARRA','5 AÑOS')}${prog('Dominio general',72)}<div class="metric-sub">Foco: fingerpicking & solos</div><div class="chips" style="margin-top:14px"><span class="chip on">12 canciones</span><span class="chip">4,5 h/sem</span></div></div>

    <div class="card c-4">${cl('DISTRIBUCIÓN','PRÁCTICA')}<div class="donut" style="position:relative">${donut(40,'GUITARRA')}</div><div class="chips" style="margin-top:16px"><span class="chip on">Guitarra 40%</span><span class="chip on">Piano 34%</span><span class="chip">Bajo 26%</span></div></div>
    <div class="card c-8">${cl('REPERTORIO EN CURSO','TODOS')}${table(['PIEZA','INSTRUMENTO','ESTADO'],[
      ['Teen Town','Bajo','Estudio'],
      ['Clair de Lune','Piano','En progreso'],
      ['Hotel California (solo)','Guitarra','Por aprender'],
      ['Autumn Leaves','Piano','Estudio'],
      ['Hysteria','Bajo','En progreso'],
    ])}</div>
  </div>

  <div class="sec-title">APRENDER · MUSICALIDAD</div>
  <div class="grid">
    <div class="card c-8">${cl('RUTA DE APRENDIZAJE','MÚSICO INTEGRAL')}${prog('Teoría musical',72)}${prog('Lectura & ritmo',60)}${prog('Entrenamiento auditivo',54)}${prog('Improvisación',48)}${prog('Armonía funcional',66)}</div>
    <div class="card c-4">${cl('SIGUIENTE LECCIÓN','HOY')}<div class="list">${li('','Círculo de quintas en la práctica','Teoría · 10 min','a')}${li('','Subdivisión rítmica','Ritmo · 8 min','w')}${li('','Reconocer intervalos','Oído · 12 min','')}</div></div>
    ${art('TEORÍA','El círculo de quintas para tocar','Deja de memorizar: entiende tonalidades, relativas y modulación de un vistazo.','10 min · GUÍA')}
    ${art('OÍDO','Entrenamiento auditivo para músicos','Intervalos, acordes y progresiones: cómo desarrollar oído relativo.','12 min · PRÁCTICA')}
    ${art('RITMO','Subdivisión: la base de todo groove','Internaliza corcheas, tresillos y síncopas con el metrónomo.','8 min · TUTORIAL')}
    ${art('IMPRO','Primeros pasos en la improvisación','Escalas, motivos y cómo construir frases con sentido.','9 min · ARTÍCULO')}
    ${art('MÉTODO','Practicar mejor, no más horas','Práctica deliberada: bloques, tempo lento y repetición consciente.','7 min · MÉTODO')}
    ${art('ARMONÍA','Funciones armónicas: tónica, subdom. y dom.','Por qué los acordes "quieren" moverse y cómo usarlo al tocar.','11 min · APUNTES')}
  </div>`,

  /* ---------------- INSTRUMENTOS ---------------- */
  bajo:()=>instrPage({ up:'BAJO', title:'Bajo', desc:'Walking bass, slap, grooves y repertorio. Tu instrumento de groove.',
    level:'Inter.', levelSub:'4 años', hours:'5,0', songs:'9', streak:'12d', totalH:'180',
    tech:[['Walking bass',72],['Slap & pop',55],['Escalas mayores/menores',80],['Grooves & pocket',76],['Lectura',48],['Improvisación',60]],
    spark:[30,45,40,60,55,70,65,80,72,85,60,90,78,88],
    practiceNote:'Foco semanal: slap y walking bass sobre ii–V–I',
    rep:[['Come Together','The Beatles','<span class="pos">Dominada</span>'],['Another One Bites the Dust','Queen','<span class="pos">Dominada</span>'],['Hysteria','Muse','En progreso'],['Teen Town','Jaco Pastorius','Estudio'],['Good Times','Chic','Por aprender']],
    goals:[['Tocar Teen Town a tempo','meta: 30 días','a'],['Internalizar modo dórico','escalas','w'],['Grabar línea para single propio','creación','']] }),

  piano:()=>instrPage({ up:'PIANO', title:'Piano', desc:'Voicings, lectura, improvisación y repertorio clásico. Tu instrumento armónico.',
    level:'Inter.', levelSub:'3 años', hours:'6,0', songs:'7', streak:'9d', totalH:'150',
    tech:[['Escalas & arpegios',74],['Acordes & voicings',68],['Lectura partitura',58],['Independencia de manos',64],['Improvisación jazz',45],['Repertorio clásico',52]],
    spark:[40,50,45,55,65,60,72,68,80,75,85,70,82,90],
    practiceNote:'Foco semanal: voicings de jazz y lectura a primera vista',
    rep:[['Clair de Lune','Debussy','En progreso'],['Gymnopédie No.1','Satie','<span class="pos">Dominada</span>'],['River Flows in You','Yiruma','<span class="pos">Dominada</span>'],['Autumn Leaves','Jazz Standard','Estudio'],['Nocturne Op.9','Chopin','Por aprender']],
    goals:[['Improvisar sobre blues en F','jazz','a'],['Lectura a primera vista nivel 4','meta','w'],['Componer progresión para track','creación','']] }),

  guitarra:()=>instrPage({ up:'GUITARRA', title:'Guitarra', desc:'Acordes, fingerpicking, escalas y solos. Tu instrumento más versátil.',
    level:'Inter.', levelSub:'5 años', hours:'4,5', songs:'12', streak:'15d', totalH:'240',
    tech:[['Acordes abiertos & cejilla',86],['Escalas pentatónicas',78],['Fingerpicking',64],['Solos & bending',58],['Ritmos & strumming',82],['Teoría aplicada',60]],
    spark:[50,55,60,52,68,72,65,78,74,82,70,88,80,85],
    practiceNote:'Foco semanal: fingerpicking Travis y solos pentatónicos',
    rep:[['Wonderwall','Oasis','<span class="pos">Dominada</span>'],['Tears in Heaven','Eric Clapton','En progreso'],['Stairway to Heaven','Led Zeppelin','Estudio'],['Blackbird','The Beatles','En progreso'],['Hotel California (solo)','Eagles','Por aprender']],
    goals:[['Solo de Hotel California','meta: 45 días','a'],['Dominar fingerpicking Travis','técnica','w'],['Grabar guitarra para contenido','creación','']] }),

  /* ---------------- FILOSOFÍA / TEOLOGÍA ---------------- */
  filosofia:()=>`
  ${head('MENTE · CONOCIMIENTO','Filosofía / Teología','Tu biblioteca viva: lecturas, notas, citas y mapas de ideas. El cerebro de Ryuzaki.',[btn('Notas (Zettelkasten)'),btn('+ Cita','accent')])}
  <div class="grid">
    ${kpi('LIBROS 2026','14','leídos','up','c-3')}${kpi('NOTAS','312','vinculadas','up','c-3')}${kpi('RACHA LECTURA','21d','récord','up','c-3')}${kpi('HORAS/SEM','9,5','deep read','up','c-3')}

    <div class="card c-12">${cl('REFLEXIÓN ACTUAL','GUARDADO EN MENTE')}<div class="quote">“La fe y la razón son como las dos alas con las cuales el espíritu humano se eleva hacia la contemplación de la verdad.”<div class="quote-by">— JUAN PABLO II · FIDES ET RATIO</div></div></div>

    <div class="card c-6 row-2">${cl('LEYENDO AHORA','BIBLIOTECA')}<div class="list">${li('','Summa Theologiae','Tomás de Aquino · 64%','a')}${li('','El ser y la nada','Sartre · 30%','w')}${li('','Confesiones','San Agustín · pausado','')}${li('','Meditaciones','Marco Aurelio · 88%','g')}</div><div class="sec-title" style="margin-top:22px">PRÓXIMOS</div><div class="chips"><span class="chip">Crítica de la razón pura</span><span class="chip">Ortodoxia · Chesterton</span><span class="chip">Ética · Spinoza</span></div></div>
    <div class="card c-6 row-2">${cl('MAPA DE TEMAS','CONEXIONES')}<div style="margin:6px 0 16px">${heat(80)}</div><div class="chips"><span class="chip on">Metafísica</span><span class="chip on">Ética</span><span class="chip on">Teología natural</span><span class="chip">Existencialismo</span><span class="chip">Estoicismo</span><span class="chip on">Epistemología</span><span class="chip">Patrística</span><span class="chip">Escolástica</span></div><div class="kpi-row" style="margin-top:22px"><div class="kpi"><div class="k-val">312</div><div class="k-lab">NOTAS</div></div><div class="kpi"><div class="k-val">847</div><div class="k-lab">ENLACES</div></div><div class="kpi"><div class="k-val">28</div><div class="k-lab">TEMAS</div></div></div></div>

    <div class="card c-12">${cl('CITAS DESTACADAS','COLECCIÓN')}${table(['CITA','AUTOR','OBRA','TEMA'],[
      ['"Pienso, luego existo"','Descartes','Discurso del método','Epistemología'],
      ['"El hombre está condenado a ser libre"','Sartre','El existencialismo es un humanismo','Existencialismo'],
      ['"Nuestro corazón está inquieto hasta que descanse en Ti"','San Agustín','Confesiones','Teología'],
      ['"Lo que no me mata me fortalece"','Nietzsche','Crepúsculo de los ídolos','Ética'],
    ])}</div>
  </div>`,
};

/* ============================================================
   NAV + ROUTING
   ============================================================ */
function findNav(id){ for(const n of NAV){ if(n.id===id) return n; if(n.children) for(const c of n.children) if(c.id===id) return c; } return null; }

function buildNav(){
  const nav = $('#nav'); let lastGroup=''; let ix=0;
  NAV.forEach((n)=>{
    if(n.group!==lastGroup){ nav.appendChild(el(`<div class="nav-sep">${n.group}</div>`)); lastGroup=n.group; }
    ix++;
    const hasKids = n.children && n.children.length;
    const item = el(`<div class="nav-item ${hasKids?'has-kids':''}" data-nav="${n.id}"><span class="ni-ix">${String(ix).padStart(2,'0')}</span><span class="ni-label">${n.label}</span>${hasKids?'<span class="ni-caret">▸</span>':''}</div>`);
    nav.appendChild(item);
    let wrap=null;
    if(hasKids){
      wrap = el(`<div class="nav-children open"></div>`);
      n.children.forEach(c=>{
        const ci = el(`<div class="nav-item child" data-nav="${c.id}"><span class="ni-dash">—</span><span class="ni-label">${c.label}</span></div>`);
        ci.addEventListener('click',e=>{ e.stopPropagation(); go(c.id); });
        wrap.appendChild(ci);
      });
      nav.appendChild(wrap);
      item.classList.add('open');
    }
    item.addEventListener('click',()=>{ go(n.id); if(hasKids && wrap){ item.classList.toggle('open'); wrap.classList.toggle('open'); } });
  });
}

function go(id){
  const page = PAGES[id]; if(!page) return;
  const meta = findNav(id);
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.nav===id));
  $('#crumb-section').textContent = (meta?.label||id).toUpperCase();
  const view = $('#view'); view.innerHTML = page(); view.classList.remove('fade'); void view.offsetWidth; view.classList.add('fade'); view.scrollTop = 0;
}

/* ---------- theme ---------- */
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  try{ localStorage.setItem('ryu-theme',t); }catch(e){}
  const b=$('#theme-toggle'); if(b) b.textContent = t==='dark' ? '☀' : '☾';
}

/* ---------- mobile menu ---------- */
$('#menu-toggle').addEventListener('click',()=> $('.sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{ if(window.innerWidth<=820 && !e.target.closest('.sidebar') && !e.target.closest('#menu-toggle')) $('.sidebar').classList.remove('open'); });

/* ============================================================
   LIVE BITS
   ============================================================ */
function clock(){
  const now = new Date();
  const days=['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
  const months=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  $('#ro-clock').textContent = now.toLocaleTimeString('es-CL',{hour12:false});
  $('#ro-date').textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
}
let uptimeStart = Date.now();
function uptime(){
  const s = Math.floor((Date.now()-uptimeStart)/1000);
  const h=String(Math.floor(s/3600)).padStart(2,'0'), m=String(Math.floor(s%3600/60)).padStart(2,'0'), ss=String(s%60).padStart(2,'0');
  $('#sys-uptime').textContent = `${h}:${m}:${ss}`;
}
function ticker(){
  const items = [
    ['CLP/USD','$945,30','dn','-0,8%'],['UF','$38.402','up','+0,1%'],['IPSA','6.842','up','+1,2%'],
    ['BTC','$68.420','up','+2,4%'],['COBRE','$4,28/lb','dn','-0,3%'],['EBITDA YTD','$1,52B','up','+19%'],
    ['MATRÍCULA','1.482','up','+3,4%'],['SOCIOS','1.146','up','+28'],['OBRAS','4 activas','',''],
    ['INGLÉS','B2','up',''],['OYENTES','12,4K','up','+18%'],['RACHA','34 días','up',''],
  ];
  const html = items.map(([l,v,d,c])=>`<span>${l} <b>${v}</b> ${c?`<span class="${d}">${c}</span>`:''}</span>`).join('');
  $('#ticker').innerHTML = html+html;
}

/* ============================================================
   BOOT
   ============================================================ */
function typeWord(){
  const t=$('#boot-type'); if(!t) return; const w='RYUZAKI'; let i=0;
  const iv=setInterval(()=>{ t.textContent=w.slice(0,++i); if(i>=w.length) clearInterval(iv); },115);
}
function boot(){
  const fill = $('#boot-fill'), status=$('#boot-status');
  const steps = ['INICIANDO SISTEMA…','CARGANDO MÓDULOS…','SINCRONIZANDO DATOS…','RYUZAKI ONLINE'];
  typeWord();
  let p=0, si=0;
  const t = setInterval(()=>{
    p += Math.random()*18+8; if(p>100)p=100;
    fill.style.width = p+'%';
    const ns = Math.min(steps.length-1, Math.floor(p/26));
    if(ns!==si){ si=ns; status.textContent=steps[si]; }
    if(p>=100){ clearInterval(t); setTimeout(()=>$('#boot').classList.add('done'),450); }
  },240);
}

/* ============================================================
   INIT
   ============================================================ */
buildNav();
go('dashboard');
document.querySelector('.logo').addEventListener('click',()=>go('dashboard'));
setTheme(document.documentElement.getAttribute('data-theme')||'dark');
$('#theme-toggle').addEventListener('click',()=> setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
boot();
clock(); setInterval(clock,1000);
uptime(); setInterval(uptime,1000);
ticker();
