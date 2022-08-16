import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import './Navigation.module.css';
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import SchoolIcon from "@mui/icons-material/School";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import BusinessIcon from "@mui/icons-material/Business";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const StyledLink = styled(Link)({
  backgroundColor: "rgba(255,255,255,0.1)",
  fontSize: "16px",
  width: `100%`,
  height: `100%`,
});

const NavButton = styled(Button)({
  display: `flex`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  width: `100%`,
  height: `100%`,
  borderRadius: 0,
  background: `#303439`,
  padding: `17px 25px`,
  color: "rgba(255,255,255,0.4)",
  overflow: `hidden`,
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: `white`,
  },
  ":focus": {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: `#5893f9`,
  },
  "@media (max-width: 1600px)": {
    padding: `15px 20px`,
  },
  "@media (max-width: 1200px)": {
    padding: `13px 15px`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  "@media (max-width: 991px)": {
    padding: `13px 15px`,
  },
});

const iconPack = {
  cv: TextSnippetRoundedIcon,
  user: PersonIcon,
  project: FolderIcon,
  education: SchoolIcon,
  technology: SyncAltIcon,
  workExperience: BusinessIcon,
  projectType: FormatListBulletedOutlinedIcon,
};

interface ILink {
  route: string;
  path: string;
}

const LinkNavigation: React.FC<ILink> = ({ route, path }) => {
  let routeFix = route.replace(/[^a-z]/gi, "");
  if (routeFix === "workexperience") routeFix = "workExperience";
  else if (routeFix === "projecttype") routeFix = "projectType";
  let title = "";
  switch (routeFix) {
    case `user`:
      title = `user`;
      break;
    case `cv`:
      title = `CVs`;
      break;
    case `project`:
      title = `project`;
      break;
    case `education`:
      title = `education`;
      break;
    case `technology`:
      title = `technologies`;
      break;
    case `workExperience`:
      title = `work Experience`;
      break;
    case `projectType`:
      title = `project Type`;
      break;
    default:
      title = "";
      break;
  }

  const IconComponent = iconPack[routeFix as keyof typeof iconPack];
  return (
    <StyledLink to={route}>
      <NavButton className={path === route ? "buttonActive" : ""}>
        <IconComponent className="buttonIcon" />
        <div className="tabText">{title}</div>
      </NavButton>
    </StyledLink>
  );
};
export default LinkNavigation;