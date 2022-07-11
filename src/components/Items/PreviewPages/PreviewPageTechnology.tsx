import { Skeleton } from "@mui/material";
import React from "react";
import PreviewPageHeader from "./PreviewPageHeader";

const PreviewPageTechnology: React.FC = () => {
  const amount = [0, 0, 0, 0, 0];
  return (
    <>
      <PreviewPageHeader />
      <div
        className="gridForMultilineInputs"
        style={{
          gridTemplateColumns: `repeat(5, 1fr)`,
        }}
      >
        {amount.map((a, index) => {
          return (
            <Skeleton
              key={index}
              variant="rectangular"
              width={`100%`}
              height={300}
              sx={{ mb: 0.5 }}
            />
          );
        })}
        <Skeleton
          style={{ gridColumn: `1/3` }}
          variant="rectangular"
          width={`100%`}
          height={200}
          sx={{ mb: 0.5, mt: 5 }}
        />
      </div>
    </>
  );
};

export default PreviewPageTechnology;