import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case1Tree: TreeNode = {
  name: "Centraal Authenticatiesysteem geïmplementeerd",
  dangerRating: 1,
  level: "Fortunately",
  status: GoShieldCheck,
  children: [
    {
      name: "Enkel wachtwoordondersteuning verhoogt risico op diefstal van inloggegevens",
      dangerRating: 19,
      level: "Unfortunately",
      status: GoShield,
      children: [

        // Branch A – MFA path
        {
          name: "MFA gepland wat de veiligheid verhoogt",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "MFA zorgt voor ongemak en extra belasting voor support",
              dangerRating: 6,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Nieuwe UX-flow met biometrie vermindert frictie",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Biometrie introduceert GDPR- en privacyproblemen",
                      dangerRating: 15,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Verwerkingsregister en DPIA opgesteld om privacyrisico’s te beperken",
                          dangerRating: 3,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "DPIA toont risico op opslag van raw biometrische data",
                              dangerRating: 18,
                              level: "Unfortunately",
                              status: GoShield
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "Gebruikers krijgen optionele MFA-bypasscodes voor reissituaties",
                  dangerRating: 3,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Bypasscodes kunnen opnieuw gebruikt worden als ze uitlekken",
                      dangerRating: 23,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Tijdgebaseerde rotatie en automatische ongeldigmaking toegevoegd",
                          dangerRating: 2,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
                  ]
                },
              ]

            },
            {
                  name: "Managers eisen uitzonderingen voor VIP-accounts",
                  dangerRating: 12,
                  level: "Unfortunately",
                  status: GoShield,
                  children: [
                    {
                      name: "VIP-accounts krijgen hardware keys ter compensatie",
                      dangerRating: 1,
                      level: "Fortunately",
                      status: GoShieldCheck,
                      children: [
                        {
                          name: "Hardware keys kunnen zoekraken tijdens zakenreizen",
                          dangerRating: 8,
                          level: "Unfortunately",
                          status: GoShield
                        }
                      ]
                    }
                  ]
                }
          ]
        },

        // Branch B – Logging & Monitoring path
        {
          name: "Team voegt gedetailleerde loginpogingen-logging toe",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Hoge logvolumes verhogen opslagkosten en vereisen monitoring",
              dangerRating: 10,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Automatische anomaliedetectie markeert verdachte IP-adressen",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Blokkeren van verdachte IP's kan legitieme VPN-gebruikers blokkeren",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
                },

                // Wrapped: probleem was Unfortunately -> Unfortunately, nu: Fortunately wrapper
                {
                  name: "Risicoanalyse uitgevoerd op log metadata",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Logs bevatten mogelijk gevoelige metadata (locatie, device info)",
                      dangerRating: 14,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Encryptie-at-rest en toegangscontrole toegevoegd",
                          dangerRating: 2,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "Sleutelbeheer fout geconfigureerd → risico op sleutelverlies",
                              dangerRating: 7,
                              level: "Unfortunately",
                              status: GoShield
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // Wrapped shadow-IT: insert wrapper Fortunately
                {
                  name: "Onderzoek naar ongeautoriseerde scripts op servers",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Shadow-IT scripts verzamelen authenticatielogs buiten IT-kennis om",
                      dangerRating: 11,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Shadow-IT gedetecteerd, toegang tot logging endpoints geblokkeerd",
                          dangerRating: 2,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
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
          status: GoShieldCheck,
          children: [
            {
              name: "Complexere wachtwoorden verhogen frustratie bij gebruikers",
              dangerRating: 3,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Uitrol van wachtwoordmanager verbetert gebruiksgemak",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Cloud-gebaseerde wachtwoordmanager synchroniseert mogelijk via externe provider",
                      dangerRating: 13,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "End-to-end encryptie ingeschakeld voor alle synchronisatie",
                          dangerRating: 2,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "Frequente wachtwoordrotatie leidt tot voorspelbare patronen",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Team verwijdert verplichte rotatie en schakelt over naar risicogebaseerde resets",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Foutieve risk-score veroorzaakt overslaan van kritieke resets",
                      dangerRating: 6,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
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
          status: GoShieldCheck,
          children: [
            {
              name: "Provider-storingen kunnen alle werknemers buitensluiten",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Team richt on-prem fallback-authenticatieserver in",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "On-prem fallback synchroniseert credentials vertraagd",
                      dangerRating: 5,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Periodieke synchronisatie en monitoring toegevoegd",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
                  ]
                },

                // Wrapped vendor patch issue (was Unfortunately under Unfortunately)
                {
                  name: "Vendor risico- en patchanalyse uitgevoerd",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Vendor publiceert security patch te laat (supply-chain risico)",
                      dangerRating: 12,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Vulnerability scanner detecteert ontbrekende patch",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
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
