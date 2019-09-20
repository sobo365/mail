package com.osa.mailClient.enums;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unused")
public enum Condition {
    TO(1),
    FROM(2),
    SUBJECT(3),
    CC(4);

    private int value;
    private static Map map = new HashMap<>();

    private Condition(int value) {
        this.value = value;
    }

    static {
        for (Condition condition : Condition.values()) {
            map.put(condition.value, condition);
        }
    }

    public static Condition valueOf(int condition) {
        return (Condition) map.get(condition);
    }

    public int getValue() {
        return value;
    }
}