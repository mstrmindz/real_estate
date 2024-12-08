export async function getServerSideProps({ params: { id } }) {
  try {
    // Fetch data from the API
    const res = await fetch(
      `https://realty-in-ca1.p.rapidapi.com/properties/detail?externalID=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use the RAPIDAPI_KEY environment variable
          "x-rapidapi-host": "realty-in-ca1.p.rapidapi.com",
        },
      }
    );

    // Check if the response is okay (status 200)
    if (!res.ok) {
      console.error("Failed to fetch property details", res.status);
      return { notFound: true }; // Return a 404 if the fetch fails
    }

    const data = await res.json();

    // Check if the data is valid
    if (!data) {
      console.error("No data found for the property with externalID:", id);
      return { notFound: true }; // Return 404 if no data is found
    }

    // Return the data as props
    return {
      props: {
        propertyDetails: data,
      },
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    return { notFound: true }; // Return 404 if there is an error
  }
}
