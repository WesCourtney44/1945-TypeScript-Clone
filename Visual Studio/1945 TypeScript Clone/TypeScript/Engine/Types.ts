type Action = () => void;
type ActionList = Action[];
type ActionListMap = ActionList[];
type KeyState = "up" | "down";
type KeyListener = (keyCode: KeyCode) => void;
type KeyListenerList = KeyListener[];