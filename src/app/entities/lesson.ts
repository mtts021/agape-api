import {randomUUID} from 'node:crypto';
import slug from 'slug';

interface LessonProps {
    theme: string
    mainText: string
    bibleText: string
    content: string
    createdAt?: Date
    updatedAt?: Date | null
    magazineSlug: string
}

export class Lesson {
    private _id: string;
    private _slug: string;
    private props: LessonProps;

    constructor(props: LessonProps, id?: string, propsSlug?: string) {
        if(props.theme.length <= 15){
            throw new Error('Len main text invalid');
        }
        if(props.mainText.length <= 10){
            throw new Error('Len main text invalid');
        }
        if(props.bibleText.length <= 20){
            throw new Error('Len bible text invalid');
        }
        if(props.content.length <= 100){
            throw new Error('Len bible text invalid');
        }

        this._id = id ?? randomUUID();
        this._slug = propsSlug ?? slug(props.theme);
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        };
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
    get mainText(): string {
        return this.props.mainText;
    }
    set mainText(mainText: string) {
        this.props.mainText = mainText;
    }

    get bibleText(): string {
        return this.props.bibleText;
    }
    set bibleText(bibleText: string) {
        this.props.bibleText = bibleText;
    }

    get content(): string {
        return this.props.content;
    }
    set content(content: string) {
        this.props.content = content;
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
    
    get magazineSlug(): string {
        return this.props.magazineSlug;
    }
}