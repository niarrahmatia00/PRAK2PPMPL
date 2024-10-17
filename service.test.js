// test/service.test.js
import { createStubInstance } from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js';
import PrimaryRepository from '../src/repository.js';
import SecondaryRepository from '../src/secondaryRepository.js';

describe('Service Integration Tests with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        primaryRepositoryStub = createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = createStubInstance(SecondaryRepository);
        service = new Service();
        service.primaryRepository = primaryRepositoryStub;
        service.secondaryRepository = secondaryRepositoryStub;
    });

    it('should return item from primary repository if found', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);

        const result = service.getItemById(1);

        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true; 
    });

    it('should return item from secondary repository if not found in primary', () => {
        primaryRepositoryStub.getItemById.withArgs(3).returns(null);
        const item = { id: 3, name: 'Item 3' };
        secondaryRepositoryStub.getItemById.withArgs(3).returns(item);

        const result = service.getItemById(3);

        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true; 
    });

    it('should throw an error if item is not found in both repositories', () => {
        primaryRepositoryStub.getItemById.returns(null);
        secondaryRepositoryStub.getItemById.returns(null);

        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
        expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true; 
    });

   // Uji coba untuk metode deleteItemById
   it('should delete an item by ID', () => {
    const itemToDelete = { id: 1, name: 'Item 1' };

    // Pastikan item ada sebelum dihapus
    expect(service.repository.data).to.deep.include(itemToDelete);

    const result = service.deleteItemById(1); // Menghapus item dengan ID 1

    expect(result).to.be.true; // Harus mengembalikan true
    expect(service.repository.data).to.not.deep.include(itemToDelete); // Pastikan item telah dihapus
});

it('should return false if item to delete is not found', () => {
    const result = service.deleteItemById(999); // Menghapus item dengan ID yang tidak ada
    expect(result).to.be.false; // Harus mengembalikan false
});
});