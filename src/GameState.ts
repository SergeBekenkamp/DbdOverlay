class GameState {
    private hookStates: [number, number, number, number] = [0, 0, 0 ,0];
    private listeners: Array<(event: [number, number, number, number]) => void> = [];

    constructor() {
    }

    private updateListeners() {
        this.listeners.forEach((listener) => listener(this.hookStates));
    }

    public addListener(listener: (event: [number, number, number, number]) => void): void {
        this.listeners.push(listener);
    }

    public incrementHook(index: 1 | 2 | 3 | 4): void {
        this.hookStates[index - 1] += 1;
        this.updateListeners()

    }

    public resetHookStates(): void {
        this.hookStates = [0,0,0,0];
        this.updateListeners();
    }

    public getHookState(): [number, number, number, number] {
        return [...this.hookStates];
    }

}

export {
    GameState,
}