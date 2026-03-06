---
layout: page
title: 标签归档
permalink: /tags/
---

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Add data-count attribute to tags in cloud
    const tagsCloud = document.querySelector('.tags-cloud');
    if (tagsCloud) {
      tagsCloud.querySelectorAll('.tag').forEach(tag => {
        const countText = tag.querySelector('.tag-count');
        if (countText) {
          const count = parseInt(countText.textContent.match(/\d+/)[0]);
          tag.setAttribute('data-count', count > 20 ? '20+' : count);
        }
      });
    }

    // Smooth scroll for tag links
    document.querySelectorAll('.tags-cloud .tag').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Highlight the section briefly
          targetSection.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.3)';
          setTimeout(() => {
            targetSection.style.boxShadow = '';
          }, 1500);
        }
      });
    });
  });
</script>

<div class="page tags-page">
  <header>
    <h1>🏷️ 标签归档</h1>
    <p style="color: var(--text-secondary); margin-top: 0.5em;">
      共 <strong>{{ site.tags | size }}</strong> 个标签，<strong>{{ site.posts | size }}</strong> 篇文章
    </p>
  </header>

  <main>
    <div class="tags-cloud">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
        {% assign tag_name = tag | first %}
        {% assign tag_posts = tag | last %}
        <a href="#{{ tag_name | slugify }}" class="tag">
          {{ tag_name }} <span class="tag-count">({{ tag_posts.size }})</span>
        </a>
      {% endfor %}
    </div>

    <div class="tags-list">
      {% for tag in tags %}
        {% assign tag_name = tag | first %}
        {% assign tag_posts = tag | last | sort: 'date' | reverse %}
        <section id="{{ tag_name | slugify }}" class="tag-section">
          <h2>{{ tag_name }} <span style="font-size: 0.6em; opacity: 0.6; margin-left: 0.5em;">({{ tag_posts.size }})</span></h2>
          <ul class="post-list">
            {% for post in tag_posts %}
            <li>
              <div class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</div>
              <h3 class="post-title">
                <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
              </h3>
              {% if post.tags %}
              <div class="post-tags">
                {% for pt in post.tags %}
                <span class="tag">{{ pt }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </li>
            {% endfor %}
          </ul>
        </section>
      {% endfor %}
    </div>
  </main>

  <footer>
    <p style="color: var(--text-secondary); margin-top: 3em;">
      <a href="{{ site.baseurl }}/" class="back-link">
        <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor; vertical-align: middle; margin-right: 0.5em;">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        返回首页
      </a>
    </p>
  </footer>
</div>
