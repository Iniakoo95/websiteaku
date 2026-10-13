import { useCallback, useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import { seedHtml, seedCss } from './studioSeed.js'
import './StudioBuilder.css'

const PROJECT_KEY = 'estoriq-studio-canvas-v1'
const icons = { cursor:'↖',blocks:'▦',layers:'☷',assets:'▧',design:'◫',settings:'☰',undo:'↶',redo:'↷',eye:'◉',save:'↓',download:'⇩',type:'T',image:'▧' }

function addBlocks(editor) {
  const blocks = [
    ['section','Section','Structure','<section style="padding:100px 7%;min-height:260px;background:#f2eee8"><h2 style="font-size:44px;line-height:1.1;margin:0 0 15px">New section</h2><p style="max-width:550px;color:#777">Edit this copy directly on canvas.</p></section>'],
    ['two-columns','Two columns','Structure','<div style="display:flex;gap:28px;padding:28px;flex-wrap:wrap"><div style="flex:1;min-width:200px;min-height:170px;background:#eeebe6;padding:25px">Column 1</div><div style="flex:1;min-width:200px;min-height:170px;background:#ddd9d2;padding:25px">Column 2</div></div>'],
    ['frame','Freeform frame','Structure','<div style="position:relative;min-height:430px;background:#e6e3dd;overflow:hidden;border:1px solid #bbb6ae"><div style="position:absolute;left:40px;top:35px;width:200px;height:120px;background:#c7765d;padding:18px;color:#fff">Move me by editing X / Y in the right panel.</div></div>'],
    ['heading','Heading','Text','<h2 style="font-family:Manrope,Arial,sans-serif;font-size:56px;line-height:1.1;letter-spacing:-2px;margin:20px 0">Your headline</h2>'],
    ['paragraph','Paragraph','Text','<p style="font-size:16px;line-height:1.7;max-width:600px">Double-click this text to edit its content.</p>'],
    ['button','Button','Text','<a href="#contact" style="display:inline-block;background:#222;color:white;padding:18px 26px;font-size:13px;font-weight:700;text-decoration:none">Explore project ↗</a>'],
    ['divider','Divider','Text','<div style="height:1px;width:100%;background:#c3bdb4;margin:30px 0"></div>'],
    ['image','Image','Media',{type:'image',src:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',style:{width:'100%',display:'block'}}],
    ['video','Video','Media',{type:'video',src:'https://www.youtube.com/watch?v=aqz-KE-bpKQ',style:{width:'100%',height:'350px'}}],
    ['hero','Hero layout','Sections','<section style="display:flex;align-items:center;justify-content:space-between;gap:36px;min-height:470px;padding:65px 7%;background:#f1eee8;flex-wrap:wrap"><div style="flex:1;min-width:280px"><div style="font-size:12px;letter-spacing:2px">CGI &amp; MOTION</div><h1 style="font-size:67px;line-height:1.03">Your next<br>headline.</h1><p>Describe what makes your work distinctive.</p></div><div style="flex:1;min-width:280px;height:350px;background:#777d80"></div></section>'],
    ['project-card','Project card','Sections','<article style="max-width:450px;margin:15px;background:#f7f5f0"><div style="height:240px;background:#555e62;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;letter-spacing:2px">PROJECT IMAGE</div><div style="padding:22px"><p style="font-size:11px;letter-spacing:2px;color:#777">COMMERCIAL CGI</p><h3 style="font-size:30px;margin:12px 0">Project name</h3><p>Project information pending approval.</p></div></article>'],
    ['callout','Contact CTA','Sections','<section style="background:#d9aa95;padding:95px 7%;min-height:350px"><h2 style="font-size:60px;line-height:1.15;margin-bottom:25px">Have a project in mind?</h2><a href="https://www.behance.net/nazmibayan" style="display:inline-block;background:#222;color:#fff;padding:18px 24px">GET IN TOUCH ↗</a></section>'],
    ['shape','Shape','Design','<div style="width:150px;height:150px;background:#c7785b;border-radius:16px"></div>']
  ]
  blocks.forEach(([id,label,category,content])=>editor.BlockManager.add(id,{label,category,content,select:true}))
}

function standaloneHTML(editor) {
  const css=editor.getCss({avoidProtected:true})
  const html=editor.getHtml()
  return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Estoriq Creative Lab — Draft Preview</title><style>${css.replace(/<\/style/gi,'<\\/style')}</style></head><body>${html}</body></html>`
}
function download(name,content,mime='text/plain') {
  const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)
}
function NumericControl({label, value, onChange, min=0, max=500, step=1, unit='px', allowNegative=false}) {
  const raw=String(value??'').trim()
  const matched=raw.match(/^(-?\\d+(?:\\.\\d+)?)(px|%|rem|em|vw|vh|deg)?$/i)
  const [typed,setTyped]=useState(null)
  useEffect(()=>setTyped(null),[raw])
  const current=matched?Number(matched[1]):min
  const display=typed===null?(matched?matched[1]:raw):typed
  const suffix=matched?.[2]||unit
  const lo=allowNegative?Math.min(min,-500):min
  const slider=Math.max(lo,Math.min(max,current))
  const emit=n=>{
    if(n===''||n==='-'||n==='.') {setTyped(n);return}
    if(!Number.isFinite(Number(n)))return
    const number=Number(n)
    setTyped(null)
    onChange(suffix==='unitless'?String(number):String(number)+suffix)
  }
  return <div className="es-numeric">
    <div className="es-numeric-head"><label>{label}</label><div className="es-numeric-input">
      <input type="number" inputMode="decimal" value={display} step={step}
        onChange={e=>emit(e.target.value)} aria-label={label+' exact value'} />
      <span>{suffix==='unitless'?'—':suffix}</span>
    </div></div>
    <input type="range" min={lo} max={max} step={step} value={slider}
      aria-label={label+' slider'} onChange={e=>emit(e.target.value)}/>
    {!matched&&raw&&<small>Custom CSS: {raw} · drag slider to replace</small>}
  </div>
}

export default function StudioBuilder() {
  const canvasRef=useRef(null),blocksRef=useRef(null),layersRef=useRef(null),stylesRef=useRef(null),traitsRef=useRef(null),selectorsRef=useRef(null)
  const editorRef=useRef(null),uploadRef=useRef(null),importRef=useRef(null)
  const [left,setLeft]=useState('blocks'),[right,setRight]=useState('design'),[device,setDevice]=useState('Desktop')
  const [zoom,setZoom]=useState(100),[selected,setSelected]=useState(null),[revision,setRevision]=useState(0)
  const [assets,setAssets]=useState([]),[preview,setPreview]=useState(false),[previewHTML,setPreviewHTML]=useState(''),[status,setStatus]=useState('Draft stored locally • Nothing is published')
  const [busy,setBusy]=useState(false)

  const forceRefresh=useCallback(()=>setRevision(n=>n+1),[])
  useEffect(()=>{
    if (!canvasRef.current || editorRef.current) return undefined
    const editor=grapesjs.init({
      container:canvasRef.current,height:'100%',width:'auto',fromElement:false,
      panels:{defaults:[]},
      blockManager:{appendTo:blocksRef.current},
      layerManager:{appendTo:layersRef.current},
      selectorManager:{appendTo:selectorsRef.current,componentFirst:true},
      styleManager:{appendTo:stylesRef.current,sectors:[
        {name:'Layout',open:true,properties:['display','position','width','height','min-height','max-width','top','left','right','bottom','margin','padding','overflow','z-index']},
        {name:'Typography',open:true,properties:['font-family','font-size','font-weight','line-height','letter-spacing','text-align','color','text-decoration']},
        {name:'Appearance',open:false,properties:['background-color','background-image','opacity','border','border-radius','box-shadow','transform']},
        {name:'Flex & Spacing',open:false,properties:['flex-direction','flex-wrap','justify-content','align-items','gap','order']}
      ]},
      traitManager:{appendTo:traitsRef.current},
      assetManager:{upload:false,assets:[]},
      deviceManager:{devices:[{id:'Desktop',name:'Desktop',width:''},{id:'Tablet',name:'Tablet',width:'820px',widthMedia:'820px'},{id:'Mobile',name:'Mobile',width:'390px',widthMedia:'390px'}]},
      canvas:{styles:[],scripts:[]},
      storageManager:{type:'local',autosave:true,autoload:true,stepsBeforeSave:2,options:{local:{key:PROJECT_KEY}}},
      components:seedHtml,style:seedCss,
      showOffsets:true,noticeOnUnload:false
    })
    editorRef.current=editor
    addBlocks(editor)
    const select=()=>{setSelected(editor.getSelected());forceRefresh()}
    const update=()=>{forceRefresh()}
    editor.on('component:selected',select)
    editor.on('component:deselected',select)
    editor.on('component:styleUpdate',update)
    editor.on('component:update:content',update)
    editor.on('load',()=>{
      editor.setDevice('Desktop')
      editor.Canvas.setZoom(100)
      setAssets(editor.AssetManager.getAll().models.map(x=>({src:x.get('src'),name:x.get('name')})))
      setStatus('Ready. Click any element to select; double-click text to edit. Draft autosaves on this device.')
    })
    // Handles are provided by GrapesJS; expose them for selected elements.
    editor.on('component:selected',component=>{if(component && component.get('draggable')!==false && component.get('tagName')!=='body') component.set('resizable',{tl:1,tr:1,bl:1,br:1,tc:1,bc:1,cl:1,cr:1})})
    return ()=>{editorRef.current=null;editor.destroy()}
  },[forceRefresh])

  useEffect(()=>{
    function keydown(e) {
      if (preview || !editorRef.current) return
      const target=e.target
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(target.tagName))) return
      const ctrl=e.ctrlKey||e.metaKey
      if(ctrl&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?editorRef.current.UndoManager.redo():editorRef.current.UndoManager.undo()}
      if(ctrl&&e.key.toLowerCase()==='y'){e.preventDefault();editorRef.current.UndoManager.redo()}
      if((e.key==='Backspace'||e.key==='Delete')&&selected){e.preventDefault();selected.remove();setSelected(null)}
      if(e.key==='Escape')editorRef.current.select(null)
    }
    window.addEventListener('keydown',keydown);return()=>window.removeEventListener('keydown',keydown)
  },[preview,selected])

  const getEditor=()=>editorRef.current
  const changeDevice=(id)=>{getEditor()?.setDevice(id);setDevice(id)}
  const changeZoom=(n)=>{const next=Math.min(125,Math.max(40,Number(n)||100));getEditor()?.Canvas.setZoom(next);setZoom(next)}
  const changeStyle=(property,value)=>{if(!selected)return; selected.addStyle({[property]:value});forceRefresh()}
  const selectedStyle=selected?.getStyle?.()||{}
  const activeName=selected?.getName?.() || selected?.get('tagName') || 'Nothing selected'
  const isText=selected && ['h1','h2','h3','h4','p','a','span','strong','em'].includes((selected.get('tagName')||'').toLowerCase())
  const getText=()=>selected?.get('content')||''
  const save=async()=>{
    const ed=getEditor();if(!ed)return
    setBusy(true)
    try{await ed.store();setStatus('Saved locally on this device. Export .JSON for a reliable backup; production unchanged.')}
    catch(e){setStatus('Local save failed: '+e.message+' — export JSON for backup.')}
    finally{setBusy(false)}
  }
  const exportProject=()=>{const ed=getEditor();if(!ed)return;download('estoriq-studio-project.json',JSON.stringify(ed.getProjectData(),null,2),'application/json');setStatus('Project JSON downloaded — this is your editable backup.')}
  const exportHTML=()=>{const ed=getEditor();if(!ed)return;download('estoriq-draft.html',standaloneHTML(ed),'text/html');setStatus('Standalone HTML downloaded for review, not deployed.')}
  const importProject=async(e)=>{
    const file=e.target.files?.[0];e.target.value='';if(!file)return
    if(!window.confirm('Replace this device draft with the imported project? Export current JSON first if you need a backup.'))return
    try{
      const raw=await file.text();const data=JSON.parse(raw)
      if(!data || typeof data!=='object'||(!Array.isArray(data.pages) && !Array.isArray(data.styles)))throw Error('Not a valid GrapesJS project JSON')
      getEditor()?.loadProjectData(data);setStatus('Project JSON loaded. Click Save Draft to persist.');setSelected(null)
    }catch(e){setStatus('Import failed: '+e.message)}
  }
  const importImage=async(e)=>{
    const files=Array.from(e.target.files||[]);e.target.value='';const ed=getEditor();if(!ed)return
    for(const f of files){
      if(!f.type.startsWith('image/')){setStatus('Only image files are supported.');continue}
      if(f.size>1.5*1024*1024){setStatus('Image too large for local draft (maximum 1.5 MB each). Compress it first.');continue}
      const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsDataURL(f)})
      ed.AssetManager.add({src,name:f.name})
      setAssets(ed.AssetManager.getAll().models.map(x=>({src:x.get('src'),name:x.get('name')})))
      setLeft('assets');setStatus('Image added locally. Click its thumbnail to insert into the canvas.')
    }
  }
  const insertImage=(src)=>{const ed=getEditor();if(!ed)return;const s=ed.getSelected();if(s && s.get('type')==='image')s.addAttributes({src});else ed.addComponents({type:'image',src,style:{width:'100%',maxWidth:'700px',display:'block'}});setStatus('Image inserted into canvas. Resize or style it using the right panel.')}
  const duplicate=()=>{if(!selected)return;const parent=selected.parent();if(parent){parent.append(selected.clone(),{at:parent.components().indexOf(selected)+1});setStatus('Element duplicated.')}}
  const remove=()=>{selected?.remove();setSelected(null)}
  const startPreview=()=>{if(!getEditor())return;setPreviewHTML(standaloneHTML(getEditor()));setPreview(true)}
  const reset=()=>{if(!window.confirm('Reset the entire local design to the original Estoriq starter? Export your JSON first.'))return;getEditor()?.loadProjectData({pages:[{frames:[{component:seedHtml,styles:seedCss}]}]});localStorage.removeItem(PROJECT_KEY);window.location.reload()}

  return <div className="sc-root">
    <header className="sc-top">
      <div className="sc-brand"><a href="./" title="View existing website">E<span>.</span></a><div><b>ESTORIQ STUDIO</b><small>VISUAL CANVAS / PRIVATE QC</small></div><div className="sc-doc">Website / Home <span>⌄</span></div></div>
      <div className="sc-top-center"><span className="sc-status-dot"/> {busy?'Saving…':'Draft workspace'}</div>
      <div className="sc-actions"><button title="Undo" onClick={()=>getEditor()?.UndoManager.undo()}>{icons.undo}</button><button title="Redo" onClick={()=>getEditor()?.UndoManager.redo()}>{icons.redo}</button><span className="sc-sep"/><button title="Preview" onClick={startPreview}>◉ <span>Preview</span></button><button className="sc-save" disabled={busy} onClick={save}>Save draft</button><button className="sc-export" onClick={exportProject}>Export ▾</button></div>
    </header>
    <div className="sc-workspace">
      <aside className="sc-left sc-pane">
        <div className="sc-pane-header"><b>ELEMENTS</b><span>+</span></div>
        <div className="sc-tabs">{[['blocks','Insert'],['layers','Layers'],['assets','Assets']].map(([id,label])=><button className={left===id?'active':''} onClick={()=>setLeft(id)} key={id}>{label}</button>)}</div>
        <div className="sc-left-content">
          <div className="sc-insert" ref={blocksRef} style={{display:left==='blocks'?'block':'none'}} />
          <div className="sc-layer-list" ref={layersRef} style={{display:left==='layers'?'block':'none'}} />
          {left==='assets'&&<div className="sc-assets"><button className="sc-upload-button" onClick={()=>uploadRef.current?.click()}>+ Upload image from device</button><p>Images remain local until you export the project. Max 1.5 MB each.</p><div className="sc-asset-grid">{assets.map((a,i)=><button key={i} title={a.name} onClick={()=>insertImage(a.src)}><img src={a.src} alt={a.name||'Uploaded image'}/></button>)}</div></div>}
        </div>
        <div className="sc-left-footer"><button onClick={exportHTML}>↓ Export HTML</button><button onClick={exportProject}>↓ Project JSON</button><button onClick={()=>importRef.current?.click()}>↑ Import JSON</button></div>
      </aside>
      <div className="sc-center">
        <div className="sc-canvas-toolbar"><div className="sc-device-buttons">{[['Desktop','▣'],['Tablet','▥'],['Mobile','▯']].map(([id,ic])=><button key={id} className={device===id?'selected':''} onClick={()=>changeDevice(id)} title={id}>{ic}<span>{id}</span></button>)}</div><div className="sc-view-controls"><span>{device==='Desktop'?'Fluid':device==='Tablet'?'820px':'390px'}</span><button onClick={()=>changeZoom(zoom-10)}>−</button><b>{zoom}%</b><button onClick={()=>changeZoom(zoom+10)}>+</button></div></div>
        <div className="sc-canvas-bg"><div className="sc-canvas-surface" ref={canvasRef} /></div>
        <div className="sc-canvas-bottom"><span>↖ Select · Double-click text to edit · Drag blocks onto canvas</span><span>NOT PUBLISHED</span></div>
      </div>
      <aside className="sc-right sc-pane">
        <div className="sc-pane-header"><b>PROPERTIES</b><span>↗</span></div>
        <div className="sc-tabs">{[['design','Design'],['settings','Settings']].map(([id,label])=><button key={id} className={right===id?'active':''} onClick={()=>setRight(id)}>{label}</button>)}</div>
        <div className="sc-property-scroll">
          <div className="sc-selected"><span>SELECTED LAYER</span><b>{activeName}</b>{selected&&<div><button onClick={duplicate}>⧉ Duplicate</button><button onClick={remove}>⌫ Delete</button></div>}</div>
          {right==='design'&&selected&&<div className="sc-quick">
            <b>QUICK CONTROLS</b>
            <div className="sc-numeric-list">
              <NumericControl label="Width" value={selectedStyle.width} min={0} max={1600} onChange={v=>changeStyle('width',v)} />
              <NumericControl label="Height" value={selectedStyle.height} min={0} max={1200} onChange={v=>changeStyle('height',v)} />
              <NumericControl label="X / Left" value={selectedStyle.left} min={-500} max={1500} allowNegative onChange={v=>changeStyle('left',v)} />
              <NumericControl label="Y / Top" value={selectedStyle.top} min={-500} max={1500} allowNegative onChange={v=>changeStyle('top',v)} />
              <NumericControl label="Padding" value={selectedStyle.padding} max={200} onChange={v=>changeStyle('padding',v)} />
              <NumericControl label="Margin" value={selectedStyle.margin} min={-200} max={200} allowNegative onChange={v=>changeStyle('margin',v)} />
              <NumericControl label="Corner radius" value={selectedStyle['border-radius']} max={200} onChange={v=>changeStyle('border-radius',v)} />
              <NumericControl label="Font size" value={selectedStyle['font-size']} max={180} onChange={v=>changeStyle('font-size',v)} />
              <NumericControl label="Letter spacing" value={selectedStyle['letter-spacing']} min={-15} max={40} step={0.5} allowNegative onChange={v=>changeStyle('letter-spacing',v)} />
              <NumericControl label="Opacity" value={selectedStyle.opacity??'1'} max={1} step={0.01} unit="unitless" onChange={v=>changeStyle('opacity',v)} />
              <NumericControl label="Rotation" value={((selectedStyle.transform||'').match(/rotate\((-?[\d.]+)deg\)/)?.[1] || '0')+'deg'} min={-180} max={180} allowNegative unit="deg" onChange={v=>changeStyle('transform',`rotate(${v})`)} />
            </div>
            <div className="sc-position-actions"><button onClick={()=>changeStyle('position','absolute')}>Free-position</button><button onClick={()=>{changeStyle('position','relative');changeStyle('left','auto');changeStyle('top','auto')}}>Responsive flow</button></div>
            <p>Free-position uses CSS absolute positioning. Use inside a relative Frame; mobile layouts may need adjustment.</p>
            {isText&&<div className="sc-text-edit"><label>TEXT CONTENT</label><textarea value={getText()} onChange={e=>{selected.set('content',e.target.value.replace(/</g,'&lt;'));forceRefresh()}} rows={3}/></div>}
          </div>}
          <div className="sc-style-panel" style={{display:right==='design'?'block':'none'}}><div className="sc-inline-title">ADVANCED STYLES</div><div ref={selectorsRef}/><div ref={stylesRef}/></div>
          <div className="sc-traits-panel" style={{display:right==='settings'?'block':'none'}}><p>Change URLs, image sources, element IDs and other attributes.</p><div ref={traitsRef}/></div>
          {!selected&&<div className="sc-no-selection">Click any text, image, shape or section in the canvas to edit it.</div>}
        </div>
      </aside>
    </div>
    <footer className="sc-bottom"><span role="status">{status}</span><div><button onClick={reset}>Reset canvas</button><button onClick={()=>importRef.current?.click()}>Import project</button></div></footer>
    <input ref={uploadRef} type="file" accept="image/*" multiple hidden onChange={importImage}/>
    <input ref={importRef} type="file" accept="application/json,.json" hidden onChange={importProject}/>
    {preview&&<div className="sc-preview-overlay"><div className="sc-preview-top"><b>ESTORIQ / LIVE DESIGN PREVIEW</b><div><button onClick={exportHTML}>Export HTML ↓</button><button onClick={()=>setPreview(false)}>✕ Close Preview</button></div></div><iframe title="Draft website preview" srcDoc={previewHTML} sandbox="allow-same-origin allow-popups" className="sc-preview-frame"/><div className="sc-preview-note">Preview reads unsaved canvas state. It is not public hosting or a production deployment.</div></div>}
  </div>
}
