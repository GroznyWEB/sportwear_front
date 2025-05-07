export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPhone: React.Dispatch<React.SetStateAction<string>>
) => {
  const input = e.target;
  const cursorPosition = input.selectionStart || 0;
  let value = input.value;
  
  // Сохраняем только цифры
  const numbers = value.replace(/\D/g, '');
  
  // Форматируем номер
  let formattedValue = '+7';
  
  if (numbers.length > 1) {
    formattedValue += ` (${numbers.substring(1, 4)}`;
  }
  if (numbers.length >= 4) {
    formattedValue += `) ${numbers.substring(4, 7)}`;
  }
  if (numbers.length >= 7) {
    formattedValue += `-${numbers.substring(7, 9)}`;
  }
  if (numbers.length >= 9) {
    formattedValue += `-${numbers.substring(9, 11)}`;
  }

  setPhone(formattedValue);

  // Корректируем позицию курсора
  setTimeout(() => {
    let newCursorPosition = cursorPosition;
    
    // Если удаляем символ перед разделителем
    if (value.length > formattedValue.length && 
        [' ', ')', '-', '('].includes(value[cursorPosition - 1])) {
      newCursorPosition--;
    }
    
    // Если добавляем символ перед разделителем
    if (value.length < formattedValue.length && 
        [' ', ')', '-', '('].includes(formattedValue[cursorPosition])) {
      newCursorPosition++;
    }
    
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }, 0);
};