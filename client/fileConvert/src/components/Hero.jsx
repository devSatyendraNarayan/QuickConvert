import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Hero() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionMessage, setConversionMessage] = useState("");
  const [conversionSuccess, setConversionSuccess] = useState(true);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Clear the conversion message and success status when a new file is selected
    setConversionMessage("");
    setConversionSuccess(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConversionMessage("Please select a file");
      setConversionSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Clear the selected file after successful conversion
      setSelectedFile(null);
      setConversionMessage("File Converted Successfully");
      setConversionSuccess(true);
    } catch (error) {
      console.error("Conversion Error:", error);
      setConversionMessage("Conversion failed. Please try again later.");
      setConversionSuccess(false);
    }
  };

  const fileInputLabelClass = `relative flex min-h-[200px] items-center justify-center rounded-md border-2 border-dashed border-[#e0e0e0] p-12 text-center hover:border-[#4b42f8] hover:text-[#4b42f8] hover:bg-gray-100 cursor-pointer`;
  const convertButtonClass = `hover:shadow-form w-full rounded-md ${
    !selectedFile
      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
      : "hover:bg-[#4b42f8] bg-[#6A64F1] text-white"
  } py-3 px-8 text-center text-base font-semibold outline-none`;

  const messageClass = conversionSuccess ? "text-green-500" : "text-red-500";

  return (
    <div className="overflow-y-hidden h-screen ">
      <Navbar />
      <div className="flex items-center justify-center flex-col bg-white h-screen px-5">
        <h1 className="text-4xl font-bold text-gray-800 ">
          Convert WORD to PDF
        </h1>
        <p className="py-3 text-xl text-gray-500 text-center">
          Make DOC and DOCX files easy to read by converting them to PDF.
        </p>
        <div className="mx-auto w-full max-w-[550px]">
          <form className="py-4 px-9">
            <div className="mb-6 pt-4 ">
              <div className="mb-8">
                {!selectedFile ? (
                  <>
                    <input
                      type="file"
                      accept=".doc,.docx"
                      onChange={handleFileChange}
                      name="file"
                      id="file"
                      className="sr-only"
                    />
                    <label htmlFor="file" className={fileInputLabelClass}>
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                          Drop files here
                        </span>
                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                          Or
                        </span>
                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                          {selectedFile ? selectedFile.name : "Browse"}
                        </span>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative flex min-h-[200px] items-center justify-center rounded-md border-2 border-dashed border-[#e0e0e0] p-12 text-center">
                      <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        {selectedFile ? selectedFile.name : "Browse"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <button
                disabled={!selectedFile}
                onClick={handleSubmit}
                className={convertButtonClass}
              >
                Convert
              </button>
            </div>
            {conversionMessage && (
              <p className={`mt-2 ${messageClass}`}>{conversionMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
