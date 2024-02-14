import { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import './VideoUploadModal.scss'
import { useState } from "react";
import AddVideo from "../../services/playvideo/playvideo";
import { useRecoilState } from "recoil";
import { Filename } from "../../atom/FilenameAtom";
export default function VideoUploadModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedFile, setSelectedFile] = useState();
  const [file, setfile] = useRecoilState(Filename);
  useEffect(()=>{
    console.log(file)
  },[file])
  const handleFileChange = (event) => {
    const filename = event.target.files[0];
setfile(event.target.files[0].name);
    setSelectedFile(filename);
  };
  const formData=new FormData()
function submit()
{
formData.append('file',selectedFile)
AddVideo.Add(formData);
} 
  return (
    <>
    <img src="../../../public/assets/upload icon.png" onClick={onOpen}/>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add New Video</ModalHeader>
              <ModalBody>
                <div className="input_container">
    <input type="file" id="fileUpload" onChange={handleFileChange}/>
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
