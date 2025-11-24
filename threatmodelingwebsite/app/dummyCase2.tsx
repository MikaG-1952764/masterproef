import { TreeNode } from "./TreeVisualizer";


export const Case2Tree: TreeNode = {
  name: "ML model detects fraudulent transactions",
  dangerRating: 2,
  level: "Fortunately",
  status: null,
  children: [
    {
      name: "High false positives block legitimate users",
      dangerRating: 4,
      level: "Unfortunately",
      status: null,
      children: [

        // Branch A – Improving Model Accuracy
        {
          name: "More historical data improves accuracy",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Historical data introduces privacy/compliance risk",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Data anonymized before training",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Anonymisation reduces feature detail and performance",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: null,
                      children: [
                        {
                          name: "Feature engineering improves performance safely",
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
          name: "Real-time alerts prevent financial damage",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Real-time detection consumes high compute resources",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "System is optimized to batch low-risk transactions",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Batching introduces delay in medium-risk transactions",
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
          name: "Team adds explainability tools to clarify model decisions",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Explainability reveals sensitive model logic to internal employees",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Access control added to restrict explanation visibility",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null
                }
              ]
            }
          ]
        },

        // Branch D – Retraining & Model Drift
        {
          name: "Continuous training speeds adaptation to new fraud patterns",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Model drift may introduce unseen errors",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Drift detection system added to monitor model behavior",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Drift alarms cause alert fatigue for engineers",
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

        // Branch E – False Negatives (Missed Fraud)
        {
          name: "Model tuned to reduce false negatives (missed fraud)",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Lowering false negatives increases false positives again",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Risk-based scoring separates urgent and low-risk alerts",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Risk scoring depends heavily on correct metadata",
                      dangerRating: 3,
                      level: "Unfortunately",
                      status: null
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