// Membuat komponen header dan menambahkannya ke dalam container
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    
    const headerContent = `
        <div class="header">
            <div class="header-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>Admin</span>
                <i class="fas fa-caret-down"></i>
            </div>
        </div>
    `;
    
    headerContainer.innerHTML = headerContent;
    
    // Event listener untuk toggle sidebar (opsional)
    const headerToggle = document.querySelector('.header-toggle');
    if (headerToggle) {
        headerToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });
    }
}

// Load header saat dokumen dimuat
document.addEventListener('DOMContentLoaded', loadHeader);