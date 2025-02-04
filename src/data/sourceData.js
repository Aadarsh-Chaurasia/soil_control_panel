const apiUrl =
  "https://script.google.com/macros/s/AKfycbzoO_SOCkgTWcRVDM7_ThDG_eycGDlhuo1HPiPf3dfIbadwagZb8D8ltpmMWCrAXpwH7g/exec?apiKey=sWs3PQl051D7WtKBYSzpdQV591YZEErV&deviceId=device_1&isFetch=True";

// Create a function that fetches and returns data as a Promise
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const fetchedData = await response.json();

    if (fetchedData && Array.isArray(fetchedData.data)) {
      return fetchedData.data; // Return the actual data
    } else {
      console.error("Invalid data format", fetchedData);
      return [];
    }
  } catch (error) {
    console.error("Error fetching or formatting data:", error);
    return [];
  }
};

// Export a function that fetches the data
export const getSourceData = async () => {
  return await fetchData(apiUrl); // Call fetchData and return the result
};
