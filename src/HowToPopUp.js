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
  Text,
} from "@chakra-ui/react";

function KeybindRow({ name, instruction, children }) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{children}</Td>
    </Tr>
  );
}

function ControlsTable() {
  return (
    <TableContainer border="1px solid gray" borderRadius={15}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Move</Td>
            <Td>Key</Td>
          </Tr>
          <KeybindRow name="Up">
            <Kbd fontSize={18}>↑</Kbd>
          </KeybindRow>
          <KeybindRow name="Left">
            <Kbd fontSize={18}>←</Kbd>
          </KeybindRow>
          <KeybindRow name="Down">
            <Kbd fontSize={18}>↓</Kbd>
          </KeybindRow>
          <KeybindRow name="Right">
            <Kbd fontSize={18}>→</Kbd>
          </KeybindRow>
          <KeybindRow name="Dash">Hold Direction</KeybindRow>
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
          <Text textAlign="center" mb={6}>
            Pressing start will spawn your character in the top left. The exit
            is located on the opposite corner. Your job? Navigate through the
            maze using the arrow keys before your time is out! Good luck!
          </Text>
          <ControlsTable />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HowToPopUp;
