import React from 'react';

const FileUploader = ({ loadData }) => {
  let fileReader;

  const handleFileRead = e => {
    const content = fileReader.result;
    var firstLine = content.split('\n').shift();
    const transactions = content.substring(content.indexOf('\n') + 1);
    const allLines = transactions.split(/\r\n|\n/);

    var data = [];
    // Reading line by line
    for (var i = 0, len = allLines.length; i < len - 1; i++) {
      var obj = JSON.parse(allLines[i]);
      obj.date = new Date(obj.date);
      data.push(obj);
    }
    loadData(data);
  };

  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="upload-expense">
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".txt"
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
};

export default FileUploader;
