# 01 Photo
![01](https://user-images.githubusercontent.com/76162124/236918851-6c4a21fb-196c-4784-9bfa-12a2c3b82b30.PNG)

# 03 Photo

![03](https://user-images.githubusercontent.com/76162124/236921148-c0c3a6db-e8f5-46fe-84ce-0be397f2d28c.PNG)



# React Interview Task

Write a app that use the data api and shows a list of people filtered by the search input with the data below.

- People result will be filtered by name or country.
- Filter must be trigger while user inputing data and not with submitting button.
- Request to server must be performance optimize and efficent.

## Assumptions:

- Countries doesn't change often.
- We doesn't want to pay more then o(1) on country searching.

## Search result should contains:

- Full name
- Age
- Country Full Name

_Hint - there is linkage between data structures_

## Api Usage

```typescript
import { getCountries, getPeople } from "./DataApi";

const searchCountries = async (search?: string) => {
  const result = await getCountries({ search });
  console.log(result);
};

const searchPeople = async (search?: string) => {
  const result = await getPeople({ search });
  console.log(result);
};

searchCountries(); // Print all countries
searchCountries("ISR"); // Print selected countries
searchPeople(); // Print all people
searchPeople("David"); // Print selected people
```
