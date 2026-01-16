// Storage key
const STORAGE_KEY = 'torashaout_form_data';

// Brand config
const BRAND = {
  tagline: 'Your Favorite Stars, Delivered Anywhere in the World',
  email: 'info@torashaout.com',
  whatsapp: '+82 10 4837 0343',
  website: 'www.torashaout.com',
  address: 'Harare, Zimbabwe'
};

// Templates
const TEMPLATES = {
  welcome: {
    subject: 'Welcome to ToraShaout Partner Program',
    body: `On behalf of the entire ToraShaout team, I am delighted to welcome you to our exclusive Partner Program. Your participation marks the beginning of an exciting collaboration.

As a partner, you will have access to premium features, priority support, and exclusive opportunities to connect with Zimbabwe's most celebrated personalities.

We are committed to ensuring your success on our platform. Our dedicated team is available to assist you every step of the way.

We look forward to building a successful partnership together.`
  },
  talent: {
    subject: 'Welcome to ToraShaout - Talent Onboarding',
    body: `Congratulations! We are thrilled to welcome you to ToraShaout as one of our featured celebrities. Your fans are eager to connect with you through personalized video messages.

Here's what happens next:

1. Complete your profile setup in the Talent Dashboard
2. Set your pricing (both USD and ZIG options)
3. Upload a welcome video for your profile
4. Start receiving booking requests from fans worldwide

Our team is here to support you. If you have any questions, please don't hesitate to reach out via WhatsApp or email.`
  },
  partnership: {
    subject: 'Partnership Proposal - ToraShaout',
    body: `I am writing to introduce ToraShaout, Zimbabwe's premier celebrity video messaging platform, and to explore a potential partnership opportunity.

ToraShaout connects fans worldwide with Zimbabwe's biggest stars for personalized video messages—perfect for birthdays, graduations, corporate events, and more.

We believe a partnership between our organizations could create significant value for both parties. Specifically, we propose:

• Co-branded marketing campaigns targeting the Zimbabwean diaspora
• Exclusive celebrity content for your audience
• Revenue sharing on referred bookings

I would welcome the opportunity to discuss this further at your convenience.`
  },
  invoice: {
    subject: 'Invoice for Services Rendered',
    body: `Please find attached the invoice for services provided through ToraShaout.

Payment Details:
• Due Date: Within 14 days of receipt
• Payment Methods: Bank transfer, EcoCash, or international wire

Should you have any questions regarding this invoice, please contact our accounts team at accounts@torashaout.com.

Thank you for your continued partnership.`
  },
  thanks: {
    subject: 'Thank You for Your Support',
    body: `I wanted to take a moment to personally thank you for your support of ToraShaout.

Your trust in our platform means the world to us. We are committed to delivering exceptional experiences and connecting fans with the celebrities they love.

If there's anything we can do to improve your experience, please don't hesitate to let us know.

Thank you once again for being part of the ToraShaout family.`
  },
  custom: { subject: '', body: '' }
};

// Load template
function loadTemplate(templateId) {
  const template = TEMPLATES[templateId];
  document.getElementById('subject').value = template.subject;
  document.getElementById('body').value = template.body;

  // Update active state and aria-pressed
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  const activeBtn = document.querySelector(`[data-template="${templateId}"]`);
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-pressed', 'true');

  // Save selected template
  saveToStorage();
}

