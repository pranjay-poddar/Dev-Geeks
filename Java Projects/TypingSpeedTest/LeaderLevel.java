package Typing.Speed.Test;

public enum LeaderLevel {

    NORM {
        public int getSpeed() {
            return 150;
        }
    },
    GOOD {
        public int getSpeed() {
            return 250;
        }
    },
    PROFI {
        public int getSpeed() {
            return 400;
        }
    };

    public abstract int getSpeed();
}
