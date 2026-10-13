import { useEffect, useRef, useState } from 'react'

const PORTFOLIO = [
  {
    id: 'product-imagery', index: '01', eyebrow: 'PRODUCT VISUALISATION', title: 'Objects with presence.',
    type: 'Commercial CGI / Visualisation', style: 'bottles', size: 'featured',
    intro: 'Product imagery designed around form, texture and light.',
    role: '3D imagery · Look development · Lighting',
    status: 'Illustrative layout — final project and client approval pending',
    note: 'This is a design placeholder, not a published client case study. Approved commercial work will replace the imagery, description and credits.'
  },
  {
    id: 'motion-design', index: '02', eyebrow: '3D PRODUCT ANIMATION', title: 'Made to move.',
    type: 'Product Animation / Motion', style: 'motion',
    intro: 'Product storytelling through deliberate movement and timing.',
    role: 'Animation · Art direction · Rendering',
    status: 'Illustrative layout — footage pending approval',
    note: 'This slot will show a real, approved product animation with a clear description of the studio’s role.'
  },
  {
    id: 'campaign-visuals', index: '03', eyebrow: 'CAMPAIGN VISUALS', title: 'Every detail matters.',
    type: 'Creative CGI / Still Images', style: 'sculpture',
    intro: 'Distinctive visual treatments for commercial ideas.',
    role: 'CGI · Compositing · Creative exploration',
    status: 'Concept placeholder — project selection pending',
    note: 'No real client artwork or implied performance claims are shown in this early review version.'
  }
]

const SERVICES = [
  { no: '01', title: 'Product CGI & Visualisation', description: 'Elevated stills, product mockups and campaign imagery built to make materials and details feel tangible.', tags: 'STILLS  /  LOOKDEV  /  LIGHTING' },
  { no: '02', title: '3D Animation & Motion', description: 'Motion-led product stories — from an elegant reveal to a complete visual sequence.', tags: 'ANIMATION  /  STORYBOARD  /  RENDER' },
  { no: '03', title: 'Creative Direction', description: 'A clear visual point of view from the first frame through the final delivery.', tags: 'CONCEPT  /  DESIGN  /  DIRECTION' }
]

