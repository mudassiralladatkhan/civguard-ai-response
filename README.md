<div align="center">

# 🚨 CivGuard AI

### AI-Powered Emergency Response & Disaster Management Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![TanStack](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)

<br/>

**Real-time crisis coordination platform that automates emergency triage, resource allocation, and multi-agency response.**

[Features](#-features) · [Architecture](#-architecture) · [Setup](#-quick-start)

---

</div>

## 🎯 Problem Statement

During natural disasters and emergencies, coordination between agencies is chaotic, resource allocation is manual, and response times suffer. CivGuard AI uses artificial intelligence to:

- **Automate triage** — prioritize incoming emergency reports by severity
- **Optimize resources** — recommend allocation based on availability and proximity
- **Coordinate response** — real-time dashboard for multi-agency visibility
- **Reduce response time** — AI-driven decision support eliminates human bottlenecks

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Live Dashboard** | Real-time emergency status, resource tracking, and incident map |
| 🚨 **Incident Reporting** | Citizens report emergencies with location, type, and severity |
| 🤖 **AI Triage** | Automated severity classification and priority assignment |
| 🏥 **Resource Allocation** | AI recommendations for deploying ambulances, fire units, police |
| 👥 **Multi-Agency View** | Shared situational awareness across fire, medical, police teams |
| 🔐 **Role-Based Access** | Login/Register with role-specific dashboards |
| 📈 **Analytics** | Historical incident data, response time trends, and heatmaps |
| 🔔 **Real-time Updates** | Supabase Realtime for live incident status changes |

---

## 🛠 Tech Stack

```
Frontend:       React 18 + TypeScript + Vite
State:          TanStack Query v5 (server state) + React Context (auth)
Styling:        Tailwind CSS + Radix UI + shadcn/ui components
Backend:        Supabase (Auth, PostgreSQL, Realtime, Edge Functions)
Charts:         Recharts for analytics
Forms:          React Hook Form + Zod validation
Routing:        React Router DOM v6
Deployment:     Vercel / Netlify
```

---

## 🏗️ Architecture

```
src/
├── pages/
│   ├── Index.tsx            # Landing page
│   ├── Dashboard.tsx        # Main emergency dashboard
│   ├── Login.tsx            # Authentication
│   ├── Register.tsx         # New user registration
│   ├── ReportIssue.tsx      # Citizen incident report form
│   └── NotFound.tsx         # 404 handler
├── components/
│   ├── ui/                  # shadcn/ui design system
│   ├── layout/              # Page layouts, navigation
│   └── ProtectedRoute.tsx   # Auth guard
├── contexts/                # Auth state management
├── hooks/                   # Custom React hooks
├── integrations/            # Supabase client & API layer
└── lib/                     # Utility functions
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/mudassiralladatkhan/civguard-ai-response.git
cd civguard-ai-response

# Install dependencies
npm install

# Configure environment
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env

# Run development server
npm run dev
```

---

## 🧠 AI Decision Flow

```
Incident Reported → Severity Classification (AI)
                        ├── Critical → Immediate dispatch + multi-agency alert
                        ├── High → Priority queue + resource check
                        ├── Medium → Standard queue + nearest unit
                        └── Low → Logged + advisory response

Resource Allocation:
  Available Units × Proximity × Severity × Specialization = Optimal Assignment
```

---

## 🎯 Use Cases

- **Natural disasters** — flood, earthquake, cyclone response coordination
- **Urban emergencies** — fire, medical, law enforcement dispatch
- **Event safety** — large gathering monitoring and incident response
- **Training simulations** — tabletop exercises for emergency responders

---

<div align="center">

**Built with 🚨 by [Mudassir Alladatkhan](https://github.com/mudassiralladatkhan)**

*Faster response. Smarter allocation. Lives saved.*

</div>
