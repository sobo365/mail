package com.osa.mailClient.enums;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("unused")
public enum Operation {
    MOVE(1),
    COPY(2),
    DELETE(3);

    private int value;
    private static Map map = new HashMap<>();

    private Operation(int value) {
        this.value = value;
    }

    static {
        for (Operation operation : Operation.values()) {
            map.put(operation.value, operation);
        }
    }

    public static Operation valueOf(int operation) {
        return (Operation) map.get(operation);
    }

    public int getValue() {
        return value;
    }
}
