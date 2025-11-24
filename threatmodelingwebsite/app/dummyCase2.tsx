import { TreeNode } from "./TreeVisualizer";

export const Case2Tree: TreeNode = {
  name: "ML-model detecteert frauduleuze transacties",
  dangerRating: 2,
  level: "Fortunately",
  status: null,
  children: [
    {
      name: "Hoge false positives blokkeren legitieme gebruikers",
      dangerRating: 4,
      level: "Unfortunately",
      status: null,
      children: [

        // Branch A – Improving Model Accuracy
        {
          name: "Meer historische data verhoogt de nauwkeurigheid",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Historische data introduceert privacy- en compliance-risico’s",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Data wordt geanonimiseerd vóór training",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Anonimisatie vermindert detail in features en verlaagt prestaties",
                      dangerRating: 10,
                      level: "Unfortunately",
                      status: null,
                      children: [
                        {
                          name: "Feature engineering verbetert prestaties op een veilige manier",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: null
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
          status: null,
          children: [
            {
              name: "Realtime detectie verbruikt veel rekenkracht",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Systeem optimaliseert door laag-risico transacties te batchen",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Batching veroorzaakt vertraging bij transacties met gemiddeld risico",
                      dangerRating: 2,
                      level: "Unfortunately",
                      status: null
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
          status: null,
          children: [
            {
              name: "Uitlegbaarheid onthult gevoelige modellogica aan interne medewerkers",
              dangerRating: 22,
              level: "Unfortunately",
              status: null,
              children: [
              ]
            },
            {
              name: "Alternatieve aanpak: beperkte uitleg beschikbaar voor enkel senior teamleden",
              dangerRating: 2,
              level: "Fortunately",
              status: null,
              children: [
                {
                  name: "Beperkte uitleg vermindert risico op blootstelling van gevoelige logica",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Junior teamleden interpreteren beslissingen op hun eigen manier",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: null,
                      children: [
                        {
                          name: "Bespreken de beslissingen in een volgende vergadering",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: null
                        },
                        {
                          name: "Junior teamleden besluiten alle servers uit te schakelen om fraude te stoppen",
                          dangerRating: 1,
                          level: "Fortunately",
                          status: null
                        }
                      ]
                    }
                  ]
                }
              ]
            }
            
          ]
        },

        // Branch D – Retraining & Model Drift
        {
          name: "Continue training versnelt aanpassing aan nieuwe fraude­patronen",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Model drift kan nieuwe, ongeziene fouten introduceren",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Drift-detectiesysteem toegevoegd om modelgedrag te monitoren",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Driftalarmen veroorzaken alert-moeheid bij engineers",
                      dangerRating: 20,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    }
  ]
};
