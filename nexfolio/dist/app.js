import { portfolio } from './content.js';

const $ = selector => document.querySelector(selector);
const safeUrl = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if(className) el.className = className; return el; };
document.querySelectorAll('[data-name]').forEach(el => el.textContent = portfolio.name);
document.title = `${portfolio.name} — Developer portfolio`;
$('meta[property="og:title"]').content = document.title;
$('#role').textContent = portfolio.role.toLowerCase();
$('#about-copy').textContent = portfolio.about;
$('#year').textContent = new Date().getFullYear();
$('#availability').textContent = portfolio.available ? 'Open to new possibilities' : 'Focused on current projects';
for (const [label, value] of [['GitHub', portfolio.github], ['LinkedIn', portfolio.linkedin]]) {
  const href = safeUrl(value);
  if (!href) continue;
  const a = text('a', `${label} ↗`); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; $('#socials').append(a);
}
const drawings = {
  signal: '<div class="mock-window"><div class="mock-title">↗ signal <i>MARKET INTELLIGENCE</i></div><div class="mini-value">24,860.42 <small>↗ 8.24%</small></div><svg viewBox="0 0 300 80" aria-hidden="true"><path d="M0 73 13 66 25 68 38 51 51 58 65 38 78 45 90 34 102 40 115 24 129 28 143 38 155 17 168 21 180 8 193 19 205 13 219 22 232 9 245 16 259 5 273 13 287 2 300 7" fill="none" stroke="#b9ef8c" stroke-width="2"/></svg><div class="mock-bottom"><span>INTELLIGENCE, IN FOCUS.</span><span>● CONNECTED</span></div></div>',
  orbit: '<div class="orbit-board"><strong>◎ orbit</strong><p>A little more focus. A little less noise.</p><div class="orbit-cols"><div>TO EXPLORE<span class="orbit-task">A fresh perspective</span></div><div>IN PROGRESS<span class="orbit-task">Make space for ideas</span></div><div>MADE REAL<span class="orbit-task">The finishing touches</span></div></div></div>',
  flow: '<div class="flow-grid"></div><div class="flow-nodes"><div class="flow-node"><b>◫</b>Input</div><span class="flow-connector"></span><div class="flow-node center"><b>✳</b>Intelligence</div><span class="flow-connector"></span><div class="flow-node"><b>↗</b>Output</div></div><span class="flow-label">LESS FRICTION. MORE FLOW.</span>'
};
const dialog = $('#project-dialog');
function openProject(project) {
  $('#dialog-type').textContent = `${project.year} / ${project.type}`;
  $('#dialog-title').textContent = project.name;
  $('#dialog-detail').textContent = project.detail;
  $('#dialog-tags').replaceChildren(...project.tags.map(tag => text('span', tag)));
  const href = safeUrl(project.url);
  $('#dialog-link').hidden = !href;
  if (href) { $('#dialog-link').href = href; $('#dialog-link').target = '_blank'; $('#dialog-link').rel = 'noopener noreferrer'; }
  dialog.showModal();
}
portfolio.projects.forEach(project => {
  const article = document.createElement('article'); article.className = 'project'; article.dataset.category = project.category;
  const button = document.createElement('button'); button.className = 'project-open'; button.setAttribute('aria-label', `Explore ${project.name} project`);
  const art = document.createElement('div'); art.className = `project-art art-${project.art}`; art.setAttribute('aria-hidden','true'); art.innerHTML = drawings[project.art] || drawings.signal;
  const meta = document.createElement('div'); meta.className = 'project-meta'; meta.append(text('h3',project.name),text('span','↗','arrow'));
  const type = document.createElement('div'); type.className = 'project-type'; type.append(text('span',project.type),text('span',project.year));
  button.append(art, meta, text('p',project.description),type); article.append(button); $('#projects').append(article);
  button.addEventListener('click', () => openProject(project));
});
$('.filters [data-filter="all"] span').textContent = String(portfolio.projects.length).padStart(2,'0');
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
  document.querySelectorAll('.project').forEach(el => el.hidden = button.dataset.filter !== 'all' && el.dataset.category !== button.dataset.filter);
}));
$('.dialog-close').addEventListener('click', () => dialog.close());
$('.dialog-back').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
const menu = $('.menu-toggle');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); $('#mobile-nav').hidden = !open; });
$('#mobile-nav').querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation'); $('#mobile-nav').hidden = true; }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { menu.setAttribute('aria-expanded','false'); $('#mobile-nav').hidden = true; } });
$('#contact-button').addEventListener('click', () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email)) { $('#contact-status').textContent = 'Contact details are coming soon. Please check back shortly.'; return; }
  window.location.href = `mailto:${encodeURIComponent(portfolio.email)}?subject=${encodeURIComponent('Let’s build something together')}`;
  $('#contact-status').textContent = `You can reach me at ${portfolio.email}.`;
});
const periods = {
  '1W': { value: '23,490', decimal: '.18', gain: '+2.57%', label: 'this week', points: [110,107,113,95,98,87,89,72,83,74,65,80,69,52,58,42,48,29,36,24,31,17,22,12] },
  '1M': { value: '24,860', decimal: '.42', gain: '+8.24%', label: 'this month', points: [129,120,125,103,110,104,116,90,96,85,101,92,73,78,64,75,69,48,58,40,47,29,39,27,42,22,31,12,19,6] },
  '1Y': { value: '31,205', decimal: '.67', gain: '+31.76%', label: 'this year', points: [138,133,140,118,126,121,104,115,89,98,84,92,68,75,78,53,62,39,50,33,45,24,28,11,20,4] }
};
function setPeriod(period) {
  const data = periods[period];
  const path = data.points.map((y,i) => `${i ? 'L' : 'M'}${i * 500/(data.points.length-1)} ${y}`).join(' ');
  $('#chart-line').setAttribute('d',path); $('#chart-area').setAttribute('d',`${path} L500 160 L0 160 Z`);
  $('#chart-value').replaceChildren(document.createTextNode(data.value),text('span',data.decimal));
  $('#chart-gain').replaceChildren(document.createTextNode(`↗ ${data.gain} `),text('span',data.label));
  const axis = period === '1W' ? ['MON','TUE','WED','THU','FRI'] : period === '1Y' ? ['JAN','MAR','JUN','SEP','DEC'] : ['01','07','14','21','28'];
  $('.chart-axis').replaceChildren(...axis.map(value => text('span',value)));
  document.querySelectorAll('[data-period]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.period === period)));
}
document.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => setPeriod(button.dataset.period)));
setPeriod('1M');
