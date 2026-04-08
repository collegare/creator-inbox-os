/* ============================================================
   CREATOR INBOX OS — Application Script
   Brand: Collegare Studio
   All client-side. Data persists in localStorage.
   ============================================================ */

// ---- Constants ----
const STORAGE_KEY = 'creatorInboxOS_opportunities';

// ============================================================
// REPLY TEMPLATES DATA
// ============================================================
const REPLY_TEMPLATES = [
  {
    id: 'gifted-reply',
    title: 'Gifted Collaboration Reply',
    icon: 'ph-gift',
    text: `Hi [Contact Name],

Thank you so much for reaching out and thinking of me for this collaboration with [Brand Name]! I love what you're building.

I'd be happy to consider a gifted collaboration. Before I confirm, could you share a few details?

• What specific deliverables are you looking for? (e.g. Reels, Stories, TikToks, static posts)
• What's the timeline for content to go live?
• Are there any usage rights or exclusivity terms I should know about?

I want to make sure we're aligned on expectations so we can create something amazing together.

Looking forward to hearing from you!

Best,
[Your Name]`
  },
  {
    id: 'paid-reply',
    title: 'Paid Collaboration Reply',
    icon: 'ph-currency-circle-dollar',
    text: `Hi [Contact Name],

Thank you for reaching out about a paid collaboration with [Brand Name] — I appreciate you thinking of me!

I'm definitely interested in learning more. To make sure this is a great fit for both sides, could you share:

• The campaign brief or deliverables overview
• Timeline and content go-live dates
• Budget range for this partnership
• Any exclusivity, usage rights, or whitelisting expectations

I'm happy to send over my media kit and rate card as well. Let me know the best way to move forward!

Best,
[Your Name]`
  },
  {
    id: 'share-rates',
    title: '"Please Share Your Rates" Response',
    icon: 'ph-tag',
    text: `Hi [Contact Name],

Thanks for your interest in working together! I'd love to share my rates.

Here's a quick overview of my standard pricing:

• Instagram Reel: $[X]
• Instagram Story Set (3-5 frames): $[X]
• TikTok Video: $[X]
• Bundle (Reel + Stories + TikTok): $[X]

Usage rights and whitelisting/boosting are available at an additional cost depending on scope and duration.

These are starting rates — I'm always happy to discuss packages that fit your campaign goals and budget. Let me know what you have in mind!

Best,
[Your Name]`
  },
  {
    id: 'follow-up-ghost',
    title: 'Follow-Up If Brand Ghosts',
    icon: 'ph-clock',
    text: `Hi [Contact Name],

I hope you're doing well! I wanted to follow up on our conversation about the [Brand Name] collaboration from [date/timeframe].

I'm still very interested in working together and wanted to check in to see if there are any updates on the campaign timeline or next steps.

Happy to jump on a quick call or continue over email — whatever works best for your team!

Looking forward to hearing from you.

Best,
[Your Name]`
  },
  {
    id: 'decline',
    title: 'Decline Response',
    icon: 'ph-x-circle',
    text: `Hi [Contact Name],

Thank you so much for thinking of me for this opportunity with [Brand Name]. I really appreciate you reaching out.

After reviewing the details, I've decided this particular collaboration isn't the right fit for me at this time. I want to make sure every partnership I take on is one I can fully commit to and deliver my best work for.

I hope we can stay connected for future opportunities — I'd love to collaborate when the timing and fit align!

Wishing you all the best with this campaign.

Warmly,
[Your Name]`
  },
  {
    id: 'warm-redirect',
    title: 'Warm Redirect Response',
    icon: 'ph-arrow-bend-up-right',
    text: `Hi [Contact Name],

Thank you for reaching out about this collaboration! While this particular opportunity isn't the best fit for my current content focus, I know a few creators who might be perfect for it.

Would it be helpful if I made an introduction? I have some talented people in my network who align well with [Brand Name]'s aesthetic and audience.

I'd love to stay on your radar for future campaigns that are more closely aligned with my niche. Always happy to chat!

Best,
[Your Name]`
  },
  {
    id: 'usage-rights',
    title: 'Usage Rights Clarification',
    icon: 'ph-shield-check',
    text: `Hi [Contact Name],

Thanks for sending over the campaign details! I'm excited about this collaboration.

Before I sign off, I wanted to clarify the usage rights terms. Could you confirm:

• How long does the brand intend to use my content? (e.g. 30 days, 90 days, perpetual)
• Will the content be used in paid ads, whitelisting, or boosted posts?
• Will the content appear on any channels beyond my own? (e.g. brand's social, website, email, retail displays)
• Is there an exclusivity window, and if so, how long?

These details help me price the partnership accurately and ensure we're both protected. Happy to discuss further!

Best,
[Your Name]`
  },
  {
    id: 'timeline',
    title: 'Timeline Clarification',
    icon: 'ph-calendar',
    text: `Hi [Contact Name],

Thanks for the collaboration details — I'm interested in moving forward!

To plan my content calendar, could you share a few timeline specifics?

• When does the brand need content drafts submitted for review?
• What's the target go-live date?
• Is there a specific campaign window or launch date this is tied to?
• How many rounds of revision are included?

Once I have these details, I can confirm my availability and block off time to create something great.

Best,
[Your Name]`
  },
  {
    id: 'invoice-payment',
    title: 'Invoice & Payment Follow-Up',
    icon: 'ph-receipt',
    text: `Hi [Contact Name],

I hope you're doing well! I wanted to follow up regarding my invoice for the [Brand Name] collaboration (Invoice #[X], sent on [date]).

According to my records, payment of $[amount] was due on [due date]. Could you check on the status and let me know when I can expect it to be processed?

I've re-attached the invoice below for easy reference. If there's anything else you need from my end — W-9, updated payment details, etc. — I'm happy to provide that right away.

Thank you so much for your help!

Best,
[Your Name]`
  }
];

