import React, { useCallback, useEffect, useState } from "react";

// project imports
import { Country, GetCounriesResponse } from "DataApi/country.interface";
import { People, GetPeopleResponse } from "DataApi/people.interface";
import { searchCountries, searchPeople } from "api-usage-example";

const calculateYearsOld = (val: any) => {
  const year = new Date(val);
  const yyyy = year.getFullYear();
  return new Date().getFullYear() - yyyy;
};

const App: React.FunctionComponent = () => {
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
    }, 500);
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

  console.log("peopleData?.searchResults :>> ", peopleData?.searchResults);

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
            {peopleData?.searchResults?.map((item: People, i: number) => {
              return (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.first_name}</td>
                    <td>{item?.last_name}</td>
                    <td>{calculateYearsOld(item?.date_of_birth)}</td>
                    <td>
                      {
                        countriesData?.searchResults.find(
                          (country: Country) => {
                            return country.alpha2Code == item?.country;
                          }
                        )?.name
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
