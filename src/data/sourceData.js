
// Function to format timestamp in the format "hh:mm AM/PM, day month"
function formatTimestamp(dateString) {
  const date = new Date(dateString);

  // Format the time in 12-hour format (AM/PM)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 hours (midnight) to 12
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Get the day and month
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return `${formattedHours}:${formattedMinutes} ${ampm}, ${day} ${month}`;
}

// Create a function that fetches and returns data as a Promise
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const fetchedData = await response.json();

    if (fetchedData && Array.isArray(fetchedData.data)) {
      // Format timestamps before returning the data
      const formattedData = fetchedData.data.map(item => {
        return {
          ...item,
          formattedTimestamp: formatTimestamp(item.timestamp), // Add the formatted timestamp
        };
      });

      return formattedData; // Return the data with formatted timestamps
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
  const apiUrl = "https://script.google.com/macros/s/AKfycbzoO_SOCkgTWcRVDM7_ThDG_eycGDlhuo1HPiPf3dfIbadwagZb8D8ltpmMWCrAXpwH7g/exec?apiKey=sWs3PQl051D7WtKBYSzpdQV591YZEErV&deviceId=device_1&isFetch=True";
  return await fetchData(apiUrl); // Call fetchData and return the result
};