// ============================================================
// PROMPTS DATA
// ============================================================
const AI_PROMPTS = [
  {
    id: 'summarize-thread',
    title: 'Summarize This Email Thread',
    icon: 'ph-envelope-simple',
    category: 'Analysis',
    text: `I'm going to paste an email thread between me (a content creator) and a brand. Please summarize:

1. Who reached out and what brand they represent
2. What they're proposing (paid, gifted, affiliate, etc.)
3. Key deliverables mentioned
4. Any rates, timelines, or deadlines discussed
5. What the current status is (waiting on me, waiting on them, etc.)
6. Recommended next action I should take

Here's the thread:
[PASTE EMAIL THREAD HERE]`
  },
  {
    id: 'draft-reply',
    title: 'Draft a Professional Reply',
    icon: 'ph-pencil-line',
    category: 'Drafting',
    text: `I need help drafting a professional response to a brand collaboration email. Here's the context:

Brand: [BRAND NAME]
What they want: [BRIEF DESCRIPTION]
My goal: [e.g. accept, negotiate, ask for more info, decline politely]
Tone: Professional but warm, confident, not salesy

Here's their email:
[PASTE THEIR EMAIL HERE]

Please draft a response that sounds like me — a creator who knows their worth but is approachable and collaborative.`
  },
  {
    id: 'negotiate',
    title: 'Negotiate Warmly',
    icon: 'ph-handshake',
    category: 'Negotiation',
    text: `A brand offered me a collaboration and I want to negotiate the terms. Help me draft a warm, professional counter-offer.

Brand: [BRAND NAME]
Their offer: [WHAT THEY OFFERED — rate, deliverables, usage rights]
What I want instead: [YOUR IDEAL TERMS]
My reasoning: [WHY — e.g. usage rights add value, deliverables require more production time, my rates are based on engagement/reach]

Please draft a response that:
• Acknowledges their offer positively
• Makes my counter-proposal clear but not aggressive
• Explains the value I bring to justify my ask
• Keeps the door open for meeting in the middle`
  },
  {
    id: 'clarify-deliverables',
    title: 'Clarify Deliverables',
    icon: 'ph-list-checks',
    category: 'Clarification',
    text: `I received a brand collaboration email but the deliverables are vague. Help me draft a friendly email that asks for clarity without sounding difficult.

Here's what they said:
[PASTE THE RELEVANT PART OF THEIR EMAIL]

I need clarity on:
• Exact number and type of content pieces (Reels, Stories, TikToks, static posts)
• Content approval process and revision rounds
• Whether they want organic only or if paid amplification/whitelisting is involved
• Timeline from draft submission to go-live
• Any exclusivity or competing brand restrictions

Please draft a warm, professional email asking for these details.`
  },
  {
    id: 'polish-email',
    title: 'Rewrite Into a Polished Response',
    icon: 'ph-magic-wand',
    category: 'Drafting',
    text: `I wrote a rough draft reply to a brand email but it doesn't sound professional enough. Please rewrite it to sound polished, confident, and warm — like a creator who runs their business intentionally.

Keep my main points but make it:
• More concise
• Better structured
• Professional but not stiff
• Clear on next steps

Here's my rough draft:
[PASTE YOUR DRAFT HERE]`
  },
  {
    id: 'next-response',
    title: 'Identify the Best Next Response',
    icon: 'ph-compass',
    category: 'Strategy',
    text: `I'm not sure how to respond to this brand email. Please analyze it and recommend the best next step.

Context about me:
• My niche: [YOUR NICHE]
• My usual rate range: [YOUR RATES]
• Whether I'm open to gifted: [YES/NO/DEPENDS]
• Current bandwidth: [BUSY / AVAILABLE / SELECTIVE]

Here's the email I received:
[PASTE EMAIL HERE]

Please tell me:
1. What type of opportunity this is
2. Whether it seems legitimate and worth pursuing
3. Any red flags to watch for
4. The recommended response strategy
5. A draft reply I can customize`
  },
  {
    id: 'action-plan',
    title: 'Turn Email Into an Action Plan',
    icon: 'ph-clipboard-text',
    category: 'Planning',
    text: `I just received a brand collaboration email and I need to turn it into a clear action plan. Please read the email and create:

1. A summary of the opportunity (one paragraph)
2. A checklist of action items I need to complete
3. Key dates and deadlines to track
4. Questions I still need answered before moving forward
5. A suggested priority level (high, medium, low) based on the opportunity type and urgency

Here's the email:
[PASTE EMAIL HERE]`
  }
];

