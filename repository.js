// src/repository.js
class Repository {
    constructor() {
        this.data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
    }

    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => item.id === id);
    }

    addItem(item) {
        this.data.push(item);
        return item;
    }

    // Metode baru untuk menghapus item berdasarkan ID
    deleteItemById(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true; // Mengembalikan true jika item berhasil dihapus
        }
        return false; // Mengembalikan false jika item tidak ditemukan
    }
}

// Ekspor default
export default Repository;
