import React from "react";
import { Consumer } from "../../context";
import FileUploader from "./FileUploader";

const FileUploaderConsumer = () => {
  return (
    <Consumer>
      {({ loadData }) => <FileUploader loadData={loadData} />}
    </Consumer>
  );
};

export default FileUploaderConsumer;
