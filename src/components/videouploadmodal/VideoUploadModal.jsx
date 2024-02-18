import { useEffect } from "react";
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
import "./VideoUploadModal.scss";
import { useState } from "react";
import AddVideo from "../../services/playvideo/playvideo";
import { useRecoilState } from "recoil";
import { Filename } from "../../atom/FilenameAtom";
import LoadingButton from "../loadingbutton/LoadingButton";
export default function VideoUploadModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState();
  const [file, setfile] = useRecoilState(Filename);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    console.log(file);
  }, [file]);
  const handleFileChange = (event) => {
    const filename = event.target.files[0];
    setfile(event.target.files[0].name);
    setSelectedFile(filename);
  };
  const formData = new FormData();
  async function submit() {
    formData.append("file", selectedFile);
   const val=await AddVideo.Add(formData);
   setLoad(false);
  }
  return (
    <>
      <img src="../../../public/assets/upload icon.png" onClick={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Video
              </ModalHeader>
              <ModalBody>
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
                {!load ? (
                  <Button color="primary" onPress={()=>{submit()
                  setLoad(true)
                  }}>
                    Upload
                  </Button>
                ) : (
                  <LoadingButton />
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
