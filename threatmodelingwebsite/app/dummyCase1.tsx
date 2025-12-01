import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case1Tree: TreeNode = {
  name: "Centraal Authenticatiesysteem geïmplementeerd",
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
                {
                  name: "Risicoanalyse uitgevoerd op log metadata",
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
                {
                  name: "Onderzoek naar ongeautoriseerde scripts op servers",
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
        {
          name: "Team versterkt wachtwoordbeleid (lengte, rotatie, complexiteit)",
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
                  name: "Vendor risico- en patchanalyse uitgevoerd",
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
