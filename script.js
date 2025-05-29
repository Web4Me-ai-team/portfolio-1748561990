// 确保URL有http或https前缀
function ensureHttpPrefix(url) {
    if (!url) return '';
    return url.match(/^https?:\/\//) ? url : `https://${url}`;
}

// 修复所有外部链接
function fixExternalLinks() {
    // 找到所有具有href属性的a标签
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 跳过内部链接（以#或/开头）和mailto/tel链接
        if (!href || href.startsWith('#') || href.startsWith('/') || 
            href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        // 跳过已经有协议的链接
        if (href.match(/^https?:\/\//)) {
            return;
        }
        
        // 对外部链接添加https://前缀
        link.setAttribute('href', `https://${href}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 更新出版物部分
    const publicationDisplay = document.querySelectorAll('.publication-display');
    publicationDisplay.forEach((display, index) => {
        const link = display.querySelector('.publication-link');
        if (link) {
            // 从URL中获取resumeData
            const urlParams = new URLSearchParams(window.location.search);
            const resumeDataParam = urlParams.get('resumeData');
            
            if (resumeDataParam) {
                try {
                    const resumeData = JSON.parse(decodeURIComponent(resumeDataParam));
                    if (resumeData.publications && resumeData.publications[index] && resumeData.publications[index].links) {
                        // 使用ensureHttpPrefix确保链接有正确的前缀
                        link.href = ensureHttpPrefix(resumeData.publications[index].links);
                    }
                } catch (e) {
                    console.error('Error parsing resume data:', e);
                }
            }
        }
    });
    
    // 修复所有外部链接
    fixExternalLinks();
}); 