// ============================================================
// WORKFLOW STEPS DATA
// ============================================================
const WORKFLOW_STEPS = [
  {
    number: 1,
    title: 'Check Your Inbox',
    desc: 'Open your email and quickly scan for new brand outreach, collaboration inquiries, PR pitches, and partnership opportunities. Don\'t respond yet — just identify what\'s new.',
    time: '~2 minutes'
  },
  {
    number: 2,
    title: 'Log & Categorize',
    desc: 'Add every new opportunity to the Opportunities tab. Tag each one with a type (paid, gifted, affiliate, PR, partnership) and set the initial status to "New."',
    time: '~2 minutes'
  },
  {
    number: 3,
    title: 'Prioritize by Revenue & Urgency',
    desc: 'Review your open opportunities. Move paid and time-sensitive deals to "High" priority. Set medium for promising leads, and low for everything else. Focus your energy where it counts.',
    time: '~1 minute'
  },
  {
    number: 4,
    title: 'Send Your Replies',
    desc: 'Use the Reply Library for quick, polished responses. For complex situations, head to Prompt Studio for AI-powered drafting assistance. Aim to respond to high-priority items first.',
    time: '~3 minutes'
  },
  {
    number: 5,
    title: 'Log Follow-Ups',
    desc: 'For any opportunity waiting on a response, set a follow-up date. Update the status to "Follow-up Needed" and add a note with what you\'re waiting on.',
    time: '~1 minute'
  },
  {
    number: 6,
    title: 'Close & Archive Dead Leads',
    desc: 'Move stale opportunities (no response after 2+ follow-ups) to "Archived." Close out completed partnerships. Keep your tracker clean and current.',
    time: '~1 minute'
  }
];


// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/** Generate a unique ID */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/** Format a date string to readable format */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Check if a follow-up date is due (today or past) */
function isFollowUpDue(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const followUp = new Date(dateStr + 'T00:00:00');
  return followUp <= today;
}

/** Show a toast notification */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'ph-check-circle' : 'ph-warning-circle';
  toast.innerHTML = `<i class="ph-fill ${icon}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

/** Escape HTML to prevent XSS */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ============================================================
// LOCALSTORAGE HELPERS
// ============================================================

function getOpportunities() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('Could not read localStorage:', e);
    return [];
  }
}

function saveOpportunities(opps) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opps));
  } catch (e) {
    console.warn('Could not write to localStorage:', e);
  }
}


// ============================================================
// DASHBOARD STATS
// ============================================================

function updateDashboardStats() {
  const opps = getOpportunities();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // New opportunities (status = 'new')
  const newCount = opps.filter(o => o.status === 'new').length;

  // Follow-ups due (has followUpDate that is today or past, and status is not archived/closed)
  const followUpCount = opps.filter(o =>
    o.followUpDate && isFollowUpDue(o.followUpDate) &&
    o.status !== 'archived' && o.status !== 'closed'
  ).length;

  // Paid opportunities
  const paidCount = opps.filter(o => o.type === 'paid' && o.status !== 'archived').length;

  // Gifted opportunities
  const giftedCount = opps.filter(o => o.type === 'gifting' && o.status !== 'archived').length;

  // Archived
  const archivedCount = opps.filter(o => o.status === 'archived').length;

  document.getElementById('stat-new').textContent = newCount;
  document.getElementById('stat-followup').textContent = followUpCount;
  document.getElementById('stat-paid').textContent = paidCount;
  document.getElementById('stat-gifted').textContent = giftedCount;
  document.getElementById('stat-archived').textContent = archivedCount;

  // Update recent opportunities
  renderRecentOpportunities(opps);
}

function renderRecentOpportunities(opps) {
  const container = document.getElementById('recent-opportunities');
  const emptyState = document.getElementById('recent-empty');

  // Sort by createdAt descending, take top 5
  const recent = [...opps]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (recent.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  container.style.display = 'flex';
  emptyState.style.display = 'none';

  container.innerHTML = recent.map(opp => `
    <div class="recent-item">
      <div class="recent-item-left">
        <span class="recent-item-brand">${escapeHtml(opp.brand)}</span>
        <span class="badge badge-${opp.type}">${escapeHtml(opp.type)}</span>
      </div>
      <span class="badge badge-${opp.status.replace(/\s+/g, '-')}">${escapeHtml(opp.status)}</span>
    </div>
  `).join('');
}


// ============================================================
// OPPORTUNITIES CRUD
// ============================================================

let deleteTargetId = null;

function renderOpportunities() {
  const opps = getOpportunities();
  const search = document.getElementById('searchInput').value.toLowerCase();
  const statusFilter = document.getElementById('filterStatus').value;
  const typeFilter = document.getElementById('filterType').value;

  // Apply filters
  let filtered = opps.filter(opp => {
    const matchesSearch = !search ||
      opp.brand.toLowerCase().includes(search) ||
      (opp.contact && opp.contact.toLowerCase().includes(search)) ||
      (opp.email && opp.email.toLowerCase().includes(search)) ||
      (opp.notes && opp.notes.toLowerCase().includes(search));

    const matchesStatus = statusFilter === 'all' || opp.status === statusFilter;
    const matchesType = typeFilter === 'all' || opp.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort: high priority first, then by createdAt desc
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  filtered.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const grid = document.getElementById('opportunities-grid');
  const emptyState = document.getElementById('opps-empty');

  if (filtered.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = opps.length === 0 ? 'block' : 'block';
    if (opps.length > 0 && (search || statusFilter !== 'all' || typeFilter !== 'all')) {
      emptyState.innerHTML = `
        <i class="ph ph-funnel"></i>
        <p>No opportunities match your current filters. Try adjusting your search or filter criteria.</p>
      `;
    } else {
      emptyState.innerHTML = `
        <i class="ph ph-briefcase"></i>
        <p>No opportunities tracked yet.</p>
        <button class="btn btn-secondary" onclick="openAddModal()">Add Your First Opportunity</button>
      `;
    }
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(opp => {
    const followUpDue = isFollowUpDue(opp.followUpDate);
    const followUpClass = followUpDue ? 'style="color: var(--color-danger); font-weight: 500;"' : '';

    return `
      <div class="opp-card">
        <div class="opp-card-top">
          <div>
            <div class="opp-brand">${escapeHtml(opp.brand)}</div>
            ${opp.contact ? `<div class="opp-contact">${escapeHtml(opp.contact)}</div>` : ''}
          </div>
          <div class="opp-card-actions">
            <button class="btn-icon" title="Edit" onclick="openEditModal('${opp.id}')">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="btn-icon" title="Delete" onclick="confirmDelete('${opp.id}')">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </div>

        <div class="opp-tags">
          <span class="badge badge-${opp.type}">${escapeHtml(opp.type)}</span>
          <span class="badge badge-${opp.status.replace(/\s+/g, '-')}">${escapeHtml(opp.status)}</span>
          <span class="badge badge-${opp.priority}">${escapeHtml(opp.priority)} priority</span>
        </div>

        <div class="opp-details">
          ${opp.email ? `<div class="opp-detail"><i class="ph ph-envelope-simple"></i> ${escapeHtml(opp.email)}</div>` : ''}
          ${opp.deliverables ? `<div class="opp-detail"><i class="ph ph-package"></i> <strong>Deliverables:</strong> ${escapeHtml(opp.deliverables)}</div>` : ''}
          ${opp.rate ? `<div class="opp-detail"><i class="ph ph-currency-circle-dollar"></i> <strong>Rate:</strong> ${escapeHtml(opp.rate)}</div>` : ''}
          ${opp.lastContactDate ? `<div class="opp-detail"><i class="ph ph-calendar-check"></i> <strong>Last Contact:</strong> ${formatDate(opp.lastContactDate)}</div>` : ''}
          ${opp.followUpDate ? `<div class="opp-detail" ${followUpClass}><i class="ph ph-clock"></i> <strong>Follow-up:</strong> ${formatDate(opp.followUpDate)}${followUpDue ? ' (due!)' : ''}</div>` : ''}
        </div>

        ${opp.notes ? `<div class="opp-notes">${escapeHtml(opp.notes)}</div>` : ''}
      </div>
    `;
  }).join('');
}

// ---- Modal Logic ----

function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Add Opportunity';
  document.getElementById('modalSubmit').textContent = 'Save Opportunity';
  document.getElementById('opportunityForm').reset();
  document.getElementById('oppId').value = '';
  document.getElementById('oppPriority').value = 'medium';
  document.getElementById('oppStatus').value = 'new';
  document.getElementById('modalOverlay').classList.add('open');
}

function openEditModal(id) {
  const opps = getOpportunities();
  const opp = opps.find(o => o.id === id);
  if (!opp) return;

  document.getElementById('modalTitle').textContent = 'Edit Opportunity';
  document.getElementById('modalSubmit').textContent = 'Update Opportunity';
  document.getElementById('oppId').value = opp.id;
  document.getElementById('oppBrand').value = opp.brand || '';
  document.getElementById('oppContact').value = opp.contact || '';
  document.getElementById('oppEmail').value = opp.email || '';
  document.getElementById('oppType').value = opp.type || '';
  document.getElementById('oppPriority').value = opp.priority || 'medium';
  document.getElementById('oppStatus').value = opp.status || 'new';
  document.getElementById('oppDeliverables').value = opp.deliverables || '';
  document.getElementById('oppRate').value = opp.rate || '';
  document.getElementById('oppLastContact').value = opp.lastContactDate || '';
  document.getElementById('oppFollowUp').value = opp.followUpDate || '';
  document.getElementById('oppNotes').value = opp.notes || '';

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('oppId').value;
  const oppData = {
    brand: document.getElementById('oppBrand').value.trim(),
    contact: document.getElementById('oppContact').value.trim(),
    email: document.getElementById('oppEmail').value.trim(),
    type: document.getElementById('oppType').value,
    priority: document.getElementById('oppPriority').value,
    status: document.getElementById('oppStatus').value,
    deliverables: document.getElementById('oppDeliverables').value.trim(),
    rate: document.getElementById('oppRate').value.trim(),
    lastContactDate: document.getElementById('oppLastContact').value,
    followUpDate: document.getElementById('oppFollowUp').value,
    notes: document.getElementById('oppNotes').value.trim()
  };

  let opps = getOpportunities();

  if (id) {
    // Update existing
    opps = opps.map(o => o.id === id ? { ...o, ...oppData, updatedAt: new Date().toISOString() } : o);
    showToast('Opportunity updated');
  } else {
    // Create new
    opps.push({
      id: generateId(),
      ...oppData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    showToast('Opportunity added');
  }

  saveOpportunities(opps);
  closeModal();
  renderOpportunities();
  updateDashboardStats();
}

// ---- Delete Logic ----

function confirmDelete(id) {
  deleteTargetId = id;
  document.getElementById('deleteOverlay').classList.add('open');
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('deleteOverlay').classList.remove('open');
}

function executeDelete() {
  if (!deleteTargetId) return;

  let opps = getOpportunities();
  opps = opps.filter(o => o.id !== deleteTargetId);
  saveOpportunities(opps);

  closeDeleteModal();
  renderOpportunities();
  updateDashboardStats();
  showToast('Opportunity deleted');
}


// ============================================================
// REPLY LIBRARY RENDERING
// ============================================================

function renderTemplates() {
  const grid = document.getElementById('templates-grid');

  grid.innerHTML = REPLY_TEMPLATES.map(tmpl => `
    <div class="template-card" id="tmpl-${tmpl.id}">
      <div class="template-card-header" onclick="toggleTemplate('${tmpl.id}')">
        <div class="template-title-group">
          <div class="template-icon"><i class="ph ${tmpl.icon}"></i></div>
          <span class="template-title">${escapeHtml(tmpl.title)}</span>
        </div>
        <i class="ph ph-caret-down template-toggle"></i>
      </div>
      <div class="template-card-body">
        <div class="template-text">${escapeHtml(tmpl.text)}</div>
        <div class="template-actions">
          <button class="copy-btn" onclick="copyTemplate('${tmpl.id}', this)">
            <i class="ph ph-copy"></i> Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleTemplate(id) {
  const card = document.getElementById(`tmpl-${id}`);
  card.classList.toggle('open');
}

