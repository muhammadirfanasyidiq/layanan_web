// Fungsi untuk memuat data mobil dari API
async function loadCarData() {
    try {
        const response = await fetch('http://localhost:8080/cars');
        if (!response.ok) {
            throw new Error('Gagal mengambil data mobil');
        }
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Error:', error);
        // Jika API gagal, gunakan data default
        displayDefaultCars();
    }
}

// Fungsi untuk menampilkan data mobil di UI
function displayCars(cars) {
    const carListContainer = document.getElementById('carListContainer');
    carListContainer.innerHTML = '';
    
    if (cars && cars.length > 0) {
        cars.forEach(car => {
            const carCard = createCarCard(car);
            carListContainer.appendChild(carCard);
        });
    } else {
        carListContainer.innerHTML = '<p class="no-data">Tidak ada data mobil yang tersedia.</p>';
    }
}

// Fungsi untuk membuat elemen kartu mobil
function createCarCard(car) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'car-card';
    
    cardDiv.innerHTML = `
        <div class="car-header">
            ${car.model || 'Model Tidak Tersedia'}
            <div class="car-actions">
                <button class="btn-icon btn-edit" data-id="${car.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" data-id="${car.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="car-body">
            <h3 class="car-title">${car.brand} ${car.model}</h3>
            <div class="car-price">Rp. ${formatPrice(car.price)}</div>
            <div class="car-details">
                <div class="car-detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${car.year}</span>
                </div>
                <div class="car-detail-item">
                    <i class="fas fa-cog"></i>
                    <span>${car.transmission}</span>
                </div>
                <div class="car-detail-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>${car.cc} CC</span>
                </div>
            </div>
        </div>
        <div class="car-footer">
            <button class="btn-detail" data-id="${car.id}">Lihat Detail</button>
        </div>
    `;
    
    // Tambahkan event listeners untuk tombol-tombol
    addCardEventListeners(cardDiv, car.id);
    
    return cardDiv;
}

// Tambahkan event listeners untuk tombol di kartu mobil
function addCardEventListeners(cardElement, carId) {
    // Event untuk tombol edit
    const editBtn = cardElement.querySelector('.btn-edit');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            editCar(carId);
        });
    }
    
    // Event untuk tombol delete
    const deleteBtn = cardElement.querySelector('.btn-delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            deleteCar(carId);
        });
    }
    
    // Event untuk tombol detail
    const detailBtn = cardElement.querySelector('.btn-detail');
    if (detailBtn) {
        detailBtn.addEventListener('click', () => {
            viewCarDetail(carId);
        });
    }
}

// Format harga untuk tampilan UI
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Fungsi-fungsi untuk aksi mobil
function editCar(id) {
    console.log(`Edit mobil dengan ID: ${id}`);
    // Implementasi fungsi edit mobil
}

function deleteCar(id) {
    if (confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
        console.log(`Hapus mobil dengan ID: ${id}`);
        // Implementasi fungsi hapus mobil dengan API
        
        // Contoh implementasi:
        // fetch(`http://localhost:8080/cars/${id}`, {
        //     method: 'DELETE'
        // })
        // .then(response => {
        //     if (response.ok) {
        //         loadCarData(); // Reload data setelah hapus
        //     }
        // })
        // .catch(error => console.error('Error:', error));
    }
}

function viewCarDetail(id) {
    console.log(`Lihat detail mobil dengan ID: ${id}`);
    // Implementasi navigasi ke halaman detail
    // window.location.href = `detail-mobil.html?id=${id}`;
}

// Tambahkan event listener untuk tombol tambah mobil
document.addEventListener('DOMContentLoaded', () => {
    const addCarBtn = document.getElementById('btnTambahMobil');
    if (addCarBtn) {
        addCarBtn.addEventListener('click', () => {
            // Navigasi ke halaman tambah mobil atau buka modal
            console.log('Tambah Data Mobil diklik');
            // window.location.href = 'tambah-mobil.html';
        });
    }
    
    // Fungsi untuk pagination
    const prevPageBtn = document.getElementById('prevPage');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            console.log('Previous page');
            // Implementasi navigasi halaman sebelumnya
        });
    }
    
    const nextPageBtn = document.getElementById('nextPage');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            console.log('Next page');
            // Implementasi navigasi halaman berikutnya
        });
    }
    
    // Muat data mobil
    loadCarData();
});

