import { Skeleton } from "@mui/material";
import React from "react";
import PreviewPageHeader from "./PreviewPageHeader";

const PreviewPageUser: React.FC = () => {
  const amount = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <>
      <PreviewPageHeader />
      <div
        className="gridForMultilineInputs"
        style={{
          gridTemplateColumns: `repeat(4, 1fr)`,
        }}
      >
        {amount.map((a, index) => {
          return (
            <Skeleton
              key={index}
              variant="rectangular"
              width={`100%`}
              height={400}
              sx={{ mb: 0.5 }}
            />
          );
        })}
      </div>
    </>
  );
};

export default PreviewPageUser;