function copyTemplate(id, btn) {
  const tmpl = REPLY_TEMPLATES.find(t => t.id === id);
  if (!tmpl) return;

  navigator.clipboard.writeText(tmpl.text).then(() => {
    btn.innerHTML = '<i class="ph ph-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="ph ph-copy"></i> Copy to Clipboard';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = tmpl.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    btn.innerHTML = '<i class="ph ph-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="ph ph-copy"></i> Copy to Clipboard';
      btn.classList.remove('copied');
    }, 2000);
  });
}


// ============================================================
// PROMPT STUDIO RENDERING
// ============================================================

function renderPrompts() {
  const grid = document.getElementById('prompts-grid');

  grid.innerHTML = AI_PROMPTS.map(prompt => `
    <div class="prompt-card">
      <div class="prompt-card-top">
        <div class="prompt-title-group">
          <div class="prompt-icon"><i class="ph ${prompt.icon}"></i></div>
          <div>
            <div class="prompt-name">${escapeHtml(prompt.title)}</div>
            <span class="prompt-tag">${escapeHtml(prompt.category)}</span>
          </div>
        </div>
      </div>
      <div class="prompt-text">${escapeHtml(prompt.text)}</div>
      <div class="prompt-actions">
        <button class="copy-btn" onclick="copyPrompt('${prompt.id}', this)">
          <i class="ph ph-copy"></i> Copy Prompt
        </button>
      </div>
    </div>
  `).join('');
}

