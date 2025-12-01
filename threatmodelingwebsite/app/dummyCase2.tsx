import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case2Tree: TreeNode = {
  name: "(F) ML-model detecteert frauduleuze transacties",
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
          name: "(F) Meer historische data verhoogt de nauwkeurigheid [Completed]",
          level: "Fortunately",
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
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "(U) Uitlegbaarheid onthult gevoelige modellogica aan interne medewerkers (Danger Rating: 22) [Weakness]",
              dangerRating: 22,
              level: "Unfortunately",
              status: GoShield,
            },
          ]
        },

        // Branch D – Retraining & Model Drift
        {
          name: "(F) Continue training versnelt aanpassing aan nieuwe fraude­patronen [Assumption Under Review]",
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
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "(U) Engineers negeren lage-prioriteitsmeldingen die soms kritiek blijken te zijn (Danger Rating: 8) [Weakness]",
                              dangerRating: 8,
                              level: "Unfortunately",
                              status: GoShield,
                              children: [
                                {
                                  name: "(F) Aanpassing van thresholds en periodieke review van alert policies [Verified Assumption]",
                                  level: "Fortunately",
                                  status: GoShieldCheck,
                                  statusColor: "green"
                                },
                                {
                                  name: "(F) Automatische correlatie van alerts om redundantie te verminderen [Verified Assumption]",
                                  level: "Fortunately",
                                  status: GoShieldCheck,
                                  statusColor: "green"
                                }
                              ]
                            }
                              ]
                        },
                        
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "(U) Onjuiste of verouderde trainingsdata beïnvloedt modelprestaties negatief (Danger Rating: 15) [Weakness Under Review]",
              dangerRating: 15,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Data-validatie en preprocessing pipeline toegevoegd [Assumption Under Review]",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Fouten in preprocessing kunnen bias in model introduceren (Danger Rating: 12) [Weakness Under Review]",
                      dangerRating: 12,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Regelmatige peer-reviews van data pipelines [Verified Assumption]",
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
              name: "(U) Continue retraining kan compliance regels overtreden (bijv. GDPR, bias) (Danger Rating: 18) [Weakness Under Review]",
              dangerRating: 18,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "(F) Model audits en fairness checks ingevoerd [Assumption Under Review]",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "(U) Audits verhogen administratieve overhead (Danger Rating: 6) [Weakness Under Review]",
                      dangerRating: 6,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "(F) Automatische audit-rapporten genereren [Verified Assumption]",
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