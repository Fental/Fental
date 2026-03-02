---
layout: page
title: 标签归档
permalink: /tags/
---
<div class="page">
  <header>
    <h1>标签归档</h1>
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
          <h2>{{ tag_name }} ({{ tag_posts.size }})</h2>
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
      <a href="{{ site.baseurl }}/">← 返回首页</a>
    </p>
  </footer>
</div>

<style>
.tags-list {
  margin-top: 3em;
}

.tag-section {
  margin-bottom: 3em;
  padding-bottom: 2em;
  border-bottom: 1px solid var(--border-color);
}

.tag-section:last-child {
  border-bottom: none;
}

.tag-count {
  opacity: 0.6;
  font-size: 0.9em;
}
</style>
