import { TreeNode } from "./TreeVisualizer";
import { GoShield, GoShieldCheck } from "react-icons/go";

export const Case2Tree: TreeNode = {
  name: "ML-model detecteert frauduleuze transacties",
  dangerRating: 2,
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
          dangerRating: 1,
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
                  dangerRating: 2,
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
                          dangerRating: 1,
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
          name: "Realtime waarschuwingen voorkomen financiële schade",
          dangerRating: 1,
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
                  dangerRating: 1,
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
                  name: "Hardware wordt opgeschaald tijdens piekmomenten",
                  dangerRating: 1,
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
          dangerRating: 1,
          level: "Fortunately",
          status: GoShieldCheck,
          children: [
            {
              name: "Uitlegbaarheid onthult gevoelige modellogica aan interne medewerkers",
              dangerRating: 22,
              level: "Unfortunately",
              status: GoShield,
              children: [
                {
                  name: "Toegang wordt beperkt tot geverifieerde accounts",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: GoShieldCheck,
                  children: [
                    {
                      name: "Accountbeheer veroorzaakt administratieve overhead",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield
                    }
                  ]
                },
                {
              name: "Alternatieve aanpak: beperkte uitleg beschikbaar voor enkel senior teamleden",
              dangerRating: 2,
              level: "Fortunately",
              status: GoShieldCheck,
              children: [
                {
                      name: "Junior teamleden interpreteren beslissingen op hun eigen manier",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: GoShield,
                      children: [
                        {
                          name: "Bespreken de beslissingen in een volgende vergadering",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          statusColor: "green"
                        },
                        {
                          name: "Junior teamleden besluiten alle servers uit te schakelen om fraude te stoppen",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "Teamleden raken in paniek door foutieve interpretatie",
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
          name: "Continue training versnelt aanpassing aan nieuwe fraude­patronen",
          dangerRating: 1,
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
                  dangerRating: 1,
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
                          dangerRating: 1,
                          level: "Fortunately",
                          status: GoShieldCheck,
                          children: [
                            {
                              name: "Engineers negeren lage-prioriteitsmeldingen die soms kritiek blijken",
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