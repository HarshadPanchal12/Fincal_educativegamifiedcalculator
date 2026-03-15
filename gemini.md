FinCal Innovation Hackathon: Analysis & Strategy
Based on the FinCal Innovation Hackathon document for TECHNEX 26, here is a detailed analysis of the project path, a structured gemini.md to guide your development, and the best-suited technical implementation strategy.
+1

1. Project Path: The Road to Deployment
To succeed, your team must move from financial logic to a WCAG-compliant, HDFC-branded application.
+2


Selection & Logic Validation: Choose one of the five permitted categories (e.g., Retirement or Top-Up SIP) and implement the provided industry-standard formulas.
+1


Core Development (Next.js): Build the frontend using Next.js 15.5.9 as mandated, focusing on a "user-editable" assumption model.
+3


Accessibility Audit: Implement WCAG 2.1 AA standards from day one, including ARIA roles and keyboard navigation.
+1


Compliance & Branding: Apply the specific HDFC color palette (#224c87, #da3832) and mandatory disclaimers.
+1


Integration & Testing: Ensure the backend is Node-compatible and the UI is responsive across desktop, tablet, and mobile.
+1

2. Gemini.md (System Instructions)
Use the following Markdown structure as a "System Prompt" or "Context File" when using Gemini to help you write code. This ensures the AI adheres to the strict hackathon rules.

Markdown
# FinCal Hackathon Context: "FinCal Innovation"

## Core Objective
[cite_start]Build an intuitive, investor-friendly financial calculator for HDFC Mutual Fund that simplifies mutual fund concepts responsibly[cite: 8].

## Mandatory Rules
- [cite_start]**Category:** Only ONE of: SIP, SWP, Top-Up SIP, Goal-Based, or Retirement [cite: 16-21].
- [cite_start]**Tech Stack:** Next.js (15.5.9), Node.js (22.11.0), NPM (10.9.0), PHP (8.1), MySQL [cite: 161-166].
- **Tone:** Educational, illustrative, NOT predictive. [cite_start]No "guaranteed" language[cite: 46, 47].
- [cite_start]**Accessibility:** WCAG 2.1 AA (Semantic HTML, ARIA, high contrast) [cite: 170-172].

## Branding Guidelines
- [cite_start]**Colors:** Blue (#224c87), Red (#da3832), Grey (#919090) [cite: 197-199].
- [cite_start]**Fonts:** Montserrat, Arial, Verdana [cite: 201-203].
- [cite_start]**Visuals:** NO growth arrows or currency imagery[cite: 204].

## Mandatory Disclaimer
[cite_start]"This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market..."[cite: 191, 192].
3. Best-Suited Tech Stack
The document provides a Mandatory Technology Stack. To maximize your "Technical Quality" (15%) and "Responsiveness" (10%) scores, use these specific tools:
+1

Frontend (The Core)

Framework: Next.js 15.5.9 (using the App Router for better performance).
+1


Styling: Tailwind CSS (to easily manage the specific Hex codes and responsive breakpoints).
+1


Components: Radix UI or Shadcn/ui (highly recommended for achieving the mandatory WCAG 2.1 AA compliance out of the box).


Forms: React Hook Form with Zod (to handle "user-editable" assumptions and validation).
+1

Backend & Database

Runtime: Node.js 22.11.0.

API: Next.js Route Handlers (Serverless functions) for calculation logic or database fetching.


CMS Integration: Drupal 10.5.6 with PHP 8.1 (if you need to pull educational content or manage disclaimer text dynamically).
+1


Database: MySQL (for logging anonymized usage or saving user-defined "Goal" templates).

Calculation Logic (Example: Goal-Based)
Ensure your logic follows the exact order specified in the PDF :


Step 1: FV=PresentCost×(1+Inflation) 
Years
 .


Step 2: RequiredSIP= 
((1+r) 
n
 −1)×(1+r)
FV×r
​
 .


Would you like me to generate a starter Next.js component for one of the specific calculators, like the Retirement or Top-Up SIP, using the mandatory math formulas? 
+1