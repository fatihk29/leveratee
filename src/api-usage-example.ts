import { getCountries, getPeople } from "./DataApi";

export const searchCountries = async (search?: string) => {
  const result = await getCountries({ search });
  return result;
};

export const searchPeople = async (search?: string) => {
  const result = await getPeople({ search });
  return result;
};

searchCountries(); // Print all countries
searchCountries("ISR"); // Print selected countries
searchPeople(); // Print all people
searchPeople("David"); // Print selected people
