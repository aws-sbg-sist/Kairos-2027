# KAIROS 2027 — AWS Deployment Architecture & Cost Control Guide

> **Target Budget:** ~$100 in AWS Credits  
> **Philosophy:** Ultra-low-cost, high-reliability serverless deployment with AWS Free Tier maximization.

---

## 1. Architecture Overview

For a 48-hour national student hackathon with ~2,000 national applicants and 400 on-campus attendees, a microservice or multi-cluster architecture is unnecessarily expensive. Instead, KAIROS 2027 leverages **AWS Amplify Hosting (Next.js SSR support)** paired with **Amazon DynamoDB** and **Amazon SES**.

```mermaid
graph TD
    User([Visitor / Participant / Sponsor]) -->|HTTPS / Route 53| CloudFront[AWS CloudFront Global CDN]
    CloudFront -->|SSR Pages & APIs| Amplify[AWS Amplify Hosting - Next.js 14 App Router]
    CloudFront -->|Static Media & PDFs| S3[Amplify Managed S3 Asset Bucket]
    
    Amplify -->|Waitlist & Flag State| Dynamo[(Amazon DynamoDB / KV Store)]
    Amplify -->|Confirmation Emails| SES[Amazon Simple Email Service (SES)]
    
    Admin([Organizing Committee Lead]) -->|HMAC Session Cookie| Amplify
```

---

## 2. AWS Cost Model & Credit Utilization ($100 Budget)

| AWS Service | Usage Assumption | Monthly Cost (Free Tier Applied) | 4-Month Total (Oct 2026 – Feb 2027) | Cost Risk Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **AWS Amplify Hosting** | 100 GB Data Out, 1,200 Build Mins | ~$3.00 / month | ~$12.00 | Free Tier covers 1,000 build mins & 15 GB served/mo. Static assets cached on CloudFront edge. |
| **Amazon DynamoDB** | ~5,000 items (Waitlist + Sponsors + Flags) | **$0.00 / month** | **$0.00** | Perpetually Free Tier includes 25 GB storage, 25 WCU, and 25 RCU in On-Demand/Provisioned mode. |
| **Amazon SES** | ~2,500 transactional emails | **$0.00 to $0.25** | **~$1.00** | Free Tier includes 62,000 outbound emails/mo when sent from an EC2/Amplify instance ($0.10/1k otherwise). |
| **Amazon CloudWatch** | Execution logs & alarms | ~$0.50 / month | ~$2.00 | 5 GB ingestion & 10 custom metrics included free. |
| **AWS Route 53** | 1 Hosted Zone (kairos2027.in) | $0.50 / month | $2.00 | Standard fixed zone charge. |
| **Total Estimated Spend** | Full campaign lifecycle | **~$4.00 – $5.00 / mo** | **~$17.00 Total** | **Remaining $83.00 credit buffer preserves complete safety!** |

---

## 3. Step-by-Step AWS Deployment

### Step 1: Connect Code to AWS Amplify

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/) in region `ap-south-1` (Mumbai) or `us-east-1`.
2. Navigate to **AWS Amplify** → Click **Create new app** → Select **Host web app**.
3. Link your Git repository (GitHub / AWS CodeCommit).
4. Select the `main` branch.
5. Amplify automatically detects **Next.js - SSR**. Verify the build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci --prefer-offline
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```

### Step 2: Configure Environment Variables

Under **App Settings** → **Environment variables**, set:
- `ADMIN_MASTER_SECRET`: Your production random 32-character secret passkey.
- `AWS_SES_REGION`: `ap-south-1`
- `AWS_SES_FROM_EMAIL`: `sistawscc@gmail.com`
- `NEXT_PUBLIC_APP_URL`: `https://your-custom-domain.com`

### Step 3: Domain Association

Under **App Settings** → **Domain management**, add your registered event domain (e.g. `kairos2027.in`). Amplify automatically issues and auto-renews a free SSL/TLS certificate through AWS Certificate Manager (ACM).

---

## 4. Mandatory AWS Budget & Cost Alert Configuration

To prevent unintended spend, configure an automated AWS Budget immediately:

1. Open **AWS Cost Management** → **Budgets**.
2. Click **Create budget** → Choose **Cost budget (recommended)**.
3. Budget name: `KAIROS_2027_Safety_Budget`
4. Set budget amount: **$25.00 USD / month** (or $50.00 fixed).
5. Set up 3 alert thresholds:
   - **Alert 1 (Info):** Trigger at **50% ($12.50)** → Notify `sistawscc@gmail.com`.
   - **Alert 2 (Warning):** Trigger at **80% ($20.00)** → Notify organizing committee leads.
   - **Alert 3 (Critical):** Trigger if forecasted spend exceeds **100% ($25.00)**.
6. *Note:* A budget alert notifies organizers; it is not a hard spending cap. AWS does not support automated billing cut-offs without custom Lambda actions.

---

## 5. Security & Privacy Safeguards

- **Zero Participant Data Exposure:** Early-interest contact records and student phone numbers are strictly protected behind server-side session authentication (`/api/admin`).
- **No Client Secrets:** No AWS IAM secret access keys or master passkeys are exposed in client-side bundles.
- **Audit Logging:** Every flag change, sponsor status transition, and data export is timestamped with the acting organizer's name in `data/kairos_store.json`.
