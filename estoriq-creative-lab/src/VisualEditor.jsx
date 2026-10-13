import { useMemo, useState } from 'react'
import { Puck, Render } from '@measured/puck'
import '@measured/puck/puck.css'
import { siteConfig, initialSiteData } from './siteConfig.jsx'
import './editor.css'

const KEY = 'estoriq:visual-editor:draft:v1'
function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    return saved && Array.isArray(saved.content) ? saved : initialSiteData
  } catch { return initialSiteData }
}
function downloadJson(data) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}))
  const a=document.createElement('a')
  a.href=url; a.download='estoriq-editor-draft.json'; a.click()
  setTimeout(()=>URL.revokeObjectURL(url),1000)
}
export default function VisualEditor() {
  const [draft,setDraft]=useState(loadDraft)
  const [review,setReview]=useState(false)
  const [status,setStatus]=useState('Drafts stay on this device. Nothing is published.')
  const config=useMemo(()=>siteConfig,[])
  function save(next) {
    localStorage.setItem(KEY,JSON.stringify(next))
    setDraft(next);setStatus('Draft saved in this browser only. Not published.')
  }
  function importFile(event) {
    const file=event.target.files?.[0]
    if (!file) return
    file.text().then(raw=>{
      const value=JSON.parse(raw)
      if (!value || !Array.isArray(value.content) || value.content.some(item=>!config.components[item.type])) throw Error('Not a valid Estoriq editor document')
      save(value);setStatus('JSON imported into local draft.')
    }).catch(e=>setStatus('Import error: '+e.message))
    event.target.value=''
  }
  return <div className="estoriq-builder">
    <div className="builder-toolbar">
      <a href="./" className="builder-back">← Website V0.2</a>
      <strong>ESTORIQ / VISUAL EDITOR <small>OWNER QC ONLY</small></strong>
      <div className="builder-actions">
        <button type="button" onClick={()=>setReview(v=>!v)}>{review?'← Edit':'Preview'}</button>
        <button type="button" onClick={()=>downloadJson(draft)}>Export JSON</button>
        <label className="builder-import">Import JSON<input type="file" accept=".json,application/json" onChange={importFile}/></label>
      </div>
    </div>
    <div className="builder-status" role="status">{status}</div>
    {review ? <div className="builder-preview"><Render config={config} data={draft} /></div>
      : <Puck config={config} data={draft} onPublish={save} />}
    <div className="builder-foot">Press Puck's Publish button to SAVE A LOCAL DRAFT ONLY. Nothing updates GitHub or the public website. Export JSON to hand changes to the developer for review.</div>
  </div>
}