// Data default jika API gagal
function displayDefaultCars() {
    const defaultCars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Innova',
            price: 350000000,
            year: 2023,
            transmission: 'Automatic',
            cc: 2495
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
            price: 425000000,
            year: 2023,
            transmission: 'Automatic',
            cc: 2488
        },
        {
            id: 3,
            brand: 'Mitsubishi',
            model: 'Xpander',
            price: 350000000,
            year: 2023,
            transmission: 'Automatic',
            cc: 2298
        }
    ];
    
    displayCars(defaultCars);
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('modalTambahMobil');
    const btnTambahMobil = document.getElementById('btnTambahMobil');
    const closeModal = document.querySelector('.close-modal');
    const btnBatal = document.getElementById('btnBatal');
    
    // Buka modal saat tombol tambah diklik
    btnTambahMobil.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Mencegah scroll pada body
    });
    
    // Tutup modal dengan tombol close
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Kembalikan scroll pada body
    });
    
    // Tutup modal dengan tombol Batal
    btnBatal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Tutup modal ketika klik diluar konten modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Setup file input
    setupFileInput();
    
    // Handle form submission
    const formTambahMobil = document.getElementById('formTambahMobil');
    formTambahMobil.addEventListener('submit', handleFormSubmit);
}

// Setup custom file input
function setupFileInput() {
    const fileInput = document.getElementById('fotoMobil');
    const fileName = document.querySelector('.file-name');
    const btnFile = document.querySelector('.btn-file');
    
    btnFile.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'No File Selected';
        }
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Ambil nilai dari form
    const namaMobil = document.getElementById('namaMobil').value;
    const merek = document.getElementById('merek').value;
    const harga = document.getElementById('harga').value;
    const tahun = document.getElementById('tahun').value;
    const stock = document.getElementById('stock').value;
    const status = document.getElementById('status').value;
    
    // Validasi form sederhana
    if (!namaMobil || !merek || !harga || !tahun || !stock) {
        alert('Mohon isi semua field yang diperlukan!');
        return;
    }
    
    // Buat objek data mobil
    const carData = {
        model: namaMobil,
        brand: merek,
        price: parseInt(harga),
        year: parseInt(tahun),
        stock: parseInt(stock),
        status: status,
        specifications: {
            engineType: document.getElementById('tipeMesin').value,
            horsePower: document.getElementById('tenaga').value,
            torque: document.getElementById('torsi').value,
            driveSystem: document.getElementById('sistemPenggerak').value,
            safetyFeatures: document.getElementById('fiturKeselamatan').value,
            interiorFeatures: document.getElementById('fiturInterior').value,
            connectivity: document.getElementById('konektivitas').value,
            airConditioning: document.getElementById('ac').value
        }
    };
    
    console.log('Data mobil yang dikirim:', carData);
    
    // Kirim data ke API
    addCar(carData);
}

// Fungsi untuk mengirim data mobil ke API
async function addCar(carData) {
    try {
        const response = await fetch('http://localhost:8080/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });
        
        if (!response.ok) {
            throw new Error('Gagal menambahkan data mobil');
        }
        
        // Reset form dan tutup modal jika berhasil
        document.getElementById('formTambahMobil').reset();
        document.querySelector('.file-name').textContent = 'No File Selected';
        document.getElementById('modalTambahMobil').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Refresh data mobil
        loadCarData();
        
        alert('Data mobil berhasil ditambahkan!');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal menambahkan data mobil. Silakan coba lagi.');
    }
}

// Tambahkan ke event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Kode yang sudah ada
    const addCarBtn = document.getElementById('btnTambahMobil');
    if (addCarBtn) {
        addCarBtn.addEventListener('click', () => {
            // Jangan navigasi ke halaman baru, buka modal sebagai gantinya
            console.log('Tambah Data Mobil diklik');
        });
    }
    
    // Set up modal
    setupModal();
    
    // Fungsi untuk pagination (dari kode sebelumnya)
    const prevPageBtn = document.getElementById('prevPage');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            console.log('Previous page');
        });
    }
    
    const nextPageBtn = document.getElementById('nextPage');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            console.log('Next page');
        });
    }
    
    // Muat data mobil
    loadCarData();
});