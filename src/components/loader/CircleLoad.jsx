import React from "react";
import {Spinner} from "@nextui-org/react";

export default function CircleLoad() {
  return (
    <div className="flex gap-4">
      <Spinner label="Loading..." color="danger" labelColor="danger"/>
    </div> 
  );
}
