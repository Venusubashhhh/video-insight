// import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import "./PhotoModalComponent.scss";
import { useState } from "react";
import AddUser from "../../services/ChatService/UserChat";
export default function ModalComponent() 
{
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const formData = new FormData();
  function submit() {
    formData.append("name", name);
    formData.append("file", selectedFile);
    AddUser.Add(formData);
  }
  return (
    <>
      <Button onPress={onOpen} color="primary">
        + New Face
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Person
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  placeholder="Enter your Name"
                  variant="bordered"
                />
                <div className="input_container">
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={submit}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
