async function loadSharedComponents() {
  const components = [['navbar', '/assets/components/navbar.html'], ['footer', '/assets/components/footer.html']];
  await Promise.all(components.map(async ([id, file]) => {
    const target = document.getElementById(id);
    if (!target || target.dataset.loaded === 'true') return;
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      target.innerHTML = await response.text();
      target.dataset.loaded = 'true';
    } catch (error) {
      console.warn(`Le composant ${file} n’a pas pu être chargé.`, error);
    }
  }));
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelector(`[data-nav="${page}"]`)?.classList.add('active');
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSharedComponents, { once: true });
} else {
  loadSharedComponents();
}
