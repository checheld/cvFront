import { Skeleton } from "@mui/material";
import React from "react";

const PreviewPageHeader: React.FC = () => {
  return (
    <>
      <Skeleton sx={{ mb: 4 }} variant="rectangular" width={230} height={20} />
      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          marginBottom: `20px`,
        }}
      >
        <Skeleton variant="rectangular" width={300} height={45} />
        <Skeleton variant="rectangular" width={180} height={45} />
      </div>
    </>
  );
};

export default PreviewPageHeader;