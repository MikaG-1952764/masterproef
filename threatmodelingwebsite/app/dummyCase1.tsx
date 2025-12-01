import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case1Tree: TreeNode = {
  name: "(F) Centraal Authenticatiesysteem geïmplementeerd",
  level: "Fortunately [Assumption Under Review]",
  status: GoShieldCheck,
  children: [
    {
      name: "(U) Enkel wachtwoordondersteuning verhoogt risico op diefstal van inloggegevens (Danger Rating: 19) [Weakness Under Review]",
      dangerRating: 19,
      level: "Unfortunately",
      status: GoShield,
      children: [

        // Branch A – MFA path
        {
          name: "(F) MFA gepland wat de veiligheid verhoogt [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) MFA zorgt voor ongemak en extra belasting voor support (Danger Rating: 6) [Weakness Under Review]",
              dangerRating: 6,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Nieuwe UX-flow met biometrie vermindert frictie [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Biometrie introduceert GDPR- en privacyproblemen (Danger Rating: 15) [Weakness Under Review]",
                      dangerRating: 15,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Verwerkingsregister en DPIA opgesteld om privacyrisico’s te beperken [Assumption Under Review]",
                          dangerRating: 3,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) DPIA toont risico op opslag van raw biometrische data (Danger Rating: 18) [Weakness]",
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
                  name: "(F) Gebruikers krijgen optionele MFA-bypasscodes voor reissituaties [Completed]",
                  dangerRating: 3,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Bypasscodes kunnen opnieuw gebruikt worden als ze uitlekken (Danger Rating: 23) [Weakness Under Review]",
                      dangerRating: 23,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Tijdgebaseerde rotatie en automatische ongeldigmaking toegevoegd [Verified Assumption]",
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
                  name: "(U) Managers eisen uitzonderingen voor VIP-accounts (Danger Rating: 12) [Weakness Under Review]",
                  dangerRating: 12,
                  level: "Unfortunately",
                  status: GoShield,
                  children: [
                    {
                      name: "(F) VIP-accounts krijgen hardware keys ter compensatie [Assumption Under Review]",
                      dangerRating: 1,
                      level: "Fortunately",
                      status: GoShieldCheck,
                      children: [
                        {
                          name: "(U) Hardware keys kunnen zoekraken tijdens zakenreizen (Danger Rating: 8) [Weakness]",
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
          name: "(F) Team voegt gedetailleerde loginpogingen-logging toe [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Hoge logvolumes verhogen opslagkosten en vereisen monitoring (Danger Rating: 10) [Weakness Under Review]",
              dangerRating: 10,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Automatische anomaliedetectie markeert verdachte IP-adressen [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Blokkeren van verdachte IP's kan legitieme VPN-gebruikers blokkeren (Danger Rating: 3) [Weakness]",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
                },

                // Wrapped: probleem was Unfortunately -> Unfortunately, nu: Fortunately wrapper
                {
                  name: "(F) Risicoanalyse uitgevoerd op log metadata [Assumption Under Review]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Logs bevatten mogelijk gevoelige metadata (bv. locatie, device info) (Danger Rating: 14) [Weakness Under Review]",
                      dangerRating: 14,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Encryptie-at-rest en toegangscontrole toegevoegd [Assumption Under Review]",
                          dangerRating: 2,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) Sleutelbeheer fout geconfigureerd → risico op sleutelverlies (Danger Rating: 7) [Weakness]",
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
                  name: "(F) Onderzoek naar ongeautoriseerde scripts op servers [Assumption Under Review]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Shadow-IT scripts verzamelen authenticatielogs buiten IT-kennis om (Danger Rating: 11) [Weakness Under Review]",
                      dangerRating: 11,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Shadow-IT gedetecteerd, toegang tot logging endpoints geblokkeerd [Assumption Under Review]",
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
          name: "(F) Team versterkt wachtwoordbeleid (lengte, rotatie, complexiteit) [Assumption Under Review]",
          dangerRating: 2,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Complexere wachtwoorden verhogen frustratie bij gebruikers (Danger Rating: 3) [Weakness Under Review]",
              dangerRating: 3,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Uitrol van wachtwoordmanager verbetert gebruiksgemak [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Cloud-gebaseerde wachtwoordmanager synchroniseert mogelijk via externe provider (Danger Rating: 13) [Weakness Under Review]",
                      dangerRating: 13,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) End-to-end encryptie ingeschakeld voor alle synchronisatie [Assumption Under Review]",
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
              name: "(U) Frequente wachtwoordrotatie leidt tot voorspelbare patronen (Danger Rating: 4) [Weakness Under Review]",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Team verwijdert verplichte rotatie en schakelt over naar risicogebaseerde resets [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Foutieve risk-score veroorzaakt overslaan van kritieke resets (Danger Rating: 6) [Weakness]",
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
          name: "(F) Externe authenticatieprovider toegevoegd voor SSO-compatibiliteit [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Provider-storingen kunnen alle werknemers buitensluiten (Danger Rating: 4) [Weakness Under Review]",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Team richt on-prem fallback-authenticatieserver in [Assumption Under Review]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) On-prem fallback synchroniseert credentials vertraagd (Danger Rating: 5) [Weakness Under Review]",
                      dangerRating: 5,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Periodieke synchronisatie en monitoring toegevoegd [Verified Assumption]",
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
                  name: "(F) Vendor risico- en patchanalyse uitgevoerd [Assumption Under Review]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Vendor publiceert security patch te laat (supply-chain risico) (Danger Rating: 12) [Weakness Under Review]",
                      dangerRating: 12,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Vulnerability scanner detecteert ontbrekende patch [Assumption Under Review]",
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