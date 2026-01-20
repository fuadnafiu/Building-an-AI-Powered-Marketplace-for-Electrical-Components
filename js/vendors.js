// Vendors Page Functionality

// Vendor plan selection
document.querySelectorAll('.vendor-plan button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const planName = e.target.closest('.vendor-plan').querySelector('h3').textContent;
        
        if (planName === 'Standard') {
            alert('Starting Standard vendor account setup...');
        } else if (planName === 'Professional') {
            alert('Starting Professional vendor account setup with enhanced features!');
        } else if (planName === 'Enterprise') {
            alert('Our sales team will contact you within 24 hours to discuss custom enterprise pricing.');
        }
    });
});

// Smooth scroll to pricing section
document.querySelectorAll('a[href="#pricing"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scroll to how it works section
document.querySelectorAll('a[href="#how-it-works"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#how-it-works').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPercent = text.includes('%');
                const hasDollar = text.includes('$');
                const hasStar = text.includes('★');
                const hasPlus = text.includes('+');
                
                let target;
                if (hasDollar) {
                    target = parseFloat(text.replace(/[^0-9.]/g, ''));
                } else if (hasPercent || hasStar) {
                    target = parseFloat(text.replace(/[^0-9.]/g, ''));
                } else {
                    target = parseInt(text.replace(/[^0-9]/g, ''));
                }
                
                let current = 0;
                const increment = target / 30;
                const duration = 1000;
                const stepTime = duration / 30;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    let displayValue;
                    if (hasDollar) {
                        displayValue = '$' + current.toFixed(1) + 'M';
                    } else if (hasPercent) {
                        displayValue = Math.floor(current) + '%';
                    } else if (hasStar) {
                        displayValue = current.toFixed(1) + '★';
                    } else if (hasPlus) {
                        displayValue = Math.floor(current) + 'K+';
                    } else {
                        displayValue = Math.floor(current) + '+';
                    }
                    
                    stat.textContent = displayValue;
                }, stepTime);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStatsBox = document.querySelector('.hero-stats-box');
if (heroStatsBox) {
    statsObserver.observe(heroStatsBox);
}

// Animate benefit cards on scroll
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.benefit-card, .story-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    benefitObserver.observe(card);
});

// Success story metrics animation
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metrics = entry.target.querySelectorAll('.metric strong');
            metrics.forEach(metric => {
                const originalValue = metric.textContent;
                metric.textContent = '0';
                
                setTimeout(() => {
                    metric.textContent = originalValue;
                    metric.style.transition = 'all 0.8s ease';
                    metric.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        metric.style.transform = 'scale(1)';
                    }, 800);
                }, 200);
            });
            
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.story-metrics').forEach(metrics => {
    metricsObserver.observe(metrics);
});

// Track vendor signup interest
function trackVendorInterest(action) {
    console.log(`Vendor interest: ${action}`);
    // In production, this would send data to analytics
}

// Add event listeners for all CTA buttons
document.querySelectorAll('.vendor-cta button, .vendor-cta a').forEach(btn => {
    btn.addEventListener('click', () => {
        trackVendorInterest('CTA Click');
    });
});

console.log('Vendor page loaded successfully');
