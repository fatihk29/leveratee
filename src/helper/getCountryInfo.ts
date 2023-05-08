import { Country } from "DataApi/country.interface";

export const getCountryInfo = (data, country) => {
  const a = data?.find((item: Country) => {
    return item.alpha2Code == country;
  });
  console.log("a :>> ", a?.name);
  return { name: a?.name, flag: a?.flag };
};
