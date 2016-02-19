# Caisse Allocations Familiales


## Récupérer le quotient familial d'un allocataire CAF

```shell
curl "https://apiparticulier-test.sgmap.fr/api/caf/qf?codePostal=99148&numeroAllocataire=0000354" \
  -H "X-API-KEY: test-token" \
  -H "accept: application/json" \
  -H "X-User: demo"
```

> Cette commande retournera du json

Cette URL permet de récupérer les noms et prénoms des allocataires CAF ainsi que
le CAF du mois passé

### HTTP Request

`GET https://apiparticulier.sgmap.fr/api/caf/qf`

### Query Parameters

Paramètre | Défault | Obligatoire | Description
--------- | ------- | ----------|------
codePostal | Non | Oui | Code postal, identifiant numérique de 5 chiffres
numeroAllocataire | Non | Oui | Numéro de l'allocataire CAF, Code postal, identifiant numérique de 7 chiffres


## Récupérer l'adresse d'un allocataire CAF

```shell
curl "https://apiparticulier-test.sgmap.fr/api/caf/adresse?codePostal=99148&numeroAllocataire=0000354" \
  -H "X-API-KEY: test-token" \
  -H "accept: application/json" \
  -H "X-User: demo"
```

> Cette commande retournera du json

Cette URL permet de récupérer les noms et prénoms des allocataires CAF ainsi que
leur adresse

### HTTP Request

`GET https://apiparticulier.sgmap.fr/api/caf/adresse`

### Query Parameters

Paramètre | Défault | Obligatoire | Description
--------- | ------- | ----------|------
codePostal | Non | Oui | Code postal, identifiant numérique de 5 chiffres
numeroAllocataire | Non | Oui | Numéro de l'allocataire CAF, Code postal, identifiant numérique de 7 chiffres


## Récupérer la composition de la famille d'un allocataire CAF

```shell
curl "https://apiparticulier-test.sgmap.fr/api/caf/famille?codePostal=99148&numeroAllocataire=0000354" \
  -H "X-API-KEY: test-token" \
  -H "accept: application/json" \
  -H "X-User: demo"
```

> Cette commande retournera du json

Cette URL permet de récupérer les noms et prénoms des allocataires CAF ainsi que
leur enfants

### HTTP Request

`GET https://apiparticulier.sgmap.fr/api/caf/famille`

### Query Parameters

Paramètre | Défault | Obligatoire | Description
--------- | ------- | ----------|------
codePostal | Non | Oui | Code postal, identifiant numérique de 5 chiffres
numeroAllocataire | Non | Oui | Numéro de l'allocataire CAF, Code postal, identifiant numérique de 7 chiffres


<aside class="warning">
Attention, la CAF ne renverra que les enfants touchant les aides de la CAF. La
CAF ne liste pas les conjoints s'ils sont en union libre.
</aside>

## Récupérer l'attestation des droits de la CAF

```shell
curl "https://apiparticulier-test.sgmap.fr/api/caf/attestation/droits?codePostal=99148&numeroAllocataire=0000354" \
  -H "X-API-KEY: test-token" \
  -H "X-User: demo"
```

> Cette commande retournera un PDF

Cette URL permet de récupérer la pièce justificative contenants les droits de
l'allocataire.

### HTTP Request

`GET https://apiparticulier.sgmap.fr/api/caf/attestation/droits`

### Query Parameters

Paramètre | Défault | Obligatoire | Description
--------- | ------- | ----------|------
codePostal | Non | Oui | Code postal, identifiant numérique de 5 chiffres
numeroAllocataire | Non | Oui | Numéro de l'allocataire CAF, Code postal, identifiant numérique de 7 chiffres


## Récupérer l'attestation du quotient familial de la CAF

```shell
curl "https://apiparticulier-test.sgmap.fr/api/caf/attestation/qf?codePostal=99148&numeroAllocataire=0000354" \
  -H "X-API-KEY: test-token" \
  -H "X-User: demo"
```

> Cette commande retournera un PDF

Cette URL permet de récupérer la pièce justificative contenants le quotient familial de
l'allocataire.

### HTTP Request

`GET https://apiparticulier.sgmap.fr/api/caf/attestation/qf`

### Query Parameters

Paramètre | Défault | Obligatoire | Description
--------- | ------- | ----------|------
codePostal | Non | Oui | Code postal, identifiant numérique de 5 chiffres
numeroAllocataire | Non | Oui | Numéro de l'allocataire CAF, Code postal, identifiant numérique de 7 chiffres