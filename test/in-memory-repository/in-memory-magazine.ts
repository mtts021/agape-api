import { Magazine } from '../../src/app/entities/magazine';
import { MagazineRepository } from '../../src/app/repositories/magazine-repository';

export class InMemoryMagazineRepository implements MagazineRepository {
    public magazines: Magazine[] = [];
        
    async create(magazine: Magazine): Promise<void> {
        this.magazines.push(magazine);
    }
        
    async getAll(): Promise<Magazine[]> {
        return this.magazines;
    }
    async findById(id: string): Promise<Magazine | null> {
        const magazine =  this.magazines.find(magazine => magazine.id == id);
            
        if(!magazine){
            return null;
        }
            
        return magazine;
    }

    async findBySlug(slug: string): Promise<Magazine | null> {
        const magazine =  this.magazines.find(magazine => magazine.slug == slug);
            
        if(!magazine){
            return null;
        }
            
        return magazine;
    }
        
    async update(request: Magazine): Promise<void> {
        const magazine =  this.magazines.find(magazine => magazine.id == request.id);
    
        if(!magazine) {
            throw new Error('magazine not found');
        }
            
        const index = this.magazines.indexOf(magazine);
        this.magazines[index] = request;
    }
    
    async delete(magazineSlug: string): Promise<void> {
        const magazine =  this.magazines.find(magazine => magazine.slug == magazineSlug);
        if(!magazine){
            throw new Error('magazine not found');
        }
         
        const index = this.magazines.indexOf(magazine);
        if(index < 0){
            throw new Error('index not found');
        }
    
        this.magazines.splice(index, 1);
    }
}