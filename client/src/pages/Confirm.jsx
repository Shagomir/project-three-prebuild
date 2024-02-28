import React from "react";
import { REMOVE_LOCATION } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Card, Container, Flex, Heading } from "@chakra-ui/react";
import Auth from "../utils/auth";
import LoginReminder from "../components/LoginReminder";

const Confirm = () => {
  const { id: locationId } = useParams();
  console.log(locationId);
  const [deleteIdea, { error }] = useMutation(REMOVE_LOCATION);
  //   The handleDelete function will delete the location and all of its ideas from the database.
  const handleDelete = () => {
    try {
      const { data } = deleteIdea({
        variables: {
          locationId: locationId,
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
    window.location.assign(`/location/`);
  };
  //   The handleCancel function will redirect the user back to the location detail page if they decide not to delete the location.
  const handleCancel = () => {
    window.location.assign(`/location/${locationId}`);
  };

  if (Auth.loggedIn()) {
    return (
      <Container>
        <Card mt="300px" mx={"auto"}>
          <Heading mt={10}>
            This will delete the location and all of its ideas! Are you sure?
          </Heading>
          <Flex justifyContent="space-between" m={10}>
            <Button className="location-delete" onClick={handleCancel}>
              No, I changed my mind!
            </Button>
            <Button className="location-delete" onClick={handleDelete}>
              Yes, delete it!
            </Button>
          </Flex>
        </Card>
      </Container>
    );
  } else {
    return (
      <>
        <LoginReminder />
      </>
    );
  }
};

export default Confirm;
