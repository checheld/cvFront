import { Skeleton } from "@mui/material";
import React from "react";
import PreviewPageHeader from "./PreviewPageHeader";

const PreviewPageTable: React.FC = () => {
  const amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <>
      <PreviewPageHeader />
      <div>
        {amount.map((a, index) => {
          return (
            <Skeleton
              key={index}
              variant="rectangular"
              width={`100%`}
              height={63}
              sx={{ mb: 0.5 }}
            />
          );
        })}
      </div>
    </>
  );
};

export default PreviewPageTable;