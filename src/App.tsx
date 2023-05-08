import React, { FC, useCallback, useEffect, useState } from "react";

// project imports
import { Country, GetCounriesResponse } from "DataApi/country.interface";
import { People, GetPeopleResponse } from "DataApi/people.interface";
import { searchCountries, searchPeople } from "api-usage-example";
import { calculateYearsOld } from "helper/calculateYearsOld";
import { getCountryInfo } from "helper/getCountryInfo";

const App: FC = () => {
  const [value, setValue] = useState<string>("");
  const [timer, setTimer] = useState<any>(null);

  const [countriesData, setCountriesData] = useState<
    GetCounriesResponse | undefined
  >();
  const [peopleData, setPeopleData] = useState<GetPeopleResponse | undefined>();

  function update(event) {
    setValue(event.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      apiCall();
    }, 200);
    setTimer(newTimer);
  }

  const apiCall = useCallback(() => {
    searchCountries().then((res) => {
      setCountriesData(res);
    });
    searchPeople(value).then((res) => {
      setPeopleData(res);
    });
  }, [value]);

  useEffect(() => {
    apiCall();
  }, []);

  // console.log("peopleData?.searchResults :>> ", countriesData?.searchResults);

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <input type="text" value={value} onChange={update} />
      <p>List Component</p>
      <div className="listWrapper">
        <div>
          <table>
            <tr
              style={{
                textAlign: "left",
              }}
            >
              <th>Nu</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
            {peopleData?.searchResults?.map((person: People, i: number) => {
              return (
                <React.Fragment key={person.id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{person?.first_name}</td>
                    <td>{person?.last_name}</td>
                    <td>{calculateYearsOld(person?.date_of_birth)}</td>

                    <td>
                      {
                        getCountryInfo(
                          countriesData?.searchResults,
                          person?.country
                        ).name
                      }
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </table>
        </div>
      </div>
      <p>Found results: {peopleData?.searchResultCount}</p>
      <p>Total results: {peopleData?.totalResultCounter}</p>
    </div>
  );
};

export default App;
