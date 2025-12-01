import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case2Tree: TreeNode = {
  name: "(F) ML-model detecteert frauduleuze transacties",
  dangerRating: 2,
  level: "Fortunately [Assumption Under Review]",
  status: GoShieldCheck,
  children: [
    {
      name: "(U) Hoge false positives blokkeren legitieme gebruikers (Danger Rating: 4) [Weakness Under Review]",
      dangerRating: 4,
      level: "Unfortunately",
      status: GoShield,
      children: [

        // Branch A – Improving Model Accuracy
        {
          name: "(F) Meer historische data verhoogt de nauwkeurigheid",
          dangerRating: 1,
          level: "Fortunately [Completed]",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Historische data introduceert privacy- en compliance-risico’s (Danger Rating: 4) [Weakness Under Review]",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Data wordt geanonimiseerd vóór training [Completed]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Anonimisatie vermindert detail in features en verlaagt prestaties (Danger Rating: 10) [Weakness Under Review]",
                      dangerRating: 10,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Feature engineering verbetert prestaties op een veilige manier [Completed]",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) Complexere features vergroten computationele kosten (Danger Rating: 3) [Weakness Under Review]",
                              dangerRating: 3,
                              level: "Unfortunately",
                              status: GoShield,
                              children: [
                                {
                                  name: "(F) Modelcompressie minimaliseert overhead [Verified Assumption]",
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
        },

        // Branch B – Real-time Alerts
        {
          name: "(F) Realtime waarschuwingen voorkomen financiële schade [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Realtime detectie verbruikt veel rekenkracht (Danger Rating: 3) [Weakness Under Review]",
              dangerRating: 3,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Systeem optimaliseert door laag-risico transacties te batchen [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Batching veroorzaakt vertraging bij transacties met gemiddeld risico (Danger Rating: 2) [Weakness Under Review]",
                      dangerRating: 2,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Caching van gemiddeld risico segmenten versnelt verwerking [Assumption Under Review]",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "(F) Hardware wordt opgeschaald tijdens piekmomenten [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Opschalen verhoogt operationele kosten aanzienlijk (Danger Rating: 5) [Weakness]",
                      dangerRating: 5,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
                }
              ]
            }
          ]
        },

        // Branch C – Model Transparency
        {
          name: "(F) Team voegt uitlegbaarheidstools toe om modelbeslissingen te verduidelijken [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Uitlegbaarheid onthult gevoelige modellogica aan interne medewerkers (Danger Rating: 22) [Weakness Under Review]",
              dangerRating: 22,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Toegang wordt beperkt tot geverifieerde accounts [Assumption Under Review]",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Accountbeheer veroorzaakt administratieve overhead (Danger Rating: 3) [Weakness]",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
                },
                {
              name: "(F) Alternatieve aanpak: beperkte uitleg beschikbaar voor enkel senior teamleden [Assumption Under Review]",
              dangerRating: 2,
              level: "Fortunately",
              status: GoShieldCheck,
              children: [
                {
                      name: "(U) Junior teamleden interpreteren beslissingen op hun eigen manier (Danger Rating: 3) [Weakness Under Review]",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Bespreken de beslissingen in een volgende vergadering [Assumption Under Review]",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        },
                        {
                          name: "(F) Junior teamleden besluiten alle servers uit te schakelen om fraude te stoppen [Assumption Under Review]",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) Teamleden raken in paniek door foutieve interpretatie van modeloutput (Danger Rating: 7) [Weakness]",
                              dangerRating: 7,
                              level: "Unfortunately",
                              status: GoShield
                            }
                          ]
                        }
                      ]
                    }
              ]
            }
              ]
            },
          ]
        },

        // Branch D – Retraining & Model Drift
        {
          name: "(F) Continue training versnelt aanpassing aan nieuwe fraude­patronen [Assumption Under Review]",
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Model drift kan nieuwe, ongeziene fouten introduceren (Danger Rating: 4) [Weakness Under Review]",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Drift-detectiesysteem toegevoegd om modelgedrag te monitoren [Assumption Under Review]",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Driftalarmen veroorzaken alert-moeheid bij engineers (Danger Rating: 20) [Weakness Under Review]",
                      dangerRating: 20,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Prioritering van alerts vermindert mentale belasting [Assumption Under Review]",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) Engineers negeren lage-prioriteitsmeldingen die soms kritiek blijken te zijn (Danger Rating: 8) [Weakness]",
                              dangerRating: 8,
                              level: "Unfortunately",
                              status: GoShield
                            }
                              ]
                        },
                        
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