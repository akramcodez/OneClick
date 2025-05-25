# 🚀 OneClick

A modern clone of [bolt.new](https://bolt.new) — **OneClick** is a sleek, AI-powered coding assistant and collaborative sandbox for developers. Built using **Next.js**, **TailwindCSS**, and powerful integrations like **Google OAuth**, **Convex**, and **Sandpack**, OneClick is your one-stop dev playground.

## 🌟 Features

* 🧠 **AI Code Generation** (powered by `@google/genai`)
* 🧑‍💻 **Code Sandbox Integration** using `@codesandbox/sandpack-react`
* 🌗 **Light/Dark Theme** toggle with `next-themes`
* 🔐 **Google OAuth Sign-In** with `@react-oauth/google`
* 📦 **Cloud Functions & Database** via Convex
* 💳 **PayPal Integration** for payments/donations
* 💬 **Markdown Rendering** for AI responses
* 🎨 **Beautiful UI** with `radix-ui`, `lucide-react`, and TailwindCSS
* 💥 **Real-time feedback and notifications** with `sonner`

## 📦 Tech Stack

* **Framework**: [Next.js](https://nextjs.org/)
* **Styling**: [TailwindCSS](https://tailwindcss.com/)
* **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai)
* **Code Editor**: [Sandpack](https://sandpack.codesandbox.io/)
* **Auth**: [Google OAuth](https://developers.google.com/identity)
* **Backend**: [Convex](https://convex.dev/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Payments**: [PayPal React JS SDK](https://www.npmjs.com/package/@paypal/react-paypal-js)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/oneclick.git
cd oneclick
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your credentials:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment (Vercel)

Deployed on [Vercel](https://vercel.com):

> ⚠️ Make sure to add your OAuth **Authorized JavaScript Origins** in Google Cloud Console:
>
> ```
> https://your-vercel-project-url.vercel.app
> ```

---

## 📁 Project Structure

```
.
├── components/        # Reusable UI components
├── pages/             # Next.js pages
├── lib/               # Utility functions and configs
├── public/            # Static files
├── styles/            # Global styles
├── convex/            # Convex backend logic
├── tailwind.config.js # TailwindCSS configuration
└── tsconfig.json      # Optional TypeScript (if used)
```

---

## ✅ Todo

* [x] Google Sign-in & Auth
* [x] AI prompt & response
* [x] Code editor integration
* [x] Markdown rendering
* [ ] Real-time collaboration
* [ ] GitHub login (optional)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

Made with ❤️ by [@akramcodez](https://github.com/akramcodez)
