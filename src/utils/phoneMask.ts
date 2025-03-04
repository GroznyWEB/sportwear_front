// src/utils/phoneValidation.ts

export const validatePhone = (value: string): string => {
    const phoneRegex = /^\d{11}$/; // Только цифры, и длина должна быть ровно 11 символов
    if (!phoneRegex.test(value.replace(/\D/g, ""))) { // Убираем все нецифровые символы перед проверкой
      return "Номер телефона должен содержать ровно 11 цифр";
    }
    return "";
  };
  