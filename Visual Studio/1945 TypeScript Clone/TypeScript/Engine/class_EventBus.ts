class EventBus {
    private keyDownMap: ActionListMap;

    constructor() {
        this.keyDownMap = [];
        document.addEventListener("keydown", this.handleKeyDown);
    }

    // this is not a method, this is a closure should that never be called directly!
    private handleKeyDown = (event: KeyboardEvent) => {
        let list: ActionList = this.keyDownMap[event.keyCode];
        if (list !== undefined) {
            for (let action of list) {
                action();
            }
        }
    };

    public doOnKeyDown(key: Key, action: () => void): void {
        let map: ActionListMap = this.keyDownMap;
        if (map[key] === undefined) {
            map[key] = [];
        }
        map[key].push(action);
    }
}

type Action = () => void;
type ActionList = Action[];
type ActionListMap = ActionList[];

enum Key {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
}