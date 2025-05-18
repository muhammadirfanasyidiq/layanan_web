// Membuat komponen sidebar dan menambahkannya ke dalam container
function loadSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    
    const sidebarContent = `
        <div class="sidebar">
            <div class="sidebar-brand">
                <span>MobilBagus</span>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li class="active">
                        <a href="dashboard.html">
                            <i class="fas fa-car"></i>
                            <span class="menu-text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="management-mobil.html">
                            <i class="fas fa-car"></i>
                            <span class="menu-text">Manajemen Mobil</span>
                        </a>
                    </li>
                    <li>
                        <a href="penjualan.html">
                            <i class="fas fa-chart-line"></i>
                            <span class="menu-text">Penjualan</span>
                        </a>
                    </li>
                    <li>
                        <a href="pelanggan.html">
                            <i class="fas fa-users"></i>
                            <span class="menu-text">Pelanggan</span>
                        </a>
                    </li>
                    <li>
                        <a href="layanan.html">
                            <i class="fas fa-headset"></i>
                            <span class="menu-text">Layanan</span>
                        </a>
                    </li>
                    <li>
                        <a href="pengaturan.html">
                            <i class="fas fa-cog"></i>
                            <span class="menu-text">Pengaturan</span>
                        </a>
                    </li>
                    <li>
                        <a href="keluar.html">
                            <i class="fas fa-sign-out-alt"></i>
                            <span class="menu-text">Keluar</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    sidebarContainer.innerHTML = sidebarContent;
    
    // Menambahkan event listener untuk menu
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Menghapus kelas aktif dari semua item
            menuItems.forEach(i => i.classList.remove('active'));
            // Menambahkan kelas aktif ke item yang diklik
            this.classList.add('active');
        });
    });
}

// Load sidebar saat dokumen dimuat
document.addEventListener('DOMContentLoaded', loadSidebar);