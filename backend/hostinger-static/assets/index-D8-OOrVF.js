(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerPolicy&&(n.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?n.credentials="include":l.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(l){if(l.ep)return;l.ep=!0;const n=t(l);fetch(l.href,n)}})();const y={async request(e,s={}){const t={credentials:"include",headers:{Accept:"application/json",...s.headers},...s};t.body&&!(t.body instanceof FormData)&&typeof t.body=="object"&&(t.headers["Content-Type"]="application/json",t.body=JSON.stringify(t.body));try{const a=await fetch(e,t);a.status===401&&!e.includes("/api/auth/login")&&window.dispatchEvent(new CustomEvent("auth:expired"));const l=a.headers.get("content-type");let n=null;if(l&&l.includes("application/json")?n=await a.json():n=await a.text(),!a.ok){const c=n&&n.message?n.message:`HTTP error ${a.status}`,i=new Error(c);throw i.status=a.status,i.data=n,i}return n}catch(a){throw console.error(`API Error [${e}]:`,a.message),a}},get(e){return this.request(e,{method:"GET"})},post(e,s){return this.request(e,{method:"POST",body:s})},put(e,s){return this.request(e,{method:"PUT",body:s})},delete(e){return this.request(e,{method:"DELETE"})},upload(e,s){return this.request(e,{method:"POST",body:s})}};function Ve(e,s="command-centre"){const t=e!=null&&e.name?e.name.split(" ").map(a=>a[0]).join("").slice(0,2).toUpperCase():"AC";return`
    <aside class="app-sidebar" id="app-sidebar">
      <!-- Brand & Crest -->
      <div class="sidebar-brand-box">
        <div class="brand-crest">
          <span class="brand-crest-gold">ACC</span>
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
  `}function We({title:e,breadcrumb:s="Workspace",actionButton:t=null}){const a=new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});return`
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
  `}function b(e,s="info",t=4e3){const a=document.getElementById("toast-root");if(!a)return;const l="toast-"+Date.now()+"-"+Math.floor(Math.random()*1e3);let n="bi-info-circle-fill";s==="success"?n="bi-check-circle-fill":s==="danger"||s==="error"?n="bi-exclamation-triangle-fill":s==="warning"&&(n="bi-exclamation-circle-fill");const i=`
    <div id="${l}" class="toast align-items-center shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="${s==="success"?"background-color: var(--success-green);":s==="danger"||s==="error"?"background-color: var(--burgundy);":s==="warning"?"background-color: var(--warning-amber); color: #fff;":"background-color: #16243a; color: #fff;"} border-radius: 8px;">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2 py-2 px-3" style="font-size: 13px; font-weight: 500;">
          <i class="bi ${n} fs-6"></i>
          <span>${e}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" onclick="document.getElementById('${l}').remove()"></button>
      </div>
    </div>
  `;a.insertAdjacentHTML("beforeend",i);const o=document.getElementById(l);setTimeout(()=>{o&&o.parentNode&&(o.classList.add("fade"),setTimeout(()=>o.remove(),250))},t)}function ne(e,s){e.innerHTML=`
    <div class="login-split-page">
      <!-- Left Branding Panel (53% width on desktop) -->
      <div class="login-brand-panel">
        <div class="login-top-strip"></div>
        <div class="login-circles-decor"></div>

        <div>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="brand-crest mb-0" style="width: 50px; height: 50px;">
              <span class="brand-crest-gold fs-4">ACC</span>
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
  `;const t=document.getElementById("login-form"),a=document.getElementById("login-error-alert"),l=document.getElementById("login-error-text"),n=document.getElementById("login-submit-btn");t.addEventListener("submit",async c=>{c.preventDefault(),a.classList.add("d-none"),n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...';const i=document.getElementById("login-email").value,o=document.getElementById("login-password").value;try{const r=await y.post("/api/auth/login",{email:i,password:o});b(`Welcome back, ${r.user.name}!`,"success"),typeof s=="function"&&s(r.user)}catch(r){l.textContent=r.message||"Authentication failed. Please verify your credentials.",a.classList.remove("d-none")}finally{n.disabled=!1,n.innerHTML='<span>Sign in to workspace</span><i class="bi bi-arrow-right ms-1"></i>'}})}async function Ge(e){e.innerHTML=`
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading Command Centre...</span>
      </div>
    </div>
  `;try{const s=await y.get("/api/command-centre"),{stats:t,attentionPanel:a,upcomingFixtures:l,topPerformers:n,recentTasks:c}=s,i=n.bestBatsmen[0],o=n.bestBowlers[0],r=n.bestFielders[0];e.innerHTML=`
      <!-- Wide Navy Gradient Banner -->
      <div class="command-banner">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center position-relative" style="z-index: 2;">
          <div class="d-flex align-items-start gap-3 mb-3 mb-md-0">
            <div class="brand-crest" style="width: 54px; height: 54px; flex-shrink: 0;">
              <span class="brand-crest-gold fs-4">ACC</span>
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
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6">
            <circle cx="50" cy="50" r="45" />
            <text x="50" y="58" font-size="28" font-weight="900" text-anchor="middle" fill="currentColor">ACC</text>
          </svg>
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
              ${l&&l.length>0?`
                <div class="d-flex flex-column gap-2">
                  ${l.map(d=>`
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
            ${i?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${i.name}</div>
              <div class="stat-value text-danger my-1">${i.runs} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">runs</span></div>
              <div class="small text-muted mb-2">${i.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${n.bestBatsmen.map((d,p)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${p+1}. ${d.name}</span>
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
                ${n.bestBowlers.map((d,p)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${p+1}. ${d.name}</span>
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
                ${n.bestFielders.map((d,p)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${p+1}. ${d.name}</span>
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
                ${c&&c.length>0?c.map(d=>{const p=d.priority==="Critical"?"badge bg-danger":d.priority==="High"?"badge bg-warning text-dark":"badge bg-secondary";return`
                    <tr>
                      <td class="fw-bold">${d.title}</td>
                      <td><span class="${p}">${d.priority}</span></td>
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
    `}}let V=null;function A({title:e,contentHtml:s,footerHtml:t,onOpen:a,onClose:l}){var d,p;B();const n=document.getElementById("modal-root");if(!n)return;const c=`
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
  `;n.innerHTML=c;const i=document.getElementById("active-custom-modal"),o=()=>{B(),typeof l=="function"&&l()};(d=document.getElementById("modal-close-x"))==null||d.addEventListener("click",o),(p=document.getElementById("modal-btn-cancel"))==null||p.addEventListener("click",o),i.addEventListener("click",m=>{m.target===i&&o()});const r=m=>{m.key==="Escape"&&(o(),window.removeEventListener("keydown",r))};return window.addEventListener("keydown",r),V={element:i,escHandler:r,onClose:l},typeof a=="function"&&a(i),i}function B(){V&&(window.removeEventListener("keydown",V.escHandler),V.element&&V.element.parentNode&&V.element.remove(),V=null);const e=document.getElementById("modal-root");e&&(e.innerHTML="")}function w(e){return String(e??"").replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}const Ae=["Akbar Brothers (Pvt) Ltd","Quick Tea (Pvt) Ltd","Falcon Trading (Pvt) Ltd","Land and Building (Pvt) Ltd","Ceylon Coffeeworks (Pvt) Ltd","Colombo Coffee Company (Pvt) Ltd","Glowbal Retails (Pvt) Ltd","Coffee Collective (Pvt) Ltd"];let Se=[],C=null;async function _e(e,s){var a,l,n,c,i;C=s;const t=["Administrator","Manager"].includes(s==null?void 0:s.role);["Administrator","Manager","Coach"].includes(s==null?void 0:s.role),e.innerHTML=`
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
      <div class="row g-2 align-items-center">
        <div class="col-md-5">
          <div class="input-group">
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
  `,await W(),(a=document.getElementById("player-search-input"))==null||a.addEventListener("input",Qe(W,300)),(l=document.getElementById("player-company-filter"))==null||l.addEventListener("change",W),(n=document.getElementById("player-role-filter"))==null||n.addEventListener("change",W),t&&((c=document.getElementById("btn-import-squad-csv"))==null||c.addEventListener("click",Xe),(i=document.getElementById("btn-add-player-manual"))==null||i.addEventListener("click",()=>ce(null)))}async function W(){var i,o,r;const e=["Administrator","Manager"].includes(C==null?void 0:C.role),s=["Administrator","Manager","Coach"].includes(C==null?void 0:C.role),t=((i=document.getElementById("player-search-input"))==null?void 0:i.value)||"",a=((o=document.getElementById("player-company-filter"))==null?void 0:o.value)||"All",l=((r=document.getElementById("player-role-filter"))==null?void 0:r.value)||"All",n=document.getElementById("players-grid-container"),c=document.getElementById("player-count-label");try{const d=new URLSearchParams;t&&d.append("search",t),a!=="All"&&d.append("company",a),l!=="All"&&d.append("cricketRole",l);const p=await y.get(`/api/players?${d.toString()}`);if(Se=p.players,c&&(c.textContent=`Displaying ${p.totalCount} active squad members`),!p.players||p.players.length===0){n.innerHTML=`
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-people fs-2 d-block mb-2"></i>
          No squad players match your search or filter criteria.
        </div>
      `;return}n.innerHTML=p.players.map(m=>{const g=m.fullName.split(" ").map(h=>h[0]).join("").slice(0,2).toUpperCase(),u=m.stats||{},v=m.cricketRole==="Batsman"?"badge-batsman":m.cricketRole==="Bowler"?"badge-bowler":m.cricketRole.includes("allrounder")?"badge-allrounder":"badge-role";return`
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card-custom h-100 p-3 d-flex flex-column justify-content-between player-clickable-card" data-player-id="${m._id}" style="cursor: pointer;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="user-avatar-initials" style="width: 40px; height: 40px; font-size: 14px;">
                    ${g}
                  </div>
                  <div>
                    <div class="fw-bold text-main" style="font-size: 13.5px; line-height: 1.2;">${w(m.fullName)}</div>
                    <div class="small text-muted" style="font-size: 11px;">${w(m.company)}</div>
                  </div>
                </div>
                ${m.jerseyNumber!==null&&m.jerseyNumber!==void 0?`
                  <span class="badge border" style="background: rgba(22, 36, 58, 0.05); color: var(--text-main); font-weight: 800; font-size: 12px;">
                    #${m.jerseyNumber}
                  </span>
                `:""}
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge-role ${v}">${m.cricketRole}</span>
                <span class="badge-role" style="font-size: 9.5px;">${m.battingHand}</span>
              </div>
            </div>

            <!-- Season Stats Pill -->
            <div class="p-2 rounded border" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
              <div class="row text-center g-0">
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Matches</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${u.matches||0}</div>
                </div>
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Runs</div>
                  <div class="fw-bold text-danger" style="font-size: 14px;">${u.runs||0}</div>
                </div>
                <div class="col-4">
                  <div class="stat-label" style="font-size: 9.5px;">Wickets</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${u.wickets||0}</div>
                </div>
              </div>
            </div>
            ${s?`
              <div class="d-flex gap-2 mt-3">
                <button type="button" class="btn btn-sm btn-outline-burgundy btn-edit-player" data-player-id="${m._id}">
                  <i class="bi bi-pencil me-1"></i>Edit
                </button>
                ${e?`
                  <button type="button" class="btn btn-sm btn-outline-danger btn-delete-player" data-player-id="${m._id}">
                    <i class="bi bi-trash me-1"></i>Delete
                  </button>
                `:""}
              </div>
            `:""}
          </div>
        </div>
      `}).join(""),document.querySelectorAll(".player-clickable-card").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-player-id");Ke(g)})}),document.querySelectorAll(".btn-edit-player, .btn-delete-player").forEach(m=>{m.addEventListener("click",g=>{g.stopPropagation();const u=Se.find(v=>v._id===m.dataset.playerId);u&&(m.classList.contains("btn-edit-player")?ce(u):Pe(u))})})}catch(d){n.innerHTML=`<div class="col-12 alert alert-danger">${d.message}</div>`}}async function Ke(e){try{const s=await y.get(`/api/players/${e}`),{player:t,assignedEquipment:a,attendanceHistory:l}=s,n=["Administrator","Manager"].includes(C==null?void 0:C.role),c=["Administrator","Manager","Coach"].includes(C==null?void 0:C.role),i=t.stats||{},o=`
      <div class="row g-4">
        <!-- Cricket & Employment Overview -->
        <div class="col-md-6 border-end" style="border-color: var(--border-color) !important;">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${t.fullName.split(" ").map(d=>d[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <h4 class="mb-0 text-main">${w(t.fullName)}</h4>
              <div class="text-muted small">${w(t.company)}</div>
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
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Matches</div><div class="fw-bold text-main">${i.matches||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Runs</div><div class="fw-bold text-danger">${i.runs||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Wickets</div><div class="fw-bold text-main">${i.wickets||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Field Pts</div><div class="fw-bold text-gold">${i.fieldingPoints||0}</div></div></div>
          </div>

          <table class="table table-sm small mb-3">
            <tr><td class="text-muted">Balls Faced:</td><td class="fw-bold">${i.ballsFaced||0}</td><td class="text-muted">Fours / Sixes:</td><td class="fw-bold">${i.fours||0} / ${i.sixes||0}</td></tr>
            <tr><td class="text-muted">Balls Bowled:</td><td class="fw-bold">${i.ballsBowled||0}</td><td class="text-muted">Runs Conceded:</td><td class="fw-bold">${i.runsConceded||0}</td></tr>
            <tr><td class="text-muted">Catches:</td><td class="fw-bold">${i.catches||0}</td><td class="text-muted">Stump / Run-out:</td><td class="fw-bold">${i.stumpings||0} / ${i.runOuts||0}</td></tr>
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
          ${l&&l.length>0?`
            <div class="d-flex flex-column gap-1 small">
              ${l.slice(0,5).map(d=>`
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
      ${c?`
        <button type="button" class="btn btn-burgundy" id="btn-edit-player-profile">
          <i class="bi bi-pencil me-1"></i>Edit Profile
        </button>
      `:""}
    `;A({title:`${w(t.fullName)} — Squad Record`,contentHtml:o,footerHtml:r,onOpen:d=>{var p,m;(p=document.getElementById("btn-delete-player-profile"))==null||p.addEventListener("click",()=>Pe(t)),(m=document.getElementById("btn-edit-player-profile"))==null||m.addEventListener("click",()=>{B(),ce(t)})}})}catch(s){b(`Failed to load player details: ${s.message}`,"error")}}function ce(e=null){var n,c,i;const s=!!e,t=["Administrator","Manager"].includes(C==null?void 0:C.role),a=!!(e!=null&&e.company)&&!Ae.includes(e.company),l=`
    <form id="player-form-dialog">
      <div class="row g-3">
        <!-- 2 Columns on desktop, 1 on mobile -->
        <div class="col-md-6">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="p-fullName" class="form-control-custom" value="${w(e==null?void 0:e.fullName)}" required ${!t&&s?"readonly":""}>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Company *</label>
          <select id="p-company" class="form-select-custom" ${!t&&s?"disabled":""}>
            ${Ae.map(o=>`<option value="${o}" ${(e==null?void 0:e.company)===o?"selected":""}>${o}</option>`).join("")}
            <option value="Other" ${a?"selected":""}>Other</option>
          </select>
          <div id="p-company-other-group" class="mt-2 ${a?"":"d-none"}">
            <label for="p-company-other" class="form-label-custom">Company Name *</label>
            <input type="text" id="p-company-other" class="form-control-custom" placeholder="Enter company name" value="${w(a&&e.company!=="Other"?e.company:"")}" ${!t&&s?"disabled":""}>
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
          <input type="text" id="p-bowlingStyle" class="form-control-custom" placeholder="e.g. Off spin, Fast, Orthodox" value="${w(e==null?void 0:e.bowlingStyle)}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Jersey Number</label>
          <input type="number" id="p-jerseyNumber" class="form-control-custom" placeholder="e.g. 7" value="${(e==null?void 0:e.jerseyNumber)??""}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Technical Notes</label>
          <input type="text" id="p-notes" class="form-control-custom" placeholder="Coaching or matchday notes" value="${w(e==null?void 0:e.notes)}">
        </div>

        ${t?`
          <div class="col-12 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
            <div class="fw-bold text-danger small mb-2"><i class="bi bi-lock-fill me-1"></i>Confidential Employment & Contact Data</div>
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Phone Number</label>
            <input type="text" id="p-phone" class="form-control-custom" value="${w(e==null?void 0:e.phone)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Work Email</label>
            <input type="email" id="p-workEmail" class="form-control-custom" value="${w(e==null?void 0:e.workEmail)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">EPF / Employee Number (Preserves leading 0s)</label>
            <input type="text" id="p-epfNumber" class="form-control-custom" value="${w(e==null?void 0:e.epfNumber)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">National Identity Card (NIC - Encrypted)</label>
            <input type="text" id="p-nic" class="form-control-custom" placeholder="NIC number will be encrypted at rest" value="${w(e==null?void 0:e.nic)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Joining Date</label>
            <input type="date" id="p-joiningDate" class="form-control-custom" value="${w(e==null?void 0:e.joiningDate)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Worksite Location</label>
            <input type="text" id="p-worksite" class="form-control-custom" value="${w(e==null?void 0:e.worksite)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">HOD / Reporting Manager</label>
            <input type="text" id="p-reportingManager" class="form-control-custom" value="${w(e==null?void 0:e.reportingManager)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Name</label>
            <input type="text" id="p-emergencyContactName" class="form-control-custom" value="${w((n=e==null?void 0:e.emergencyContact)==null?void 0:n.name)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Phone</label>
            <input type="text" id="p-emergencyContactPhone" class="form-control-custom" value="${w((c=e==null?void 0:e.emergencyContact)==null?void 0:c.phone)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Relationship</label>
            <input type="text" id="p-emergencyContactRelationship" class="form-control-custom" value="${w((i=e==null?void 0:e.emergencyContact)==null?void 0:i.relationship)}">
          </div>
        `:""}
      </div>
    </form>
  `;A({title:s?`Edit ${w(e.fullName)}`:"Add Squad Member",contentHtml:l,onOpen:o=>{const r=o.querySelector("#p-company"),d=o.querySelector("#p-company-other"),p=()=>{const g=r.value==="Other";o.querySelector("#p-company-other-group").classList.toggle("d-none",!g),d.required=g&&t,d.disabled=!g||!t};r.addEventListener("change",p),p();const m=o.querySelector("#modal-btn-save");m==null||m.addEventListener("click",async()=>{var h,f,$,x,I,S,E,_,R,N,D,O,H,F,j,z,K;const g=(h=document.getElementById("p-fullName"))==null?void 0:h.value;if(!g||!g.trim()){b("Full name is required.","error");return}const u=r.value==="Other"?t?d.value.trim():e.company:r.value;if(t&&!u){b("Please enter the company name.","error"),d.focus();return}if(!o.querySelector("#player-form-dialog").reportValidity())return;const v={fullName:g,company:u,cricketRole:(f=document.getElementById("p-cricketRole"))==null?void 0:f.value,battingHand:($=document.getElementById("p-battingHand"))==null?void 0:$.value,bowlingArm:(x=document.getElementById("p-bowlingArm"))==null?void 0:x.value,bowlingStyle:(I=document.getElementById("p-bowlingStyle"))==null?void 0:I.value,jerseyNumber:(S=document.getElementById("p-jerseyNumber"))==null?void 0:S.value,notes:(E=document.getElementById("p-notes"))==null?void 0:E.value};t&&(v.phone=(_=document.getElementById("p-phone"))==null?void 0:_.value,v.workEmail=(R=document.getElementById("p-workEmail"))==null?void 0:R.value,v.epfNumber=(N=document.getElementById("p-epfNumber"))==null?void 0:N.value,v.nic=(D=document.getElementById("p-nic"))==null?void 0:D.value,v.joiningDate=(O=document.getElementById("p-joiningDate"))==null?void 0:O.value,v.worksite=(H=document.getElementById("p-worksite"))==null?void 0:H.value,v.reportingManager=(F=document.getElementById("p-reportingManager"))==null?void 0:F.value,v.emergencyContact={name:(j=document.getElementById("p-emergencyContactName"))==null?void 0:j.value,phone:(z=document.getElementById("p-emergencyContactPhone"))==null?void 0:z.value,relationship:(K=document.getElementById("p-emergencyContactRelationship"))==null?void 0:K.value}),m.disabled=!0;try{s?(await y.put(`/api/players/${e._id}`,v),b(`Updated profile for ${g}.`,"success")):(await y.post("/api/players",v),b(`Player ${g} registered to 2027 squad.`,"success")),B(),W()}catch(oe){b(`Error: ${oe.message}`,"error")}finally{m.disabled=!1}})}})}function Pe(e){A({title:"Delete Player",contentHtml:`<p>Delete <strong>${w(e.fullName)}</strong> from the active squad?</p>
      <p class="small text-muted mb-0">Existing attendance, match, and equipment records will be retained.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-player">Delete Player</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-player");t.addEventListener("click",async()=>{t.disabled=!0;try{await y.delete(`/api/players/${e._id}`),b(`Player ${e.fullName} removed from the active squad.`,"success"),B(),await W()}catch(a){b(`Failed to delete player: ${a.message}`,"error"),t.disabled=!1}})}})}function Xe(){A({title:"Import Squad Register (CSV)",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-csv-import"))==null||t.addEventListener("click",async()=>{const a=document.getElementById("csv-import-file-input");if(!a||!a.files||a.files.length===0){b("Please select a CSV file to upload.","error");return}const l=new FormData;l.append("csvFile",a.files[0]);const n=document.getElementById("btn-submit-csv-import");n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Processing...';const c=document.getElementById("import-results-box");try{const i=await y.upload("/api/players/import-csv",l);c.className="mt-3 p-3 rounded bg-success bg-opacity-10 border border-success small",c.innerHTML=`
            <div class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i>${i.message}</div>
            <div>New players created: <strong>${i.createdCount}</strong></div>
            <div>Existing players updated: <strong>${i.updatedCount}</strong></div>
            ${i.errors&&i.errors.length>0?`<div class="text-danger mt-1">Warnings: ${i.errors.join("; ")}</div>`:""}
          `,c.classList.remove("d-none"),b("CSV squad import successful!","success"),W()}catch(i){c.className="mt-3 p-3 rounded bg-danger bg-opacity-10 border border-danger small text-danger",c.innerHTML=`<i class="bi bi-exclamation-triangle-fill me-1"></i>${i.message}`,c.classList.remove("d-none"),b(`Import error: ${i.message}`,"error")}finally{n.disabled=!1,n.innerHTML="Start Import"}})}})}function Qe(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let U=[],T=null;async function Je(e,s){var a,l,n,c,i;T=s;const t=["Administrator","Manager","Coach"].includes(T==null?void 0:T.role);e.innerHTML=`
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
      <div class="row g-2 align-items-center">
        <div class="col-md-6">
          <div class="input-group">
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
  `,await Z(),(a=document.getElementById("attendance-search"))==null||a.addEventListener("input",Ye(Z,300)),(l=document.getElementById("attendance-type-filter"))==null||l.addEventListener("change",Z),(n=document.getElementById("btn-export-attendance-csv"))==null||n.addEventListener("click",()=>{window.location.href="/api/reports/attendance/csv"}),(c=document.getElementById("btn-print-attendance"))==null||c.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-create-session"))==null||i.addEventListener("click",()=>Me()))}async function Z(){var l,n;const e=["Administrator","Manager","Coach"].includes(T==null?void 0:T.role),s=((l=document.getElementById("attendance-search"))==null?void 0:l.value)||"",t=((n=document.getElementById("attendance-type-filter"))==null?void 0:n.value)||"All",a=document.getElementById("sessions-tbody");try{const c=new URLSearchParams;if(s&&c.append("search",s),t!=="All"&&c.append("type",t),U=(await y.get(`/api/sessions?${c.toString()}`)).sessions,!U||U.length===0){a.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No training or match sessions found.
          </td>
        </tr>
      `;return}a.innerHTML=U.map(o=>{const r=o.type==="Match"?"badge-bowler":"badge-batsman",d=o.rateDisplay!=="—"?"color: var(--success-green); font-weight: 700;":"color: var(--text-muted);";return`
        <tr>
          <td class="text-nowrap fw-bold">${o.date}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${w(o.title)}</div>
            <div class="small text-muted">${w(o.venue||"No venue specified")}</div>
          </td>
          <td><span class="badge-role ${r}">${o.type}</span></td>
          <td style="${d}; font-size: 14px;">${o.rateDisplay}</td>
          <td><span class="badge-role">${o.completionText}</span></td>
          <td class="text-end">
            ${e?`
              <button type="button" class="btn btn-sm btn-outline-burgundy py-1 px-3 btn-edit-session" data-session-id="${o.id}">
                <i class="bi bi-pencil me-1"></i>Edit Session
              </button>
            `:""}
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-rollcall" data-session-id="${o.id}">
              <i class="bi bi-person-check me-1"></i>Roll Call
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-rollcall").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-session-id");Ue(r)})}),document.querySelectorAll(".btn-edit-session").forEach(o=>{o.addEventListener("click",()=>{const r=U.find(d=>d.id===o.dataset.sessionId);r&&Me(r)})})}catch(c){a.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${c.message}</td></tr>`}}async function Ue(e){try{const s=await y.get(`/api/sessions/${e}`),{session:t,stats:a}=s,l=["Administrator","Manager","Coach"].includes(T==null?void 0:T.role),n=["Not marked","Attended","Late","Absent","Excused"],c=`
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div>
            <h5 class="mb-1 text-main fw-bold">${w(t.title)}</h5>
            <div class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${t.date} &bull; <i class="bi bi-geo-alt me-1"></i>${w(t.venue||"Venue TBD")}</div>
          </div>
          <div class="text-end">
            <div class="stat-label">Current Attendance Rate</div>
            <div class="stat-value" id="modal-attendance-rate" style="color: var(--success-green); font-size: 24px;">
              ${a.rate!==null?a.rate+"%":"—"}
            </div>
            <div class="small text-muted" id="modal-marked-summary">${a.markedCount}/${a.total} players marked</div>
          </div>
        </div>

        ${l?`
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
              ${(t.rollCall||[]).map(i=>{const o=i.player||{};return`
                  <tr data-player-id="${o._id}">
                    <td class="fw-bold text-main">${w(o.fullName||"Unknown")}</td>
                    <td class="small text-muted">${w(o.company||"—")}</td>
                    <td style="width: 170px;">
                      <select class="form-select-custom rollcall-status-select" ${l?"":"disabled"}>
                        ${n.map(r=>`
                          <option value="${r}" ${i.status===r?"selected":""}>${r}</option>
                        `).join("")}
                      </select>
                    </td>
                    <td>
                      <input type="text" class="form-control-custom rollcall-note-input" placeholder="Optional note..." value="${w(i.note)}" ${l?"":"readonly"}>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;A({title:"Session Roll Call",contentHtml:c,footerHtml:`
        <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
        ${l?'<button type="button" class="btn btn-burgundy" id="btn-save-roll-call">Save Roll Call</button>':""}
      `,onOpen:i=>{var r,d;const o=()=>{const p=i.querySelectorAll(".rollcall-status-select");let m=0,g=0,u=0,v=0,h=0;p.forEach(S=>{S.value==="Attended"?m++:S.value==="Late"?g++:S.value==="Absent"?u++:S.value==="Excused"?v++:h++});const f=m+g+u+v,$=f>0?Math.round((m+g)/f*1e3)/10:null,x=document.getElementById("modal-attendance-rate"),I=document.getElementById("modal-marked-summary");x&&(x.textContent=$!==null?`${$}%`:"—"),I&&(I.textContent=`${f}/${p.length} players marked`)};i.querySelectorAll(".rollcall-status-select").forEach(p=>{p.addEventListener("change",o)}),(r=document.getElementById("btn-set-all-attended"))==null||r.addEventListener("click",()=>{i.querySelectorAll(".rollcall-status-select").forEach(p=>{p.value="Attended"}),o(),b("All squad players set to Attended.","info")}),(d=document.getElementById("btn-save-roll-call"))==null||d.addEventListener("click",async()=>{const p=i.querySelectorAll("#rollcall-table-body tr"),m=[];p.forEach(g=>{var f,$;const u=g.getAttribute("data-player-id"),v=((f=g.querySelector(".rollcall-status-select"))==null?void 0:f.value)||"Not marked",h=(($=g.querySelector(".rollcall-note-input"))==null?void 0:$.value)||"";m.push({player:u,status:v,note:h})});try{await y.put(`/api/sessions/${t._id}/roll-call`,{rollCall:m}),b("Roll call saved successfully!","success"),B(),Z()}catch(g){b(`Failed to save roll call: ${g.message}`,"error")}})}})}catch(s){b(`Error: ${s.message}`,"error")}}function Me(e=null){const s=!!e,t=`
    <form id="create-session-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Session Title *</label>
          <input type="text" id="s-title" class="form-control-custom" placeholder="e.g. NCC Indoor Practice - Nets" value="${w(e==null?void 0:e.title)}" required>
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
          <input type="date" id="s-date" class="form-control-custom" value="${w((e==null?void 0:e.date)||new Date().toISOString().split("T")[0])}" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Venue</label>
          <input type="text" id="s-venue" class="form-control-custom" placeholder="e.g. Oval Indoor Nets (MCA SPL)" value="${w(e==null?void 0:e.venue)}">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="s-notes" class="form-control-custom" rows="2" placeholder="Specific training drills, equipment requirements...">${w(e==null?void 0:e.notes)}</textarea>
        </div>
      </div>
    </form>
  `;A({title:s?"Edit Session Details":"Schedule Practice or Match Attendance",contentHtml:t,onOpen:a=>{const l=a.querySelector("#modal-btn-save");l==null||l.addEventListener("click",async()=>{var d,p,m,g,u;const n=(d=document.getElementById("s-title"))==null?void 0:d.value.trim(),c=(p=document.getElementById("s-type"))==null?void 0:p.value,i=(m=document.getElementById("s-date"))==null?void 0:m.value,o=(g=document.getElementById("s-venue"))==null?void 0:g.value,r=(u=document.getElementById("s-notes"))==null?void 0:u.value;if(!n||!i){b("Title and date are required.","error");return}if(a.querySelector("#create-session-form").reportValidity()){l.disabled=!0;try{s?await y.put(`/api/sessions/${e.id}`,{title:n,type:c,date:i,venue:o,notes:r}):await y.post("/api/sessions",{title:n,type:c,date:i,venue:o,notes:r}),b(`Session "${n}" ${s?"updated":"scheduled"}.`,"success"),B(),Z()}catch(v){b(`Error: ${v.message}`,"error")}finally{l.disabled=!1}}})}})}function Ye(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let ee=[],G=null;async function Ze(e,s){var n,c,i,o,r;G=s;const t=["Administrator","Manager","Coach"].includes(G==null?void 0:G.role);e.innerHTML=`
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
  `,await J(),(n=document.getElementById("match-search"))==null||n.addEventListener("input",tt(J,300)),(c=document.getElementById("match-format-filter"))==null||c.addEventListener("change",J),(i=document.getElementById("btn-export-matches-csv"))==null||i.addEventListener("click",()=>{window.location.href="/api/reports/matches/csv"}),(o=document.getElementById("btn-print-matches"))==null||o.addEventListener("click",()=>{window.print()}),t&&((r=document.getElementById("btn-create-fixture"))==null||r.addEventListener("click",et));const l=new URLSearchParams(window.location.hash.split("?")[1]||"").get("id");l&&Te(l)}async function J(){var a,l;const e=((a=document.getElementById("match-search"))==null?void 0:a.value)||"",s=((l=document.getElementById("match-format-filter"))==null?void 0:l.value)||"All",t=document.getElementById("matches-tbody");try{const n=new URLSearchParams;if(e&&n.append("search",e),s!=="All"&&n.append("format",s),ee=(await y.get(`/api/matches?${n.toString()}`)).matches,!ee||ee.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No MCA fixtures logged. Click "Log MCA Fixture" to add scheduled matches.
          </td>
        </tr>
      `;return}t.innerHTML=ee.map(i=>{const o=i.result==="Win"?"badge bg-success":i.result==="Loss"?"badge bg-danger":i.result==="Pending"?"badge bg-warning text-dark":"badge bg-secondary",r=i.ourScore||i.oppositionScore?`<div class="fw-bold">${i.ourScore||"—"}</div><div class="small text-muted">Opp: ${i.oppositionScore||"—"}</div>`:'<span class="text-muted small">Scores pending</span>';return`
        <tr>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">vs ${i.opponent}</div>
            <div class="small text-muted">${i.competition}</div>
          </td>
          <td>
            <div class="fw-bold">${i.date}</div>
            <div class="small text-muted">${i.venue||"Venue TBD"}</div>
          </td>
          <td><span class="badge-role badge-batsman">${i.format}</span></td>
          <td><span class="${o}">${i.result}</span></td>
          <td>${r}</td>
          <td>
            <span class="badge-role ${i.scorecardCount>0?"bg-info bg-opacity-10 text-primary border":""}">
              <i class="bi bi-paperclip me-1"></i>${i.scorecardCount} file(s)
            </span>
            ${i.scoresVerified?'<span class="badge bg-success ms-1" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-match" data-match-id="${i.id}">
              <span>Open match</span> &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-match").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-match-id");Te(o)})})}catch(n){t.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${n.message}</td></tr>`}}async function Te(e){try{const s=await y.get(`/api/matches/${e}`),{match:t,attendanceSummary:a}=s,l=["Administrator","Manager","Coach"].includes(G==null?void 0:G.role),n=t.playingXI||[],c=n.filter(o=>o.status==="Playing XI").length,i=`
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
              Playing XI (${c}/11)
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
              <span class="badge bg-danger" id="playing-xi-counter">${c} / 11 Selected</span>
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
                          <select class="form-select-custom px-status-select" ${l?"":"disabled"}>
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

            ${l?`
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
                  ${(t.playerStats&&t.playerStats.length>0?t.playerStats:n.filter(o=>o.status==="Playing XI").map(o=>{var r;return{player:o.player,playerName:((r=o.player)==null?void 0:r.fullName)||"Player",batted:!0,runs:0,balls:0,fours:0,sixes:0,notOut:!1,ballsBowled:0,runsConceded:0,wickets:0,catches:0,stumpings:0,runOuts:0}})).map((o,r)=>{var m,g;const d=((m=o.player)==null?void 0:m._id)||o.player,p=o.playerName||((g=o.player)==null?void 0:g.fullName)||"Player";return`
                      <tr data-stat-player-id="${d}">
                        <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                        <td class="fw-bold">${p}</td>
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
                ${l?`
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
    `;A({title:`Match Control: vs ${t.opponent}`,contentHtml:i,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:o=>{var p,m,g;const r=o.querySelectorAll('[data-bs-toggle="pill"]');r.forEach(u=>{u.addEventListener("click",v=>{r.forEach(f=>f.classList.remove("active")),o.querySelectorAll(".tab-pane").forEach(f=>f.classList.remove("show","active")),u.classList.add("active");const h=o.querySelector(u.getAttribute("data-bs-target"));h&&h.classList.add("show","active")})});const d=()=>{const u=o.querySelectorAll(".px-status-select");let v=0;u.forEach(f=>{f.value==="Playing XI"&&v++});const h=document.getElementById("playing-xi-counter");h&&(h.textContent=`${v} / 11 Selected`,h.className=v>11?"badge bg-danger":v===11?"badge bg-success":"badge bg-warning text-dark")};o.querySelectorAll(".px-status-select").forEach(u=>{u.addEventListener("change",d)}),(p=document.getElementById("btn-save-playing-xi"))==null||p.addEventListener("click",async()=>{const u=o.querySelectorAll("#playing-xi-tbody tr"),v=[];let h=0;if(u.forEach(f=>{var I;const $=f.getAttribute("data-px-player-id"),x=((I=f.querySelector(".px-status-select"))==null?void 0:I.value)||"Unavailable";x==="Playing XI"&&h++,v.push({playerId:$,status:x})}),h>11){b(`At most 11 players allowed in Playing XI. Selected ${h}.`,"error");return}try{await y.put(`/api/matches/${t._id}/playing-xi`,{selections:v}),b(`Playing XI saved (${h} selected in starting XI).`,"success"),J()}catch(f){b(`Error: ${f.message}`,"error")}}),(m=document.getElementById("btn-upload-scorecard-action"))==null||m.addEventListener("click",async()=>{const u=document.getElementById("scorecard-file-input");if(!u||!u.files||u.files.length===0){b("Please select a PDF or CSV scorecard file to upload.","error");return}const v=new FormData;v.append("scorecardFile",u.files[0]);const h=document.getElementById("btn-upload-scorecard-action");h.disabled=!0,h.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Parsing...';try{const f=await y.upload(`/api/matches/${t._id}/scorecard`,v);if(b(f.message,"success"),f.fileType==="csv"&&f.matched){const $=document.getElementById("score-review-tbody");$&&($.innerHTML=f.matched.map(x=>`
                  <tr data-stat-player-id="${x.player}">
                    <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                    <td class="fw-bold">${x.playerName}</td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${x.runs}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${x.balls}"></td>
                    <td>
                      <div class="d-flex gap-1">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${x.fours}">
                        <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${x.sixes}">
                      </div>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <label><input type="checkbox" class="form-check-input stat-batted" ${x.batted?"checked":""}> Bat</label>
                        <label><input type="checkbox" class="form-check-input stat-notout" ${x.notOut?"checked":""}> NO</label>
                      </div>
                    </td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" style="width: 55px;" value="${x.ballsBowled}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${x.runsConceded}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${x.wickets}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${x.catches}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${x.stumpings}"></td>
                    <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${x.runOuts}"></td>
                  </tr>
                `).join("")),f.unmatched&&f.unmatched.length>0&&b(`Warning: ${f.unmatched.length} player(s) in CSV could not be matched to squad register.`,"warning")}else if(f.fileType==="pdf"){const $=document.getElementById("pdf-extracted-box"),x=document.getElementById("pdf-text-content");$&&x&&(x.textContent=f.extractedText||"No plain text found (scanned image PDF).",$.classList.remove("d-none"))}}catch(f){b(`Upload failed: ${f.message}`,"error")}finally{h.disabled=!1,h.innerHTML='<i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview'}}),(g=document.getElementById("btn-confirm-verified-scores"))==null||g.addEventListener("click",async()=>{var x,I,S;const u=o.querySelectorAll("#score-review-tbody tr"),v=[];u.forEach(E=>{var be,ve,ge,fe,ye,he,xe,we,$e,Ee,ke,Ie,Ce,Be;if(!((be=E.querySelector(".stat-include"))==null?void 0:be.checked))return;const R=E.getAttribute("data-stat-player-id"),N=(ve=E.querySelector("td:nth-child(2)"))==null?void 0:ve.textContent.trim(),D=parseInt(((ge=E.querySelector(".stat-runs"))==null?void 0:ge.value)||0,10),O=parseInt(((fe=E.querySelector(".stat-balls"))==null?void 0:fe.value)||0,10),H=parseInt(((ye=E.querySelector(".stat-4s"))==null?void 0:ye.value)||0,10),F=parseInt(((he=E.querySelector(".stat-6s"))==null?void 0:he.value)||0,10),j=(xe=E.querySelector(".stat-batted"))==null?void 0:xe.checked,z=(we=E.querySelector(".stat-notout"))==null?void 0:we.checked,K=parseInt((($e=E.querySelector(".stat-ballsbowled"))==null?void 0:$e.value)||0,10),oe=parseInt(((Ee=E.querySelector(".stat-runsconceded"))==null?void 0:Ee.value)||0,10),He=parseInt(((ke=E.querySelector(".stat-wickets"))==null?void 0:ke.value)||0,10),Fe=parseInt(((Ie=E.querySelector(".stat-catches"))==null?void 0:Ie.value)||0,10),je=parseInt(((Ce=E.querySelector(".stat-stumpings"))==null?void 0:Ce.value)||0,10),ze=parseInt(((Be=E.querySelector(".stat-runouts"))==null?void 0:Be.value)||0,10);v.push({player:R,playerName:N,batted:j,notOut:z,runs:D,balls:O,fours:H,sixes:F,ballsBowled:K,runsConceded:oe,wickets:He,catches:Fe,stumpings:je,runOuts:ze})});const h=(x=document.getElementById("m-ourScore"))==null?void 0:x.value,f=(I=document.getElementById("m-oppScore"))==null?void 0:I.value,$=(S=document.getElementById("m-result"))==null?void 0:S.value;try{await y.post(`/api/matches/${t._id}/verify-scores`,{playerStats:v,ourScore:h,oppositionScore:f,result:$}),b("Official match scores confirmed and season leaderboards updated!","success"),B(),J()}catch(E){b(`Verification failed: ${E.message}`,"error")}})}})}catch(s){b(`Failed to open match details: ${s.message}`,"error")}}function et(){const e=`
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
  `;A({title:"Log Official MCA League Fixture",contentHtml:e,onOpen:s=>{var t;(t=document.getElementById("modal-btn-save"))==null||t.addEventListener("click",async()=>{var d,p,m,g,u,v,h;const a=(d=document.getElementById("m-opponent"))==null?void 0:d.value,l=(p=document.getElementById("m-competition"))==null?void 0:p.value,n=(m=document.getElementById("m-date"))==null?void 0:m.value,c=(g=document.getElementById("m-format"))==null?void 0:g.value,i=(u=document.getElementById("m-result-init"))==null?void 0:u.value,o=(v=document.getElementById("m-venue"))==null?void 0:v.value,r=(h=document.getElementById("m-notes"))==null?void 0:h.value;if(!a||!n){b("Opponent and date are required.","error");return}try{await y.post("/api/matches",{opponent:a,competition:l,date:n,format:c,result:i,venue:o,notes:r}),b(`Fixture vs ${a} created with linked attendance session.`,"success"),B(),J()}catch(f){b(`Error: ${f.message}`,"error")}})}})}function tt(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}async function st(e){var s,t,a;e.innerHTML=`
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
  `,await Le(),(s=document.getElementById("btn-apply-lead-filters"))==null||s.addEventListener("click",Le),(t=document.getElementById("btn-export-leaderboard-csv"))==null||t.addEventListener("click",()=>{window.location.href="/api/leaderboards/export-csv"}),(a=document.getElementById("btn-print-leaderboard"))==null||a.addEventListener("click",()=>{window.print()})}async function Le(){var n,c,i;const e=((n=document.getElementById("lead-season-filter"))==null?void 0:n.value)||"All",s=((c=document.getElementById("lead-comp-filter"))==null?void 0:c.value)||"All",t=((i=document.getElementById("lead-format-filter"))==null?void 0:i.value)||"All",a=document.getElementById("leaderboard-cards-container"),l=document.getElementById("leaderboard-tbody");try{const o=new URLSearchParams;e!=="All"&&o.append("season",e),s!=="All"&&o.append("competition",s),t!=="All"&&o.append("format",t);const r=await y.get(`/api/leaderboards?${o.toString()}`),{topBatsmen:d,topBowlers:p,topFielders:m,tableData:g}=r;if(a.innerHTML=`
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
              ${d.map((u,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${u.playerName}</span>
                  <span>${u.runs} r <span class="text-muted" style="font-size: 10px;">(SR ${u.batSR})</span></span>
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
          ${p&&p.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${p[0].playerName}</div>
              <div class="stat-value text-danger my-1">${p[0].wickets} <span class="small text-muted fs-6">wickets</span></div>
              <div class="small text-muted">Econ: ${p[0].economy!==null?p[0].economy:"—"} &bull; Balls: ${p[0].ballsBowled}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Bowlers</div>
              ${p.map((u,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${u.playerName}</span>
                  <span>${u.wickets} w <span class="text-muted" style="font-size: 10px;">(E ${u.economy!==null?u.economy:"—"})</span></span>
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
          ${m&&m.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${m[0].playerName}</div>
              <div class="stat-value text-gold my-1">${m[0].fieldingPoints} <span class="small text-muted fs-6">points</span></div>
              <div class="small text-muted">Catches: ${m[0].catches} &bull; Stump: ${m[0].stumpings} &bull; RO: ${m[0].runOuts}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Fielders</div>
              ${m.map((u,v)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${v===0?"fw-bold":""}">
                  <span>${v+1}. ${u.playerName}</span>
                  <span>${u.fieldingPoints} pts <span class="text-muted" style="font-size: 10px;">(${u.catches} c)</span></span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small py-4">No verified fielding statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>
    `,!g||g.length===0){l.innerHTML='<tr><td colspan="12" class="text-center py-4 text-muted">No squad statistics found.</td></tr>';return}l.innerHTML=g.map(u=>`
      <tr>
        <td class="fw-bold text-main">${u.playerName}</td>
        <td class="small text-muted">${u.company}</td>
        <td class="text-center">${u.matches}</td>
        <td class="text-center fw-bold text-danger">${u.runs}</td>
        <td class="text-center">${u.batSR.toFixed(2)}</td>
        <td class="text-center">${u.batAvg!==null?u.batAvg.toFixed(2):"—"}</td>
        <td class="text-center fw-bold text-main">${u.wickets}</td>
        <td class="text-center">${u.economy!==null?u.economy.toFixed(2):"—"}</td>
        <td class="text-center">${u.catches}</td>
        <td class="text-center">${u.stumpings}</td>
        <td class="text-center">${u.runOuts}</td>
        <td class="text-center fw-bold text-gold">${u.fieldingPoints}</td>
      </tr>
    `).join("")}catch(o){a.innerHTML=`<div class="col-12 alert alert-danger">${o.message}</div>`}}let X=[],q=null;async function at(e,s){var a,l,n,c,i;q=s;const t=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role);e.innerHTML=`
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
      <div class="row g-2 align-items-center">
        <div class="col-md-5">
          <div class="input-group">
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
  `,await Promise.all([re(),Q()]),(a=document.getElementById("inventory-search"))==null||a.addEventListener("input",lt(Q,300)),(l=document.getElementById("inventory-category-filter"))==null||l.addEventListener("change",Q),(n=document.getElementById("inventory-condition-filter"))==null||n.addEventListener("change",Q),(c=document.getElementById("btn-export-inventory-csv"))==null||c.addEventListener("click",()=>{window.location.href="/api/reports/equipment/csv"}),t&&((i=document.getElementById("btn-add-inventory-item"))==null||i.addEventListener("click",()=>qe(null)))}async function re(){try{const e=await y.get("/api/equipment/stats"),{stats:s}=e;document.getElementById("stat-total-items").textContent=s.totalRecords,document.getElementById("stat-count-pending").textContent=s.countPending,document.getElementById("stat-damaged-lost").textContent=s.damagedOrLost,document.getElementById("stat-low-stock").textContent=s.lowStock}catch(e){console.error("Failed to load inventory metrics:",e)}}async function Q(){var l,n,c;const e=((l=document.getElementById("inventory-search"))==null?void 0:l.value)||"",s=((n=document.getElementById("inventory-category-filter"))==null?void 0:n.value)||"All",t=((c=document.getElementById("inventory-condition-filter"))==null?void 0:c.value)||"All",a=document.getElementById("inventory-tbody");try{const i=new URLSearchParams;if(e&&i.append("search",e),s!=="All"&&i.append("category",s),t!=="All"&&i.append("condition",t),X=(await y.get(`/api/equipment?${i.toString()}`)).equipment,!X||X.length===0){a.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted">No equipment items found.</td></tr>';return}const r=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role);a.innerHTML=X.map(d=>{const p=d.condition==="Good"?"badge bg-success":d.condition==="Fair"?"badge bg-info text-dark":d.condition==="Inspect"?"badge bg-warning text-dark":d.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",m=d.countVerified?'<span class="badge bg-success bg-opacity-10 text-success border border-success" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':'<span class="badge bg-warning bg-opacity-10 text-dark border border-warning" style="font-size: 9px;"><i class="bi bi-hourglass-split"></i> Count pending</span>',g=d.isLowStock?`<span class="badge bg-danger ms-1" style="font-size: 9px;">Low Stock (Min: ${d.minimumStock})</span>`:"",u=d.assignedPlayer?`<div class="small text-muted"><i class="bi bi-person me-1"></i>Assigned: ${d.assignedPlayer.fullName}</div>`:"";return`
        <tr>
          <td class="fw-bold font-monospace text-main">${d.assetId}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${d.name}</div>
            <div class="small text-muted">${d.location}</div>
            ${u}
          </td>
          <td><span class="badge-role">${d.category}</span></td>
          <td>
            <div class="fw-bold fs-6">${d.quantity} <span class="small text-muted fw-normal">${d.unit}</span></div>
            <div>${m} ${g}</div>
          </td>
          <td><span class="${p}">${d.condition}</span></td>
          <td class="small">
            <div>Insp: ${d.lastInspectedDate||"Awaiting check"}</div>
            ${d.expiryDate?`<div class="text-muted">Exp: ${d.expiryDate}</div>`:""}
          </td>
          <td class="text-end text-nowrap">
            ${r?`
              <button class="btn btn-sm btn-outline-burgundy py-1 px-2 btn-verify-stock" data-item-id="${d.id}" title="Physically verify stock count">
                <i class="bi bi-check2-square me-1"></i>Verify
              </button>
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-edit-equipment" data-item-id="${d.id}" title="Edit asset details">
                <i class="bi bi-pencil"></i>
              </button>
            `:`
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-view-equipment" data-item-id="${d.id}">
                View
              </button>
            `}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-verify-stock").forEach(d=>{d.addEventListener("click",()=>{const p=d.getAttribute("data-item-id");nt(p)})}),document.querySelectorAll(".btn-edit-equipment, .btn-view-equipment").forEach(d=>{d.addEventListener("click",()=>{const p=d.getAttribute("data-item-id"),m=X.find(g=>g.id===p);qe(m)})})}catch(i){a.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${i.message}</td></tr>`}}function nt(e){const s=X.find(a=>a.id===e);if(!s)return;const t=`
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
  `;A({title:`Verify Physical Stock: ${s.assetId}`,contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-verify-stock">Confirm Verification</button>
    `,onOpen:a=>{var l;(l=document.getElementById("btn-submit-verify-stock"))==null||l.addEventListener("click",async()=>{var i,o;const n=(i=document.getElementById("v-quantity"))==null?void 0:i.value,c=(o=document.getElementById("v-notes"))==null?void 0:o.value;if(n===""||isNaN(parseInt(n,10))){b("Please enter a valid count number.","error");return}try{await y.put(`/api/equipment/${s.id}/verify-count`,{verifiedQuantity:parseInt(n,10),notes:c}),b(`Physical count verified for ${s.name}.`,"success"),B(),await Promise.all([re(),Q()])}catch(r){b(`Error: ${r.message}`,"error")}})}})}async function qe(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role);let a=[];try{a=(await y.get("/api/players")).players||[]}catch{}const l=`
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
            ${a.map(n=>{var c;return`
              <option value="${n._id}" ${((c=e==null?void 0:e.assignedPlayer)==null?void 0:c._id)===n._id||(e==null?void 0:e.assignedPlayer)===n._id?"selected":""}>
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
  `;A({title:s?`Edit Asset: ${e.assetId}`:"Add New Equipment Record",contentHtml:l,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:n=>{var c;t&&((c=document.getElementById("modal-btn-save"))==null||c.addEventListener("click",async()=>{var I,S,E,_,R,N,D,O,H,F,j,z;const i=(I=document.getElementById("eq-assetId"))==null?void 0:I.value,o=(S=document.getElementById("eq-name"))==null?void 0:S.value,r=(E=document.getElementById("eq-category"))==null?void 0:E.value,d=(_=document.getElementById("eq-condition"))==null?void 0:_.value,p=(R=document.getElementById("eq-quantity"))==null?void 0:R.value,m=(N=document.getElementById("eq-unit"))==null?void 0:N.value,g=(D=document.getElementById("eq-minStock"))==null?void 0:D.value,u=(O=document.getElementById("eq-location"))==null?void 0:O.value,v=(H=document.getElementById("eq-assignedPlayer"))==null?void 0:H.value,h=(F=document.getElementById("eq-expiryDate"))==null?void 0:F.value,f=(j=document.getElementById("eq-cost"))==null?void 0:j.value,$=(z=document.getElementById("eq-notes"))==null?void 0:z.value;if(!o||!i){b("Asset ID and Name are required.","error");return}const x={assetId:i,name:o,category:r,condition:d,quantity:parseInt(p,10),unit:m,minimumStock:parseInt(g,10),location:u,assignedPlayer:v||null,expiryDate:h||null,costLKR:parseFloat(f||0),notes:$};try{s?(await y.put(`/api/equipment/${e.id}`,x),b(`Asset ${i} updated.`,"success")):(await y.post("/api/equipment",x),b(`Asset ${i} created.`,"success")),B(),await Promise.all([re(),Q()])}catch(K){b(`Error: ${K.message}`,"error")}}))}})}function lt(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let te=[],se=null;async function it(e,s){var a,l;se=s;const t=["Administrator","Manager","Coach"].includes(se==null?void 0:se.role);e.innerHTML=`
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
  `,await Re(),(a=document.getElementById("btn-print-inspections"))==null||a.addEventListener("click",()=>{window.print()}),t&&((l=document.getElementById("btn-new-inspection"))==null||l.addEventListener("click",ot))}async function Re(){const e=document.getElementById("inspections-tbody");try{if(te=(await y.get("/api/inspections")).inspections,!te||te.length===0){e.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No inspection records logged yet. Click "Log Inspection Check" to conduct a weekly gear check.
          </td>
        </tr>
      `;return}e.innerHTML=te.map(t=>{const a=t.equipment||{},l=t.condition==="Good"?"badge bg-success":t.condition==="Fair"?"badge bg-info text-dark":t.condition==="Inspect"?"badge bg-warning text-dark":t.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",n=t.photo?`
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
          <td><span class="${l}">${t.condition}</span></td>
          <td class="small">
            <div>${t.notes||"Routine check completed."}</div>
            ${t.correctiveAction?`<div class="text-danger mt-1"><strong>Action:</strong> ${t.correctiveAction}</div>`:""}
          </td>
          <td>${n}</td>
        </tr>
      `}).join("")}catch(s){e.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${s.message}</td></tr>`}}async function ot(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;A({title:"Conduct Weekly Gear Inspection",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-inspection">Save Inspection</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-inspection"))==null||a.addEventListener("click",async()=>{var m,g,u,v,h,f;const l=(m=document.getElementById("ins-equipmentId"))==null?void 0:m.value,n=(g=document.getElementById("ins-date"))==null?void 0:g.value,c=(u=document.getElementById("ins-condition"))==null?void 0:u.value,i=(v=document.getElementById("ins-notes"))==null?void 0:v.value,o=(h=document.getElementById("ins-action"))==null?void 0:h.value,r=(f=document.getElementById("ins-photo"))==null?void 0:f.files[0];if(!l||!n||!c){b("Equipment, date, and condition are required.","error");return}const d=new FormData;d.append("equipmentId",l),d.append("date",n),d.append("condition",c),d.append("notes",i),d.append("correctiveAction",o),r&&d.append("evidencePhoto",r);const p=document.getElementById("btn-submit-inspection");p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Saving...';try{await y.upload("/api/inspections",d),b("Weekly inspection logged successfully!","success"),B(),Re()}catch($){b(`Error: ${$.message}`,"error")}finally{p.disabled=!1,p.innerHTML="Save Inspection"}})}})}let Y=[],ae=null;async function dt(e,s){var a,l;ae=s;const t=["Administrator","Manager","Coach"].includes(ae==null?void 0:ae.role);e.innerHTML=`
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
  `,await me(),(a=document.getElementById("btn-print-damage"))==null||a.addEventListener("click",()=>{window.print()}),t&&((l=document.getElementById("btn-file-damage"))==null||l.addEventListener("click",ct))}async function me(){const e=document.getElementById("damage-tbody");try{if(Y=(await y.get("/api/damage-reports")).reports,!Y||Y.length===0){e.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No active damage incidents recorded. All club assets operational.
          </td>
        </tr>
      `;return}e.innerHTML=Y.map(t=>{const a=t.equipment||{},l=t.severity==="Unsafe"?"badge bg-danger":t.severity==="High"?"badge bg-warning text-dark":t.severity==="Medium"?"badge bg-info text-dark":"badge bg-secondary",n=t.status==="Open"?"badge bg-danger":t.status==="In progress"?"badge bg-warning text-dark":"badge bg-success",c=t.photo?`
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
          <td><span class="${l}">${t.severity}</span></td>
          <td class="small" style="max-width: 300px;">
            <div class="fw-bold">${t.incidentDetails}</div>
            ${t.correctiveAction?`<div class="text-muted mt-1">Action: ${t.correctiveAction}</div>`:""}
            ${c}
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
      `}).join(""),document.querySelectorAll(".btn-followup-damage").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-report-id");rt(a)})})}catch(s){e.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${s.message}</td></tr>`}}async function ct(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;A({title:"File Equipment Damage Report",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-damage">File Report</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-damage"))==null||a.addEventListener("click",async()=>{var m,g,u,v,h,f;const l=(m=document.getElementById("dmg-equipmentId"))==null?void 0:m.value,n=(g=document.getElementById("dmg-date"))==null?void 0:g.value,c=(u=document.getElementById("dmg-severity"))==null?void 0:u.value,i=(v=document.getElementById("dmg-details"))==null?void 0:v.value,o=(h=document.getElementById("dmg-action"))==null?void 0:h.value,r=(f=document.getElementById("dmg-photo"))==null?void 0:f.files[0];if(!l||!n||!i){b("Equipment, date, and incident details are required.","error");return}const d=new FormData;d.append("equipmentId",l),d.append("date",n),d.append("severity",c),d.append("incidentDetails",i),d.append("correctiveAction",o),r&&d.append("incidentPhoto",r);const p=document.getElementById("btn-submit-damage");p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Filing...';try{await y.upload("/api/damage-reports",d),b("Damage report filed and asset condition updated.","success"),B(),me()}catch($){b(`Error: ${$.message}`,"error")}finally{p.disabled=!1,p.innerHTML="File Report"}})}})}function rt(e){var a,l;const s=Y.find(n=>n._id===e);if(!s)return;const t=`
    <div>
      <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
        <div class="fw-bold text-main fs-6">${((a=s.equipment)==null?void 0:a.name)||"Asset"} (${((l=s.equipment)==null?void 0:l.assetId)||""})</div>
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
  `;A({title:"Damage Incident Follow-up",contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-save-follow-up">Save Follow-up</button>
    `,onOpen:n=>{var c;(c=document.getElementById("btn-save-follow-up"))==null||c.addEventListener("click",async()=>{var r,d;const i=(r=document.getElementById("fu-status"))==null?void 0:r.value,o=(d=document.getElementById("fu-note"))==null?void 0:d.value;if(!o&&!i){b("Please enter a note or status change.","error");return}try{await y.post(`/api/damage-reports/${s._id}/follow-up`,{status:i,note:o}),b("Follow-up record saved.","success"),B(),me()}catch(p){b(`Error: ${p.message}`,"error")}})}})}let L=null,M=null;async function mt(e,s){var a,l,n,c;M=s;const t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);e.innerHTML=`
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
  `,await ue(),(a=document.getElementById("btn-suggest-actions"))==null||a.addEventListener("click",ut),(l=document.getElementById("btn-export-tasks-csv"))==null||l.addEventListener("click",()=>{window.location.href="/api/reports/tasks/csv"}),(n=document.getElementById("btn-print-tasks"))==null||n.addEventListener("click",()=>{window.print()}),t&&((c=document.getElementById("btn-create-task"))==null||c.addEventListener("click",()=>Ne(null)))}async function ue(){const e=document.getElementById("kanban-columns-container");try{L=(await y.get("/api/tasks")).board;const t=[{key:"todo",label:"To do",count:L.counts.todo,items:L.todo},{key:"inProgress",label:"In progress",count:L.counts.inProgress,items:L.inProgress},{key:"blocked",label:"Blocked",count:L.counts.blocked,items:L.blocked},{key:"done",label:"Done",count:L.counts.done,items:L.done}];e.innerHTML=t.map(a=>`
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span class="stat-label text-main">${a.label}</span>
          <span class="badge rounded-pill bg-light text-dark border px-2 py-1" style="font-size: 11px;">${a.count}</span>
        </div>

        <div class="kanban-column-body flex-1" style="min-height: 200px;">
          ${a.items.map(l=>{const n=l.priority==="Critical"?"badge bg-danger":l.priority==="High"?"badge bg-warning text-dark":l.priority==="Medium"?"badge bg-info text-dark":"badge bg-secondary";return`
              <div class="kanban-task-card" data-task-id="${l._id}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="${n}" style="font-size: 9.5px;">${l.priority}</span>
                  <span class="badge-role" style="font-size: 9px;">${l.category}</span>
                </div>
                <div class="fw-bold text-main mb-1" style="font-size: 13px;">${l.title}</div>
                ${l.details?`<div class="small text-muted mb-2 text-truncate">${l.details}</div>`:""}
                <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-2 small text-muted" style="border-color: var(--border-color) !important; font-size: 11px;">
                  <span><i class="bi bi-person me-1"></i>${l.owner}</span>
                  <span><i class="bi bi-clock me-1"></i>${l.dueDate||"No due date"}</span>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-sm btn-light-custom py-0 px-2 btn-edit-task" data-task-id="${l._id}" style="font-size: 11px;">
                    <i class="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `).join(""),document.querySelectorAll(".btn-edit-task").forEach(a=>{a.addEventListener("click",()=>{const l=a.getAttribute("data-task-id"),c=[...L.todo,...L.inProgress,...L.blocked,...L.done].find(i=>i._id===l);Ne(c)})})}catch(s){e.innerHTML=`<div class="alert alert-danger col-12">${s.message}</div>`}}async function ut(){A({title:"Suggest Management Actions (AI & Rule Engine)",contentHtml:`
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
  `,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:async s=>{try{const t=await y.get("/api/tasks/suggestions"),a=document.getElementById("ai-source-badge");a&&(a.textContent=t.source);const l=document.getElementById("ai-suggestions-list");if(!t.suggestions||t.suggestions.length===0){l.innerHTML='<div class="text-muted text-center py-4">No urgent operational bottlenecks detected. All records are up to date!</div>';return}l.innerHTML=t.suggestions.map((n,c)=>{const i=n.priority==="Critical"?"badge bg-danger":n.priority==="High"?"badge bg-warning text-dark":"badge bg-info text-dark";return`
            <div class="card-custom p-3 mb-2" id="sug-card-${c}">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="${i}" style="font-size: 10px;">${n.priority}</span>
                <span class="badge-role" style="font-size: 9.5px;">${n.category||"Operations"}</span>
              </div>
              <div class="fw-bold text-main mb-1" style="font-size: 13.5px;">${n.title}</div>
              <p class="small text-muted mb-3" style="line-height: 1.4;">${n.explanation}</p>
              <div class="text-end">
                <button type="button" class="btn btn-sm btn-burgundy py-1 px-3 btn-add-sug-task" data-sug-index="${c}">
                  <i class="bi bi-plus-lg me-1"></i>+ Add
                </button>
              </div>
            </div>
          `}).join(""),l.querySelectorAll(".btn-add-sug-task").forEach(n=>{n.addEventListener("click",async()=>{const c=parseInt(n.getAttribute("data-sug-index"),10),i=t.suggestions[c];n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Adding...';try{await y.post("/api/tasks",{title:i.title,details:i.explanation,category:i.category||"Operations",priority:i.priority||"Medium",status:"To do",source:t.source.includes("AI")?"AI Assistant":"Rule Engine"}),b(`Task "${i.title}" added to Kanban board.`,"success"),n.className="btn btn-sm btn-success py-1 px-3",n.innerHTML='<i class="bi bi-check2"></i> Added',ue()}catch(o){b(`Error: ${o.message}`,"error"),n.disabled=!1,n.innerHTML="+ Add"}})})}catch(t){document.getElementById("ai-suggestions-list").innerHTML=`<div class="alert alert-danger">${t.message}</div>`}}})}function Ne(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role),a=`
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
          <input type="text" id="t-owner" class="form-control-custom" value="${(e==null?void 0:e.owner)||(M==null?void 0:M.name)||"Unassigned"}" ${t?"":"disabled"}>
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
  `;A({title:s?`Edit Task: ${e.title}`:"Create Operational Task",contentHtml:a,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:l=>{var n;t&&((n=document.getElementById("modal-btn-save"))==null||n.addEventListener("click",async()=>{var u,v,h,f,$,x,I;const c=(u=document.getElementById("t-title"))==null?void 0:u.value,i=(v=document.getElementById("t-category"))==null?void 0:v.value,o=(h=document.getElementById("t-priority"))==null?void 0:h.value,r=(f=document.getElementById("t-status"))==null?void 0:f.value,d=($=document.getElementById("t-owner"))==null?void 0:$.value,p=(x=document.getElementById("t-dueDate"))==null?void 0:x.value,m=(I=document.getElementById("t-details"))==null?void 0:I.value;if(!c||!c.trim()){b("Task title is required.","error");return}const g={title:c,category:i,priority:o,status:r,owner:d,dueDate:p,details:m};try{s?(await y.put(`/api/tasks/${e._id}`,g),b("Task updated successfully.","success")):(await y.post("/api/tasks",g),b(`Task "${c}" created.`,"success")),B(),ue()}catch(S){b(`Error: ${S.message}`,"error")}}))}})}async function pt(e){e.innerHTML=`
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
  `,document.querySelectorAll(".btn-print-report").forEach(s=>{s.addEventListener("click",()=>{const t=s.getAttribute("data-report-type");window.location.hash=`#/${t}`,setTimeout(()=>window.print(),500)})})}let k=null;async function bt(e,s){var l,n,c;k=s;const t=(k==null?void 0:k.role)==="Administrator",a=document.documentElement.getAttribute("data-theme")||"light";e.innerHTML=`
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
              ${k!=null&&k.name?k.name.split(" ").map(i=>i[0]).join("").slice(0,2).toUpperCase():"AC"}
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
  `,(l=document.getElementById("change-password-form"))==null||l.addEventListener("submit",async i=>{var d,p;i.preventDefault();const o=(d=document.getElementById("pw-current"))==null?void 0:d.value,r=(p=document.getElementById("pw-new"))==null?void 0:p.value;try{await y.put("/api/auth/change-password",{currentPassword:o,newPassword:r}),b("Password updated successfully.","success"),document.getElementById("change-password-form").reset()}catch(m){b(`Password update failed: ${m.message}`,"error")}}),(n=document.getElementById("settings-theme-switch"))==null||n.addEventListener("change",i=>{const r=i.target.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),localStorage.setItem("acc_theme",r),b(`Switched to ${r} mode.`,"info")}),t&&(De(),(c=document.getElementById("btn-create-user-modal"))==null||c.addEventListener("click",vt))}async function De(){const e=document.getElementById("users-list-container");if(e)try{const t=(await y.get("/api/users")).users||[];e.innerHTML=`
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
    `}catch(s){e.innerHTML=`<div class="text-danger small">${s.message}</div>`}}function vt(){A({title:"Provision New User Account",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-create-user"))==null||t.addEventListener("click",async()=>{var i,o,r,d;const a=(i=document.getElementById("u-name"))==null?void 0:i.value,l=(o=document.getElementById("u-email"))==null?void 0:o.value,n=(r=document.getElementById("u-role"))==null?void 0:r.value,c=(d=document.getElementById("u-password"))==null?void 0:d.value;if(!a||!l||!c||!n){b("All fields are required.","error");return}if(c.length<8){b("Password must be at least 8 characters.","error");return}try{await y.post("/api/users",{name:a,email:l,role:n,password:c}),b(`Account created for ${a} (${n}).`,"success"),B(),De()}catch(p){b(`Failed to create user: ${p.message}`,"error")}})}})}let P=null;const de={"command-centre":{title:"Command Centre",breadcrumb:"Workspace / Operations",render:Ge,actionButton:{id:"hdr-action-btn",label:"Explore Matches",icon:"bi-trophy"}},players:{title:"Player Profiles",breadcrumb:"Workspace / Roster",render:_e,actionButton:null},attendance:{title:"Practice & Attendance",breadcrumb:"Workspace / Training",render:Je,actionButton:null},matches:{title:"MCA Match Centre",breadcrumb:"Workspace / League Fixtures",render:Ze,actionButton:null},leaderboards:{title:"Player Leaderboards",breadcrumb:"Workspace / Performance",render:st,actionButton:null},inventory:{title:"Gear & Inventory",breadcrumb:"Club Operations / Assets",render:at,actionButton:null},inspections:{title:"Weekly Inspections",breadcrumb:"Club Operations / Safety",render:it,actionButton:null},"damage-reports":{title:"Damage Reports",breadcrumb:"Club Operations / Incidents",render:dt,actionButton:null},tasks:{title:"Tasks & AI Assistant",breadcrumb:"Club Operations / Kanban",render:mt,actionButton:null},reports:{title:"Reports & Exports",breadcrumb:"Management / Registers",render:pt,actionButton:null},settings:{title:"Settings & Users",breadcrumb:"Management / Administration",render:bt,actionButton:null}};function gt(){const e=localStorage.getItem("acc_theme")||"light";document.documentElement.setAttribute("data-theme",e)}function ft(){const s=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),localStorage.setItem("acc_theme",s);const t=document.getElementById("theme-toggle-icon");t&&(t.className=s==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars"),b(`Switched to ${s} mode.`,"info")}function pe(e="command-centre"){var p,m,g,u;const s=document.getElementById("app"),t=de[e]||de["command-centre"];s.innerHTML=`
    <div id="app-layout">
      <!-- Sidebar -->
      ${Ve(P,e)}

      <!-- Main Content Area -->
      <div class="app-main-wrapper">
        <!-- Header -->
        ${We({title:t.title,breadcrumb:t.breadcrumb,actionButton:t.actionButton})}

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
  `,(p=document.getElementById("header-theme-toggle"))==null||p.addEventListener("click",ft),(m=document.getElementById("header-refresh-btn"))==null||m.addEventListener("click",()=>{Oe(ie()),b("View refreshed.","info")});const a=document.getElementById("app-sidebar"),l=document.getElementById("mobile-backdrop"),n=document.getElementById("mobile-menu-toggle"),c=()=>{a==null||a.classList.add("show-mobile"),l==null||l.classList.add("show")},i=()=>{a==null||a.classList.remove("show-mobile"),l==null||l.classList.remove("show")};n==null||n.addEventListener("click",c),l==null||l.addEventListener("click",i),a==null||a.querySelectorAll(".sidebar-nav-link").forEach(v=>{v.addEventListener("click",i)}),(g=document.getElementById("sidebar-logout-btn"))==null||g.addEventListener("click",async()=>{try{await y.post("/api/auth/logout"),P=null,b("Signed out of workspace.","info"),ne(document.getElementById("app"),le)}catch{P=null,ne(document.getElementById("app"),le)}}),t.actionButton&&((u=document.getElementById(t.actionButton.id))==null||u.addEventListener("click",()=>{window.location.hash="#/matches"}));const o=document.documentElement.getAttribute("data-theme")||"light",r=document.getElementById("theme-toggle-icon");r&&(r.className=o==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars");const d=document.getElementById("main-view-container");t.render(d,P)}function ie(){const e=window.location.hash.replace(/^#\/?/,"").split("?")[0];return de[e]?e:"command-centre"}function Oe(e){P&&pe(e)}function le(e){P=e;const s=ie();pe(s)}window.addEventListener("auth:expired",()=>{P&&(P=null,b("Your session has expired. Please sign in again.","warning"),ne(document.getElementById("app"),le))});window.addEventListener("hashchange",()=>{P&&Oe(ie())});async function yt(){gt();const e=document.getElementById("app");try{P=(await y.get("/api/auth/me")).user,pe(ie())}catch{P=null,ne(e,le)}}yt();
