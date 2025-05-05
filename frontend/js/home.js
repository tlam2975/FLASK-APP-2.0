// Sample data for listings
const initialListings = [
    {
        id: 1,
        title: "Sách Giáo Khoa Toán Lớp 10",
        image: "https://via.placeholder.com/300x200",
        description: "Sách giáo khoa toán lớp 10, đã sử dụng 1 năm, còn rất mới, không có ghi chú.",
        price: "50.000đ",
        seller: "Nguyễn Văn A",
        contact: "0912345678"
    },
    {
        id: 2,
        title: "Bộ Dụng Cụ Vẽ Kỹ Thuật",
        image: "https://via.placeholder.com/300x200",
        description: "Bộ dụng cụ vẽ kỹ thuật đầy đủ, bao gồm thước kẻ, compa, thước đo góc. Đã sử dụng nhưng còn rất tốt.",
        price: "120.000đ",
        seller: "Trần Thị B",
        contact: "0987654321"
    },
    {
        id: 3,
        title: "Máy Tính Casio FX-570VN Plus",
        image: "https://via.placeholder.com/300x200",
        description: "Máy tính khoa học Casio FX-570VN Plus, đã sử dụng 2 năm, hoạt động tốt, pin mới thay.",
        price: "200.000đ",
        seller: "Lê Văn C",
        contact: "0969696969"
    },
    {
        id: 4,
        title: "Balo Học Sinh",
        image: "https://via.placeholder.com/300x200",
        description: "Balo học sinh màu xanh, nhiều ngăn, chống thấm nước, đã sử dụng 1 học kỳ.",
        price: "150.000đ",
        seller: "Phạm Thị D",
        contact: "0932123456"
    },
    {
        id: 5,
        title: "Bộ Sách Tham Khảo Lớp 12",
        image: "https://via.placeholder.com/300x200",
        description: "Bộ sách tham khảo đầy đủ các môn lớp 12, bao gồm Toán, Văn, Anh, Lý, Hóa, Sinh.",
        price: "350.000đ",
        seller: "Hoàng Văn E",
        contact: "0977888999"
    }
];

// DOM Elements
const listingsContainer = document.getElementById('listings-container');
const detailContainer = document.getElementById('detail-container');
const emptyState = document.getElementById('empty-state');
const itemDetail = document.getElementById('item-detail');
const newListingForm = document.getElementById('new-listing-form');
const searchInput = document.getElementById('search-input');
const newListingBtn = document.getElementById('new-listing-btn');
const emptyNewListingBtn = document.getElementById('empty-new-listing-btn');
const cancelBtn = document.getElementById('cancel-btn');
const listingForm = document.getElementById('listing-form');

// Current state
let listings = [...initialListings];
let selectedListingId = null;

// Initialize the app
function init() {
    renderListings();
    setupEventListeners();
}

// Render listings
function renderListings(filterTerm = '') {
    listingsContainer.innerHTML = '';
    
    const filteredListings = filterTerm 
        ? listings.filter(listing => 
            listing.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            listing.description.toLowerCase().includes(filterTerm.toLowerCase())
          )
        : listings;
    
    if (filteredListings.length === 0) {
        listingsContainer.innerHTML = '<p class="no-results">Không tìm thấy kết quả phù hợp.</p>';
        return;
    }
    
    filteredListings.forEach(listing => {
        const isSelected = listing.id === selectedListingId;
        const card = document.createElement('div');
        card.className = `listing-card ${isSelected ? 'selected' : ''}`;
        card.dataset.id = listing.id;
        
        card.innerHTML = `
            <div class="listing-card-content">
                <img src="${listing.image}" alt="${listing.title}">
                <h3>${listing.title}</h3>
                <p class="price">${listing.price}</p>
            </div>
        `;
        
        card.addEventListener('click', () => selectListing(listing.id));
        listingsContainer.appendChild(card);
    });
}

// Select a listing
function selectListing(id) {
    selectedListingId = id;
    const listing = listings.find(item => item.id === id);
    
    // Update UI
    renderListings(searchInput.value);
    showItemDetail(listing);
}

// Show item detail
function showItemDetail(listing) {
    // Hide other views
    emptyState.classList.add('hidden');
    newListingForm.classList.add('hidden');
    
    // Show detail view
    itemDetail.classList.remove('hidden');
    
    // Populate detail view
    itemDetail.innerHTML = `
        <div class="item-detail-header">
            <h2>${listing.title}</h2>
            <p class="price">${listing.price}</p>
        </div>
        
        <div class="item-detail-image">
            <img src="${listing.image}" alt="${listing.title}">
        </div>
        
        <div class="item-detail-info">
            <div>
                <h3>Mô tả</h3>
                <p>${listing.description}</p>
            </div>
            
            <div>
                <h3>Thông tin người bán</h3>
                <p>Người bán: ${listing.seller}</p>
                <p>Liên hệ: ${listing.contact}</p>
            </div>
        </div>
        
        <div class="item-detail-actions">
            <button class="btn btn-primary" onclick="window.location.href ='/payment'">Thanh toán ngay</button>
        </div>
    `;
}

// Show new listing form
function showNewListingForm() {
    // Reset selection
    selectedListingId = null;
    renderListings(searchInput.value);
    
    // Hide other views
    emptyState.classList.add('hidden');
    itemDetail.classList.add('hidden');
    
    // Show form
    newListingForm.classList.remove('hidden');
}

// Show empty state
function showEmptyState() {
    // Reset selection
    selectedListingId = null;
    renderListings(searchInput.value);
    
    // Hide other views
    itemDetail.classList.add('hidden');
    newListingForm.classList.add('hidden');
    
    // Show empty state
    emptyState.classList.remove('hidden');
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        renderListings(e.target.value);
    });
    
    // New listing buttons
    newListingBtn.addEventListener('click', showNewListingForm);
    emptyNewListingBtn.addEventListener('click', showNewListingForm);
    
    // Cancel button
    cancelBtn.addEventListener('click', () => {
        if (listings.length === 0) {
            showEmptyState();
        } else {
            showEmptyState();
        }
    });
    
    // Form submission
    listingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const contact = document.getElementById('contact').value;
        
        // Create new listing
        const newListing = {
            id: Date.now(), // Use timestamp as ID
            title,
            price,
            description,
            image: 'https://via.placeholder.com/300x200',
            seller: 'Người dùng mới',
            contact
        };
        
        // Add to listings
        listings = [newListing, ...listings];
        
        // Reset form
        listingForm.reset();
        
        // Show the new listing
        renderListings(searchInput.value);
        selectListing(newListing.id);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);