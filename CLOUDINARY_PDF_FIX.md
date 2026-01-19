# Problème PDF "your store is blocked"

## Problème
Lors de l'upload d'un PDF via l'admin, l'URL retournée affiche "your store is blocked" au lieu du PDF.

## Solution temporaire
Si vous avez uploadé le PDF manuellement dans Cloudinary et que ça fonctionne :

1. **Récupérer l'URL Cloudinary** du PDF uploadé manuellement depuis le Dashboard Cloudinary
2. **Dans l'admin**, au lieu d'uploader via le formulaire, coller directement l'URL Cloudinary dans le champ "Menu PDF"
3. Sauvegarder

## Format de l'URL Cloudinary pour les PDFs
Les PDFs Cloudinary ont généralement ce format :
```
https://res.cloudinary.com/{cloud_name}/raw/upload/{folder}/{public_id}.pdf
```

Exemple :
```
https://res.cloudinary.com/dxe6pwkdz/raw/upload/palais-du-raja/1234567890-carte-menu.pdf
```

## Solution définitive (à implémenter)
Le problème vient probablement du fait que Cloudinary bloque l'accès aux fichiers "raw" sur le plan gratuit, ou que l'URL générée n'est pas dans le bon format.

### À vérifier dans Cloudinary Dashboard :
1. Allez dans **Settings → Security**
2. Vérifiez que **"Restricted media types"** n'inclut pas "raw"
3. Vérifiez que **"Access mode"** est bien "Public"
4. Dans **Settings → Upload**, vérifiez que les fichiers raw sont autorisés

### Si le problème persiste :
- Utiliser l'URL Cloudinary directement (solution temporaire ci-dessus)
- Ou considérer stocker les PDFs ailleurs (AWS S3, Vercel Blob avec un autre compte, etc.)

## Compression vidéo
Les vidéos sont maintenant compressées automatiquement lors de l'affichage avec :
- Qualité : `auto:good`
- Format : automatique
- Codec vidéo : automatique

Si les vidéos sont encore trop lourdes, vous pouvez :
1. Réduire la taille avant upload
2. Utiliser des outils de compression vidéo (HandBrake, etc.)
3. Réduire la qualité dans `AnimatedSections.tsx` (ligne ~137)

