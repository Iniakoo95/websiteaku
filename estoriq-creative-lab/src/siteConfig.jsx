import { useState } from 'react'
import { ArtFrame, IconArrow } from './App.jsx'

// Only safe destinations: internal anchors, https, http and mailto.
// The editor is for private QC and never automatically publishes the page.
function safeHref(value, fallback = '#contact') {
  if (typeof value !== 'string') return fallback
  const url = value.trim()
  if (url.startsWith('#') || /^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url
  return fallback
}
function Media({ url, kind = 'bottles', id = 'editor-media', label = 'ARTWORK / PENDING APPROVAL' }) {
  return url && /^https?:\/\//i.test(url.trim())
    ? <div className="editable-media"><img src={url.trim()} alt={label} loading="lazy" /></div>
    : <ArtFrame kind={kind} id={id} text={label} />
}
const WORK = [
  { title: 'Objects with presence.', category: 'Commercial CGI / Visualisation', caption: 'Product imagery designed around form, texture and light.', role: '3D imagery · Look development · Lighting', image: '', kind: 'bottles' },
  { title: 'Made to move.', category: 'Product Animation / Motion', caption: 'Product storytelling through deliberate movement and timing.', role: 'Animation · Art direction · Rendering', image: '', kind: 'motion' },
  { title: 'Every detail matters.', category: 'Creative CGI / Still Images', caption: 'Distinctive visual treatments for commercial ideas.', role: 'CGI · Compositing · Creative exploration', image: '', kind: 'sculpture' }
]
const EXPERTISE = [
  { title: 'Product CGI & Visualisation', description: 'Elevated stills, product mockups and campaign imagery built to make materials and details feel tangible.' },
  { title: '3D Animation & Motion', description: 'Motion-led product stories — from an elegant reveal to a complete visual sequence.' },
  { title: 'Creative Direction', description: 'A clear visual point of view from the first frame through the final delivery.' }
]
const ARCHIVE = [
  { title: 'Selected project — pending approval', detail: 'Employer / production credit to be verified', image: '' },
  { title: 'Selected project — pending approval', detail: 'Individual role and attribution to be verified', image: '' }
]
const BEHANCE = 'https://www.behance.net/nazmibayan'

function HeroBlock({ eyebrow, headline, description, primary, secondary, image, imageLabel }) {
  return <section className="hero editorial-hero" aria-label="Estoriq introduction">
    <div className="hero-left">
      <p className="overline hero-eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
      <h1>{headline}</h1>
      <p className="hero-description">{description}</p>
      <div className="hero-links">
        <a className="btn btn-dark" href="#work">{primary} <IconArrow diagonal size={17}/></a>
        <a className="subtle-cta" href="#contact">{secondary} <IconArrow diagonal size={16}/></a>
      </div>
      <div className="hero-index"><span>INDEPENDENT BY DESIGN</span><span>SCROLL TO EXPLORE ↓</span></div>
    </div>
    <div className="hero-right">
      <Media url={image} kind="hero" id="editable-hero" label={imageLabel || 'FEATURED SHOWREEL / PENDING APPROVAL'} />
      <div className="hero-frame-top"><span>ESTORIQ / CGI STUDIES</span><span>CREATIVE LAB</span></div>
    </div>
  </section>
}

function WorkBlock({ title, subtitle, projects = WORK }) {
  const [selected, setSelected] = useState(null)
  return <section className="work-section" id="work" aria-labelledby="work-heading">
    <div className="content-width">
      <div className="section-top"><span className="eyebrow-number">01 / SELECTED WORK</span><span>COMMERCIAL CGI & MOTION</span></div>
      <div className="work-heading-row"><h2 id="work-heading">{title}</h2><div className="section-intro"><p>{subtitle}</p><span className="small-note">Real project details and client credits require approval.</span></div></div>
      <div className="projects">
        {(projects || []).map((p,i)=><article className={`project-card ${i===0?'project-featured':''}`} key={i}>
          <button className="project-media" type="button" onClick={()=>setSelected(p)} aria-label={`Open details for ${p.title}`}>
            <Media url={p.image} kind={p.kind||'bottles'} id={`editable-project-${i}`} label="CONCEPT FRAME / CONTENT PENDING APPROVAL" />
            <span className="project-media-top">{String(i+1).padStart(2,'0')} / {p.category}</span>
            <span className="project-open"><IconArrow diagonal size={22}/></span>
          </button>
          <div className="project-info"><div><span className="project-type">{p.category}</span><h3>{p.title}</h3><p>{p.caption}</p></div>
            <button className="project-details" type="button" onClick={()=>setSelected(p)}>VIEW PROJECT <IconArrow diagonal size={16}/></button></div>
        </article>)}
      </div>
      <div className="work-footnote"><span>ⓘ</span><p>All client visuals and claims remain subject to owner approval before production.</p></div>
    </div>
    {selected && <div className="dialog-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label={selected.title}>
        <button className="dialog-close" type="button" onClick={()=>setSelected(null)}>CLOSE ×</button>
        <div className="dialog-image"><Media url={selected.image} kind={selected.kind} id="editor-detail" /></div>
        <div className="dialog-body"><div className="overline">PROJECT / CONTENT SUBJECT TO QC</div><h2>{selected.title}</h2><p className="dialog-intro">{selected.caption}</p><div className="detail-rule"/><dl><div><dt>TYPE</dt><dd>{selected.category}</dd></div><div><dt>PRODUCTION SCOPE</dt><dd>{selected.role}</dd></div></dl><p className="disclaimer">Illustrative until credits and images are approved.</p></div>
      </section></div>}
  </section>
}

function ServicesBlock({ heading, introduction, services = EXPERTISE }) {
  return <section className="services-section" id="services">
    <div className="content-width">
      <div className="section-top"><span className="eyebrow-number">02 / EXPERTISE</span><span>WHAT WE DO</span></div>
      <div className="services-heading-row"><h2>{heading}</h2><p>{introduction}</p></div>
      <div className="service-grid">{(services||[]).map((s,i)=><div className="service" key={i}><span className="service-index">0{i+1}</span><div className="service-icon"><IconArrow diagonal size={23}/></div><h3>{s.title}</h3><p>{s.description}</p><span className="service-tags">3D / CREATIVE / PRODUCTION</span></div>)}</div>
      <div className="process"><span>OUR APPROACH</span><div><span>01 / DISCOVER</span><span className="process-arrow">→</span><span>02 / DEVELOP</span><span className="process-arrow">→</span><span>03 / DELIVER</span></div></div>
    </div>
  </section>
}

function StudioBlock({ kicker, headline, paragraph1, paragraph2, image }) {
  return <section className="studio-section" id="studio">
    <div className="content-width">
      <div className="section-top"><span className="eyebrow-number">03 / THE STUDIO</span><span>INDEPENDENT BY DESIGN</span></div>
      <div className="studio-grid">
        <div><p className="overline dark-overline">{kicker}</p><h2>{headline}</h2></div>
        <div className="studio-copy"><p>{paragraph1}</p><p>{paragraph2}</p><a className="text-action" href="#contact">LET'S COLLABORATE <IconArrow diagonal size={16}/></a></div>
      </div>
      {image && <div className="editable-studio-image"><Media url={image} label="STUDIO / APPROVED IMAGE" id="studio-image"/></div>}
    </div>
  </section>
}

function ArchiveBlock({ headline, description, projects = ARCHIVE }) {
  return <section className="archive-section" id="archive">
    <div className="content-width">
      <div className="section-top"><span className="eyebrow-number">04 / DIRECTOR'S ARCHIVE</span><span>INDIVIDUAL CREATIVE CREDITS</span></div>
      <div className="archive-layout">
        <div className="archive-intro"><h2>{headline}</h2><p>{description}</p><div className="archive-disclaimer"><strong>CREDIT CLARITY</strong><p>Individual professional credits — not Estoriq Creative Lab commissions.</p></div></div>
        <div className="archive-slots">{(projects||[]).map((p,i)=><div className="archive-slot" key={i}>
          <div className="archive-placeholder">{p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <><span>ARCHIVE / {String(i+1).padStart(2,'0')}</span><span>+</span></>}</div>
          <div><h3>{p.title}</h3><p>{p.detail}</p></div></div>)}</div>
      </div>
    </div>
  </section>
}

function OriginalsBlock({ kicker, title, description, image, buttonLabel, buttonUrl }) {
  return <section className="originals-section" id="originals">
    <div className="original-art"><Media url={image} kind="original" id="originals-editor" label="ORIGINAL IP / CONCEPT ART PLACEHOLDER"/></div>
    <div className="original-content"><div className="original-kicker">05 / ESTORIQ ORIGINALS</div><p className="original-subtag">{kicker}</p><h2>{title}</h2><p>{description}</p><span className="original-badge"><span/> ORIGINAL IP — IN DEVELOPMENT</span>
      <a className="original-link" href={safeHref(buttonUrl, BEHANCE)} target={buttonUrl?.startsWith('#')?undefined:'_blank'} rel="noopener noreferrer">{buttonLabel} <IconArrow diagonal size={16}/></a></div>
  </section>
}

function ContactBlock({ headline, description, buttonLabel, buttonUrl }) {
  return <section className="contact-section" id="contact">
    <div className="content-width"><div className="section-top"><span className="eyebrow-number">06 / GET IN TOUCH</span><span>LET'S MAKE SOMETHING</span></div>
      <div className="contact-grid"><div><h2>{headline}</h2></div><div className="contact-aside">
        <p>{description}</p><a className="btn btn-dark" href={safeHref(buttonUrl,BEHANCE)} target="_blank" rel="noopener noreferrer">{buttonLabel} <IconArrow diagonal size={18}/></a>
        <div className="contact-pending">Business email and enquiry form require owner approval.</div>
      </div></div>
    </div>
  </section>
}
function TextBlock({ eyebrow, heading, body, theme }) {
  return <section className={`editable-content-block ${theme==='dark'?'dark':''}`}><div className="content-width">
    <p className="overline">{eyebrow}</p><h2>{heading}</h2><p>{body}</p></div></section>
}
function ImageBlock({ image, caption }) {
  return <section className="editable-image-block"><div className="content-width"><Media url={image} id="custom-image" label={caption||'NEW IMAGE / PLACEHOLDER'} /><p>{caption}</p></div></section>
}
const imageField = {type:'text', label:'Image URL (https://...)'}
const text = label => ({type:'text',label})
const textarea = label => ({type:'textarea',label})
const listField = (fields,summary) => ({
  type:'array', arrayFields:fields,getItemSummary: item => item?.[summary]||'New item',
  defaultItemProps: Object.fromEntries(Object.keys(fields).map(k=>[k,'']))
})
export const siteConfig = {
  components: {
    Hero: {
      label:'Hero · headline + featured visual',
      fields: {eyebrow:text('Studio descriptor'),headline:textarea('Hero headline (use line breaks)'),description:textarea('Short value proposition'),primary:text('Primary button label'),secondary:text('Secondary button label'),image:imageField,imageLabel:text('Image placeholder label')},
      defaultProps: {eyebrow:'INDEPENDENT CGI & MOTION STUDIO · MALAYSIA',headline:'Products,\nreimagined\nin motion.',description:'Commercial CGI, 3D animation and creative direction for brands with something to say.',primary:'EXPLORE OUR WORK',secondary:'Start a project',image:'',imageLabel:'FEATURED SHOWREEL / PENDING APPROVAL'},
      render: p => <HeroBlock {...p}/>
    },
    SelectedWork: {
      label:'Selected Work · projects',
      fields:{title:textarea('Section headline'),subtitle:textarea('Introduction'),projects:listField({title:text('Project title'),category:text('Category / service'),caption:textarea('Short summary'),role:text('Studio contribution'),image:imageField,kind:{type:'select',label:'Placeholder style',options:[{label:'Product',value:'bottles'},{label:'Motion',value:'motion'},{label:'Sculpture',value:'sculpture'}]}},'title')},
      defaultProps: {title:'Work that\nspeaks for itself.',subtitle:'A selection of visual stories shaped by craft, curiosity and attention to detail.',projects:WORK},
      render:p=><WorkBlock {...p}/>
    },
    Services: {
      label:'Services · expertise cards',
      fields:{heading:textarea('Section heading'),introduction:textarea('Introduction'),services:listField({title:text('Service name'),description:textarea('Service description')},'title')},
      defaultProps:{heading:'From an idea\nto an impact.',introduction:'Focused creative capabilities, connected from concept to final frame.',services:EXPERTISE},
      render:p=><ServicesBlock {...p}/>
    },
    Studio: {
      label:'Studio · about',
      fields:{kicker:text('Overline'),headline:textarea('Large studio heading'),paragraph1:textarea('First paragraph'),paragraph2:textarea('Second paragraph'),image:imageField},
      defaultProps:{kicker:'INDEPENDENT CREATIVE PRACTICE',headline:'Crafting the\nunordinary.',paragraph1:'Estoriq Creative Lab is an independent creative studio focused on CGI, 3D animation and visual storytelling.',paragraph2:'We approach every frame with a balance of intentional design, technical craft and curiosity — from a single product image to a larger visual world.',image:''},
      render:p=><StudioBlock {...p}/>
    },
    DirectorsArchive: {
      label:'Director’s Archive · individual credits',
      fields:{headline:textarea('Headline'),description:textarea('Description'),projects:listField({title:text('Project title'),detail:textarea('Individual credits'),image:imageField},'title')},
      defaultProps:{headline:'A body of work.\nBeyond the studio.',description:'Selected professional projects. Every published item must show individual responsibilities and appropriate attribution.',projects:ARCHIVE},
      render:p=><ArchiveBlock {...p}/>
    },
    Originals: {
      label:'Originals · LANGKATERA',
      fields:{kicker:text('Project status'),title:text('Project title'),description:textarea('Project description'),image:imageField,buttonLabel:text('Button label'),buttonUrl:text('Button URL')},
      defaultProps:{kicker:'AN ORIGINAL WORLD IN DEVELOPMENT',title:'LANGKATERA',description:'Where myth meets ambition. A Nusantara-inspired fantasy universe in visual development.',image:'',buttonLabel:'FOLLOW OUR CREATIVE WORK',buttonUrl:BEHANCE},
      render:p=><OriginalsBlock {...p}/>
    },
    Contact: {
      label:'Contact · project enquiry',
      fields:{headline:textarea('Headline'),description:textarea('Description'),buttonLabel:text('CTA label'),buttonUrl:text('Approved enquiry URL')},
      defaultProps:{headline:'Have a project\nin mind?',description:"Tell us what you're creating. Let's talk about the next frame, the next story, or the next big idea.",buttonLabel:'CONNECT VIA BEHANCE',buttonUrl:BEHANCE},
      render:p=><ContactBlock {...p}/>
    },
    TextSection:{
      label:'Extra text section',
      fields:{eyebrow:text('Eyebrow'),heading:text('Headline'),body:textarea('Paragraph'),theme:{type:'select',options:[{label:'Light',value:'light'},{label:'Dark',value:'dark'}]}},
      defaultProps:{eyebrow:'ESTORIQ',heading:'A new idea.',body:'Write a short paragraph here.',theme:'light'},
      render:p=><TextBlock {...p}/>
    },
    ImageSection:{
      label:'Extra image section',
      fields:{image:imageField,caption:text('Caption / alt text')},
      defaultProps:{image:'',caption:'Image coming soon'},
      render:p=><ImageBlock {...p}/>
    }
  },
  categories:{
    'Main sections':{components:['Hero','SelectedWork','Services','Studio','DirectorsArchive','Originals','Contact']},
    'Extra content':{components:['TextSection','ImageSection']}
  }
}
export const initialSiteData={
  root:{},
  content:[
    {type:'Hero',props:{id:'hero',...siteConfig.components.Hero.defaultProps}},
    {type:'SelectedWork',props:{id:'work',...siteConfig.components.SelectedWork.defaultProps}},
    {type:'Services',props:{id:'services',...siteConfig.components.Services.defaultProps}},
    {type:'Studio',props:{id:'studio',...siteConfig.components.Studio.defaultProps}},
    {type:'DirectorsArchive',props:{id:'archive',...siteConfig.components.DirectorsArchive.defaultProps}},
    {type:'Originals',props:{id:'originals',...siteConfig.components.Originals.defaultProps}},
    {type:'Contact',props:{id:'contact',...siteConfig.components.Contact.defaultProps}}
  ]
}
