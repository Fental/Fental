// UI Features - Dark Mode, Back to Top, TOC

// Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');

  // Save preference to localStorage
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');

  // Update CSS variables if needed
  if (isDark) {
    document.documentElement.style.setProperty('--bg-primary', '#0a0a0f');
    document.documentElement.style.setProperty('--bg-secondary', '#12121a');
    document.documentElement.style.setProperty('--bg-card', '#1a1a25');
    document.documentElement.style.setProperty('--bg-elevated', '#252535');
    document.documentElement.style.setProperty('--text-primary', '#e8e8f0');
    document.documentElement.style.setProperty('--text-secondary', '#9ca3b0');
    document.documentElement.style.setProperty('--text-muted', '#6b7280');
    document.documentElement.style.setProperty('--accent-primary', '#06b6d4');
    document.documentElement.style.setProperty('--accent-secondary', '#ec4899');
    document.documentElement.style.setProperty('--accent-tertiary', '#8b5cf6');
    document.documentElement.style.setProperty('--border-subtle', 'rgba(255, 255, 255, 0.06)');
    document.documentElement.style.setProperty('--border-active', 'rgba(6, 182, 212, 0.3)');
    document.documentElement.style.setProperty('--code-bg', '#0d0d12');
  } else {
    document.documentElement.style.setProperty('--bg-primary', '#f5f5f8');
    document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
    document.documentElement.style.setProperty('--bg-card', '#ffffff');
    document.documentElement.style.setProperty('--bg-elevated', '#fafafa');
    document.documentElement.style.setProperty('--text-primary', '#1a1a20');
    document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    document.documentElement.style.setProperty('--text-muted', '#9ca3b0');
    document.documentElement.style.setProperty('--accent-primary', '#0891b2');
    document.documentElement.style.setProperty('--accent-secondary', '#be185d');
    document.documentElement.style.setProperty('--accent-tertiary', '#7c3aed');
    document.documentElement.style.setProperty('--border-subtle', 'rgba(0, 0, 0, 0.08)');
    document.documentElement.style.setProperty('--border-active', 'rgba(8, 145, 178, 0.3)');
    document.documentElement.style.setProperty('--code-bg', '#1a1a25');
  }
}

// Load dark mode preference (called early to prevent FOUC)
function loadDarkMode() {
  const saved = localStorage.getItem('darkMode');

  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    // Apply dark mode variables immediately
    document.documentElement.style.setProperty('--bg-primary', '#0a0a0f');
    document.documentElement.style.setProperty('--bg-secondary', '#12121a');
    document.documentElement.style.setProperty('--bg-card', '#1a1a25');
    document.documentElement.style.setProperty('--bg-elevated', '#252535');
    document.documentElement.style.setProperty('--text-primary', '#e8e8f0');
    document.documentElement.style.setProperty('--text-secondary', '#9ca3b0');
    document.documentElement.style.setProperty('--text-muted', '#6b7280');
    document.documentElement.style.setProperty('--accent-primary', '#06b6d4');
    document.documentElement.style.setProperty('--accent-secondary', '#ec4899');
    document.documentElement.style.setProperty('--accent-tertiary', '#8b5cf6');
    document.documentElement.style.setProperty('--border-subtle', 'rgba(255, 255, 255, 0.06)');
    document.documentElement.style.setProperty('--border-active', 'rgba(6, 182, 212, 0.3)');
    document.documentElement.style.setProperty('--code-bg', '#0d0d12');
  } else if (saved === 'false') {
    document.body.classList.remove('dark-mode');
    // Apply light mode variables immediately
    document.documentElement.style.setProperty('--bg-primary', '#f5f5f8');
    document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
    document.documentElement.style.setProperty('--bg-card', '#ffffff');
    document.documentElement.style.setProperty('--bg-elevated', '#fafafa');
    document.documentElement.style.setProperty('--text-primary', '#1a1a20');
    document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    document.documentElement.style.setProperty('--text-muted', '#9ca3b0');
    document.documentElement.style.setProperty('--accent-primary', '#0891b2');
    document.documentElement.style.setProperty('--accent-secondary', '#be185d');
    document.documentElement.style.setProperty('--accent-tertiary', '#7c3aed');
    document.documentElement.style.setProperty('--border-subtle', 'rgba(0, 0, 0, 0.08)');
    document.documentElement.style.setProperty('--border-active', 'rgba(8, 145, 178, 0.3)');
    document.documentElement.style.setProperty('--code-bg', '#1a1a25');
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      // Apply dark mode variables immediately
      document.documentElement.style.setProperty('--bg-primary', '#0a0a0f');
      document.documentElement.style.setProperty('--bg-secondary', '#12121a');
      document.documentElement.style.setProperty('--bg-card', '#1a1a25');
      document.documentElement.style.setProperty('--bg-elevated', '#252535');
      document.documentElement.style.setProperty('--text-primary', '#e8e8f0');
      document.documentElement.style.setProperty('--text-secondary', '#9ca3b0');
      document.documentElement.style.setProperty('--text-muted', '#6b7280');
      document.documentElement.style.setProperty('--accent-primary', '#06b6d4');
      document.documentElement.style.setProperty('--accent-secondary', '#ec4899');
      document.documentElement.style.setProperty('--accent-tertiary', '#8b5cf6');
      document.documentElement.style.setProperty('--border-subtle', 'rgba(255, 255, 255, 0.06)');
      document.documentElement.style.setProperty('--border-active', 'rgba(6, 182, 212, 0.3)');
      document.documentElement.style.setProperty('--code-bg', '#0d0d12');
    }
  }
}