// Save form data to localStorage
function saveToStorage() {
  const data = {
    recipientName: document.getElementById('recipientName').value,
    recipientTitle: document.getElementById('recipientTitle').value,
    recipientCompany: document.getElementById('recipientCompany').value,
    recipientAddress: document.getElementById('recipientAddress').value,
    subject: document.getElementById('subject').value,
    body: document.getElementById('body').value,
    closing: document.getElementById('closing').value,
    senderName: document.getElementById('senderName').value,
    senderTitle: document.getElementById('senderTitle').value,
    activeTemplate: document.querySelector('.template-btn.active')?.dataset.template || 'welcome'
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Load form data from localStorage
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return false;

  try {
    const data = JSON.parse(saved);
    document.getElementById('recipientName').value = data.recipientName || '';
    document.getElementById('recipientTitle').value = data.recipientTitle || '';
    document.getElementById('recipientCompany').value = data.recipientCompany || '';
    document.getElementById('recipientAddress').value = data.recipientAddress || '';
    document.getElementById('subject').value = data.subject || '';
    document.getElementById('body').value = data.body || '';
    document.getElementById('closing').value = data.closing || 'Best regards,';
    document.getElementById('senderName').value = data.senderName || '';
    document.getElementById('senderTitle').value = data.senderTitle || '';

    // Restore active template button
    if (data.activeTemplate) {
      document.querySelectorAll('.template-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.querySelector(`[data-template="${data.activeTemplate}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
    return true;
  } catch (e) {
    return false;
  }
}

// Clear saved data
function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
  loadTemplate('welcome');
  document.getElementById('recipientName').value = '';
  document.getElementById('recipientTitle').value = '';
  document.getElementById('recipientCompany').value = '';
  document.getElementById('recipientAddress').value = '';
  document.getElementById('senderName').value = '';
  document.getElementById('senderTitle').value = '';
  showToast('Form cleared!', 'success');
}

// Debounce function for auto-save
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Auto-save on input (debounced)
const debouncedSave = debounce(saveToStorage, 500);

// Get form data
function getFormData() {
  return {
    recipientName: document.getElementById('recipientName').value || '[Recipient Name]',
    recipientTitle: document.getElementById('recipientTitle').value,
    recipientCompany: document.getElementById('recipientCompany').value,
    recipientAddress: document.getElementById('recipientAddress').value,
    subject: document.getElementById('subject').value || '[Subject]',
    body: document.getElementById('body').value || '[Letter body]',
    closing: document.getElementById('closing').value || 'Best regards,',
    senderName: document.getElementById('senderName').value || '[Your Name]',
    senderTitle: document.getElementById('senderTitle').value
  };
}

// Get current date
function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Show toast
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => toast.className = 'toast', 3000);
}

// Required fields for validation
const REQUIRED_FIELDS = [
  { id: 'recipientName', label: 'Recipient Name' },
  { id: 'subject', label: 'Subject Line' },
  { id: 'senderName', label: 'Your Name' }
];

// Validate form - returns true if valid
function validateForm() {
  let isValid = true;
  const missingFields = [];

  // Clear previous error states
  REQUIRED_FIELDS.forEach(field => {
    const input = document.getElementById(field.id);
    input.classList.remove('input-error');
  });

  // Check each required field
  REQUIRED_FIELDS.forEach(field => {
    const input = document.getElementById(field.id);
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('input-error');
      missingFields.push(field.label);
    }
  });

  if (!isValid) {
    showToast(`Please fill in: ${missingFields.join(', ')}`, 'error');
    // Focus first empty field
    const firstEmpty = REQUIRED_FIELDS.find(f => !document.getElementById(f.id).value.trim());
    if (firstEmpty) document.getElementById(firstEmpty.id).focus();
  }

  return isValid;
}

// Clear error state on input
function clearErrorOnInput(inputId) {
  document.getElementById(inputId).addEventListener('input', function() {
    this.classList.remove('input-error');
  });
}

