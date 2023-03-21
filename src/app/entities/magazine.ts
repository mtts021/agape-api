import { randomUUID } from 'node:crypto';
import slug from 'slug';

interface MagazineProps {
    theme: string
    descriptionTheme: string
    quarter: string
    year: string
    ageGroup: string
    createdAt?: Date
    updatedAt?: Date | null
}

export class Magazine {
    private props: MagazineProps;
    private _id: string;
    private _slug: string;

    constructor(props: MagazineProps, id?: string, propSlug?: string) {
        if(props.theme.length <= 10) {
            throw new Error('Length theme invalid');
        }
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        };
        
        this._id = id ?? randomUUID();
        this._slug = propSlug ?? slug(props.theme);
    }

    get id(): string {
        return this._id;
    }
    get slug(): string {
        return this._slug;
    }
    set slug(slug: string) {
        this._slug = slug;
    }

    get theme(): string {
        return this.props.theme;
    }
    set theme(theme: string) {
        this.props.theme = theme;
    }
    get descriptionTheme(): string {
        return this.props.descriptionTheme;
    }
    set descriptionTheme(descriptionTheme: string) {
        this.props.descriptionTheme = descriptionTheme;
    }
    
    get quarter(): string {
        return this.props.quarter;
    }
    set quarter(quarter: string) {
        this.props.quarter = quarter;
    }
    get year(): string {
        return this.props.year;
    }
    set year(year: string) {
        this.props.year = year;
    }

    get ageGroup(): string {
        return this.props.ageGroup;
    }
    set ageGroup(ageGroup: string) {
        this.props.ageGroup = ageGroup;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | undefined | null {
        return this.props.updatedAt;
    }
    update() {
        this.props.updatedAt = new Date();
    }

}
