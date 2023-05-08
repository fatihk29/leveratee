export const calculateYearsOld = (birthDate: string): string => {
  const year = new Date(birthDate);
  const yyyy = year.getFullYear();
  return (new Date().getFullYear() - yyyy).toString();
};
