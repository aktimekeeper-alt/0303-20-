// Shared JavaScript for Burnout App Demos

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBar = document.getElementById('searchBar');

    if (searchInput && searchBar) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchBar.classList.add('has-text');
            } else {
                searchBar.classList.remove('has-text');
            }
        });
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBar = document.getElementById('searchBar');
    if (searchInput) searchInput.value = '';
    if (searchBar) searchBar.classList.remove('has-text');
}

// Navigation
function setActiveNav(element) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// Back button navigation
function goBack() {
    window.history.back();
}

// Format numbers with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// Show toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 122, 255, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 20px;
        font-size: 15px;
        font-weight: 600;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();

    // Add click handlers to pill buttons
    document.querySelectorAll('.btn-pill').forEach(pill => {
        if (!pill.hasAttribute('data-filter')) {
            pill.addEventListener('click', function() {
                document.querySelectorAll('.btn-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        }
    });

    // Add fade-in animation to content
    const cards = document.querySelectorAll('.content-card, .stat-display');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});
