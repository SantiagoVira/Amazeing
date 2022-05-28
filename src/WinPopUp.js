import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import React from "react";

function WinPopUp({ isOpen, onToggle, onResetMaze, children }) {
  return (
    <Modal
      isCentered
      onClose={() => {
        onToggle();
        onResetMaze();
      }}
      isOpen={isOpen}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent bg="gray.800" py="25px">
        <ModalCloseButton
          onClick={() => {
            onToggle();
            onResetMaze();
          }}
        />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WinPopUp;
