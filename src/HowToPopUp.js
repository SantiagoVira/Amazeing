import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Kbd,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function KeybindRow({ name, children }) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        <Kbd fontSize={18}>{children}</Kbd>
      </Td>
    </Tr>
  );
}

function ControlsTable() {
  return (
    <TableContainer border="1px solid gray" borderRadius={15}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Direction</Td>
            <Td>Key</Td>
          </Tr>
          <KeybindRow name="Up">W</KeybindRow>
          <KeybindRow name="Left">A</KeybindRow>
          <KeybindRow name="Down">S</KeybindRow>
          <KeybindRow name="Right">D</KeybindRow>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function HowToPopUp({ initialRef, finalRef, isOpen, onToggle }) {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onToggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Playing Amazeing</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ControlsTable />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HowToPopUp;
