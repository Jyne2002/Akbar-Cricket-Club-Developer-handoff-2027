(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();const y={async request(e,s={}){const t={credentials:"include",headers:{Accept:"application/json",...s.headers},...s};t.body&&!(t.body instanceof FormData)&&typeof t.body=="object"&&(t.headers["Content-Type"]="application/json",t.body=JSON.stringify(t.body));try{const a=await fetch(e,t);a.status===401&&!e.includes("/api/auth/login")&&window.dispatchEvent(new CustomEvent("auth:expired"));const i=a.headers.get("content-type");let l=null;if(i&&i.includes("application/json")?l=await a.json():l=await a.text(),!a.ok){const c=l&&l.message?l.message:`HTTP error ${a.status}`,n=new Error(c);throw n.status=a.status,n.data=l,n}return l}catch(a){throw console.error(`API Error [${e}]:`,a.message),a}},get(e){return this.request(e,{method:"GET"})},post(e,s){return this.request(e,{method:"POST",body:s})},put(e,s){return this.request(e,{method:"PUT",body:s})},delete(e){return this.request(e,{method:"DELETE"})},upload(e,s){return this.request(e,{method:"POST",body:s})}};function Oe(e,s="command-centre"){const t=e!=null&&e.name?e.name.split(" ").map(a=>a[0]).join("").slice(0,2).toUpperCase():"AC";return`
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
  `}function Fe({title:e,breadcrumb:s="Workspace",actionButton:t=null}){const a=new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});return`
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
  `}function p(e,s="info",t=4e3){const a=document.getElementById("toast-root");if(!a)return;const i="toast-"+Date.now()+"-"+Math.floor(Math.random()*1e3);let l="bi-info-circle-fill";s==="success"?l="bi-check-circle-fill":s==="danger"||s==="error"?l="bi-exclamation-triangle-fill":s==="warning"&&(l="bi-exclamation-circle-fill");const n=`
    <div id="${i}" class="toast align-items-center shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="${s==="success"?"background-color: var(--success-green);":s==="danger"||s==="error"?"background-color: var(--burgundy);":s==="warning"?"background-color: var(--warning-amber); color: #fff;":"background-color: #16243a; color: #fff;"} border-radius: 8px;">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2 py-2 px-3" style="font-size: 13px; font-weight: 500;">
          <i class="bi ${l} fs-6"></i>
          <span>${e}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" onclick="document.getElementById('${i}').remove()"></button>
      </div>
    </div>
  `;a.insertAdjacentHTML("beforeend",n);const d=document.getElementById(i);setTimeout(()=>{d&&d.parentNode&&(d.classList.add("fade"),setTimeout(()=>d.remove(),250))},t)}function se(e,s){e.innerHTML=`
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
  `;const t=document.getElementById("login-form"),a=document.getElementById("login-error-alert"),i=document.getElementById("login-error-text"),l=document.getElementById("login-submit-btn");t.addEventListener("submit",async c=>{c.preventDefault(),a.classList.add("d-none"),l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...';const n=document.getElementById("login-email").value,d=document.getElementById("login-password").value;try{const r=await y.post("/api/auth/login",{email:n,password:d});p(`Welcome back, ${r.user.name}!`,"success"),typeof s=="function"&&s(r.user)}catch(r){i.textContent=r.message||"Authentication failed. Please verify your credentials.",a.classList.remove("d-none")}finally{l.disabled=!1,l.innerHTML='<span>Sign in to workspace</span><i class="bi bi-arrow-right ms-1"></i>'}})}async function He(e){e.innerHTML=`
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading Command Centre...</span>
      </div>
    </div>
  `;try{const s=await y.get("/api/command-centre"),{stats:t,attentionPanel:a,upcomingFixtures:i,topPerformers:l,recentTasks:c}=s,n=l.bestBatsmen[0],d=l.bestBowlers[0],r=l.bestFielders[0];e.innerHTML=`
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
              ${i&&i.length>0?`
                <div class="d-flex flex-column gap-2">
                  ${i.map(o=>`
                    <div class="p-3 rounded border d-flex justify-content-between align-items-center" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
                      <div>
                        <div class="fw-bold" style="font-size: 13.5px; color: var(--text-main);">
                          vs ${o.opponent}
                        </div>
                        <div class="small text-muted mt-1">
                          <i class="bi bi-calendar3 me-1"></i>${o.date} &bull; <i class="bi bi-geo-alt me-1"></i>${o.venue||"Venue TBD"}
                        </div>
                      </div>
                      <div class="text-end">
                        <span class="badge-role badge-batsman">${o.format}</span>
                        <div class="mt-1">
                          <a href="#/matches?id=${o._id}" class="small text-danger text-decoration-none fw-bold">Match Centre &rarr;</a>
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
            ${n?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${n.name}</div>
              <div class="stat-value text-danger my-1">${n.runs} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">runs</span></div>
              <div class="small text-muted mb-2">${n.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${l.bestBatsmen.map((o,m)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${m+1}. ${o.name}</span>
                    <span class="fw-bold">${o.runs} r</span>
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
            ${d?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${d.name}</div>
              <div class="stat-value text-danger my-1">${d.wickets} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">wickets</span></div>
              <div class="small text-muted mb-2">${d.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${l.bestBowlers.map((o,m)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${m+1}. ${o.name}</span>
                    <span class="fw-bold">${o.wickets} w</span>
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
                ${l.bestFielders.map((o,m)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${m+1}. ${o.name}</span>
                    <span class="fw-bold">${o.fieldingPoints} pts</span>
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
                ${c&&c.length>0?c.map(o=>{const m=o.priority==="Critical"?"badge bg-danger":o.priority==="High"?"badge bg-warning text-dark":"badge bg-secondary";return`
                    <tr>
                      <td class="fw-bold">${o.title}</td>
                      <td><span class="${m}">${o.priority}</span></td>
                      <td>${o.owner}</td>
                      <td>${o.dueDate||"No deadline"}</td>
                      <td><span class="badge-role">${o.status}</span></td>
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
    `}}let T=null;function B({title:e,contentHtml:s,footerHtml:t,onOpen:a,onClose:i}){var o,m;C();const l=document.getElementById("modal-root");if(!l)return;const c=`
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
  `;l.innerHTML=c;const n=document.getElementById("active-custom-modal"),d=()=>{C(),typeof i=="function"&&i()};(o=document.getElementById("modal-close-x"))==null||o.addEventListener("click",d),(m=document.getElementById("modal-btn-cancel"))==null||m.addEventListener("click",d),n.addEventListener("click",b=>{b.target===n&&d()});const r=b=>{b.key==="Escape"&&(d(),window.removeEventListener("keydown",r))};return window.addEventListener("keydown",r),T={element:n,escHandler:r,onClose:i},typeof a=="function"&&a(n),n}function C(){T&&(window.removeEventListener("keydown",T.escHandler),T.element&&T.element.parentNode&&T.element.remove(),T=null);const e=document.getElementById("modal-root");e&&(e.innerHTML="")}let je=[],S=null;async function ze(e,s){var a,i,l,c,n;S=s;const t=["Administrator","Manager"].includes(s==null?void 0:s.role);["Administrator","Manager","Coach"].includes(s==null?void 0:s.role),e.innerHTML=`
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
  `,await F(),(a=document.getElementById("player-search-input"))==null||a.addEventListener("input",Ge(F,300)),(i=document.getElementById("player-company-filter"))==null||i.addEventListener("change",F),(l=document.getElementById("player-role-filter"))==null||l.addEventListener("change",F),t&&((c=document.getElementById("btn-import-squad-csv"))==null||c.addEventListener("click",We),(n=document.getElementById("btn-add-player-manual"))==null||n.addEventListener("click",()=>Ce(null)))}async function F(){var l,c,n;const e=((l=document.getElementById("player-search-input"))==null?void 0:l.value)||"",s=((c=document.getElementById("player-company-filter"))==null?void 0:c.value)||"All",t=((n=document.getElementById("player-role-filter"))==null?void 0:n.value)||"All",a=document.getElementById("players-grid-container"),i=document.getElementById("player-count-label");try{const d=new URLSearchParams;e&&d.append("search",e),s!=="All"&&d.append("company",s),t!=="All"&&d.append("cricketRole",t);const r=await y.get(`/api/players?${d.toString()}`);if(je=r.players,i&&(i.textContent=`Displaying ${r.totalCount} active squad members`),!r.players||r.players.length===0){a.innerHTML=`
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-people fs-2 d-block mb-2"></i>
          No squad players match your search or filter criteria.
        </div>
      `;return}a.innerHTML=r.players.map(o=>{const m=o.fullName.split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),b=o.stats||{},g=o.cricketRole==="Batsman"?"badge-batsman":o.cricketRole==="Bowler"?"badge-bowler":o.cricketRole.includes("allrounder")?"badge-allrounder":"badge-role";return`
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card-custom h-100 p-3 d-flex flex-column justify-content-between player-clickable-card" data-player-id="${o._id}" style="cursor: pointer;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="user-avatar-initials" style="width: 40px; height: 40px; font-size: 14px;">
                    ${m}
                  </div>
                  <div>
                    <div class="fw-bold text-main" style="font-size: 13.5px; line-height: 1.2;">${o.fullName}</div>
                    <div class="small text-muted" style="font-size: 11px;">${o.company}</div>
                  </div>
                </div>
                ${o.jerseyNumber!==null&&o.jerseyNumber!==void 0?`
                  <span class="badge border" style="background: rgba(22, 36, 58, 0.05); color: var(--text-main); font-weight: 800; font-size: 12px;">
                    #${o.jerseyNumber}
                  </span>
                `:""}
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge-role ${g}">${o.cricketRole}</span>
                <span class="badge-role" style="font-size: 9.5px;">${o.battingHand}</span>
              </div>
            </div>

            <!-- Season Stats Pill -->
            <div class="p-2 rounded border" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
              <div class="row text-center g-0">
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Matches</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${b.matches||0}</div>
                </div>
                <div class="col-4 border-end" style="border-color: var(--border-color) !important;">
                  <div class="stat-label" style="font-size: 9.5px;">Runs</div>
                  <div class="fw-bold text-danger" style="font-size: 14px;">${b.runs||0}</div>
                </div>
                <div class="col-4">
                  <div class="stat-label" style="font-size: 9.5px;">Wickets</div>
                  <div class="fw-bold text-main" style="font-size: 14px;">${b.wickets||0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `}).join(""),document.querySelectorAll(".player-clickable-card").forEach(o=>{o.addEventListener("click",()=>{const m=o.getAttribute("data-player-id");Ve(m)})})}catch(d){a.innerHTML=`<div class="col-12 alert alert-danger">${d.message}</div>`}}async function Ve(e){try{const s=await y.get(`/api/players/${e}`),{player:t,assignedEquipment:a,attendanceHistory:i}=s,l=["Administrator","Manager"].includes(S==null?void 0:S.role),c=["Administrator","Manager","Coach"].includes(S==null?void 0:S.role),n=t.stats||{},d=`
      <div class="row g-4">
        <!-- Cricket & Employment Overview -->
        <div class="col-md-6 border-end" style="border-color: var(--border-color) !important;">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${t.fullName.split(" ").map(o=>o[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <h4 class="mb-0 text-main">${t.fullName}</h4>
              <div class="text-muted small">${t.company}</div>
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
          ${l?`
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
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Matches</div><div class="fw-bold text-main">${n.matches||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Runs</div><div class="fw-bold text-danger">${n.runs||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Wickets</div><div class="fw-bold text-main">${n.wickets||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Field Pts</div><div class="fw-bold text-gold">${n.fieldingPoints||0}</div></div></div>
          </div>

          <table class="table table-sm small mb-3">
            <tr><td class="text-muted">Balls Faced:</td><td class="fw-bold">${n.ballsFaced||0}</td><td class="text-muted">Fours / Sixes:</td><td class="fw-bold">${n.fours||0} / ${n.sixes||0}</td></tr>
            <tr><td class="text-muted">Balls Bowled:</td><td class="fw-bold">${n.ballsBowled||0}</td><td class="text-muted">Runs Conceded:</td><td class="fw-bold">${n.runsConceded||0}</td></tr>
            <tr><td class="text-muted">Catches:</td><td class="fw-bold">${n.catches||0}</td><td class="text-muted">Stump / Run-out:</td><td class="fw-bold">${n.stumpings||0} / ${n.runOuts||0}</td></tr>
          </table>

          <h6 class="stat-label mb-2 text-gold">Assigned Club Equipment</h6>
          ${a&&a.length>0?`
            <ul class="list-group list-group-flush small mb-3">
              ${a.map(o=>`
                <li class="list-group-item d-flex justify-content-between px-0 py-1 bg-transparent">
                  <span><strong>${o.assetId}</strong> — ${o.name}</span>
                  <span class="badge-role">${o.condition}</span>
                </li>
              `).join("")}
            </ul>
          `:`
            <div class="text-muted small mb-3">No club gear currently assigned to this player.</div>
          `}

          <h6 class="stat-label mb-2 text-gold">Recent Session Attendance</h6>
          ${i&&i.length>0?`
            <div class="d-flex flex-column gap-1 small">
              ${i.slice(0,5).map(o=>`
                <div class="d-flex justify-content-between align-items-center py-1 border-bottom" style="border-color: var(--border-color) !important;">
                  <span>${o.date} &bull; ${o.sessionTitle}</span>
                  <span class="badge-status badge-status-${o.status.toLowerCase().replace(/\s+/g,"")}">${o.status}</span>
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
      ${c?`
        <button type="button" class="btn btn-burgundy" id="btn-edit-player-profile">
          <i class="bi bi-pencil me-1"></i>Edit Profile
        </button>
      `:""}
    `;B({title:`${t.fullName} — Squad Record`,contentHtml:d,footerHtml:r,onOpen:o=>{var m;(m=document.getElementById("btn-edit-player-profile"))==null||m.addEventListener("click",()=>{C(),Ce(t)})}})}catch(s){p(`Failed to load player details: ${s.message}`,"error")}}function Ce(e=null){var i;const s=!!e,t=["Administrator","Manager"].includes(S==null?void 0:S.role),a=`
    <form id="player-form-dialog">
      <div class="row g-3">
        <!-- 2 Columns on desktop, 1 on mobile -->
        <div class="col-md-6">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="p-fullName" class="form-control-custom" value="${(e==null?void 0:e.fullName)||""}" required ${!t&&s?"readonly":""}>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Company *</label>
          <select id="p-company" class="form-select-custom" ${!t&&s?"disabled":""}>
            <option value="Akbar Brothers (Pvt) Ltd" ${(e==null?void 0:e.company)==="Akbar Brothers (Pvt) Ltd"?"selected":""}>Akbar Brothers (Pvt) Ltd</option>
            <option value="Quick Tea (Pvt) Ltd" ${(e==null?void 0:e.company)==="Quick Tea (Pvt) Ltd"?"selected":""}>Quick Tea (Pvt) Ltd</option>
            <option value="Falcon Trading (Pvt) Ltd" ${(e==null?void 0:e.company)==="Falcon Trading (Pvt) Ltd"?"selected":""}>Falcon Trading (Pvt) Ltd</option>
            <option value="Land and Building (Pvt) Ltd" ${(e==null?void 0:e.company)==="Land and Building (Pvt) Ltd"?"selected":""}>Land and Building (Pvt) Ltd</option>
            <option value="Ceylon Coffeeworks (Pvt) Ltd" ${(e==null?void 0:e.company)==="Ceylon Coffeeworks (Pvt) Ltd"?"selected":""}>Ceylon Coffeeworks (Pvt) Ltd</option>
            <option value="Colombo Coffee Company (Pvt) Ltd" ${(e==null?void 0:e.company)==="Colombo Coffee Company (Pvt) Ltd"?"selected":""}>Colombo Coffee Company (Pvt) Ltd</option>
            <option value="Glowbal Retails (Pvt) Ltd" ${(e==null?void 0:e.company)==="Glowbal Retails (Pvt) Ltd"?"selected":""}>Glowbal Retails (Pvt) Ltd</option>
            <option value="Coffee Collective (Pvt) Ltd" ${(e==null?void 0:e.company)==="Coffee Collective (Pvt) Ltd"?"selected":""}>Coffee Collective (Pvt) Ltd</option>
            <option value="Other" ${(e==null?void 0:e.company)==="Other"?"selected":""}>Other</option>
          </select>
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
          <input type="text" id="p-bowlingStyle" class="form-control-custom" placeholder="e.g. Off spin, Fast, Orthodox" value="${(e==null?void 0:e.bowlingStyle)||""}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Jersey Number</label>
          <input type="number" id="p-jerseyNumber" class="form-control-custom" placeholder="e.g. 7" value="${(e==null?void 0:e.jerseyNumber)||""}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Technical Notes</label>
          <input type="text" id="p-notes" class="form-control-custom" placeholder="Coaching or matchday notes" value="${(e==null?void 0:e.notes)||""}">
        </div>

        ${t?`
          <div class="col-12 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
            <div class="fw-bold text-danger small mb-2"><i class="bi bi-lock-fill me-1"></i>Confidential Employment & Contact Data</div>
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Phone Number</label>
            <input type="text" id="p-phone" class="form-control-custom" value="${(e==null?void 0:e.phone)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Work Email</label>
            <input type="email" id="p-workEmail" class="form-control-custom" value="${(e==null?void 0:e.workEmail)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">EPF / Employee Number (Preserves leading 0s)</label>
            <input type="text" id="p-epfNumber" class="form-control-custom" value="${(e==null?void 0:e.epfNumber)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">National Identity Card (NIC - Encrypted)</label>
            <input type="text" id="p-nic" class="form-control-custom" placeholder="NIC number will be encrypted at rest" value="${(e==null?void 0:e.nic)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Joining Date</label>
            <input type="date" id="p-joiningDate" class="form-control-custom" value="${(e==null?void 0:e.joiningDate)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Worksite Location</label>
            <input type="text" id="p-worksite" class="form-control-custom" value="${(e==null?void 0:e.worksite)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">HOD / Reporting Manager</label>
            <input type="text" id="p-reportingManager" class="form-control-custom" value="${(e==null?void 0:e.reportingManager)||""}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Name & Phone</label>
            <input type="text" id="p-emergencyContact" class="form-control-custom" placeholder="Name, Phone, Relationship" value="${(i=e==null?void 0:e.emergencyContact)!=null&&i.name?`${e.emergencyContact.name} - ${e.emergencyContact.phone} (${e.emergencyContact.relationship})`:""}">
          </div>
        `:""}
      </div>
    </form>
  `;B({title:s?`Edit ${e.fullName}`:"Add Squad Member",contentHtml:a,onOpen:l=>{var c;(c=document.getElementById("modal-btn-save"))==null||c.addEventListener("click",async()=>{var r,o,m,b,g,u,v,h,f,w,x,k,I,$,N;const n=(r=document.getElementById("p-fullName"))==null?void 0:r.value;if(!n||!n.trim()){p("Full name is required.","error");return}const d={fullName:n,company:(o=document.getElementById("p-company"))==null?void 0:o.value,cricketRole:(m=document.getElementById("p-cricketRole"))==null?void 0:m.value,battingHand:(b=document.getElementById("p-battingHand"))==null?void 0:b.value,bowlingArm:(g=document.getElementById("p-bowlingArm"))==null?void 0:g.value,bowlingStyle:(u=document.getElementById("p-bowlingStyle"))==null?void 0:u.value,jerseyNumber:(v=document.getElementById("p-jerseyNumber"))==null?void 0:v.value,notes:(h=document.getElementById("p-notes"))==null?void 0:h.value};t&&(d.phone=(f=document.getElementById("p-phone"))==null?void 0:f.value,d.workEmail=(w=document.getElementById("p-workEmail"))==null?void 0:w.value,d.epfNumber=(x=document.getElementById("p-epfNumber"))==null?void 0:x.value,d.nic=(k=document.getElementById("p-nic"))==null?void 0:k.value,d.joiningDate=(I=document.getElementById("p-joiningDate"))==null?void 0:I.value,d.worksite=($=document.getElementById("p-worksite"))==null?void 0:$.value,d.reportingManager=(N=document.getElementById("p-reportingManager"))==null?void 0:N.value);try{s?(await y.put(`/api/players/${e._id}`,d),p(`Updated profile for ${n}.`,"success")):(await y.post("/api/players",d),p(`Player ${n} registered to 2027 squad.`,"success")),C(),F()}catch(D){p(`Error: ${D.message}`,"error")}})}})}function We(){B({title:"Import Squad Register (CSV)",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-csv-import"))==null||t.addEventListener("click",async()=>{const a=document.getElementById("csv-import-file-input");if(!a||!a.files||a.files.length===0){p("Please select a CSV file to upload.","error");return}const i=new FormData;i.append("csvFile",a.files[0]);const l=document.getElementById("btn-submit-csv-import");l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Processing...';const c=document.getElementById("import-results-box");try{const n=await y.upload("/api/players/import-csv",i);c.className="mt-3 p-3 rounded bg-success bg-opacity-10 border border-success small",c.innerHTML=`
            <div class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i>${n.message}</div>
            <div>New players created: <strong>${n.createdCount}</strong></div>
            <div>Existing players updated: <strong>${n.updatedCount}</strong></div>
            ${n.errors&&n.errors.length>0?`<div class="text-danger mt-1">Warnings: ${n.errors.join("; ")}</div>`:""}
          `,c.classList.remove("d-none"),p("CSV squad import successful!","success"),F()}catch(n){c.className="mt-3 p-3 rounded bg-danger bg-opacity-10 border border-danger small text-danger",c.innerHTML=`<i class="bi bi-exclamation-triangle-fill me-1"></i>${n.message}`,c.classList.remove("d-none"),p(`Import error: ${n.message}`,"error")}finally{l.disabled=!1,l.innerHTML="Start Import"}})}})}function Ge(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let J=[],q=null;async function _e(e,s){var a,i,l,c,n;q=s;const t=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role);e.innerHTML=`
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
  `,await V(),(a=document.getElementById("attendance-search"))==null||a.addEventListener("input",Qe(V,300)),(i=document.getElementById("attendance-type-filter"))==null||i.addEventListener("change",V),(l=document.getElementById("btn-export-attendance-csv"))==null||l.addEventListener("click",()=>{window.location.href="/api/reports/attendance/csv"}),(c=document.getElementById("btn-print-attendance"))==null||c.addEventListener("click",()=>{window.print()}),t&&((n=document.getElementById("btn-create-session"))==null||n.addEventListener("click",Xe))}async function V(){var a,i;const e=((a=document.getElementById("attendance-search"))==null?void 0:a.value)||"",s=((i=document.getElementById("attendance-type-filter"))==null?void 0:i.value)||"All",t=document.getElementById("sessions-tbody");try{const l=new URLSearchParams;if(e&&l.append("search",e),s!=="All"&&l.append("type",s),J=(await y.get(`/api/sessions?${l.toString()}`)).sessions,!J||J.length===0){t.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No training or match sessions found.
          </td>
        </tr>
      `;return}t.innerHTML=J.map(n=>{const d=n.type==="Match"?"badge-bowler":"badge-batsman",r=n.rateDisplay!=="—"?"color: var(--success-green); font-weight: 700;":"color: var(--text-muted);";return`
        <tr>
          <td class="text-nowrap fw-bold">${n.date}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${n.title}</div>
            <div class="small text-muted">${n.venue||"No venue specified"}</div>
          </td>
          <td><span class="badge-role ${d}">${n.type}</span></td>
          <td style="${r}; font-size: 14px;">${n.rateDisplay}</td>
          <td><span class="badge-role">${n.completionText}</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-rollcall" data-session-id="${n.id}">
              <i class="bi bi-person-check me-1"></i>Roll Call
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-rollcall").forEach(n=>{n.addEventListener("click",()=>{const d=n.getAttribute("data-session-id");Ke(d)})})}catch(l){t.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${l.message}</td></tr>`}}async function Ke(e){try{const s=await y.get(`/api/sessions/${e}`),{session:t,stats:a}=s,i=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role),l=["Not marked","Attended","Late","Absent","Excused"],c=`
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div>
            <h5 class="mb-1 text-main fw-bold">${t.title}</h5>
            <div class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${t.date} &bull; <i class="bi bi-geo-alt me-1"></i>${t.venue||"Venue TBD"}</div>
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
              ${(t.rollCall||[]).map(n=>{const d=n.player||{};return`
                  <tr data-player-id="${d._id}">
                    <td class="fw-bold text-main">${d.fullName||"Unknown"}</td>
                    <td class="small text-muted">${d.company||"—"}</td>
                    <td style="width: 170px;">
                      <select class="form-select-custom rollcall-status-select" ${i?"":"disabled"}>
                        ${l.map(r=>`
                          <option value="${r}" ${n.status===r?"selected":""}>${r}</option>
                        `).join("")}
                      </select>
                    </td>
                    <td>
                      <input type="text" class="form-control-custom rollcall-note-input" placeholder="Optional note..." value="${n.note||""}" ${i?"":"readonly"}>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;B({title:"Session Roll Call",contentHtml:c,footerHtml:`
        <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
        ${i?'<button type="button" class="btn btn-burgundy" id="btn-save-roll-call">Save Roll Call</button>':""}
      `,onOpen:n=>{var r,o;const d=()=>{const m=n.querySelectorAll(".rollcall-status-select");let b=0,g=0,u=0,v=0,h=0;m.forEach(I=>{I.value==="Attended"?b++:I.value==="Late"?g++:I.value==="Absent"?u++:I.value==="Excused"?v++:h++});const f=b+g+u+v,w=f>0?Math.round((b+g)/f*1e3)/10:null,x=document.getElementById("modal-attendance-rate"),k=document.getElementById("modal-marked-summary");x&&(x.textContent=w!==null?`${w}%`:"—"),k&&(k.textContent=`${f}/${m.length} players marked`)};n.querySelectorAll(".rollcall-status-select").forEach(m=>{m.addEventListener("change",d)}),(r=document.getElementById("btn-set-all-attended"))==null||r.addEventListener("click",()=>{n.querySelectorAll(".rollcall-status-select").forEach(m=>{m.value="Attended"}),d(),p("All squad players set to Attended.","info")}),(o=document.getElementById("btn-save-roll-call"))==null||o.addEventListener("click",async()=>{const m=n.querySelectorAll("#rollcall-table-body tr"),b=[];m.forEach(g=>{var f,w;const u=g.getAttribute("data-player-id"),v=((f=g.querySelector(".rollcall-status-select"))==null?void 0:f.value)||"Not marked",h=((w=g.querySelector(".rollcall-note-input"))==null?void 0:w.value)||"";b.push({player:u,status:v,note:h})});try{await y.put(`/api/sessions/${t._id}/roll-call`,{rollCall:b}),p("Roll call saved successfully!","success"),C(),V()}catch(g){p(`Failed to save roll call: ${g.message}`,"error")}})}})}catch(s){p(`Error: ${s.message}`,"error")}}function Xe(){const e=`
    <form id="create-session-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Session Title *</label>
          <input type="text" id="s-title" class="form-control-custom" placeholder="e.g. NCC Indoor Practice - Nets" required>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Session Type *</label>
          <select id="s-type" class="form-select-custom">
            <option value="Practice">Practice</option>
            <option value="Match">Match Attendance</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label-custom">Date *</label>
          <input type="date" id="s-date" class="form-control-custom" value="${new Date().toISOString().split("T")[0]}" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Venue</label>
          <input type="text" id="s-venue" class="form-control-custom" placeholder="e.g. Oval Indoor Nets (MCA SPL)">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="s-notes" class="form-control-custom" rows="2" placeholder="Specific training drills, equipment requirements..."></textarea>
        </div>
      </div>
    </form>
  `;B({title:"Schedule Practice or Match Attendance",contentHtml:e,onOpen:s=>{var t;(t=document.getElementById("modal-btn-save"))==null||t.addEventListener("click",async()=>{var d,r,o,m,b;const a=(d=document.getElementById("s-title"))==null?void 0:d.value,i=(r=document.getElementById("s-type"))==null?void 0:r.value,l=(o=document.getElementById("s-date"))==null?void 0:o.value,c=(m=document.getElementById("s-venue"))==null?void 0:m.value,n=(b=document.getElementById("s-notes"))==null?void 0:b.value;if(!a||!l){p("Title and date are required.","error");return}try{await y.post("/api/sessions",{title:a,type:i,date:l,venue:c,notes:n}),p(`Session "${a}" scheduled.`,"success"),C(),V()}catch(g){p(`Error: ${g.message}`,"error")}})}})}function Qe(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let Y=[],R=null;async function Ue(e,s){var l,c,n,d,r;R=s;const t=["Administrator","Manager","Coach"].includes(R==null?void 0:R.role);e.innerHTML=`
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
  `,await j(),(l=document.getElementById("match-search"))==null||l.addEventListener("input",Ye(j,300)),(c=document.getElementById("match-format-filter"))==null||c.addEventListener("change",j),(n=document.getElementById("btn-export-matches-csv"))==null||n.addEventListener("click",()=>{window.location.href="/api/reports/matches/csv"}),(d=document.getElementById("btn-print-matches"))==null||d.addEventListener("click",()=>{window.print()}),t&&((r=document.getElementById("btn-create-fixture"))==null||r.addEventListener("click",Je));const i=new URLSearchParams(window.location.hash.split("?")[1]||"").get("id");i&&Be(i)}async function j(){var a,i;const e=((a=document.getElementById("match-search"))==null?void 0:a.value)||"",s=((i=document.getElementById("match-format-filter"))==null?void 0:i.value)||"All",t=document.getElementById("matches-tbody");try{const l=new URLSearchParams;if(e&&l.append("search",e),s!=="All"&&l.append("format",s),Y=(await y.get(`/api/matches?${l.toString()}`)).matches,!Y||Y.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No MCA fixtures logged. Click "Log MCA Fixture" to add scheduled matches.
          </td>
        </tr>
      `;return}t.innerHTML=Y.map(n=>{const d=n.result==="Win"?"badge bg-success":n.result==="Loss"?"badge bg-danger":n.result==="Pending"?"badge bg-warning text-dark":"badge bg-secondary",r=n.ourScore||n.oppositionScore?`<div class="fw-bold">${n.ourScore||"—"}</div><div class="small text-muted">Opp: ${n.oppositionScore||"—"}</div>`:'<span class="text-muted small">Scores pending</span>';return`
        <tr>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">vs ${n.opponent}</div>
            <div class="small text-muted">${n.competition}</div>
          </td>
          <td>
            <div class="fw-bold">${n.date}</div>
            <div class="small text-muted">${n.venue||"Venue TBD"}</div>
          </td>
          <td><span class="badge-role badge-batsman">${n.format}</span></td>
          <td><span class="${d}">${n.result}</span></td>
          <td>${r}</td>
          <td>
            <span class="badge-role ${n.scorecardCount>0?"bg-info bg-opacity-10 text-primary border":""}">
              <i class="bi bi-paperclip me-1"></i>${n.scorecardCount} file(s)
            </span>
            ${n.scoresVerified?'<span class="badge bg-success ms-1" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-match" data-match-id="${n.id}">
              <span>Open match</span> &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-match").forEach(n=>{n.addEventListener("click",()=>{const d=n.getAttribute("data-match-id");Be(d)})})}catch(l){t.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${l.message}</td></tr>`}}async function Be(e){try{const s=await y.get(`/api/matches/${e}`),{match:t,attendanceSummary:a}=s,i=["Administrator","Manager","Coach"].includes(R==null?void 0:R.role),l=t.playingXI||[],c=l.filter(d=>d.status==="Playing XI").length,n=`
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
                  ${l.map(d=>{const r=d.player||{};return`
                      <tr data-px-player-id="${r._id}">
                        <td class="fw-bold">${r.fullName||"Unknown"}</td>
                        <td><span class="badge-role">${r.cricketRole||"Not set"}</span></td>
                        <td class="small text-muted">${r.company||"—"}</td>
                        <td>
                          <select class="form-select-custom px-status-select" ${i?"":"disabled"}>
                            <option value="Playing XI" ${d.status==="Playing XI"?"selected":""}>Playing XI</option>
                            <option value="Reserve" ${d.status==="Reserve"?"selected":""}>Reserve</option>
                            <option value="Unavailable" ${d.status==="Unavailable"?"selected":""}>Unavailable</option>
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
                  ${t.scorecards.map(d=>`
                    <a href="/api/uploads/${d.filename}" target="_blank" class="badge bg-light text-dark border p-2 text-decoration-none">
                      <i class="bi bi-file-earmark-text me-1 text-danger"></i>${d.originalName} (${Math.round(d.size/1024)} KB)
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
                  ${(t.playerStats&&t.playerStats.length>0?t.playerStats:l.filter(d=>d.status==="Playing XI").map(d=>{var r;return{player:d.player,playerName:((r=d.player)==null?void 0:r.fullName)||"Player",batted:!0,runs:0,balls:0,fours:0,sixes:0,notOut:!1,ballsBowled:0,runsConceded:0,wickets:0,catches:0,stumpings:0,runOuts:0}})).map((d,r)=>{var b,g;const o=((b=d.player)==null?void 0:b._id)||d.player,m=d.playerName||((g=d.player)==null?void 0:g.fullName)||"Player";return`
                      <tr data-stat-player-id="${o}">
                        <td><input type="checkbox" class="form-check-input stat-include" checked></td>
                        <td class="fw-bold">${m}</td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runs" style="width: 50px;" value="${d.runs||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-balls" style="width: 50px;" value="${d.balls||0}"></td>
                        <td>
                          <div class="d-flex gap-1">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-4s" style="width: 35px;" value="${d.fours||0}">
                            <input type="number" class="form-control-custom py-1 px-1 text-center stat-6s" style="width: 35px;" value="${d.sixes||0}">
                          </div>
                        </td>
                        <td>
                          <div class="d-flex gap-2">
                            <label><input type="checkbox" class="form-check-input stat-batted" ${d.batted?"checked":""}> Bat</label>
                            <label><input type="checkbox" class="form-check-input stat-notout" ${d.notOut?"checked":""}> NO</label>
                          </div>
                        </td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-ballsbowled" title="Total balls bowled (e.g. 24 balls = 4.0 overs)" style="width: 55px;" value="${d.ballsBowled||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runsconceded" style="width: 50px;" value="${d.runsConceded||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-wickets" style="width: 45px;" value="${d.wickets||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-catches" style="width: 40px;" value="${d.catches||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-stumpings" style="width: 40px;" value="${d.stumpings||0}"></td>
                        <td><input type="number" class="form-control-custom py-1 px-1 text-center stat-runouts" style="width: 40px;" value="${d.runOuts||0}"></td>
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
    `;B({title:`Match Control: vs ${t.opponent}`,contentHtml:n,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:d=>{var m,b,g;const r=d.querySelectorAll('[data-bs-toggle="pill"]');r.forEach(u=>{u.addEventListener("click",v=>{r.forEach(f=>f.classList.remove("active")),d.querySelectorAll(".tab-pane").forEach(f=>f.classList.remove("show","active")),u.classList.add("active");const h=d.querySelector(u.getAttribute("data-bs-target"));h&&h.classList.add("show","active")})});const o=()=>{const u=d.querySelectorAll(".px-status-select");let v=0;u.forEach(f=>{f.value==="Playing XI"&&v++});const h=document.getElementById("playing-xi-counter");h&&(h.textContent=`${v} / 11 Selected`,h.className=v>11?"badge bg-danger":v===11?"badge bg-success":"badge bg-warning text-dark")};d.querySelectorAll(".px-status-select").forEach(u=>{u.addEventListener("change",o)}),(m=document.getElementById("btn-save-playing-xi"))==null||m.addEventListener("click",async()=>{const u=d.querySelectorAll("#playing-xi-tbody tr"),v=[];let h=0;if(u.forEach(f=>{var k;const w=f.getAttribute("data-px-player-id"),x=((k=f.querySelector(".px-status-select"))==null?void 0:k.value)||"Unavailable";x==="Playing XI"&&h++,v.push({playerId:w,status:x})}),h>11){p(`At most 11 players allowed in Playing XI. Selected ${h}.`,"error");return}try{await y.put(`/api/matches/${t._id}/playing-xi`,{selections:v}),p(`Playing XI saved (${h} selected in starting XI).`,"success"),j()}catch(f){p(`Error: ${f.message}`,"error")}}),(b=document.getElementById("btn-upload-scorecard-action"))==null||b.addEventListener("click",async()=>{const u=document.getElementById("scorecard-file-input");if(!u||!u.files||u.files.length===0){p("Please select a PDF or CSV scorecard file to upload.","error");return}const v=new FormData;v.append("scorecardFile",u.files[0]);const h=document.getElementById("btn-upload-scorecard-action");h.disabled=!0,h.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Parsing...';try{const f=await y.upload(`/api/matches/${t._id}/scorecard`,v);if(p(f.message,"success"),f.fileType==="csv"&&f.matched){const w=document.getElementById("score-review-tbody");w&&(w.innerHTML=f.matched.map(x=>`
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
                `).join("")),f.unmatched&&f.unmatched.length>0&&p(`Warning: ${f.unmatched.length} player(s) in CSV could not be matched to squad register.`,"warning")}else if(f.fileType==="pdf"){const w=document.getElementById("pdf-extracted-box"),x=document.getElementById("pdf-text-content");w&&x&&(x.textContent=f.extractedText||"No plain text found (scanned image PDF).",w.classList.remove("d-none"))}}catch(f){p(`Upload failed: ${f.message}`,"error")}finally{h.disabled=!1,h.innerHTML='<i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview'}}),(g=document.getElementById("btn-confirm-verified-scores"))==null||g.addEventListener("click",async()=>{var x,k,I;const u=d.querySelectorAll("#score-review-tbody tr"),v=[];u.forEach($=>{var me,ue,pe,be,ve,ge,fe,ye,he,xe,we,$e,Ee,ke;if(!((me=$.querySelector(".stat-include"))==null?void 0:me.checked))return;const D=$.getAttribute("data-stat-player-id"),W=(ue=$.querySelector("td:nth-child(2)"))==null?void 0:ue.textContent.trim(),G=parseInt(((pe=$.querySelector(".stat-runs"))==null?void 0:pe.value)||0,10),_=parseInt(((be=$.querySelector(".stat-balls"))==null?void 0:be.value)||0,10),K=parseInt(((ve=$.querySelector(".stat-4s"))==null?void 0:ve.value)||0,10),X=parseInt(((ge=$.querySelector(".stat-6s"))==null?void 0:ge.value)||0,10),Q=(fe=$.querySelector(".stat-batted"))==null?void 0:fe.checked,U=(ye=$.querySelector(".stat-notout"))==null?void 0:ye.checked,le=parseInt(((he=$.querySelector(".stat-ballsbowled"))==null?void 0:he.value)||0,10),Te=parseInt(((xe=$.querySelector(".stat-runsconceded"))==null?void 0:xe.value)||0,10),qe=parseInt(((we=$.querySelector(".stat-wickets"))==null?void 0:we.value)||0,10),Re=parseInt((($e=$.querySelector(".stat-catches"))==null?void 0:$e.value)||0,10),Ne=parseInt(((Ee=$.querySelector(".stat-stumpings"))==null?void 0:Ee.value)||0,10),De=parseInt(((ke=$.querySelector(".stat-runouts"))==null?void 0:ke.value)||0,10);v.push({player:D,playerName:W,batted:Q,notOut:U,runs:G,balls:_,fours:K,sixes:X,ballsBowled:le,runsConceded:Te,wickets:qe,catches:Re,stumpings:Ne,runOuts:De})});const h=(x=document.getElementById("m-ourScore"))==null?void 0:x.value,f=(k=document.getElementById("m-oppScore"))==null?void 0:k.value,w=(I=document.getElementById("m-result"))==null?void 0:I.value;try{await y.post(`/api/matches/${t._id}/verify-scores`,{playerStats:v,ourScore:h,oppositionScore:f,result:w}),p("Official match scores confirmed and season leaderboards updated!","success"),C(),j()}catch($){p(`Verification failed: ${$.message}`,"error")}})}})}catch(s){p(`Failed to open match details: ${s.message}`,"error")}}function Je(){const e=`
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
  `;B({title:"Log Official MCA League Fixture",contentHtml:e,onOpen:s=>{var t;(t=document.getElementById("modal-btn-save"))==null||t.addEventListener("click",async()=>{var o,m,b,g,u,v,h;const a=(o=document.getElementById("m-opponent"))==null?void 0:o.value,i=(m=document.getElementById("m-competition"))==null?void 0:m.value,l=(b=document.getElementById("m-date"))==null?void 0:b.value,c=(g=document.getElementById("m-format"))==null?void 0:g.value,n=(u=document.getElementById("m-result-init"))==null?void 0:u.value,d=(v=document.getElementById("m-venue"))==null?void 0:v.value,r=(h=document.getElementById("m-notes"))==null?void 0:h.value;if(!a||!l){p("Opponent and date are required.","error");return}try{await y.post("/api/matches",{opponent:a,competition:i,date:l,format:c,result:n,venue:d,notes:r}),p(`Fixture vs ${a} created with linked attendance session.`,"success"),C(),j()}catch(f){p(`Error: ${f.message}`,"error")}})}})}function Ye(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}async function Ze(e){var s,t,a;e.innerHTML=`
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
  `,await Ie(),(s=document.getElementById("btn-apply-lead-filters"))==null||s.addEventListener("click",Ie),(t=document.getElementById("btn-export-leaderboard-csv"))==null||t.addEventListener("click",()=>{window.location.href="/api/leaderboards/export-csv"}),(a=document.getElementById("btn-print-leaderboard"))==null||a.addEventListener("click",()=>{window.print()})}async function Ie(){var l,c,n;const e=((l=document.getElementById("lead-season-filter"))==null?void 0:l.value)||"All",s=((c=document.getElementById("lead-comp-filter"))==null?void 0:c.value)||"All",t=((n=document.getElementById("lead-format-filter"))==null?void 0:n.value)||"All",a=document.getElementById("leaderboard-cards-container"),i=document.getElementById("leaderboard-tbody");try{const d=new URLSearchParams;e!=="All"&&d.append("season",e),s!=="All"&&d.append("competition",s),t!=="All"&&d.append("format",t);const r=await y.get(`/api/leaderboards?${d.toString()}`),{topBatsmen:o,topBowlers:m,topFielders:b,tableData:g}=r;if(a.innerHTML=`
      <!-- Best Batsmen Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Batsman</span>
            <span class="badge-role badge-batsman">Runs & SR</span>
          </div>
          ${o&&o.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${o[0].playerName}</div>
              <div class="stat-value text-danger my-1">${o[0].runs} <span class="small text-muted fs-6">runs</span></div>
              <div class="small text-muted">SR: ${o[0].batSR} &bull; Avg: ${o[0].batAvg!==null?o[0].batAvg:"—"}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Batsmen</div>
              ${o.map((u,v)=>`
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
          ${m&&m.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${m[0].playerName}</div>
              <div class="stat-value text-danger my-1">${m[0].wickets} <span class="small text-muted fs-6">wickets</span></div>
              <div class="small text-muted">Econ: ${m[0].economy!==null?m[0].economy:"—"} &bull; Balls: ${m[0].ballsBowled}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Bowlers</div>
              ${m.map((u,v)=>`
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
          ${b&&b.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${b[0].playerName}</div>
              <div class="stat-value text-gold my-1">${b[0].fieldingPoints} <span class="small text-muted fs-6">points</span></div>
              <div class="small text-muted">Catches: ${b[0].catches} &bull; Stump: ${b[0].stumpings} &bull; RO: ${b[0].runOuts}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Fielders</div>
              ${b.map((u,v)=>`
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
    `,!g||g.length===0){i.innerHTML='<tr><td colspan="12" class="text-center py-4 text-muted">No squad statistics found.</td></tr>';return}i.innerHTML=g.map(u=>`
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
    `).join("")}catch(d){a.innerHTML=`<div class="col-12 alert alert-danger">${d.message}</div>`}}let O=[],M=null;async function et(e,s){var a,i,l,c,n;M=s;const t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);e.innerHTML=`
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
  `,await Promise.all([oe(),H()]),(a=document.getElementById("inventory-search"))==null||a.addEventListener("input",st(H,300)),(i=document.getElementById("inventory-category-filter"))==null||i.addEventListener("change",H),(l=document.getElementById("inventory-condition-filter"))==null||l.addEventListener("change",H),(c=document.getElementById("btn-export-inventory-csv"))==null||c.addEventListener("click",()=>{window.location.href="/api/reports/equipment/csv"}),t&&((n=document.getElementById("btn-add-inventory-item"))==null||n.addEventListener("click",()=>Ae(null)))}async function oe(){try{const e=await y.get("/api/equipment/stats"),{stats:s}=e;document.getElementById("stat-total-items").textContent=s.totalRecords,document.getElementById("stat-count-pending").textContent=s.countPending,document.getElementById("stat-damaged-lost").textContent=s.damagedOrLost,document.getElementById("stat-low-stock").textContent=s.lowStock}catch(e){console.error("Failed to load inventory metrics:",e)}}async function H(){var i,l,c;const e=((i=document.getElementById("inventory-search"))==null?void 0:i.value)||"",s=((l=document.getElementById("inventory-category-filter"))==null?void 0:l.value)||"All",t=((c=document.getElementById("inventory-condition-filter"))==null?void 0:c.value)||"All",a=document.getElementById("inventory-tbody");try{const n=new URLSearchParams;if(e&&n.append("search",e),s!=="All"&&n.append("category",s),t!=="All"&&n.append("condition",t),O=(await y.get(`/api/equipment?${n.toString()}`)).equipment,!O||O.length===0){a.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted">No equipment items found.</td></tr>';return}const r=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);a.innerHTML=O.map(o=>{const m=o.condition==="Good"?"badge bg-success":o.condition==="Fair"?"badge bg-info text-dark":o.condition==="Inspect"?"badge bg-warning text-dark":o.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",b=o.countVerified?'<span class="badge bg-success bg-opacity-10 text-success border border-success" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':'<span class="badge bg-warning bg-opacity-10 text-dark border border-warning" style="font-size: 9px;"><i class="bi bi-hourglass-split"></i> Count pending</span>',g=o.isLowStock?`<span class="badge bg-danger ms-1" style="font-size: 9px;">Low Stock (Min: ${o.minimumStock})</span>`:"",u=o.assignedPlayer?`<div class="small text-muted"><i class="bi bi-person me-1"></i>Assigned: ${o.assignedPlayer.fullName}</div>`:"";return`
        <tr>
          <td class="fw-bold font-monospace text-main">${o.assetId}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${o.name}</div>
            <div class="small text-muted">${o.location}</div>
            ${u}
          </td>
          <td><span class="badge-role">${o.category}</span></td>
          <td>
            <div class="fw-bold fs-6">${o.quantity} <span class="small text-muted fw-normal">${o.unit}</span></div>
            <div>${b} ${g}</div>
          </td>
          <td><span class="${m}">${o.condition}</span></td>
          <td class="small">
            <div>Insp: ${o.lastInspectedDate||"Awaiting check"}</div>
            ${o.expiryDate?`<div class="text-muted">Exp: ${o.expiryDate}</div>`:""}
          </td>
          <td class="text-end text-nowrap">
            ${r?`
              <button class="btn btn-sm btn-outline-burgundy py-1 px-2 btn-verify-stock" data-item-id="${o.id}" title="Physically verify stock count">
                <i class="bi bi-check2-square me-1"></i>Verify
              </button>
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-edit-equipment" data-item-id="${o.id}" title="Edit asset details">
                <i class="bi bi-pencil"></i>
              </button>
            `:`
              <button class="btn btn-sm btn-light-custom py-1 px-2 btn-view-equipment" data-item-id="${o.id}">
                View
              </button>
            `}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-verify-stock").forEach(o=>{o.addEventListener("click",()=>{const m=o.getAttribute("data-item-id");tt(m)})}),document.querySelectorAll(".btn-edit-equipment, .btn-view-equipment").forEach(o=>{o.addEventListener("click",()=>{const m=o.getAttribute("data-item-id"),b=O.find(g=>g.id===m);Ae(b)})})}catch(n){a.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${n.message}</td></tr>`}}function tt(e){const s=O.find(a=>a.id===e);if(!s)return;const t=`
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
  `;B({title:`Verify Physical Stock: ${s.assetId}`,contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-verify-stock">Confirm Verification</button>
    `,onOpen:a=>{var i;(i=document.getElementById("btn-submit-verify-stock"))==null||i.addEventListener("click",async()=>{var n,d;const l=(n=document.getElementById("v-quantity"))==null?void 0:n.value,c=(d=document.getElementById("v-notes"))==null?void 0:d.value;if(l===""||isNaN(parseInt(l,10))){p("Please enter a valid count number.","error");return}try{await y.put(`/api/equipment/${s.id}/verify-count`,{verifiedQuantity:parseInt(l,10),notes:c}),p(`Physical count verified for ${s.name}.`,"success"),C(),await Promise.all([oe(),H()])}catch(r){p(`Error: ${r.message}`,"error")}})}})}async function Ae(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);let a=[];try{a=(await y.get("/api/players")).players||[]}catch{}const i=`
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
            ${a.map(l=>{var c;return`
              <option value="${l._id}" ${((c=e==null?void 0:e.assignedPlayer)==null?void 0:c._id)===l._id||(e==null?void 0:e.assignedPlayer)===l._id?"selected":""}>
                ${l.fullName} (${l.company})
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
  `;B({title:s?`Edit Asset: ${e.assetId}`:"Add New Equipment Record",contentHtml:i,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:l=>{var c;t&&((c=document.getElementById("modal-btn-save"))==null||c.addEventListener("click",async()=>{var k,I,$,N,D,W,G,_,K,X,Q,U;const n=(k=document.getElementById("eq-assetId"))==null?void 0:k.value,d=(I=document.getElementById("eq-name"))==null?void 0:I.value,r=($=document.getElementById("eq-category"))==null?void 0:$.value,o=(N=document.getElementById("eq-condition"))==null?void 0:N.value,m=(D=document.getElementById("eq-quantity"))==null?void 0:D.value,b=(W=document.getElementById("eq-unit"))==null?void 0:W.value,g=(G=document.getElementById("eq-minStock"))==null?void 0:G.value,u=(_=document.getElementById("eq-location"))==null?void 0:_.value,v=(K=document.getElementById("eq-assignedPlayer"))==null?void 0:K.value,h=(X=document.getElementById("eq-expiryDate"))==null?void 0:X.value,f=(Q=document.getElementById("eq-cost"))==null?void 0:Q.value,w=(U=document.getElementById("eq-notes"))==null?void 0:U.value;if(!d||!n){p("Asset ID and Name are required.","error");return}const x={assetId:n,name:d,category:r,condition:o,quantity:parseInt(m,10),unit:b,minimumStock:parseInt(g,10),location:u,assignedPlayer:v||null,expiryDate:h||null,costLKR:parseFloat(f||0),notes:w};try{s?(await y.put(`/api/equipment/${e.id}`,x),p(`Asset ${n} updated.`,"success")):(await y.post("/api/equipment",x),p(`Asset ${n} created.`,"success")),C(),await Promise.all([oe(),H()])}catch(le){p(`Error: ${le.message}`,"error")}}))}})}function st(e,s){let t;return function(...a){clearTimeout(t),t=setTimeout(()=>e.apply(this,a),s)}}let Z=[],ee=null;async function at(e,s){var a,i;ee=s;const t=["Administrator","Manager","Coach"].includes(ee==null?void 0:ee.role);e.innerHTML=`
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
  `,await Le(),(a=document.getElementById("btn-print-inspections"))==null||a.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-new-inspection"))==null||i.addEventListener("click",nt))}async function Le(){const e=document.getElementById("inspections-tbody");try{if(Z=(await y.get("/api/inspections")).inspections,!Z||Z.length===0){e.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No inspection records logged yet. Click "Log Inspection Check" to conduct a weekly gear check.
          </td>
        </tr>
      `;return}e.innerHTML=Z.map(t=>{const a=t.equipment||{},i=t.condition==="Good"?"badge bg-success":t.condition==="Fair"?"badge bg-info text-dark":t.condition==="Inspect"?"badge bg-warning text-dark":t.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",l=t.photo?`
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
          <td>${l}</td>
        </tr>
      `}).join("")}catch(s){e.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${s.message}</td></tr>`}}async function nt(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;B({title:"Conduct Weekly Gear Inspection",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-inspection">Save Inspection</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-inspection"))==null||a.addEventListener("click",async()=>{var b,g,u,v,h,f;const i=(b=document.getElementById("ins-equipmentId"))==null?void 0:b.value,l=(g=document.getElementById("ins-date"))==null?void 0:g.value,c=(u=document.getElementById("ins-condition"))==null?void 0:u.value,n=(v=document.getElementById("ins-notes"))==null?void 0:v.value,d=(h=document.getElementById("ins-action"))==null?void 0:h.value,r=(f=document.getElementById("ins-photo"))==null?void 0:f.files[0];if(!i||!l||!c){p("Equipment, date, and condition are required.","error");return}const o=new FormData;o.append("equipmentId",i),o.append("date",l),o.append("condition",c),o.append("notes",n),o.append("correctiveAction",d),r&&o.append("evidencePhoto",r);const m=document.getElementById("btn-submit-inspection");m.disabled=!0,m.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Saving...';try{await y.upload("/api/inspections",o),p("Weekly inspection logged successfully!","success"),C(),Le()}catch(w){p(`Error: ${w.message}`,"error")}finally{m.disabled=!1,m.innerHTML="Save Inspection"}})}})}let z=[],te=null;async function lt(e,s){var a,i;te=s;const t=["Administrator","Manager","Coach"].includes(te==null?void 0:te.role);e.innerHTML=`
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
  `,await de(),(a=document.getElementById("btn-print-damage"))==null||a.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-file-damage"))==null||i.addEventListener("click",it))}async function de(){const e=document.getElementById("damage-tbody");try{if(z=(await y.get("/api/damage-reports")).reports,!z||z.length===0){e.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No active damage incidents recorded. All club assets operational.
          </td>
        </tr>
      `;return}e.innerHTML=z.map(t=>{const a=t.equipment||{},i=t.severity==="Unsafe"?"badge bg-danger":t.severity==="High"?"badge bg-warning text-dark":t.severity==="Medium"?"badge bg-info text-dark":"badge bg-secondary",l=t.status==="Open"?"badge bg-danger":t.status==="In progress"?"badge bg-warning text-dark":"badge bg-success",c=t.photo?`
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
            ${c}
          </td>
          <td>${t.reporter}</td>
          <td>
            <span class="${l}">${t.status}</span>
            ${t.followUps&&t.followUps.length>0?`<div class="small text-muted mt-1">${t.followUps.length} follow-up(s)</div>`:""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-2 btn-followup-damage" data-report-id="${t._id}">
              Follow-up &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-followup-damage").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-report-id");ot(a)})})}catch(s){e.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${s.message}</td></tr>`}}async function it(){let e=[];try{e=(await y.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;B({title:"File Equipment Damage Report",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-damage">File Report</button>
    `,onOpen:t=>{var a;(a=document.getElementById("btn-submit-damage"))==null||a.addEventListener("click",async()=>{var b,g,u,v,h,f;const i=(b=document.getElementById("dmg-equipmentId"))==null?void 0:b.value,l=(g=document.getElementById("dmg-date"))==null?void 0:g.value,c=(u=document.getElementById("dmg-severity"))==null?void 0:u.value,n=(v=document.getElementById("dmg-details"))==null?void 0:v.value,d=(h=document.getElementById("dmg-action"))==null?void 0:h.value,r=(f=document.getElementById("dmg-photo"))==null?void 0:f.files[0];if(!i||!l||!n){p("Equipment, date, and incident details are required.","error");return}const o=new FormData;o.append("equipmentId",i),o.append("date",l),o.append("severity",c),o.append("incidentDetails",n),o.append("correctiveAction",d),r&&o.append("incidentPhoto",r);const m=document.getElementById("btn-submit-damage");m.disabled=!0,m.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Filing...';try{await y.upload("/api/damage-reports",o),p("Damage report filed and asset condition updated.","success"),C(),de()}catch(w){p(`Error: ${w.message}`,"error")}finally{m.disabled=!1,m.innerHTML="File Report"}})}})}function ot(e){var a,i;const s=z.find(l=>l._id===e);if(!s)return;const t=`
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
            ${s.followUps.map(l=>`
              <li class="list-group-item bg-transparent px-0 py-2 border-bottom">
                <div class="d-flex justify-content-between text-muted" style="font-size: 11px;">
                  <span>${l.date} &bull; ${l.author}</span>
                </div>
                <div class="fw-bold text-main mt-1">${l.note}</div>
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
  `;B({title:"Damage Incident Follow-up",contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-save-follow-up">Save Follow-up</button>
    `,onOpen:l=>{var c;(c=document.getElementById("btn-save-follow-up"))==null||c.addEventListener("click",async()=>{var r,o;const n=(r=document.getElementById("fu-status"))==null?void 0:r.value,d=(o=document.getElementById("fu-note"))==null?void 0:o.value;if(!d&&!n){p("Please enter a note or status change.","error");return}try{await y.post(`/api/damage-reports/${s._id}/follow-up`,{status:n,note:d}),p("Follow-up record saved.","success"),C(),de()}catch(m){p(`Error: ${m.message}`,"error")}})}})}let A=null,P=null;async function dt(e,s){var a,i,l,c;P=s;const t=["Administrator","Manager","Coach"].includes(P==null?void 0:P.role);e.innerHTML=`
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
  `,await ce(),(a=document.getElementById("btn-suggest-actions"))==null||a.addEventListener("click",ct),(i=document.getElementById("btn-export-tasks-csv"))==null||i.addEventListener("click",()=>{window.location.href="/api/reports/tasks/csv"}),(l=document.getElementById("btn-print-tasks"))==null||l.addEventListener("click",()=>{window.print()}),t&&((c=document.getElementById("btn-create-task"))==null||c.addEventListener("click",()=>Se(null)))}async function ce(){const e=document.getElementById("kanban-columns-container");try{A=(await y.get("/api/tasks")).board;const t=[{key:"todo",label:"To do",count:A.counts.todo,items:A.todo},{key:"inProgress",label:"In progress",count:A.counts.inProgress,items:A.inProgress},{key:"blocked",label:"Blocked",count:A.counts.blocked,items:A.blocked},{key:"done",label:"Done",count:A.counts.done,items:A.done}];e.innerHTML=t.map(a=>`
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span class="stat-label text-main">${a.label}</span>
          <span class="badge rounded-pill bg-light text-dark border px-2 py-1" style="font-size: 11px;">${a.count}</span>
        </div>

        <div class="kanban-column-body flex-1" style="min-height: 200px;">
          ${a.items.map(i=>{const l=i.priority==="Critical"?"badge bg-danger":i.priority==="High"?"badge bg-warning text-dark":i.priority==="Medium"?"badge bg-info text-dark":"badge bg-secondary";return`
              <div class="kanban-task-card" data-task-id="${i._id}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="${l}" style="font-size: 9.5px;">${i.priority}</span>
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
    `).join(""),document.querySelectorAll(".btn-edit-task").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-task-id"),c=[...A.todo,...A.inProgress,...A.blocked,...A.done].find(n=>n._id===i);Se(c)})})}catch(s){e.innerHTML=`<div class="alert alert-danger col-12">${s.message}</div>`}}async function ct(){B({title:"Suggest Management Actions (AI & Rule Engine)",contentHtml:`
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
  `,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:async s=>{try{const t=await y.get("/api/tasks/suggestions"),a=document.getElementById("ai-source-badge");a&&(a.textContent=t.source);const i=document.getElementById("ai-suggestions-list");if(!t.suggestions||t.suggestions.length===0){i.innerHTML='<div class="text-muted text-center py-4">No urgent operational bottlenecks detected. All records are up to date!</div>';return}i.innerHTML=t.suggestions.map((l,c)=>{const n=l.priority==="Critical"?"badge bg-danger":l.priority==="High"?"badge bg-warning text-dark":"badge bg-info text-dark";return`
            <div class="card-custom p-3 mb-2" id="sug-card-${c}">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="${n}" style="font-size: 10px;">${l.priority}</span>
                <span class="badge-role" style="font-size: 9.5px;">${l.category||"Operations"}</span>
              </div>
              <div class="fw-bold text-main mb-1" style="font-size: 13.5px;">${l.title}</div>
              <p class="small text-muted mb-3" style="line-height: 1.4;">${l.explanation}</p>
              <div class="text-end">
                <button type="button" class="btn btn-sm btn-burgundy py-1 px-3 btn-add-sug-task" data-sug-index="${c}">
                  <i class="bi bi-plus-lg me-1"></i>+ Add
                </button>
              </div>
            </div>
          `}).join(""),i.querySelectorAll(".btn-add-sug-task").forEach(l=>{l.addEventListener("click",async()=>{const c=parseInt(l.getAttribute("data-sug-index"),10),n=t.suggestions[c];l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Adding...';try{await y.post("/api/tasks",{title:n.title,details:n.explanation,category:n.category||"Operations",priority:n.priority||"Medium",status:"To do",source:t.source.includes("AI")?"AI Assistant":"Rule Engine"}),p(`Task "${n.title}" added to Kanban board.`,"success"),l.className="btn btn-sm btn-success py-1 px-3",l.innerHTML='<i class="bi bi-check2"></i> Added',ce()}catch(d){p(`Error: ${d.message}`,"error"),l.disabled=!1,l.innerHTML="+ Add"}})})}catch(t){document.getElementById("ai-suggestions-list").innerHTML=`<div class="alert alert-danger">${t.message}</div>`}}})}function Se(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(P==null?void 0:P.role),a=`
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
          <input type="text" id="t-owner" class="form-control-custom" value="${(e==null?void 0:e.owner)||(P==null?void 0:P.name)||"Unassigned"}" ${t?"":"disabled"}>
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
  `;B({title:s?`Edit Task: ${e.title}`:"Create Operational Task",contentHtml:a,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:i=>{var l;t&&((l=document.getElementById("modal-btn-save"))==null||l.addEventListener("click",async()=>{var u,v,h,f,w,x,k;const c=(u=document.getElementById("t-title"))==null?void 0:u.value,n=(v=document.getElementById("t-category"))==null?void 0:v.value,d=(h=document.getElementById("t-priority"))==null?void 0:h.value,r=(f=document.getElementById("t-status"))==null?void 0:f.value,o=(w=document.getElementById("t-owner"))==null?void 0:w.value,m=(x=document.getElementById("t-dueDate"))==null?void 0:x.value,b=(k=document.getElementById("t-details"))==null?void 0:k.value;if(!c||!c.trim()){p("Task title is required.","error");return}const g={title:c,category:n,priority:d,status:r,owner:o,dueDate:m,details:b};try{s?(await y.put(`/api/tasks/${e._id}`,g),p("Task updated successfully.","success")):(await y.post("/api/tasks",g),p(`Task "${c}" created.`,"success")),C(),ce()}catch(I){p(`Error: ${I.message}`,"error")}}))}})}async function rt(e){e.innerHTML=`
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
  `,document.querySelectorAll(".btn-print-report").forEach(s=>{s.addEventListener("click",()=>{const t=s.getAttribute("data-report-type");window.location.hash=`#/${t}`,setTimeout(()=>window.print(),500)})})}let E=null;async function mt(e,s){var i,l,c;E=s;const t=(E==null?void 0:E.role)==="Administrator",a=document.documentElement.getAttribute("data-theme")||"light";e.innerHTML=`
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
              ${E!=null&&E.name?E.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase():"AC"}
            </div>
            <div>
              <div class="fw-bold fs-6 text-main">${(E==null?void 0:E.name)||"Administrator"}</div>
              <div class="small text-muted">${(E==null?void 0:E.email)||"admin@akbarcricket.lk"}</div>
              <span class="badge bg-danger mt-1">${(E==null?void 0:E.role)||"Administrator"}</span>
            </div>
          </div>

          <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
            <div class="stat-label mb-1">Last Workspace Session</div>
            <div class="small text-muted">${E!=null&&E.lastLogin?new Date(E.lastLogin).toLocaleString():"Active session"}</div>
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
  `,(i=document.getElementById("change-password-form"))==null||i.addEventListener("submit",async n=>{var o,m;n.preventDefault();const d=(o=document.getElementById("pw-current"))==null?void 0:o.value,r=(m=document.getElementById("pw-new"))==null?void 0:m.value;try{await y.put("/api/auth/change-password",{currentPassword:d,newPassword:r}),p("Password updated successfully.","success"),document.getElementById("change-password-form").reset()}catch(b){p(`Password update failed: ${b.message}`,"error")}}),(l=document.getElementById("settings-theme-switch"))==null||l.addEventListener("change",n=>{const r=n.target.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),localStorage.setItem("acc_theme",r),p(`Switched to ${r} mode.`,"info")}),t&&(Pe(),(c=document.getElementById("btn-create-user-modal"))==null||c.addEventListener("click",ut))}async function Pe(){const e=document.getElementById("users-list-container");if(e)try{const t=(await y.get("/api/users")).users||[];e.innerHTML=`
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
    `}catch(s){e.innerHTML=`<div class="text-danger small">${s.message}</div>`}}function ut(){B({title:"Provision New User Account",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-create-user"))==null||t.addEventListener("click",async()=>{var n,d,r,o;const a=(n=document.getElementById("u-name"))==null?void 0:n.value,i=(d=document.getElementById("u-email"))==null?void 0:d.value,l=(r=document.getElementById("u-role"))==null?void 0:r.value,c=(o=document.getElementById("u-password"))==null?void 0:o.value;if(!a||!i||!c||!l){p("All fields are required.","error");return}if(c.length<8){p("Password must be at least 8 characters.","error");return}try{await y.post("/api/users",{name:a,email:i,role:l,password:c}),p(`Account created for ${a} (${l}).`,"success"),C(),Pe()}catch(m){p(`Failed to create user: ${m.message}`,"error")}})}})}let L=null;const ie={"command-centre":{title:"Command Centre",breadcrumb:"Workspace / Operations",render:He,actionButton:{id:"hdr-action-btn",label:"Explore Matches",icon:"bi-trophy"}},players:{title:"Player Profiles",breadcrumb:"Workspace / Roster",render:ze,actionButton:null},attendance:{title:"Practice & Attendance",breadcrumb:"Workspace / Training",render:_e,actionButton:null},matches:{title:"MCA Match Centre",breadcrumb:"Workspace / League Fixtures",render:Ue,actionButton:null},leaderboards:{title:"Player Leaderboards",breadcrumb:"Workspace / Performance",render:Ze,actionButton:null},inventory:{title:"Gear & Inventory",breadcrumb:"Club Operations / Assets",render:et,actionButton:null},inspections:{title:"Weekly Inspections",breadcrumb:"Club Operations / Safety",render:at,actionButton:null},"damage-reports":{title:"Damage Reports",breadcrumb:"Club Operations / Incidents",render:lt,actionButton:null},tasks:{title:"Tasks & AI Assistant",breadcrumb:"Club Operations / Kanban",render:dt,actionButton:null},reports:{title:"Reports & Exports",breadcrumb:"Management / Registers",render:rt,actionButton:null},settings:{title:"Settings & Users",breadcrumb:"Management / Administration",render:mt,actionButton:null}};function pt(){const e=localStorage.getItem("acc_theme")||"light";document.documentElement.setAttribute("data-theme",e)}function bt(){const s=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),localStorage.setItem("acc_theme",s);const t=document.getElementById("theme-toggle-icon");t&&(t.className=s==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars"),p(`Switched to ${s} mode.`,"info")}function re(e="command-centre"){var m,b,g,u;const s=document.getElementById("app"),t=ie[e]||ie["command-centre"];s.innerHTML=`
    <div id="app-layout">
      <!-- Sidebar -->
      ${Oe(L,e)}

      <!-- Main Content Area -->
      <div class="app-main-wrapper">
        <!-- Header -->
        ${Fe({title:t.title,breadcrumb:t.breadcrumb,actionButton:t.actionButton})}

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
  `,(m=document.getElementById("header-theme-toggle"))==null||m.addEventListener("click",bt),(b=document.getElementById("header-refresh-btn"))==null||b.addEventListener("click",()=>{Me(ne()),p("View refreshed.","info")});const a=document.getElementById("app-sidebar"),i=document.getElementById("mobile-backdrop"),l=document.getElementById("mobile-menu-toggle"),c=()=>{a==null||a.classList.add("show-mobile"),i==null||i.classList.add("show")},n=()=>{a==null||a.classList.remove("show-mobile"),i==null||i.classList.remove("show")};l==null||l.addEventListener("click",c),i==null||i.addEventListener("click",n),a==null||a.querySelectorAll(".sidebar-nav-link").forEach(v=>{v.addEventListener("click",n)}),(g=document.getElementById("sidebar-logout-btn"))==null||g.addEventListener("click",async()=>{try{await y.post("/api/auth/logout"),L=null,p("Signed out of workspace.","info"),se(document.getElementById("app"),ae)}catch{L=null,se(document.getElementById("app"),ae)}}),t.actionButton&&((u=document.getElementById(t.actionButton.id))==null||u.addEventListener("click",()=>{window.location.hash="#/matches"}));const d=document.documentElement.getAttribute("data-theme")||"light",r=document.getElementById("theme-toggle-icon");r&&(r.className=d==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars");const o=document.getElementById("main-view-container");t.render(o,L)}function ne(){const e=window.location.hash.replace(/^#\/?/,"").split("?")[0];return ie[e]?e:"command-centre"}function Me(e){L&&re(e)}function ae(e){L=e;const s=ne();re(s)}window.addEventListener("auth:expired",()=>{L&&(L=null,p("Your session has expired. Please sign in again.","warning"),se(document.getElementById("app"),ae))});window.addEventListener("hashchange",()=>{L&&Me(ne())});async function vt(){pt();const e=document.getElementById("app");try{L=(await y.get("/api/auth/me")).user,re(ne())}catch{L=null,se(e,ae)}}vt();