function copyPrompt(id, btn) {
  const prompt = AI_PROMPTS.find(p => p.id === id);
  if (!prompt) return;

  navigator.clipboard.writeText(prompt.text).then(() => {
    btn.innerHTML = '<i class="ph ph-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="ph ph-copy"></i> Copy Prompt';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = prompt.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    btn.innerHTML = '<i class="ph ph-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="ph ph-copy"></i> Copy Prompt';
      btn.classList.remove('copied');
    }, 2000);
  });
}


// ============================================================
// WORKFLOW RENDERING
// ============================================================

function renderWorkflow() {
  const container = document.getElementById('workflow-steps');

  container.innerHTML = `
    <div style="margin-bottom: 8px;">
      <p style="font-size: 15px; color: var(--color-text-secondary); line-height: 1.6; max-width: 600px;">
        Run through these six steps every day to stay on top of your creator inbox. Total time: about 10 minutes.
      </p>
    </div>
  ` + WORKFLOW_STEPS.map(step => `
    <div class="workflow-step">
      <div class="step-number">${step.number}</div>
      <div class="step-content">
        <div class="step-title">${escapeHtml(step.title)}</div>
        <div class="step-desc">${escapeHtml(step.desc)}</div>
        <span class="step-time">${escapeHtml(step.time)}</span>
      </div>
    </div>
  `).join('');
}


