import fs from 'node:fs';

const site = 'https://carribusiness.com';
const pages = {
  'index.html': ['Carri Business | Entreprise multisectorielle en RDC', 'Carri Business est une entreprise congolaise multisectorielle active dans le numérique, la formation, l’environnement, le commerce général et l’agrobusiness.', '/', '/assets/images/carri/hero-business.jpg'],
  'notre-entreprise.html': ['Notre entreprise | Carri Business', 'Découvrez Carri Business, entreprise congolaise multisectorielle engagée dans la création de valeur et le développement des compétences.', '/notre-entreprise.html', '/assets/images/carri/hero-business.jpg'],
  'activites.html': ['Nos activités | Carri Business', 'Découvrez les activités de Carri Business : numérique, formation, environnement, commerce général et agrobusiness.', '/activites.html', '/assets/images/carri/hero-business.jpg'],
  'produits-services.html': ['Nos produits et services | Carri Business', 'Découvrez Kisinet, Loyer360 et les solutions numériques développées par Carri Business.', '/produits-services.html', '/assets/images/carri/kisinet-digital.jpg'],
  'djana-academy.html': ['Djana Academy | Formation numérique en RDC', 'Djana Academy, activité de Carri Business, accompagne le développement des compétences numériques en République démocratique du Congo.', '/djana-academy.html', '/assets/images/logo%20simply.jpg'],
  'actualites.html': ['Actualités | Carri Business', 'Retrouvez les annonces, événements et informations institutionnelles de Carri Business.', '/actualites.html', '/assets/images/carri/hero-business.jpg'],
  'contact.html': ['Contactez Carri Business | Kinshasa, RDC', 'Contactez Carri Business à Kinshasa par e-mail ou téléphone pour vos demandes d’information, de collaboration ou de projet.', '/contact.html', '/assets/images/carri/hero-business.jpg'],
  'mentions-legales.html': ['Mentions légales | Carri Business', 'Mentions légales du site institutionnel de Carri Business.', '/mentions-legales.html', '/assets/images/carri/hero-business.jpg'],
  'politique-confidentialite.html': ['Politique de confidentialité | Carri Business', 'Politique de confidentialité du site institutionnel de Carri Business.', '/politique-confidentialite.html', '/assets/images/carri/hero-business.jpg'],
  'secteur.html': ['Nos activités | Carri Business', 'Découvrez les secteurs d’activité de Carri Business.', '/activites.html', '/assets/images/carri/hero-business.jpg']
};
const org = JSON.stringify({ '@context':'https://schema.org', '@type':'Organization', name:'Carri Business', url:site, email:'contact@carribusiness.com', telephone:'+243819339737', address:{ '@type':'PostalAddress', addressLocality:'Kinshasa', addressCountry:'CD' } });
for (const [file, [title, description, path, image]] of Object.entries(pages)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`);
  html = html.replace(/<meta property="og:[^"]+"[^>]*>/g, '').replace(/<meta name="twitter:[^"]+"[^>]*>/g, '');
  html = html.replace(/<script type="application\/ld\+json"(?: id="organization-schema")?>[\s\S]*?"@type":"Organization"[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link rel="canonical"[^>]*>/g, '').replace(/<meta name="robots" content="noindex"\s*\/?>/g, '');
  const canonical = `${site}${path}`;
  const meta = `<link rel="canonical" href="${canonical}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site}${image}"><meta property="og:locale" content="fr_CD"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}${image}">${file === 'secteur.html' ? '<meta name="robots" content="noindex,follow">' : ''}${file === 'index.html' ? `<script id="organization-schema" type="application/ld+json">${org}</script>` : ''}`;
  html = html.replace('</head>', `${meta}</head>`);
  fs.writeFileSync(file, html);
}
