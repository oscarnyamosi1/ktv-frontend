import { useState, useEffect } from 'react'
import { countyNames, getConstituencies, getWards } from '../data/kenyaLocations'

export default function LocationSelect({
  value = {},
  onChange,
  showWard = true,
  required = false,
  className = '',
}) {
  const [county, setCounty] = useState(value.county || '')
  const [constituency, setConstituency] = useState(value.constituency || '')
  const [ward, setWard] = useState(value.ward || '')

  const constituencies = getConstituencies(county)
  const wards = getWards(county, constituency)

  useEffect(() => {
    if (onChange) onChange({ county, constituency, ward })
  }, [county, constituency, ward])

  const handleCounty = (e) => {
    setCounty(e.target.value)
    setConstituency('')
    setWard('')
  }

  const handleConstituency = (e) => {
    setConstituency(e.target.value)
    setWard('')
  }

  return (
    <div className={`location-select ${className}`}>
      <div className="location-select-row">
        <div className="input-group" style={{ flex: 1, margin: 0 }}>
          <label className="input-label">County {required && <span style={{ color: 'var(--destructive)' }}>*</span>}</label>
          <select className="input-field" value={county} onChange={handleCounty} required={required}>
            <option value="">Select county…</option>
            {countyNames.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="input-group" style={{ flex: 1, margin: 0 }}>
          <label className="input-label" style={{ color: county ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
            Constituency {required && <span style={{ color: 'var(--destructive)' }}>*</span>}
          </label>
          <select
            className="input-field"
            value={constituency}
            onChange={handleConstituency}
            disabled={!county}
            required={required && !!county}
          >
            <option value="">{county ? 'Select constituency…' : 'Select county first'}</option>
            {constituencies.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {showWard && (
          <div className="input-group" style={{ flex: 1, margin: 0 }}>
            <label className="input-label" style={{ color: constituency ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
              Ward / Area
            </label>
            <select
              className="input-field"
              value={ward}
              onChange={e => setWard(e.target.value)}
              disabled={!constituency}
            >
              <option value="">{constituency ? 'Select ward…' : 'Select constituency first'}</option>
              {wards.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
