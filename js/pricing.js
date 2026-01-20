// Pricing Page Functionality

// Billing toggle (Monthly/Annual)
const billingToggle = document.getElementById('billingToggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Show annual prices
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'inline');
        } else {
            // Show monthly prices
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// Plan button handlers
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const planName = e.target.closest('.pricing-card').querySelector('.plan-header h3').textContent;
        
        if (planName === 'Free') {
            alert('Redirecting to free signup...');
        } else if (planName === 'Pro') {
            alert('Starting your 14-day free Pro trial! No credit card required.');
        } else if (planName === 'Enterprise') {
            alert('Contacting our sales team for enterprise pricing...');
        }
    });
});

// Price chart using Chart.js
const ctx = document.getElementById('priceChart');

if (ctx) {
    // Generate sample price data
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const prices = [1450, 1420, 1380, 1350, 1320, 1290, 1245, 1180, 950, 980, 1120, 1245];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Price History',
                data: prices,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Set price alert button
document.querySelectorAll('.chart-action').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetPrice = prompt('Enter your target price (e.g., 950):');
        if (targetPrice && !isNaN(targetPrice)) {
            alert(`Price alert set! We'll notify you when Siemens 6ES7 315-2EH14-0AB0 drops to $${targetPrice}.`);
        }
    });
});

// FAQ accordion animation
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Scroll animations for pricing cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    priceObserver.observe(card);
});

// Track plan selection for analytics (placeholder)
function trackPlanSelection(planName, billingCycle) {
    console.log(`Plan selected: ${planName}, Billing: ${billingCycle}`);
    // In production, this would send data to analytics service
}
