import { TreeNode } from "./TreeVisualizer";

export const Case1Tree: TreeNode = {
  name: "Central Authentication System implemented",
  dangerRating: 1,
  level: "Fortunately",
  status: null,
  children: [
    {
      name: "Only password support increases credential theft risk",
      dangerRating: 3,
      level: "Unfortunately",
      status: null,
      children: [
        // Branch A – MFA path
        {
          name: "MFA planned increasing security",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "MFA causes inconvenience and support load",
              dangerRating: 2,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "New UX flow with biometrics reduces friction",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Biometrics introduce GDPR/privacy issues",
                      dangerRating: 4,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                },
                {
                  name: "Users receive optional MFA bypass codes for travel situations",
                  dangerRating: 3,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Bypass codes can be reused if leaked",
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
          name: "Team adds detailed login attempt logging",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "High-volume logs increase storage costs and require monitoring",
              dangerRating: 2,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Automated anomaly detection flags suspicious IPs",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Blocking suspicious IPs risks blocking legitimate VPN users",
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
          name: "Team strengthens password policy (length, rotation, complexity)",
          dangerRating: 2,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "More complex passwords increase user frustration",
              dangerRating: 3,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Password manager rollout improves usability",
                  dangerRating: 1,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Some employees refuse to adopt password managers",
                      dangerRating: 2,
                      level: "Unfortunately",
                      status: null
                    }
                  ]
                }
              ]
            },
            {
              name: "Frequent password rotation leads to predictable patterns",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Team removes mandatory rotation and switches to risk-based resets",
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
          name: "External auth provider added for SSO compatibility",
          dangerRating: 1,
          level: "Fortunately",
          status: null,
          children: [
            {
              name: "Provider downtime can lock out all employees",
              dangerRating: 4,
              level: "Unfortunately",
              status: null,
              children: [
                {
                  name: "Team sets up on-prem fallback auth server",
                  dangerRating: 2,
                  level: "Fortunately",
                  status: null,
                  children: [
                    {
                      name: "Running dual systems adds maintenance and sync issues",
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