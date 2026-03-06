// UI Features - Dark Mode, Back to Top, TOC

// Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');

  // Save preference to localStorage
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');

  // Update CSS variables if needed
  if (isDark) {
    document.documentElement.style.setProperty('--bg-color', '#111827');
    document.documentElement.style.setProperty('--text-color', '#f9fafb');
    document.documentElement.style.setProperty('--text-secondary', '#9ca3af');
    document.documentElement.style.setProperty('--accent-color', '#60a5fa');
    document.documentElement.style.setProperty('--accent-hover', '#3b82f6');
    document.documentElement.style.setProperty('--border-color', '#374151');
    document.documentElement.style.setProperty('--code-bg', '#1f2937');
    document.documentElement.style.setProperty('--blockquote-bg', '#1f2937');
  } else {
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#1f2937');
    document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    document.documentElement.style.setProperty('--accent-color', '#3b82f6');
    document.documentElement.style.setProperty('--accent-hover', '#2563eb');
    document.documentElement.style.setProperty('--border-color', '#e5e7eb');
    document.documentElement.style.setProperty('--code-bg', '#f3f4f6');
    document.documentElement.style.setProperty('--blockquote-bg', '#f9fafb');
  }
}

// Load dark mode preference
function loadDarkMode() {
  const saved = localStorage.getItem('darkMode');

  if (saved === 'true') {
    document.body.classList.add('dark-mode');
  } else if (saved === 'false') {
    document.body.classList.remove('dark-mode');
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }
  }
}

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
