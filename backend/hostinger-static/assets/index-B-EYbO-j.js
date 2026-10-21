(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const y={async request(e,s={}){const t={credentials:"include",headers:{Accept:"application/json",...s.headers},...s};t.body&&!(t.body instanceof FormData)&&typeof t.body=="object"&&(t.headers["Content-Type"]="application/json",t.body=JSON.stringify(t.body));try{const a=await fetch(e,t);a.status===401&&!e.includes("/api/auth/login")&&window.dispatchEvent(new CustomEvent("auth:expired"));const i=a.headers.get("content-type");let n=null;if(i&&i.includes("application/json")?n=await a.json():n=await a.text(),!a.ok){const m=n&&n.message?n.message:`HTTP error ${a.status}`,l=new Error(m);throw l.status=a.status,l.data=n,l}return n}catch(a){throw console.error(`API Error [${e}]:`,a.message),a}},get(e){return this.request(e,{method:"GET"})},post(e,s){return this.request(e,{method:"POST",body:s})},put(e,s){return this.request(e,{method:"PUT",body:s})},delete(e){return this.request(e,{method:"DELETE"})},upload(e,s){return this.request(e,{method:"POST",body:s})}},ne="/assets/akbar-cricket-logo-JyUOSPOt.png";function We(e,s="command-centre"){const t=e!=null&&e.name?e.name.split(" ").map(a=>a[0]).join("").slice(0,2).toUpperCase():"AC";return`
    <aside class="app-sidebar" id="app-sidebar">
      <!-- Brand & Crest -->
      <div class="sidebar-brand-box">
        <div class="brand-crest brand-crest-image">
          <img src="${ne}" alt="Akbar Cricket Club — 1 Team 1 Dream">
        </div>
        <div class="brand-club-name">AKBAR CRICKET</div>
        <div class="brand-suite-name">TEAM MANAGEMENT SUITE</div>
        <span class="season-badge">SEASON 2026–2027</span>
      </div>

      <!-- Navigation Links -->
      <div class="sidebar-nav-container">
        <!-- GROUP 1: WORKSPACE -->
        <div class="nav-group-label">WORKSPACE</div>
        <a href="#/command-centre" class="sidebar-nav-link ${s==="command-centre"?"active":""}" data-nav="command-centre">
          <i class="bi bi-grid-1x2-fill"></i>
          <span>Command centre</span>
        </a>
        <a href="#/players" class="sidebar-nav-link ${s==="players"?"active":""}" data-nav="players">
          <i class="bi bi-people-fill"></i>
          <span>Player profiles</span>
        </a>
        <a href="#/attendance" class="sidebar-nav-link ${s==="attendance"?"active":""}" data-nav="attendance">
          <i class="bi bi-calendar-check-fill"></i>
          <span>Practice & attendance</span>
        </a>
        <a href="#/matches" class="sidebar-nav-link ${s==="matches"?"active":""}" data-nav="matches">
          <i class="bi bi-trophy-fill"></i>
          <span>MCA match centre</span>
        </a>
        <a href="#/leaderboards" class="sidebar-nav-link ${s==="leaderboards"?"active":""}" data-nav="leaderboards">
          <i class="bi bi-bar-chart-line-fill"></i>
          <span>Player leaderboards</span>
        </a>

        <!-- GROUP 2: CLUB OPERATIONS -->
        <div class="nav-group-label mt-2">CLUB OPERATIONS</div>
        <a href="#/inventory" class="sidebar-nav-link ${s==="inventory"?"active":""}" data-nav="inventory">
          <i class="bi bi-box-seam-fill"></i>
          <span>Gear & inventory</span>
        </a>
        <a href="#/inspections" class="sidebar-nav-link ${s==="inspections"?"active":""}" data-nav="inspections">
          <i class="bi bi-shield-check"></i>
          <span>Weekly inspections</span>
        </a>
        <a href="#/damage-reports" class="sidebar-nav-link ${s==="damage-reports"?"active":""}" data-nav="damage-reports">
          <i class="bi bi-exclamation-octagon-fill"></i>
          <span>Damage reports</span>
        </a>
        <a href="#/tasks" class="sidebar-nav-link ${s==="tasks"?"active":""}" data-nav="tasks">
          <i class="bi bi-kanban-fill"></i>
          <span>Tasks & AI assistant</span>
        </a>

        <!-- GROUP 3: MANAGEMENT -->
        <div class="nav-group-label mt-2">MANAGEMENT</div>
        <a href="#/reports" class="sidebar-nav-link ${s==="reports"?"active":""}" data-nav="reports">
          <i class="bi bi-file-earmark-text-fill"></i>
          <span>Reports & exports</span>
        </a>
        <a href="#/settings" class="sidebar-nav-link ${s==="settings"?"active":""}" data-nav="settings">
          <i class="bi bi-gear-fill"></i>
          <span>Settings & users</span>
        </a>
      </div>

      <!-- Signed-in User Details & Logout -->
      <div class="sidebar-user-footer">
        <div class="user-info-brief">
          <div class="user-avatar-initials">${t}</div>
          <div class="user-text-meta">
            <div class="user-display-name">${(e==null?void 0:e.name)||"Administrator"}</div>
            <div class="user-display-role">${(e==null?void 0:e.role)||"Administrator"}</div>
          </div>
        </div>
        <button class="logout-btn-icon" id="sidebar-logout-btn" title="Sign out of workspace">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </aside>
  `}function Ge({title:e,breadcrumb:s="Workspace",actionButton:t=null}){const a=new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});return`
    <header class="app-header">
      <div class="d-flex align-items-center gap-3">
        <!-- Mobile Hamburger Toggle -->
        <button class="icon-btn-header d-md-none" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <i class="bi bi-list fs-5"></i>
        </button>

        <div>
          <div class="breadcrumb-small">${s}</div>
          <div class="page-title">${e}</div>
        </div>
      </div>

      <div class="header-action-group">
        <!-- Current Date Badge -->
        <div class="date-display-badge d-none d-lg-flex">
          <i class="bi bi-calendar3 text-muted"></i>
          <span>${a}</span>
        </div>

        <!-- Refresh Button -->
        <button class="icon-btn-header" id="header-refresh-btn" title="Refresh current view">
          <i class="bi bi-arrow-clockwise"></i>
        </button>

        <!-- Theme Toggle (Dark / Light) -->
        <button class="icon-btn-header" id="header-theme-toggle" title="Toggle dark/light appearance">
          <i class="bi bi-moon-stars" id="theme-toggle-icon"></i>
        </button>

        <!-- Contextual Action Button -->
        ${t?`
          <button class="btn btn-burgundy" id="${t.id}">
            <i class="bi ${t.icon||"bi-plus-lg"}"></i>
            <span>${t.label}</span>
          </button>
        `:""}
      </div>
    </header>
  `}function b(e,s="info",t=4e3){const a=document.getElementById("toast-root");if(!a)return;const i="toast-"+Date.now()+"-"+Math.floor(Math.random()*1e3);let n="bi-info-circle-fill";s==="success"?n="bi-check-circle-fill":s==="danger"||s==="error"?n="bi-exclamation-triangle-fill":s==="warning"&&(n="bi-exclamation-circle-fill");const l=`
    <div id="${i}" class="toast align-items-center shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="${s==="success"?"background-color: var(--success-green);":s==="danger"||s==="error"?"background-color: var(--burgundy);":s==="warning"?"background-color: var(--warning-amber); color: #fff;":"background-color: #16243a; color: #fff;"} border-radius: 8px;">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2 py-2 px-3" style="font-size: 13px; font-weight: 500;">
          <i class="bi ${n} fs-6"></i>
          <span>${e}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" onclick="document.getElementById('${i}').remove()"></button>
      </div>
    </div>
  `;a.insertAdjacentHTML("beforeend",l);const o=document.getElementById(i);setTimeout(()=>{o&&o.parentNode&&(o.classList.add("fade"),setTimeout(()=>o.remove(),250))},t)}function le(e,s){e.innerHTML=`
    <div class="login-split-page">
      <!-- Left Branding Panel (53% width on desktop) -->
      <div class="login-brand-panel">
        <div class="login-top-strip"></div>
        <div class="login-circles-decor"></div>

        <div>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="brand-crest brand-crest-image mb-0" style="width: 100px; height: 50px;">
              <img src="${ne}" alt="Akbar Cricket Club — 1 Team 1 Dream">
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--gold);">AKBAR BROTHERS</div>
              <div style="font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 0.8px;">SPORTS MANAGEMENT</div>
            </div>
          </div>
        </div>

        <div style="position: relative; z-index: 2; margin: 40px 0;">
          <h1 style="font-size: 38px; font-weight: 900; line-height: 1.15; color: #ffffff; margin-bottom: 6px;">
            Built for the team.
          </h1>
          <h2 style="font-size: 38px; font-weight: 900; line-height: 1.15; color: var(--gold); margin-bottom: 24px;">
            Ready for every innings.
          </h2>
          <p style="font-size: 14.5px; color: rgba(233, 239, 246, 0.85); max-width: 480px; line-height: 1.6; margin-bottom: 32px;">
            One secure home for MCA match records, player profiles, practice attendance and club equipment.
          </p>

          <div class="d-flex flex-wrap gap-2">
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-shield-shaded text-gold me-1"></i> Team operations
            </span>
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-graph-up text-gold me-1"></i> Live leaderboards
            </span>
            <span class="season-badge" style="background: rgba(255,255,255,0.08); border-color: rgba(220,175,101,0.3); padding: 6px 12px; font-size: 11px;">
              <i class="bi bi-box-seam text-gold me-1"></i> Inventory controls
            </span>
          </div>
        </div>

        <div style="position: relative; z-index: 2;">
          <div style="font-size: 11px; color: rgba(233, 239, 246, 0.5);">
            © 2026 Akbar Cricket Club • Official Management System • All rights reserved
          </div>
        </div>
      </div>

      <!-- Right Form Panel (47% width on desktop) -->
      <div class="login-form-panel">
        <div class="login-form-card">
          <div class="mb-4">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: var(--burgundy); margin-bottom: 6px;">
              ADMINISTRATION PORTAL • 2026/27
            </div>
            <h3 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">Welcome back</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">
              Sign in to your secure Akbar Cricket Club workspace.
            </p>
          </div>

          <!-- Inline error alert -->
          <div id="login-error-alert" class="alert alert-danger d-none py-2 px-3" style="font-size: 12.5px; border-radius: 8px;">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <span id="login-error-text"></span>
          </div>

          <form id="login-form">
            <div class="mb-3">
              <label class="form-label-custom" for="login-email">Work email</label>
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  id="login-email"
                  class="form-control-custom border-start-0"
                  placeholder="admin@akbarcricket.lk"
                  value="admin@akbarcricket.lk"
                  required
                  autocomplete="username"
                >
              </div>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <label class="form-label-custom mb-0" for="login-password">Password</label>
              </div>
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  id="login-password"
                  class="form-control-custom border-start-0"
                  placeholder="••••••••••••"
                  required
                  autocomplete="current-password"
                >
              </div>
            </div>

            <button type="submit" id="login-submit-btn" class="btn btn-burgundy w-100 py-2 justify-content-center" style="font-size: 13.5px;">
              <span>Sign in to workspace</span>
              <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </form>

          <div class="mt-4 pt-3 border-top text-center" style="border-color: var(--border-color) !important;">
            <div style="font-size: 11px; color: var(--text-muted);">
              <i class="bi bi-shield-lock-fill text-muted me-1"></i>
              Protected records • Role-based access • MongoDB
            </div>
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 4px;">
              Authorized team officials only. Contact Club Administration for access.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;const t=document.getElementById("login-form"),a=document.getElementById("login-error-alert"),i=document.getElementById("login-error-text"),n=document.getElementById("login-submit-btn");t.addEventListener("submit",async m=>{m.preventDefault(),a.classList.add("d-none"),n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...';const l=document.getElementById("login-email").value,o=document.getElementById("login-password").value;try{const r=await y.post("/api/auth/login",{email:l,password:o});b(`Welcome back, ${r.user.name}!`,"success"),typeof s=="function"&&s(r.user)}catch(r){i.textContent=r.message||"Authentication failed. Please verify your credentials.",a.classList.remove("d-none")}finally{n.disabled=!1,n.innerHTML='<span>Sign in to workspace</span><i class="bi bi-arrow-right ms-1"></i>'}})}async function _e(e){e.innerHTML=`
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading Command Centre...</span>
      </div>
    </div>
  `;try{const s=await y.get("/api/command-centre"),{stats:t,attentionPanel:a,upcomingFixtures:i,topPerformers:n,recentTasks:m}=s,l=n.bestBatsmen[0],o=n.bestBowlers[0],r=n.bestFielders[0];e.innerHTML=`
      <!-- Wide Navy Gradient Banner -->
      <div class="command-banner">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center position-relative" style="z-index: 2;">
          <div class="d-flex align-items-start gap-3 mb-3 mb-md-0">
            <div class="brand-crest brand-crest-image" style="width: 108px; height: 54px; flex-shrink: 0;">
              <img src="${ne}" alt="Akbar Cricket Club — 1 Team 1 Dream">
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--gold); margin-bottom: 4px;">
                TEAM AKBAR / 2026–27 CLUB OPERATIONS
              </div>
              <h2 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                Every player. Every innings.
              </h2>
              <p style="font-size: 13px; color: rgba(233, 239, 246, 0.82); margin-bottom: 0; max-width: 650px; line-height: 1.5;">
                One connected workspace for team management, MCA fixtures, player performance, attendance and equipment readiness.
              </p>
            </div>
          </div>
          <div>
            <a href="#/matches" class="btn btn-gold text-nowrap">
              <span>Explore match centre</span>
              <i class="bi bi-arrow-up-right ms-1"></i>
            </a>
          </div>
        </div>
        <div class="banner-watermark">
          <img src="${ne}" alt="" aria-hidden="true" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
      </div>

      <!-- 4 Top Metric Cards -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Active Squad</span>
              <i class="bi bi-people text-muted fs-5"></i>
            </div>
            <div class="stat-value">${t.activeSquad}</div>
            <div class="small text-muted mt-1">Selected 2027 players</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">MCA Matches</span>
              <i class="bi bi-trophy text-muted fs-5"></i>
            </div>
            <div class="stat-value">${t.mcaMatches}</div>
            <div class="small text-muted mt-1">Official league fixtures</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Attendance Rate</span>
              <i class="bi bi-calendar-check text-muted fs-5"></i>
            </div>
            <div class="stat-value" style="color: var(--success-green);">${t.attendanceRate}</div>
            <div class="small text-muted mt-1">Marked practice & match roll calls</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Stock Checks Awaiting</span>
              <i class="bi bi-hourglass-split text-muted fs-5"></i>
            </div>
            <div class="stat-value" style="color: var(--warning-amber);">${t.unverifiedEquipment}</div>
            <div class="small text-muted mt-1">Unverified inventory counts</div>
          </div>
        </div>
      </div>

      <!-- Mid Section: Upcoming MCA Fixtures & Management Attention Panel -->
      <div class="row g-4 mb-4">
        <!-- Upcoming MCA Fixtures -->
        <div class="col-lg-7">
          <div class="card-custom h-100">
            <div class="card-header-clean">
              <h3 class="card-title-clean">
                <i class="bi bi-calendar-event me-2 text-danger"></i>Upcoming MCA Fixtures
              </h3>
              <a href="#/matches" class="btn btn-outline-burgundy btn-sm py-1 px-2" style="font-size: 11px;">View All</a>
            </div>
            <div class="p-3">
              ${i&&i.length>0?`
                <div class="d-flex flex-column gap-2">
                  ${i.map(d=>`
                    <div class="p-3 rounded border d-flex justify-content-between align-items-center" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
                      <div>
                        <div class="fw-bold" style="font-size: 13.5px; color: var(--text-main);">
                          vs ${d.opponent}
                        </div>
                        <div class="small text-muted mt-1">
                          <i class="bi bi-calendar3 me-1"></i>${d.date} &bull; <i class="bi bi-geo-alt me-1"></i>${d.venue||"Venue TBD"}
                        </div>
                      </div>
                      <div class="text-end">
                        <span class="badge-role badge-batsman">${d.format}</span>
                        <div class="mt-1">
                          <a href="#/matches?id=${d._id}" class="small text-danger text-decoration-none fw-bold">Match Centre &rarr;</a>
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              `:`
                <div class="text-center py-4 text-muted">
                  <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
                  No upcoming pending fixtures scheduled.
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Management-Attention Panel -->
        <div class="col-lg-5">
          <div class="card-custom h-100">
            <div class="card-header-clean">
              <h3 class="card-title-clean">
                <i class="bi bi-shield-exclamation me-2 text-warning"></i>Management Attention Required
              </h3>
            </div>
            <div class="p-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Unverified Stock Quantities</div>
                    <div class="small text-muted">Awaiting physical store verification</div>
                  </div>
                  <span class="badge bg-light text-dark border px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${a.unverifiedStock}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Open Damage Reports</div>
                    <div class="small text-muted">Gear requiring repair or decommissioning</div>
                  </div>
                  <span class="badge ${a.openDamageReports>0?"bg-danger text-white":"bg-light text-dark border"} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${a.openDamageReports}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Low Stock (Verified)</div>
                    <div class="small text-muted">Verified quantities below minimum reserves</div>
                  </div>
                  <span class="badge ${a.lowStockItems>0?"bg-warning text-dark":"bg-light text-dark border"} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${a.lowStockItems}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Unmarked Attendance Sessions</div>
                    <div class="small text-muted">Practice or match roll calls pending</div>
                  </div>
                  <span class="badge bg-light text-dark border px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${a.unmarkedAttendanceSessions}
                  </span>
                </li>
              </ul>
              <div class="mt-3">
                <a href="#/tasks" class="btn btn-outline-burgundy w-100 py-1" style="font-size: 12px;">
                  <i class="bi bi-robot me-1"></i>Open AI Operations Assistant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers: Best Batsman, Best Bowler, Best Fielder -->
      <h4 class="heading-font mb-3" style="font-size: 16px; font-weight: 800;">Season 2026–27 Top Performers</h4>
      <div class="row g-3 mb-4">
        <!-- Best Batsman -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Batsman</span>
              <span class="badge-role badge-batsman">Runs</span>
            </div>
            ${l?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${l.name}</div>
              <div class="stat-value text-danger my-1">${l.runs} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">runs</span></div>
              <div class="small text-muted mb-2">${l.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${n.bestBatsmen.map((d,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${d.name}</span>
                    <span class="fw-bold">${d.runs} r</span>
                  </div>
                `).join("")}
              </div>
            `:`
              <div class="text-muted small py-3">No verified batting statistics recorded yet. Scores will appear once MCA scorecards are confirmed.</div>
            `}
          </div>
        </div>

        <!-- Best Bowler -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Bowler</span>
              <span class="badge-role badge-bowler">Wickets</span>
            </div>
            ${o?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${o.name}</div>
              <div class="stat-value text-danger my-1">${o.wickets} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">wickets</span></div>
              <div class="small text-muted mb-2">${o.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${n.bestBowlers.map((d,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${d.name}</span>
                    <span class="fw-bold">${d.wickets} w</span>
                  </div>
                `).join("")}
              </div>
            `:`
              <div class="text-muted small py-3">No verified bowling statistics recorded yet. Scores will appear once MCA scorecards are confirmed.</div>
            `}
          </div>
        </div>

        <!-- Best Fielder -->
        <div class="col-md-4">
          <div class="card-custom p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="stat-label">Best Fielder</span>
              <span class="badge-role badge-allrounder">Points</span>
            </div>
            ${r?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${r.name}</div>
              <div class="stat-value text-gold my-1">${r.fieldingPoints} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">pts</span></div>
              <div class="small text-muted mb-2">${r.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${n.bestFielders.map((d,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${d.name}</span>
                    <span class="fw-bold">${d.fieldingPoints} pts</span>
                  </div>
                `).join("")}
              </div>
            `:`
              <div class="text-muted small py-3">No verified fielding statistics recorded yet. Fielding points: Catches + 1.5×Stumpings + 1.5×Run-outs.</div>
            `}
          </div>
        </div>
      </div>

      <!-- Recent Open Tasks -->
      <div class="card-custom">
        <div class="card-header-clean">
          <h3 class="card-title-clean">
            <i class="bi bi-check2-circle me-2 text-danger"></i>Recent Operational Tasks
          </h3>
          <a href="#/tasks" class="btn btn-outline-burgundy btn-sm py-1 px-2" style="font-size: 11px;">View Kanban Board</a>
        </div>
        <div class="p-0">
          <div class="table-responsive">
            <table class="table-custom mb-0">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Priority</th>
                  <th>Owner</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${m&&m.length>0?m.map(d=>{const c=d.priority==="Critical"?"badge bg-danger":d.priority==="High"?"badge bg-warning text-dark":"badge bg-secondary";return`
                    <tr>
                      <td class="fw-bold">${d.title}</td>
                      <td><span class="${c}">${d.priority}</span></td>
                      <td>${d.owner}</td>
                      <td>${d.dueDate||"No deadline"}</td>
                      <td><span class="badge-role">${d.status}</span></td>
                    </tr>
                  `}).join(""):`
                  <tr>
                    <td colspan="5" class="text-center py-4 text-muted">
                      No active open tasks. Use the Tasks & AI Assistant to generate or create operational actions.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}catch(s){e.innerHTML=`
      <div class="alert alert-danger">
        <h5>Failed to load Command Centre</h5>
        <p>${s.message}</p>
        <button class="btn btn-burgundy btn-sm" onclick="window.location.reload()">Retry</button>
      </div>
    `}}let V=null;function C({title:e,contentHtml:s,footerHtml:t,onOpen:a,onClose:i}){var d,c;I();const n=document.getElementById("modal-root");if(!n)return;const m=`
    <div id="active-custom-modal" class="modal-backdrop-custom">
      <div class="modal-dialog-custom" role="dialog" aria-modal="true">
        <div class="modal-header-custom">
          <h5 class="modal-title-custom">${e}</h5>
          <button type="button" class="btn-close" id="modal-close-x" aria-label="Close"></button>
        </div>
        <div class="modal-body-custom" id="modal-body-content">
          ${s}
        </div>
        ${t!==!1?`
          <div class="modal-footer-custom" id="modal-footer-content">
            ${t||`
              <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
              <button type="button" class="btn btn-burgundy" id="modal-btn-save">Save Changes</button>
            `}
          </div>
        `:""}
      </div>
    </div>
  `;n.innerHTML=m;const l=document.getElementById("active-custom-modal"),o=()=>{I(),typeof i=="function"&&i()};(d=document.getElementById("modal-close-x"))==null||d.addEventListener("click",o),(c=document.getElementById("modal-btn-cancel"))==null||c.addEventListener("click",o),l.addEventListener("click",u=>{u.target===l&&o()});const r=u=>{u.key==="Escape"&&(o(),window.removeEventListener("keydown",r))};return window.addEventListener("keydown",r),V={element:l,escHandler:r,onClose:i},typeof a=="function"&&a(l),l}function I(){V&&(window.removeEventListener("keydown",V.escHandler),V.element&&V.element.parentNode&&V.element.remove(),V=null);const e=document.getElementById("modal-root");e&&(e.innerHTML="")}function x(e){return String(e??"").replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}const Se=["Akbar Brothers (Pvt) Ltd","Quick Tea (Pvt) Ltd","Falcon Trading (Pvt) Ltd","Land and Building (Pvt) Ltd","Ceylon Coffeeworks (Pvt) Ltd","Colombo Coffee Company (Pvt) Ltd","Glowbal Retails (Pvt) Ltd","Coffee Collective (Pvt) Ltd"];let Le=[],A=null;async function Ke(e,s){var a,i,n,m,l;A=s;const t=["Administrator","Manager"].includes(s==null?void 0:s.role);["Administrator","Manager","Coach"].includes(s==null?void 0:s.role),e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">2027 Selected Squad</h2>
        <div class="small text-muted" id="player-count-label">Loading squad register...</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        ${t?`
          <button class="btn btn-outline-burgundy" id="btn-import-squad-csv">
            <i class="bi bi-file-earmark-spreadsheet me-1"></i>Import Squad CSV
          </button>
          <button class="btn btn-burgundy" id="btn-add-player-manual">
            <i class="bi bi-person-plus me-1"></i>Add Player
          </button>
        `:""}
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center register-filters">
        <div class="col-md-5">
          <div class="input-group register-search">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="player-search-input" class="form-control-custom border-start-0" placeholder="Search by player name...">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <select id="player-company-filter" class="form-select-custom">
            <option value="All">All Companies</option>
            <option value="Akbar Brothers (Pvt) Ltd">Akbar Brothers (Pvt) Ltd</option>
            <option value="Quick Tea (Pvt) Ltd">Quick Tea (Pvt) Ltd</option>
            <option value="Falcon Trading (Pvt) Ltd">Falcon Trading (Pvt) Ltd</option>
            <option value="Land and Building (Pvt) Ltd">Land and Building (Pvt) Ltd</option>
            <option value="Ceylon Coffeeworks (Pvt) Ltd">Ceylon Coffeeworks (Pvt) Ltd</option>
            <option value="Colombo Coffee Company (Pvt) Ltd">Colombo Coffee Company (Pvt) Ltd</option>
            <option value="Glowbal Retails (Pvt) Ltd">Glowbal Retails (Pvt) Ltd</option>
            <option value="Coffee Collective (Pvt) Ltd">Coffee Collective (Pvt) Ltd</option>
          </select>
        </div>
        <div class="col-6 col-md-4">
          <select id="player-role-filter" class="form-select-custom">
            <option value="All">All Cricket Roles</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="Batting allrounder">Batting allrounder</option>
            <option value="Bowling allrounder">Bowling allrounder</option>
            <option value="Wicketkeeper batsman">Wicketkeeper batsman</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 4-Column Player Cards Grid -->
    <div class="row g-3" id="players-grid-container">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
      </div>
    </div>
  `,await G(),(a=document.getElementById("player-search-input"))==null||a.addEventListener("input",Je(G,300)),(i=document.getElementById("player-company-filter"))==null||i.addEventListener("change",G),(n=document.getElementById("player-role-filter"))==null||n.addEventListener("change",G),t&&((m=document.getElementById("btn-import-squad-csv"))==null||m.addEventListener("click",Qe),(l=document.getElementById("btn-add-player-manual"))==null||l.addEventListener("click",()=>me(null)))}async function G(){var l,o,r;const e=["Administrator","Manager"].includes(A==null?void 0:A.role),s=["Administrator","Manager","Coach"].includes(A==null?void 0:A.role),t=((l=document.getElementById("player-search-input"))==null?void 0:l.value)||"",a=((o=document.getElementById("player-company-filter"))==null?void 0:o.value)||"All",i=((r=document.getElementById("player-role-filter"))==null?void 0:r.value)||"All",n=document.getElementById("players-grid-container"),m=document.getElementById("player-count-label");try{const d=new URLSearchParams;t&&d.append("search",t),a!=="All"&&d.append("company",a),i!=="All"&&d.append("cricketRole",i);const c=await y.get(`/api/players?${d.toString()}`);if(Le=c.players,m&&(m.textContent=`Displaying ${c.totalCount} active squad members`),!c.players||c.players.length===0){n.innerHTML=`
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-people fs-2 d-block mb-2"></i>
          No squad players match your search or filter criteria.
        </div>
      `;return}n.innerHTML=c.players.map(u=>{const g=u.fullName.split(" ").map(h=>h[0]).join("").slice(0,2).toUpperCase(),p=u.stats||{},v=u.cricketRole==="Batsman"?"badge-batsman":u.cricketRole==="Bowler"?"badge-bowler":u.cricketRole.includes("allrounder")?"badge-allrounder":"badge-role";return`
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card-custom h-100 p-3 d-flex flex-column justify-content-between player-clickable-card" data-player-id="${u._id}" style="cursor: pointer;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="user-avatar-initials" style="width: 40px; height: 40px; font-size: 14px;">
                    ${g}
                  </div>
                  <div>
                    <div class="fw-bold text-main" style="font-size: 13.5px; line-height: 1.2;">${x(u.fullName)}</div>
                    <div class="small text-muted" style="font-size: 11px;">${x(u.company)}</div>
                  </div>
                </div>
                ${u.jerseyNumber!==null&&u.jerseyNumber!==void 0?`
                  <span class="badge border" style="background: rgba(22, 36, 58, 0.05); color: var(--text-main); font-weight: 800; font-size: 12px;">
                    #${u.jerseyNumber}
                  </span>
                `:""}
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge-role ${v}">${u.cricketRole}</span>
                <span class="badge-role" style="font-size: 9.5px;">${u.battingHand}</span>
              </div>
            </div>

            <!-- Season Stats Pill -->
            <div class="p-2 rounded border" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
              <div class="row text-center g-0">
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Matches</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${p.matches||0}</div>
                </div>
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Runs</div>
                  <div class="fw-bold text-danger" style="font-size: 14px;">${p.runs||0}</div>
                </div>
                <div class="col-4">
                  <div class="stat-label" style="font-size: 9.5px;">Wickets</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${p.wickets||0}</div>
                </div>
              </div>
            </div>
            ${s?`
              <div class="d-flex gap-2 mt-3">
                <button type="button" class="btn btn-sm btn-outline-burgundy btn-edit-player" data-player-id="${u._id}">
                  <i class="bi bi-pencil me-1"></i>Edit
                </button>
                ${e?`
                  <button type="button" class="btn btn-sm btn-outline-danger btn-delete-player" data-player-id="${u._id}">
                    <i class="bi bi-trash me-1"></i>Delete
                  </button>
                `:""}
              </div>
            `:""}
          </div>
        </div>
      `}).join(""),document.querySelectorAll(".player-clickable-card").forEach(u=>{u.addEventListener("click",()=>{const g=u.getAttribute("data-player-id");Xe(g)})}),document.querySelectorAll(".btn-edit-player, .btn-delete-player").forEach(u=>{u.addEventListener("click",g=>{g.stopPropagation();const p=Le.find(v=>v._id===u.dataset.playerId);p&&(u.classList.contains("btn-edit-player")?me(p):Pe(p))})})}catch(d){n.innerHTML=`<div class="col-12 alert alert-danger">${d.message}</div>`}}async function Xe(e){try{const s=await y.get(`/api/players/${e}`),{player:t,assignedEquipment:a,attendanceHistory:i}=s,n=["Administrator","Manager"].includes(A==null?void 0:A.role),m=["Administrator","Manager","Coach"].includes(A==null?void 0:A.role),l=t.stats||{},o=`
      <div class="row g-4">
        <!-- Cricket & Employment Overview -->
        <div class="col-md-6 border-end" style="border-color: var(--border-color) !important;">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${t.fullName.split(" ").map(d=>d[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <h4 class="mb-0 text-main">${x(t.fullName)}</h4>
              <div class="text-muted small">${x(t.company)}</div>
              ${t.jerseyNumber?`<span class="badge bg-danger mt-1">Jersey #${t.jerseyNumber}</span>`:""}
            </div>
          </div>

          <h6 class="stat-label mt-3 mb-2 text-gold">Cricket Technical Profile</h6>
          <table class="table table-sm table-borderless small mb-3">
            <tr><td class="text-muted w-50">Cricket Role:</td><td class="fw-bold text-main">${t.cricketRole}</td></tr>
            <tr><td class="text-muted">Batting Hand:</td><td class="fw-bold text-main">${t.battingHand}</td></tr>
            <tr><td class="text-muted">Bowling Arm:</td><td class="fw-bold text-main">${t.bowlingArm}</td></tr>
            <tr><td class="text-muted">Bowling Style:</td><td class="fw-bold text-main">${t.bowlingStyle||"N/A"}</td></tr>
            <tr><td class="text-muted">Notes:</td><td>${t.notes||"None"}</td></tr>
          </table>

          <!-- Confidential Information (Admin & Manager only) -->
          ${n?`
            <div class="p-3 rounded border mt-3" style="background: rgba(158, 35, 50, 0.04); border-color: rgba(158, 35, 50, 0.2) !important;">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="stat-label text-danger"><i class="bi bi-shield-lock-fill me-1"></i>Confidential Employment Details</span>
                <span class="badge bg-secondary" style="font-size: 9px;">Privileged</span>
              </div>
              <table class="table table-sm table-borderless small mb-0">
                <tr><td class="text-muted w-50">Work Email:</td><td class="fw-bold text-main">${t.workEmail||"—"}</td></tr>
                <tr><td class="text-muted">Phone Number:</td><td class="fw-bold text-main">${t.phone||"—"}</td></tr>
                <tr><td class="text-muted">EPF / Employee No:</td><td class="fw-bold text-main">${t.epfNumber||"—"}</td></tr>
                <tr><td class="text-muted">National Identity (NIC):</td><td class="fw-bold text-main font-monospace">${t.nic||"—"}</td></tr>
                <tr><td class="text-muted">Joining Date:</td><td class="fw-bold text-main">${t.joiningDate||"—"}</td></tr>
                <tr><td class="text-muted">Worksite Location:</td><td class="fw-bold text-main">${t.worksite||"—"}</td></tr>
                <tr><td class="text-muted">HOD / Reporting Manager:</td><td class="fw-bold text-main">${t.reportingManager||"—"}</td></tr>
                ${t.emergencyContact&&t.emergencyContact.name?`
                  <tr><td class="text-muted">Emergency Contact:</td><td class="fw-bold text-main">${t.emergencyContact.name} (${t.emergencyContact.phone} - ${t.emergencyContact.relationship})</td></tr>
                `:""}
              </table>
            </div>
          `:`
            <div class="p-2 rounded bg-light border text-muted small mt-3">
              <i class="bi bi-lock-fill me-1"></i>Confidential HR records restricted to Administrators & Managers.
            </div>
          `}
        </div>

        <!-- Verified Season Statistics & Club Operations -->
        <div class="col-md-6">
          <h6 class="stat-label mb-2 text-gold">2026–2027 Verified Match Statistics</h6>
          <div class="row g-2 text-center mb-3">
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Matches</div><div class="fw-bold text-main">${l.matches||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Runs</div><div class="fw-bold text-danger">${l.runs||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Wickets</div><div class="fw-bold text-main">${l.wickets||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Field Pts</div><div class="fw-bold text-gold">${l.fieldingPoints||0}</div></div></div>
          </div>

          <table class="table table-sm small mb-3">
            <tr><td class="text-muted">Balls Faced:</td><td class="fw-bold">${l.ballsFaced||0}</td><td class="text-muted">Fours / Sixes:</td><td class="fw-bold">${l.fours||0} / ${l.sixes||0}</td></tr>
            <tr><td class="text-muted">Balls Bowled:</td><td class="fw-bold">${l.ballsBowled||0}</td><td class="text-muted">Runs Conceded:</td><td class="fw-bold">${l.runsConceded||0}</td></tr>
            <tr><td class="text-muted">Catches:</td><td class="fw-bold">${l.catches||0}</td><td class="text-muted">Stump / Run-out:</td><td class="fw-bold">${l.stumpings||0} / ${l.runOuts||0}</td></tr>
          </table>

          <h6 class="stat-label mb-2 text-gold">Assigned Club Equipment</h6>
          ${a&&a.length>0?`
            <ul class="list-group list-group-flush small mb-3">
              ${a.map(d=>`
                <li class="list-group-item d-flex justify-content-between px-0 py-1 bg-transparent">
                  <span><strong>${d.assetId}</strong> — ${d.name}</span>
                  <span class="badge-role">${d.condition}</span>
                </li>
              `).join("")}
            </ul>
          `:`
            <div class="text-muted small mb-3">No club gear currently assigned to this player.</div>
          `}

          <h6 class="stat-label mb-2 text-gold">Recent Session Attendance</h6>
          ${i&&i.length>0?`
            <div class="d-flex flex-column gap-1 small">
              ${i.slice(0,5).map(d=>`
                <div class="d-flex justify-content-between align-items-center py-1 border-bottom" style="border-color: var(--border-color) !important;">
                  <span>${d.date} &bull; ${d.sessionTitle}</span>
                  <span class="badge-status badge-status-${d.status.toLowerCase().replace(/\s+/g,"")}">${d.status}</span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small">No session records logged.</div>
          `}
        </div>
      </div>
    `,r=`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      ${n?`
        <button type="button" class="btn btn-outline-danger" id="btn-delete-player-profile">
          <i class="bi bi-trash me-1"></i>Delete Player
        </button>
      `:""}
      ${m?`
        <button type="button" class="btn btn-burgundy" id="btn-edit-player-profile">
          <i class="bi bi-pencil me-1"></i>Edit Profile
        </button>
      `:""}
    `;C({title:`${x(t.fullName)} — Squad Record`,contentHtml:o,footerHtml:r,onOpen:d=>{var c,u;(c=document.getElementById("btn-delete-player-profile"))==null||c.addEventListener("click",()=>Pe(t)),(u=document.getElementById("btn-edit-player-profile"))==null||u.addEventListener("click",()=>{I(),me(t)})}})}catch(s){b(`Failed to load player details: ${s.message}`,"error")}}function me(e=null){var n,m,l;const s=!!e,t=["Administrator","Manager"].includes(A==null?void 0:A.role),a=!!(e!=null&&e.company)&&!Se.includes(e.company),i=`
    <form id="player-form-dialog">
      <div class="row g-3">
        <!-- 2 Columns on desktop, 1 on mobile -->
        <div class="col-md-6">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="p-fullName" class="form-control-custom" value="${x(e==null?void 0:e.fullName)}" required ${!t&&s?"readonly":""}>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Company *</label>
          <select id="p-company" class="form-select-custom" ${!t&&s?"disabled":""}>
            ${Se.map(o=>`<option value="${o}" ${(e==null?void 0:e.company)===o?"selected":""}>${o}</option>`).join("")}
            <option value="Other" ${a?"selected":""}>Other</option>
          </select>
          <div id="p-company-other-group" class="mt-2 ${a?"":"d-none"}">
            <label for="p-company-other" class="form-label-custom">Company Name *</label>
            <input type="text" id="p-company-other" class="form-control-custom" placeholder="Enter company name" value="${x(a&&e.company!=="Other"?e.company:"")}" ${!t&&s?"disabled":""}>
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Cricket Role</label>
          <select id="p-cricketRole" class="form-select-custom">
            <option value="Not set" ${(e==null?void 0:e.cricketRole)==="Not set"?"selected":""}>Not set</option>
            <option value="Batsman" ${(e==null?void 0:e.cricketRole)==="Batsman"?"selected":""}>Batsman</option>
            <option value="Bowler" ${(e==null?void 0:e.cricketRole)==="Bowler"?"selected":""}>Bowler</option>
            <option value="Batting allrounder" ${(e==null?void 0:e.cricketRole)==="Batting allrounder"?"selected":""}>Batting allrounder</option>
            <option value="Bowling allrounder" ${(e==null?void 0:e.cricketRole)==="Bowling allrounder"?"selected":""}>Bowling allrounder</option>
            <option value="Wicketkeeper batsman" ${(e==null?void 0:e.cricketRole)==="Wicketkeeper batsman"?"selected":""}>Wicketkeeper batsman</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Batting Hand</label>
          <select id="p-battingHand" class="form-select-custom">
            <option value="Not set" ${(e==null?void 0:e.battingHand)==="Not set"?"selected":""}>Not set</option>
            <option value="Right hand" ${(e==null?void 0:e.battingHand)==="Right hand"?"selected":""}>Right hand</option>
            <option value="Left hand" ${(e==null?void 0:e.battingHand)==="Left hand"?"selected":""}>Left hand</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Bowling Arm</label>
          <select id="p-bowlingArm" class="form-select-custom">
            <option value="Not set" ${(e==null?void 0:e.bowlingArm)==="Not set"?"selected":""}>Not set</option>
            <option value="Right arm" ${(e==null?void 0:e.bowlingArm)==="Right arm"?"selected":""}>Right arm</option>
            <option value="Left arm" ${(e==null?void 0:e.bowlingArm)==="Left arm"?"selected":""}>Left arm</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Bowling Style</label>
          <input type="text" id="p-bowlingStyle" class="form-control-custom" placeholder="e.g. Off spin, Fast, Orthodox" value="${x(e==null?void 0:e.bowlingStyle)}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Jersey Number</label>
          <input type="number" id="p-jerseyNumber" class="form-control-custom" placeholder="e.g. 7" value="${(e==null?void 0:e.jerseyNumber)??""}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Technical Notes</label>
          <input type="text" id="p-notes" class="form-control-custom" placeholder="Coaching or matchday notes" value="${x(e==null?void 0:e.notes)}">
        </div>

        ${t?`
          <div class="col-12 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
            <div class="fw-bold text-danger small mb-2"><i class="bi bi-lock-fill me-1"></i>Confidential Employment & Contact Data</div>
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Phone Number</label>
            <input type="text" id="p-phone" class="form-control-custom" value="${x(e==null?void 0:e.phone)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Work Email</label>
            <input type="email" id="p-workEmail" class="form-control-custom" value="${x(e==null?void 0:e.workEmail)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">EPF / Employee Number (Preserves leading 0s)</label>
            <input type="text" id="p-epfNumber" class="form-control-custom" value="${x(e==null?void 0:e.epfNumber)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">National Identity Card (NIC - Encrypted)</label>
            <input type="text" id="p-nic" class="form-control-custom" placeholder="NIC number will be encrypted at rest" value="${x(e==null?void 0:e.nic)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Joining Date</label>
            <input type="date" id="p-joiningDate" class="form-control-custom" value="${x(e==null?void 0:e.joiningDate)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Worksite Location</label>
            <input type="text" id="p-worksite" class="form-control-custom" value="${x(e==null?void 0:e.worksite)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">HOD / Reporting Manager</label>
            <input type="text" id="p-reportingManager" class="form-control-custom" value="${x(e==null?void 0:e.reportingManager)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Name</label>
            <input type="text" id="p-emergencyContactName" class="form-control-custom" value="${x((n=e==null?void 0:e.emergencyContact)==null?void 0:n.name)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Phone</label>
            <input type="text" id="p-emergencyContactPhone" class="form-control-custom" value="${x((m=e==null?void 0:e.emergencyContact)==null?void 0:m.phone)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Relationship</label>
            <input type="text" id="p-emergencyContactRelationship" class="form-control-custom" value="${x((l=e==null?void 0:e.emergencyContact)==null?void 0:l.relationship)}">
          </div>
        `:""}
      </div>
    </form>
  `;C({title:s?`Edit ${x(e.fullName)}`:"Add Squad Member",contentHtml:i,onOpen:o=>{const r=o.querySelector("#p-company"),d=o.querySelector("#p-company-other"),c=()=>{const g=r.value==="Other";o.querySelector("#p-company-other-group").classList.toggle("d-none",!g),d.required=g&&t,d.disabled=!g||!t};r.addEventListener("change",c),c();const u=o.querySelector("#modal-btn-save");u==null||u.addEventListener("click",async()=>{var h,f,$,w,B,S,E,X,R,D,N,O,H,F,j,z,Q;const g=(h=document.getElementById("p-fullName"))==null?void 0:h.value;if(!g||!g.trim()){b("Full name is required.","error");return}const p=r.value==="Other"?t?d.value.trim():e.company:r.value;if(t&&!p){b("Please enter the company name.","error"),d.focus();return}if(!o.querySelector("#player-form-dialog").reportValidity())return;const v={fullName:g,company:p,cricketRole:(f=document.getElementById("p-cricketRole"))==null?void 0:f.value,battingHand:($=document.getElementById("p-battingHand"))==null?void 0:$.value,bowlingArm:(w=document.getElementById("p-bowlingArm"))==null?void 0:w.value,bowlingStyle:(B=document.getElementById("p-bowlingStyle"))==null?void 0:B.value,jerseyNumber:(S=document.getElementById("p-jerseyNumber"))==null?void 0:S.value,notes:(E=document.getElementById("p-notes"))==null?void 0:E.value};t&&(v.phone=(X=document.getElementById("p-phone"))==null?void 0:X.value,v.workEmail=(R=document.getElementById("p-workEmail"))==null?void 0:R.value,v.epfNumber=(D=document.getElementById("p-epfNumber"))==null?void 0:D.value,v.nic=(N=document.getElementById("p-nic"))==null?void 0:N.value,v.joiningDate=(O=document.getElementById("p-joiningDate"))==null?void 0:O.value,v.worksite=(H=document.getElementById("p-worksite"))==null?void 0:H.value,v.reportingManager=(F=document.getElementById("p-reportingManager"))==null?void 0:F.value,v.emergencyContact={name:(j=document.getElementById("p-emergencyContactName"))==null?void 0:j.value,phone:(z=document.getElementById("p-emergencyContactPhone"))==null?void 0:z.value,relationship:(Q=document.getElementById("p-emergencyContactRelationship"))==null?void 0:Q.value}),u.disabled=!0;try{s?(await y.put(`/api/players/${e._id}`,v),b(`Updated profile for ${g}.`,"success")):(await y.post("/api/players",v),b(`Player ${g} registered to 2027 squad.`,"success")),I(),G()}catch(ce){b(`Error: ${ce.message}`,"error")}finally{u.disabled=!1}})}})}function Pe(e){C({title:"Delete Player",contentHtml:`<p>Delete <strong>${x(e.fullName)}</strong> from the active squad?</p>
      <p class="small text-muted mb-0">Existing attendance, match, and equipment records will be retained.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-player">Delete Player</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-player");t.addEventListener("click",async()=>{t.disabled=!0;try{await y.delete(`/api/players/${e._id}`),b(`Player ${e.fullName} removed from the active squad.`,"success"),I(),await G()}catch(a){b(`Failed to delete player: ${a.message}`,"error"),t.disabled=!1}})}})}function Qe(){C({title:"Import Squad Register (CSV)",contentHtml:`
    <div>
      <p class="small text-muted mb-3">
        Upload a squad CSV file. Existing players are matched by full name and their records updated without erasing existing details. New players are automatically created. Leading zeros in EPF/employee numbers are strictly preserved.
      </p>

      <div class="mb-3">
        <label class="form-label-custom">Select CSV File</label>
        <input type="file" id="csv-import-file-input" class="form-control-custom" accept=".csv">
      </div>

      <div class="p-3 rounded bg-light border small text-muted">
        <div class="fw-bold text-main mb-1">Expected CSV Columns:</div>
        <code>Full Name, Company, Cricket Role, Batting Hand, Bowling Arm, Bowling Style, Jersey Number, Phone, Work Email, EPF Number, Joining Date, NIC, Worksite, Reporting Manager</code>
        <div class="mt-2">
          <a href="/templates/sample_players_import.csv" download class="text-danger fw-bold text-decoration-none">
            <i class="bi bi-download me-1"></i>Download Sample CSV Template
          </a>
        </div>
      </div>

      <div id="import-results-box" class="mt-3 d-none"></div>
    </div>
  `,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-csv-import">Start Import</button>
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-csv-import"))==null||t.addEventListener("click",async()=>{const a=document.getElementById("csv-import-file-input");if(!a||!a.files||a.files.length===0){b("Please select a CSV file to upload.","error");return}const i=new FormData;i.append("csvFile",a.files[0]);const n=document.getElementById("btn-submit-csv-import");n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Processing...';const m=document.getElementById("import-results-box");try{const l=await y.upload("/api/players/import-csv",i);m.className="mt-3 p-3 rounded bg-success bg-opacity-10 border border-success small",m.innerHTML=`
            <div class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i>${l.message}</div>
            <div>New players created: <strong>${l.createdCount}</strong></div>
            <div>Existing players updated: <strong>${l.updatedCount}</strong></div>
            ${l.errors&&l.errors.length>0?`<div class="text-danger mt-1">Warnings: ${l.errors.join("; ")}</div>`:""}
          `,m.classList.remove("d-none"),b("CSV squad import successful!","success"),G()}catch(l){m.className="mt-3 p-3 rounded bg-danger bg-opacity-10 border border-danger small text-danger",m.innerHTML=`<i class="bi bi-exclamation-triangle-fill me-1"></i>${l.message}`,m.classList.remove("d-none"),b(`Import error: ${l.message}`,"error")}finally{n.disabled=!1,n.innerHTML="Start Import"}})}})}function Je(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let J=[],M=null;async function Ue(e,s){var a,i,n,m,l;M=s;const t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Practice & Attendance</h2>
        <div class="small text-muted">2026–2027 Season Sessions and Roll Call Register</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-attendance-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-attendance">
          <i class="bi bi-printer me-1"></i>Print Register
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-create-session">
            <i class="bi bi-plus-lg me-1"></i>Schedule Session
          </button>
        `:""}
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center register-filters">
        <div class="col-md-6">
          <div class="input-group register-search">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="attendance-search" class="form-control-custom border-start-0" placeholder="Search sessions by title...">
          </div>
        </div>
        <div class="col-md-4">
          <select id="attendance-type-filter" class="form-select-custom">
            <option value="All">All Types (Practice & Match)</option>
            <option value="Practice">Practice Sessions</option>
            <option value="Match">Official Match Attendances</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sessions Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-calendar3 me-2 text-danger"></i>Session Attendance History
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="sessions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Type</th>
                <th>Attendance Rate</th>
                <th>Completion</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>
            <tbody id="sessions-tbody">
              <tr>
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await U(),(a=document.getElementById("attendance-search"))==null||a.addEventListener("input",et(U,300)),(i=document.getElementById("attendance-type-filter"))==null||i.addEventListener("change",U),(n=document.getElementById("btn-export-attendance-csv"))==null||n.addEventListener("click",()=>{window.location.href="/api/reports/attendance/csv"}),(m=document.getElementById("btn-print-attendance"))==null||m.addEventListener("click",()=>{window.print()}),t&&((l=document.getElementById("btn-create-session"))==null||l.addEventListener("click",()=>qe()))}async function U(){var n,m;const e=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role),s=["Administrator","Manager"].includes(M==null?void 0:M.role),t=((n=document.getElementById("attendance-search"))==null?void 0:n.value)||"",a=((m=document.getElementById("attendance-type-filter"))==null?void 0:m.value)||"All",i=document.getElementById("sessions-tbody");try{const l=new URLSearchParams;if(t&&l.append("search",t),a!=="All"&&l.append("type",a),J=(await y.get(`/api/sessions?${l.toString()}`)).sessions,!J||J.length===0){i.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No training or match sessions found.
          </td>
        </tr>
      `;return}i.innerHTML=J.map(r=>{const d=r.type==="Match"?"badge-bowler":"badge-batsman",c=r.rateDisplay!=="—"?"color: var(--success-green); font-weight: 700;":"color: var(--text-muted);";return`
        <tr>
          <td class="text-nowrap fw-bold">${r.date}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${x(r.title)}</div>
            <div class="small text-muted">${x(r.venue||"No venue specified")}</div>
          </td>
          <td><span class="badge-role ${d}">${r.type}</span></td>
          <td style="${c}; font-size: 14px;">${r.rateDisplay}</td>
          <td><span class="badge-role">${r.completionText}</span></td>
          <td class="text-end">
            ${e?`
              <button type="button" class="btn btn-sm btn-outline-burgundy py-1 px-3 btn-edit-session" data-session-id="${r.id}">
                <i class="bi bi-pencil me-1"></i>Edit Session
              </button>
            `:""}
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-rollcall" data-session-id="${r.id}">
              <i class="bi bi-person-check me-1"></i>Roll Call
            </button>
            ${s?`
              <button type="button" class="btn btn-sm btn-outline-danger py-1 px-3 btn-delete-session" data-session-id="${r.id}">
                <i class="bi bi-trash me-1"></i>Delete
              </button>
            `:""}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-rollcall").forEach(r=>{r.addEventListener("click",()=>{const d=r.getAttribute("data-session-id");Ze(d)})}),document.querySelectorAll(".btn-edit-session").forEach(r=>{r.addEventListener("click",()=>{const d=J.find(c=>c.id===r.dataset.sessionId);d&&qe(d)})}),document.querySelectorAll(".btn-delete-session").forEach(r=>{r.addEventListener("click",()=>{const d=J.find(c=>c.id===r.dataset.sessionId);d&&Ye(d)})})}catch(l){i.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${l.message}</td></tr>`}}function Ye(e){C({title:"Delete Session",contentHtml:`<p>Delete <strong>${x(e.title)}</strong> (${x(e.date)})?</p>
      <p class="small text-muted mb-0">This permanently deletes the session and its saved roll call. This cannot be undone.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-session">Delete Session</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-session");t.addEventListener("click",async()=>{t.disabled=!0;try{await y.delete(`/api/sessions/${e.id}`),b("Session deleted successfully.","success"),I(),await U()}catch(a){b(`Failed to delete session: ${a.message}`,"error"),t.disabled=!1}})}})}async function Ze(e){try{const s=await y.get(`/api/sessions/${e}`),{session:t,stats:a}=s,i=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role),n=["Not marked","Attended","Late","Absent","Excused"],m=`
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div>
            <h5 class="mb-1 text-main fw-bold">${x(t.title)}</h5>
            <div class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${t.date} &bull; <i class="bi bi-geo-alt me-1"></i>${x(t.venue||"Venue TBD")}</div>
          </div>
          <div class="text-end">
            <div class="stat-label">Current Attendance Rate</div>
            <div class="stat-value" id="modal-attendance-rate" style="color: var(--success-green); font-size: 24px;">
              ${a.rate!==null?a.rate+"%":"—"}
            </div>
            <div class="small text-muted" id="modal-marked-summary">${a.markedCount}/${a.total} players marked</div>
          </div>
        </div>

        ${i?`
          <div class="d-flex justify-content-between align-items-center mb-3">
            <button type="button" class="btn btn-outline-burgundy btn-sm" id="btn-set-all-attended">
              <i class="bi bi-check-all me-1"></i>Set all Attended
            </button>
            <div class="small text-muted">
              <i class="bi bi-info-circle me-1"></i>Unmarked entries are excluded from attendance rate denominator.
            </div>
          </div>
        `:""}

        <div style="max-height: 480px; overflow-y: auto;">
          <table class="table-custom mb-0">
            <thead>
              <tr>
                <th>Player</th>
                <th>Company</th>
                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody id="rollcall-table-body">
              ${(t.rollCall||[]).map(l=>{const o=l.player||{};return`
                  <tr data-player-id="${o._id}">
                    <td class="fw-bold text-main">${x(o.fullName||"Unknown")}</td>
                    <td class="small text-muted">${x(o.company||"—")}</td>
                    <td style="width: 170px;">
                      <select class="form-select-custom rollcall-status-select" ${i?"":"disabled"}>
                        ${n.map(r=>`
                          <option value="${r}" ${l.status===r?"selected":""}>${r}</option>
                        `).join("")}
                      </select>
                    </td>
                    <td>
                      <input type="text" class="form-control-custom rollcall-note-input" placeholder="Optional note..." value="${x(l.note)}" ${i?"":"readonly"}>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;C({title:"Session Roll Call",contentHtml:m,footerHtml:`
        <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
        ${i?'<button type="button" class="btn btn-burgundy" id="btn-save-roll-call">Save Roll Call</button>':""}
      `,onOpen:l=>{var r,d;const o=()=>{const c=l.querySelectorAll(".rollcall-status-select");let u=0,g=0,p=0,v=0,h=0;c.forEach(S=>{S.value==="Attended"?u++:S.value==="Late"?g++:S.value==="Absent"?p++:S.value==="Excused"?v++:h++});const f=u+g+p+v,$=f>0?Math.round((u+g)/f*1e3)/10:null,w=document.getElementById("modal-attendance-rate"),B=document.getElementById("modal-marked-summary");w&&(w.textContent=$!==null?`${$}%`:"—"),B&&(B.textContent=`${f}/${c.length} players marked`)};l.querySelectorAll(".rollcall-status-select").forEach(c=>{c.addEventListener("change",o)}),(r=document.getElementById("btn-set-all-attended"))==null||r.addEventListener("click",()=>{l.querySelectorAll(".rollcall-status-select").forEach(c=>{c.value="Attended"}),o(),b("All squad players set to Attended.","info")}),(d=document.getElementById("btn-save-roll-call"))==null||d.addEventListener("click",async()=>{const c=l.querySelectorAll("#rollcall-table-body tr"),u=[];c.forEach(g=>{var f,$;const p=g.getAttribute("data-player-id"),v=((f=g.querySelector(".rollcall-status-select"))==null?void 0:f.value)||"Not marked",h=(($=g.querySelector(".rollcall-note-input"))==null?void 0:$.value)||"";u.push({player:p,status:v,note:h})});try{await y.put(`/api/sessions/${t._id}/roll-call`,{rollCall:u}),b("Roll call saved successfully!","success"),I(),U()}catch(g){b(`Failed to save roll call: ${g.message}`,"error")}})}})}catch(s){b(`Error: ${s.message}`,"error")}}function qe(e=null){const s=!!e,t=`
    <form id="create-session-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Session Title *</label>
          <input type="text" id="s-title" class="form-control-custom" placeholder="e.g. NCC Indoor Practice - Nets" value="${x(e==null?void 0:e.title)}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Session Type *</label>
          <select id="s-type" class="form-select-custom">
            <option value="Practice" ${(e==null?void 0:e.type)==="Practice"?"selected":""}>Practice</option>
            <option value="Match" ${(e==null?void 0:e.type)==="Match"?"selected":""}>Match Attendance</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Date *</label>
          <input type="date" id="s-date" class="form-control-custom" value="${x((e==null?void 0:e.date)||new Date().toISOString().split("T")[0])}" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Venue</label>
          <input type="text" id="s-venue" class="form-control-custom" placeholder="e.g. Oval Indoor Nets (MCA SPL)" value="${x(e==null?void 0:e.venue)}">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="s-notes" class="form-control-custom" rows="2" placeholder="Specific training drills, equipment requirements...">${x(e==null?void 0:e.notes)}</textarea>
        </div>
      </div>
    </form>
  `;C({title:s?"Edit Session Details":"Schedule Practice or Match Attendance",contentHtml:t,onOpen:a=>{const i=a.querySelector("#modal-btn-save");i==null||i.addEventListener("click",async()=>{var d,c,u,g,p;const n=(d=document.getElementById("s-title"))==null?void 0:d.value.trim(),m=(c=document.getElementById("s-type"))==null?void 0:c.value,l=(u=document.getElementById("s-date"))==null?void 0:u.value,o=(g=document.getElementById("s-venue"))==null?void 0:g.value,r=(p=document.getElementById("s-notes"))==null?void 0:p.value;if(!n||!l){b("Title and date are required.","error");return}if(a.querySelector("#create-session-form").reportValidity()){i.disabled=!0;try{s?await y.put(`/api/sessions/${e.id}`,{title:n,type:m,date:l,venue:o,notes:r}):await y.post("/api/sessions",{title:n,type:m,date:l,venue:o,notes:r}),b(`Session "${n}" ${s?"updated":"scheduled"}.`,"success"),I(),U()}catch(v){b(`Error: ${v.message}`,"error")}finally{i.disabled=!1}}})}})}function et(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let ee=[],_=null;async function tt(e,s){var n,m,l,o,r;_=s;const t=["Administrator","Manager","Coach"].includes(_==null?void 0:_.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">MCA Match Centre</h2>
        <div class="small text-muted">Official MCA League Fixtures, Playing XI Lineups & Verified Scorecards</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-matches-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export Fixtures
        </button>
        <button class="btn btn-light-custom" id="btn-print-matches">
          <i class="bi bi-printer me-1"></i>Print Match Schedule
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-create-fixture">
            <i class="bi bi-plus-lg me-1"></i>Log MCA Fixture
          </button>
        `:""}
      </div>
    </div>

    <!-- Filters -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="match-search" class="form-control-custom border-start-0" placeholder="Search by opponent or competition...">
          </div>
        </div>
        <div class="col-md-4">
          <select id="match-format-filter" class="form-select-custom">
            <option value="All">All Formats</option>
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Fixtures Table -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-trophy me-2 text-danger"></i>MCA League 2026/27 Fixtures
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="matches-table">
            <thead>
              <tr>
                <th>Opposition & Competition</th>
                <th>Date & Venue</th>
                <th>Format</th>
                <th>Result</th>
                <th>Scores</th>
                <th>Scorecards</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="matches-tbody">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await Y(),(n=document.getElementById("match-search"))==null||n.addEventListener("input",at(Y,300)),(m=document.getElementById("match-format-filter"))==null||m.addEventListener("change",Y),(l=document.getElementById("btn-export-matches-csv"))==null||l.addEventListener("click",()=>{window.location.href="/api/reports/matches/csv"}),(o=document.getElementById("btn-print-matches"))==null||o.addEventListener("click",()=>{window.print()}),t&&((r=document.getElementById("btn-create-fixture"))==null||r.addEventListener("click",st));const i=new URLSearchParams(window.location.hash.split("?")[1]||"").get("id");i&&Te(i)}async function Y(){var a,i;const e=((a=document.getElementById("match-search"))==null?void 0:a.value)||"",s=((i=document.getElementById("match-format-filter"))==null?void 0:i.value)||"All",t=document.getElementById("matches-tbody");try{const n=new URLSearchParams;if(e&&n.append("search",e),s!=="All"&&n.append("format",s),ee=(await y.get(`/api/matches?${n.toString()}`)).matches,!ee||ee.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No MCA fixtures logged. Click "Log MCA Fixture" to add scheduled matches.
          </td>
        </tr>
      `;return}t.innerHTML=ee.map(l=>{const o=l.result==="Win"?"badge bg-success":l.result==="Loss"?"badge bg-danger":l.result==="Pending"?"badge bg-warning text-dark":"badge bg-secondary",r=l.ourScore||l.oppositionScore?`<div class="fw-bold">${l.ourScore||"—"}</div><div class="small text-muted">Opp: ${l.oppositionScore||"—"}</div>`:'<span class="text-muted small">Scores pending</span>';return`
        <tr>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">vs ${l.opponent}</div>
            <div class="small text-muted">${l.competition}</div>
          </td>
          <td>
            <div class="fw-bold">${l.date}</div>
            <div class="small text-muted">${l.venue||"Venue TBD"}</div>
          </td>
          <td><span class="badge-role badge-batsman">${l.format}</span></td>
          <td><span class="${o}">${l.result}</span></td>
          <td>${r}</td>
          <td>
            <span class="badge-role ${l.scorecardCount>0?"bg-info bg-opacity-10 text-primary border":""}">
              <i class="bi bi-paperclip me-1"></i>${l.scorecardCount} file(s)
            </span>
            ${l.scoresVerified?'<span class="badge bg-success ms-1" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-match" data-match-id="${l.id}">
              <span>Open match</span> &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-match").forEach(l=>{l.addEventListener("click",()=>{const o=l.getAttribute("data-match-id");Te(o)})})}catch(n){t.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${n.message}</td></tr>`}}async function Te(e){try{const s=await y.get(`/api/matches/${e}`),{match:t,attendanceSummary:a}=s,i=["Administrator","Manager","Coach"].includes(_==null?void 0:_.role),n=t.playingXI||[],m=n.filter(o=>o.status==="Playing XI").length,l=`
      <div>
        <!-- Match Header Info Card -->
        <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div class="row g-2 align-items-center">
            <div class="col-md-7">
              <span class="badge-role badge-batsman mb-1">${t.format} &bull; ${t.competition}</span>
              <h4 class="fw-bold text-main mb-1">Akbar CC vs ${t.opponent}</h4>
              <div class="small text-muted">
                <i class="bi bi-calendar3 me-1"></i>${t.date} &bull; <i class="bi bi-geo-alt me-1"></i>${t.venue||"Venue TBD"}
              </div>
            </div>
            <div class="col-md-5 text-md-end">
              <div class="stat-label">Result & Scores</div>
              <div class="fw-bold fs-5 text-main">${t.ourScore||"—"} <span class="text-muted fs-6">vs</span> ${t.oppositionScore||"—"}</div>
              <span class="badge ${t.result==="Win"?"bg-success":t.result==="Loss"?"bg-danger":"bg-warning text-dark"}">
                ${t.result}
              </span>
              ${t.scoresVerified?'<span class="badge bg-success ms-1"><i class="bi bi-shield-check"></i> Verified Scores</span>':""}
            </div>
          </div>
        </div>

        <!-- Tabbed Operations Navigation -->
        <ul class="nav nav-pills mb-3 border-bottom pb-2" id="matchTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active py-1 px-3 small fw-bold" id="tab-lineup-btn" data-bs-toggle="pill" data-bs-target="#tab-lineup" type="button">
              Playing XI (${m}/11)
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link py-1 px-3 small fw-bold" id="tab-scorecard-btn" data-bs-toggle="pill" data-bs-target="#tab-scorecard" type="button">
              Scorecards & Verification
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link py-1 px-3 small fw-bold" id="tab-attendance-btn" data-bs-toggle="pill" data-bs-target="#tab-attendance" type="button">
              Match Attendance
            </button>
          </li>
        </ul>

        <div class="tab-content" id="matchTabContent">
          <!-- TAB 1: Playing XI Selection -->
          <div class="tab-pane fade show active" id="tab-lineup" role="tabpanel">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="small text-muted">
                Select at most <strong>11 players</strong> for the official Playing XI. Keep selection separate from attendance.
              </div>
              <span class="badge bg-danger" id="playing-xi-counter">${m} / 11 Selected</span>
            </div>

            <div style="max-height: 380px; overflow-y: auto;">
              <table class="table-custom mb-0">
                <thead>
                  <tr>
                    <th>Squad Member</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th style="width: 170px;">Selection Status</th>
                  </tr>
                </thead>
                <tbody id="playing-xi-tbody">
                  ${n.map(o=>{const r=o.player||{};return`
                      <tr data-px-player-id="${r._id}">
                        <td class="fw-bold">${r.fullName||"Unknown"}</td>
                        <td><span class="badge-role">${r.cricketRole||"Not set"}</span></td>
                        <td class="small text-muted">${r.company||"—"}</td>
                        <td>
                          <select class="form-select-custom px-status-select" ${i?"":"disabled"}>
                            <option value="Playing XI" ${o.status==="Playing XI"?"selected":""}>Playing XI</option>
                            <option value="Reserve" ${o.status==="Reserve"?"selected":""}>Reserve</option>
                            <option value="Unavailable" ${o.status==="Unavailable"?"selected":""}>Unavailable</option>
                          </select>
                        </td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>

            ${i?`
              <div class="mt-3 text-end">
                <button type="button" class="btn btn-burgundy btn-sm" id="btn-save-playing-xi">
                  Save Playing XI
                </button>
              </div>
            `:""}
          </div>

          <!-- TAB 2: Scorecard Upload & Verification Review Table -->
          <div class="tab-pane fade" id="tab-scorecard" role="tabpanel">
            <div class="p-3 rounded border mb-3" style="background: var(--body-bg); border-color: var(--border-color) !important;">
              <h6 class="stat-label mb-2 text-danger">Upload Match Scorecard (PDF or CSV up to 10MB)</h6>
              <div class="d-flex flex-wrap gap-2 align-items-center">
                <input type="file" id="scorecard-file-input" class="form-control-custom" style="max-width: 380px;" accept=".csv,.pdf">
                <button type="button" class="btn btn-burgundy btn-sm" id="btn-upload-scorecard-action">
                  <i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview
                </button>
                <a href="/templates/sample_scorecard.csv" download class="btn btn-light-custom btn-sm ms-auto">
                  <i class="bi bi-download me-1"></i>Sample CSV
                </a>
              </div>
              <div class="small text-muted mt-2">
                <i class="bi bi-shield-check text-success me-1"></i>Uploading or previewing will NOT change official statistics. Official player statistics and leaderboards update ONLY when "Confirm verified scores" is executed.
              </div>
            </div>

            <!-- Upload Attachments History -->
            ${(t.scorecards||[]).length>0?`
              <div class="mb-3">
                <div class="stat-label mb-1">Attached Scorecard Documents</div>
                <div class="d-flex flex-wrap gap-2">
                  ${t.scorecards.map(o=>`
                    <a href="/api/uploads/${o.filename}" target="_blank" class="badge bg-light text-dark border p-2 text-decoration-none">
                      <i class="bi bi-file-earmark-text me-1 text-danger"></i>${o.originalName} (${Math.round(o.size/1024)} KB)
                    </a>
                  `).join("")}
                </div>
              </div>
            `:""}

            <!-- Extracted PDF Text Box (if PDF was reviewed) -->
            <div id="pdf-extracted-box" class="d-none mb-3 p-3 rounded bg-light border small">
              <div class="fw-bold text-main mb-1">Extracted PDF Text Preview:</div>
              <pre id="pdf-text-content" style="max-height: 180px; overflow-y: auto; white-space: pre-wrap; font-size: 11px;"></pre>
            </div>

            <!-- Score Review & Verification Table -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="stat-label">Official Match Scoring Review Table</span>
              <button type="button" class="btn btn-sm btn-outline-burgundy" id="btn-populate-from-xi">
                Load Playing XI into Score Table
              </button>
            </div>

            <div style="max-height: 380px; overflow-y: auto;">
              <table class="table-custom mb-0 small" id="score-review-table">
                <thead>
                  <tr>
                    <th>Include</th>
                    <th>Player</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4s / 6s</th>
                    <th>Batted / NO</th>
                    <th>Balls Bowled</th>
                    <th>Runs Conceded</th>
                    <th>Wkts</th>
                    <th>Catches</th>
                    <th>Stump</th>
                    <th>Run-out</th>
                  </tr>
                </thead>
                <tbody id="score-review-tbody">
                  ${(t.playerStats&&t.playerStats.length>0?t.playerStats:n.filter(o=>o.status==="Playing XI").map(o=>{var r;return{player:o.player,playerName:((r=o.player)==null?void 0:r.fullName)||"Player",batted:!0,runs:0,balls:0,fours:0,sixes:0,notOut:!1,ballsBowled:0,runsConceded:0,wickets:0,catches:0,stumpings:0,runOuts:0}})).map((o,r)=>{var u,g;const d=((u=o.player)==null?void 0:u._id)||o.player,c=o.playerName||((g=o.player)==null?void 0:g.fullName)||"Player";return`
                      <tr data-stat-player-id="${d}">
                        <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                        <td class="fw-bold">${c}</td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${o.runs||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${o.balls||0}"></td>
                        <td>
                          <div class="d-flex gap-1">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${o.fours||0}">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${o.sixes||0}">
                          </div>
                        </td>
                        <td>
                          <div class="d-flex gap-2">
                            <label><input type="checkbox" class="form-check-input stat-batted" ${o.batted?"checked":""}> Bat</label>
                            <label><input type="checkbox" class="form-check-input stat-notout" ${o.notOut?"checked":""}> NO</label>
                          </div>
                        </td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" title="Total balls bowled (e.g. 24 balls = 4.0 overs)" style="width: 55px;" value="${o.ballsBowled||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${o.runsConceded||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${o.wickets||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${o.catches||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${o.stumpings||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${o.runOuts||0}"></td>
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            </div>

            <!-- Match Score and Result Inputs -->
            <div class="row g-2 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
              <div class="col-md-3">
                <label class="form-label-custom">Our Final Score</label>
                <input type="text" id="m-ourScore" class="form-control-custom" placeholder="e.g. 182/6 (20.0)" value="${t.ourScore||""}">
              </div>
              <div class="col-md-3">
                <label class="form-label-custom">Opponent Final Score</label>
                <input type="text" id="m-oppScore" class="form-control-custom" placeholder="e.g. 175/9 (20.0)" value="${t.oppositionScore||""}">
              </div>
              <div class="col-md-3">
                <label class="form-label-custom">Match Result</label>
                <select id="m-result" class="form-select-custom">
                  <option value="Pending" ${t.result==="Pending"?"selected":""}>Pending</option>
                  <option value="Win" ${t.result==="Win"?"selected":""}>Win</option>
                  <option value="Loss" ${t.result==="Loss"?"selected":""}>Loss</option>
                  <option value="Tie" ${t.result==="Tie"?"selected":""}>Tie</option>
                  <option value="No result" ${t.result==="No result"?"selected":""}>No result</option>
                </select>
              </div>
              <div class="col-md-3 d-flex align-items-end">
                ${i?`
                  <button type="button" class="btn btn-burgundy w-100" id="btn-confirm-verified-scores">
                    <i class="bi bi-shield-check me-1"></i>Confirm Verified Scores
                  </button>
                `:""}
              </div>
            </div>
          </div>

          <!-- TAB 3: Linked Attendance -->
          <div class="tab-pane fade" id="tab-attendance" role="tabpanel">
            <div class="p-3 rounded border" style="background: var(--body-bg); border-color: var(--border-color) !important;">
              <h6 class="stat-label mb-1 text-danger">Linked Match Attendance</h6>
              <p class="small text-muted mb-3">Attendance summary: <strong>${a}</strong></p>
              ${t.linkedSessionId?`
                <a href="#/attendance" class="btn btn-outline-burgundy btn-sm" onclick="closeModal()">
                  <i class="bi bi-box-arrow-up-right me-1"></i>Open Match Attendance Register
                </a>
              `:`
                <div class="small text-muted">No linked attendance session found for this match.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;C({title:`Match Control: vs ${t.opponent}`,contentHtml:l,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:o=>{var c,u,g;const r=o.querySelectorAll('[data-bs-toggle="pill"]');r.forEach(p=>{p.addEventListener("click",v=>{r.forEach(f=>f.classList.remove("active")),o.querySelectorAll(".tab-pane").forEach(f=>f.classList.remove("show","active")),p.classList.add("active");const h=o.querySelector(p.getAttribute("data-bs-target"));h&&h.classList.add("show","active")})});const d=()=>{const p=o.querySelectorAll(".px-status-select");let v=0;p.forEach(f=>{f.value==="Playing XI"&&v++});const h=document.getElementById("playing-xi-counter");h&&(h.textContent=`${v} / 11 Selected`,h.className=v>11?"badge bg-danger":v===11?"badge bg-success":"badge bg-warning text-dark")};o.querySelectorAll(".px-status-select").forEach(p=>{p.addEventListener("change",d)}),(c=document.getElementById("btn-save-playing-xi"))==null||c.addEventListener("click",async()=>{const p=o.querySelectorAll("#playing-xi-tbody tr"),v=[];let h=0;if(p.forEach(f=>{var B;const $=f.getAttribute("data-px-player-id"),w=((B=f.querySelector(".px-status-select"))==null?void 0:B.value)||"Unavailable";w==="Playing XI"&&h++,v.push({playerId:$,status:w})}),h>11){b(`At most 11 players allowed in Playing XI. Selected ${h}.`,"error");return}try{await y.put(`/api/matches/${t._id}/playing-xi`,{selections:v}),b(`Playing XI saved (${h} selected in starting XI).`,"success"),Y()}catch(f){b(`Error: ${f.message}`,"error")}}),(u=document.getElementById("btn-upload-scorecard-action"))==null||u.addEventListener("click",async()=>{const p=document.getElementById("scorecard-file-input");if(!p||!p.files||p.files.length===0){b("Please select a PDF or CSV scorecard file to upload.","error");return}const v=new FormData;v.append("scorecardFile",p.files[0]);const h=document.getElementById("btn-upload-scorecard-action");h.disabled=!0,h.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Parsing...';try{const f=await y.upload(`/api/matches/${t._id}/scorecard`,v);if(b(f.message,"success"),f.fileType==="csv"&&f.matched){const $=document.getElementById("score-review-tbody");$&&($.innerHTML=f.matched.map(w=>`
                  <tr data-stat-player-id="${w.player}">
                    <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                    <td class="fw-bold">${w.playerName}</td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${w.runs}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${w.balls}"></td>
                    <td>
                      <div class="d-flex gap-1">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${w.fours}">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${w.sixes}">
                      </div>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <label><input type="checkbox" class="form-check-input stat-batted" ${w.batted?"checked":""}> Bat</label>
                        <label><input type="checkbox" class="form-check-input stat-notout" ${w.notOut?"checked":""}> NO</label>
                      </div>
                    </td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" style="width: 55px;" value="${w.ballsBowled}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${w.runsConceded}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${w.wickets}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${w.catches}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${w.stumpings}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${w.runOuts}"></td>
                  </tr>
                `).join("")),f.unmatched&&f.unmatched.length>0&&b(`Warning: ${f.unmatched.length} player(s) in CSV could not be matched to squad register.`,"warning")}else if(f.fileType==="pdf"){const $=document.getElementById("pdf-extracted-box"),w=document.getElementById("pdf-text-content");$&&w&&(w.textContent=f.extractedText||"No plain text found (scanned image PDF).",$.classList.remove("d-none"))}}catch(f){b(`Upload failed: ${f.message}`,"error")}finally{h.disabled=!1,h.innerHTML='<i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview'}}),(g=document.getElementById("btn-confirm-verified-scores"))==null||g.addEventListener("click",async()=>{var w,B,S;const p=o.querySelectorAll("#score-review-tbody tr"),v=[];p.forEach(E=>{var ve,ge,fe,ye,he,xe,we,$e,Ee,ke,Ie,Ce,Be,Ae;if(!((ve=E.querySelector(".stat-include"))==null?void 0:ve.checked))return;const R=E.getAttribute("data-stat-player-id"),D=(ge=E.querySelector("td:nth-child(2)"))==null?void 0:ge.textContent.trim(),N=parseInt(((fe=E.querySelector(".stat-runs"))==null?void 0:fe.value)||0,10),O=parseInt(((ye=E.querySelector(".stat-balls"))==null?void 0:ye.value)||0,10),H=parseInt(((he=E.querySelector(".stat-4s"))==null?void 0:he.value)||0,10),F=parseInt(((xe=E.querySelector(".stat-6s"))==null?void 0:xe.value)||0,10),j=(we=E.querySelector(".stat-batted"))==null?void 0:we.checked,z=($e=E.querySelector(".stat-notout"))==null?void 0:$e.checked,Q=parseInt(((Ee=E.querySelector(".stat-ballsbowled"))==null?void 0:Ee.value)||0,10),ce=parseInt(((ke=E.querySelector(".stat-runsconceded"))==null?void 0:ke.value)||0,10),Fe=parseInt(((Ie=E.querySelector(".stat-wickets"))==null?void 0:Ie.value)||0,10),je=parseInt(((Ce=E.querySelector(".stat-catches"))==null?void 0:Ce.value)||0,10),ze=parseInt(((Be=E.querySelector(".stat-stumpings"))==null?void 0:Be.value)||0,10),Ve=parseInt(((Ae=E.querySelector(".stat-runouts"))==null?void 0:Ae.value)||0,10);v.push({player:R,playerName:D,batted:j,notOut:z,runs:N,balls:O,fours:H,sixes:F,ballsBowled:Q,runsConceded:ce,wickets:Fe,catches:je,stumpings:ze,runOuts:Ve})});const h=(w=document.getElementById("m-ourScore"))==null?void 0:w.value,f=(B=document.getElementById("m-oppScore"))==null?void 0:B.value,$=(S=document.getElementById("m-result"))==null?void 0:S.value;try{await y.post(`/api/matches/${t._id}/verify-scores`,{playerStats:v,ourScore:h,oppositionScore:f,result:$}),b("Official match scores confirmed and season leaderboards updated!","success"),I(),Y()}catch(E){b(`Verification failed: ${E.message}`,"error")}})}})}catch(s){b(`Failed to open match details: ${s.message}`,"error")}}function st(){const e=`
    <form id="create-fixture-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Opponent *</label>
          <input type="text" id="m-opponent" class="form-control-custom" placeholder="e.g. Colombo Colts CC" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Competition</label>
          <input type="text" id="m-competition" class="form-control-custom" value="MCA League 2026/27">
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Date *</label>
          <input type="date" id="m-date" class="form-control-custom" value="${new Date().toISOString().split("T")[0]}" required>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Format *</label>
          <select id="m-format" class="form-select-custom">
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Initial Result Status</label>
          <select id="m-result-init" class="form-select-custom">
            <option value="Pending">Pending</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Tie">Tie</option>
            <option value="No result">No result</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Match Venue</label>
          <input type="text" id="m-venue" class="form-control-custom" placeholder="e.g. MCA Grounds, Colombo">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="m-notes" class="form-control-custom" rows="2" placeholder="Match referee, pitch conditions, team logistics..."></textarea>
        </div>
      </div>
    </form>
  `;C({title:"Log Official MCA League Fixture",contentHtml:e,onOpen:s=>{var t;(t=document.getElementById("modal-btn-save"))==null||t.addEventListener("click",async()=>{var d,c,u,g,p,v,h;const a=(d=document.getElementById("m-opponent"))==null?void 0:d.value,i=(c=document.getElementById("m-competition"))==null?void 0:c.value,n=(u=document.getElementById("m-date"))==null?void 0:u.value,m=(g=document.getElementById("m-format"))==null?void 0:g.value,l=(p=document.getElementById("m-result-init"))==null?void 0:p.value,o=(v=document.getElementById("m-venue"))==null?void 0:v.value,r=(h=document.getElementById("m-notes"))==null?void 0:h.value;if(!a||!n){b("Opponent and date are required.","error");return}try{await y.post("/api/matches",{opponent:a,competition:i,date:n,format:m,result:l,venue:o,notes:r}),b(`Fixture vs ${a} created with linked attendance session.`,"success"),I(),Y()}catch(f){b(`Error: ${f.message}`,"error")}})}})}function at(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}async function nt(e){var s,t,a;e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Player Leaderboards</h2>
        <div class="small text-muted">Official Confirmed Season Performance & Rankings</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-leaderboard-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download Filtered CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-leaderboard">
          <i class="bi bi-printer me-1"></i>Print Leaderboard
        </button>
      </div>
    </div>

    <!-- Filters Toolbar -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Season</label>
          <select id="lead-season-filter" class="form-select-custom">
            <option value="All">All Seasons</option>
            <option value="2026-2027" selected>2026–2027</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Competition</label>
          <select id="lead-comp-filter" class="form-select-custom">
            <option value="All">All Competitions</option>
            <option value="MCA League 2026/27">MCA League 2026/27</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Format</label>
          <select id="lead-format-filter" class="form-select-custom">
            <option value="All">All Formats</option>
            <option value="T20">T20</option>
            <option value="T10">T10</option>
            <option value="50 Overs">50 Overs</option>
          </select>
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label-custom">Action</label>
          <button class="btn btn-burgundy w-100" id="btn-apply-lead-filters">Apply Filters</button>
        </div>
      </div>
    </div>

    <!-- Top 5 Performer Cards (Batsman, Bowler, Fielder) -->
    <div class="row g-3 mb-4" id="leaderboard-cards-container">
      <div class="col-12 text-center py-4">
        <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
      </div>
    </div>

    <!-- Explanation Banner on Fielding Points Rule -->
    <div class="p-3 rounded mb-4 border d-flex align-items-center gap-3" style="background: rgba(220, 175, 101, 0.08); border-color: rgba(220, 175, 101, 0.3) !important;">
      <i class="bi bi-info-circle-fill text-gold fs-4 flex-shrink-0"></i>
      <div style="font-size: 12.5px; line-height: 1.4;">
        <strong>Akbar Cricket Club Scoring Rule:</strong> Fielding Points are computed as:
        <code>Fielding Points = Catches (1.0 pt) + 1.5 × Stumpings + 1.5 × Run-outs</code>.
        Batting average shows a dash (—) when a player has zero dismissals. Bowling economy shows a dash (—) when zero balls have been bowled.
      </div>
    </div>

    <!-- Full Stats Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-table me-2 text-danger"></i>Full Squad Verified Performance Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="leaderboard-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Company</th>
                <th class="text-center">Matches</th>
                <th class="text-center">Runs</th>
                <th class="text-center">Bat SR</th>
                <th class="text-center">Bat Avg.</th>
                <th class="text-center">Wickets</th>
                <th class="text-center">Economy</th>
                <th class="text-center">Catches</th>
                <th class="text-center">Stumpings</th>
                <th class="text-center">Run-outs</th>
                <th class="text-center">Field Points</th>
              </tr>
            </thead>
            <tbody id="leaderboard-tbody">
              <tr>
                <td colspan="12" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await Me(),(s=document.getElementById("btn-apply-lead-filters"))==null||s.addEventListener("click",Me),(t=document.getElementById("btn-export-leaderboard-csv"))==null||t.addEventListener("click",()=>{window.location.href="/api/leaderboards/export-csv"}),(a=document.getElementById("btn-print-leaderboard"))==null||a.addEventListener("click",()=>{window.print()})}async function Me(){var n,m,l;const e=((n=document.getElementById("lead-season-filter"))==null?void 0:n.value)||"All",s=((m=document.getElementById("lead-comp-filter"))==null?void 0:m.value)||"All",t=((l=document.getElementById("lead-format-filter"))==null?void 0:l.value)||"All",a=document.getElementById("leaderboard-cards-container"),i=document.getElementById("leaderboard-tbody");try{const o=new URLSearchParams;e!=="All"&&o.append("season",e),s!=="All"&&o.append("competition",s),t!=="All"&&o.append("format",t);const r=await y.get(`/api/leaderboards?${o.toString()}`),{topBatsmen:d,topBowlers:c,topFielders:u,tableData:g}=r;if(a.innerHTML=`
      <!-- Best Batsmen Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Batsman</span>
            <span class="badge-role badge-batsman">Runs & SR</span>
          </div>
          ${d&&d.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${d[0].playerName}</div>
              <div class="stat-value text-danger my-1">${d[0].runs} <span class="small text-muted fs-6">runs</span></div>
              <div class="small text-muted">SR: ${d[0].batSR} &bull; Avg: ${d[0].batAvg!==null?d[0].batAvg:"—"}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Batsmen</div>
              ${d.map((p,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${p.playerName}</span>
                  <span>${p.runs} r <span class="text-muted" style="font-size: 10px;">(SR ${p.batSR})</span></span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small py-4">No verified batting statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>

      <!-- Best Bowlers Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Bowler</span>
            <span class="badge-role badge-bowler">Wickets & Econ</span>
          </div>
          ${c&&c.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${c[0].playerName}</div>
              <div class="stat-value text-danger my-1">${c[0].wickets} <span class="small text-muted fs-6">wickets</span></div>
              <div class="small text-muted">Econ: ${c[0].economy!==null?c[0].economy:"—"} &bull; Balls: ${c[0].ballsBowled}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Bowlers</div>
              ${c.map((p,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${p.playerName}</span>
                  <span>${p.wickets} w <span class="text-muted" style="font-size: 10px;">(E ${p.economy!==null?p.economy:"—"})</span></span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small py-4">No verified bowling statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>

      <!-- Best Fielders Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Fielder</span>
            <span class="badge-role badge-allrounder">Points & Catches</span>
          </div>
          ${u&&u.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${u[0].playerName}</div>
              <div class="stat-value text-gold my-1">${u[0].fieldingPoints} <span class="small text-muted fs-6">points</span></div>
              <div class="small text-muted">Catches: ${u[0].catches} &bull; Stump: ${u[0].stumpings} &bull; RO: ${u[0].runOuts}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Fielders</div>
              ${u.map((p,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${p.playerName}</span>
                  <span>${p.fieldingPoints} pts <span class="text-muted" style="font-size: 10px;">(${p.catches} c)</span></span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small py-4">No verified fielding statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>
    `,!g||g.length===0){i.innerHTML='<tr><td colspan="12" class="text-center py-4 text-muted">No squad statistics found.</td></tr>';return}i.innerHTML=g.map(p=>`
      <tr>
        <td class="fw-bold text-main">${p.playerName}</td>
        <td class="small text-muted">${p.company}</td>
        <td class="text-center">${p.matches}</td>
        <td class="text-center fw-bold text-danger">${p.runs}</td>
        <td class="text-center">${p.batSR.toFixed(2)}</td>
        <td class="text-center">${p.batAvg!==null?p.batAvg.toFixed(2):"—"}</td>
        <td class="text-center fw-bold text-main">${p.wickets}</td>
        <td class="text-center">${p.economy!==null?p.economy.toFixed(2):"—"}</td>
        <td class="text-center">${p.catches}</td>
        <td class="text-center">${p.stumpings}</td>
        <td class="text-center">${p.runOuts}</td>
        <td class="text-center fw-bold text-gold">${p.fieldingPoints}</td>
      </tr>
    `).join("")}catch(o){a.innerHTML=`<div class="col-12 alert alert-danger">${o.message}</div>`}}let W=[],P=null;async function lt(e,s){var a,i,n,m,l;P=s;const t=["Administrator","Manager","Coach"].includes(P==null?void 0:P.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Gear & Inventory</h2>
        <div class="small text-muted">Equipment Assets, First Aid Medical Stock & Consumables</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-export-inventory-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export Register
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-add-inventory-item">
            <i class="bi bi-plus-lg me-1"></i>New Equipment Record
          </button>
        `:""}
      </div>
    </div>

    <!-- 4 Primary Inventory Stat Cards -->
    <div class="row g-3 mb-4" id="inventory-stats-row">
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Item Records</span>
            <i class="bi bi-box-seam text-muted fs-5"></i>
          </div>
          <div class="stat-value" id="stat-total-items">—</div>
          <div class="small text-muted mt-1">Total catalogued assets</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Count Pending</span>
            <i class="bi bi-hourglass text-muted fs-5"></i>
          </div>
          <div class="stat-value text-gold" id="stat-count-pending">—</div>
          <div class="small text-muted mt-1">Unverified stock counts</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Damaged / Lost</span>
            <i class="bi bi-exclamation-octagon text-muted fs-5"></i>
          </div>
          <div class="stat-value text-danger" id="stat-damaged-lost">—</div>
          <div class="small text-muted mt-1">Requires repair / replacement</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card-custom p-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="stat-label">Low Stock (Verified)</span>
            <i class="bi bi-graph-down-arrow text-muted fs-5"></i>
          </div>
          <div class="stat-value text-danger" id="stat-low-stock">—</div>
          <div class="small text-muted mt-1">Below minimum target</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card-custom p-3 mb-4">
      <div class="row g-2 align-items-center register-filters">
        <div class="col-md-5">
          <div class="input-group register-search">
            <span class="input-group-text bg-transparent border-end-0" style="border-color: var(--border-color); color: var(--text-muted);">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" id="inventory-search" class="form-control-custom border-start-0" placeholder="Search by asset ID, item name, or location...">
          </div>
        </div>
        <div class="col-6 col-md-3">
          <select id="inventory-category-filter" class="form-select-custom">
            <option value="All">All Categories</option>
            <option value="Cricket Gear">Cricket Gear</option>
            <option value="First Aid">First Aid</option>
            <option value="Shared Equipment">Shared Equipment</option>
            <option value="Consumables">Consumables</option>
          </select>
        </div>
        <div class="col-6 col-md-4">
          <select id="inventory-condition-filter" class="form-select-custom">
            <option value="All">All Conditions</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Inspect">Inspect</option>
            <option value="Damaged">Damaged</option>
            <option value="Retired">Retired</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Inventory Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-list-check me-2 text-danger"></i>Equipment & Supplies Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="inventory-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Equipment</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Inspection / Expiry</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-tbody">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await Promise.all([oe(),K()]),(a=document.getElementById("inventory-search"))==null||a.addEventListener("input",dt(K,300)),(i=document.getElementById("inventory-category-filter"))==null||i.addEventListener("change",K),(n=document.getElementById("inventory-condition-filter"))==null||n.addEventListener("change",K),(m=document.getElementById("btn-export-inventory-csv"))==null||m.addEventListener("click",()=>{window.location.href="/api/reports/equipment/csv"}),t&&((l=document.getElementById("btn-add-inventory-item"))==null||l.addEventListener("click",()=>Re(null)))}async function oe(){try{const e=await y.get("/api/equipment/stats"),{stats:s}=e;document.getElementById("stat-total-items").textContent=s.totalRecords,document.getElementById("stat-count-pending").textContent=s.countPending,document.getElementById("stat-damaged-lost").textContent=s.damagedOrLost,document.getElementById("stat-low-stock").textContent=s.lowStock}catch(e){console.error("Failed to load inventory metrics:",e)}}async function K(){var i,n,m;const e=((i=document.getElementById("inventory-search"))==null?void 0:i.value)||"",s=((n=document.getElementById("inventory-category-filter"))==null?void 0:n.value)||"All",t=((m=document.getElementById("inventory-condition-filter"))==null?void 0:m.value)||"All",a=document.getElementById("inventory-tbody");try{const l=new URLSearchParams;if(e&&l.append("search",e),s!=="All"&&l.append("category",s),t!=="All"&&l.append("condition",t),W=(await y.get(`/api/equipment?${l.toString()}`)).equipment,!W||W.length===0){a.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted">No equipment items found.</td></tr>';return}const r=["Administrator","Manager","Coach"].includes(P==null?void 0:P.role),d=["Administrator","Manager"].includes(P==null?void 0:P.role);a.innerHTML=W.map(c=>{const u=c.condition==="Good"?"badge bg-success":c.condition==="Fair"?"badge bg-info text-dark":c.condition==="Inspect"?"badge bg-warning text-dark":c.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",g=c.countVerified?'<span class="badge bg-success bg-opacity-10 text-success border border-success" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':'<span class="badge bg-warning bg-opacity-10 text-dark border border-warning" style="font-size: 9px;"><i class="bi bi-hourglass-split"></i> Count pending</span>',p=c.isLowStock?`<span class="badge bg-danger ms-1" style="font-size: 9px;">Low Stock (Min: ${c.minimumStock})</span>`:"",v=c.assignedPlayer?`<div class="small text-muted"><i class="bi bi-person me-1"></i>Assigned: ${c.assignedPlayer.fullName}</div>`:"";return`
        <tr>
          <td class="fw-bold font-monospace text-main">${c.assetId}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${c.name}</div>
            <div class="small text-muted">${c.location}</div>
            ${v}
          </td>
          <td><span class="badge-role">${c.category}</span></td>
          <td>
            <div class="fw-bold fs-6">${c.quantity} <span class="small text-muted fw-normal">${c.unit}</span></div>
            <div>${g} ${p}</div>
          </td>
          <td><span class="${u}">${c.condition}</span></td>
          <td class="small">
            <div>Insp: ${c.lastInspectedDate||"Awaiting check"}</div>
            ${c.expiryDate?`<div class="text-muted">Exp: ${c.expiryDate}</div>`:""}
          </td>
          <td class="text-end text-nowrap">
            ${r?`
              <button class="btn btn-sm btn-outline-burgundy py-1 px-2 btn-verify-stock" data-item-id="${c.id}" title="Physically verify stock count">
                <i class="bi bi-check2-square me-1"></i>Verify
              </button>
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-edit-equipment" data-item-id="${c.id}" title="Edit asset details">
                <i class="bi bi-pencil"></i>
              </button>
            `:`
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-view-equipment" data-item-id="${c.id}">
                View
              </button>
            `}
            ${d?`
              <button type="button" class="btn btn-sm btn-outline-danger py-1 px-2 btn-delete-equipment" data-item-id="${c.id}" title="Delete equipment record">
                <i class="bi bi-trash me-1"></i>Delete
              </button>
            `:""}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-verify-stock").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-item-id");ot(u)})}),document.querySelectorAll(".btn-edit-equipment, .btn-view-equipment").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-item-id"),g=W.find(p=>p.id===u);Re(g)})}),document.querySelectorAll(".btn-delete-equipment").forEach(c=>{c.addEventListener("click",()=>{const u=W.find(g=>g.id===c.dataset.itemId);u&&it(u)})})}catch(l){a.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${l.message}</td></tr>`}}function it(e){C({title:"Delete Equipment Record",contentHtml:`<p>Delete <strong>${x(e.name)} (${x(e.assetId)})</strong> from the register?</p>
      <p class="small text-muted mb-0">This permanently deletes the equipment record. This cannot be undone.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-equipment">Delete Equipment</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-equipment");t.addEventListener("click",async()=>{t.disabled=!0;try{await y.delete(`/api/equipment/${e.id}`),b("Equipment record deleted successfully.","success"),I(),await Promise.all([oe(),K()])}catch(a){b(`Failed to delete equipment: ${a.message}`,"error"),t.disabled=!1}})}})}function ot(e){const s=W.find(a=>a.id===e);if(!s)return;const t=`
    <div>
      <p class="small text-muted mb-3">
        Physically count and verify inventory reserves for <strong>${s.name} (${s.assetId})</strong>.
      </p>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Current System Quantity</label>
          <input type="text" class="form-control-custom" value="${s.quantity} ${s.unit}" disabled>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Minimum Stock Target</label>
          <input type="text" class="form-control-custom" value="${s.minimumStock} ${s.unit}" disabled>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Physically Verified Quantity *</label>
          <input type="number" id="v-quantity" class="form-control-custom" value="${s.quantity}" min="0" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Verification Notes / Storage Location Audit</label>
          <textarea id="v-notes" class="form-control-custom" rows="2" placeholder="Audit conducted by team official..."></textarea>
        </div>
      </div>
    </div>
  `;C({title:`Verify Physical Stock: ${s.assetId}`,contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-verify-stock">Confirm Verification</button>
    `,onOpen:a=>{var i;(i=document.getElementById("btn-submit-verify-stock"))==null||i.addEventListener("click",async()=>{var l,o;const n=(l=document.getElementById("v-quantity"))==null?void 0:l.value,m=(o=document.getElementById("v-notes"))==null?void 0:o.value;if(n===""||isNaN(parseInt(n,10))){b("Please enter a valid count number.","error");return}try{await y.put(`/api/equipment/${s.id}/verify-count`,{verifiedQuantity:parseInt(n,10),notes:m}),b(`Physical count verified for ${s.name}.`,"success"),I(),await Promise.all([oe(),K()])}catch(r){b(`Error: ${r.message}`,"error")}})}})}async function Re(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(P==null?void 0:P.role);let a=[];try{a=(await y.get("/api/players")).players||[]}catch{}const i=`
    <form id="equipment-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Asset ID *</label>
          <input type="text" id="eq-assetId" class="form-control-custom font-monospace" placeholder="e.g. ACC-HELM-04" value="${(e==null?void 0:e.assetId)||""}" required ${s?"disabled":""}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Item Name *</label>
          <input type="text" id="eq-name" class="form-control-custom" placeholder="e.g. Cricket Helmet - Navy Standard" value="${(e==null?void 0:e.name)||""}" required ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Category *</label>
          <select id="eq-category" class="form-select-custom" ${t?"":"disabled"}>
            <option value="Cricket Gear" ${(e==null?void 0:e.category)==="Cricket Gear"?"selected":""}>Cricket Gear</option>
            <option value="First Aid" ${(e==null?void 0:e.category)==="First Aid"?"selected":""}>First Aid</option>
            <option value="Shared Equipment" ${(e==null?void 0:e.category)==="Shared Equipment"?"selected":""}>Shared Equipment</option>
            <option value="Consumables" ${(e==null?void 0:e.category)==="Consumables"?"selected":""}>Consumables</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Condition *</label>
          <select id="eq-condition" class="form-select-custom" ${t?"":"disabled"}>
            <option value="Good" ${(e==null?void 0:e.condition)==="Good"?"selected":""}>Good</option>
            <option value="Fair" ${(e==null?void 0:e.condition)==="Fair"?"selected":""}>Fair</option>
            <option value="Inspect" ${(e==null?void 0:e.condition)==="Inspect"?"selected":""}>Inspect</option>
            <option value="Damaged" ${(e==null?void 0:e.condition)==="Damaged"?"selected":""}>Damaged</option>
            <option value="Retired" ${(e==null?void 0:e.condition)==="Retired"?"selected":""}>Retired</option>
            <option value="Lost" ${(e==null?void 0:e.condition)==="Lost"?"selected":""}>Lost</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Quantity *</label>
          <input type="number" id="eq-quantity" class="form-control-custom" value="${(e==null?void 0:e.quantity)||1}" min="0" required ${t?"":"disabled"}>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Unit</label>
          <input type="text" id="eq-unit" class="form-control-custom" placeholder="units, pairs, rolls, packs" value="${(e==null?void 0:e.unit)||"units"}" ${t?"":"disabled"}>
        </div>
        <div class="col-md-4">
          <label class="form-label-custom">Minimum Target *</label>
          <input type="number" id="eq-minStock" class="form-control-custom" value="${(e==null?void 0:e.minimumStock)||1}" min="0" required ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Storage Location</label>
          <input type="text" id="eq-location" class="form-control-custom" value="${(e==null?void 0:e.location)||"Clubhouse Store"}" ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Assigned Squad Member</label>
          <select id="eq-assignedPlayer" class="form-select-custom" ${t?"":"disabled"}>
            <option value="">None (Clubhouse General Stock)</option>
            ${a.map(n=>{var m;return`
              <option value="${n._id}" ${((m=e==null?void 0:e.assignedPlayer)==null?void 0:m._id)===n._id||(e==null?void 0:e.assignedPlayer)===n._id?"selected":""}>
                ${n.fullName} (${n.company})
              </option>
            `}).join("")}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Expiry Date (if applicable)</label>
          <input type="date" id="eq-expiryDate" class="form-control-custom" value="${(e==null?void 0:e.expiryDate)||""}" ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Purchase Cost (LKR)</label>
          <input type="number" id="eq-cost" class="form-control-custom" value="${(e==null?void 0:e.costLKR)||0}" min="0" ${t?"":"disabled"}>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Notes & Observations</label>
          <textarea id="eq-notes" class="form-control-custom" rows="2" ${t?"":"disabled"}>${(e==null?void 0:e.notes)||""}</textarea>
        </div>
      </div>
    </form>
  `;C({title:s?`Edit Asset: ${e.assetId}`:"Add New Equipment Record",contentHtml:i,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:n=>{var m;t&&((m=document.getElementById("modal-btn-save"))==null||m.addEventListener("click",async()=>{var B,S,E,X,R,D,N,O,H,F,j,z;const l=(B=document.getElementById("eq-assetId"))==null?void 0:B.value,o=(S=document.getElementById("eq-name"))==null?void 0:S.value,r=(E=document.getElementById("eq-category"))==null?void 0:E.value,d=(X=document.getElementById("eq-condition"))==null?void 0:X.value,c=(R=document.getElementById("eq-quantity"))==null?void 0:R.value,u=(D=document.getElementById("eq-unit"))==null?void 0:D.value,g=(N=document.getElementById("eq-minStock"))==null?void 0:N.value,p=(O=document.getElementById("eq-location"))==null?void 0:O.value,v=(H=document.getElementById("eq-assignedPlayer"))==null?void 0:H.value,h=(F=document.getElementById("eq-expiryDate"))==null?void 0:F.value,f=(j=document.getElementById("eq-cost"))==null?void 0:j.value,$=(z=document.getElementById("eq-notes"))==null?void 0:z.value;if(!o||!l){b("Asset ID and Name are required.","error");return}const w={assetId:l,name:o,category:r,condition:d,quantity:parseInt(c,10),unit:u,minimumStock:parseInt(g,10),location:p,assignedPlayer:v||null,expiryDate:h||null,costLKR:parseFloat(f||0),notes:$};try{s?(await y.put(`/api/equipment/${e.id}`,w),b(`Asset ${l} updated.`,"success")):(await y.post("/api/equipment",w),b(`Asset ${l} created.`,"success")),I(),await Promise.all([oe(),K()])}catch(Q){b(`Error: ${Q.message}`,"error")}}))}})}function dt(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let te=[],se=null;async function ct(e,s){var a,i;se=s;const t=["Administrator","Manager","Coach"].includes(se==null?void 0:se.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Weekly Inspections</h2>
        <div class="small text-muted">Safety Audits, Protective Gear Inspections & Evidence Records</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-light-custom" id="btn-print-inspections">
          <i class="bi bi-printer me-1"></i>Print Audit Log
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-new-inspection">
            <i class="bi bi-shield-plus me-1"></i>Log Inspection Check
          </button>
        `:""}
      </div>
    </div>

    <!-- Inspections Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-shield-check me-2 text-danger"></i>Weekly Inspection Log & Evidence
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="inspections-table">
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Asset / Equipment</th>
                <th>Inspector</th>
                <th>Condition Evaluated</th>
                <th>Notes / Corrective Action</th>
                <th>Photo Evidence</th>
              </tr>
            </thead>
            <tbody id="inspections-tbody">
              <tr>
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await De(),(a=document.getElementById("btn-print-inspections"))==null||a.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-new-inspection"))==null||i.addEventListener("click",rt))}async function De(){const e=document.getElementById("inspections-tbody");try{if(te=(await y.get("/api/inspections")).inspections,!te||te.length===0){e.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No inspection records logged yet. Click "Log Inspection Check" to conduct a weekly gear check.
          </td>
        </tr>
      `;return}e.innerHTML=te.map(t=>{const a=t.equipment||{},i=t.condition==="Good"?"badge bg-success":t.condition==="Fair"?"badge bg-info text-dark":t.condition==="Inspect"?"badge bg-warning text-dark":t.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",n=t.photo?`
        <a href="/api/uploads/${t.photo}" target="_blank" class="btn btn-sm btn-light-custom py-0 px-2" style="font-size: 11px;">
          <i class="bi bi-image me-1"></i>View Evidence
        </a>
      `:'<span class="text-muted small">No photo</span>';return`
        <tr>
          <td class="fw-bold">${t.date}</td>
          <td>
            <div class="fw-bold text-main">${a.name||"Unknown Item"}</div>
            <div class="small font-monospace text-muted">${a.assetId||""} (${a.category||""})</div>
          </td>
          <td>${t.inspector}</td>
          <td><span class="${i}">${t.condition}</span></td>
          <td class="small">
            <div>${t.notes||"Routine check completed."}</div>
            ${t.correctiveAction?`<div class="text-danger mt-1"><strong>Action:</strong> ${t.correctiveAction}</div>`:""}
          </td>
          <td>${n}</td>
        </tr>
      `}).join("")}catch(s){e.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${s.message}</td></tr>`}}async function rt(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
    <form id="inspection-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Asset / Equipment *</label>
          <select id="ins-equipmentId" class="form-select-custom" required>
            <option value="">Select equipment to inspect...</option>
            ${e.map(t=>`
              <option value="${t.id}">
                ${t.assetId} — ${t.name} (${t.condition})
              </option>
            `).join("")}
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Inspection Date *</label>
          <input type="date" id="ins-date" class="form-control-custom" value="${new Date().toISOString().split("T")[0]}" required>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Condition Evaluated *</label>
          <select id="ins-condition" class="form-select-custom" required>
            <option value="Good">Good (Safe for training & matches)</option>
            <option value="Fair">Fair (Operational with minor wear)</option>
            <option value="Inspect">Inspect (Requires further testing)</option>
            <option value="Damaged">Damaged (Unsafe - remove from play)</option>
            <option value="Retired">Retired</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Upload Evidence Photo (optional)</label>
          <input type="file" id="ins-photo" class="form-control-custom" accept="image/*">
        </div>

        <div class="col-12">
          <label class="form-label-custom">Inspection Observations / Notes</label>
          <textarea id="ins-notes" class="form-control-custom" rows="2" placeholder="Wear patterns, strap integrity, helmet shell check..."></textarea>
        </div>

        <div class="col-12">
          <label class="form-label-custom">Corrective Action Taken or Recommended</label>
          <input type="text" id="ins-action" class="form-control-custom" placeholder="e.g. Cleaned and returned to kit bag, or quarantined for repair">
        </div>

        <div class="col-12">
          <div class="p-2 rounded bg-light border small text-muted">
            <i class="bi bi-info-circle me-1"></i>Logging an inspection updates the equipment condition and last inspection date while retaining full history. An inspection does not alter stock quantity.
          </div>
        </div>
      </div>
    </form>
  `;C({title:"Conduct Weekly Gear Inspection",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-inspection">Save Inspection</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-inspection"))==null||a.addEventListener("click",async()=>{var u,g,p,v,h,f;const i=(u=document.getElementById("ins-equipmentId"))==null?void 0:u.value,n=(g=document.getElementById("ins-date"))==null?void 0:g.value,m=(p=document.getElementById("ins-condition"))==null?void 0:p.value,l=(v=document.getElementById("ins-notes"))==null?void 0:v.value,o=(h=document.getElementById("ins-action"))==null?void 0:h.value,r=(f=document.getElementById("ins-photo"))==null?void 0:f.files[0];if(!i||!n||!m){b("Equipment, date, and condition are required.","error");return}const d=new FormData;d.append("equipmentId",i),d.append("date",n),d.append("condition",m),d.append("notes",l),d.append("correctiveAction",o),r&&d.append("evidencePhoto",r);const c=document.getElementById("btn-submit-inspection");c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Saving...';try{await y.upload("/api/inspections",d),b("Weekly inspection logged successfully!","success"),I(),De()}catch($){b(`Error: ${$.message}`,"error")}finally{c.disabled=!1,c.innerHTML="Save Inspection"}})}})}let Z=[],ae=null;async function mt(e,s){var a,i;ae=s;const t=["Administrator","Manager","Coach"].includes(ae==null?void 0:ae.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Damage Reports</h2>
        <div class="small text-muted">Incident Logging, Equipment Safety Hazards & Follow-up Actions</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-light-custom" id="btn-print-damage">
          <i class="bi bi-printer me-1"></i>Print Report
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-file-damage">
            <i class="bi bi-exclamation-triangle me-1"></i>Report Damaged Asset
          </button>
        `:""}
      </div>
    </div>

    <!-- Damage Reports Table Card -->
    <div class="card-custom">
      <div class="card-header-clean">
        <h3 class="card-title-clean">
          <i class="bi bi-exclamation-octagon me-2 text-danger"></i>Damage Incidents Register
        </h3>
      </div>
      <div class="p-0">
        <div class="table-responsive">
          <table class="table-custom" id="damage-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset / Equipment</th>
                <th>Severity</th>
                <th>Incident Details</th>
                <th>Reporter</th>
                <th>Follow-up Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="damage-tbody">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,await ue(),(a=document.getElementById("btn-print-damage"))==null||a.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-file-damage"))==null||i.addEventListener("click",ut))}async function ue(){const e=document.getElementById("damage-tbody");try{if(Z=(await y.get("/api/damage-reports")).reports,!Z||Z.length===0){e.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No active damage incidents recorded. All club assets operational.
          </td>
        </tr>
      `;return}e.innerHTML=Z.map(t=>{const a=t.equipment||{},i=t.severity==="Unsafe"?"badge bg-danger":t.severity==="High"?"badge bg-warning text-dark":t.severity==="Medium"?"badge bg-info text-dark":"badge bg-secondary",n=t.status==="Open"?"badge bg-danger":t.status==="In progress"?"badge bg-warning text-dark":"badge bg-success",m=t.photo?`
        <a href="/api/uploads/${t.photo}" target="_blank" class="small text-decoration-none text-danger d-inline-block mt-1">
          <i class="bi bi-image me-1"></i>Incident Photo
        </a>
      `:"";return`
        <tr>
          <td class="fw-bold">${t.date}</td>
          <td>
            <div class="fw-bold text-main">${a.name||"Equipment"}</div>
            <div class="small font-monospace text-muted">${a.assetId||""}</div>
          </td>
          <td><span class="${i}">${t.severity}</span></td>
          <td class="small" style="max-width: 300px;">
            <div class="fw-bold">${t.incidentDetails}</div>
            ${t.correctiveAction?`<div class="text-muted mt-1">Action: ${t.correctiveAction}</div>`:""}
            ${m}
          </td>
          <td>${t.reporter}</td>
          <td>
            <span class="${n}">${t.status}</span>
            ${t.followUps&&t.followUps.length>0?`<div class="small text-muted mt-1">${t.followUps.length} follow-up(s)</div>`:""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-2 btn-followup-damage" data-report-id="${t._id}">
              Follow-up &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-followup-damage").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-report-id");pt(a)})})}catch(s){e.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${s.message}</td></tr>`}}async function ut(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
    <form id="damage-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label-custom">Damaged Equipment *</label>
          <select id="dmg-equipmentId" class="form-select-custom" required>
            <option value="">Select equipment...</option>
            ${e.map(t=>`
              <option value="${t.id}">${t.assetId} — ${t.name} (${t.location})</option>
            `).join("")}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Incident Date *</label>
          <input type="date" id="dmg-date" class="form-control-custom" value="${new Date().toISOString().split("T")[0]}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Severity Level *</label>
          <select id="dmg-severity" class="form-select-custom" required>
            <option value="Low">Low (Cosmetic wear, operational)</option>
            <option value="Medium" selected>Medium (Impaired functionality)</option>
            <option value="High">High (Severe structural defect)</option>
            <option value="Unsafe">Unsafe (Hazardous - mandatory decommission)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Incident Evidence Photo (optional)</label>
          <input type="file" id="dmg-photo" class="form-control-custom" accept="image/*">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Incident Details *</label>
          <textarea id="dmg-details" class="form-control-custom" rows="2" placeholder="Describe how damage occurred, affected components, broken seams..." required></textarea>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Corrective Action Taken</label>
          <input type="text" id="dmg-action" class="form-control-custom" placeholder="e.g. Quarantined in Clubhouse back room, sent to supplier for repair">
        </div>
      </div>
    </form>
  `;C({title:"File Equipment Damage Report",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-damage">File Report</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-damage"))==null||a.addEventListener("click",async()=>{var u,g,p,v,h,f;const i=(u=document.getElementById("dmg-equipmentId"))==null?void 0:u.value,n=(g=document.getElementById("dmg-date"))==null?void 0:g.value,m=(p=document.getElementById("dmg-severity"))==null?void 0:p.value,l=(v=document.getElementById("dmg-details"))==null?void 0:v.value,o=(h=document.getElementById("dmg-action"))==null?void 0:h.value,r=(f=document.getElementById("dmg-photo"))==null?void 0:f.files[0];if(!i||!n||!l){b("Equipment, date, and incident details are required.","error");return}const d=new FormData;d.append("equipmentId",i),d.append("date",n),d.append("severity",m),d.append("incidentDetails",l),d.append("correctiveAction",o),r&&d.append("incidentPhoto",r);const c=document.getElementById("btn-submit-damage");c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Filing...';try{await y.upload("/api/damage-reports",d),b("Damage report filed and asset condition updated.","success"),I(),ue()}catch($){b(`Error: ${$.message}`,"error")}finally{c.disabled=!1,c.innerHTML="File Report"}})}})}function pt(e){var a,i;const s=Z.find(n=>n._id===e);if(!s)return;const t=`
    <div>
      <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
        <div class="fw-bold text-main fs-6">${((a=s.equipment)==null?void 0:a.name)||"Asset"} (${((i=s.equipment)==null?void 0:i.assetId)||""})</div>
        <div class="small text-danger fw-bold mt-1">Severity: ${s.severity} &bull; Filed by ${s.reporter} on ${s.date}</div>
        <div class="small text-muted mt-2">${s.incidentDetails}</div>
      </div>

      <div class="mb-3">
        <div class="stat-label mb-2">Follow-up History</div>
        ${s.followUps&&s.followUps.length>0?`
          <ul class="list-group list-group-flush small mb-3">
            ${s.followUps.map(n=>`
              <li class="list-group-item bg-transparent px-0 py-2 border-bottom">
                <div class="d-flex justify-content-between text-muted" style="font-size: 11px;">
                  <span>${n.date} &bull; ${n.author}</span>
                </div>
                <div class="fw-bold text-main mt-1">${n.note}</div>
              </li>
            `).join("")}
          </ul>
        `:`
          <div class="text-muted small mb-3">No follow-ups recorded yet.</div>
        `}
      </div>

      <div class="row g-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
        <div class="col-md-6">
          <label class="form-label-custom">Update Report Status</label>
          <select id="fu-status" class="form-select-custom">
            <option value="Open" ${s.status==="Open"?"selected":""}>Open</option>
            <option value="In progress" ${s.status==="In progress"?"selected":""}>In progress</option>
            <option value="Resolved" ${s.status==="Resolved"?"selected":""}>Resolved</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Add Follow-up Note / Repair Action Taken</label>
          <textarea id="fu-note" class="form-control-custom" rows="2" placeholder="Replacement latch received, sent to technician, or tested..."></textarea>
        </div>
        <div class="col-12">
          <div class="small text-muted">
            <i class="bi bi-shield-exclamation me-1 text-warning"></i><strong>Important Rule:</strong> Resolving a damage report records completion of administrative follow-up, but does NOT automatically certify equipment safe. Equipment must undergo a formal weekly inspection before returning to active play.
          </div>
        </div>
      </div>
    </div>
  `;C({title:"Damage Incident Follow-up",contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-save-follow-up">Save Follow-up</button>
    `,onOpen:n=>{var m;(m=document.getElementById("btn-save-follow-up"))==null||m.addEventListener("click",async()=>{var r,d;const l=(r=document.getElementById("fu-status"))==null?void 0:r.value,o=(d=document.getElementById("fu-note"))==null?void 0:d.value;if(!o&&!l){b("Please enter a note or status change.","error");return}try{await y.post(`/api/damage-reports/${s._id}/follow-up`,{status:l,note:o}),b("Follow-up record saved.","success"),I(),ue()}catch(c){b(`Error: ${c.message}`,"error")}})}})}let L=null,T=null;async function bt(e,s){var a,i,n,m;T=s;const t=["Administrator","Manager","Coach"].includes(T==null?void 0:T.role);e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Tasks & AI Operations Assistant</h2>
        <div class="small text-muted">Operations Kanban Board & Automated Operational Diagnostics</div>
      </div>

      <div class="d-flex flex-wrap align-items-center gap-2">
        <button class="btn btn-outline-burgundy" id="btn-suggest-actions">
          <i class="bi bi-robot me-1"></i>Suggest Management Actions
        </button>
        <button class="btn btn-outline-burgundy" id="btn-export-tasks-csv">
          <i class="bi bi-file-earmark-spreadsheet me-1"></i>Export CSV
        </button>
        <button class="btn btn-light-custom" id="btn-print-tasks">
          <i class="bi bi-printer me-1"></i>Print Board
        </button>
        ${t?`
          <button class="btn btn-burgundy" id="btn-create-task">
            <i class="bi bi-plus-lg me-1"></i>Create Task
          </button>
        `:""}
      </div>
    </div>

    <!-- Kanban Board Container -->
    <div class="kanban-board" id="kanban-columns-container">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
      </div>
    </div>
  `,await pe(),(a=document.getElementById("btn-suggest-actions"))==null||a.addEventListener("click",vt),(i=document.getElementById("btn-export-tasks-csv"))==null||i.addEventListener("click",()=>{window.location.href="/api/reports/tasks/csv"}),(n=document.getElementById("btn-print-tasks"))==null||n.addEventListener("click",()=>{window.print()}),t&&((m=document.getElementById("btn-create-task"))==null||m.addEventListener("click",()=>Ne(null)))}async function pe(){const e=document.getElementById("kanban-columns-container");try{L=(await y.get("/api/tasks")).board;const t=[{key:"todo",label:"To do",count:L.counts.todo,items:L.todo},{key:"inProgress",label:"In progress",count:L.counts.inProgress,items:L.inProgress},{key:"blocked",label:"Blocked",count:L.counts.blocked,items:L.blocked},{key:"done",label:"Done",count:L.counts.done,items:L.done}];e.innerHTML=t.map(a=>`
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span class="stat-label text-main">${a.label}</span>
          <span class="badge rounded-pill bg-light text-dark border px-2 py-1" style="font-size: 11px;">${a.count}</span>
        </div>

        <div class="kanban-column-body flex-1" style="min-height: 200px;">
          ${a.items.map(i=>{const n=i.priority==="Critical"?"badge bg-danger":i.priority==="High"?"badge bg-warning text-dark":i.priority==="Medium"?"badge bg-info text-dark":"badge bg-secondary";return`
              <div class="kanban-task-card" data-task-id="${i._id}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="${n}" style="font-size: 9.5px;">${i.priority}</span>
                  <span class="badge-role" style="font-size: 9px;">${i.category}</span>
                </div>
                <div class="fw-bold text-main mb-1" style="font-size: 13px;">${i.title}</div>
                ${i.details?`<div class="small text-muted mb-2 text-truncate">${i.details}</div>`:""}
                <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-2 small text-muted" style="border-color: var(--border-color) !important; font-size: 11px;">
                  <span><i class="bi bi-person me-1"></i>${i.owner}</span>
                  <span><i class="bi bi-clock me-1"></i>${i.dueDate||"No due date"}</span>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-sm btn-light-custom py-0 px-2 btn-edit-task" data-task-id="${i._id}" style="font-size: 11px;">
                    <i class="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `).join(""),document.querySelectorAll(".btn-edit-task").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-task-id"),m=[...L.todo,...L.inProgress,...L.blocked,...L.done].find(l=>l._id===i);Ne(m)})})}catch(s){e.innerHTML=`<div class="alert alert-danger col-12">${s.message}</div>`}}async function vt(){C({title:"Suggest Management Actions (AI & Rule Engine)",contentHtml:`
    <div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="stat-label text-gold"><i class="bi bi-magic me-1"></i>Operational Health Diagnostic</span>
        <span class="badge bg-light text-dark border small" id="ai-source-badge">Scanning club records...</span>
      </div>

      <div class="small text-muted mb-3">
        The operations scanner reviews physical inventory status, safety damages, upcoming fixture readiness, and session attendance completion.
        Tasks are only added to your board when you explicitly click <strong>+ Add</strong>.
      </div>

      <div id="ai-suggestions-list">
        <div class="text-center py-4">
          <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
          <div class="small text-muted mt-2">Analyzing club operational status...</div>
        </div>
      </div>
    </div>
  `,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:async s=>{try{const t=await y.get("/api/tasks/suggestions"),a=document.getElementById("ai-source-badge");a&&(a.textContent=t.source);const i=document.getElementById("ai-suggestions-list");if(!t.suggestions||t.suggestions.length===0){i.innerHTML='<div class="text-muted text-center py-4">No urgent operational bottlenecks detected. All records are up to date!</div>';return}i.innerHTML=t.suggestions.map((n,m)=>{const l=n.priority==="Critical"?"badge bg-danger":n.priority==="High"?"badge bg-warning text-dark":"badge bg-info text-dark";return`
            <div class="card-custom p-3 mb-2" id="sug-card-${m}">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="${l}" style="font-size: 10px;">${n.priority}</span>
                <span class="badge-role" style="font-size: 9.5px;">${n.category||"Operations"}</span>
              </div>
              <div class="fw-bold text-main mb-1" style="font-size: 13.5px;">${n.title}</div>
              <p class="small text-muted mb-3" style="line-height: 1.4;">${n.explanation}</p>
              <div class="text-end">
                <button type="button" class="btn btn-sm btn-burgundy py-1 px-3 btn-add-sug-task" data-sug-index="${m}">
                  <i class="bi bi-plus-lg me-1"></i>+ Add
                </button>
              </div>
            </div>
          `}).join(""),i.querySelectorAll(".btn-add-sug-task").forEach(n=>{n.addEventListener("click",async()=>{const m=parseInt(n.getAttribute("data-sug-index"),10),l=t.suggestions[m];n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Adding...';try{await y.post("/api/tasks",{title:l.title,details:l.explanation,category:l.category||"Operations",priority:l.priority||"Medium",status:"To do",source:t.source.includes("AI")?"AI Assistant":"Rule Engine"}),b(`Task "${l.title}" added to Kanban board.`,"success"),n.className="btn btn-sm btn-success py-1 px-3",n.innerHTML='<i class="bi bi-check2"></i> Added',pe()}catch(o){b(`Error: ${o.message}`,"error"),n.disabled=!1,n.innerHTML="+ Add"}})})}catch(t){document.getElementById("ai-suggestions-list").innerHTML=`<div class="alert alert-danger">${t.message}</div>`}}})}function Ne(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(T==null?void 0:T.role),a=`
    <form id="task-dialog-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Task Title *</label>
          <input type="text" id="t-title" class="form-control-custom" placeholder="e.g. Replenish sterile adhesive plasters" value="${(e==null?void 0:e.title)||""}" required ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Category</label>
          <select id="t-category" class="form-select-custom" ${t?"":"disabled"}>
            <option value="Operations" ${(e==null?void 0:e.category)==="Operations"?"selected":""}>Operations</option>
            <option value="Match Prep" ${(e==null?void 0:e.category)==="Match Prep"?"selected":""}>Match Prep</option>
            <option value="Inventory" ${(e==null?void 0:e.category)==="Inventory"?"selected":""}>Inventory</option>
            <option value="Medical/Safety" ${(e==null?void 0:e.category)==="Medical/Safety"?"selected":""}>Medical/Safety</option>
            <option value="Administration" ${(e==null?void 0:e.category)==="Administration"?"selected":""}>Administration</option>
            <option value="General" ${(e==null?void 0:e.category)==="General"?"selected":""}>General</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Priority Level</label>
          <select id="t-priority" class="form-select-custom" ${t?"":"disabled"}>
            <option value="Low" ${(e==null?void 0:e.priority)==="Low"?"selected":""}>Low</option>
            <option value="Medium" ${!e||(e==null?void 0:e.priority)==="Medium"?"selected":""}>Medium</option>
            <option value="High" ${(e==null?void 0:e.priority)==="High"?"selected":""}>High</option>
            <option value="Critical" ${(e==null?void 0:e.priority)==="Critical"?"selected":""}>Critical</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Kanban Status Column</label>
          <select id="t-status" class="form-select-custom" ${t?"":"disabled"}>
            <option value="To do" ${!e||(e==null?void 0:e.status)==="To do"?"selected":""}>To do</option>
            <option value="In progress" ${(e==null?void 0:e.status)==="In progress"?"selected":""}>In progress</option>
            <option value="Blocked" ${(e==null?void 0:e.status)==="Blocked"?"selected":""}>Blocked</option>
            <option value="Done" ${(e==null?void 0:e.status)==="Done"?"selected":""}>Done</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Owner / Assigned Official</label>
          <input type="text" id="t-owner" class="form-control-custom" value="${(e==null?void 0:e.owner)||(T==null?void 0:T.name)||"Unassigned"}" ${t?"":"disabled"}>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Target Deadline</label>
          <input type="date" id="t-dueDate" class="form-control-custom" value="${(e==null?void 0:e.dueDate)||""}" ${t?"":"disabled"}>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Action Details</label>
          <textarea id="t-details" class="form-control-custom" rows="3" placeholder="Actionable steps, supplier details, equipment IDs..." ${t?"":"disabled"}>${(e==null?void 0:e.details)||""}</textarea>
        </div>
      </div>
    </form>
  `;C({title:s?`Edit Task: ${e.title}`:"Create Operational Task",contentHtml:a,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:i=>{var n;t&&((n=document.getElementById("modal-btn-save"))==null||n.addEventListener("click",async()=>{var p,v,h,f,$,w,B;const m=(p=document.getElementById("t-title"))==null?void 0:p.value,l=(v=document.getElementById("t-category"))==null?void 0:v.value,o=(h=document.getElementById("t-priority"))==null?void 0:h.value,r=(f=document.getElementById("t-status"))==null?void 0:f.value,d=($=document.getElementById("t-owner"))==null?void 0:$.value,c=(w=document.getElementById("t-dueDate"))==null?void 0:w.value,u=(B=document.getElementById("t-details"))==null?void 0:B.value;if(!m||!m.trim()){b("Task title is required.","error");return}const g={title:m,category:l,priority:o,status:r,owner:d,dueDate:c,details:u};try{s?(await y.put(`/api/tasks/${e._id}`,g),b("Task updated successfully.","success")):(await y.post("/api/tasks",g),b(`Task "${m}" created.`,"success")),I(),pe()}catch(S){b(`Error: ${S.message}`,"error")}}))}})}async function gt(e){e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Reports & Exports</h2>
        <div class="small text-muted">Official Club Registers, Season Records, CSV Exports & Printable Documents</div>
      </div>
    </div>

    <!-- 6 Report Cards Grid -->
    <div class="row g-4">
      <!-- 1. 2027 Player Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-person-lines-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">2027 Player Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Complete official squad roster including corporate entities, technical cricket roles, batting hands, and verified match tallies. Privileged fields included for authorized management.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/players/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="players">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Attendance Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-calendar-check-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Attendance Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Session-by-session training and match attendance history, completed roll calls, marked counts, and calculated season attendance percentages.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/attendance/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="attendance">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 3. MCA Match History -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-trophy-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">MCA Match History</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Complete record of 2026/27 MCA league fixtures, opponents, tournament stages, innings scores, results, and scorecard attachment counts.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/matches/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="matches">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Equipment Stock Register -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-box-seam-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Equipment Stock Register</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Inventory audit log of all 58 equipment assets, medical supplies, consumables, physical count verification status, conditions, and minimum target thresholds.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/equipment/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="equipment">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 5. Management Action List -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-kanban-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Management Action List</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Audit register of operational tasks, AI diagnostics recommendations, equipment replenishment orders, assignment deadlines, and Kanban progress.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/reports/tasks/csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="tasks">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>

      <!-- 6. Performance Leaderboard -->
      <div class="col-md-6 col-lg-4">
        <div class="card-custom h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="brand-crest mb-3" style="width: 44px; height: 44px;">
              <i class="bi bi-bar-chart-fill text-gold fs-5"></i>
            </div>
            <h4 class="fw-bold text-main fs-6 mb-2">Performance Leaderboard</h4>
            <p class="small text-muted mb-4" style="line-height: 1.5;">
              Verified season statistics including batting strike rates, averages, bowling economy, wickets, and club-rule fielding points tallies.
            </p>
          </div>
          <div class="d-flex gap-2">
            <a href="/api/leaderboards/export-csv" class="btn btn-outline-burgundy btn-sm flex-fill justify-content-center">
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>Download CSV
            </a>
            <button class="btn btn-light-custom btn-sm flex-fill btn-print-report" data-report-type="leaderboards">
              <i class="bi bi-printer me-1"></i>Print / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  `,document.querySelectorAll(".btn-print-report").forEach(s=>{s.addEventListener("click",()=>{const t=s.getAttribute("data-report-type");window.location.hash=`#/${t}`,setTimeout(()=>window.print(),500)})})}let k=null;async function ft(e,s){var i,n,m;k=s;const t=(k==null?void 0:k.role)==="Administrator",a=document.documentElement.getAttribute("data-theme")||"light";e.innerHTML=`
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="page-title mb-1">Settings & User Administration</h2>
        <div class="small text-muted">System Configuration, Security Credentials & Role-Based Access Control</div>
      </div>

      ${t?`
        <button class="btn btn-burgundy" id="btn-create-user-modal">
          <i class="bi bi-person-plus-fill me-1"></i>Provision User Account
        </button>
      `:""}
    </div>

    <div class="row g-4">
      <!-- Left Column: User Profile & Security -->
      <div class="col-lg-6">
        <!-- Profile Card -->
        <div class="card-custom p-4 mb-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-person-badge text-danger me-2"></i>Signed-in Personnel Profile
          </h5>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${k!=null&&k.name?k.name.split(" ").map(l=>l[0]).join("").slice(0,2).toUpperCase():"AC"}
            </div>
            <div>
              <div class="fw-bold fs-6 text-main">${(k==null?void 0:k.name)||"Administrator"}</div>
              <div class="small text-muted">${(k==null?void 0:k.email)||"admin@akbarcricket.lk"}</div>
              <span class="badge bg-danger mt-1">${(k==null?void 0:k.role)||"Administrator"}</span>
            </div>
          </div>

          <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
            <div class="stat-label mb-1">Last Workspace Session</div>
            <div class="small text-muted">${k!=null&&k.lastLogin?new Date(k.lastLogin).toLocaleString():"Active session"}</div>
          </div>

          <!-- Change Password Form -->
          <h6 class="stat-label text-gold mb-2 mt-4">Update Workspace Password</h6>
          <form id="change-password-form">
            <div class="mb-2">
              <label class="form-label-custom">Current Password</label>
              <input type="password" id="pw-current" class="form-control-custom" placeholder="••••••••••••" required>
            </div>
            <div class="mb-3">
              <label class="form-label-custom">New Password (minimum 8 characters)</label>
              <input type="password" id="pw-new" class="form-control-custom" placeholder="••••••••••••" required>
            </div>
            <button type="submit" class="btn btn-outline-burgundy btn-sm" id="btn-submit-change-password">
              Update Password
            </button>
          </form>
        </div>

        <!-- Appearance & Environment -->
        <div class="card-custom p-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-palette text-danger me-2"></i>Workspace Appearance & Environment
          </h5>
          <div class="d-flex justify-content-between align-items-center py-2 border-bottom" style="border-color: var(--border-color) !important;">
            <div>
              <div class="fw-bold text-main" style="font-size: 13px;">Interface Theme</div>
              <div class="small text-muted">Switch between Corporate Navy Light and Dark modes</div>
            </div>
            <div class="form-check form-switch fs-5">
              <input class="form-check-input" type="checkbox" id="settings-theme-switch" ${a==="dark"?"checked":""}>
            </div>
          </div>

          <div class="mt-3">
            <div class="stat-label mb-1">Database Connectivity & Storage</div>
            <div class="small text-muted">
              Connected Engine: <strong class="text-main">MongoDB (Mongoose ODM)</strong><br>
              Field Encryption: <strong class="text-main">AES-256-GCM (National Identity Cards)</strong><br>
              Uploads Directory: <strong class="text-main">/uploads (Protected stream delivery)</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: RBAC Descriptions & Provisioned Accounts -->
      <div class="col-lg-6">
        <!-- RBAC Role Capabilities Guide -->
        <div class="card-custom p-4 mb-4">
          <h5 class="fw-bold text-main fs-6 mb-3">
            <i class="bi bi-shield-shaded text-gold me-2"></i>Role-Based Access Matrix
          </h5>
          <ul class="list-group list-group-flush small">
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-danger me-2">Administrator</span>
              <div class="text-muted mt-1">
                Full system control, confidential employment records, user account provisioning, system settings, and record deletion.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-warning text-dark me-2">Manager</span>
              <div class="text-muted mt-1">
                Access to confidential player records, squad CSV imports, match score verification, and club operations.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
              <span class="badge bg-info text-dark me-2">Coach</span>
              <div class="text-muted mt-1">
                Access to technical cricket details, attendance roll calls, match lineups, gear inspections, and task boards. Private HR/contact fields strictly redacted.
              </div>
            </li>
            <li class="list-group-item bg-transparent px-0 py-2">
              <span class="badge bg-secondary me-2">Viewer</span>
              <div class="text-muted mt-1">
                Read-only operational access to squad cards, leaderboards, match fixtures, and public reports.
              </div>
            </li>
          </ul>
        </div>

        <!-- System User List (Administrator Only) -->
        ${t?`
          <div class="card-custom p-4">
            <h5 class="fw-bold text-main fs-6 mb-3">
              <i class="bi bi-people-fill text-danger me-2"></i>Provisioned System Accounts
            </h5>
            <div id="users-list-container">
              <div class="spinner-border text-danger spinner-border-sm" role="status"></div>
            </div>
          </div>
        `:""}
      </div>
    </div>
  `,(i=document.getElementById("change-password-form"))==null||i.addEventListener("submit",async l=>{var d,c;l.preventDefault();const o=(d=document.getElementById("pw-current"))==null?void 0:d.value,r=(c=document.getElementById("pw-new"))==null?void 0:c.value;try{await y.put("/api/auth/change-password",{currentPassword:o,newPassword:r}),b("Password updated successfully.","success"),document.getElementById("change-password-form").reset()}catch(u){b(`Password update failed: ${u.message}`,"error")}}),(n=document.getElementById("settings-theme-switch"))==null||n.addEventListener("change",l=>{const r=l.target.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),localStorage.setItem("acc_theme",r),b(`Switched to ${r} mode.`,"info")}),t&&(Oe(),(m=document.getElementById("btn-create-user-modal"))==null||m.addEventListener("click",yt))}async function Oe(){const e=document.getElementById("users-list-container");if(e)try{const t=(await y.get("/api/users")).users||[];e.innerHTML=`
      <ul class="list-group list-group-flush small">
        ${t.map(a=>`
          <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
            <div>
              <div class="fw-bold text-main">${a.name}</div>
              <div class="text-muted" style="font-size: 11px;">${a.email}</div>
            </div>
            <span class="badge ${a.role==="Administrator"?"bg-danger":a.role==="Manager"?"bg-warning text-dark":"badge-role"}">
              ${a.role}
            </span>
          </li>
        `).join("")}
      </ul>
    `}catch(s){e.innerHTML=`<div class="text-danger small">${s.message}</div>`}}function yt(){C({title:"Provision New User Account",contentHtml:`
    <form id="create-user-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="u-name" class="form-control-custom" placeholder="e.g. Aslam Rizvi" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Work Email *</label>
          <input type="email" id="u-email" class="form-control-custom" placeholder="e.g. aslam.r@akbar.com" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Account Role *</label>
          <select id="u-role" class="form-select-custom" required>
            <option value="Viewer">Viewer (Read-only operational)</option>
            <option value="Coach">Coach (Lineups, attendance, gear)</option>
            <option value="Manager">Manager (Confidential records, imports)</option>
            <option value="Administrator">Administrator (Full security control)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Temporary Password *</label>
          <input type="password" id="u-password" class="form-control-custom" placeholder="Minimum 8 characters" required>
        </div>
      </div>
    </form>
  `,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-create-user">Create Account</button>
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-create-user"))==null||t.addEventListener("click",async()=>{var l,o,r,d;const a=(l=document.getElementById("u-name"))==null?void 0:l.value,i=(o=document.getElementById("u-email"))==null?void 0:o.value,n=(r=document.getElementById("u-role"))==null?void 0:r.value,m=(d=document.getElementById("u-password"))==null?void 0:d.value;if(!a||!i||!m||!n){b("All fields are required.","error");return}if(m.length<8){b("Password must be at least 8 characters.","error");return}try{await y.post("/api/users",{name:a,email:i,role:n,password:m}),b(`Account created for ${a} (${n}).`,"success"),I(),Oe()}catch(c){b(`Failed to create user: ${c.message}`,"error")}})}})}let q=null;const re={"command-centre":{title:"Command Centre",breadcrumb:"Workspace / Operations",render:_e,actionButton:{id:"hdr-action-btn",label:"Explore Matches",icon:"bi-trophy"}},players:{title:"Player Profiles",breadcrumb:"Workspace / Roster",render:Ke,actionButton:null},attendance:{title:"Practice & Attendance",breadcrumb:"Workspace / Training",render:Ue,actionButton:null},matches:{title:"MCA Match Centre",breadcrumb:"Workspace / League Fixtures",render:tt,actionButton:null},leaderboards:{title:"Player Leaderboards",breadcrumb:"Workspace / Performance",render:nt,actionButton:null},inventory:{title:"Gear & Inventory",breadcrumb:"Club Operations / Assets",render:lt,actionButton:null},inspections:{title:"Weekly Inspections",breadcrumb:"Club Operations / Safety",render:ct,actionButton:null},"damage-reports":{title:"Damage Reports",breadcrumb:"Club Operations / Incidents",render:mt,actionButton:null},tasks:{title:"Tasks & AI Assistant",breadcrumb:"Club Operations / Kanban",render:bt,actionButton:null},reports:{title:"Reports & Exports",breadcrumb:"Management / Registers",render:gt,actionButton:null},settings:{title:"Settings & Users",breadcrumb:"Management / Administration",render:ft,actionButton:null}};function ht(){const e=localStorage.getItem("acc_theme")||"light";document.documentElement.setAttribute("data-theme",e)}function xt(){const s=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),localStorage.setItem("acc_theme",s);const t=document.getElementById("theme-toggle-icon");t&&(t.className=s==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars"),b(`Switched to ${s} mode.`,"info")}function be(e="command-centre"){var c,u,g,p;const s=document.getElementById("app"),t=re[e]||re["command-centre"];s.innerHTML=`
    <div id="app-layout">
      <!-- Sidebar -->
      ${We(q,e)}

      <!-- Main Content Area -->
      <div class="app-main-wrapper">
        <!-- Header -->
        ${Ge({title:t.title,breadcrumb:t.breadcrumb,actionButton:t.actionButton})}

        <!-- Active View Body -->
        <main class="app-content-body" id="main-view-container">
          <!-- View will be injected here -->
        </main>

        <!-- Footer -->
        <footer class="app-footer">
          &copy; 2026 Akbar Cricket Club &bull; Management Suite v2.0 &bull; Authorized personnel only
        </footer>
      </div>
    </div>
  `,(c=document.getElementById("header-theme-toggle"))==null||c.addEventListener("click",xt),(u=document.getElementById("header-refresh-btn"))==null||u.addEventListener("click",()=>{He(de()),b("View refreshed.","info")});const a=document.getElementById("app-sidebar"),i=document.getElementById("mobile-backdrop"),n=document.getElementById("mobile-menu-toggle"),m=()=>{a==null||a.classList.add("show-mobile"),i==null||i.classList.add("show")},l=()=>{a==null||a.classList.remove("show-mobile"),i==null||i.classList.remove("show")};n==null||n.addEventListener("click",m),i==null||i.addEventListener("click",l),a==null||a.querySelectorAll(".sidebar-nav-link").forEach(v=>{v.addEventListener("click",l)}),(g=document.getElementById("sidebar-logout-btn"))==null||g.addEventListener("click",async()=>{try{await y.post("/api/auth/logout"),q=null,b("Signed out of workspace.","info"),le(document.getElementById("app"),ie)}catch{q=null,le(document.getElementById("app"),ie)}}),t.actionButton&&((p=document.getElementById(t.actionButton.id))==null||p.addEventListener("click",()=>{window.location.hash="#/matches"}));const o=document.documentElement.getAttribute("data-theme")||"light",r=document.getElementById("theme-toggle-icon");r&&(r.className=o==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars");const d=document.getElementById("main-view-container");t.render(d,q)}function de(){const e=window.location.hash.replace(/^#\/?/,"").split("?")[0];return re[e]?e:"command-centre"}function He(e){q&&be(e)}function ie(e){q=e;const s=de();be(s)}window.addEventListener("auth:expired",()=>{q&&(q=null,b("Your session has expired. Please sign in again.","warning"),le(document.getElementById("app"),ie))});window.addEventListener("hashchange",()=>{q&&He(de())});async function wt(){ht();const e=document.getElementById("app");try{q=(await y.get("/api/auth/me")).user,be(de())}catch{q=null,le(e,ie)}}wt();
