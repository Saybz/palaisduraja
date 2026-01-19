# Configuration Cloudinary

Le projet utilise maintenant Cloudinary pour le stockage des fichiers (images, vidéos, PDF) au lieu de Vercel Blob.

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```env
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

## Comment obtenir vos credentials Cloudinary

1. Créez un compte gratuit sur [Cloudinary](https://cloudinary.com/users/register/free)
2. Une fois connecté, allez dans le **Dashboard**
3. Vous trouverez vos credentials dans la section "Account Details" :
   - **Cloud name** : votre nom de cloud
   - **API Key** : votre clé API
   - **API Secret** : votre secret API (cliquez sur "Reveal" pour le voir)

## Avantages de Cloudinary

- ✅ **Gratuit jusqu'à 25 GB** de stockage
- ✅ **25 GB de bande passante** par mois
- ✅ Transformation d'images automatique
- ✅ Optimisation automatique des images
- ✅ CDN global pour un chargement rapide

## Migration depuis Vercel Blob

Les anciens fichiers stockés sur Vercel Blob continueront de fonctionner (ils sont déjà dans la base de données). Seuls les nouveaux uploads utiliseront Cloudinary.

Pour migrer les anciens fichiers :
1. Téléchargez-les depuis Vercel Blob
2. Re-uploadez-les via l'admin pour les stocker sur Cloudinary

