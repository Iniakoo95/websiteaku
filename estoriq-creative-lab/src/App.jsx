import { useEffect, useState } from 'react'

const WORK = [
  {
    id: 'studio', number: '01', category: 'STUDIO WORK', categoryLabel: 'Studio', kind: 'product',
    title: 'Commercial CGI', subtitle: 'Objects. Atmosphere. Impact.',
    description: 'A dedicated space for Estoriq Creative Lab product animation, 3D visualisation and motion work. Real project footage, approved client names and final credits will replace this concept visual after QC.',
    tags: ['3D Visualisation', 'Product Motion', 'CGI'], status: 'Concept visual — content pending approval'
  },
  {
    id: 'archive', number: '02', category: 'DIRECTOR’S ARCHIVE', categoryLabel: 'Archive', kind: 'archive',
    title: 'Creative Direction', subtitle: 'Selected work. Personal credits.',
    description: 'A separate archive for creative work completed through previous or current professional roles. This section explicitly separates the director’s individual contributions from projects contracted by Estoriq Creative Lab.',
    tags: ['Art Direction', '3D & Motion', 'Personal Archive'], status: 'Archive selection pending approval'
  },
  {
    id: 'originals', number: '03', category: 'ORIGINALS', categoryLabel: 'Originals', kind: 'originals',
    title: 'LANGKATERA', subtitle: 'An original world in the making.',
    description: 'LANGKATERA is a developing original fantasy universe rooted in Nusantara-inspired visual storytelling. All visuals in this first prototype are abstract, provisional design studies — not approved character or film artwork.',
    tags: ['Original IP', 'Worldbuilding', 'Visual Development'], status: 'Original IP — in development'
  }
]

