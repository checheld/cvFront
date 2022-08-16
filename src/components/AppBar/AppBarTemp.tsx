import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./Navigation.module.css";
import { Typography } from "@mui/material";
import LinkNavigation from "./LinkNavigation";

const routes: {
    cv: string;
    user: string;
    project: string;
    education: string;
    technology: string;
    workExperience: string;
    projectType: string;
} = {
    cv: "/cv",
    user: "/user",
    project: "/project",
    education: "/education",
    technology: "/technology",
    workExperience: "/work-experience",
    projectType: "/project-type",
};

const Navigation: React.FC = () => {
    let path = useLocation().pathname;
    return (
        <>
            <div className="wrapper">
                <div className="nav">
                    <div className="logo">
                        <Typography
                            variant="h1"
                            sx={{
                                backgroundImage: `linear-gradient(90deg, rgba(200,200,200,1) 0%, rgba(255,255,255,1) 100%);`,
                                backgroundClip: `text`,
                                textFillColor: `transparent`,
                            }}
                        >
                            L
                            <Typography
                                variant="h1"
                                sx={{ color: "white" }}
                                className="mobileTool"
                            >
                                evi
                            </Typography>
                            <Typography
                                variant="h1"
                                color="primary"
                                sx={{
                                    m: 0,
                                    backgroundImage: `linear-gradient(135deg,rgba(88,147,249,1) 40%,  rgba(47,200,209,1) 100%)`,
                                    backgroundClip: `text`,
                                    textFillColor: `transparent`,
                                }}
                            >
                                CV
                            </Typography>
                        </Typography>
                    </div>
                    <div className="wrapperLine">
                        <div className="line" />
                    </div>
                    <div className="navSection">
                        <Typography variant="h3" sx={{ m: 0 }} className="mobileTool">
                            MAIN
                        </Typography>
                        {Object.values(routes)
                            .slice(0, 3)
                            .map((route, index) => {
                                return <LinkNavigation key={index} route={route} path={path} />;
                            })}
                    </div>
                    <div className="wrapperLine">
                        <div className="line" />
                    </div>
                    <div className="navSection">
                        <Typography variant="h3" sx={{ m: 0 }} className="mobileTool">
                            OTHER
                        </Typography>
                        {Object.values(routes)
                            .slice(3)
                            .map((route, index) => {
                                return <LinkNavigation key={index} route={route} path={path} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navigation;