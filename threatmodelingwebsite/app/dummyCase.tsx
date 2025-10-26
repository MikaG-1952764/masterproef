import { TreeNode } from "./TreeVisualizer";

export const securityTreeData: TreeNode = {
  name: "Maintain Secure IT Infrastructure",
  level: "fortunate",
  dangerRating: 0,
  children: [
    {
      name: "Cyber Threats and Vulnerabilities",
      level: "unfortunate",
      dangerRating: 0,
      children: [
        {
          name: "Phishing and Social Engineering",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Employees fall for fraudulent emails",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                {
                  name: "Implement security awareness training",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    {
                      name: "Monthly refresher courses",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Track attendance", level: "fortunate", dangerRating: 0 },
                        { name: "Provide feedback surveys", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                    {
                      name: "Gamify learning for engagement",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Award points for completion", level: "fortunate", dangerRating: 0 },
                        { name: "Leaderboards per department", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                    {
                      name: "Quarterly phishing quizzes",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Score reports to managers", level: "fortunate", dangerRating: 0 },
                        { name: "Identify repeat offenders", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
                {
                  name: "Simulate phishing attacks regularly",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Track success rates per department", level: "unfortunate", dangerRating: 0 },
                    { name: "Reward cautious behavior", level: "unfortunate", dangerRating: 0 },
                    { name: "Update scenarios monthly", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "No verification for email authenticity",
              level: "fortunate",
              dangerRating: 0,
              children: [
                { name: "Deploy DKIM/SPF/DMARC for email validation", level: "unfortunate", dangerRating: 0 },
                {
                  name: "Use advanced spam filters",
                  level: "unfortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Regular filter rule updates", level: "fortunate", dangerRating: 0 },
                    { name: "Monitor false positives", level: "fortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Unpatched Systems and Software",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Systems left vulnerable due to slow updates",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                {
                  name: "Automate patch management",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Weekly patch verification", level: "unfortunate", dangerRating: 0 },
                    { name: "Document patch history", level: "unfortunate", dangerRating: 0 },
                  ],
                },
                {
                  name: "Conduct regular vulnerability scans",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Generate weekly scan reports", level: "unfortunate", dangerRating: 0 },
                    { name: "Prioritize high-risk vulnerabilities", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "Follow up on remediation tasks",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Track completion deadlines", level: "fortunate", dangerRating: 0 },
                        { name: "Verify fixes with re-scans", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "Unsupported legacy applications in use",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Migrate to maintained alternatives", level: "fortunate", dangerRating: 0 },
                {
                  name: "Isolate legacy systems in secure subnetworks",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Regular security checks", level: "unfortunate", dangerRating: 0 },
                    { name: "Segmentation review quarterly", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "Restrict external access",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Monitor firewall logs", level: "fortunate", dangerRating: 0 },
                        { name: "Implement VPN-only access", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Weak Authentication and Access Control",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Password reuse and weak credentials",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Implement multi-factor authentication", level: "fortunate", dangerRating: 0 },
                { name: "Enforce strong password policies", level: "fortunate", dangerRating: 0 },
              ],
            },
            {
              name: "Privilege misuse or overexposure",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Apply least-privilege principle", level: "fortunate", dangerRating: 0 },
                {
                  name: "Review permissions regularly",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Quarterly access audits", level: "unfortunate", dangerRating: 0 },
                    { name: "Remove dormant accounts promptly", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "Document access changes",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Share with compliance team", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Operational Resilience",
      level: "unfortunate",
      dangerRating: 0,
      children: [
        {
          name: "Downtime caused by ransomware attacks",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Inadequate data backup strategy",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Use automated cloud backups", level: "fortunate", dangerRating: 0 },
                { name: "Test restore procedures quarterly", level: "fortunate", dangerRating: 0 },
                {
                  name: "Keep offline backup copies",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Monthly offline backup verification", level: "unfortunate", dangerRating: 0 },
                    { name: "Store backups in different geographic location", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "Unmonitored network traffic",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Deploy intrusion detection systems", level: "fortunate", dangerRating: 0 },
                {
                  name: "Use behavioral monitoring tools",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "AI-driven anomaly detection", level: "unfortunate", dangerRating: 0 },
                    { name: "Regular fine-tuning of detection rules", level: "unfortunate", dangerRating: 0 },
                    { name: "Integrate SIEM alerts", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "Simulate attack traffic for testing",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Quarterly red-team exercises", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Incident Handling and Recovery",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "No defined incident response plan",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Develop and document response procedures", level: "fortunate", dangerRating: 0 },
                { name: "Run tabletop exercises with teams", level: "fortunate", dangerRating: 0 },
                {
                  name: "Update plan based on new threats",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Review quarterly", level: "unfortunate", dangerRating: 0 },
                    { name: "Train new staff on updates", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "Poor post-incident analysis",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Collect forensic logs", level: "fortunate", dangerRating: 0 },
                {
                  name: "Update controls based on lessons learned",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Share lessons across departments", level: "unfortunate", dangerRating: 0 },
                    { name: "Revise policies annually", level: "unfortunate", dangerRating: 0 },
                    { name: "Adjust monitoring thresholds", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Compliance and Governance",
      level: "unfortunate",
      dangerRating: 0,
      children: [
        {
          name: "Unclear security policies and roles",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Lack of employee accountability",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Define security responsibilities in job roles", level: "fortunate", dangerRating: 0 },
                {
                  name: "Conduct annual policy reviews",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Update with regulatory changes", level: "unfortunate", dangerRating: 0 },
                    { name: "Communicate revisions to all staff", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "Document acknowledgment from employees",
                      level: "unfortunate",
                      dangerRating: 0,
                      children: [
                        { name: "Audit acknowledgments yearly", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Regulatory and Privacy Risks",
          level: "fortunate",
          dangerRating: 0,
          children: [
            {
              name: "Failure to comply with GDPR",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Implement data retention policies", level: "fortunate", dangerRating: 0 },
                { name: "Train employees on data handling", level: "fortunate", dangerRating: 0 },
                {
                  name: "Audit GDPR compliance",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Quarterly internal audits", level: "unfortunate", dangerRating: 0 },
                    { name: "Annual external audit", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "Incomplete breach reporting process",
              level: "unfortunate",
              dangerRating: 0,
              children: [
                { name: "Automate breach detection notifications", level: "fortunate", dangerRating: 0 },
                { name: "Maintain contact with regulatory bodies", level: "fortunate", dangerRating: 0 },
                {
                  name: "Review incident reporting workflow",
                  level: "fortunate",
                  dangerRating: 0,
                  children: [
                    { name: "Simulate breach reporting quarterly", level: "unfortunate", dangerRating: 0 },
                    { name: "Document reporting improvements", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
