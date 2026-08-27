// RS232 Tool 帮助文档脚本
(function () {
    'use strict';

    // 当前页面 ID（依据 URL 推断），用于导航高亮
    function getCurrentPageId() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
        // 首页即"软件简介"章节
        if (!file || file === 'index.html' || file === '') return 'intro';
        return file.replace(/\.html$/, '');
    }

    // 根据 data-page 给当前项加 active 类
    function highlightCurrent() {
        const id = getCurrentPageId();
        const items = document.querySelectorAll('.sidebar [data-page]');
        items.forEach(function (el) {
            if (el.getAttribute('data-page') === id) {
                el.classList.add('active');
            }
        });
    }

    // 移动端菜单
    function setupMobileMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const sidebar = document.querySelector('.sidebar');
        if (!btn || !sidebar) return;
        btn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
        // 点击主内容时收起侧边栏
        document.querySelector('.main').addEventListener('click', function (e) {
            if (e.target.closest('.sidebar')) return;
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    }

    // 顶部搜索（简易版：过滤侧边栏）
    function setupSearch() {
        const input = document.querySelector('.search-box');
        if (!input) return;
        const items = document.querySelectorAll('.sidebar .nav-list li');
        input.addEventListener('input', function () {
            const q = this.value.trim().toLowerCase();
            items.forEach(function (li) {
                const text = li.textContent.toLowerCase();
                li.style.display = (q === '' || text.indexOf(q) !== -1) ? '' : 'none';
            });
            // 当有过滤时显示所有分组
            if (q !== '') {
                document.querySelectorAll('.sidebar-section').forEach(function (s) {
                    s.style.display = '';
                });
            }
        });
    }

    // 自动生成右侧浮动 TOC（基于 H2/H3）
    function buildToc() {
        const tocEl = document.querySelector('.toc-sidebar ul');
        if (!tocEl) return;
        const headings = document.querySelectorAll('.content h2[id], .content h3[id]');
        if (headings.length === 0) {
            const wrapper = document.querySelector('.toc-sidebar');
            if (wrapper) wrapper.style.display = 'none';
            return;
        }
        headings.forEach(function (h) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            if (h.tagName.toLowerCase() === 'h3') {
                a.style.paddingLeft = '14px';
                a.style.fontSize = '12.5px';
            }
            li.appendChild(a);
            tocEl.appendChild(li);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        highlightCurrent();
        setupMobileMenu();
        setupSearch();
        buildToc();
    });
})();
