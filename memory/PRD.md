# Vyra Drive App - Product Requirements Document

## Overview
Vyra Drive is a specialized driver fleet management app designed for in-vehicle use. It transforms manual fleet operations into a data-driven, automated platform ensuring operational transparency and maximizing vehicle utilization.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, shadcn/ui, Framer Motion, Recharts
- **Design**: Dark theme optimized for in-vehicle use, Space Grotesk + Inter typography
- **Backend**: FastAPI (prototype uses MOCK data)

## Design System
- **Primary**: Teal/Emerald (HSL 162 72% 46%) - Safety, GO, Active states
- **Accent**: Amber (HSL 38 92% 50%) - Warnings, alerts
- **Background**: Deep dark (HSL 225 20% 7%) - Easy on eyes while driving
- **Surface**: Elevated dark cards (HSL 225 18% 10%)

## Implemented Modules

### 1. Dashboard
- Safety check-in banner with dismissable alerts
- Shift status card (Morning/Evening with progress bar)
- Today's earnings widget with real-time updates
- Stats grid (KM, Hours, Rating, Fuel, Efficiency, Accept Rate)
- Active trip card with route visualization
- Quick actions grid (6 actions)
- Recent trips preview

### 2. Shift Management
- Current shift detail with timeline & progress
- Photo check-in with geofence verification
- Handover checklist and completion flow
- Corporate duty management with B2B pickup schedules
- Today's schedule overview (Morning/Evening shifts)

### 3. Trips & Rides
- Trip history with expandable details
- Smart Notification Reader (Ola/Uber ride opportunities)
- GPS tracking visualization with route SVG
- Trip statistics (speed, GPS points, route match)

### 4. Earnings
- Today's earnings overview with trend badge
- Weekly bar chart trend visualization
- Detailed pay breakdown (Base Pay, KM Incentive, Bonuses)
- Weekly payout summary

### 5. CNG & Expenses
- Fuel efficiency gauge with bonus indicator
- Fuel fill logging form with receipt upload
- Fuel log history with efficiency badges
- All expenses list (fuel, toll, parking, repair)

### 6. Safety & Communication
- Emergency SOS button with live location sharing
- Mandatory 2-hour safety check-ins
- Communication hub with fleet admin messaging
- Emergency call buttons (Owner, 112)

## Status
- **Frontend Prototype**: COMPLETE (all MOCK data, no backend integration)
- **All 6 pages functional with interactive elements**
- **Mobile-responsive with bottom navigation**
