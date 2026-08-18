# Al-Shifa Medical Complex

GitHub-ready project worklog and handoff notes for the hospital management system.

## Project Summary

Al-Shifa Medical Complex is a role-based hospital management system built with Next.js. It supports public hospital pages, authentication, patient onboarding, appointment booking, dashboards, and workflow pages for hospital staff.

## Tech Stack

- Framework: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS, shadcn/ui, lucide-react
- Authentication: NextAuth.js
- Database ORM: Prisma
- Database: SQL Server, configured through `DATABASE_URL`
- State/data helpers: TanStack Query, Zustand
- UI motion: Framer Motion
- Email: Nodemailer

## Main Roles

- Super Admin
- Admin
- Doctor
- Nurse
- Receptionist
- Pharmacist
- Lab Technician
- Patient

## Key Features

- Public website pages for home, about, services, doctors, careers, news, contact, FAQ, privacy policy, and terms of service.
- Login, registration, password reset, email verification, profile, and settings flows.
- Role-based dashboards and layouts.
- Patient appointment booking and medical history screens.
- Admin management pages for users, staff, doctors, patients, departments, appointments, billing, reports, roles, audit logs, and settings.
- Doctor workflow pages for appointments, patients, prescriptions, lab requests, medical records, schedule, and reports.
- Nurse workflow pages for patients, vitals, medications, tasks, schedule, and reports.
- Receptionist workflow pages for appointments, patient registration, billing, and reports.
- Pharmacy workflow pages for inventory, prescriptions, dispensed medicines, and reports.
- Lab workflow pages for test requests, results, uploads, reports, and settings.

## Recent Branding Update

The project branding was updated from the old placeholder hospital names to:

```text
Al-Shifa Medical Complex
```

Updated areas include:

- App metadata
- Shared logo text
- Login and registration branding
- Public footer and contact email strings
- Public pages such as about, contact, news, privacy policy, and terms of service
- Admin settings defaults
- Prisma seed settings
- Email template sender/team names
- Package name: `al-shifa-medical-complex`

Related domain-style email placeholders now use:

```text
@alshifamedical.com
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```env
DATABASE_URL="sqlserver://..."
NEXTAUTH_URL=http://localhost:3005
NEXTAUTH_SECRET=your-secret
```

3. Generate Prisma client:

```bash
npm run db:generate
```

4. Push database schema:

```bash
npm run db:push
```

5. Seed database data:

```bash
npm run db:seed
```

6. Start development server:

```bash
npm run dev
```

Local app URL:

```text
http://localhost:3005
```

## Available Scripts

```bash
npm run dev          # Start Next.js dev server on port 3005
npm run build        # Build production app
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push Prisma schema to database
npm run db:migrate   # Create/run Prisma migrations
npm run db:reset     # Reset database
npm run db:seed      # Seed database
```

## Build Notes

The Next.js build itself passes with:

```bash
npx next build
```

On Windows, the current `npm run build` script may fail after the successful Next build because it uses Unix-style `cp` commands:

```bash
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
```

For Windows compatibility, replace those with PowerShell `Copy-Item` commands or use a cross-platform copy package.

## GitHub Repository Checklist

Before pushing to GitHub:

- Keep `.env` private and verify it is ignored by Git.
- Commit `.env.example` instead of real secrets.
- Do not commit `node_modules`, `.next`, local logs, or database files unless intentionally required.
- Add screenshots to `public` or a `docs/assets` folder if the GitHub README needs visuals.
- Run `npx next build` before creating a release or pull request.
- Confirm branding text shows `Al-Shifa Medical Complex`.

Recommended `.env.example`:

```env
DATABASE_URL=""
NEXTAUTH_URL=http://localhost:3005
NEXTAUTH_SECRET=""
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM_NAME="Al-Shifa Medical Complex"
```

## Suggested Git Workflow

Use feature branches:

```bash
git checkout -b feature/patient-appointments
git checkout -b fix/login-validation
git checkout -b chore/update-branding
```

Use clear commit messages:

```text
feat: add nurse vitals dashboard
fix: update hospital branding
chore: refresh prisma seed data
docs: update setup instructions
```

## Pull Request Template

```md
## Summary
- 

## Changes
- 

## Testing
- [ ] `npx next build`
- [ ] Manual page check
- [ ] Database migration/seed checked if needed

## Screenshots
Add screenshots for UI changes.

## Notes
Any risks, follow-ups, or deployment notes.
```

## Completed Work Log

### Project Foundation

Status: Completed

- Created Prisma schema and database models.
- Added role enum support for all hospital users.
- Configured NextAuth authentication.
- Added providers for theme, session, and query handling.
- Added shared UI components and dashboard layout structure.

### Public Website

Status: Completed

- Home page
- About page
- Services page
- Doctors page
- Blog/news pages
- Careers page
- Contact page
- FAQ page
- Privacy policy page
- Terms of service page

### Admin Module

Status: Completed

- Dashboard
- Appointments
- Audit logs
- Billing
- Departments
- Doctors
- Patients
- Pharmacy
- Reports
- Roles
- Settings
- Staff
- Users

### Doctor Module

Status: Completed

- Dashboard
- Appointments
- Lab requests
- Medical records
- Patients
- Prescriptions
- Profile
- Reports
- Schedule
- Settings

### Nurse Module

Status: Completed

- Dashboard
- Patients
- Vitals
- Medications
- Tasks
- Reports
- Schedule
- Settings
- Profile

### Receptionist Module

Status: Completed

- Dashboard
- Appointments
- Appointment booking
- Patient registration
- Patients
- Billing
- Reports
- Settings
- Profile

### Pharmacy Module

Status: Completed

- Dashboard
- Inventory
- Add/edit inventory
- Prescriptions
- Dispensed history
- Reports
- Settings
- Profile

### Lab Module

Status: Completed

- Dashboard
- Test requests
- Result details
- Result upload
- Reports
- Settings
- Profile

### Patient Module

Status: Completed

- Dashboard
- Appointment booking
- Appointments
- Bills
- Doctors
- Lab results
- Medical history
- Prescriptions
- Profile
- Settings

## Known Follow-Ups

- Make the production build script fully Windows-compatible.
- Add `.env.example` if it does not exist yet.
- Add GitHub README with screenshots and live deployment instructions.
- Add GitHub Actions workflow for lint/build checks.
- Review Next.js warning about migrating `middleware` to the newer `proxy` convention.
- Review Turbopack warning related to dynamic tracing from `next.config.ts` through `src/lib/db.ts`.

## Maintainer Notes

- Keep branding consistent as `Al-Shifa Medical Complex`.
- Keep public-facing contact emails under `alshifamedical.com`.
- Avoid committing local logs such as `dev-run.log`.
- Use focused pull requests for future modules and fixes.
