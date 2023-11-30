package com.mycompany.myapp.domain;

public enum OrderStatus {
    COMPLETED, //Замовлення виконане
    CANCELED, //Замовлення відхилено
    BASKET, //Замовлення на етапі створення споживачем
    IN_PROGRESS, //Замовлення в процесі виконання
    CREATED, //Замовлення створене
    RETURNED, //Замовлення повернуто
}
