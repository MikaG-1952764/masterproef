import { TreeNode } from "./TreeVisualizer";

export const securityTreeData: TreeNode = {
  name: "[F] Maintain Secure IT Infrastructure",
  level: "fortunate",
  dangerRating: 0,
  children: [
    {
      name: "[U] Cyber Threats and Vulnerabilities",
      level: "unfortunate",
      dangerRating: 0,
      _children: [
        {
          name: "[F] Phishing and Social Engineering",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Employees fall for fraudulent emails",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                {
                  name: "[F] Implement security awareness training",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    {
                      name: "[U] Monthly refresher courses",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Track attendance", level: "fortunate", dangerRating: 0 },
                        { name: "[F] Provide feedback surveys", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                    {
                      name: "[U] Gamify learning for engagement",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Award points for completion", level: "fortunate", dangerRating: 0 },
                        { name: "[F] Leaderboards per department", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                    {
                      name: "[U] Quarterly phishing quizzes",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Score reports to managers", level: "fortunate", dangerRating: 0 },
                        { name: "[F] Identify repeat offenders", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
                {
                  name: "[F] Simulate phishing attacks regularly",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Track success rates per department", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Reward cautious behavior", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Update scenarios monthly", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "[U] No verification for email authenticity",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Deploy DKIM/SPF/DMARC for email validation", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Use advanced spam filters",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Regular filter rule updates", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Monitor false positives", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "[F] Unpatched Systems and Software",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Systems left vulnerable due to slow updates",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                {
                  name: "[F] Automate patch management",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Weekly patch verification", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Document patch history", level: "unfortunate", dangerRating: 0 },
                  ],
                },
                {
                  name: "[F] Conduct regular vulnerability scans",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Generate weekly scan reports", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Prioritize high-risk vulnerabilities", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "[U] Follow up on remediation tasks",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Track completion deadlines", level: "fortunate", dangerRating: 0 },
                        { name: "[F] Verify fixes with re-scans", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "[U] Unsupported legacy applications in use",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Migrate to maintained alternatives", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Isolate legacy systems in secure subnetworks",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Regular security checks", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Segmentation review quarterly", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "[U] Restrict external access",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Monitor firewall logs", level: "fortunate", dangerRating: 0 },
                        { name: "[F] Implement VPN-only access", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "[F] Weak Authentication and Access Control",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Password reuse and weak credentials",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Implement multi-factor authentication", level: "fortunate", dangerRating: 0 },
                { name: "[F] Enforce strong password policies", level: "fortunate", dangerRating: 0 },
              ],
            },
            {
              name: "[U] Privilege misuse or overexposure",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Apply least-privilege principle", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Review permissions regularly",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Quarterly access audits", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Remove dormant accounts promptly", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "[U] Document access changes",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Share with compliance team", level: "fortunate", dangerRating: 0 },
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
      name: "[U] Operational Resilience",
      level: "unfortunate",
      dangerRating: 0,
      _children: [
        {
          name: "[F] Downtime caused by ransomware attacks",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Inadequate data backup strategy",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Use automated cloud backups", level: "fortunate", dangerRating: 0 },
                { name: "[F] Test restore procedures quarterly", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Keep offline backup copies",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Monthly offline backup verification", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Store backups in different geographic location", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "[U] Unmonitored network traffic",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Deploy intrusion detection systems", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Use behavioral monitoring tools",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] AI-driven anomaly detection", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Regular fine-tuning of detection rules", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Integrate SIEM alerts", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "[U] Simulate attack traffic for testing",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Quarterly red-team exercises", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "[F] Incident Handling and Recovery",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] No defined incident response plan",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Develop and document response procedures", level: "fortunate", dangerRating: 0 },
                { name: "[F] Run tabletop exercises with teams", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Update plan based on new threats",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Review quarterly", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Train new staff on updates", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "[U] Poor post-incident analysis",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Collect forensic logs", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Update controls based on lessons learned",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Share lessons across departments", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Revise policies annually", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Adjust monitoring thresholds", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "[U] Compliance and Governance",
      level: "unfortunate",
      dangerRating: 0,
      _children: [
        {
          name: "[F] Unclear security policies and roles",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Lack of employee accountability",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Define security responsibilities in job roles", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Conduct annual policy reviews",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Update with regulatory changes", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Communicate revisions to all staff", level: "unfortunate", dangerRating: 0 },
                    {
                      name: "[U] Document acknowledgment from employees",
                      level: "unfortunate",
                      dangerRating: 0,
                      _children: [
                        { name: "[F] Audit acknowledgments yearly", level: "fortunate", dangerRating: 0 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "[F] Regulatory and Privacy Risks",
          level: "fortunate",
          dangerRating: 0,
          _children: [
            {
              name: "[U] Failure to comply with GDPR",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Implement data retention policies", level: "fortunate", dangerRating: 0 },
                { name: "[F] Train employees on data handling", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Audit GDPR compliance",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Quarterly internal audits", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Annual external audit", level: "unfortunate", dangerRating: 0 },
                  ],
                },
              ],
            },
            {
              name: "[U] Incomplete breach reporting process",
              level: "unfortunate",
              dangerRating: 0,
              _children: [
                { name: "[F] Automate breach detection notifications", level: "fortunate", dangerRating: 0 },
                { name: "[F] Maintain contact with regulatory bodies", level: "fortunate", dangerRating: 0 },
                {
                  name: "[F] Review incident reporting workflow",
                  level: "fortunate",
                  dangerRating: 0,
                  _children: [
                    { name: "[U] Simulate breach reporting quarterly", level: "unfortunate", dangerRating: 0 },
                    { name: "[U] Document reporting improvements", level: "unfortunate", dangerRating: 0 },
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
