---
layout: page
title: 搜索
permalink: /search/
---

<script>
  (function() {
    'use strict';

    let searchTimeout = null;
    const DEBOUNCE_DELAY = 300;

    document.addEventListener('DOMContentLoaded', function() {
      try {
        const searchInput = document.getElementById('search-input');
        const resultsDiv = document.getElementById('search-results');

        if (!searchInput || !resultsDiv) {
          console.error('Search elements not found');
          return;
        }

        // Parse posts data
        const posts = [
          {% for post in site.posts %}
          {
            title: {{ post.title | jsonify }},
            url: "{{ site.baseurl }}{{ post.url }}",
            date: "{{ post.date | date: "%Y-%m-%d" }}",
            tags: [{% for tag in post.tags %}{{ tag | jsonify }},{% endfor %}],
            content: {{ post.content | strip_html | strip_newlines | slice: 0, 500 | jsonify }}
          },
          {% endfor %}
        ];

        // Search function with debounce
        function performSearch(query) {
          if (!query || query.trim() === '') {
            resultsDiv.innerHTML = `
              <div class="search-hint">
                <svg viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 0 0-6.5-6.5 6.5 6.5 0 0 0-1.21 2.89H3.5l2.74 2.74.03.74.03 1.41-.71-.71L3.29 5.18H6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v1.18C.85 5.3.03 6.55.03 8.16c0 2.7 1.59 5.06 3.97 6.23l-.28.27h-.79A6.5 6.5 0 0 0 .5 15.5c0 3.59 2.91 6.5 6.5 6.5 3.59 0 6.5-2.91 6.5-6.5 0-1.61-.59-3.09-1.6-4.33zM15.5 21a5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
                <p>输入关键词搜索文章...</p>
                <small>支持搜索标题、标签和内容</small>
              </div>
            `;
            return;
          }

          // Show loading state
          resultsDiv.innerHTML = '<div class="search-loading"><span>搜索中...</span></div>';

          // Simulate delay for better UX
          setTimeout(() => {
            const queryLower = query.toLowerCase().trim();
            const results = posts.filter(post => {
              const titleMatch = post.title.toLowerCase().includes(queryLower);
              const contentMatch = post.content.toLowerCase().includes(queryLower);
              const tagsMatch = post.tags && post.tags.length > 0 &&
                              post.tags.some(tag => tag.toLowerCase().includes(queryLower));

              return titleMatch || contentMatch || tagsMatch;
            });

            displayResults(results, queryLower);
          }, 200);
        }

        // Debounce search
        searchInput.addEventListener('input', function(e) {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
          }, DEBOUNCE_DELAY);
        });

        // Clear button functionality
        const clearBtn = document.querySelector('.search-clear');
        if (clearBtn) {
          clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            performSearch('');
          });
        }

        // Keyboard shortcuts
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch('');
            searchInput.blur();
          }
        });

        // Focus search input on page load
        setTimeout(() => searchInput.focus(), 100);

        function displayResults(results, query) {
          if (results.length === 0) {
            resultsDiv.innerHTML = `
              <div class="no-results">
                <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: var(--text-muted); opacity: 0.5; margin-bottom: 1em;">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 0 0-6.5-6.5 6.5 6.5 0 0 0-1.21 2.89H3.5l2.74 2.74.03.74.03 1.41-.71-.71L3.29 5.18H6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v1.18C.85 5.3.03 6.55.03 8.16c0 2.7 1.59 5.06 3.97 6.23l-.28.27h-.79A6.5 6.5 0 0 0 .5 15.5c0 3.59 2.91 6.5 6.5 6.5 3.59 0 6.5-2.91 6.5-6.5 0-1.61-.59-3.09-1.6-4.33zM15.5 21a5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
                <p>未找到与 "<strong>${escapeHtml(query)}</strong>" 相关的文章</p>
                <small>尝试使用不同的关键词或检查拼写</small>
              </div>
            `;
            return;
          }

          const html = `
            <div class="search-stats">
              找到 <strong>${results.length}</strong> 篇相关文章
            </div>
            ${results.map((post, index) => `
              <div class="search-result" style="animation-delay: ${index * 0.1}s">
                <h3><a href="${post.url}">${highlightText(post.title, query)}</a></h3>
                <div class="post-meta">${post.date}</div>
                <div class="post-tags">
                  ${post.tags && post.tags.length > 0
                    ? post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
                    : ''}
                </div>
                <p class="result-excerpt">${highlightText(post.content, query)}</p>
              </div>
            `).join('')}
          `;

          resultsDiv.innerHTML = html;

          // Trigger animations
          requestAnimationFrame(() => {
            document.querySelectorAll('.search-result').forEach(el => {
              el.classList.add('visible');
            });
          });
        }

        function highlightText(text, query) {
          if (!query) return escapeHtml(text);
          const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
          return escapeHtml(text).replace(regex, '<span class="search-highlight">$1</span>');
        }

        function escapeRegex(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function escapeHtml(text) {
          const div = document.createElement('div');
          div.textContent = text;
          return div.innerHTML;
        }

        // Initial state
        performSearch('');

      } catch (error) {
        console.error('Search initialization error:', error);
        const resultsDiv = document.getElementById('search-results');
        if (resultsDiv) {
          resultsDiv.innerHTML = `
            <div class="search-error">
              <p>搜索功能初始化失败</p>
              <small>请刷新页面重试</small>
            </div>
          `;
        }
      }
    });
  })();
</script>

<div class="page tags-page">
  <header>
    <h1>🔍 搜索</h1>
  </header>

  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        type="text"
        id="search-input"
        class="search-input"
        placeholder="搜索文章标题、标签或内容..."
        autocomplete="off"
        aria-label="Search"
      />
      <button class="search-clear" aria-label="Clear search">✕</button>
      <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 0 0-6.5-6.5 6.5 6.5 0 0 0-1.21 2.89H3.5l2.74 2.74.03.74.03 1.41-.71-.71L3.29 5.18H6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v1.18C.85 5.3.03 6.55.03 8.16c0 2.7 1.59 5.06 3.97 6.23l-.28.27h-.79A6.5 6.5 0 0 0 .5 15.5c0 3.59 2.91 6.5 6.5 6.5 3.59 0 6.5-2.91 6.5-6.5 0-1.61-.59-3.09-1.6-4.33zM15.5 21a5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 1 0 11z"/>
      </svg>
    </div>
  </div>

  <div id="search-results" class="search-results"></div>
</div>
