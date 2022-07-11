import { Skeleton } from "@mui/material";
import React from "react";
import PreviewPageHeader from "./PreviewPageHeader";

const PreviewPageCv: React.FC = () => {
  const amoutS = [0, 0];
  const amount = [0, 0, 0, 0, 0];
  return (
    <>
      <PreviewPageHeader />
      {amoutS.map((a, index) => {
        return (
          <div key={index}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={20}
              sx={{ mb: 2 }}
            />
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
                    height={281}
                    sx={{ mb: 4.5 }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PreviewPageCv;