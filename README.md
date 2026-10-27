# CodeKing — Portfolio Website

Personal brand and portfolio site for **Joyful Lemabari**, Full Stack Software Engineer and founder of CodeKing.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- GSAP + ScrollTrigger (scroll reveals)
- Typed.js (hero role typing effect)
- Vanilla-Tilt.js (tilt/hover cards)
- Font Awesome (icons)

No frameworks (React/Vue/Angular), no CSS frameworks (Bootstrap/Tailwind), no jQuery — every section is handcrafted.

## Structure

```
codeking/
├── index.html          Homepage — hero, about, skills, services, projects, timeline,
│                        certifications, testimonials, tech stack, resume, contact
├── about.html           Full story, mission/vision, education, experience tabs
├── services.html         All 10 services
├── projects.html         Full project grid with category filtering + modal
├── resume.html           Resume preview + download
├── contact.html          Contact form, info, map
├── 404.html              Custom not-found page
├── privacy.html          Privacy policy
├── terms.html            Terms & conditions
├── css/
│   ├── variables.css     Design tokens (color, type, spacing, motion)
│   ├── style.css         Component and layout styles
│   ├── responsive.css    Breakpoints
│   ├── animations.css    Keyframes
│   └── utilities.css     Utility classes
├── js/
│   ├── utils.js          Shared helpers (query, debounce, counters)
│   ├── theme.js           Dark/light mode toggle (persisted)
│   ├── main.js            Nav, tabs, footer year, newsletter
│   ├── animation.js       Cursor, particles, reveals, tilt, marquee, testimonials
│   ├── projects.js        Project filtering + modal
│   └── contact.js         Contact form validation
├── images/                Place real photography/screenshots here
├── assets/resume/          Add Joyful-Lemabari-Resume.pdf here
├── sitemap.xml
└── robots.txt
```


## Notes on design

Palette, type, and page structure follow the brief exactly (Primary #2563EB / Secondary
#7C3AED / Accent #06B6D4, Poppins/Inter/JetBrains Mono). The signature visual motif is the
brand mark: a rotating conic "crown" gradient used for the loader, portrait frame, and
CTA buttons — tying the "King" of CodeKing to a circuit/gradient built from the brand's
own code-forward palette, rather than a literal crown icon.
