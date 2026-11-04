(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const h={async request(e,s={}){const t={credentials:"include",headers:{Accept:"application/json",...s.headers},...s};t.body&&!(t.body instanceof FormData)&&typeof t.body=="object"&&(t.headers["Content-Type"]="application/json",t.body=JSON.stringify(t.body));try{const l=await fetch(e,t);l.status===401&&!e.includes("/api/auth/login")&&window.dispatchEvent(new CustomEvent("auth:expired"));const n=l.headers.get("content-type");let a=null;if(n&&n.includes("application/json")?a=await l.json():a=await l.text(),!l.ok){const m=a&&a.message?a.message:`HTTP error ${l.status}`,i=new Error(m);throw i.status=l.status,i.data=a,i}return a}catch(l){throw console.error(`API Error [${e}]:`,l.message),l}},get(e){return this.request(e,{method:"GET"})},post(e,s){return this.request(e,{method:"POST",body:s})},put(e,s){return this.request(e,{method:"PUT",body:s})},delete(e){return this.request(e,{method:"DELETE"})},upload(e,s){return this.request(e,{method:"POST",body:s})}},be="/assets/akbar-cricket-logo-JyUOSPOt.png";function tt(e,s="command-centre"){const t=e!=null&&e.name?e.name.split(" ").map(l=>l[0]).join("").slice(0,2).toUpperCase():"AC";return`
    <aside class="app-sidebar" id="app-sidebar">
      <!-- Brand & Crest -->
      <div class="sidebar-brand-box">
        <div class="brand-crest brand-crest-image">
          <img src="${be}" alt="Akbar Cricket Club — 1 Team 1 Dream">
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
        ${["Administrator","Manager"].includes(e==null?void 0:e.role)?`
          <a href="#/payments" class="sidebar-nav-link ${s==="payments"?"active":""}" data-nav="payments">
            <i class="bi bi-cash-stack"></i><span>Monthly player payments</span>
          </a>
          <a href="#/payment-rules" class="sidebar-nav-link ${s==="payment-rules"?"active":""}" data-nav="payment-rules">
            <i class="bi bi-sliders"></i><span>Rates &amp; reward rules</span>
          </a>
        `:""}
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
  `}function st({title:e,breadcrumb:s="Workspace",actionButton:t=null}){const l=new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});return`
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
          <span>${l}</span>
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
  `}function g(e,s="info",t=4e3){const l=document.getElementById("toast-root");if(!l)return;const n="toast-"+Date.now()+"-"+Math.floor(Math.random()*1e3);let a="bi-info-circle-fill";s==="success"?a="bi-check-circle-fill":s==="danger"||s==="error"?a="bi-exclamation-triangle-fill":s==="warning"&&(a="bi-exclamation-circle-fill");const i=`
    <div id="${n}" class="toast align-items-center shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="${s==="success"?"background-color: var(--success-green);":s==="danger"||s==="error"?"background-color: var(--burgundy);":s==="warning"?"background-color: var(--warning-amber); color: #fff;":"background-color: #16243a; color: #fff;"} border-radius: 8px;">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2 py-2 px-3" style="font-size: 13px; font-weight: 500;">
          <i class="bi ${a} fs-6"></i>
          <span>${e}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" onclick="document.getElementById('${n}').remove()"></button>
      </div>
    </div>
  `;l.insertAdjacentHTML("beforeend",i);const o=document.getElementById(n);setTimeout(()=>{o&&o.parentNode&&(o.classList.add("fade"),setTimeout(()=>o.remove(),250))},t)}function ve(e,s){e.innerHTML=`
    <div class="login-split-page">
      <!-- Left Branding Panel (53% width on desktop) -->
      <div class="login-brand-panel">
        <div class="login-top-strip"></div>
        <div class="login-circles-decor"></div>

        <div>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="brand-crest brand-crest-image mb-0" style="width: 100px; height: 50px;">
              <img src="${be}" alt="Akbar Cricket Club — 1 Team 1 Dream">
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
  `;const t=document.getElementById("login-form"),l=document.getElementById("login-error-alert"),n=document.getElementById("login-error-text"),a=document.getElementById("login-submit-btn");t.addEventListener("submit",async m=>{m.preventDefault(),l.classList.add("d-none"),a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...';const i=document.getElementById("login-email").value,o=document.getElementById("login-password").value;try{const d=await h.post("/api/auth/login",{email:i,password:o});g(`Welcome back, ${d.user.name}!`,"success"),typeof s=="function"&&s(d.user)}catch(d){n.textContent=d.message||"Authentication failed. Please verify your credentials.",l.classList.remove("d-none")}finally{a.disabled=!1,a.innerHTML='<span>Sign in to workspace</span><i class="bi bi-arrow-right ms-1"></i>'}})}async function at(e){e.innerHTML=`
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading Command Centre...</span>
      </div>
    </div>
  `;try{const s=await h.get("/api/command-centre"),{stats:t,attentionPanel:l,upcomingFixtures:n,topPerformers:a,recentTasks:m}=s,i=a.bestBatsmen[0],o=a.bestBowlers[0],d=a.bestFielders[0];e.innerHTML=`
      <!-- Wide Navy Gradient Banner -->
      <div class="command-banner">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center position-relative" style="z-index: 2;">
          <div class="d-flex align-items-start gap-3 mb-3 mb-md-0">
            <div class="brand-crest brand-crest-image" style="width: 108px; height: 54px; flex-shrink: 0;">
              <img src="${be}" alt="Akbar Cricket Club — 1 Team 1 Dream">
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
          <img src="${be}" alt="" aria-hidden="true" style="width: 100%; height: 100%; object-fit: contain;">
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
              ${n&&n.length>0?`
                <div class="d-flex flex-column gap-2">
                  ${n.map(u=>`
                    <div class="p-3 rounded border d-flex justify-content-between align-items-center" style="background-color: var(--body-bg); border-color: var(--border-color) !important;">
                      <div>
                        <div class="fw-bold" style="font-size: 13.5px; color: var(--text-main);">
                          vs ${u.opponent}
                        </div>
                        <div class="small text-muted mt-1">
                          <i class="bi bi-calendar3 me-1"></i>${u.date} &bull; <i class="bi bi-geo-alt me-1"></i>${u.venue||"Venue TBD"}
                        </div>
                      </div>
                      <div class="text-end">
                        <span class="badge-role badge-batsman">${u.format}</span>
                        <div class="mt-1">
                          <a href="#/matches?id=${u._id}" class="small text-danger text-decoration-none fw-bold">Match Centre &rarr;</a>
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
                    ${l.unverifiedStock}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Open Damage Reports</div>
                    <div class="small text-muted">Gear requiring repair or decommissioning</div>
                  </div>
                  <span class="badge ${l.openDamageReports>0?"bg-danger text-white":"bg-light text-dark border"} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${l.openDamageReports}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Low Stock (Verified)</div>
                    <div class="small text-muted">Verified quantities below minimum reserves</div>
                  </div>
                  <span class="badge ${l.lowStockItems>0?"bg-warning text-dark":"bg-light text-dark border"} px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${l.lowStockItems}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-2">
                  <div>
                    <div class="fw-bold text-main" style="font-size: 12.5px;">Unmarked Attendance Sessions</div>
                    <div class="small text-muted">Practice or match roll calls pending</div>
                  </div>
                  <span class="badge bg-light text-dark border px-2 py-1" style="font-size: 12px; font-weight: 700;">
                    ${l.unmarkedAttendanceSessions}
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
                ${a.bestBatsmen.map((u,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${u.name}</span>
                    <span class="fw-bold">${u.runs} r</span>
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
                ${a.bestBowlers.map((u,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${u.name}</span>
                    <span class="fw-bold">${u.wickets} w</span>
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
            ${d?`
              <div class="fw-bold" style="font-size: 16px; color: var(--text-main);">${d.name}</div>
              <div class="stat-value text-gold my-1">${d.fieldingPoints} <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">pts</span></div>
              <div class="small text-muted mb-2">${d.company}</div>
              <div class="border-top pt-2 mt-2">
                <div class="small text-muted fw-bold mb-1" style="font-size: 10px; text-transform: uppercase;">Top Three Contenders</div>
                ${a.bestFielders.map((u,c)=>`
                  <div class="d-flex justify-content-between small py-1">
                    <span>${c+1}. ${u.name}</span>
                    <span class="fw-bold">${u.fieldingPoints} pts</span>
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
                ${m&&m.length>0?m.map(u=>{const c=u.priority==="Critical"?"badge bg-danger":u.priority==="High"?"badge bg-warning text-dark":"badge bg-secondary";return`
                    <tr>
                      <td class="fw-bold">${u.title}</td>
                      <td><span class="${c}">${u.priority}</span></td>
                      <td>${u.owner}</td>
                      <td>${u.dueDate||"No deadline"}</td>
                      <td><span class="badge-role">${u.status}</span></td>
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
    `}}let W=null;function I({title:e,contentHtml:s,footerHtml:t,onOpen:l,onClose:n}){var u,c;A();const a=document.getElementById("modal-root");if(!a)return;const m=`
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
  `;a.innerHTML=m;const i=document.getElementById("active-custom-modal"),o=()=>{A(),typeof n=="function"&&n()};(u=document.getElementById("modal-close-x"))==null||u.addEventListener("click",o),(c=document.getElementById("modal-btn-cancel"))==null||c.addEventListener("click",o),i.addEventListener("click",r=>{r.target===i&&o()});const d=r=>{r.key==="Escape"&&(o(),window.removeEventListener("keydown",d))};return window.addEventListener("keydown",d),W={element:i,escHandler:d,onClose:n},typeof l=="function"&&l(i),i}function A(){W&&(window.removeEventListener("keydown",W.escHandler),W.element&&W.element.parentNode&&W.element.remove(),W=null);const e=document.getElementById("modal-root");e&&(e.innerHTML="")}function v(e){return String(e??"").replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}const De=["Akbar Brothers (Pvt) Ltd","Quick Tea (Pvt) Ltd","Falcon Trading (Pvt) Ltd","Land and Building (Pvt) Ltd","Ceylon Coffeeworks (Pvt) Ltd","Colombo Coffee Company (Pvt) Ltd","Glowbal Retails (Pvt) Ltd","Coffee Collective (Pvt) Ltd"];let je=[],B=null;async function lt(e,s){var l,n,a,m,i;B=s;const t=["Administrator","Manager"].includes(s==null?void 0:s.role);["Administrator","Manager","Coach"].includes(s==null?void 0:s.role),e.innerHTML=`
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
  `,await X(),(l=document.getElementById("player-search-input"))==null||l.addEventListener("input",ot(X,300)),(n=document.getElementById("player-company-filter"))==null||n.addEventListener("change",X),(a=document.getElementById("player-role-filter"))==null||a.addEventListener("change",X),t&&((m=document.getElementById("btn-import-squad-csv"))==null||m.addEventListener("click",it),(i=document.getElementById("btn-add-player-manual"))==null||i.addEventListener("click",()=>xe(null)))}async function X(){var i,o,d;const e=["Administrator","Manager"].includes(B==null?void 0:B.role),s=["Administrator","Manager","Coach"].includes(B==null?void 0:B.role),t=((i=document.getElementById("player-search-input"))==null?void 0:i.value)||"",l=((o=document.getElementById("player-company-filter"))==null?void 0:o.value)||"All",n=((d=document.getElementById("player-role-filter"))==null?void 0:d.value)||"All",a=document.getElementById("players-grid-container"),m=document.getElementById("player-count-label");try{const u=new URLSearchParams;t&&u.append("search",t),l!=="All"&&u.append("company",l),n!=="All"&&u.append("cricketRole",n);const c=await h.get(`/api/players?${u.toString()}`);if(je=c.players,m&&(m.textContent=`Displaying ${c.totalCount} active squad members`),!c.players||c.players.length===0){a.innerHTML=`
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-people fs-2 d-block mb-2"></i>
          No squad players match your search or filter criteria.
        </div>
      `;return}a.innerHTML=c.players.map(r=>{const f=r.fullName.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase(),p=r.stats||{},b=r.cricketRole==="Batsman"?"badge-batsman":r.cricketRole==="Bowler"?"badge-bowler":r.cricketRole.includes("allrounder")?"badge-allrounder":"badge-role";return`
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card-custom h-100 p-3 d-flex flex-column justify-content-between player-clickable-card" data-player-id="${r._id}" style="cursor: pointer;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-2">
                  <div class="user-avatar-initials" style="width: 40px; height: 40px; font-size: 14px;">
                    ${f}
                  </div>
                  <div>
                    <div class="fw-bold text-main" style="font-size: 13.5px; line-height: 1.2;">${v(r.fullName)}</div>
                    <div class="small text-muted" style="font-size: 11px;">${v(r.company)}</div>
                  </div>
                </div>
                ${r.jerseyNumber!==null&&r.jerseyNumber!==void 0?`
                  <span class="badge border" style="background: rgba(22, 36, 58, 0.05); color: var(--text-main); font-weight: 800; font-size: 12px;">
                    #${r.jerseyNumber}
                  </span>
                `:""}
              </div>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge-role ${b}">${r.cricketRole}</span>
                <span class="badge-role" style="font-size: 9.5px;">${r.battingHand}</span>
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
                <button type="button" class="btn btn-sm btn-outline-burgundy btn-edit-player" data-player-id="${r._id}">
                  <i class="bi bi-pencil me-1"></i>Edit
                </button>
                ${e?`
                  <button type="button" class="btn btn-sm btn-outline-danger btn-delete-player" data-player-id="${r._id}">
                    <i class="bi bi-trash me-1"></i>Delete
                  </button>
                `:""}
              </div>
            `:""}
          </div>
        </div>
      `}).join(""),document.querySelectorAll(".player-clickable-card").forEach(r=>{r.addEventListener("click",()=>{const f=r.getAttribute("data-player-id");nt(f)})}),document.querySelectorAll(".btn-edit-player, .btn-delete-player").forEach(r=>{r.addEventListener("click",f=>{f.stopPropagation();const p=je.find(b=>b._id===r.dataset.playerId);p&&(r.classList.contains("btn-edit-player")?xe(p):Ve(p))})})}catch(u){a.innerHTML=`<div class="col-12 alert alert-danger">${u.message}</div>`}}async function nt(e){var s,t,l,n,a,m,i;try{const o=await h.get(`/api/players/${e}`),{player:d,assignedEquipment:u,attendanceHistory:c}=o,r=["Administrator","Manager"].includes(B==null?void 0:B.role),f=["Administrator","Manager","Coach"].includes(B==null?void 0:B.role),p=d.stats||{},b=`
      <div class="row g-4">
        <!-- Cricket & Employment Overview -->
        <div class="col-md-6 border-end" style="border-color: var(--border-color) !important;">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="user-avatar-initials" style="width: 52px; height: 52px; font-size: 18px;">
              ${d.fullName.split(" ").map(y=>y[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <h4 class="mb-0 text-main">${v(d.fullName)}</h4>
              <div class="text-muted small">${v(d.company)}</div>
              ${d.jerseyNumber?`<span class="badge bg-danger mt-1">Jersey #${d.jerseyNumber}</span>`:""}
            </div>
          </div>

          <h6 class="stat-label mt-3 mb-2 text-gold">Cricket Technical Profile</h6>
          <table class="table table-sm table-borderless small mb-3">
            <tr><td class="text-muted w-50">Cricket Role:</td><td class="fw-bold text-main">${d.cricketRole}</td></tr>
            <tr><td class="text-muted">Batting Hand:</td><td class="fw-bold text-main">${d.battingHand}</td></tr>
            <tr><td class="text-muted">Bowling Arm:</td><td class="fw-bold text-main">${d.bowlingArm}</td></tr>
            <tr><td class="text-muted">Bowling Style:</td><td class="fw-bold text-main">${d.bowlingStyle||"N/A"}</td></tr>
            <tr><td class="text-muted">Notes:</td><td>${d.notes||"None"}</td></tr>
          </table>

          <!-- Confidential Information (Admin & Manager only) -->
          ${r?`
            <div class="p-3 rounded border mt-3" style="background: rgba(158, 35, 50, 0.04); border-color: rgba(158, 35, 50, 0.2) !important;">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="stat-label text-danger"><i class="bi bi-shield-lock-fill me-1"></i>Confidential Employment Details</span>
                <span class="badge bg-secondary" style="font-size: 9px;">Privileged</span>
              </div>
              <table class="table table-sm table-borderless small mb-0">
                <tr><td class="text-muted w-50">Work Email:</td><td class="fw-bold text-main">${d.workEmail||"—"}</td></tr>
                <tr><td class="text-muted">Phone Number:</td><td class="fw-bold text-main">${d.phone||"—"}</td></tr>
                <tr><td class="text-muted">EPF / Employee No:</td><td class="fw-bold text-main">${d.epfNumber||"—"}</td></tr>
                <tr><td class="text-muted">National Identity (NIC):</td><td class="fw-bold text-main font-monospace">${d.nic||"—"}</td></tr>
                <tr><td class="text-muted">Joining Date:</td><td class="fw-bold text-main">${d.joiningDate||"—"}</td></tr>
                <tr><td class="text-muted">Worksite Location:</td><td class="fw-bold text-main">${d.worksite||"—"}</td></tr>
                <tr><td class="text-muted">HOD / Reporting Manager:</td><td class="fw-bold text-main">${d.reportingManager||"—"}</td></tr>
                ${d.emergencyContact&&d.emergencyContact.name?`
                  <tr><td class="text-muted">Emergency Contact:</td><td class="fw-bold text-main">${d.emergencyContact.name} (${d.emergencyContact.phone} - ${d.emergencyContact.relationship})</td></tr>
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
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Matches</div><div class="fw-bold text-main">${p.matches||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Runs</div><div class="fw-bold text-danger">${p.runs||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Wickets</div><div class="fw-bold text-main">${p.wickets||0}</div></div></div>
            <div class="col-3"><div class="p-2 border rounded"><div class="stat-label">Field Pts</div><div class="fw-bold text-gold">${p.fieldingPoints||0}</div></div></div>
          </div>

          <table class="table table-sm small mb-3">
            <tr><td class="text-muted">Balls Faced:</td><td class="fw-bold">${p.ballsFaced||0}</td><td class="text-muted">Fours / Sixes:</td><td class="fw-bold">${p.fours||0} / ${p.sixes||0}</td></tr>
            <tr><td class="text-muted">Balls Bowled:</td><td class="fw-bold">${p.ballsBowled||0}</td><td class="text-muted">Runs Conceded:</td><td class="fw-bold">${p.runsConceded||0}</td></tr>
            <tr><td class="text-muted">Catches:</td><td class="fw-bold">${p.catches||0}</td><td class="text-muted">Stump / Run-out:</td><td class="fw-bold">${p.stumpings||0} / ${p.runOuts||0}</td></tr>
          </table>

          <h6 class="stat-label mb-2 text-gold">Jersey Kit</h6>
          <table class="table table-sm table-borderless small mb-3">
            <tr><td class="text-muted w-50">Printed Name:</td><td>${v(((s=d.jerseyKit)==null?void 0:s.printedName)||"Not set")}</td></tr>
            <tr><td class="text-muted">Shirt / Trouser Size:</td><td>${v(((t=d.jerseyKit)==null?void 0:t.shirtSize)||"Not set")} / ${v(((l=d.jerseyKit)==null?void 0:l.trouserSize)||"Not set")}</td></tr>
            <tr><td class="text-muted">Kit Status / Quantity:</td><td>${v(((n=d.jerseyKit)==null?void 0:n.status)||"Not ordered")} / ${((a=d.jerseyKit)==null?void 0:a.quantity)||0}</td></tr>
            <tr><td class="text-muted">Issued Date:</td><td>${v(((m=d.jerseyKit)==null?void 0:m.issuedDate)||"Not set")}</td></tr>
            <tr><td class="text-muted">Kit Notes:</td><td>${v(((i=d.jerseyKit)==null?void 0:i.notes)||"None")}</td></tr>
          </table>
          ${r?`<h6 class="stat-label mb-2 text-gold">Allowance Eligibility</h6><div class="small mb-3">${d.allowanceEligible!==!1?"Eligible, subject to monthly attendance rules":"Ineligible"}${d.allowanceEligibilityNote?`<div class="text-muted">${v(d.allowanceEligibilityNote)}</div>`:""}</div>`:""}

          <h6 class="stat-label mb-2 text-gold">Assigned Club Equipment</h6>
          ${u&&u.length>0?`
            <ul class="list-group list-group-flush small mb-3">
              ${u.map(y=>`
                <li class="list-group-item d-flex justify-content-between px-0 py-1 bg-transparent">
                  <span><strong>${y.assetId}</strong> — ${y.name}</span>
                  <span class="badge-role">${y.condition}</span>
                </li>
              `).join("")}
            </ul>
          `:`
            <div class="text-muted small mb-3">No club gear currently assigned to this player.</div>
          `}

          <h6 class="stat-label mb-2 text-gold">Recent Session Attendance</h6>
          ${c&&c.length>0?`
            <div class="d-flex flex-column gap-1 small">
              ${c.slice(0,5).map(y=>`
                <div class="d-flex justify-content-between align-items-center py-1 border-bottom" style="border-color: var(--border-color) !important;">
                  <span>${y.date} &bull; ${y.sessionTitle}</span>
                  <span class="badge-status badge-status-${y.status.toLowerCase().replace(/\s+/g,"")}">${y.status}</span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small">No session records logged.</div>
          `}
        </div>
      </div>
    `,x=`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      ${r?`
        <button type="button" class="btn btn-outline-danger" id="btn-delete-player-profile">
          <i class="bi bi-trash me-1"></i>Delete Player
        </button>
      `:""}
      ${f?`
        <button type="button" class="btn btn-burgundy" id="btn-edit-player-profile">
          <i class="bi bi-pencil me-1"></i>Edit Profile
        </button>
      `:""}
    `;I({title:`${v(d.fullName)} — Squad Record`,contentHtml:b,footerHtml:x,onOpen:y=>{var $,w;($=document.getElementById("btn-delete-player-profile"))==null||$.addEventListener("click",()=>Ve(d)),(w=document.getElementById("btn-edit-player-profile"))==null||w.addEventListener("click",()=>{A(),xe(d)})}})}catch(o){g(`Failed to load player details: ${o.message}`,"error")}}function xe(e=null){var a,m,i,o,d,u,c,r,f;const s=!!e,t=["Administrator","Manager"].includes(B==null?void 0:B.role),l=!!(e!=null&&e.company)&&!De.includes(e.company),n=`
    <form id="player-form-dialog">
      <div class="row g-3">
        <!-- 2 Columns on desktop, 1 on mobile -->
        <div class="col-md-6">
          <label class="form-label-custom">Full Name *</label>
          <input type="text" id="p-fullName" class="form-control-custom" value="${v(e==null?void 0:e.fullName)}" required ${!t&&s?"readonly":""}>
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Company *</label>
          <select id="p-company" class="form-select-custom" ${!t&&s?"disabled":""}>
            ${De.map(p=>`<option value="${p}" ${(e==null?void 0:e.company)===p?"selected":""}>${p}</option>`).join("")}
            <option value="Other" ${l?"selected":""}>Other</option>
          </select>
          <div id="p-company-other-group" class="mt-2 ${l?"":"d-none"}">
            <label for="p-company-other" class="form-label-custom">Company Name *</label>
            <input type="text" id="p-company-other" class="form-control-custom" placeholder="Enter company name" value="${v(l&&e.company!=="Other"?e.company:"")}" ${!t&&s?"disabled":""}>
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
          <input type="text" id="p-bowlingStyle" class="form-control-custom" placeholder="e.g. Off spin, Fast, Orthodox" value="${v(e==null?void 0:e.bowlingStyle)}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Jersey Number</label>
          <input type="number" id="p-jerseyNumber" class="form-control-custom" placeholder="e.g. 7" value="${(e==null?void 0:e.jerseyNumber)??""}">
        </div>

        <div class="col-md-6">
          <label class="form-label-custom">Technical Notes</label>
          <input type="text" id="p-notes" class="form-control-custom" placeholder="Coaching or matchday notes" value="${v(e==null?void 0:e.notes)}">
        </div>

        ${t?`
          <div class="col-12 mt-3 pt-3 border-top"><div class="fw-bold text-main small">Jersey Kit</div></div>
          <div class="col-md-6"><label for="p-kit-name" class="form-label-custom">Printed Name</label><input id="p-kit-name" class="form-control-custom" maxlength="80" value="${v((a=e==null?void 0:e.jerseyKit)==null?void 0:a.printedName)}"></div>
          <div class="col-md-6"><label for="p-kit-shirt" class="form-label-custom">Shirt Size</label><input id="p-kit-shirt" class="form-control-custom" maxlength="80" placeholder="e.g. M, L, XL" value="${v((m=e==null?void 0:e.jerseyKit)==null?void 0:m.shirtSize)}"></div>
          <div class="col-md-6"><label for="p-kit-trouser" class="form-label-custom">Trouser Size</label><input id="p-kit-trouser" class="form-control-custom" maxlength="80" placeholder="e.g. M or 32" value="${v((i=e==null?void 0:e.jerseyKit)==null?void 0:i.trouserSize)}"></div>
          <div class="col-md-6"><label for="p-kit-status" class="form-label-custom">Kit Status</label><select id="p-kit-status" class="form-select-custom">${["Not ordered","Ordered","Issued","Returned"].map(p=>{var b;return`<option ${((b=e==null?void 0:e.jerseyKit)==null?void 0:b.status)===p?"selected":""}>${p}</option>`}).join("")}</select></div>
          <div class="col-md-6"><label for="p-kit-quantity" class="form-label-custom">Kit Quantity</label><input id="p-kit-quantity" class="form-control-custom" type="number" min="0" max="100" step="1" value="${((o=e==null?void 0:e.jerseyKit)==null?void 0:o.quantity)??0}" required></div>
          <div class="col-md-6"><label for="p-kit-issued" class="form-label-custom">Kit Issue Date</label><input id="p-kit-issued" class="form-control-custom" type="date" value="${v((d=e==null?void 0:e.jerseyKit)==null?void 0:d.issuedDate)}"></div>
          <div class="col-12"><label for="p-kit-notes" class="form-label-custom">Kit Notes</label><input id="p-kit-notes" class="form-control-custom" maxlength="500" value="${v((u=e==null?void 0:e.jerseyKit)==null?void 0:u.notes)}"></div>
          <div class="col-12 border-top pt-3"><label class="d-flex align-items-center gap-2"><input id="p-allowance-eligible" type="checkbox" ${(e==null?void 0:e.allowanceEligible)!==!1?"checked":""}>Eligible for allowances (monthly attendance rules also apply)</label></div>
          <div class="col-12"><label for="p-allowance-note" class="form-label-custom">Allowance Eligibility Note</label><input id="p-allowance-note" class="form-control-custom" maxlength="500" value="${v(e==null?void 0:e.allowanceEligibilityNote)}"></div>
          <div class="col-12 mt-3 pt-3 border-top" style="border-color: var(--border-color) !important;">
            <div class="fw-bold text-danger small mb-2"><i class="bi bi-lock-fill me-1"></i>Confidential Employment & Contact Data</div>
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Phone Number</label>
            <input type="text" id="p-phone" class="form-control-custom" value="${v(e==null?void 0:e.phone)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Work Email</label>
            <input type="email" id="p-workEmail" class="form-control-custom" value="${v(e==null?void 0:e.workEmail)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">EPF / Employee Number (Preserves leading 0s)</label>
            <input type="text" id="p-epfNumber" class="form-control-custom" value="${v(e==null?void 0:e.epfNumber)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">National Identity Card (NIC - Encrypted)</label>
            <input type="text" id="p-nic" class="form-control-custom" placeholder="NIC number will be encrypted at rest" value="${v(e==null?void 0:e.nic)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Joining Date</label>
            <input type="date" id="p-joiningDate" class="form-control-custom" value="${v(e==null?void 0:e.joiningDate)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Worksite Location</label>
            <input type="text" id="p-worksite" class="form-control-custom" value="${v(e==null?void 0:e.worksite)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">HOD / Reporting Manager</label>
            <input type="text" id="p-reportingManager" class="form-control-custom" value="${v(e==null?void 0:e.reportingManager)}">
          </div>

          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Name</label>
            <input type="text" id="p-emergencyContactName" class="form-control-custom" value="${v((c=e==null?void 0:e.emergencyContact)==null?void 0:c.name)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Phone</label>
            <input type="text" id="p-emergencyContactPhone" class="form-control-custom" value="${v((r=e==null?void 0:e.emergencyContact)==null?void 0:r.phone)}">
          </div>
          <div class="col-md-6">
            <label class="form-label-custom">Emergency Contact Relationship</label>
            <input type="text" id="p-emergencyContactRelationship" class="form-control-custom" value="${v((f=e==null?void 0:e.emergencyContact)==null?void 0:f.relationship)}">
          </div>
        `:""}
      </div>
    </form>
  `;I({title:s?`Edit ${v(e.fullName)}`:"Add Squad Member",contentHtml:n,onOpen:p=>{const b=p.querySelector("#p-company"),x=p.querySelector("#p-company-other"),y=()=>{const w=b.value==="Other";p.querySelector("#p-company-other-group").classList.toggle("d-none",!w),x.required=w&&t,x.disabled=!w||!t};b.addEventListener("change",y),y();const $=p.querySelector("#modal-btn-save");$==null||$.addEventListener("click",async()=>{var k,U,j,F,H,O,z,V,K,_,Y,le,ne,ie,oe,de,se;const w=(k=document.getElementById("p-fullName"))==null?void 0:k.value;if(!w||!w.trim()){g("Full name is required.","error");return}const S=b.value==="Other"?t?x.value.trim():e.company:b.value;if(t&&!S){g("Please enter the company name.","error"),x.focus();return}if(!p.querySelector("#player-form-dialog").reportValidity())return;const E={fullName:w,company:S,cricketRole:(U=document.getElementById("p-cricketRole"))==null?void 0:U.value,battingHand:(j=document.getElementById("p-battingHand"))==null?void 0:j.value,bowlingArm:(F=document.getElementById("p-bowlingArm"))==null?void 0:F.value,bowlingStyle:(H=document.getElementById("p-bowlingStyle"))==null?void 0:H.value,jerseyNumber:(O=document.getElementById("p-jerseyNumber"))==null?void 0:O.value,notes:(z=document.getElementById("p-notes"))==null?void 0:z.value};t&&(E.allowanceEligible=document.getElementById("p-allowance-eligible").checked,E.allowanceEligibilityNote=document.getElementById("p-allowance-note").value,E.jerseyKit={printedName:document.getElementById("p-kit-name").value,shirtSize:document.getElementById("p-kit-shirt").value,trouserSize:document.getElementById("p-kit-trouser").value,status:document.getElementById("p-kit-status").value,quantity:Number(document.getElementById("p-kit-quantity").value),issuedDate:document.getElementById("p-kit-issued").value,notes:document.getElementById("p-kit-notes").value},E.phone=(V=document.getElementById("p-phone"))==null?void 0:V.value,E.workEmail=(K=document.getElementById("p-workEmail"))==null?void 0:K.value,E.epfNumber=(_=document.getElementById("p-epfNumber"))==null?void 0:_.value,E.nic=(Y=document.getElementById("p-nic"))==null?void 0:Y.value,E.joiningDate=(le=document.getElementById("p-joiningDate"))==null?void 0:le.value,E.worksite=(ne=document.getElementById("p-worksite"))==null?void 0:ne.value,E.reportingManager=(ie=document.getElementById("p-reportingManager"))==null?void 0:ie.value,E.emergencyContact={name:(oe=document.getElementById("p-emergencyContactName"))==null?void 0:oe.value,phone:(de=document.getElementById("p-emergencyContactPhone"))==null?void 0:de.value,relationship:(se=document.getElementById("p-emergencyContactRelationship"))==null?void 0:se.value}),$.disabled=!0;try{s?(await h.put(`/api/players/${e._id}`,E),g(`Updated profile for ${w}.`,"success")):(await h.post("/api/players",E),g(`Player ${w} registered to 2027 squad.`,"success")),A(),X()}catch(ce){g(`Error: ${ce.message}`,"error")}finally{$.disabled=!1}})}})}function Ve(e){I({title:"Delete Player",contentHtml:`<p>Delete <strong>${v(e.fullName)}</strong> from the active squad?</p>
      <p class="small text-muted mb-0">Existing attendance, match, and equipment records will be retained.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-player">Delete Player</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-player");t.addEventListener("click",async()=>{t.disabled=!0;try{await h.delete(`/api/players/${e._id}`),g(`Player ${e.fullName} removed from the active squad.`,"success"),A(),await X()}catch(l){g(`Failed to delete player: ${l.message}`,"error"),t.disabled=!1}})}})}function it(){I({title:"Import Squad Register (CSV)",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-csv-import"))==null||t.addEventListener("click",async()=>{const l=document.getElementById("csv-import-file-input");if(!l||!l.files||l.files.length===0){g("Please select a CSV file to upload.","error");return}const n=new FormData;n.append("csvFile",l.files[0]);const a=document.getElementById("btn-submit-csv-import");a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Processing...';const m=document.getElementById("import-results-box");try{const i=await h.upload("/api/players/import-csv",n);m.className="mt-3 p-3 rounded bg-success bg-opacity-10 border border-success small",m.innerHTML=`
            <div class="fw-bold text-success mb-1"><i class="bi bi-check-circle-fill me-1"></i>${i.message}</div>
            <div>New players created: <strong>${i.createdCount}</strong></div>
            <div>Existing players updated: <strong>${i.updatedCount}</strong></div>
            ${i.errors&&i.errors.length>0?`<div class="text-danger mt-1">Warnings: ${i.errors.join("; ")}</div>`:""}
          `,m.classList.remove("d-none"),g("CSV squad import successful!","success"),X()}catch(i){m.className="mt-3 p-3 rounded bg-danger bg-opacity-10 border border-danger small text-danger",m.innerHTML=`<i class="bi bi-exclamation-triangle-fill me-1"></i>${i.message}`,m.classList.remove("d-none"),g(`Import error: ${i.message}`,"error")}finally{a.disabled=!1,a.innerHTML="Start Import"}})}})}function ot(e,s){let t;return function(...l){clearTimeout(t),t=setTimeout(()=>e.apply(this,l),s)}}let Z=[],q=null;async function dt(e,s){var l,n,a,m,i;q=s;const t=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role);e.innerHTML=`
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
  `,await ee(),(l=document.getElementById("attendance-search"))==null||l.addEventListener("input",mt(ee,300)),(n=document.getElementById("attendance-type-filter"))==null||n.addEventListener("change",ee),(a=document.getElementById("btn-export-attendance-csv"))==null||a.addEventListener("click",()=>{window.location.href="/api/reports/attendance/csv"}),(m=document.getElementById("btn-print-attendance"))==null||m.addEventListener("click",()=>{window.print()}),t&&((i=document.getElementById("btn-create-session"))==null||i.addEventListener("click",()=>Ke()))}async function ee(){var a,m;const e=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role),s=["Administrator","Manager"].includes(q==null?void 0:q.role),t=((a=document.getElementById("attendance-search"))==null?void 0:a.value)||"",l=((m=document.getElementById("attendance-type-filter"))==null?void 0:m.value)||"All",n=document.getElementById("sessions-tbody");try{const i=new URLSearchParams;if(t&&i.append("search",t),l!=="All"&&i.append("type",l),Z=(await h.get(`/api/sessions?${i.toString()}`)).sessions,!Z||Z.length===0){n.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No training or match sessions found.
          </td>
        </tr>
      `;return}n.innerHTML=Z.map(d=>{const u=d.type==="Match"?"badge-bowler":"badge-batsman",c=d.rateDisplay!=="—"?"color: var(--success-green); font-weight: 700;":"color: var(--text-muted);";return`
        <tr>
          <td class="text-nowrap fw-bold">${d.date}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${v(d.title)}</div>
            <div class="small text-muted">${v(d.venue||"No venue specified")}</div>
          </td>
          <td><span class="badge-role ${u}">${d.type}</span></td>
          <td style="${c}; font-size: 14px;">${d.rateDisplay}</td>
          <td><span class="badge-role">${d.completionText}</span></td>
          <td class="text-end">
            ${e?`
              <button type="button" class="btn btn-sm btn-outline-burgundy py-1 px-3 btn-edit-session" data-session-id="${d.id}">
                <i class="bi bi-pencil me-1"></i>Edit Session
              </button>
            `:""}
            <button class="btn btn-sm btn-burgundy py-1 px-3 btn-open-rollcall" data-session-id="${d.id}">
              <i class="bi bi-person-check me-1"></i>Roll Call
            </button>
            ${s?`
              <button type="button" class="btn btn-sm btn-outline-danger py-1 px-3 btn-delete-session" data-session-id="${d.id}">
                <i class="bi bi-trash me-1"></i>Delete
              </button>
            `:""}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-open-rollcall").forEach(d=>{d.addEventListener("click",()=>{const u=d.getAttribute("data-session-id");rt(u)})}),document.querySelectorAll(".btn-edit-session").forEach(d=>{d.addEventListener("click",()=>{const u=Z.find(c=>c.id===d.dataset.sessionId);u&&Ke(u)})}),document.querySelectorAll(".btn-delete-session").forEach(d=>{d.addEventListener("click",()=>{const u=Z.find(c=>c.id===d.dataset.sessionId);u&&ct(u)})})}catch(i){n.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${i.message}</td></tr>`}}function ct(e){I({title:"Delete Session",contentHtml:`<p>Delete <strong>${v(e.title)}</strong> (${v(e.date)})?</p>
      <p class="small text-muted mb-0">This permanently deletes the session and its saved roll call. This cannot be undone.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-session">Delete Session</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-session");t.addEventListener("click",async()=>{t.disabled=!0;try{await h.delete(`/api/sessions/${e.id}`),g("Session deleted successfully.","success"),A(),await ee()}catch(l){g(`Failed to delete session: ${l.message}`,"error"),t.disabled=!1}})}})}async function rt(e){try{const s=await h.get(`/api/sessions/${e}`),{session:t,stats:l}=s,n=["Administrator","Manager","Coach"].includes(q==null?void 0:q.role),a=["Not marked","Attended","Late","Absent","Excused"],m=`
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style="background: var(--body-bg); border: 1px solid var(--border-color);">
          <div>
            <h5 class="mb-1 text-main fw-bold">${v(t.title)}</h5>
            <div class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${t.date} &bull; <i class="bi bi-geo-alt me-1"></i>${v(t.venue||"Venue TBD")}</div>
          </div>
          <div class="text-end">
            <div class="stat-label">Current Attendance Rate</div>
            <div class="stat-value" id="modal-attendance-rate" style="color: var(--success-green); font-size: 24px;">
              ${l.rate!==null?l.rate+"%":"—"}
            </div>
            <div class="small text-muted" id="modal-marked-summary">${l.markedCount}/${l.total} players marked</div>
          </div>
        </div>

        ${n?`
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
                    <td class="fw-bold text-main">${v(o.fullName||"Unknown")}</td>
                    <td class="small text-muted">${v(o.company||"—")}</td>
                    <td style="width: 170px;">
                      <select class="form-select-custom rollcall-status-select" ${n?"":"disabled"}>
                        ${a.map(d=>`
                          <option value="${d}" ${i.status===d?"selected":""}>${d}</option>
                        `).join("")}
                      </select>
                    </td>
                    <td>
                      <input type="text" class="form-control-custom rollcall-note-input" placeholder="Optional note..." value="${v(i.note)}" ${n?"":"readonly"}>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;I({title:"Session Roll Call",contentHtml:m,footerHtml:`
        <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
        ${n?'<button type="button" class="btn btn-burgundy" id="btn-save-roll-call">Save Roll Call</button>':""}
      `,onOpen:i=>{var d,u;const o=()=>{const c=i.querySelectorAll(".rollcall-status-select");let r=0,f=0,p=0,b=0,x=0;c.forEach(E=>{E.value==="Attended"?r++:E.value==="Late"?f++:E.value==="Absent"?p++:E.value==="Excused"?b++:x++});const y=r+f+p+b,$=y>0?Math.round((r+f)/y*1e3)/10:null,w=document.getElementById("modal-attendance-rate"),S=document.getElementById("modal-marked-summary");w&&(w.textContent=$!==null?`${$}%`:"—"),S&&(S.textContent=`${y}/${c.length} players marked`)};i.querySelectorAll(".rollcall-status-select").forEach(c=>{c.addEventListener("change",o)}),(d=document.getElementById("btn-set-all-attended"))==null||d.addEventListener("click",()=>{i.querySelectorAll(".rollcall-status-select").forEach(c=>{c.value="Attended"}),o(),g("All squad players set to Attended.","info")}),(u=document.getElementById("btn-save-roll-call"))==null||u.addEventListener("click",async()=>{const c=i.querySelectorAll("#rollcall-table-body tr"),r=[];c.forEach(f=>{var y,$;const p=f.getAttribute("data-player-id"),b=((y=f.querySelector(".rollcall-status-select"))==null?void 0:y.value)||"Not marked",x=(($=f.querySelector(".rollcall-note-input"))==null?void 0:$.value)||"";r.push({player:p,status:b,note:x})});try{await h.put(`/api/sessions/${t._id}/roll-call`,{rollCall:r}),g("Roll call saved successfully!","success"),A(),ee()}catch(f){g(`Failed to save roll call: ${f.message}`,"error")}})}})}catch(s){g(`Error: ${s.message}`,"error")}}function Ke(e=null){const s=!!e,t=`
    <form id="create-session-form">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label-custom">Session Title *</label>
          <input type="text" id="s-title" class="form-control-custom" placeholder="e.g. NCC Indoor Practice - Nets" value="${v(e==null?void 0:e.title)}" required>
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
          <input type="date" id="s-date" class="form-control-custom" value="${v((e==null?void 0:e.date)||new Date().toISOString().split("T")[0])}" required>
        </div>
        <div class="col-12">
          <label class="form-label-custom">Venue</label>
          <input type="text" id="s-venue" class="form-control-custom" placeholder="e.g. Oval Indoor Nets (MCA SPL)" value="${v(e==null?void 0:e.venue)}">
        </div>
        <div class="col-12">
          <label class="form-label-custom">Operational Notes</label>
          <textarea id="s-notes" class="form-control-custom" rows="2" placeholder="Specific training drills, equipment requirements...">${v(e==null?void 0:e.notes)}</textarea>
        </div>
      </div>
    </form>
  `;I({title:s?"Edit Session Details":"Schedule Practice or Match Attendance",contentHtml:t,onOpen:l=>{const n=l.querySelector("#modal-btn-save");n==null||n.addEventListener("click",async()=>{var u,c,r,f,p;const a=(u=document.getElementById("s-title"))==null?void 0:u.value.trim(),m=(c=document.getElementById("s-type"))==null?void 0:c.value,i=(r=document.getElementById("s-date"))==null?void 0:r.value,o=(f=document.getElementById("s-venue"))==null?void 0:f.value,d=(p=document.getElementById("s-notes"))==null?void 0:p.value;if(!a||!i){g("Title and date are required.","error");return}if(l.querySelector("#create-session-form").reportValidity()){n.disabled=!0;try{s?await h.put(`/api/sessions/${e.id}`,{title:a,type:m,date:i,venue:o,notes:d}):await h.post("/api/sessions",{title:a,type:m,date:i,venue:o,notes:d}),g(`Session "${a}" ${s?"updated":"scheduled"}.`,"success"),A(),ee()}catch(b){g(`Error: ${b.message}`,"error")}finally{n.disabled=!1}}})}})}function mt(e,s){let t;return function(...l){clearTimeout(t),t=setTimeout(()=>e.apply(this,l),s)}}let re=[],Q=null;async function ut(e,s){var a,m,i,o,d;Q=s;const t=["Administrator","Manager","Coach"].includes(Q==null?void 0:Q.role);e.innerHTML=`
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
  `,await te(),(a=document.getElementById("match-search"))==null||a.addEventListener("input",bt(te,300)),(m=document.getElementById("match-format-filter"))==null||m.addEventListener("change",te),(i=document.getElementById("btn-export-matches-csv"))==null||i.addEventListener("click",()=>{window.location.href="/api/reports/matches/csv"}),(o=document.getElementById("btn-print-matches"))==null||o.addEventListener("click",()=>{window.print()}),t&&((d=document.getElementById("btn-create-fixture"))==null||d.addEventListener("click",pt));const n=new URLSearchParams(window.location.hash.split("?")[1]||"").get("id");n&&_e(n)}async function te(){var l,n;const e=((l=document.getElementById("match-search"))==null?void 0:l.value)||"",s=((n=document.getElementById("match-format-filter"))==null?void 0:n.value)||"All",t=document.getElementById("matches-tbody");try{const a=new URLSearchParams;if(e&&a.append("search",e),s!=="All"&&a.append("format",s),re=(await h.get(`/api/matches?${a.toString()}`)).matches,!re||re.length===0){t.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No MCA fixtures logged. Click "Log MCA Fixture" to add scheduled matches.
          </td>
        </tr>
      `;return}t.innerHTML=re.map(i=>{const o=i.result==="Win"?"badge bg-success":i.result==="Loss"?"badge bg-danger":i.result==="Pending"?"badge bg-warning text-dark":"badge bg-secondary",d=i.ourScore||i.oppositionScore?`<div class="fw-bold">${i.ourScore||"—"}</div><div class="small text-muted">Opp: ${i.oppositionScore||"—"}</div>`:'<span class="text-muted small">Scores pending</span>';return`
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
          <td>${d}</td>
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
      `}).join(""),document.querySelectorAll(".btn-open-match").forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-match-id");_e(o)})})}catch(a){t.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${a.message}</td></tr>`}}async function _e(e){try{const s=await h.get(`/api/matches/${e}`),{match:t,attendanceSummary:l}=s,n=["Administrator","Manager","Coach"].includes(Q==null?void 0:Q.role),a=t.playingXI||[],m=a.filter(o=>o.status==="Playing XI").length,i=`
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
                  ${a.map(o=>{const d=o.player||{};return`
                      <tr data-px-player-id="${d._id}">
                        <td class="fw-bold">${d.fullName||"Unknown"}</td>
                        <td><span class="badge-role">${d.cricketRole||"Not set"}</span></td>
                        <td class="small text-muted">${d.company||"—"}</td>
                        <td>
                          <select class="form-select-custom px-status-select" ${n?"":"disabled"}>
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

            ${n?`
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
                  ${(t.playerStats&&t.playerStats.length>0?t.playerStats:a.filter(o=>o.status==="Playing XI").map(o=>{var d;return{player:o.player,playerName:((d=o.player)==null?void 0:d.fullName)||"Player",batted:!0,runs:0,balls:0,fours:0,sixes:0,notOut:!1,ballsBowled:0,runsConceded:0,wickets:0,catches:0,stumpings:0,runOuts:0}})).map((o,d)=>{var r,f;const u=((r=o.player)==null?void 0:r._id)||o.player,c=o.playerName||((f=o.player)==null?void 0:f.fullName)||"Player";return`
                      <tr data-stat-player-id="${u}">
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
                ${n?`
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
              <p class="small text-muted mb-3">Attendance summary: <strong>${l}</strong></p>
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
    `;I({title:`Match Control: vs ${t.opponent}`,contentHtml:i,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:o=>{var c,r,f;const d=o.querySelectorAll('[data-bs-toggle="pill"]');d.forEach(p=>{p.addEventListener("click",b=>{d.forEach(y=>y.classList.remove("active")),o.querySelectorAll(".tab-pane").forEach(y=>y.classList.remove("show","active")),p.classList.add("active");const x=o.querySelector(p.getAttribute("data-bs-target"));x&&x.classList.add("show","active")})});const u=()=>{const p=o.querySelectorAll(".px-status-select");let b=0;p.forEach(y=>{y.value==="Playing XI"&&b++});const x=document.getElementById("playing-xi-counter");x&&(x.textContent=`${b} / 11 Selected`,x.className=b>11?"badge bg-danger":b===11?"badge bg-success":"badge bg-warning text-dark")};o.querySelectorAll(".px-status-select").forEach(p=>{p.addEventListener("change",u)}),(c=document.getElementById("btn-save-playing-xi"))==null||c.addEventListener("click",async()=>{const p=o.querySelectorAll("#playing-xi-tbody tr"),b=[];let x=0;if(p.forEach(y=>{var S;const $=y.getAttribute("data-px-player-id"),w=((S=y.querySelector(".px-status-select"))==null?void 0:S.value)||"Unavailable";w==="Playing XI"&&x++,b.push({playerId:$,status:w})}),x>11){g(`At most 11 players allowed in Playing XI. Selected ${x}.`,"error");return}try{await h.put(`/api/matches/${t._id}/playing-xi`,{selections:b}),g(`Playing XI saved (${x} selected in starting XI).`,"success"),te()}catch(y){g(`Error: ${y.message}`,"error")}}),(r=document.getElementById("btn-upload-scorecard-action"))==null||r.addEventListener("click",async()=>{const p=document.getElementById("scorecard-file-input");if(!p||!p.files||p.files.length===0){g("Please select a PDF or CSV scorecard file to upload.","error");return}const b=new FormData;b.append("scorecardFile",p.files[0]);const x=document.getElementById("btn-upload-scorecard-action");x.disabled=!0,x.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Parsing...';try{const y=await h.upload(`/api/matches/${t._id}/scorecard`,b);if(g(y.message,"success"),y.fileType==="csv"&&y.matched){const $=document.getElementById("score-review-tbody");$&&($.innerHTML=y.matched.map(w=>`
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
                `).join("")),y.unmatched&&y.unmatched.length>0&&g(`Warning: ${y.unmatched.length} player(s) in CSV could not be matched to squad register.`,"warning")}else if(y.fileType==="pdf"){const $=document.getElementById("pdf-extracted-box"),w=document.getElementById("pdf-text-content");$&&w&&(w.textContent=y.extractedText||"No plain text found (scanned image PDF).",$.classList.remove("d-none"))}}catch(y){g(`Upload failed: ${y.message}`,"error")}finally{x.disabled=!1,x.innerHTML='<i class="bi bi-cloud-arrow-up me-1"></i>Upload & Preview'}}),(f=document.getElementById("btn-confirm-verified-scores"))==null||f.addEventListener("click",async()=>{var w,S,E;const p=o.querySelectorAll("#score-review-tbody tr"),b=[];p.forEach(k=>{var se,ce,Ae,Ie,Ce,Se,Be,Le,qe,Me,Pe,Te,Re,Ne;if(!((se=k.querySelector(".stat-include"))==null?void 0:se.checked))return;const j=k.getAttribute("data-stat-player-id"),F=(ce=k.querySelector("td:nth-child(2)"))==null?void 0:ce.textContent.trim(),H=parseInt(((Ae=k.querySelector(".stat-runs"))==null?void 0:Ae.value)||0,10),O=parseInt(((Ie=k.querySelector(".stat-balls"))==null?void 0:Ie.value)||0,10),z=parseInt(((Ce=k.querySelector(".stat-4s"))==null?void 0:Ce.value)||0,10),V=parseInt(((Se=k.querySelector(".stat-6s"))==null?void 0:Se.value)||0,10),K=(Be=k.querySelector(".stat-batted"))==null?void 0:Be.checked,_=(Le=k.querySelector(".stat-notout"))==null?void 0:Le.checked,Y=parseInt(((qe=k.querySelector(".stat-ballsbowled"))==null?void 0:qe.value)||0,10),le=parseInt(((Me=k.querySelector(".stat-runsconceded"))==null?void 0:Me.value)||0,10),ne=parseInt(((Pe=k.querySelector(".stat-wickets"))==null?void 0:Pe.value)||0,10),ie=parseInt(((Te=k.querySelector(".stat-catches"))==null?void 0:Te.value)||0,10),oe=parseInt(((Re=k.querySelector(".stat-stumpings"))==null?void 0:Re.value)||0,10),de=parseInt(((Ne=k.querySelector(".stat-runouts"))==null?void 0:Ne.value)||0,10);b.push({player:j,playerName:F,batted:K,notOut:_,runs:H,balls:O,fours:z,sixes:V,ballsBowled:Y,runsConceded:le,wickets:ne,catches:ie,stumpings:oe,runOuts:de})});const x=(w=document.getElementById("m-ourScore"))==null?void 0:w.value,y=(S=document.getElementById("m-oppScore"))==null?void 0:S.value,$=(E=document.getElementById("m-result"))==null?void 0:E.value;try{await h.post(`/api/matches/${t._id}/verify-scores`,{playerStats:b,ourScore:x,oppositionScore:y,result:$}),g("Official match scores confirmed and season leaderboards updated!","success"),A(),te()}catch(k){g(`Verification failed: ${k.message}`,"error")}})}})}catch(s){g(`Failed to open match details: ${s.message}`,"error")}}function pt(){const e=`
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
  `;I({title:"Log Official MCA League Fixture",contentHtml:e,onOpen:s=>{var t;(t=document.getElementById("modal-btn-save"))==null||t.addEventListener("click",async()=>{var u,c,r,f,p,b,x;const l=(u=document.getElementById("m-opponent"))==null?void 0:u.value,n=(c=document.getElementById("m-competition"))==null?void 0:c.value,a=(r=document.getElementById("m-date"))==null?void 0:r.value,m=(f=document.getElementById("m-format"))==null?void 0:f.value,i=(p=document.getElementById("m-result-init"))==null?void 0:p.value,o=(b=document.getElementById("m-venue"))==null?void 0:b.value,d=(x=document.getElementById("m-notes"))==null?void 0:x.value;if(!l||!a){g("Opponent and date are required.","error");return}try{await h.post("/api/matches",{opponent:l,competition:n,date:a,format:m,result:i,venue:o,notes:d}),g(`Fixture vs ${l} created with linked attendance session.`,"success"),A(),te()}catch(y){g(`Error: ${y.message}`,"error")}})}})}function bt(e,s){let t;return function(...l){clearTimeout(t),t=setTimeout(()=>e.apply(this,l),s)}}async function vt(e){var s,t,l;e.innerHTML=`
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
  `,await Fe(),(s=document.getElementById("btn-apply-lead-filters"))==null||s.addEventListener("click",Fe),(t=document.getElementById("btn-export-leaderboard-csv"))==null||t.addEventListener("click",()=>{window.location.href="/api/leaderboards/export-csv"}),(l=document.getElementById("btn-print-leaderboard"))==null||l.addEventListener("click",()=>{window.print()})}async function Fe(){var a,m,i;const e=((a=document.getElementById("lead-season-filter"))==null?void 0:a.value)||"All",s=((m=document.getElementById("lead-comp-filter"))==null?void 0:m.value)||"All",t=((i=document.getElementById("lead-format-filter"))==null?void 0:i.value)||"All",l=document.getElementById("leaderboard-cards-container"),n=document.getElementById("leaderboard-tbody");try{const o=new URLSearchParams;e!=="All"&&o.append("season",e),s!=="All"&&o.append("competition",s),t!=="All"&&o.append("format",t);const d=await h.get(`/api/leaderboards?${o.toString()}`),{topBatsmen:u,topBowlers:c,topFielders:r,tableData:f}=d;if(l.innerHTML=`
      <!-- Best Batsmen Card -->
      <div class="col-md-4">
        <div class="card-custom h-100 p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="stat-label">Best Batsman</span>
            <span class="badge-role badge-batsman">Runs & SR</span>
          </div>
          ${u&&u.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${u[0].playerName}</div>
              <div class="stat-value text-danger my-1">${u[0].runs} <span class="small text-muted fs-6">runs</span></div>
              <div class="small text-muted">SR: ${u[0].batSR} &bull; Avg: ${u[0].batAvg!==null?u[0].batAvg:"—"}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Batsmen</div>
              ${u.map((p,b)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${b===0?"fw-bold":""}">
                  <span>${b+1}. ${p.playerName}</span>
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
              ${c.map((p,b)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${b===0?"fw-bold":""}">
                  <span>${b+1}. ${p.playerName}</span>
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
          ${r&&r.length>0?`
            <div class="mb-3">
              <div class="fw-bold text-main fs-5">${r[0].playerName}</div>
              <div class="stat-value text-gold my-1">${r[0].fieldingPoints} <span class="small text-muted fs-6">points</span></div>
              <div class="small text-muted">Catches: ${r[0].catches} &bull; Stump: ${r[0].stumpings} &bull; RO: ${r[0].runOuts}</div>
            </div>
            <div class="border-top pt-2">
              <div class="stat-label mb-2" style="font-size: 10px;">Top Five Fielders</div>
              ${r.map((p,b)=>`
                <div class="d-flex justify-content-between align-items-center small py-1 ${b===0?"fw-bold":""}">
                  <span>${b+1}. ${p.playerName}</span>
                  <span>${p.fieldingPoints} pts <span class="text-muted" style="font-size: 10px;">(${p.catches} c)</span></span>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-muted small py-4">No verified fielding statistics recorded for this filter selection.</div>
          `}
        </div>
      </div>
    `,!f||f.length===0){n.innerHTML='<tr><td colspan="12" class="text-center py-4 text-muted">No squad statistics found.</td></tr>';return}n.innerHTML=f.map(p=>`
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
    `).join("")}catch(o){l.innerHTML=`<div class="col-12 alert alert-danger">${o.message}</div>`}}let G=[],M=null;async function gt(e,s){var l,n,a,m,i;M=s;const t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);e.innerHTML=`
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
  `,await Promise.all([fe(),J()]),(l=document.getElementById("inventory-search"))==null||l.addEventListener("input",ht(J,300)),(n=document.getElementById("inventory-category-filter"))==null||n.addEventListener("change",J),(a=document.getElementById("inventory-condition-filter"))==null||a.addEventListener("change",J),(m=document.getElementById("btn-export-inventory-csv"))==null||m.addEventListener("click",()=>{window.location.href="/api/reports/equipment/csv"}),t&&((i=document.getElementById("btn-add-inventory-item"))==null||i.addEventListener("click",()=>We(null)))}async function fe(){try{const e=await h.get("/api/equipment/stats"),{stats:s}=e;document.getElementById("stat-total-items").textContent=s.totalRecords,document.getElementById("stat-count-pending").textContent=s.countPending,document.getElementById("stat-damaged-lost").textContent=s.damagedOrLost,document.getElementById("stat-low-stock").textContent=s.lowStock}catch(e){console.error("Failed to load inventory metrics:",e)}}async function J(){var n,a,m;const e=((n=document.getElementById("inventory-search"))==null?void 0:n.value)||"",s=((a=document.getElementById("inventory-category-filter"))==null?void 0:a.value)||"All",t=((m=document.getElementById("inventory-condition-filter"))==null?void 0:m.value)||"All",l=document.getElementById("inventory-tbody");try{const i=new URLSearchParams;if(e&&i.append("search",e),s!=="All"&&i.append("category",s),t!=="All"&&i.append("condition",t),G=(await h.get(`/api/equipment?${i.toString()}`)).equipment,!G||G.length===0){l.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted">No equipment items found.</td></tr>';return}const d=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role),u=["Administrator","Manager"].includes(M==null?void 0:M.role);l.innerHTML=G.map(c=>{const r=c.condition==="Good"?"badge bg-success":c.condition==="Fair"?"badge bg-info text-dark":c.condition==="Inspect"?"badge bg-warning text-dark":c.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",f=c.countVerified?'<span class="badge bg-success bg-opacity-10 text-success border border-success" style="font-size: 9px;"><i class="bi bi-check2"></i> Verified</span>':'<span class="badge bg-warning bg-opacity-10 text-dark border border-warning" style="font-size: 9px;"><i class="bi bi-hourglass-split"></i> Count pending</span>',p=c.isLowStock?`<span class="badge bg-danger ms-1" style="font-size: 9px;">Low Stock (Min: ${c.minimumStock})</span>`:"",b=c.assignedPlayer?`<div class="small text-muted"><i class="bi bi-person me-1"></i>Assigned: ${c.assignedPlayer.fullName}</div>`:"";return`
        <tr>
          <td class="fw-bold font-monospace text-main">${c.assetId}</td>
          <td>
            <div class="fw-bold text-main" style="font-size: 13.5px;">${c.name}</div>
            <div class="small text-muted">${c.location}</div>
            ${b}
          </td>
          <td><span class="badge-role">${c.category}</span></td>
          <td>
            <div class="fw-bold fs-6">${c.quantity} <span class="small text-muted fw-normal">${c.unit}</span></div>
            <div>${f} ${p}</div>
          </td>
          <td><span class="${r}">${c.condition}</span></td>
          <td class="small">
            <div>Insp: ${c.lastInspectedDate||"Awaiting check"}</div>
            ${c.expiryDate?`<div class="text-muted">Exp: ${c.expiryDate}</div>`:""}
          </td>
          <td class="text-end text-nowrap">
            ${d?`
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
            ${u?`
              <button type="button" class="btn btn-sm btn-outline-danger py-1 px-2 btn-delete-equipment" data-item-id="${c.id}" title="Delete equipment record">
                <i class="bi bi-trash me-1"></i>Delete
              </button>
            `:""}
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-verify-stock").forEach(c=>{c.addEventListener("click",()=>{const r=c.getAttribute("data-item-id");yt(r)})}),document.querySelectorAll(".btn-edit-equipment, .btn-view-equipment").forEach(c=>{c.addEventListener("click",()=>{const r=c.getAttribute("data-item-id"),f=G.find(p=>p.id===r);We(f)})}),document.querySelectorAll(".btn-delete-equipment").forEach(c=>{c.addEventListener("click",()=>{const r=G.find(f=>f.id===c.dataset.itemId);r&&ft(r)})})}catch(i){l.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${i.message}</td></tr>`}}function ft(e){I({title:"Delete Equipment Record",contentHtml:`<p>Delete <strong>${v(e.name)} (${v(e.assetId)})</strong> from the register?</p>
      <p class="small text-muted mb-0">This permanently deletes the equipment record. This cannot be undone.</p>`,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-danger" id="btn-confirm-delete-equipment">Delete Equipment</button>
    `,onOpen:s=>{const t=s.querySelector("#btn-confirm-delete-equipment");t.addEventListener("click",async()=>{t.disabled=!0;try{await h.delete(`/api/equipment/${e.id}`),g("Equipment record deleted successfully.","success"),A(),await Promise.all([fe(),J()])}catch(l){g(`Failed to delete equipment: ${l.message}`,"error"),t.disabled=!1}})}})}function yt(e){const s=G.find(l=>l.id===e);if(!s)return;const t=`
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
  `;I({title:`Verify Physical Stock: ${s.assetId}`,contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-verify-stock">Confirm Verification</button>
    `,onOpen:l=>{var n;(n=document.getElementById("btn-submit-verify-stock"))==null||n.addEventListener("click",async()=>{var i,o;const a=(i=document.getElementById("v-quantity"))==null?void 0:i.value,m=(o=document.getElementById("v-notes"))==null?void 0:o.value;if(a===""||isNaN(parseInt(a,10))){g("Please enter a valid count number.","error");return}try{await h.put(`/api/equipment/${s.id}/verify-count`,{verifiedQuantity:parseInt(a,10),notes:m}),g(`Physical count verified for ${s.name}.`,"success"),A(),await Promise.all([fe(),J()])}catch(d){g(`Error: ${d.message}`,"error")}})}})}async function We(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(M==null?void 0:M.role);let l=[];try{l=(await h.get("/api/players")).players||[]}catch{}const n=`
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
            ${l.map(a=>{var m;return`
              <option value="${a._id}" ${((m=e==null?void 0:e.assignedPlayer)==null?void 0:m._id)===a._id||(e==null?void 0:e.assignedPlayer)===a._id?"selected":""}>
                ${a.fullName} (${a.company})
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
  `;I({title:s?`Edit Asset: ${e.assetId}`:"Add New Equipment Record",contentHtml:n,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:a=>{var m;t&&((m=document.getElementById("modal-btn-save"))==null||m.addEventListener("click",async()=>{var S,E,k,U,j,F,H,O,z,V,K,_;const i=(S=document.getElementById("eq-assetId"))==null?void 0:S.value,o=(E=document.getElementById("eq-name"))==null?void 0:E.value,d=(k=document.getElementById("eq-category"))==null?void 0:k.value,u=(U=document.getElementById("eq-condition"))==null?void 0:U.value,c=(j=document.getElementById("eq-quantity"))==null?void 0:j.value,r=(F=document.getElementById("eq-unit"))==null?void 0:F.value,f=(H=document.getElementById("eq-minStock"))==null?void 0:H.value,p=(O=document.getElementById("eq-location"))==null?void 0:O.value,b=(z=document.getElementById("eq-assignedPlayer"))==null?void 0:z.value,x=(V=document.getElementById("eq-expiryDate"))==null?void 0:V.value,y=(K=document.getElementById("eq-cost"))==null?void 0:K.value,$=(_=document.getElementById("eq-notes"))==null?void 0:_.value;if(!o||!i){g("Asset ID and Name are required.","error");return}const w={assetId:i,name:o,category:d,condition:u,quantity:parseInt(c,10),unit:r,minimumStock:parseInt(f,10),location:p,assignedPlayer:b||null,expiryDate:x||null,costLKR:parseFloat(y||0),notes:$};try{s?(await h.put(`/api/equipment/${e.id}`,w),g(`Asset ${i} updated.`,"success")):(await h.post("/api/equipment",w),g(`Asset ${i} created.`,"success")),A(),await Promise.all([fe(),J()])}catch(Y){g(`Error: ${Y.message}`,"error")}}))}})}function ht(e,s){let t;return function(...l){clearTimeout(t),t=setTimeout(()=>e.apply(this,l),s)}}let me=[],ue=null;async function xt(e,s){var l,n;ue=s;const t=["Administrator","Manager","Coach"].includes(ue==null?void 0:ue.role);e.innerHTML=`
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
  `,await Ge(),(l=document.getElementById("btn-print-inspections"))==null||l.addEventListener("click",()=>{window.print()}),t&&((n=document.getElementById("btn-new-inspection"))==null||n.addEventListener("click",wt))}async function Ge(){const e=document.getElementById("inspections-tbody");try{if(me=(await h.get("/api/inspections")).inspections,!me||me.length===0){e.innerHTML=`
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No inspection records logged yet. Click "Log Inspection Check" to conduct a weekly gear check.
          </td>
        </tr>
      `;return}e.innerHTML=me.map(t=>{const l=t.equipment||{},n=t.condition==="Good"?"badge bg-success":t.condition==="Fair"?"badge bg-info text-dark":t.condition==="Inspect"?"badge bg-warning text-dark":t.condition==="Damaged"?"badge bg-danger":"badge bg-secondary",a=t.photo?`
        <a href="/api/uploads/${t.photo}" target="_blank" class="btn btn-sm btn-light-custom py-0 px-2" style="font-size: 11px;">
          <i class="bi bi-image me-1"></i>View Evidence
        </a>
      `:'<span class="text-muted small">No photo</span>';return`
        <tr>
          <td class="fw-bold">${t.date}</td>
          <td>
            <div class="fw-bold text-main">${l.name||"Unknown Item"}</div>
            <div class="small font-monospace text-muted">${l.assetId||""} (${l.category||""})</div>
          </td>
          <td>${t.inspector}</td>
          <td><span class="${n}">${t.condition}</span></td>
          <td class="small">
            <div>${t.notes||"Routine check completed."}</div>
            ${t.correctiveAction?`<div class="text-danger mt-1"><strong>Action:</strong> ${t.correctiveAction}</div>`:""}
          </td>
          <td>${a}</td>
        </tr>
      `}).join("")}catch(s){e.innerHTML=`<tr><td colspan="6" class="alert alert-danger">${s.message}</td></tr>`}}async function wt(){let e=[];try{e=(await h.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;I({title:"Conduct Weekly Gear Inspection",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-inspection">Save Inspection</button>
    `,onOpen:t=>{var l;(l=document.getElementById("btn-submit-inspection"))==null||l.addEventListener("click",async()=>{var r,f,p,b,x,y;const n=(r=document.getElementById("ins-equipmentId"))==null?void 0:r.value,a=(f=document.getElementById("ins-date"))==null?void 0:f.value,m=(p=document.getElementById("ins-condition"))==null?void 0:p.value,i=(b=document.getElementById("ins-notes"))==null?void 0:b.value,o=(x=document.getElementById("ins-action"))==null?void 0:x.value,d=(y=document.getElementById("ins-photo"))==null?void 0:y.files[0];if(!n||!a||!m){g("Equipment, date, and condition are required.","error");return}const u=new FormData;u.append("equipmentId",n),u.append("date",a),u.append("condition",m),u.append("notes",i),u.append("correctiveAction",o),d&&u.append("evidencePhoto",d);const c=document.getElementById("btn-submit-inspection");c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Saving...';try{await h.upload("/api/inspections",u),g("Weekly inspection logged successfully!","success"),A(),Ge()}catch($){g(`Error: ${$.message}`,"error")}finally{c.disabled=!1,c.innerHTML="Save Inspection"}})}})}let ae=[],pe=null;async function $t(e,s){var l,n;pe=s;const t=["Administrator","Manager","Coach"].includes(pe==null?void 0:pe.role);e.innerHTML=`
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
  `,await we(),(l=document.getElementById("btn-print-damage"))==null||l.addEventListener("click",()=>{window.print()}),t&&((n=document.getElementById("btn-file-damage"))==null||n.addEventListener("click",Et))}async function we(){const e=document.getElementById("damage-tbody");try{if(ae=(await h.get("/api/damage-reports")).reports,!ae||ae.length===0){e.innerHTML=`
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            No active damage incidents recorded. All club assets operational.
          </td>
        </tr>
      `;return}e.innerHTML=ae.map(t=>{const l=t.equipment||{},n=t.severity==="Unsafe"?"badge bg-danger":t.severity==="High"?"badge bg-warning text-dark":t.severity==="Medium"?"badge bg-info text-dark":"badge bg-secondary",a=t.status==="Open"?"badge bg-danger":t.status==="In progress"?"badge bg-warning text-dark":"badge bg-success",m=t.photo?`
        <a href="/api/uploads/${t.photo}" target="_blank" class="small text-decoration-none text-danger d-inline-block mt-1">
          <i class="bi bi-image me-1"></i>Incident Photo
        </a>
      `:"";return`
        <tr>
          <td class="fw-bold">${t.date}</td>
          <td>
            <div class="fw-bold text-main">${l.name||"Equipment"}</div>
            <div class="small font-monospace text-muted">${l.assetId||""}</div>
          </td>
          <td><span class="${n}">${t.severity}</span></td>
          <td class="small" style="max-width: 300px;">
            <div class="fw-bold">${t.incidentDetails}</div>
            ${t.correctiveAction?`<div class="text-muted mt-1">Action: ${t.correctiveAction}</div>`:""}
            ${m}
          </td>
          <td>${t.reporter}</td>
          <td>
            <span class="${a}">${t.status}</span>
            ${t.followUps&&t.followUps.length>0?`<div class="small text-muted mt-1">${t.followUps.length} follow-up(s)</div>`:""}
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-burgundy py-1 px-2 btn-followup-damage" data-report-id="${t._id}">
              Follow-up &rarr;
            </button>
          </td>
        </tr>
      `}).join(""),document.querySelectorAll(".btn-followup-damage").forEach(t=>{t.addEventListener("click",()=>{const l=t.getAttribute("data-report-id");kt(l)})})}catch(s){e.innerHTML=`<tr><td colspan="7" class="alert alert-danger">${s.message}</td></tr>`}}async function Et(){let e=[];try{e=(await h.get("/api/equipment")).equipment||[]}catch{}const s=`
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
  `;I({title:"File Equipment Damage Report",contentHtml:s,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button>
      <button type="button" class="btn btn-burgundy" id="btn-submit-damage">File Report</button>
    `,onOpen:t=>{var l;(l=document.getElementById("btn-submit-damage"))==null||l.addEventListener("click",async()=>{var r,f,p,b,x,y;const n=(r=document.getElementById("dmg-equipmentId"))==null?void 0:r.value,a=(f=document.getElementById("dmg-date"))==null?void 0:f.value,m=(p=document.getElementById("dmg-severity"))==null?void 0:p.value,i=(b=document.getElementById("dmg-details"))==null?void 0:b.value,o=(x=document.getElementById("dmg-action"))==null?void 0:x.value,d=(y=document.getElementById("dmg-photo"))==null?void 0:y.files[0];if(!n||!a||!i){g("Equipment, date, and incident details are required.","error");return}const u=new FormData;u.append("equipmentId",n),u.append("date",a),u.append("severity",m),u.append("incidentDetails",i),u.append("correctiveAction",o),d&&u.append("incidentPhoto",d);const c=document.getElementById("btn-submit-damage");c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Filing...';try{await h.upload("/api/damage-reports",u),g("Damage report filed and asset condition updated.","success"),A(),we()}catch($){g(`Error: ${$.message}`,"error")}finally{c.disabled=!1,c.innerHTML="File Report"}})}})}function kt(e){var l,n;const s=ae.find(a=>a._id===e);if(!s)return;const t=`
    <div>
      <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
        <div class="fw-bold text-main fs-6">${((l=s.equipment)==null?void 0:l.name)||"Asset"} (${((n=s.equipment)==null?void 0:n.assetId)||""})</div>
        <div class="small text-danger fw-bold mt-1">Severity: ${s.severity} &bull; Filed by ${s.reporter} on ${s.date}</div>
        <div class="small text-muted mt-2">${s.incidentDetails}</div>
      </div>

      <div class="mb-3">
        <div class="stat-label mb-2">Follow-up History</div>
        ${s.followUps&&s.followUps.length>0?`
          <ul class="list-group list-group-flush small mb-3">
            ${s.followUps.map(a=>`
              <li class="list-group-item bg-transparent px-0 py-2 border-bottom">
                <div class="d-flex justify-content-between text-muted" style="font-size: 11px;">
                  <span>${a.date} &bull; ${a.author}</span>
                </div>
                <div class="fw-bold text-main mt-1">${a.note}</div>
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
  `;I({title:"Damage Incident Follow-up",contentHtml:t,footerHtml:`
      <button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>
      <button type="button" class="btn btn-burgundy" id="btn-save-follow-up">Save Follow-up</button>
    `,onOpen:a=>{var m;(m=document.getElementById("btn-save-follow-up"))==null||m.addEventListener("click",async()=>{var d,u;const i=(d=document.getElementById("fu-status"))==null?void 0:d.value,o=(u=document.getElementById("fu-note"))==null?void 0:u.value;if(!o&&!i){g("Please enter a note or status change.","error");return}try{await h.post(`/api/damage-reports/${s._id}/follow-up`,{status:i,note:o}),g("Follow-up record saved.","success"),A(),we()}catch(c){g(`Error: ${c.message}`,"error")}})}})}let L=null,D=null;async function At(e,s){var l,n,a,m;D=s;const t=["Administrator","Manager","Coach"].includes(D==null?void 0:D.role);e.innerHTML=`
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
  `,await $e(),(l=document.getElementById("btn-suggest-actions"))==null||l.addEventListener("click",It),(n=document.getElementById("btn-export-tasks-csv"))==null||n.addEventListener("click",()=>{window.location.href="/api/reports/tasks/csv"}),(a=document.getElementById("btn-print-tasks"))==null||a.addEventListener("click",()=>{window.print()}),t&&((m=document.getElementById("btn-create-task"))==null||m.addEventListener("click",()=>Xe(null)))}async function $e(){const e=document.getElementById("kanban-columns-container");try{L=(await h.get("/api/tasks")).board;const t=[{key:"todo",label:"To do",count:L.counts.todo,items:L.todo},{key:"inProgress",label:"In progress",count:L.counts.inProgress,items:L.inProgress},{key:"blocked",label:"Blocked",count:L.counts.blocked,items:L.blocked},{key:"done",label:"Done",count:L.counts.done,items:L.done}];e.innerHTML=t.map(l=>`
      <div class="kanban-column">
        <div class="kanban-column-header">
          <span class="stat-label text-main">${l.label}</span>
          <span class="badge rounded-pill bg-light text-dark border px-2 py-1" style="font-size: 11px;">${l.count}</span>
        </div>

        <div class="kanban-column-body flex-1" style="min-height: 200px;">
          ${l.items.map(n=>{const a=n.priority==="Critical"?"badge bg-danger":n.priority==="High"?"badge bg-warning text-dark":n.priority==="Medium"?"badge bg-info text-dark":"badge bg-secondary";return`
              <div class="kanban-task-card" data-task-id="${n._id}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="${a}" style="font-size: 9.5px;">${n.priority}</span>
                  <span class="badge-role" style="font-size: 9px;">${n.category}</span>
                </div>
                <div class="fw-bold text-main mb-1" style="font-size: 13px;">${n.title}</div>
                ${n.details?`<div class="small text-muted mb-2 text-truncate">${n.details}</div>`:""}
                <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-2 small text-muted" style="border-color: var(--border-color) !important; font-size: 11px;">
                  <span><i class="bi bi-person me-1"></i>${n.owner}</span>
                  <span><i class="bi bi-clock me-1"></i>${n.dueDate||"No due date"}</span>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-sm btn-light-custom py-0 px-2 btn-edit-task" data-task-id="${n._id}" style="font-size: 11px;">
                    <i class="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `).join(""),document.querySelectorAll(".btn-edit-task").forEach(l=>{l.addEventListener("click",()=>{const n=l.getAttribute("data-task-id"),m=[...L.todo,...L.inProgress,...L.blocked,...L.done].find(i=>i._id===n);Xe(m)})})}catch(s){e.innerHTML=`<div class="alert alert-danger col-12">${s.message}</div>`}}async function It(){I({title:"Suggest Management Actions (AI & Rule Engine)",contentHtml:`
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
  `,footerHtml:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:async s=>{try{const t=await h.get("/api/tasks/suggestions"),l=document.getElementById("ai-source-badge");l&&(l.textContent=t.source);const n=document.getElementById("ai-suggestions-list");if(!t.suggestions||t.suggestions.length===0){n.innerHTML='<div class="text-muted text-center py-4">No urgent operational bottlenecks detected. All records are up to date!</div>';return}n.innerHTML=t.suggestions.map((a,m)=>{const i=a.priority==="Critical"?"badge bg-danger":a.priority==="High"?"badge bg-warning text-dark":"badge bg-info text-dark";return`
            <div class="card-custom p-3 mb-2" id="sug-card-${m}">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="${i}" style="font-size: 10px;">${a.priority}</span>
                <span class="badge-role" style="font-size: 9.5px;">${a.category||"Operations"}</span>
              </div>
              <div class="fw-bold text-main mb-1" style="font-size: 13.5px;">${a.title}</div>
              <p class="small text-muted mb-3" style="line-height: 1.4;">${a.explanation}</p>
              <div class="text-end">
                <button type="button" class="btn btn-sm btn-burgundy py-1 px-3 btn-add-sug-task" data-sug-index="${m}">
                  <i class="bi bi-plus-lg me-1"></i>+ Add
                </button>
              </div>
            </div>
          `}).join(""),n.querySelectorAll(".btn-add-sug-task").forEach(a=>{a.addEventListener("click",async()=>{const m=parseInt(a.getAttribute("data-sug-index"),10),i=t.suggestions[m];a.disabled=!0,a.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Adding...';try{await h.post("/api/tasks",{title:i.title,details:i.explanation,category:i.category||"Operations",priority:i.priority||"Medium",status:"To do",source:t.source.includes("AI")?"AI Assistant":"Rule Engine"}),g(`Task "${i.title}" added to Kanban board.`,"success"),a.className="btn btn-sm btn-success py-1 px-3",a.innerHTML='<i class="bi bi-check2"></i> Added',$e()}catch(o){g(`Error: ${o.message}`,"error"),a.disabled=!1,a.innerHTML="+ Add"}})})}catch(t){document.getElementById("ai-suggestions-list").innerHTML=`<div class="alert alert-danger">${t.message}</div>`}}})}function Xe(e=null){const s=!!e,t=["Administrator","Manager","Coach"].includes(D==null?void 0:D.role),l=`
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
          <input type="text" id="t-owner" class="form-control-custom" value="${(e==null?void 0:e.owner)||(D==null?void 0:D.name)||"Unassigned"}" ${t?"":"disabled"}>
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
  `;I({title:s?`Edit Task: ${e.title}`:"Create Operational Task",contentHtml:l,footerHtml:t?void 0:'<button type="button" class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen:n=>{var a;t&&((a=document.getElementById("modal-btn-save"))==null||a.addEventListener("click",async()=>{var p,b,x,y,$,w,S;const m=(p=document.getElementById("t-title"))==null?void 0:p.value,i=(b=document.getElementById("t-category"))==null?void 0:b.value,o=(x=document.getElementById("t-priority"))==null?void 0:x.value,d=(y=document.getElementById("t-status"))==null?void 0:y.value,u=($=document.getElementById("t-owner"))==null?void 0:$.value,c=(w=document.getElementById("t-dueDate"))==null?void 0:w.value,r=(S=document.getElementById("t-details"))==null?void 0:S.value;if(!m||!m.trim()){g("Task title is required.","error");return}const f={title:m,category:i,priority:o,status:d,owner:u,dueDate:c,details:r};try{s?(await h.put(`/api/tasks/${e._id}`,f),g("Task updated successfully.","success")):(await h.post("/api/tasks",f),g(`Task "${m}" created.`,"success")),A(),$e()}catch(E){g(`Error: ${E.message}`,"error")}}))}})}async function Ct(e){e.innerHTML=`
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
  `,document.querySelectorAll(".btn-print-report").forEach(s=>{s.addEventListener("click",()=>{const t=s.getAttribute("data-report-type");window.location.hash=`#/${t}`,setTimeout(()=>window.print(),500)})})}let C=null;async function St(e,s){var n,a,m;C=s;const t=(C==null?void 0:C.role)==="Administrator",l=document.documentElement.getAttribute("data-theme")||"light";e.innerHTML=`
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
              ${C!=null&&C.name?C.name.split(" ").map(i=>i[0]).join("").slice(0,2).toUpperCase():"AC"}
            </div>
            <div>
              <div class="fw-bold fs-6 text-main">${(C==null?void 0:C.name)||"Administrator"}</div>
              <div class="small text-muted">${(C==null?void 0:C.email)||"admin@akbarcricket.lk"}</div>
              <span class="badge bg-danger mt-1">${(C==null?void 0:C.role)||"Administrator"}</span>
            </div>
          </div>

          <div class="p-3 rounded mb-3" style="background: var(--body-bg); border: 1px solid var(--border-color);">
            <div class="stat-label mb-1">Last Workspace Session</div>
            <div class="small text-muted">${C!=null&&C.lastLogin?new Date(C.lastLogin).toLocaleString():"Active session"}</div>
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
              <input class="form-check-input" type="checkbox" id="settings-theme-switch" ${l==="dark"?"checked":""}>
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
  `,(n=document.getElementById("change-password-form"))==null||n.addEventListener("submit",async i=>{var u,c;i.preventDefault();const o=(u=document.getElementById("pw-current"))==null?void 0:u.value,d=(c=document.getElementById("pw-new"))==null?void 0:c.value;try{await h.put("/api/auth/change-password",{currentPassword:o,newPassword:d}),g("Password updated successfully.","success"),document.getElementById("change-password-form").reset()}catch(r){g(`Password update failed: ${r.message}`,"error")}}),(a=document.getElementById("settings-theme-switch"))==null||a.addEventListener("change",i=>{const d=i.target.checked?"dark":"light";document.documentElement.setAttribute("data-theme",d),localStorage.setItem("acc_theme",d),g(`Switched to ${d} mode.`,"info")}),t&&(Qe(),(m=document.getElementById("btn-create-user-modal"))==null||m.addEventListener("click",Bt))}async function Qe(){const e=document.getElementById("users-list-container");if(e)try{const t=(await h.get("/api/users")).users||[];e.innerHTML=`
      <ul class="list-group list-group-flush small">
        ${t.map(l=>`
          <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-2 border-bottom" style="border-color: var(--border-color) !important;">
            <div>
              <div class="fw-bold text-main">${l.name}</div>
              <div class="text-muted" style="font-size: 11px;">${l.email}</div>
            </div>
            <span class="badge ${l.role==="Administrator"?"bg-danger":l.role==="Manager"?"bg-warning text-dark":"badge-role"}">
              ${l.role}
            </span>
          </li>
        `).join("")}
      </ul>
    `}catch(s){e.innerHTML=`<div class="text-danger small">${s.message}</div>`}}function Bt(){I({title:"Provision New User Account",contentHtml:`
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
    `,onOpen:s=>{var t;(t=document.getElementById("btn-submit-create-user"))==null||t.addEventListener("click",async()=>{var i,o,d,u;const l=(i=document.getElementById("u-name"))==null?void 0:i.value,n=(o=document.getElementById("u-email"))==null?void 0:o.value,a=(d=document.getElementById("u-role"))==null?void 0:d.value,m=(u=document.getElementById("u-password"))==null?void 0:u.value;if(!l||!n||!m||!a){g("All fields are required.","error");return}if(m.length<8){g("Password must be at least 8 characters.","error");return}try{await h.post("/api/users",{name:l,email:n,role:a,password:m}),g(`Account created for ${l} (${a}).`,"success"),A(),Qe()}catch(c){g(`Failed to create user: ${c.message}`,"error")}})}})}const Lt=new Intl.NumberFormat("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2}),P=e=>Lt.format(e||0),Je=()=>{const e=new Intl.DateTimeFormat("en",{timeZone:"Asia/Colombo",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${e.find(s=>s.type==="year").value}-${e.find(s=>s.type==="month").value}`},Ee={monthly:"Monthly amount",attended:"Attended + late sessions",practiceAttended:"Attended + late practices",matchAttended:"Attended + late match sessions",absent:"Absent sessions",late:"Late sessions",runs:"Runs",wickets:"Wickets",catches:"Catches",stumpings:"Stumpings",runOuts:"Run-outs",fieldingPoints:"Fielding points",verifiedMatches:"Verified matches"},He={Allowance:["monthly","attended","practiceAttended","matchAttended"],Deduction:["monthly","absent","late"],Reward:["runs","wickets","catches","stumpings","runOuts","fieldingPoints","verifiedMatches"]},R=(e,s,t)=>`<option value="${v(e)}" ${String(e)===String(t)?"selected":""}>${v(s)}</option>`,N=(e,s,t,l="")=>`<div class="col-md-6"><label for="${e}" class="form-label-custom">${s}</label><input id="${e}" class="form-control-custom" value="${v(t)}" ${l}></div>`;function Ue(e,s){return["Administrator","Manager"].includes(s==null?void 0:s.role)?!0:(e.innerHTML='<div class="alert alert-warning">Player payments are restricted to Administrators and Managers.</div>',!1)}function Ye(e,s,t){const l=s.status===404&&s.message==="API route not found."?"The running payment service needs to be updated. Restart the backend using Open Website.bat, then retry.":s.message;e.innerHTML=`<div class="alert alert-danger"><div>${v(l)}</div><button type="button" class="btn btn-sm btn-outline-burgundy mt-2" data-retry-payments>Retry</button></div>`,e.querySelector("[data-retry-payments]").addEventListener("click",t)}async function qt(e,s){if(!Ue(e,s))return;let t=null,l=0;e.innerHTML=`
    <div class="payment-view d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
      <div><h2 class="page-title mb-1">Monthly Player Payments</h2><div class="small text-muted">Attendance allowances, deductions and verified performance rewards · LKR</div></div>
      <a href="#/payment-rules" class="btn btn-outline-burgundy">Rates &amp; reward rules</a>
    </div>
    <div class="card-custom p-3 mb-4">
      <div class="row g-3 align-items-end">
        <div class="col-sm-4 col-lg-3"><label for="payment-month" class="form-label-custom">Payment month</label><input type="month" id="payment-month" class="form-control-custom" value="${Je()}" required></div>
        <div class="col-sm-8 col-lg-5"><label for="payment-search" class="form-label-custom">Find player</label><input id="payment-search" class="form-control-custom" type="search" placeholder="Search player name or company"></div>
        <div class="col-lg-4 d-flex gap-2"><button id="payment-refresh" class="btn btn-light-custom">Refresh</button><a id="payment-csv" class="btn btn-outline-burgundy">Export CSV</a></div>
      </div>
      <p class="small text-muted mt-3 mb-0">Attendance = (Attended + Late) / marked entries; unmarked entries are excluded. Excused sessions have no absence deduction. Each rule sets its own allowance eligibility requirements.</p>
    </div>
    <div id="payment-result" aria-live="polite"></div>`;const n=e.querySelector("#payment-month"),a=e.querySelector("#payment-result"),m=e.querySelector("#payment-csv");function i(){if(!t)return;const d=e.querySelector("#payment-search").value.trim().toLowerCase(),u=t.rows.filter(r=>`${r.fullName} ${r.company}`.toLowerCase().includes(d)),c=t.summary;a.innerHTML=`
      <div class="row g-3 mb-4">${[["Allowances",c.allowances],["Deductions",c.deductions],["Performance rewards",c.rewards],["Net payable",c.netPayable]].map(([r,f])=>`<div class="col-6 col-xl-3"><div class="card-custom p-3"><div class="stat-label">${r} · LKR</div><div class="fs-4 fw-bold text-main">${P(f)}</div></div></div>`).join("")}</div>
      ${t.ruleCount===0?'<div class="alert alert-info small">No active rules for this month. Add rates and reward rules to calculate payments, or add a player adjustment below.</div>':""}
      <p class="small text-muted">Calculated from current attendance, verified scores, rules and adjustments. These figures update when those records change. Excess deductions are shown separately; payable amounts stop at zero.</p>
      <div class="card-custom"><div class="table-responsive"><table class="table-custom"><thead><tr><th>Player</th><th>Attendance</th><th>Allowance eligibility</th><th>Allowances</th><th>Deductions</th><th>Rewards</th><th>Net payable</th><th>Manage</th></tr></thead><tbody>
      ${u.map(r=>`<tr>
        <td><strong>${v(r.fullName)}</strong>${r.isActive?"":'<span class="badge bg-secondary ms-1">Inactive</span>'}<div class="small text-muted">${v(r.company)}</div></td>
        <td>${r.attendance.rate===null?"—":`${r.attendance.rate.toFixed(1)}%`}<div class="small text-muted">${r.attendance.attendedTotal}/${r.attendance.marked} marked${r.attendance.notMarked?` · ${r.attendance.notMarked} unmarked`:""}</div></td>
        <td><span class="badge ${r.eligibility==="Eligible"?"bg-success":"bg-secondary"}">${v(r.eligibility)}</span></td>
        <td>${P(r.allowances)}</td><td>${P(r.deductions)}</td><td>${P(r.rewards)}</td><td class="fw-bold">${P(r.netPayable)}${r.excessDeductions?`<div class="small text-danger">Excess deductions: ${P(r.excessDeductions)}</div>`:""}</td>
        <td><button class="btn btn-sm btn-outline-burgundy" data-payment-player="${v(r.playerId)}">Details / adjust</button></td></tr>`).join("")||'<tr><td colspan="8" class="text-center text-muted py-4">No players found.</td></tr>'}
      </tbody></table></div></div>`,a.querySelectorAll("[data-payment-player]").forEach(r=>r.addEventListener("click",()=>Mt(t.rows.find(f=>f.playerId===r.dataset.paymentPlayer),t,o)))}async function o(){if(!n.reportValidity())return;const d=++l;t=null,a.innerHTML='<div class="text-muted p-4">Calculating monthly payments...</div>',m.removeAttribute("href");try{const u=await h.get(`/api/payments/monthly?month=${encodeURIComponent(n.value)}`);if(d!==l||!e.isConnected)return;t=u,m.href=`/api/payments/monthly/csv?month=${encodeURIComponent(u.month)}`,i()}catch(u){d===l&&e.isConnected&&Ye(a,u,o)}}n.addEventListener("change",o),e.querySelector("#payment-refresh").addEventListener("click",o),e.querySelector("#payment-search").addEventListener("input",i),await o()}function Mt(e,s,t){const l=e.attendance,n=s.adjustments.filter(a=>{var m;return String(((m=a.player)==null?void 0:m._id)||a.player)===e.playerId});I({title:`${v(e.fullName)} · ${v(s.month)}`,contentHtml:`
      <div class="row g-2 mb-3 small">${[["Attended",l.attended],["Late",l.late],["Absent",l.absent],["Excused",l.excused],["Unmarked",l.notMarked],["Attendance",l.rate===null?"—":`${l.rate.toFixed(1)}%`]].map(([a,m])=>`<div class="col-4 col-md-2"><div class="border rounded p-2"><div class="text-muted">${a}</div><strong>${m}</strong></div></div>`).join("")}</div>
      <div class="small text-muted mb-3">Verified this month: ${e.performance.runs} runs · ${e.performance.wickets} wickets · ${e.performance.fieldingPoints} fielding points across ${e.performance.verifiedMatches} matches.</div>
      <form id="eligibility-form" class="border rounded p-3 mb-3">
        <label class="d-flex gap-2 align-items-center"><input type="checkbox" id="allowance-eligible" ${e.allowanceEligible?"checked":""}>Eligible for allowances</label>
        <label for="eligibility-note" class="form-label-custom mt-2">Eligibility note</label><input id="eligibility-note" class="form-control-custom" maxlength="500" value="${v(e.allowanceEligibilityNote)}">
        <div class="small text-muted my-2">Allowance rules also check the monthly attendance requirements. Manual allowances require this player eligibility setting.</div>
        <button class="btn btn-sm btn-outline-burgundy" type="submit">Save eligibility</button>
      </form>
      <h6 class="text-main">Payment breakdown · LKR</h6>
      <div class="table-responsive"><table class="table-custom"><thead><tr><th>Item</th><th>Type</th><th>Basis</th><th>Amount</th></tr></thead><tbody>
        ${e.lines.map(a=>`<tr><td>${v(a.name)}<div class="small text-muted">${v(a.source)}</div></td><td>${v(a.kind)}</td><td>${v(a.basis)}${a.source==="Rule"?`<div class="small text-muted">${v(Ee[a.metric])}: ${a.value} · ${a.units} payment unit(s)</div>`:""}</td><td>${a.kind==="Deduction"?"−":""}${P(a.amount)}</td></tr>`).join("")||'<tr><td colspan="4" class="text-muted">No payment items apply.</td></tr>'}
      </tbody></table></div>
      ${e.excluded.length?`<div class="border rounded p-3 my-3 small"><strong>Allowances held / excluded</strong>${e.excluded.map(a=>`<div class="mt-1">${v(a.name)}: ${v(a.reason)}</div>`).join("")}</div>`:""}
      <div class="fw-bold my-3">Net payable: LKR ${P(e.netPayable)}${e.excessDeductions?` · Excess deductions: LKR ${P(e.excessDeductions)}`:""}</div>
      <div class="d-flex justify-content-between align-items-center mb-2"><h6 class="mb-0">Player adjustments</h6><button id="add-payment-adjustment" class="btn btn-sm btn-burgundy">Add allowance / deduction / reward</button></div>
      ${n.map(a=>`<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 border-top py-2 small"><span>${v(a.name)} · ${v(a.kind)} · LKR ${P(a.amount)}</span><span><button class="btn btn-sm btn-light-custom" data-edit-adjustment="${v(a._id)}">Edit</button> <button class="btn btn-sm btn-outline-danger" data-delete-adjustment="${v(a._id)}">Delete</button></span></div>`).join("")||'<div class="small text-muted">No manual adjustments for this player and month.</div>'}`,footerHtml:'<button class="btn btn-light-custom" id="modal-btn-cancel">Close</button>',onOpen(a){a.querySelector("#add-payment-adjustment").addEventListener("click",()=>Oe(e,s.month,t)),a.querySelectorAll("[data-edit-adjustment]").forEach(m=>m.addEventListener("click",()=>Oe(e,s.month,t,n.find(i=>i._id===m.dataset.editAdjustment)))),a.querySelectorAll("[data-delete-adjustment]").forEach(m=>m.addEventListener("click",()=>{const i=n.find(o=>o._id===m.dataset.deleteAdjustment);Ze("Delete adjustment",`${i.name} · LKR ${P(i.amount)}`,`/api/payments/adjustments/${i._id}`,t)})),a.querySelector("#eligibility-form").addEventListener("submit",async m=>{m.preventDefault();const i=m.submitter;i.disabled=!0;try{await h.put(`/api/players/${e.playerId}`,{allowanceEligible:a.querySelector("#allowance-eligible").checked,allowanceEligibilityNote:a.querySelector("#eligibility-note").value}),A(),g("Allowance eligibility saved.","success"),await t()}catch(o){g(o.message,"error"),i.disabled=!1}})}})}function Oe(e,s,t,l=null){I({title:`${l?"Edit":"Add"} payment adjustment`,contentHtml:`<p class="small text-muted">${v(e.fullName)} · ${v(s)} · LKR. Applies only to this player and month.</p>
      <form id="adjustment-form"><div class="row g-3">
        <div class="col-md-6"><label for="adj-kind" class="form-label-custom">Type</label><select id="adj-kind" class="form-select-custom">${["Allowance","Deduction","Reward"].map(n=>R(n,n,(l==null?void 0:l.kind)||"Allowance")).join("")}</select></div>
        ${N("adj-amount","Amount · LKR",(l==null?void 0:l.amount)??"",'type="number" min="0.01" max="1000000000" step="0.01" required')}
        ${N("adj-name","Name / reason",(l==null?void 0:l.name)||"",'maxlength="120" required')}
        ${N("adj-note","Notes",(l==null?void 0:l.note)||"",'maxlength="1000"')}
      </div></form>${e.allowanceEligible?"":'<p class="small text-danger mt-3">This player is ineligible for allowances. Allowance adjustments will be excluded until eligibility is enabled.</p>'}`,onOpen(n){n.querySelector("#modal-btn-save").addEventListener("click",async a=>{if(!n.querySelector("form").reportValidity())return;const m=a.currentTarget;m.disabled=!0;const i={player:e.playerId,month:s,kind:n.querySelector("#adj-kind").value,amount:Number(n.querySelector("#adj-amount").value),name:n.querySelector("#adj-name").value,note:n.querySelector("#adj-note").value};try{l?await h.put(`/api/payments/adjustments/${l._id}`,i):await h.post("/api/payments/adjustments",i),A(),g("Payment adjustment saved.","success"),await t()}catch(o){g(o.message,"error"),m.disabled=!1}})}})}function Ze(e,s,t,l){I({title:e,contentHtml:`<p>Delete <strong>${v(s)}</strong>?</p><p class="small text-muted mb-0">Calculated monthly payments will update immediately.</p>`,footerHtml:'<button class="btn btn-light-custom" id="modal-btn-cancel">Cancel</button><button class="btn btn-danger" id="confirm-payment-delete">Delete</button>',onOpen(n){n.querySelector("#confirm-payment-delete").addEventListener("click",async a=>{const m=a.currentTarget;m.disabled=!0;try{await h.delete(t),A(),g("Deleted successfully.","success"),await l()}catch(i){g(i.message,"error"),m.disabled=!1}})}})}async function Pt(e,s){if(!Ue(e,s))return;let t=[],l=[],n="";e.innerHTML=`
    <div class="payment-view d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"><div><h2 class="page-title mb-1">Rates &amp; Reward Rules</h2><div class="small text-muted">Manage allowance eligibility, deduction rates and performance rewards · LKR</div></div><div class="d-flex gap-2"><a href="#/payments" class="btn btn-light-custom">Monthly payments</a><button class="btn btn-burgundy" id="add-payment-rule" disabled>Add rule</button></div></div>
    <div class="card-custom p-3 mb-4 small text-muted">Set amounts using the club's approved rates. Rules can apply to all players or selected players, with start and end months. All matching rules add together. Editing or deleting a rule recalculates every month in its date range; use a new rule with a later start month for a rate change.</div>
    <div class="card-custom p-3 mb-4">
      <label for="rules-player-filter" class="form-label-custom">Manage rates and rewards for</label>
      <select id="rules-player-filter" class="form-select-custom" disabled><option value="">All players</option></select>
      <div class="small text-muted mt-2" id="rules-player-context">Choose a player to add their attendance allowance, performance reward or deduction. Shared rules also apply to that player.</div>
    </div>
    <div id="payment-rules-list" aria-live="polite"></div>`;const a=e.querySelector("#payment-rules-list"),m=e.querySelector("#rules-player-filter");function i(u){const c={players:n?[n]:[],kind:u,...u==="Allowance"?{metric:"monthly",calculation:"Fixed",period:"Month"}:{},...u==="Deduction"?{metric:"absent",calculation:"Per unit",period:"Month"}:{},...u==="Reward"?{metric:"runs",calculation:"Fixed",threshold:50,period:"Match"}:{}};ze(l,d,null,c)}function o(){const u=l.find(c=>c._id===n);e.querySelector("#rules-player-context").textContent=u?`New rules will apply to ${u.fullName}. Shared rules and this player's own rules both contribute to their monthly payment.`:"Choose a player to add their attendance allowance, performance reward or deduction. Shared rules also apply to that player.",a.innerHTML=["Allowance","Deduction","Reward"].map(c=>{const r=t.filter(b=>{var x;return b.kind===c&&(!n||!((x=b.players)!=null&&x.length)||b.players.includes(n))});return`<div class="card-custom mb-4"><div class="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2"><h5 class="mb-0 fs-6">${c==="Allowance"?"Attendance allowances & eligibility":c==="Deduction"?"Payment deduction rates":"Performance rewards"}</h5><button class="btn btn-sm btn-outline-burgundy" data-add-rule-kind="${c}">${c==="Allowance"?"Add attendance allowance":c==="Deduction"?"Add deduction":"Add performance reward"}</button></div>
        <div class="table-responsive"><table class="table-custom"><thead><tr><th>Rule</th><th>Rate · LKR</th><th>Applies to</th><th>Eligibility / basis</th><th>Effective months</th><th>Manage</th></tr></thead><tbody>
        ${r.map(b=>{var x;return`<tr><td><strong>${v(b.name)}</strong><div><span class="badge ${b.enabled?"bg-success":"bg-secondary"}">${b.enabled?"Enabled":"Disabled"}</span></div></td>
          <td>${P(b.amount)}<div class="small text-muted">${v(b.calculation)}</div></td>
          <td>${(x=b.players)!=null&&x.length?b.players.map(y=>{var $;return v((($=l.find(w=>w._id===y))==null?void 0:$.fullName)||"Inactive player")}).join(", "):"All players (shared)"}</td>
          <td>${v(Ee[b.metric])} ≥ ${b.threshold}<div class="small text-muted">${b.kind==="Allowance"?`Attendance ≥ ${b.minAttendanceRate}%; ${b.minimumMarkedSessions}+ marked session(s)${b.requireCompleteAttendance?"; complete roll call required":""}`:b.kind==="Reward"?b.period==="Match"?"Each verified match":"Monthly verified totals":"Monthly attendance"}</div></td>
          <td>${v(b.effectiveFrom)}${b.effectiveTo?` to ${v(b.effectiveTo)}`:" onwards"}</td><td><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-burgundy" data-edit-rule="${v(b._id)}">Edit</button><button class="btn btn-sm btn-outline-danger" data-delete-rule="${v(b._id)}">Delete</button></div></td></tr>`}).join("")||`<tr><td colspan="6" class="text-center text-muted py-4">No ${c.toLowerCase()} rules${n?" for this player":""}. Add a rule to set the rate.</td></tr>`}
        </tbody></table></div></div>`}).join(""),a.querySelectorAll("[data-add-rule-kind]").forEach(c=>c.addEventListener("click",()=>i(c.dataset.addRuleKind))),a.querySelectorAll("[data-edit-rule]").forEach(c=>c.addEventListener("click",()=>ze(l,d,t.find(r=>r._id===c.dataset.editRule)))),a.querySelectorAll("[data-delete-rule]").forEach(c=>c.addEventListener("click",()=>{const r=t.find(f=>f._id===c.dataset.deleteRule);Ze("Delete payment rule",r.name,`/api/payments/rules/${r._id}`,d)}))}async function d(){e.querySelector("#add-payment-rule").disabled=!0,m.disabled=!0,a.innerHTML='<div class="text-muted p-3">Loading rates and reward rules...</div>';try{const[u,c]=await Promise.all([h.get("/api/payments/rules"),h.get("/api/players")]);if(!e.isConnected)return;t=u.rules,l=c.players,n&&!l.some(r=>r._id===n)&&(n=""),m.innerHTML=R("","All players",n)+l.map(r=>R(r._id,r.fullName,n)).join(""),m.disabled=!1,e.querySelector("#add-payment-rule").disabled=!1,o()}catch(u){e.isConnected&&Ye(a,u,d)}}m.addEventListener("change",()=>{n=m.value,o()}),e.querySelector("#add-payment-rule").addEventListener("click",()=>i("Allowance")),await d()}function ze(e,s,t=null,l={}){const n=t||l,a=(n.players||[]).map(String),m=[...e,...a.filter(i=>!e.some(o=>o._id===i)).map(i=>({_id:i,fullName:"Inactive player"}))];I({title:t?"Edit rates / reward rule":"Add rates / reward rule",contentHtml:`<form id="payment-rule-form"><div class="row g-3">
      ${N("rule-name","Rule name",(t==null?void 0:t.name)||"",'maxlength="120" required placeholder="e.g. Monthly practice allowance"')}
      <div class="col-md-6"><label for="rule-kind" class="form-label-custom">Rule type</label><select id="rule-kind" class="form-select-custom">${Object.keys(He).map(i=>R(i,i==="Allowance"?"Attendance allowance":i==="Reward"?"Performance reward":"Deduction",n.kind||"Allowance")).join("")}</select></div>
      <div class="col-md-6"><label for="rule-metric" class="form-label-custom">Calculate using</label><select id="rule-metric" class="form-select-custom"></select></div>
      ${N("rule-amount","Rate / amount · LKR",(t==null?void 0:t.amount)??0,'type="number" min="0" max="1000000000" step="0.01" required')}
      <div class="col-md-6"><label for="rule-calculation" class="form-label-custom">Calculation</label><select id="rule-calculation" class="form-select-custom">${["Fixed","Per unit","Per milestone"].map(i=>R(i,i==="Fixed"?"Fixed amount when threshold met":i==="Per unit"?"Rate × every unit":"Rate × completed milestones",n.calculation||"Fixed")).join("")}</select></div>
      ${N("rule-threshold","Minimum units / milestone size",n.threshold??1,'type="number" min="0.5" max="1000000000" step="0.5" required')}
      <div class="col-12 small text-muted" id="rule-example">For absence deductions, use Per unit with a threshold of 1. A reward for a fifty uses Runs, Fixed, threshold 50, Each verified match. Per milestone pays once for each completed threshold.</div>
      <div class="col-md-6" id="rule-period-group"><label for="rule-period" class="form-label-custom">Performance period</label><select id="rule-period" class="form-select-custom">${R("Month","Monthly verified totals",n.period||"Match")}${R("Match","Each verified match",n.period||"Match")}</select></div>
      <div class="col-12" id="rule-eligibility"><div class="border rounded p-3"><h6 class="fs-6">Allowance eligibility</h6><div class="row g-3">
        ${N("rule-attendance-rate","Minimum monthly attendance %",(t==null?void 0:t.minAttendanceRate)??75,'type="number" min="0" max="100" step="0.1" required')}
        ${N("rule-min-sessions","Minimum marked sessions",(t==null?void 0:t.minimumMarkedSessions)??1,'type="number" min="1" max="10000" step="1" required')}
        <div class="col-12"><label class="d-flex gap-2 align-items-center"><input id="rule-complete" type="checkbox" ${(t==null?void 0:t.requireCompleteAttendance)!==!1?"checked":""}>Hold allowance until all of the player's roll calls for this month are marked</label><div class="small text-muted mt-2">The player must also be marked eligible for allowances in their profile or payment details.</div></div>
      </div></div></div>
      ${N("rule-start","Effective from month",(t==null?void 0:t.effectiveFrom)||Je(),'type="month" required')}
      ${N("rule-end","Effective to month (optional)",(t==null?void 0:t.effectiveTo)||"",'type="month"')}
      <div class="col-12"><label for="rule-scope" class="form-label-custom">Apply to players</label><select id="rule-scope" class="form-select-custom mb-2">${R("all","All players",a.length?"selected":"all")}${R("selected","Selected players",a.length?"selected":"all")}</select>
        <div id="rule-players"><label for="rule-player-search" class="form-label-custom">Find players</label><input id="rule-player-search" class="form-control-custom mb-2" type="search" placeholder="Search player name" aria-describedby="rule-player-help">
          <div class="border rounded p-2" style="max-height: 200px; overflow-y: auto;">${m.map(i=>`<label class="d-flex align-items-center gap-2 p-2 small" data-rule-player-name="${v(i.fullName.toLowerCase())}"><input type="checkbox" class="rule-player-checkbox" value="${v(i._id)}" ${a.includes(i._id)?"checked":""}>${v(i.fullName)}</label>`).join("")||'<div class="small text-muted p-2">No players available.</div>'}</div>
          <div class="small text-muted mt-2" id="rule-player-help">Tick each player this rule applies to.</div>
        </div>
        <div class="small text-muted mt-2" id="rule-scope-summary" aria-live="polite"></div>
      </div>
      <div class="col-12"><label class="d-flex gap-2 align-items-center"><input id="rule-enabled" type="checkbox" ${(t==null?void 0:t.enabled)!==!1?"checked":""}>Rule enabled</label></div>
    </div></form>`,onOpen(i){const o=r=>i.querySelector(`#${r}`);function d(){const r=o("rule-kind").value,f=o("rule-metric").value||n.metric;o("rule-metric").innerHTML=He[r].map(p=>R(p,Ee[p],f)).join(""),o("rule-eligibility").classList.toggle("d-none",r!=="Allowance"),o("rule-period-group").classList.toggle("d-none",r!=="Reward"),o("rule-attendance-rate").disabled=r!=="Allowance",o("rule-min-sessions").disabled=r!=="Allowance",u()}function u(){const r=o("rule-metric").value==="monthly";o("rule-calculation").disabled=r,o("rule-threshold").disabled=r,r&&(o("rule-calculation").value="Fixed",o("rule-threshold").value="1")}function c(){const r=o("rule-scope").value==="selected";o("rule-players").classList.toggle("d-none",!r),i.querySelectorAll(".rule-player-checkbox").forEach(p=>{p.disabled=!r});const f=m.filter(p=>[...i.querySelectorAll(".rule-player-checkbox:checked")].some(b=>b.value===p._id)).map(p=>p.fullName);o("rule-scope-summary").textContent=r?f.length?`Applies to: ${f.join(", ")}`:"Choose at least one player.":"Applies to all players."}o("rule-kind").addEventListener("change",d),o("rule-metric").addEventListener("change",u),o("rule-scope").addEventListener("change",c),i.querySelectorAll(".rule-player-checkbox").forEach(r=>r.addEventListener("change",c)),o("rule-player-search").addEventListener("input",r=>{const f=r.target.value.trim().toLowerCase();i.querySelectorAll("[data-rule-player-name]").forEach(p=>p.classList.toggle("d-none",!p.dataset.rulePlayerName.includes(f)))}),d(),c(),o("modal-btn-save").addEventListener("click",async r=>{if(!o("payment-rule-form").reportValidity())return;const f={name:o("rule-name").value,kind:o("rule-kind").value,metric:o("rule-metric").value,amount:Number(o("rule-amount").value),calculation:o("rule-calculation").value,threshold:Number(o("rule-threshold").value),period:o("rule-kind").value==="Reward"?o("rule-period").value:"Month",minAttendanceRate:Number(o("rule-attendance-rate").value),minimumMarkedSessions:Number(o("rule-min-sessions").value),requireCompleteAttendance:o("rule-complete").checked,effectiveFrom:o("rule-start").value,effectiveTo:o("rule-end").value,enabled:o("rule-enabled").checked,players:o("rule-scope").value==="all"?[]:[...i.querySelectorAll(".rule-player-checkbox:checked")].map(b=>b.value)};if(o("rule-scope").value==="selected"&&!f.players.length){g("Choose at least one player for this rule.","error");return}if(f.effectiveTo&&f.effectiveTo<f.effectiveFrom){g("End month must be on or after the start month.","error");return}const p=r.currentTarget;p.disabled=!0;try{t?await h.put(`/api/payments/rules/${t._id}`,f):await h.post("/api/payments/rules",f),A(),g("Payment rule saved.","success"),await s()}catch(b){g(b.message,"error"),p.disabled=!1}})}})}let T=null;const he={"command-centre":{title:"Command Centre",breadcrumb:"Workspace / Operations",render:at,actionButton:{id:"hdr-action-btn",label:"Explore Matches",icon:"bi-trophy"}},players:{title:"Player Profiles",breadcrumb:"Workspace / Roster",render:lt,actionButton:null},attendance:{title:"Practice & Attendance",breadcrumb:"Workspace / Training",render:dt,actionButton:null},matches:{title:"MCA Match Centre",breadcrumb:"Workspace / League Fixtures",render:ut,actionButton:null},leaderboards:{title:"Player Leaderboards",breadcrumb:"Workspace / Performance",render:vt,actionButton:null},inventory:{title:"Gear & Inventory",breadcrumb:"Club Operations / Assets",render:gt,actionButton:null},inspections:{title:"Weekly Inspections",breadcrumb:"Club Operations / Safety",render:xt,actionButton:null},"damage-reports":{title:"Damage Reports",breadcrumb:"Club Operations / Incidents",render:$t,actionButton:null},tasks:{title:"Tasks & AI Assistant",breadcrumb:"Club Operations / Kanban",render:At,actionButton:null},reports:{title:"Reports & Exports",breadcrumb:"Management / Registers",render:Ct,actionButton:null},settings:{title:"Settings & Users",breadcrumb:"Management / Administration",render:St,actionButton:null},payments:{title:"Monthly Player Payments",breadcrumb:"Management / Payments",render:qt,actionButton:null},"payment-rules":{title:"Rates & Reward Rules",breadcrumb:"Management / Payment Rules",render:Pt,actionButton:null}};function Tt(){const e=localStorage.getItem("acc_theme")||"light";document.documentElement.setAttribute("data-theme",e)}function Rt(){const s=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),localStorage.setItem("acc_theme",s);const t=document.getElementById("theme-toggle-icon");t&&(t.className=s==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars"),g(`Switched to ${s} mode.`,"info")}function ke(e="command-centre"){var c,r,f,p;const s=document.getElementById("app"),t=he[e]||he["command-centre"];s.innerHTML=`
    <div id="app-layout">
      <!-- Sidebar -->
      ${tt(T,e)}

      <!-- Main Content Area -->
      <div class="app-main-wrapper">
        <!-- Header -->
        ${st({title:t.title,breadcrumb:t.breadcrumb,actionButton:t.actionButton})}

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
  `,(c=document.getElementById("header-theme-toggle"))==null||c.addEventListener("click",Rt),(r=document.getElementById("header-refresh-btn"))==null||r.addEventListener("click",()=>{et(ye()),g("View refreshed.","info")});const l=document.getElementById("app-sidebar"),n=document.getElementById("mobile-backdrop"),a=document.getElementById("mobile-menu-toggle"),m=()=>{l==null||l.classList.add("show-mobile"),n==null||n.classList.add("show")},i=()=>{l==null||l.classList.remove("show-mobile"),n==null||n.classList.remove("show")};a==null||a.addEventListener("click",m),n==null||n.addEventListener("click",i),l==null||l.querySelectorAll(".sidebar-nav-link").forEach(b=>{b.addEventListener("click",i)}),(f=document.getElementById("sidebar-logout-btn"))==null||f.addEventListener("click",async()=>{try{await h.post("/api/auth/logout"),T=null,g("Signed out of workspace.","info"),ve(document.getElementById("app"),ge)}catch{T=null,ve(document.getElementById("app"),ge)}}),t.actionButton&&((p=document.getElementById(t.actionButton.id))==null||p.addEventListener("click",()=>{window.location.hash="#/matches"}));const o=document.documentElement.getAttribute("data-theme")||"light",d=document.getElementById("theme-toggle-icon");d&&(d.className=o==="dark"?"bi bi-sun-fill text-gold":"bi bi-moon-stars");const u=document.getElementById("main-view-container");t.render(u,T)}function ye(){const e=window.location.hash.replace(/^#\/?/,"").split("?")[0];return he[e]?e:"command-centre"}function et(e){T&&ke(e)}function ge(e){T=e;const s=ye();ke(s)}window.addEventListener("auth:expired",()=>{T&&(T=null,g("Your session has expired. Please sign in again.","warning"),ve(document.getElementById("app"),ge))});window.addEventListener("hashchange",()=>{T&&et(ye())});async function Nt(){Tt();const e=document.getElementById("app");try{T=(await h.get("/api/auth/me")).user,ke(ye())}catch{T=null,ve(e,ge)}}Nt();
