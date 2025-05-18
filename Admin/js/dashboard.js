// Fetch Dashboard Data
async function fetchDashboardData() {
    try {
        const response = await fetch('http://localhost:8080/dashboard');
        if (!response.ok) {
            throw new Error('Gagal mengambil data dashboard');
        }
        const data = await response.json();
        
        // Update dashboard cards
        document.getElementById('total-penjualan').textContent = data.totalPenjualan || 32;
        document.getElementById('total-pendapatan').textContent = 
            `Rp. ${(data.totalPendapatan / 1000000).toFixed(1)}M` || 'Rp. 1,5M';
        document.getElementById('total-stok').textContent = data.stokMobil || 42;
        
        // Initialize charts with the data
        initializeCharts(data);
        
    } catch (error) {
        console.error('Error:', error);
        // Use default values if API fails
        initializeChartsWithDefaultData();
    }
}

// Fetch Notifications
async function fetchNotifications() {
    try {
        const response = await fetch('http://localhost:8080/notifications');
        if (!response.ok) {
            throw new Error('Gagal mengambil notifikasi');
        }
        const notifications = await response.json();
        
        displayNotifications(notifications);
        
    } catch (error) {
        console.error('Error:', error);
        // Use default notifications if API fails
        displayDefaultNotifications();
    }
}

// Display notifications in the UI
function displayNotifications(notifications) {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';
    
    notifications.forEach(notif => {
        const statusClass = notif.status === 'Selesai' ? 'status-done' : 'status-pending';
        const notificationItem = `
            <div class="notification-item">
                <div class="notification-info">
                    <div class="notification-title">${notif.title}</div>
                    <div class="notification-subtitle">${notif.subtitle}</div>
                </div>
                <div class="notification-status ${statusClass}">${notif.status}</div>
            </div>
        `;
        notificationList.innerHTML += notificationItem;
    });
}

// Default notifications if API fails
function displayDefaultNotifications() {
    const defaultNotifications = [
        {
            title: 'Pembayaran Diterima',
            subtitle: 'Budi Santoso - Toyota Innova',
            status: 'Selesai'
        },
        {
            title: 'Layanan service',
            subtitle: 'Siti Rahayu - Honda Civic',
            status: 'Selesai'
        },
        {
            title: 'Layanan Service',
            subtitle: 'Ahmad Fauzi - Mitsubishi Xpander',
            status: 'Menunggu'
        }
    ];
    
    displayNotifications(defaultNotifications);
}

// Initialize charts with data from API
function initializeCharts(data) {
    // Line Chart - Monthly Sales
    const lineChartCtx = document.createElement('canvas');
    document.getElementById('line-chart').appendChild(lineChartCtx);
    
    new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [
                {
                    label: 'Penjualan 2023',
                    data: data.monthlyData2023 || [30, 15, 30, 35, 25, 35, 30, 25, 35, 15, 35, 30],
                    borderColor: '#5a55ca',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Penjualan 2024',
                    data: data.monthlyData2024 || [25, 20, 25, 20, 30, 30, 25, 15, 25, 25, 30, 25],
                    borderColor: '#8bc34a',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#eee'
                    }
                },
                x: {
                    grid: {
                        color: '#eee'
                    }
                }
            }
        }
    });

    // Pie Chart - Sales by Brand
    const pieChartCtx = document.createElement('canvas');
    document.getElementById('pie-chart').appendChild(pieChartCtx);
    
    new Chart(pieChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Honda', 'Toyota', 'Daihatsu', 'Suzuki', 'Mitsubishi'],
            datasets: [{
                data: data.salesByBrand || [30, 25, 15, 10, 20],
                backgroundColor: [
                    '#5a55ca',
                    '#2a6d85',
                    '#d9534f',
                    '#f0ad4e',
                    '#8bc34a'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12
                    }
                }
            }
        }
    });
}

// Initialize charts with default data if API fails
function initializeChartsWithDefaultData() {
    initializeCharts({
        monthlyData2023: [30, 15, 30, 35, 25, 35, 30, 25, 35, 15, 35, 30],
        monthlyData2024: [25, 20, 25, 20, 30, 30, 25, 15, 25, 25, 30, 25],
        salesByBrand: [30, 25, 15, 10, 20]
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData();
    fetchNotifications();
});