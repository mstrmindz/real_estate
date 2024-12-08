import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";

// Fetch API utility
const fetchApi = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "realty-in-ca1.p.rapidapi.com",
    },
  });
  const data = await res.json();
  return data;
};

const Home = ({ propertiesForSale, propertiesForRent }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties for Sale
      </Text>
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
};

export async function getStaticProps() {
  // Fetch properties for sale and rent
  const propertiesForSale = await fetchApi(
    `${process.env.BASE_URL}/properties/list?purpose=for-sale&hitsPerPage=6`
  );
  const propertiesForRent = await fetchApi(
    `${process.env.BASE_URL}/properties/list?purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits || [],
      propertiesForRent: propertiesForRent?.hits || [],
    },
  };
}

export default Home;
