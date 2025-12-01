import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case2Tree: TreeNode = {
  name: "ML-model detecteert frauduleuze transacties",
  level: "Fortunately",
  status: GoShieldCheck,
  children: [
    {
      name: "Hoge false positives blokkeren legitieme gebruikers",
      dangerRating: 4,
      level: "Unfortunately",
      status: GoShield,
      children: [

        // Branch A – Improving Model Accuracy
        {
          name: "Meer historische data verhoogt de nauwkeurigheid",
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Historische data introduceert privacy- en compliance-risico’s",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Data wordt geanonimiseerd vóór training",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Anonimisatie vermindert detail in features en verlaagt prestaties",
                      dangerRating: 10,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Feature engineering verbetert prestaties op een veilige manier",
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "Complexere features vergroten computationele kosten",
                              dangerRating: 3,
                              level: "Unfortunately",
                              status: GoShield,
                              children: [
                                {
                                  name: "Modelcompressie minimaliseert overhead",
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
          name: "Realtime waarschuwingen voorkomen financiële schade",
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Realtime detectie verbruikt veel rekenkracht",
              dangerRating: 3,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Systeem optimaliseert door laag-risico transacties te batchen",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Batching veroorzaakt vertraging bij transacties met gemiddeld risico",
                      dangerRating: 2,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Caching van gemiddeld risico segmenten versnelt verwerking",
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "Hardware wordt opgeschaald tijdens piekmomenten",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Opschalen verhoogt operationele kosten aanzienlijk",
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
          name: "Team voegt uitlegbaarheidstools toe om modelbeslissingen te verduidelijken",
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Uitlegbaarheid onthult gevoelige modellogica aan interne medewerkers",
              dangerRating: 22,
              level: "Unfortunately",
              status: GoShield,
              
            },
          ]
        },

        // Branch D – Retraining & Model Drift
        {
          name: "Continue training versnelt aanpassing aan nieuwe fraude­patronen",
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Model drift kan nieuwe, ongeziene fouten introduceren",
              dangerRating: 4,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Drift-detectiesysteem toegevoegd om modelgedrag te monitoren",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Driftalarmen veroorzaken alert-moeheid bij engineers",
                      dangerRating: 20,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Prioritering van alerts vermindert mentale belasting",
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "Engineers negeren lage-prioriteitsmeldingen die soms kritiek blijken",
                              dangerRating: 8,
                              level: "Unfortunately",
                              status: GoShield,
                              children: [
                                {
                                  name: "Aanpassing van thresholds en periodieke review van alert policies",
                                  level: "Fortunately",
                                  status: GoShieldCheck,
                                  statusColor: "green"
                                },
                                {
                                  name: "Automatische correlatie van alerts om redundantie te verminderen",
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
              name: "Onjuiste of verouderde trainingsdata beïnvloedt modelprestaties",
              dangerRating: 15,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Data-validatie en preprocessing pipeline toegevoegd",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Fouten in preprocessing kunnen bias in model introduceren",
                      dangerRating: 12,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Regelmatige peer-reviews van data pipelines",
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
              name: "Continue retraining kan compliance regels overtreden (bijv. GDPR, bias)",
              dangerRating: 18,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Model audits en fairness checks ingevoerd",
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Audits verhogen administratieve overhead",
                      dangerRating: 6,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Automatische audit-rapporten genereren",
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
