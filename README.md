# NyxPortal

> One place. Every relationship. Total clarity.

NyxPortal is a white-label client portal that gives your customers a single, branded place to log in and see everything relevant to your relationship — active projects, outstanding invoices, signed documents, support tickets, and communications.

Built to tie together **Aegis**, **Ledger**, **Scribe**, **Haven**, and **Forge** into one clean client-facing view.

## Key Features

- **Branded Client Login** — White-label login with your company's name, logo, and colors
- **Project & Milestone View** — Track active projects with progress bars and milestone status
- **Invoice & Payment Status** — See outstanding, paid, and overdue invoices with one-click payment
- **Document & Signature Access** — View and sign documents via Scribe integration
- **Support Ticket Visibility** — Open and track support tickets via Haven integration
- **NyxCollective Suite Integration** — Connects Aegis, Ledger, Scribe, Haven, and Forge
- **License Portal** — Manage product licenses, seat usage, and renewal dates
- **White-Label Clone** — Full branding customization including colors, logo, and custom domain

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to the login page.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── login/          # Branded client login page
│   └── dashboard/
│       ├── page.tsx         # Overview / home
│       ├── projects/        # Projects & milestones
│       ├── invoices/        # Invoices & payments
│       ├── documents/       # Documents & signatures
│       ├── tickets/         # Support tickets
│       ├── integrations/    # NyxCollective Suite connections
│       ├── licenses/        # License portal
│       └── settings/        # White-label configuration
├── components/
│   ├── layout/         # Sidebar & TopBar
│   └── ui/             # LoginForm and reusable UI
├── lib/
│   └── data.ts         # Mock data and brand configuration
└── types/
    └── index.ts        # TypeScript type definitions
```

## Powered by NyxCollective Suite

NyxPortal integrates with the full NyxCollective product suite:

| Product | Description |
|---------|-------------|
| 🛡️ **Aegis** | Identity management, SSO, and access control |
| 📒 **Ledger** | Invoice generation and payment processing |
| ✍️ **Scribe** | Document management and e-signatures |
| 🏠 **Haven** | Help desk and customer support |
| ⚒️ **Forge** | Project management and collaboration |
