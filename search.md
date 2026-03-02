---
layout: page
title: 搜索
permalink: /search/
---

<script>
  // Simple client-side search
  (function() {
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');

    // Parse posts data safely
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

    console.log('Loaded posts:', posts.length);

    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();

      if (query.length === 0) {
        resultsDiv.innerHTML = '<p class="search-hint">请输入关键词搜索...</p>';
        return;
      }

      const results = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const contentMatch = post.content.toLowerCase().includes(query);
        const tagsMatch = post.tags && post.tags.length > 0 &&
                        post.tags.some(tag => tag.toLowerCase().includes(query));

        return titleMatch || contentMatch || tagsMatch;
      });

      console.log('Query:', query, 'Results:', results.length);
      displayResults(results);
    });

    function displayResults(results) {
      if (results.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">未找到相关文章</p>';
        return;
      }

      const html = results.map(post => `
        <div class="search-result">
          <h3><a href="${post.url}">${escapeHtml(post.title)}</a></h3>
          <div class="post-meta">${post.date}</div>
          <div class="post-tags">
            ${post.tags && post.tags.length > 0
              ? post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
              : ''}
          </div>
          <p class="result-excerpt">${escapeHtml(post.content)}...</p>
        </div>
      `).join('');

      resultsDiv.innerHTML = html;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Initial hint
    resultsDiv.innerHTML = '<p class="search-hint">请输入关键词搜索...</p>';
  })();
</script>

<div class="page">
  <header>
    <h1>搜索</h1>
  </header>

  <div class="search-container">
    <input
      type="text"
      id="search-input"
      class="search-input"
      placeholder="搜索文章标题、标签或内容..."
      autocomplete="off"
      aria-label="Search"
    />
  </div>

  <div id="search-results" class="search-results"></div>
</div>

