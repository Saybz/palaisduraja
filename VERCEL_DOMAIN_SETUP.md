# Configuration du domaine OVH sur Vercel

Ce guide vous explique comment connecter votre nom de domaine acheté sur OVH à votre déploiement Vercel.

## Méthode recommandée : Configuration DNS sur OVH

Cette méthode garde la gestion DNS sur OVH tout en pointant vers Vercel.

### Étape 1 : Ajouter le domaine dans Vercel

1. Connectez-vous à votre [tableau de bord Vercel](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**
5. Entrez votre nom de domaine (ex: `palaisduraja.fr`)
6. Cliquez sur **Add**

### Étape 2 : Récupérer les enregistrements DNS depuis Vercel

Après avoir ajouté le domaine, Vercel vous affichera les enregistrements DNS nécessaires :

**Pour un domaine racine (ex: `palaisduraja.fr`)** :
- Type: `A`
- Nom: `@` (ou laissez vide)
- Valeur: Adresse IP fournie par Vercel (ex: `76.76.21.21`)

**Pour le www (ex: `www.palaisduraja.fr`)** :
- Type: `CNAME`
- Nom: `www`
- Valeur: `cname.vercel-dns.com.` (ou la valeur fournie par Vercel)

### Étape 3 : Configurer les DNS sur OVH

1. Connectez-vous à votre [espace client OVH](https://www.ovh.com/manager/)
2. Allez dans **Web Cloud** → **Domaines**
3. Sélectionnez votre domaine
4. Cliquez sur l'onglet **Zone DNS**
5. Supprimez les anciens enregistrements A et CNAME si nécessaire
6. Ajoutez les nouveaux enregistrements :

   **Enregistrement A pour le domaine racine** :
   - **Sous-domaine** : `@` (ou laissez vide)
   - **Type** : `A`
   - **TTL** : `3600` (ou laissez la valeur par défaut)
   - **Cible** : L'adresse IP fournie par Vercel

   **Enregistrement CNAME pour www** :
   - **Sous-domaine** : `www`
   - **Type** : `CNAME`
   - **TTL** : `3600` (ou laissez la valeur par défaut)
   - **Cible** : `cname.vercel-dns.com.` (avec le point final)

7. Cliquez sur **Valider** pour chaque enregistrement

### Étape 4 : Vérifier la configuration dans Vercel

1. Retournez sur Vercel dans **Settings** → **Domains**
2. Vérifiez que votre domaine apparaît avec un statut **Valid Configuration**
3. Cela peut prendre quelques minutes à quelques heures (propagation DNS)

## Méthode alternative : Transférer la gestion DNS vers Vercel

Si vous préférez que Vercel gère vos DNS, vous pouvez utiliser les serveurs de noms de Vercel.

### Sur OVH :

1. Allez dans **Domaines** → **Serveurs DNS**
2. Cliquez sur **Modifier**
3. Remplacez les serveurs DNS par ceux fournis par Vercel (généralement `ns1.vercel-dns.com` et `ns2.vercel-dns.com`)
4. Validez et attendez la propagation (peut prendre jusqu'à 48h)

**Note** : Cette méthode transfère toute la gestion DNS à Vercel. Si vous avez d'autres services (email, sous-domaines), ils devront être configurés dans Vercel.

## Vérification de la propagation DNS

Vous pouvez vérifier si la propagation DNS est terminée avec ces outils en ligne :
- [WhatsMyDNS.net](https://www.whatsmydns.net/)
- [DNSChecker.org](https://dnschecker.org/)

Entrez votre domaine et vérifiez que les enregistrements pointent vers Vercel.

## Troubleshooting

### Le domaine ne se connecte pas

1. Vérifiez que les enregistrements DNS sont correctement configurés sur OVH
2. Attendez jusqu'à 48h pour la propagation DNS complète
3. Vérifiez dans Vercel que le domaine est bien ajouté et validé
4. Assurez-vous qu'il n'y a pas de conflit avec d'autres enregistrements DNS

### Erreur SSL/TLS

Vercel génère automatiquement un certificat SSL via Let's Encrypt. Si vous avez une erreur SSL :
1. Attendez que le certificat soit généré (peut prendre quelques minutes)
2. Vérifiez dans Vercel → **Settings** → **Domains** que le certificat SSL est actif
3. Si le problème persiste, contactez le support Vercel

### Le www ne fonctionne pas

Assurez-vous d'avoir configuré :
1. L'enregistrement A pour le domaine racine (`@`)
2. L'enregistrement CNAME pour `www` pointant vers `cname.vercel-dns.com.`

Dans Vercel, vous pouvez activer la redirection automatique www → domaine racine ou inversement dans **Settings** → **Domains**.

## Notes importantes

- **Propagation DNS** : Les changements DNS peuvent prendre de 5 minutes à 48 heures pour se propager dans le monde entier
- **TTL** : Le Time To Live (TTL) détermine la durée de mise en cache. Une valeur plus basse permet des changements plus rapides mais augmente la charge sur les serveurs DNS
- **Sous-domaines** : Si vous avez besoin de sous-domaines (ex: `admin.palaisduraja.fr`), ajoutez-les également dans Vercel et configurez les DNS correspondants

## Support

- **Vercel** : [Documentation Vercel sur les domaines](https://vercel.com/docs/concepts/projects/domains)
- **OVH** : [Documentation OVH sur la zone DNS](https://docs.ovh.com/fr/domaines/editer-ma-zone-dns/)

