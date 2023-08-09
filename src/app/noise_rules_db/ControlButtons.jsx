import React from "react";
import Button from "@mui/material/Button";

const ControlButtons = ({
  router,
  handleFileSelect,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => router.push("/main_page")}
      >
        Return to main page
      </Button>
      <div
        className={
          "flex justify-center items-center space-x-20 container mb-10"
        }
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for rules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "50%",
            padding: "10px",
            margin: "8px 0",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </>
  );
};

export default ControlButtons;