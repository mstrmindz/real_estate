import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import Head from "next/head";
import ImageScrollbar from "../../components/ImageScrollbar";

// Component for displaying property details
const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <>
    <Head>
      <title>{title} - Property Details</title>
      <meta name="description" content={description} />
    </Head>
    <Box maxWidth="1000px" margin="auto" p="4">
      {/* Display property images */}
      {photos && photos.length > 0 && <ImageScrollbar data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center">
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size="sm" src={agency?.logo?.url} />
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
      </Box>
      <Box marginTop="2">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
          {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length > 0 && (
          <Text fontSize="2xl" fontWeight="black" marginTop="5">
            Facilities:
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities?.map((item) =>
            item?.amenities?.map((amenity) => (
              <Text
                key={amenity?.text}
                fontWeight="bold"
                color="blue.400"
                fontSize="l"
                p="2"
                bg="gray.200"
                m="1"
                borderRadius="5"
              >
                {amenity?.text || "No Text"}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  </>
);

// Correct placement of getServerSideProps outside the component
export async function getServerSideProps({ params: { id } }) {
  try {
    const res = await fetch(
      `https://realty-in-ca1.p.rapidapi.com/properties/detail?externalID=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Make sure to use the environment variable
          "x-rapidapi-host": "realty-in-ca1.p.rapidapi.com",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch property details");
    }

    const data = await res.json();

    if (!data) {
      return { notFound: true };
    }

    return {
      props: {
        propertyDetails: data,
      },
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    return { notFound: true }; // Handle the case where the data is not found
  }
}

export default PropertyDetails;