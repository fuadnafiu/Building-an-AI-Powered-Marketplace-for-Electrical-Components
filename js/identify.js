// Part Identification Page Functionality

// Method switching
const methodButtons = document.querySelectorAll('.method-btn');
const methodContents = document.querySelectorAll('.method-content');

methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const method = btn.dataset.method;
        
        // Update active button
        methodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active content
        methodContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${method}-upload`).classList.add('active');
    });
});

// Drag and drop functionality
const dropZone = document.getElementById('dropZone');
const photoInput = document.getElementById('photoInput');
const previewArea = document.getElementById('previewArea');
const previewImage = document.getElementById('previewImage');

if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over');
        }, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

if (photoInput) {
    photoInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        
        // Store file globally for API upload
        window.currentFile = file;
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                document.getElementById('photo-upload').querySelector('.upload-zone').style.display = 'none';
                previewArea.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }
}

function resetUpload() {
    previewArea.style.display = 'none';
    document.getElementById('photo-upload').querySelector('.upload-zone').style.display = 'block';
    previewImage.src = '';
    window.currentFile = null;
    if (photoInput) photoInput.value = '';
    document.getElementById('resultsContainer').style.display = 'none';
}

async function analyzeImage() {
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Show loading state
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="spinner"></div>
            <p style="margin-top: 1rem; color: #6b7280;">🔍 Analyzing image with AI...</p>
            <p style="margin-top: 0.5rem; color: #9ca3af; font-size: 0.9rem;">Connecting to backend...</p>
        </div>
    `;
    resultsContainer.style.display = 'block';
    
    try {
        // Get the uploaded file
        if (!window.currentFile) {
            throw new Error('No file selected');
        }
        
        // Create form data
        const formData = new FormData();
        formData.append('file', window.currentFile);
        
        // Call backend API
        const apiResponse = await fetch('/api/identify-part', {
            method: 'POST',
            body: formData
        });
        
        if (!apiResponse.ok) {
            throw new Error(`API returned ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
        
        console.log('✅ API Response received:', data); // Debug: see actual response
        
        if (data.success) {
            try {
                displayRealResults(data);
            } catch (displayError) {
                console.error('Display error:', displayError);
                resultsContainer.innerHTML = `
                    <div style="padding: 2rem; background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px;">
                        <h3 style="color: #10b981;">✅ Part Identified!</h3>
                        <p><strong>Part:</strong> ${data.part?.name || 'Unknown'}</p>
                        <p><strong>Confidence:</strong> ${data.part?.confidence || 0}%</p>
                        <p><strong>Category:</strong> ${data.part?.category || 'Unknown'}</p>
                        <pre style="background: #f3f4f6; padding: 1rem; border-radius: 4px; overflow: auto;">${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;
                resultsContainer.style.display = 'block';
            }
        } else {
            showError('Failed to identify part. Please try again.');
        }
        
    } catch (error) {
        console.error('Error:', error);
        console.log('Full error details:', {
            message: error.message,
            stack: error.stack,
            apiResponse: error.response
        });
        
        // Show detailed error for debugging
        showError(`⚠️ Error: ${error.message}<br><br>
            <strong>Debug Info:</strong><br>
            Check browser console (F12) for details<br><br>
            <small>If error persists, try refreshing the page</small>
        `);
    }
}

// Display real API results
function displayRealResults(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Extract part info (API sends nested structure)
    const partInfo = data.part || {};
    const confidence = partInfo.confidence || 0;
    const partName = partInfo.name || 'Unknown Part';
    const category = partInfo.category || 'Unknown';
    const detectedType = partInfo.detected_type || '';
    
    // Format specifications
    let specsHTML = '';
    if (data.specifications) {
        for (const [key, value] of Object.entries(data.specifications)) {
            specsHTML += `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</li>`;
        }
    }
    
    // Format applications
    let applicationsHTML = '';
    if (data.applications && data.applications.length > 0) {
        applicationsHTML = data.applications.map(app => 
            `<span class="app-tag">${app}</span>`
        ).join('');
    }
    
    // Format vendors
    let vendorsHTML = '';
    if (data.vendors && data.vendors.length > 0) {
        vendorsHTML = data.vendors.map(vendor => `
            <div class="vendor-card">
                <div class="vendor-info">
                    <h4>${vendor.name}</h4>
                    <div class="rating">⭐ ${vendor.rating}</div>
                    <div class="location">📍 ${vendor.location}</div>
                </div>
                <button class="btn-contact" onclick="window.open('mailto:contact@${vendor.name.toLowerCase().replace(/\s+/g, '')}.com')">Contact Vendor</button>
            </div>
        `).join('');
    }
    
    // Get pricing info
    const pricing = data.pricing || {};
    
    resultsContainer.innerHTML = `
        <div class="results-header">
            <div class="confidence-badge">
                <span class="confidence-label">✓ Part Identified!</span>
                <span class="confidence-score">
                    <span class="score-value">AI Confidence: ${confidence.toFixed(1)}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${confidence}%; background: #10b981;"></div>
                    </div>
                </span>
            </div>
            ${data.method ? `<div class="method-badge"><small>🔬 ${data.method}</small></div>` : ''}
        </div>

        <div class="part-details">
            <div class="part-info">
                <h3>${partName}</h3>
                <p class="detected-type"><strong>Detected as:</strong> ${detectedType}</p>
                <p class="category"><strong>Category:</strong> ${category}</p>
            </div>

            ${specsHTML ? `
                <div class="specifications">
                    <h4>📋 Specifications</h4>
                    <ul>${specsHTML}</ul>
                </div>
            ` : ''}

            ${applicationsHTML ? `
                <div class="applications">
                    <h4>🔧 Applications</h4>
                    <div class="app-tags">${applicationsHTML}</div>
                </div>
            ` : ''}

            ${pricing.estimated_range ? `
                <div class="price-section">
                    <h4>💰 Price Information</h4>
                    <div class="price-stats">
                        <div class="price-stat">
                            <span class="label">Estimated Range</span>
                            <span class="value">${pricing.estimated_range}</span>
                        </div>
                        <div class="price-stat">
                            <span class="label">Currency</span>
                            <span class="value">${pricing.currency || 'BDT'}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            ${vendorsHTML ? `
                <div class="vendors-section">
                    <h4>🏪 Available Vendors</h4>
                    <div class="vendors-grid">
                        ${vendorsHTML}
                    </div>
                </div>
            ` : ''}

            ${data.note ? `
                <div class="info-note">
                    <small>ℹ️ ${data.note}</small>
                </div>
            ` : ''}
        </div>
    `;
    
    resultsContainer.style.display = 'block';
}

function showError(message) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #ef4444;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
            <h3>Error</h3>
            <p style="margin: 1rem 0;">${message}</p>
            <button class="btn-primary" onclick="resetUpload()" style="margin-top: 1rem;">
                Try Again
            </button>
        </div>
    `;
    resultsContainer.style.display = 'block';
}

function searchByDescription() {
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Simulate search
    setTimeout(() => {
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// Options tabs switching
const optionTabs = document.querySelectorAll('.option-tab');
const optionContents = document.querySelectorAll('.option-content');

optionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        optionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        optionContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${targetTab}-parts`).classList.add('active');
    });
});

// Price alert functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-alert')) {
        alert('Price alert set! We\'ll notify you when the price drops.');
    }
});
