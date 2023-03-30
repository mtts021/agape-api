import {randomUUID} from 'node:crypto';
import bcrypt from 'bcrypt';

interface Props {
    username: string
    password: string
    createdAt?: Date
    updatedAt?: Date | null
}

export default class Admin {

    private _id: string;
    private props: Props;

    constructor(props: Props, id?: string) {
        this._id = id ?? randomUUID();

        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        };
    }

    get id(): string {
        return this._id;
    }

    get username(): string {
        return this.props.username;
    }
    set username(username: string) {
        this.props.username = username;
    }
    get password(): string {
        return this.props.password;
    }
    set password(password: string) {
        this.props.password = password;
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