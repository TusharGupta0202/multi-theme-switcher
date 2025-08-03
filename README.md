# Multi-Theme Switcher

A modern, responsive web application built with Next.js and TypeScript that enables users to dynamically switch between three distinct UI themes. Each theme alters the visual appearance in terms of colors, fonts, layout, and spacing. The application uses context-based state management, animated transitions, and error boundaries for robust UI performance.

## Features

- Three fully customizable themes with smooth transitions
- Persistent theme storage using `localStorage`
- Responsive layout with adaptive typography and spacing
- Theme-aware components using Tailwind CSS
- Toast notifications for feedback
- Centralized error handling with error boundaries
- Modular folder structure and scalable architecture

## Tech Stack

| Technology            | Description                                         |
|-----------------------|-----------------------------------------------------|
| **Next.js**           | React framework for server-side rendering & routing |
| **TypeScript**        | Typed JavaScript for improved developer experience  |
| **Tailwind CSS**      | Utility-first CSS framework                         |
| **shadcn/ui**         | Accessible and customizable UI components           |
| **PostCSS**           | CSS transformation engine                           |
| **Context API**       | Global state management for theme and toasts        |
| **ESLint & Prettier** | Code linting and formatting tools                   |

## Folder Structure

app/
├─ components/ # Reusable UI components (Header, Layout, etc.)
├─ contexts/ # Theme and Toast context providers
├─ styles/ # Tailwind and global CSS files
├─ app/ # Pages and layout files
├─ utils/ # Helper utilities (e.g., logger)
└─ public/ # Static assets