function IconArrow({ size = 18, diagonal = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function IconCross() { return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8"/></svg> }

function ArtFrame({ kind = 'bottles', id = 'art', text = 'ARTWORK / PENDING APPROVAL' }) {
  const g = `g-${id}`
  const isProduct = kind === 'bottles' || kind === 'hero'
  return <div className={`art-frame visual-${kind}`}>
    <svg className="artwork" viewBox="0 0 900 700" role="img" aria-label={`Abstract ${kind} visual placeholder, not real client artwork`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={kind === 'original' ? '#333435' : '#b8b8b4'}/><stop offset=".5" stopColor={kind === 'original' ? '#1a1b1e' : '#787d7e'}/><stop offset="1" stopColor="#303335"/></linearGradient>
        <linearGradient id={`${g}-metal`} x1="0" y1="0" x2="1" y2=".25"><stop stopColor="#34393a"/><stop offset=".14" stopColor="#e8eae5"/><stop offset=".29" stopColor="#697173"/><stop offset=".45" stopColor="#d5d7d1"/><stop offset=".64" stopColor="#4e5659"/><stop offset=".82" stopColor="#e7e6df"/><stop offset="1" stopColor="#464a4b"/></linearGradient>
        <linearGradient id={`${g}-glass`} x1="0" x2="1"><stop stopColor="#2f3435"/><stop offset=".25" stopColor="#b4babc" stopOpacity=".9"/><stop offset=".6" stopColor="#53595d"/><stop offset=".83" stopColor="#c0c7c6"/><stop offset="1" stopColor="#303334"/></linearGradient>
        <radialGradient id={`${g}-light`}><stop stopColor="#f7f4e7" stopOpacity=".45"/><stop offset="1" stopColor="#f7f4e7" stopOpacity="0"/></radialGradient>
        <pattern id={`${g}-grid`} patternUnits="userSpaceOnUse" width="90" height="90"><path d="M90 0H0V90" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1"/></pattern>
        <filter id={`${g}-blur`}><feGaussianBlur stdDeviation="22"/></filter>
      </defs>
      <rect width="900" height="700" fill={`url(#${g}-bg)`}/><rect width="900" height="700" fill={`url(#${g}-grid)`}/><circle cx="460" cy="340" r="380" fill={`url(#${g}-light)`}/>
      {isProduct && <g>
        <ellipse cx="466" cy="600" rx="330" ry="45" fill="#0d1112" opacity=".5" filter={`url(#${g}-blur)`}/>
        <g transform="translate(190 90) rotate(-9 120 300)"><rect x="16" y="80" width="232" height="447" rx="61" fill={`url(#${g}-glass)`}/><ellipse cx="132" cy="82" rx="108" ry="28" fill="#dde0dc" stroke="#575d5e" strokeWidth="5"/><rect x="24" y="253" width="216" height="155" fill="#4e5456" opacity=".94"/><path d="M35 264h196M35 392h196" stroke="#e1e5e3" strokeOpacity=".6"/><text x="132" y="327" textAnchor="middle" fontSize="21" letterSpacing="8" fill="#ecece6" fontWeight="700">STUDY</text><text x="132" y="365" textAnchor="middle" fontSize="14" letterSpacing="6" fill="#d9dad4">NO. 01</text></g>
        <g transform="translate(455 50) rotate(12 120 300)"><rect x="16" y="80" width="232" height="447" rx="61" fill={`url(#${g}-metal)`}/><ellipse cx="132" cy="81" rx="109" ry="29" fill="#d4d7d3" stroke="#666d6d" strokeWidth="5"/><rect x="25" y="251" width="214" height="159" fill="#d1d1cb" opacity=".82"/><text x="132" y="318" textAnchor="middle" fontSize="20" letterSpacing="7" fill="#242627" fontWeight="700">FORM</text><path d="M81 337h102" stroke="#242627"/><text x="132" y="371" textAnchor="middle" fontSize="13" letterSpacing="6" fill="#333637">NO. 02</text></g>
        <path d="M64 614h771" stroke="#eee" strokeOpacity=".5"/>
      </g>}
      {kind === 'motion' && <g>
        <ellipse cx="460" cy="588" rx="275" ry="39" fill="#111" opacity=".45" filter={`url(#${g}-blur)`}/>
        <g transform="translate(437 347)"><g transform="rotate(-26)"><rect x="-123" y="-235" width="246" height="470" rx="62" fill={`url(#${g}-metal)`}/><ellipse cx="0" cy="-234" rx="113" ry="30" fill="#d5d6d1"/><rect x="-114" y="-23" width="228" height="135" fill="#34383a"/><path d="M-50 25h100" stroke="#d5d6d1" strokeWidth="2"/><text y="12" fontSize="15" textAnchor="middle" fill="#f0eee9" letterSpacing="5">MOTION</text><text y="70" fontSize="38" textAnchor="middle" fill="#f2f1ec" letterSpacing="3">02</text></g></g>
        <ellipse cx="455" cy="334" rx="343" ry="165" transform="rotate(-24 455 334)" stroke="#e5e4dc" strokeOpacity=".55" strokeWidth="2" strokeDasharray="9 13" fill="none"/><path d="M87 360l-21-8 7 23M808 239l20 17-1-27" stroke="#e4e8e7" strokeWidth="3" fill="none"/>
      </g>}
      {kind === 'sculpture' && <g>
        <ellipse cx="456" cy="605" rx="290" ry="36" fill="#151616" opacity=".4" filter={`url(#${g}-blur)`}/>
        <g transform="translate(166 62)"><path d="M119 444V129L296 26 484 135v308L301 553Z" fill="#252829"/><path d="M119 129 296 26v335L119 444Z" fill={`url(#${g}-metal)`}/><path d="M296 26 484 135v308L301 553Z" fill="#aeb4b4"/><path d="M296 361 484 135v308L301 553Z" fill="#3f4547"/><path d="M119 129 296 26l188 109-188 226Z" fill="#e6e7e2"/><path d="M151 142 292 64l148 83-147 177Z" fill="#393f41"/><path d="M190 176 289 115v135Z" fill="#aaaead"/></g><circle cx="740" cy="175" r="55" fill="none" stroke="#f1eee7" strokeOpacity=".38"/>
      </g>}
      {kind === 'original' && <g>
        <circle cx="452" cy="350" r="254" stroke="#ddd5c8" strokeOpacity=".35" fill="none"/><circle cx="452" cy="350" r="210" stroke="#ddd5c8" strokeOpacity=".25" fill="none"/><circle cx="452" cy="350" r="303" stroke="#ddd5c8" strokeOpacity=".17" strokeDasharray="6 17" fill="none"/>
        <path d="M454 75 510 263 576 338 502 378 522 536 454 628 385 536 404 378 331 338 395 263Z" fill={`url(#${g}-metal)`}/><path d="M452 125v455M385 341h138" stroke="#242729" strokeWidth="12" opacity=".52"/><path d="M240 528 452 648 665 528" stroke="#eeeadb" strokeOpacity=".25" fill="none"/><circle cx="452" cy="351" r="13" fill="#f3ede0"/>
      </g>}
      <rect x="25" y="25" width="850" height="650" stroke="#fff" strokeOpacity=".18" fill="none"/>
      <path d="M25 90V25h65M810 675h65v-65" fill="none" stroke="#f4eee4" strokeWidth="2" opacity=".7"/>
    </svg>
    <div className="placeholder-stamp">{text}</div>
  </div>
}

function DetailDialog({ project, close }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    const key = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', key)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', key); document.body.classList.remove('modal-open'); previous?.focus?.() }
  }, [close])
  return <div className="dialog-overlay" onMouseDown={e => { if (e.target === e.currentTarget) close() }}>
    <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <button ref={closeRef} className="dialog-close" onClick={close} aria-label="Close project preview"><IconCross/></button>
      <div className="dialog-image"><ArtFrame kind={project.style} id={`dialog-${project.id}`}/></div>
      <div className="dialog-body"><div className="overline">CASE STUDY PREVIEW / {project.index}</div><h2 id="case-study-title">{project.title}</h2><p className="dialog-intro">{project.intro}</p><div className="detail-rule"/><dl><div><dt>TYPE</dt><dd>{project.type}</dd></div><div><dt>PRODUCTION SCOPE</dt><dd>{project.role}</dd></div><div><dt>PUBLICATION STATUS</dt><dd>{project.status}</dd></div></dl><p className="disclaimer">{project.note}</p></div>
    </section>
  </div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [copySuccess, setCopySuccess] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const closeMenu = () => setMenuOpen(false)
  async function copyBehance() {
    try {
      await navigator.clipboard.writeText('https://www.behance.net/nazmibayan')
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2200)
    } catch { window.open('https://www.behance.net/nazmibayan', '_blank', 'noopener,noreferrer') }
  }

  return <div className="site" id="top">
    <div className="qc-ribbon"><span className="qc-dot"/> ESTORIQ WEBSITE / V0.2 <span className="qc-ribbon-sep">·</span> OWNER QC BUILD — NOT PUBLISHED</div>
    <header className="header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Estoriq Creative Lab home"><span className="brand-mark">e<span>.</span></span><span className="brand-lockup">ESTORIQ<small>CREATIVE LAB</small></span></a>
      <nav aria-label="Primary navigation" className="desktop-nav"><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#archive">Director's Archive</a><a href="#originals">Originals</a></nav>
      <a href="#contact" className="header-cta">START A PROJECT <IconArrow diagonal size={16}/></a>
      <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(x => !x)}><span/><span/></button>
    </header>
    <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'visible' : ''}`} aria-label="Mobile navigation" inert={!menuOpen}><a href="#work" onClick={closeMenu}>Work <IconArrow diagonal/></a><a href="#services" onClick={closeMenu}>Services <IconArrow diagonal/></a><a href="#studio" onClick={closeMenu}>Studio <IconArrow diagonal/></a><a href="#archive" onClick={closeMenu}>Director's Archive <IconArrow diagonal/></a><a href="#originals" onClick={closeMenu}>Originals <IconArrow diagonal/></a><a href="#contact" onClick={closeMenu}>Start a Project <IconArrow diagonal/></a></nav>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-left"><p className="overline hero-eyebrow"><span className="eyebrow-line"/> INDEPENDENT CGI & MOTION STUDIO <span className="hero-location">MALAYSIA</span></p>
          <h1 id="hero-title">Products,<br/><span>reimagined</span><br/>in motion<span className="end-dot">.</span></h1>
          <p className="hero-description">Commercial CGI, 3D animation and creative direction for brands with something to say.</p>
          <div className="hero-links"><a className="btn btn-dark" href="#work">EXPLORE OUR WORK <IconArrow diagonal size={17}/></a><a className="subtle-cta" href="#contact">Start a project <IconArrow diagonal size={16}/></a></div>
          <div className="hero-index"><span>EST. IN MALAYSIA / INDEPENDENT BY DESIGN</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <div className="hero-right"><ArtFrame kind="hero" id="hero" text="FEATURED SHOWREEL / FOOTAGE PENDING APPROVAL"/><div className="hero-frame-top"><span>ESTORIQ / CGI STUDIES</span><span>V0.2</span></div><div className="hero-frame-bottom"><span>01 / A STUDY IN FORM</span><span>PREVIEW FRAME — NOT CLIENT WORK</span></div></div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-heading">
        <div className="content-width"><div className="section-top"><span className="eyebrow-number">01 / SELECTED WORK</span><span>COMMERCIAL CGI & MOTION</span></div>
          <div className="work-heading-row"><h2 id="work-heading">Work that<br/><em>speaks for itself.</em></h2><div className="section-intro"><p>A selection of visual stories shaped by craft, curiosity and attention to detail.</p><span className="small-note">Project slots are illustrative until client material is approved.</span></div></div>
          <div className="projects">
            {PORTFOLIO.map((project, i) => <article className={`project-card ${project.size === 'featured' ? 'project-featured' : ''}`} key={project.id}>
              <button className="project-media" onClick={() => setSelected(project)} aria-label={`Preview project: ${project.title}`}>
                <ArtFrame kind={project.style} id={project.id} text="CONCEPT FRAME / NOT APPROVED CLIENT ARTWORK"/>
                <span className="project-media-top">{project.index} / {project.eyebrow}</span><span className="project-open"><IconArrow diagonal size={22}/></span>
              </button>
              <div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.intro}</p></div><button onClick={() => setSelected(project)} className="project-details">PROJECT PREVIEW <IconArrow diagonal size={16}/></button></div>
            </article>)}
          </div>
          <div className="work-footnote"><span>↗</span><p>Actual client imagery, film footage and final credits will be included only after owner QC and permission checks.</p></div>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-heading"><div className="content-width"><div className="section-top"><span className="eyebrow-number">02 / EXPERTISE</span><span>WHAT WE DO</span></div><div className="services-heading-row"><h2 id="services-heading">From an idea<br/>to an <em>impact.</em></h2><p>Focused creative capabilities, connected from concept to final frame.</p></div><div className="service-grid">{SERVICES.map(s => <div className="service" key={s.no}><span className="service-index">{s.no}</span><div className="service-icon"><IconArrow diagonal size={23}/></div><h3>{s.title}</h3><p>{s.description}</p><span className="service-tags">{s.tags}</span></div>)}</div><div className="process"><span>OUR APPROACH</span><div><span>01 / DISCOVER</span><span className="process-arrow">→</span><span>02 / DEVELOP</span><span className="process-arrow">→</span><span>03 / DELIVER</span></div></div></div></section>

      <section className="studio-section" id="studio" aria-labelledby="studio-heading"><div className="content-width"><div className="section-top"><span className="eyebrow-number">03 / THE STUDIO</span><span>SMALL BY DESIGN. BOLD IN INTENTION.</span></div><div className="studio-grid"><div><p className="overline dark-overline">INDEPENDENT CREATIVE PRACTICE</p><h2 id="studio-heading">Crafting the<br/><span>unordinary.</span></h2></div><div className="studio-copy"><p>Estoriq Creative Lab is an independent creative studio focused on CGI, 3D animation and visual storytelling.</p><p>We approach every frame with a balance of intentional design, technical craft and curiosity — from a single product image to a larger visual world.</p><a href="#contact" className="text-action">LET'S COLLABORATE <IconArrow diagonal size={16}/></a></div></div></div></section>

      <section className="archive-section" id="archive" aria-labelledby="archive-heading"><div className="content-width"><div className="section-top"><span className="eyebrow-number">04 / DIRECTOR'S ARCHIVE</span><span>INDIVIDUAL WORK & CONTRIBUTIONS</span></div><div className="archive-layout"><div className="archive-intro"><h2 id="archive-heading">A body of work.<br/><em>Beyond the studio.</em></h2><p>Selected projects and creative contributions across professional roles. Every published piece will show individual responsibilities and appropriate attribution.</p><div className="archive-disclaimer"><strong>CREDIT CLARITY</strong><br/>Professional archive projects are individual credits, not Estoriq Creative Lab commissions.</div></div><div className="archive-slots"><div className="archive-slot"><div className="archive-placeholder"><span>ARCHIVE IMAGE / 01</span><span>+</span></div><div><h3>Selected project — pending approval</h3><p>Employer / production credit to be verified</p></div></div><div className="archive-slot"><div className="archive-placeholder archive-placeholder-second"><span>ARCHIVE IMAGE / 02</span><span>+</span></div><div><h3>Selected project — pending approval</h3><p>Individual role and attribution to be verified</p></div></div></div></div></div></section>

      <section className="originals-section" id="originals" aria-labelledby="originals-heading"><div className="original-art"><ArtFrame kind="original" id="langkatera" text="ORIGINAL IP / CONCEPT ART PLACEHOLDER"/></div><div className="original-content"><div className="original-kicker">05 / ESTORIQ ORIGINALS</div><p className="original-subtag">AN ORIGINAL WORLD IN DEVELOPMENT</p><h2 id="originals-heading">LANG<span>KA</span>TERA</h2><p>Where myth meets ambition. A Nusantara-inspired fantasy universe in visual development.</p><span className="original-badge"><span/> ORIGINAL IP — IN DEVELOPMENT</span><a href="https://www.behance.net/nazmibayan" className="original-link" target="_blank" rel="noopener noreferrer">FOLLOW OUR CREATIVE WORK <IconArrow diagonal size={16}/></a></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="content-width"><div className="section-top"><span className="eyebrow-number">06 / GET IN TOUCH</span><span>LET'S MAKE SOMETHING</span></div><div className="contact-grid"><div><h2 id="contact-heading">Have a project<br/><em>in mind?</em> <span>↗</span></h2></div><div className="contact-aside"><p>Tell us what you're creating. Let's talk about the next frame, the next story, or the next big idea.</p><a className="btn btn-dark" href="https://www.behance.net/nazmibayan" target="_blank" rel="noopener noreferrer">CONNECT VIA BEHANCE <IconArrow diagonal size={18}/></a><button className="copy-contact" onClick={copyBehance}>{copySuccess ? 'PORTFOLIO LINK COPIED ✓' : 'COPY PORTFOLIO LINK ↗'}</button><div className="contact-pending">Direct business email and enquiry form will be enabled once approved.</div></div></div></div></section>
    </main>
    <footer className="footer"><div className="content-width"><div className="footer-head"><a href="#top" className="footer-wordmark">ESTORIQ<span>®</span></a><div className="footer-column"><b>EXPLORE</b><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#archive">Director's Archive</a><a href="#originals">Originals</a></div><div className="footer-column"><b>CONNECT</b><a href="https://www.behance.net/nazmibayan" target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="#contact">Start a project ↗</a><span>Malaysia</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ESTORIQ CREATIVE LAB</span><span>PROTOTYPE V0.2 / OWNER REVIEW ONLY</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    {selected && <DetailDialog project={selected} close={() => setSelected(null)}/>}
  </div>
}
