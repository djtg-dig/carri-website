# Carri Business — Site institutionnel

Site statique HTML, CSS et JavaScript, conçu pour Cloudflare Pages. Aucune base de données, API ou authentification n’est nécessaire.

## Lancer localement

Depuis ce dossier :

```bash
python3 -m http.server 4173
```

Ouvrir ensuite `http://localhost:4173`.

## Déployer sur Cloudflare Pages

1. Créer un dépôt Git contenant ce dossier et le pousser vers GitHub ou GitLab.
2. Dans Cloudflare Pages, choisir **Create a project** puis connecter le dépôt.
3. Choisir **None** comme framework preset.
4. Laisser vide la commande de build et définir le dossier de sortie sur `.`.
5. Déployer, puis associer le domaine officiel de Carri Business dans **Custom domains**.
6. Associer le domaine officiel `carribusiness.com` dans **Custom domains**, puis vérifier que le sitemap est accessible à l’adresse `https://carribusiness.com/sitemap.xml`.

## Informations à compléter avant publication

- Réseaux sociaux officiels et éventuel canal de réception des demandes par formulaire.
- Mentions légales complètes : éditeur et informations d’hébergement.
- Actualités, formations et détails des secteurs lorsqu’ils sont confirmés.

## Photographies

Les images dans `assets/images/carri/` sont des versions web optimisées des photographies fournies dans le dossier `photos`. Elles sont utilisées uniquement pour illustrer le secteur numérique ; aucun visuel généré par IA n’a été employé.
