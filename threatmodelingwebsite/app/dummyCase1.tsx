import { TreeNode } from "./TreeVisualizer";

export const Case1Tree: TreeNode = {
  name: "Centraal Authenticatiesysteem geïmplementeerd",
  dangerRating: 1,
  level: "Fortunately",
  status: null,
  children: [
    {
      name: "Enkel wachtwoordondersteuning verhoogt risico op diefstal van inloggegevens",
      dangerRating: 3,
      level: "Unfortunately",
      status: null,
      children: [
        // Branch A – MFA path
        {
          name: "MFA gepland wat de veiligheid verhoogt",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "MFA zorgt voor ongemak en extra belasting voor support",
              dangerRating: 2,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Nieuwe UX-flow met biometrie vermindert frictie",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Biometrie introduceert GDPR- en privacyproblemen",
                      dangerRating: 4,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                },
                {
                  name: "Gebruikers krijgen optionele MFA-bypasscodes voor reissituaties",
                  dangerRating: 3,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Bypasscodes kunnen opnieuw gebruikt worden als ze uitlekken",
                      dangerRating: 4,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                }
              ]
            }
          ]
        },

        // Branch B – Logging & Monitoring path
        {
          name: "Team voegt gedetailleerde logins-pogingen logging toe",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Hoge logvolumes verhogen opslagkosten en vereisen monitoring",
              dangerRating: 2,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Automatische anomaliedetectie markeert verdachte IP-adressen",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Blokkeren van verdachte IP's kan legitieme VPN-gebruikers blokkeren",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                }
              ]
            }
          ]
        },

        // Branch C – Password Policy path
        {
          name: "Team versterkt wachtwoordbeleid (lengte, rotatie, complexiteit)",
          dangerRating: 2,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Complexere wachtwoorden verhogen frustratie bij gebruikers",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Uitrol van wachtwoordmanager verbetert gebruiksgemak",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                  ]
                }
              ]
            },
            {
              name: "Frequente wachtwoordrotatie leidt tot voorspelbare patronen",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Team verwijdert verplichte rotatie en schakelt over naar risicogebaseerde resets",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null
                }
              ]
            }
          ]
        },

        // Branch D – Third-party Provider path
        {
          name: "Externe authenticatieprovider toegevoegd voor SSO-compatibiliteit",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Provider-storingen kunnen alle werknemers buitensluiten",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Team richt on-prem fallback-authenticatieserver in",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: null,
                  children: [
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
