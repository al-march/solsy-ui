export class SelectionModel<T = any> {
    private readonly value = new Set<T>();

    constructor(model?: SelectionModel<T>) {
        if (model) {
            this.value = new Set(model.value);
        }
    }

    get() {
        return this.value;
    }

    getFirst() {
        const [first] = this.get();
        return first;
    }

    add(v: T) {
        this.value.add(v);
        return this;
    }

    has(v: T) {
        return this.value.has(v);
    }

    remove(v: T) {
        this.value.delete(v);
        return this;
    }

    clear() {
        this.value.clear();
        return this;
    }
}