function Arrow({diagonal=false, size=20}) {
  return diagonal
    ? <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M6 5h13v13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    : <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 12h16m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function Art({kind='hero', compact=false}) {
  const uid = `art-${kind}-${compact ? 'small' : 'large'}`
  return <svg className={`art-svg art-${kind}`} viewBox="0 0 900 710" role="img" aria-label={kind === 'product' ? 'Abstract metallic product containers concept artwork' : kind === 'archive' ? 'Abstract sculptural architectural concept artwork' : kind === 'originals' ? 'Abstract fantasy emblem concept artwork' : 'Abstract cinematic chrome sculpture'}>
    <defs>
      <radialGradient id={`${uid}-bg`} cx="50%" cy="40%" r="74%"><stop stopColor={kind === 'originals' ? '#603f3b' : kind === 'product' ? '#e9ddd0' : '#353536'}/><stop offset="0.54" stopColor={kind === 'originals' ? '#2b2126' : kind === 'product' ? '#c2ad9e' : '#171819'}/><stop offset="1" stopColor={kind === 'product' ? '#8d7e76' : '#0b0c0e'}/></radialGradient>
      <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#39373a"/><stop offset=".12" stopColor="#fafaf5"/><stop offset=".24" stopColor="#81858b"/><stop offset=".38" stopColor="#17191b"/><stop offset=".56" stopColor="#e5e7e3"/><stop offset=".69" stopColor="#5e6065"/><stop offset=".84" stopColor="#ffffff"/><stop offset="1" stopColor="#23252b"/></linearGradient>
      <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2=".8"><stop stopColor="#321f1c"/><stop offset=".14" stopColor="#f8ca9e"/><stop offset=".32" stopColor="#8e4b39"/><stop offset=".48" stopColor="#ffe6c7"/><stop offset=".69" stopColor="#6c3c32"/><stop offset=".85" stopColor="#c78360"/><stop offset="1" stopColor="#271d1f"/></linearGradient>
      <linearGradient id={`${uid}-can`} x1="0" x2="1"><stop stopColor="#282523"/><stop offset=".12" stopColor="#babab6"/><stop offset=".3" stopColor="#fcf8ed"/><stop offset=".49" stopColor="#85817d"/><stop offset=".69" stopColor="#f8ebe0"/><stop offset=".85" stopColor="#77706b"/><stop offset="1" stopColor="#201d1f"/></linearGradient>
      <radialGradient id={`${uid}-glow`}><stop stopColor="#fcbd9e" stopOpacity=".65"/><stop offset="1" stopColor="#fcbd9e" stopOpacity="0"/></radialGradient>
      <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="27"/></filter>
      <pattern id={`${uid}-grid`} patternUnits="userSpaceOnUse" width="70" height="70"><path d="M70 0H0V70" fill="none" stroke="#fff" strokeOpacity=".07" strokeWidth="1"/></pattern>
    </defs>
    <rect width="900" height="710" fill={`url(#${uid}-bg)`}/>
    <rect width="900" height="710" fill={`url(#${uid}-grid)`}/>
    {kind === 'hero' && <g>
      <ellipse cx="470" cy="627" rx="266" ry="49" fill="#000" opacity=".5" filter={`url(#${uid}-shadow)`}/>
      <circle cx="463" cy="329" r="295" fill={`url(#${uid}-glow)`} opacity=".35"/>
      <g className="orbit-a">
        <ellipse cx="455" cy="337" rx="264" ry="113" transform="rotate(-41 455 337)" fill="none" stroke="#08090b" strokeWidth="106" opacity=".6"/>
        <ellipse cx="455" cy="326" rx="264" ry="113" transform="rotate(-41 455 326)" fill="none" stroke={`url(#${uid}-chrome)`} strokeWidth="92"/>
        <ellipse cx="455" cy="322" rx="266" ry="115" transform="rotate(-41 455 322)" fill="none" stroke="#fff" strokeOpacity=".33" strokeWidth="3"/>
      </g>
      <g className="orbit-b">
        <ellipse cx="455" cy="340" rx="250" ry="103" transform="rotate(44 455 340)" fill="none" stroke="#0b0c0c" strokeWidth="94" opacity=".5"/>
        <ellipse cx="455" cy="330" rx="250" ry="103" transform="rotate(44 455 330)" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="80"/>
        <ellipse cx="455" cy="326" rx="254" ry="106" transform="rotate(44 455 326)" fill="none" stroke="#f8ded5" strokeOpacity=".4" strokeWidth="3"/>
      </g>
      <circle cx="455" cy="329" r="61" fill="#151519" stroke="#f8f4e7" strokeOpacity=".42" strokeWidth="3"/>
      <circle cx="455" cy="329" r="35" fill={`url(#${uid}-chrome)`}/>
      <path d="M142 162h99m-50-50v99 M725 502h80m-40-40v80" stroke="#fff" strokeOpacity=".24" strokeWidth="1.2"/>
    </g>}
    {kind === 'product' && <g>
      <ellipse cx="455" cy="631" rx="310" ry="38" fill="#342b28" opacity=".38" filter={`url(#${uid}-shadow)`}/>
      <g transform="translate(115 65) rotate(-15 240 290)">
        <rect x="176" y="127" width="204" height="408" rx="43" fill={`url(#${uid}-can)`}/>
        <ellipse cx="278" cy="128" rx="102" ry="24" fill="#ded7c9" stroke="#625b56" strokeWidth="6"/>
        <rect x="182" y="166" width="190" height="25" fill="#ded8ce" opacity=".4"/>
        <rect x="186" y="318" width="184" height="120" fill="#e4ad8a" opacity=".89"/>
        <text x="278" y="361" fill="#3a2925" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="4">FORM STUDY</text>
        <text x="278" y="399" fill="#372824" fontSize="39" fontWeight="800" textAnchor="middle">01</text>
        <ellipse cx="278" cy="534" rx="98" ry="15" fill="#48413b" opacity=".7"/>
      </g>
      <g transform="translate(348 106) rotate(14 240 290)">
        <rect x="176" y="127" width="204" height="408" rx="43" fill={`url(#${uid}-can)`}/>
        <ellipse cx="278" cy="128" rx="102" ry="24" fill="#e9e6dc" stroke="#625b56" strokeWidth="6"/>
        <rect x="181" y="166" width="195" height="30" fill="#fff" opacity=".32"/>
        <rect x="184" y="315" width="187" height="123" fill="#312c2c" opacity=".9"/>
        <text x="278" y="362" fill="#f0e5dc" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="4">MOTION TEST</text>
        <text x="278" y="402" fill="#f5ede5" fontSize="39" fontWeight="800" textAnchor="middle">02</text>
        <ellipse cx="278" cy="534" rx="98" ry="15" fill="#48413b" opacity=".7"/>
      </g>
      <path d="M50 570h800" stroke="#fff" opacity=".16" strokeWidth="2"/>
    </g>}
    {kind === 'archive' && <g>
      <ellipse cx="477" cy="613" rx="274" ry="58" fill="#000" opacity=".5" filter={`url(#${uid}-shadow)`}/>
      <g transform="translate(205 98)">
        <path d="M93 415V113L283 9l182 100v308L282 529Z" fill="#242526"/>
        <path d="M93 113 283 9v302L93 415Z" fill={`url(#${uid}-chrome)`}/>
        <path d="M283 9 465 109v308L283 529Z" fill="#bcb9b2"/>
        <path d="M283 311 465 109v308L283 529Z" fill="#44484c"/>
        <path d="M93 113 283 9l182 100-182 202Z" fill="#e7e3db" opacity=".92"/>
        <path d="m116 131 165-90 147 75-147 166Z" fill="#383a3c"/>
        <path d="M162 172 280 102v119Z" fill="#eaa686"/>
      </g>
      <circle cx="671" cy="146" r="55" fill="none" stroke="#f5e8d7" strokeOpacity=".25" strokeWidth="1"/>
      <path d="M66 593h768M65 119h117" stroke="#fff" strokeOpacity=".3"/>
    </g>}
    {kind === 'originals' && <g>
      <circle cx="455" cy="330" r="225" fill="none" stroke="#d3a579" strokeOpacity=".4" strokeWidth="3"/>
      <circle cx="455" cy="330" r="182" fill="none" stroke="#f4d5a7" strokeOpacity=".22" strokeWidth="2"/>
      <circle cx="455" cy="330" r="280" fill="none" stroke="#d3a579" strokeOpacity=".12" strokeWidth="1" strokeDasharray="6 12"/>
      <path d="M455 64 498 242 540 287l-40 28 15 187-60 112-60-112 15-187-40-28 42-45Z" fill={`url(#${uid}-metal)`} stroke="#f7d5a5" strokeOpacity=".55" strokeWidth="2"/>
      <path d="M455 108v430M420 295h70M423 499h65" stroke="#20151a" strokeWidth="13" opacity=".6"/>
      <path d="M303 242c-35 41-49 86-41 145M607 242c35 41 49 86 41 145" fill="none" stroke="#e4b48e" strokeOpacity=".4" strokeWidth="8"/>
      <path d="M236 513 455 645 674 513" stroke="#d3a579" strokeOpacity=".24" fill="none"/>
      <circle cx="455" cy="330" r="10" fill="#fff6df"/>
      <path d="M455 19v58m0 518v58M146 330h75m468 0h75" stroke="#e0ab7d" strokeOpacity=".3"/>
    </g>}
    <rect x="18" y="18" width="864" height="674" fill="none" stroke="#fff" strokeOpacity=".13"/>
  </svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)
  const visibleWork = filter === 'all' ? WORK : WORK.filter(x => x.id === filter)

  useEffect(() => {
    function closeOnEscape(e) { if (e.key === 'Escape') { setSelected(null); setMenuOpen(false) } }
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = selected || menuOpen ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = '' }
  }, [selected, menuOpen])

  function navigateToWork(id) {
    setFilter(id)
    setMenuOpen(false)
  }

  async function copyPortfolioLink() {
    try {
      await navigator.clipboard.writeText('https://www.behance.net/nazmibayan')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { window.open('https://www.behance.net/nazmibayan', '_blank', 'noopener,noreferrer') }
  }

  return <div className="site" id="top">
    <div className="development-bar"><span className="development-dot"/>PRIVATE REVIEW BUILD <span className="development-sep">/</span> CONTENT AND ARTWORK SUBJECT TO APPROVAL</div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Estoriq Creative Lab, back to top" onClick={() => setMenuOpen(false)}>
        <span className="brand-symbol">E<span className="brand-symbol-dot"/></span>
        <span className="brand-type">ESTORIQ<span>CREATIVE LAB</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#work" onClick={() => navigateToWork('all')}>Work</a>
        <a href="#work" onClick={() => navigateToWork('archive')}>Director’s Archive</a>
        <a href="#originals" onClick={() => setMenuOpen(false)}>Originals</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Studio</a>
      </nav>
      <a className="header-contact" href="#contact">LET’S TALK <Arrow diagonal size={16}/></a>
      <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(x => !x)}><span/><span/></button>
    </header>
    {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
      <a href="#work" onClick={() => navigateToWork('all')}>Work <Arrow diagonal/></a>
      <a href="#work" onClick={() => navigateToWork('archive')}>Director’s Archive <Arrow diagonal/></a>
      <a href="#originals" onClick={() => setMenuOpen(false)}>Originals <Arrow diagonal/></a>
      <a href="#about" onClick={() => setMenuOpen(false)}>Studio <Arrow diagonal/></a>
      <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <Arrow diagonal/></a>
    </nav>}

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="overline"><span className="overline-rule"/> INDEPENDENT CGI & MOTION STUDIO <span className="overline-rule"/> MALAYSIA</div>
          <h1 id="hero-title">Imagination,<br/><em>in motion.</em></h1>
          <p>We create expressive visuals at the intersection of design, technology and storytelling.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#work">Explore our work <Arrow diagonal size={19}/></a>
            <a className="text-link" href="#about">Discover the studio <span>↗</span></a>
          </div>
          <div className="hero-bottom"><span>01 — 04</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <div className="hero-visual"><Art kind="hero"/><div className="hero-visual-label"><span>ESTORIQ / EXPERIMENT 001</span><span>FORM, LIGHT & MOVEMENT</span></div><span className="visual-mark visual-mark-left">+</span><span className="visual-mark visual-mark-right">+</span></div>
      </section>

      <section className="manifesto section-wrap" id="about">
        <div className="section-kicker"><span>01 / WHO WE ARE</span><span>STUDIO PHILOSOPHY</span></div>
        <div className="manifesto-layout">
          <h2>We make the<br/><span>ordinary</span><br/>extraordinary<span className="accent-period">.</span></h2>
          <div className="manifesto-side"><div className="mini-asterisk">✳</div><p>Estoriq Creative Lab is an independent creative practice working across CGI, 3D animation and visual storytelling.</p><p>From a single product frame to an entirely imagined world, we obsess over the details that make people feel something.</p><a className="underlined-link" href="#contact">COLLABORATE WITH US <Arrow diagonal size={17}/></a></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-wrap">
          <div className="section-kicker"><span>02 / THE WORK</span><span>CURATED SELECTION</span></div>
          <div className="section-heading"><h2>Selected <em>work.</em></h2><p>A curated first look at our practice, professional archive and original storytelling worlds.</p></div>
          <div className="filter-row" role="group" aria-label="Filter portfolio work">
            {[['all','All projects'],['studio','Studio'],['archive','Director’s Archive'],['originals','Originals']].map(([id,label]) => <button key={id} type="button" className={`filter-button ${filter === id ? 'active' : ''}`} onClick={() => setFilter(id)} aria-pressed={filter === id}>{label}<span>{id === 'all' ? '03' : '01'}</span></button>)}
          </div>
          <div className={`work-grid ${visibleWork.length===1 ? 'single' : ''}`}>
            {visibleWork.map((work, index) => <button className={`work-card work-card-${work.kind}`} key={work.id} type="button" onClick={() => setSelected(work)} aria-label={`Open ${work.title} project details`}>
              <div className="work-cover"><Art kind={work.kind} compact/><div className="art-watermark">CONCEPT VISUAL <span>•</span> PROTOTYPE</div><span className="work-open"><Arrow diagonal size={24}/></span></div>
              <div className="work-meta"><span>{work.category}</span><span>{work.number} / 03</span></div>
              <div className="work-name"><h3>{work.title}</h3><Arrow diagonal size={21}/></div>
              <p>{work.subtitle}</p>
            </button>)}
          </div>
          <p className="content-caveat"><span>ⓘ</span> Prototype artwork is illustrative only. No client footage, agency credits or proprietary project files are published here.</p>
        </div>
      </section>

      <section className="services section-wrap" id="services">
        <div className="section-kicker"><span>03 / OUR EXPERTISE</span><span>WHAT WE DO</span></div>
        <div className="services-layout"><div className="services-intro"><h2>Making ideas<br/><em>feel real.</em></h2><p>Creative thinking and production craft, working together from first idea to final frame.</p></div><div className="services-list">
          {[['01','3D Product Visualisation','From materials and lighting to striking commercial imagery.'],['02','CGI & Motion Design','Design-led animation built around timing, rhythm and attention.'],['03','Creative Direction','Strong visual systems and clear storytelling across every frame.'],['04','Worldbuilding & Originals','Character, environment and universe development for original ideas.']].map(([n,title,desc]) => <div className="service-item" key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div><Arrow diagonal size={19}/></div>)}
        </div></div>
      </section>

      <section className="originals-section" id="originals"><div className="originals-image"><Art kind="originals"/><div className="image-note">ABSTRACT DESIGN STUDY / NOT FINAL IP ARTWORK</div></div><div className="originals-copy"><span className="originals-kicker">ESTORIQ ORIGINALS / 001</span><div className="originals-line"/><span className="eyebrow">A WORLD BEYOND THE KNOWN</span><h2>LANG<span>KA</span>TERA</h2><p>Where myth meets ambition. An original fantasy universe taking shape through the language of Nusantara-inspired storytelling.</p><div className="originals-status"><span className="status-pulse"/> IN DEVELOPMENT</div><button className="button button-outline" type="button" onClick={() => setSelected(WORK[2])}>Explore the concept <Arrow diagonal size={18}/></button></div></section>

      <section className="contact-section section-wrap" id="contact"><div className="section-kicker"><span>04 / WHAT'S NEXT?</span><span>GET IN TOUCH</span></div><div className="contact-content"><div><span className="eyebrow">YOUR IDEA. OUR CURIOSITY.</span><h2>Let’s create<br/><em>something</em><br/>worth seeing<span>.</span></h2></div><div className="contact-side"><p>Have a product to bring to life, a story to tell, or an ambitious idea to explore?</p><a className="button button-dark" href="https://www.behance.net/nazmibayan" target="_blank" rel="noopener noreferrer">Connect on Behance <Arrow diagonal size={18}/></a><button className="copy-link" type="button" onClick={copyPortfolioLink}>{copied ? 'Portfolio link copied ✓' : 'Copy portfolio link ↗'}</button><span className="pending-label">Business email & enquiry form: pending QC approval.</span></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a className="footer-logo" href="#top">ESTORIQ<span>®</span></a><span>CREATIVE LAB <br/> INDEPENDENT BY DESIGN.</span><a href="#top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ESTORIQ CREATIVE LAB</span><span>PROTOTYPE V0.1 — NOT RELEASED</span><span>BUILT TO EXPLORE WHAT’S POSSIBLE.</span></div></footer>

    {selected && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }} role="presentation"><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" aria-label="Close project details" onClick={() => setSelected(null)}>CLOSE ✕</button><div className="modal-image"><Art kind={selected.kind} compact/></div><div className="modal-text"><span className="eyebrow">{selected.category} / PROTOTYPE</span><h2 id="modal-title">{selected.title}</h2><h3>{selected.subtitle}</h3><p>{selected.description}</p><div className="modal-tags">{selected.tags.map(t => <span key={t}>{t}</span>)}</div><div className="modal-status">ⓘ {selected.status}</div></div></section></div>}
  </div>
}

export default App
