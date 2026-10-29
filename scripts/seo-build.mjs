import fs from 'node:fs';
import path from 'node:path';

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
const org = JSON.stringify({ '@context':'https://schema.org', '@graph': [{ '@type':'Organization', name:'Carri Business', url:site, email:'contact@carribusiness.com', telephone:'+243819339737', address:{ '@type':'PostalAddress', addressLocality:'Kinshasa', addressCountry:'CD' } }, { '@type':'WebSite', name:'Carri Business', url:site }] });
for (const [file, [title, description, path, image]] of Object.entries(pages)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`);
  html = html.replace(/<meta property="og:[^"]+"[^>]*>/g, '').replace(/<meta name="twitter:[^"]+"[^>]*>/g, '');
  html = html.replace(/<script\b[^>]*\btype="application\/ld\+json"[^>]*>[\s\S]*?"@type":"Organization"[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link rel="canonical"[^>]*>/g, '').replace(/<meta name="robots"[^>]*>/g, '');
  const canonical = `${site}${path}`;
  const meta = `<link rel="canonical" href="${canonical}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site}${image}"><meta property="og:locale" content="fr_CD"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}${image}">${file === 'secteur.html' ? '<meta name="robots" content="noindex,follow">' : ''}${file === 'index.html' ? `<script id="organization-schema" type="application/ld+json">${org}</script>` : ''}`;
  html = html.replace('</head>', `${meta}</head>`);
  fs.writeFileSync(file, html);
}

const brandImage = `${site}/assets/images/brand/carri-business-social.png`;
const brandIcons = '<link rel="icon" href="/assets/images/brand/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="16x16" href="/assets/images/brand/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="/assets/images/brand/favicon-32x32.png"><link rel="icon" type="image/png" sizes="48x48" href="/assets/images/brand/favicon-48x48.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/images/brand/apple-touch-icon.png">';

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(fullPath) : entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

for (const file of htmlFiles('.')) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<link rel="(?:icon|apple-touch-icon)"[^>]*>/g, '');
  html = html.replace(/<meta property="og:image:(?:width|height)"[^>]*>/g, '');
  html = html.replace(/<meta property="og:image"[^>]*>/g, `<meta property="og:image" content="${brandImage}">`);
  html = html.replace(/<meta name="twitter:image"[^>]*>/g, `<meta name="twitter:image" content="${brandImage}">`);
  if (!html.includes('property="og:image"')) html = html.replace('</head>', `<meta property="og:image" content="${brandImage}"></head>`);
  if (!html.includes('name="twitter:image"')) html = html.replace('</head>', `<meta name="twitter:image" content="${brandImage}"></head>`);
  html = html.replace('</head>', `<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">${brandIcons}</head>`);
  fs.writeFileSync(file, html);
}
