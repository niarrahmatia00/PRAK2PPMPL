// src/service.js
import Repository from './repository.js';
import PrimaryRepository from './repository.js'; // Jika kamu menggunakannya
import SecondaryRepository from './secondaryRepository.js';

class Service {
    constructor() {
        this.repository = new Repository();
        this.primaryRepository = new PrimaryRepository(); // Jika perlu
        this.secondaryRepository = new SecondaryRepository();
    }

    getAllItems() {
        return this.repository.getAllItems();
    }

    getItemById(id) {
        let item = this.primaryRepository.getItemById(id);
        if (!item) {
            item = this.secondaryRepository.getItemById(id);
        }
        if (!item) {
            throw new Error('Item not found in both repositories');
        }
        return item;
    }

    addItem(name) {
        const newItem = { id: this.repository.data.length + 1, name };
        return this.repository.addItem(newItem);
    }

    // Metode baru untuk menghapus item berdasarkan ID
    deleteItemById(id) {
        return this.repository.deleteItemById(id);
    }
}

// Ekspor default
export default Service;