// ============================================================
// TAB NAVIGATION
// ============================================================

function switchTab(tabName) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${tabName}`);
  });

  // Close mobile sidebar if open
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}


// ============================================================
// MOBILE SIDEBAR
// ============================================================

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}


// ============================================================
// EVENT LISTENERS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Tab Navigation ----
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });

  // ---- Mobile Menu ----
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', toggleMobileSidebar);

  // ---- Add Opportunity Buttons ----
  document.getElementById('addOpportunityBtn').addEventListener('click', openAddModal);
  const addFirst = document.getElementById('addFirstOpp');
  if (addFirst) addFirst.addEventListener('click', openAddModal);

  // ---- Modal Close ----
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // ---- Form Submit ----
  document.getElementById('opportunityForm').addEventListener('submit', handleFormSubmit);

  // ---- Delete Modal ----
  document.getElementById('deleteClose').addEventListener('click', closeDeleteModal);
  document.getElementById('deleteCancelBtn').addEventListener('click', closeDeleteModal);
  document.getElementById('deleteConfirmBtn').addEventListener('click', executeDelete);
  document.getElementById('deleteOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });

  // ---- Filters ----
  document.getElementById('searchInput').addEventListener('input', renderOpportunities);
  document.getElementById('filterStatus').addEventListener('change', renderOpportunities);
  document.getElementById('filterType').addEventListener('change', renderOpportunities);

  // ---- Keyboard Shortcuts ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeDeleteModal();
    }
  });

  // ---- Initial Render ----
  updateDashboardStats();
  renderOpportunities();
  renderTemplates();
  renderPrompts();
  renderWorkflow();
});
