# React + Vite

<!-- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->


#  Encrypted Dynamic Form with Disappearing Fields

This project implements a secure, dynamic form system using encrypted metadata. It uses **Node.js (Express)** as the backend and **React (Vite)** as the frontend. The form fields are encrypted on the backend and decrypted on the frontend, with only one field shown at a time.

---

##  Features

-  AES-256-CBC encryption of field metadata (label and type).
-  Decryption and dynamic field rendering on the client.
-  Disappearing field UI — one field at a time.
-  Form resets after submission.
-  Decoy/garbage field added to confuse attackers.
-  Environment variables for secure configuration.


