import type { TranslationDictionary } from '../../types/translations';

export const frTranslations: TranslationDictionary = {
  langCode: 'fr',
  langName: 'French',
  nativeName: 'Français',

  header: {
    title: 'WaySafe',
    tagline: 'Votre Compagnon de Crise Multilingue',
    liveModeBadge: 'MODE DIRECT',
    demoModeBadge: 'DÉMO CRISE',
    useMyLocation: 'Ma position',
    locating: 'Localisation GPS...',
    locationDenied: 'Accès GPS refusé',
    selectPreset: 'Choisir la ville',
    refresh: 'Actualiser',
    refreshing: 'Mise à jour...',
    updatedJustNow: 'Mis à jour à l’instant',
    updatedAgo: (mins: number) => `Mis à jour il y a ${mins} min`,
    statusLive: 'Connecté aux prévisions en direct',
    statusDemo: 'Scénario simulé actif',
    activateDemoBtn: 'Activer la Démo de Crise',
    exitDemoBtn: 'Quitter la Démo / Retour au Direct',
  },

  banner: {
    simulatedTitle: 'SCÉNARIO SIMULÉ — PAS UNE URGENCE EN DIRECT',
    simulatedDescription:
      'Démonstration d’une crue soudaine extrême à Chennai. Toutes les alertes, zones de danger, points de rassemblement et jalons chronologiques montrés ici sont purement illustratifs.',
    exitDemoButton: 'Quitter la Démo / Retour au Direct',
  },

  safetyOverview: {
    title: 'Aperçu de Votre Sécurité',
    subtitle: 'Conditions en temps réel et évaluation des risques pour les voyageurs',
    temperature: 'Température',
    feelsLike: 'Température ressentie',
    humidity: 'Humidité',
    rainfall: 'Précipitations',
    windSpeed: 'Vitesse du vent',
    windGusts: 'Rafales',
    rainProbability: 'Probabilité de pluie',
    condition: 'État atmosphérique',
    statusNormal: 'Conditions normales — Aucun phénomène extrême détecté',
    statusCaution: 'Vigilance conseillée — Précipitations modérées ou fortes prévues',
    statusSevere: 'Alerte météo — Vents violents et fortes précipitations probables',
    statusDemoFlood: 'URGENCE SIMULÉE : Alerte crue soudaine majeure à Chennai',
    sourceVerified: 'Flux direct : Service météorologique Open-Meteo',
    forecastNotice:
      'Remarque : Les prévisions sont des modèles prédictifs et ne constituent pas un ordre officiel d’évacuation gouvernemental.',
    simulatedNotice:
      'Note de démonstration : Les données affichées sont simulées à des fins de test et d’évaluation.',
  },

  officialWarning: {
    title: 'Bulletin Officiel du Département IMD',
    activeTitle: 'Bulletin officiel d’alerte récupéré',
    noActiveTitle: 'Aucune vigilance majeure en cours pour ce district',
    unavailableTitle: 'Flux direct IMD non disponible',
    unavailableDesc:
      'La connexion directe du navigateur aux alertes IMD est restreinte par les règles de sécurité CORS. Consultez le bulletin officiel :',
    visitPortalBtn: 'Ouvrir le portail officiel IMD (mausam.imd.gov.in)',
    sourceLabel: 'Département Météorologique de l’Inde (Gouv. de l’Inde)',
  },

  emergencyAction: {
    title: 'Que dois-je faire maintenant ?',
    subtitle: 'Protocoles de sécurité immédiats pour les touristes en cas de fortes pluies et crues',
    actions: [
      {
        step: 1,
        title: 'Ne marchez et ne conduisez jamais dans l’eau en crue',
        description:
          'Seulement 15 cm d’eau en mouvement peuvent vous faire chuter ; 30 cm suffisent à emporter une voiture. Faites demi-tour immédiatement.',
        badge: 'Règle Vitale',
      },
      {
        step: 2,
        title: 'Gagnez les hauteurs et évitez les sous-sols',
        description:
          'Montez dans les étages supérieurs. Éloignez-vous des canaux d’évacuation, des rivières et des passages souterrains.',
        badge: 'Prendre de la hauteur',
      },
      {
        step: 3,
        title: 'Gardez votre téléphone chargé et économisez la batterie',
        description:
          'Activez le mode économie d’énergie. Gardez votre batterie portable à portée et privilégiez les communications d’urgence.',
        badge: 'Communication',
      },
      {
        step: 4,
        title: 'Éloignez-vous des infrastructures électriques',
        description:
          'Les transformateurs inondés, câbles à terre ou prises submergées présentent un risque mortel d’électrocution.',
        badge: 'Sécurité Électrique',
      },
      {
        step: 5,
        title: 'Préparez votre message d’urgence et restez à l’abri',
        description:
          'Ne tentez aucune sortie touristique. Si l’eau menace votre hôtel ou hébergement, composez le 112 sans attendre.',
        badge: 'Assistance',
      },
    ],
  },

  map: {
    title: 'Carte Interactive de Sécurité et des Risques',
    subtitle: 'Navigation géographique contextuelle basée sur OpenStreetMap',
    legendTitle: 'Légende de la carte',
    legendTourist: 'Votre position / Ville sélectionnée',
    legendHazard: 'Zone à risque simulée (Démo)',
    legendShelter: 'Point de secours illustratif (Démo)',
    demoNote:
      'Les zones à risque et centres d’accueil affichés sont des repères fictifs de démonstration et ne sont pas des centres officiels validés.',
    youAreHere: 'Position actuelle du voyageur',
    selectedLocation: 'Centre-ville sélectionné',
    zoomIn: 'Zoom avant',
    zoomOut: 'Zoom arrière',
    demoShelterBadge: 'ABRI DÉMO',
    demoHazardBadge: 'DANGER SIMULÉ',
  },

  outlook: {
    title: 'Prévisions Heure par Heure',
    subtitle: 'Probabilité et intensité des précipitations sur les 12 prochaines heures',
    precipitationProb: 'Probabilité de pluie',
    rainAmount: 'Pluie prévue',
    nextHours: 'Aperçu 12 heures',
    noRain: 'Faible probabilité de pluie',
  },

  assistance: {
    title: 'Assistance d’Urgence et Message d’Alerte',
    subtitle: 'Accès direct aux secours et générateur de message de détresse pré-formaté',
    call112Btn: 'Numéro d’urgence : Appeler le 112',
    call112Notice:
      'Cliquer sur ce bouton ouvre le composeur téléphonique avec le 112 pré-rempli. Vous devez appuyer sur appel pour joindre les secours. WaySafe n’appelle pas automatiquement.',
    helpMessageTitle: 'Message d’Alerte Formaté pour Secours',
    helpMessageDesc:
      'Copiez et envoyez ce texte par SMS, WhatsApp ou messagerie à la police, à votre hôtel ou à vos proches.',
    copyBtn: 'Copier le Message d’Urgence',
    copiedSuccess: 'Copié dans le presse-papiers !',
    checklistTitle: 'Informations clés à transmettre au 112',
    checklistItems: [
      '1. Vos coordonnées GPS exactes ou point de repère identifiable.',
      '2. Nombre total de personnes avec vous (enfants, personnes âgées, blessés).',
      '3. Nature du danger immédiat (niveau de l’eau montant, danger structurel, blessure).',
      '4. Disponibilité en eau potable et charge de téléphone.',
    ],
    disclaimer:
      'Avertissement : WaySafe est un outil d’orientation d’urgence. Il n’envoie pas directement d’équipes de secours.',
    manualLocationPrompt: 'Entrez l’adresse de votre hôtel si le GPS n’est pas disponible.',
  },

  sources: {
    title: 'Sources de Données et Transparence',
    subtitle: 'Informations claires sur les fournisseurs de données et la confidentialité',
    openMeteoTitle: 'API Météo Open-Meteo',
    openMeteoDesc:
      'Modèle météorologique ouvert fournissant des relevés en direct de température, vent et pluie sans traceur.',
    imdTitle: 'India Meteorological Department (IMD)',
    imdDesc:
      'Service météorologique national indien. Bulletins officiels de district consultés lorsque disponibles.',
    osmTitle: 'OpenStreetMap & Leaflet',
    osmDesc:
      'Cartographie mondiale libre et collaborative sous licence Open Database License (ODbL).',
    privacyTitle: 'Confidentialité Totale Côté Client',
    privacyDesc:
      'Vos coordonnées GPS sont traitées exclusivement dans votre navigateur et ne sont jamais enregistrées ni transmises.',
    officialDisclaimer:
      'Les prévisions météorologiques sont indicatives et ne constituent pas un ordre officiel d’évacuation. Suivez toujours les consignes des autorités locales.',
  },

  timeline: {
    title: 'Chronologie de Crise Simulée',
    subtitle: 'Séquence de démonstration de l’aggravation de la crue à Chennai',
    badge: 'Progression du Scénario',
  },
};
