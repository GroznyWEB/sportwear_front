
export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPhone: React.Dispatch<React.SetStateAction<string>>
) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.startsWith("7")) {
    value = value.slice(1); 
  }
  
  value = value.slice(0, 10); 

  const formattedPhone = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
  
  setPhone(formattedPhone); 
};
