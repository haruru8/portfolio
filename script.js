// ===== DOM読み込み完了後の初期化 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    initializeTypingEffect();
});

// ===== スクロール時のアニメーション設定 =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // セクション内の要素を順次表示
                const childElements = entry.target.querySelectorAll('.fade-in');
                childElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // 全てのセクションを監視対象に追加
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
        
        // 子要素にfade-inクラスを追加
        const animatableElements = section.querySelectorAll(
            '.tech-category, .project-card, .skills-highlight'
        );
        animatableElements.forEach(element => {
            element.classList.add('fade-in');
        });
    });
}

// ===== インタラクション効果の設定 =====
function initializeInteractions() {
    // プロジェクトカードのホバー効果
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', handleProjectCardHover);
        card.addEventListener('mouseleave', handleProjectCardLeave);
        card.addEventListener('click', handleProjectCardClick);
    });

    // テクノロジーカードのホバー効果
    document.querySelectorAll('.tech-category').forEach(card => {
        card.addEventListener('mouseenter', handleTechCardHover);
        card.addEventListener('mouseleave', handleTechCardLeave);
    });

    // 技術アイテムのクリック効果
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('click', handleTechItemClick);
    });

    // コンタクトリンクの効果
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', handleContactLinkHover);
        link.addEventListener('mouseleave', handleContactLinkLeave);
    });

    // プロフィール画像のクリック効果
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', handleProfileClick);
    }
}

// ===== スクロール効果の設定 =====
function initializeScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        // ヒーローセクションの視差効果
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }

        // スクロール進捗の表示（オプション）
        updateScrollProgress();
        
        ticking = false;
    }
}

// ===== タイピング効果 =====
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            subtitle.textContent += originalText.charAt(i);
            i++;
            
            if (i >= originalText.length) {
                clearInterval(typingInterval);
                // タイピング完了後にカーソル点滅効果
                subtitle.style.borderRight = '2px solid #667eea';
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// ===== イベントハンドラー関数 =====
function handleProjectCardHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-10px) scale(1.02)';
    
    // 関連する技術アイテムをハイライト
    const techItems = card.querySelectorAll('.project-tech-item');
    techItems.forEach(item => {
        item.style.background = 'rgba(255, 255, 255, 0.4)';
        item.style.transform = 'scale(1.1)';
    });
}

function handleProjectCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
    
    const techItems = card.querySelectorAll('.project-tech-item');
    techItems.forEach(item => {
        item.style.background = 'rgba(255, 255, 255, 0.2)';
        item.style.transform = 'scale(1)';
    });
}

function handleProjectCardClick(e) {
    const card = e.currentTarget;
    
    // クリック時のパルス効果
    card.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
    
    // プロジェクト詳細の展開（実装例）
    showProjectDetails(card);
}

function handleTechCardHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-5px) scale(1.02)';
    
    // カード内の技術アイテムをアニメーション
    const techItems = card.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.1) rotate(2deg)';
        }, index * 50);
    });
}

function handleTechCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
    
    const techItems = card.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.style.transform = 'scale(1) rotate(0deg)';
    });
}

function handleTechItemClick(e) {
    const item = e.currentTarget;
    const techName = item.textContent;
    
    // クリックした技術のハイライト効果
    item.style.background = 'rgba(255, 255, 255, 0.5)';
    item.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        item.style.background = 'rgba(255, 255, 255, 0.2)';
        item.style.transform = 'scale(1)';
    }, 300);
    
    // 技術情報の表示（実装例）
    showTechInfo(techName);
}

function handleContactLinkHover(e) {
    const link = e.currentTarget;
    link.style.transform = 'translateY(-3px) scale(1.05)';
    link.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.3)';
}

function handleContactLinkLeave(e) {
    const link = e.currentTarget;
    link.style.transform = 'translateY(0) scale(1)';
    link.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
}

function handleProfileClick(e) {
    const profileImg = e.currentTarget;
    
    // 回転アニメーション
    profileImg.style.transform = 'scale(1.1) rotate(360deg)';
    
    setTimeout(() => {
        profileImg.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
    
    // イースターエッグ的な効果
    createParticleEffect(profileImg);
}

// ===== ユーティリティ関数 =====
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // プログレスバーの更新（必要に応じて）
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

function showProjectDetails(card) {
    const projectTitle = card.querySelector('h3').textContent;
    
    // モーダルやアコーディオンで詳細表示（簡易実装例）
    console.log(`${projectTitle}の詳細を表示`);
    
    // 実際の実装では、モーダルウィンドウやページ遷移を行う
    // alert(`${projectTitle}の詳細ページに移動します`);
}

function showTechInfo(techName) {
    console.log(`${techName}の情報を表示`);
    
    // 技術の詳細情報を表示する実装例
    const techDescriptions = {
        'React': '勉強中',
        //'Node.js': 'サーバーサイドJavaScript実行環境',
        'Python': '学部の卒業研究や、自身の制作物に使っている',
        'JavaScript': 'このサイトを作るために使用'
    };
    
    const description = techDescriptions[techName] || `${techName}について学習中です`;
    
    // ツールチップ風の表示（実装例）
    showTooltip(description);
}

function createParticleEffect(element) {
    // パーティクル効果の簡易実装
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        
        // ランダムな方向に飛ばす
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100 + Math.random() * 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
}

function showTooltip(text) {
    // 既存のツールチップを削除
    const existingTooltip = document.querySelector('.custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        max-width: 300px;
        text-align: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // フェードイン
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
    });
    
    // 3秒後に自動削除
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, 3000);
}

// ===== スムーズスクロール機能 =====
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== テーマ切り替え機能（オプション）=====
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // テーマ設定をローカルストレージに保存
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
}

// ===== キーボードナビゲーション =====
document.addEventListener('keydown', function(e) {
    // ESCキーでモーダルやツールチップを閉じる
    if (e.key === 'Escape') {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    // Spaceキーでプロフィール画像のアニメーション
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.click();
        }
    }
});

// ===== パフォーマンス最適化 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// リサイズイベントのデバウンス処理
window.addEventListener('resize', debounce(function() {
    // リサイズ時の処理
    updateLayout();
}, 250));

function updateLayout() {
    // レイアウトの再計算や調整
    console.log('Layout updated');
}

// ===== エラーハンドリング =====
window.addEventListener('error', function(e) {
    console.warn('エラーが発生しました:', e.error);
    // 本番環境では適切なエラーレポーティングを実装
});

// ===== 初期化完了ログ =====
console.log('Portfolio JavaScript initialized successfully!');

// ===== 開発者向けユーティリティ（本番では削除） =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('開発モードで実行中');
    
    // 開発者向けのヘルパー関数
    window.portfolioUtils = {
        showAllAnimations: () => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        },
        resetAnimations: () => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.remove('visible');
            });
        },
        testParticles: () => {
            const profileImg = document.querySelector('.profile-img');
            if (profileImg) createParticleEffect(profileImg);
        }
    };
}