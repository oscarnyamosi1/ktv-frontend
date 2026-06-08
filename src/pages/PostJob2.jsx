import "./styles/postteachingjob.css"
import Layout from '../components/Layout'
import { teacherApi } from "../api/client"
import { useEffect,useState } from "react"

const PostJob = ()=> {


     return(
      <Layout >
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12
}}
          >
            <div style={{display: "flex", flexDirection: "column", gap: 4}}>
              <div style={{fontSize: 20, fontWeight: 700}}>
                Post a teaching job
              </div>
              <div style={{fontSize: 13, color: "var(--muted-foreground)"}}>
                Share your school's next teaching role like a social post  fast,
                easy, and engaging.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "var(--muted-foreground)"
              }}
            >
              <div className="icon-24">
                <iconify-icon
                  icon="lucide:eye"
                  style={{fontSize: 18, color: "currentColor"}}
                ></iconify-icon>
              </div>
            </div>
          </div>

          <div className="composer-layout">
            {/* <!-- Left: Composer --> */}
            <div className="composer-column">
              <div className="composer-card glass">
                <div className="composer-header">
                  <div className="poster-info">
                    <img
                      src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-50%2FEuropean%2F4"
                      className="poster-avatar"
                      alt="Principal avatar"
                    />
                    <div className="poster-details">
                      <span className="poster-name">Posting as: Greenwood High School</span>
                      <span className="poster-meta"
                        >Account Type: Principal account</span
                      >
                    </div>
                  </div>
                  <div className="composer-tabs">
                    <div
                      className="composer-tab active"
                    >
                      Compose
                    </div>
                    <div className="composer-tab">
                      Settings
                    </div>
                  </div>
                </div>

                <div className="composer-body">
                  {/* <!-- Job title --> */}
                  <div className="field-group">
                    <div className="field-label-row">
                      <div className="field-label">Role title</div>
                      <div className="field-hint">
                        E.g.  Middle School Math Teacher
                      </div>
                    </div>
                    <input className="text-input-large" placeholder="Describe the teaching role..." /></div>

                  {/* <!-- School, location row --> */}
                  <div style={{display: "flex", gap: 12}}>
                    <div className="field-group" style={{flex: 1}}>
                      <div className="field-label">School / organisation</div>
                      <div
                        className="text-input-large"
                      >
                        <input className="text-input-placeholder" placeholder="Greenwood High School" />
                      </div>
                    </div>
                    <div className="field-group" style={{flex: 1}}>
                      <div className="field-label">Location</div>
                      <div
                        className="text-input-large"
                      >
                        <select className="text-input-placeholder">
                          <option>Oscar</option><option>Oscar</option>
                        </select>
                        <div className="icon-24">
                          <iconify-icon
                            icon="lucide:map-pin"
                            style={{
                              fontSize: 18,
                              color: "var(--muted-foreground)"}}
                          ></iconify-icon>
                        </div>
                      </div>
                    </div>
                  </div>

                {/* //   <!-- Subjects & Grades chips --> */}
                  <div className="field-group">
                    <div className="field-label-row">
                      <div className="field-label">Subjects</div>
                      <div className="chip-count">3 selected</div>
                    </div>
                    <div className="chips-row">
                      <div
                        className="chip-select active"
                      >
                        Mathematics
                      </div>
                      <div
                        className="chip-select active"
                      >
                        STEM
                      </div>
                      <div className="chip-select">
                        English
                      </div>
                      <div className="chip-select">
                        Science
                      </div>
                      <div className="chip-select">
                        <div className="icon-24">
                          <iconify-icon
                            icon="lucide:plus"
                            style={{fontSize: 18, color: "currentColor"}}
                          ></iconify-icon>
                        </div>
                        Add subjects
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <div className="field-label-row">
                      <div className="field-label">Grade level</div>
                      <div className="chip-count">Choose multiple</div>
                    </div>
                    <div className="chips-row">
                      <div className="chip-select">
                        Elementary
                      </div>
                      <div
                        className="chip-select active"
                      >
                        Middle school
                      </div>
                      <div className="chip-select">
                        High school
                      </div>
                      <div className="chip-select">
                        IB / AP
                      </div>
                    </div>
                  </div>

                {/* //   <!-- Contract & schedule --> */}
                  <div className="field-group">
                    <div className="field-label-row">
                      <div className="field-label">Contract &amp; schedule</div>
                      <div className="field-hint">Tap to select</div>
                    </div>
                    <div className="chips-row">
                      <div
                        className="chip-select active"
                      >
                        Full-time
                      </div>
                      <div className="chip-select">
                        Part-time
                      </div>
                      <div className="chip-select">
                        Permanent
                      </div>
                      <div className="chip-select">
                        1-year contract
                      </div>
                    </div>
                  </div>

                {/* //   <!-- Story-style description --> */}
                  <div className="field-group">
                    <div className="field-label-row">
                      <div className="field-label">
                        Tell teachers about this role
                      </div>
                      <div className="field-hint">
                        What makes this class special?
                      </div>
                    </div>
                    <div
                      className="multiline-input"
                    >
                      <div className="multiline-placeholder">
                        <div className="text">
                          Share class size, teaching style, curriculum, timetable,
                          and what your ideal teacher is like...
                        </div>
                        <input type="text" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 11,
                          color: "var(--muted-foreground)"}}
                      >
                        <span>0 / 600 characters</span>
                        <div style={{display: "flex", gap: 8}}>
                          <div className="icon-24">
                            <iconify-icon
                              icon="lucide:smile"
                              style={{
                                fontSize: 18,
                                color: "var(--muted-foreground)" }}
                              
                            ></iconify-icon>
                          </div>
                          <div className="icon-24">
                            <iconify-icon
                              icon="lucide:image"
                              style={{
                                fontSize: 18,
                                color: "var(--muted-foreground)"}}
                            ></iconify-icon>
                          </div>
                          <div className="icon-24">
                            <iconify-icon
                              icon="lucide:hash"
                              style={{
                                fontSize: 18,
                                color: "var(--muted-foreground)"}}
                            ></iconify-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* //   <!-- Salary & Monetization --> */}
              <div className="salary-card glass">
                <div className="section-title-row">
                  <div>
                    <div className="section-title">Salary &amp; visibility</div>
                    <div className="section-tagline">
                      Transparent pay gets 2x more qualified teachers.
                    </div>
                  </div>
                </div>

                <div className="salary-type-row">
                  <div
                    className="salary-type-pill active"
                  >
                    Annual
                  </div>
                  <div className="salary-type-pill">
                    Monthly
                  </div>
                  <div className="salary-type-pill">
                    Daily
                  </div>
                  <div className="salary-type-pill">
                    Hourly
                  </div>
                </div>

                <div className="salary-range-row">
                  <div
                    className="salary-slider-track"
                  >
                    <div className="salary-slider-fill"></div>
                    <div className="salary-slider-handle left"></div>
                    <div className="salary-slider-handle right"></div>
                  </div>
                  <div className="salary-range-labels">
                    <span>$30k</span>
                    <span className="salary-current">$48k - $62k / year</span>
                    <span>$90k+</span>
                  </div>
                </div>

                <div className="toggle-row">
                  <div className="toggle-text">
                    <div className="toggle-title">Featured job</div>
                    <div className="toggle-subtitle">
                      Pin this role to the top of feeds for nearby teachers.
                    </div>
                  </div>
                  <div className="toggle-switch on">
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div className="toggle-row">
                  <div className="toggle-text">
                    <div className="toggle-title">Applications via JobSocial</div>
                    <div className="toggle-subtitle">
                      Use our chat-style applications with voice notes and short
                      answers.
                    </div>
                  </div>
                  <div className="toggle-switch">
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div className="boost-card glass">
                  <div className="boost-header">
                    <div className="boost-title-wrap">
                      <div className="icon-24">
                        <iconify-icon
                          icon="lucide:rocket"
                          style={{fontSize: 18, color: "var(--primary)"}}
                        ></iconify-icon>
                      </div>
                      <div className="boost-title">Boost this job</div>
                      <div className="boost-pill">+3x teacher reach</div>
                    </div>
                    <div className="boost-price">From $1 / day</div>
                  </div>
                  <div className="boost-body">
                    Show your role above other schools for teachers who match
                    your subject, grade, and location.
                  </div>
                  <div className="boost-footer">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: "var(--muted-foreground)"}}
                    >
                      <iconify-icon
                        icon="lucide:sparkles"
                        style={{fontSize: 14, color: "var(--primary)"}}
                      ></iconify-icon>
                      <span>Best for urgent hires in the next 30 days.</span>
                    </div>
                    <div className="boost-cta">
                      Add boost
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
      </Layout>
    )
}

export default PostJob