// Call loadDarkMode as early as possible to prevent FOUC
loadDarkMode();

// Back to Top Button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide back to top button
function handleScroll() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

// Toggle TOC collapse/expand
function toggleTOC() {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  toc.classList.toggle('collapsed');

  // Save preference to localStorage
  const isCollapsed = toc.classList.contains('collapsed');
  localStorage.setItem('tocCollapsed', isCollapsed ? 'true' : 'false');
}

// Generate Table of Contents
function generateTOC() {
  const article = document.querySelector('article');
  if (!article) return;

  const headings = article.querySelectorAll('h2, h3, h4');
  if (headings.length === 0) return;

  // Find h1 to insert TOC after it
  const h1 = article.querySelector('h1');
  if (!h1) return;

  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'toc';

  // Create TOC header with title and toggle button
  const tocHeader = document.createElement('div');
  tocHeader.className = 'toc-header';

  const tocTitle = document.createElement('div');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = '目录';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'toc-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle table of contents');
  toggleButton.onclick = toggleTOC;

  tocHeader.appendChild(tocTitle);
  tocHeader.appendChild(toggleButton);
  tocContainer.appendChild(tocHeader);

  // Create TOC list
  const tocList = document.createElement('ul');

  let currentList = tocList;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = `#heading-${index}`;
    link.textContent = heading.textContent;
    li.appendChild(link);

    // Set ID for heading
    heading.id = `heading-${index}`;

    // Handle nested headings
    if (level > 2) {
      let parentList = currentList;
      for (let i = 3; i <= level; i++) {
        let lastLi = parentList.lastElementChild;
        if (!lastLi) break;

        let nestedList = lastLi.querySelector('ul');
        if (!nestedList) {
          nestedList = document.createElement('ul');
          lastLi.appendChild(nestedList);
        }
        parentList = nestedList;
      }
      parentList.appendChild(li);
    } else {
      currentList.appendChild(li);
    }
  });

  tocContainer.appendChild(tocList);

  // Insert TOC after h1
  if (h1.nextSibling) {
    article.insertBefore(tocContainer, h1.nextSibling);
  } else {
    article.appendChild(tocContainer);
  }

  // Load TOC collapse preference
  const savedCollapsed = localStorage.getItem('tocCollapsed');
  if (savedCollapsed === 'true') {
    tocContainer.classList.add('collapsed');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Load dark mode preference
  loadDarkMode();

  // Generate TOC on post pages
  generateTOC();

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);

  // Initial scroll check
  handleScroll();
});