// Generate letter HTML (for print/download)
function generateLetterHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ToraShaout Letter - ${data.subject}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #1f1f1f; }
  .page { width: 8.5in; min-height: 11in; margin: 0 auto; padding: 0.75in 1in 1in 1in; background: white; position: relative; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
  .logo { font-size: 24pt; font-weight: 700; }
  .logo-purple { color: #9333EA; }
  .logo-pink { color: #DB2777; }
  .tagline { font-size: 8pt; color: #9CA3AF; font-style: italic; margin-top: 4px; }
  .contact { text-align: right; font-size: 9pt; }
  .contact-website { color: #9333EA; }
  .contact-email { color: #374151; }
  .accent-bar { display: flex; height: 4px; margin-bottom: 40px; }
  .accent-purple { flex: 1; background: #9333EA; }
  .accent-pink { flex: 1; background: #DB2777; }
  .date { text-align: right; margin-bottom: 30px; color: #374151; }
  .recipient { margin-bottom: 30px; }
  .recipient-name { font-weight: 600; }
  .subject { margin-bottom: 20px; }
  .subject-re { color: #9333EA; font-weight: 600; }
  .salutation { margin-bottom: 15px; }
  .body { margin-bottom: 30px; white-space: pre-wrap; }
  .closing { margin-bottom: 50px; }
  .signature-name { font-weight: 600; color: #9333EA; }
  .signature-title { color: #374151; }
  .signature-logo { font-size: 11pt; font-weight: 700; margin-top: 5px; }
  .footer { position: absolute; bottom: 0.75in; left: 1in; right: 1in; }
  .footer-bar { display: flex; height: 2px; margin-bottom: 15px; }
  .footer-content { display: flex; justify-content: space-between; font-size: 8pt; color: #9CA3AF; }
  .copyright { text-align: center; font-size: 7pt; color: #9CA3AF; margin-top: 8px; }
  @media print {
    .page { width: 100%; min-height: auto; padding: 0.5in; }
    .footer { position: relative; margin-top: 60px; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="logo"><span class="logo-purple">TORA</span><span class="logo-pink">SHAOUT</span></div>
      <div class="tagline">${BRAND.tagline}</div>
    </div>
    <div class="contact">
      <div class="contact-website">${BRAND.website}</div>
      <div class="contact-email">${BRAND.email}</div>
    </div>
  </div>
  <div class="accent-bar"><div class="accent-purple"></div><div class="accent-pink"></div></div>
  <div class="date">${getCurrentDate()}</div>
  <div class="recipient">
    <div class="recipient-name">${data.recipientName}</div>
    ${data.recipientTitle ? `<div>${data.recipientTitle}</div>` : ''}
    ${data.recipientCompany ? `<div>${data.recipientCompany}</div>` : ''}
    ${data.recipientAddress ? `<div>${data.recipientAddress}</div>` : ''}
  </div>
  <div class="subject"><span class="subject-re">RE:</span> ${data.subject}</div>
  <div class="salutation">Dear ${data.recipientName.replace('[Recipient Name]', 'Sir/Madam')},</div>
  <div class="body">${data.body}</div>
  <div class="closing">${data.closing}</div>
  <div class="signature">
    <div class="signature-name">${data.senderName}</div>
    ${data.senderTitle ? `<div class="signature-title">${data.senderTitle}</div>` : ''}
    <div class="signature-logo"><span class="logo-purple">TORA</span><span class="logo-pink">SHAOUT</span></div>
  </div>
  <div class="footer">
    <div class="footer-bar"><div class="accent-pink"></div><div class="accent-purple"></div></div>
    <div class="footer-content">
      <div>${BRAND.address}</div>
      <div>WhatsApp: ${BRAND.whatsapp}</div>
      <div>Page 1</div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ToraShaout. All rights reserved.</div>
  </div>
</div>
</body>
</html>`;
}

// Preview letter
function previewLetter() {
  if (!validateForm()) return;
  lastFocusedElement = document.activeElement;
  const data = getFormData();
  const previewHTML = `
    <div style="font-family: Inter, Arial, sans-serif; color: #1f1f1f;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
        <div>
          <div style="font-size: 24px; font-weight: 700;">
            <span style="color: #9333EA;">TORA</span><span style="color: #DB2777;">SHAOUT</span>
          </div>
          <div style="font-size: 10px; color: #9CA3AF; font-style: italic;">${BRAND.tagline}</div>
        </div>
        <div style="text-align: right; font-size: 11px;">
          <div style="color: #9333EA;">${BRAND.website}</div>
          <div style="color: #374151;">${BRAND.email}</div>
        </div>
      </div>
      <div style="display: flex; height: 4px; margin-bottom: 30px;">
        <div style="flex: 1; background: #9333EA;"></div>
        <div style="flex: 1; background: #DB2777;"></div>
      </div>
      <div style="text-align: right; margin-bottom: 25px; color: #374151;">${getCurrentDate()}</div>
      <div style="margin-bottom: 25px;">
        <div style="font-weight: 600;">${data.recipientName}</div>
        ${data.recipientTitle ? `<div>${data.recipientTitle}</div>` : ''}
        ${data.recipientCompany ? `<div>${data.recipientCompany}</div>` : ''}
        ${data.recipientAddress ? `<div>${data.recipientAddress}</div>` : ''}
      </div>
      <div style="margin-bottom: 15px;">
        <span style="color: #9333EA; font-weight: 600;">RE:</span>
        <span style="font-weight: 600;">${data.subject}</span>
      </div>
      <div style="margin-bottom: 15px;">Dear ${data.recipientName.replace('[Recipient Name]', 'Sir/Madam')},</div>
      <div style="margin-bottom: 25px; white-space: pre-wrap; line-height: 1.6;">${data.body}</div>
      <div style="margin-bottom: 40px;">${data.closing}</div>
      <div>
        <div style="font-weight: 600; color: #9333EA;">${data.senderName}</div>
        ${data.senderTitle ? `<div style="color: #374151;">${data.senderTitle}</div>` : ''}
        <div style="font-weight: 700; font-size: 12px; margin-top: 5px;">
          <span style="color: #9333EA;">TORA</span><span style="color: #DB2777;">SHAOUT</span>
        </div>
      </div>
    </div>
  `;
  document.getElementById('previewContent').innerHTML = previewHTML;
  const modal = document.getElementById('previewModal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  // Focus the close button for keyboard users
  modal.querySelector('.modal-close').focus();
}

// Store last focused element before modal opens
let lastFocusedElement = null;

function closePreview() {
  const modal = document.getElementById('previewModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  // Return focus to trigger element
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Download PDF using jsPDF
function downloadPDF() {
  if (!validateForm()) return;
  const data = getFormData();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const contentWidth = pageWidth - (margin * 2);
  let y = 20;

  // Header - Logo
  doc.setFontSize(24);
  doc.setTextColor(147, 51, 234); // Purple
  doc.text('TORA', margin, y);
  const toraWidth = doc.getTextWidth('TORA');
  doc.setTextColor(219, 39, 119); // Pink
  doc.text('SHAOUT', margin + toraWidth, y);

  // Header - Contact (right side)
  doc.setFontSize(9);
  doc.setTextColor(147, 51, 234);
  doc.text(BRAND.website, pageWidth - margin, y - 5, { align: 'right' });
  doc.setTextColor(55, 65, 81);
  doc.text(BRAND.email, pageWidth - margin, y, { align: 'right' });

  // Tagline
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.setFont(undefined, 'italic');
  doc.text(BRAND.tagline, margin, y);
  doc.setFont(undefined, 'normal');

  // Accent bar
  y += 8;
  doc.setFillColor(147, 51, 234);
  doc.rect(margin, y, contentWidth / 2, 1.5, 'F');
  doc.setFillColor(219, 39, 119);
  doc.rect(margin + contentWidth / 2, y, contentWidth / 2, 1.5, 'F');

  // Date
  y += 15;
  doc.setFontSize(11);
  doc.setTextColor(55, 65, 81);
  doc.text(getCurrentDate(), pageWidth - margin, y, { align: 'right' });

  // Recipient
  y += 15;
  doc.setTextColor(31, 31, 31);
  doc.setFont(undefined, 'bold');
  doc.text(data.recipientName, margin, y);
  doc.setFont(undefined, 'normal');
  if (data.recipientTitle) { y += 5; doc.text(data.recipientTitle, margin, y); }
  if (data.recipientCompany) { y += 5; doc.text(data.recipientCompany, margin, y); }
  if (data.recipientAddress) { y += 5; doc.text(data.recipientAddress, margin, y); }

  // Subject
  y += 12;
  doc.setFont(undefined, 'bold');
  doc.setTextColor(147, 51, 234);
  doc.text('RE: ', margin, y);
  const reWidth = doc.getTextWidth('RE: ');
  doc.setTextColor(31, 31, 31);
  doc.text(data.subject, margin + reWidth, y);
  doc.setFont(undefined, 'normal');

  // Salutation
  y += 10;
  doc.text(`Dear ${data.recipientName.replace('[Recipient Name]', 'Sir/Madam')},`, margin, y);

  // Body - with text wrapping
  y += 10;
  doc.setFontSize(11);
  const bodyLines = doc.splitTextToSize(data.body, contentWidth);
  doc.text(bodyLines, margin, y);
  y += bodyLines.length * 5;

  // Closing
  y += 10;
  doc.text(data.closing, margin, y);

  // Signature
  y += 20;
  doc.setFont(undefined, 'bold');
  doc.setTextColor(147, 51, 234);
  doc.text(data.senderName, margin, y);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(55, 65, 81);
  if (data.senderTitle) { y += 5; doc.text(data.senderTitle, margin, y); }

  // Signature logo
  y += 8;
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(147, 51, 234);
  doc.text('TORA', margin, y);
  const sigToraWidth = doc.getTextWidth('TORA');
  doc.setTextColor(219, 39, 119);
  doc.text('SHAOUT', margin + sigToraWidth, y);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFillColor(219, 39, 119);
  doc.rect(margin, footerY, contentWidth / 2, 0.75, 'F');
  doc.setFillColor(147, 51, 234);
  doc.rect(margin + contentWidth / 2, footerY, contentWidth / 2, 0.75, 'F');

  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.setFont(undefined, 'normal');
  doc.text(BRAND.address, margin, footerY + 6);
  doc.text(`WhatsApp: ${BRAND.whatsapp}`, pageWidth / 2, footerY + 6, { align: 'center' });
  doc.text('Page 1', pageWidth - margin, footerY + 6, { align: 'right' });

  doc.setFontSize(7);
  doc.text(`© ${new Date().getFullYear()} ToraShaout. All rights reserved.`, pageWidth / 2, footerY + 11, { align: 'center' });

  // Save
  doc.save(`ToraShaout-Letter-${data.recipientName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
  showToast('PDF downloaded!', 'success');
}

// Print letter
function printLetter() {
  if (!validateForm()) return;
  const data = getFormData();
  const html = generateLetterHTML(data);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 300);
}

// Download HTML
function downloadHTML() {
  if (!validateForm()) return;
  const data = getFormData();
  const html = generateLetterHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ToraShaout-Letter-${data.recipientName.replace(/[^a-zA-Z0-9]/g, '-')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('HTML file downloaded!', 'success');
}

// Copy text
function copyText() {
  if (!validateForm()) return;
  const data = getFormData();
  const text = `${getCurrentDate()}

${data.recipientName}
${data.recipientTitle}
${data.recipientCompany}
${data.recipientAddress}

RE: ${data.subject}

Dear ${data.recipientName.replace('[Recipient Name]', 'Sir/Madam')},

${data.body}

${data.closing}

${data.senderName}
${data.senderTitle}
ToraShaout
${BRAND.email}
${BRAND.website}`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  });
}

// Close modal on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePreview();
});

// Close modal on backdrop click
document.getElementById('previewModal').addEventListener('click', (e) => {
  if (e.target.id === 'previewModal') closePreview();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Try to restore saved data, otherwise load default template
  if (!loadFromStorage()) {
    loadTemplate('welcome');
  }

  // Attach auto-save listeners to all form inputs
  const formFields = [
    'recipientName', 'recipientTitle', 'recipientCompany', 'recipientAddress',
    'subject', 'body', 'closing', 'senderName', 'senderTitle'
  ];
  formFields.forEach(id => {
    document.getElementById(id).addEventListener('input', debouncedSave);
  });

  // Attach error clearing listeners to required fields
  REQUIRED_FIELDS.forEach(field => clearErrorOnInput(field.id));
});
