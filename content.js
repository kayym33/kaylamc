// Everything the site says lives here. Edit this file to change the words,
// add a project, or fill in a section; site.js draws it. Sections with
// nothing in them stay hidden, so there are never placeholders on the
// live site. Text is plain (no HTML needed); it's escaped when drawn.

export const content = {
  name: "kayla mcdade",
  // A line or two under your name.
  intro: "hii, i'm kayla :3 software engineering student, industrial placement intern, and builder of small apps i actually use every day.",

  // Where you are now: [{what, where, when, note}]
  now: [
    { what: "software engineer industrial placement intern", where: "JPMorgan Chase & Co.", when: "2026 –", note: "" },
    { what: "BSc software engineering", where: "University of Strathclyde", when: "graduating 2028", note: "" },
  ],

  // Projects, in order. `images` are files in images/ (screenshots made
  // with pretend data). `links` is [label, url] pairs. Leave images empty
  // for an ASCII placeholder.
  projects: [
    {
      name: "t1ld3",
      tagline: "a desktop hub for windows and linux, with a phone app",
      about: "a launcher, a today briefing, weather, to-dos, a calendar with reminders, a cookbook with cooking timers and a habit tracker, plus a spotify player that pops out and stays on top. everything syncs to an iPhone home-screen app with push notifications. day and night themes, album art drawn as dithered ASCII.",
      stack: ["python", "customtkinter", "spotify API", "supabase", "javascript PWA", "web push"],
      images: [],
      links: [["phone app", "https://t1ld3.kaylamc.uk"], ["code", "https://github.com/kayym33/resonance"], ["download", "https://github.com/kayym33/resonance/releases/latest"]],
    },
    {
      name: "f1nanc3",
      tagline: "where your money goes, from your bank statements",
      about: "import a bank statement and see the month: categories that learn from your corrections, subscriptions and bills with links to cancel them, a budget built from your own spending, a savings goal, charts, a 'river' of your money in ASCII, and notifications when a budget gets close. a PIN lock and a privacy mode that blurs every amount. no build step, no tracking.",
      stack: ["javascript", "supabase", "postgres row-level security", "edge functions", "PWA"],
      images: [
        ["f1nanc3-river.jpg", "f1nanc3's river: a month's spending flowing into categories, drawn in ASCII"],
        ["f1nanc3-phone.jpg", "f1nanc3's budget page on a phone, at night"],
      ],
      links: [["open it", "https://f1nanc3.kaylamc.uk"], ["code", "https://github.com/kayym33/f1nanc3"]],
    },
    {
      name: "weave",
      tagline: "markdown to HTML, in python",
      about: "a command-line tool that turns a markdown file into an HTML page, with its own parser and writer.",
      stack: ["python", "CLI"],
      images: [],
      links: [["code", "https://github.com/kayym33/weave"]],
    },
  ],

  // Anything else worth showing: certificates, hackathons, awards, hobbies.
  // [{title, detail, link}], e.g.
  // { title: "JPMC software engineering job simulation", detail: "Forage, 2025", link: "https://..." },
  more: [],

  // Skills, grouped: {group: [items]}
  skills: {
    languages: ["java", "python", "javascript", "C", "haskell", "SQL"],
    web: ["HTML", "CSS", "react", "PWAs", "supabase"],
    "how i work": ["git", "testing", "debugging", "documentation"],
  },

  // Contact and links: [label, url]. e.g. ["linkedin", "https://www.linkedin.com/in/..."],
  // ["email", "mailto:you@example.com"]. Shown in the header and at the bottom.
  links: [["github", "https://github.com/kayym33"]],

  // A CV to download: a file in this folder, e.g. "kayla-mcdade-cv.pdf". "" hides it.
  cv: "",
};
