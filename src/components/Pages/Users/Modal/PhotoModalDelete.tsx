// import React, { FC } from "react";
// import AvatarEditor from "react-avatar-editor";
// import { Avatar } from "@material-ui/core";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import { useDispatch } from "react-redux";
// import { flashError } from "../../../../store/action-creators";
// import "./styles.scss";
// import { useEffect, useState } from "react";
// interface IProps {
//   name: string;
//   imageURL: string;
//   position: IPosition;
//   isEditingImage: boolean;
//   onStartEditing: () => void;
//   setEditorRef: (editor: AvatarEditor | null) => void;
//   profile?: boolean;
//   defaultImage?: string;
//   width?: number;
//   height?: number;
// }
// interface IPosition {
//   x: number;
//   y: number;
// }
// interface ISettingImage {
//   image: any;
//   position: IPosition;
//   borderRadius: number;
//   allowZoomOut: boolean;
//   scale: number;
//   width?: number;
//   height?: number;
// }
// export const MyEditor: FC<IProps> = (props) => {
//   const dispatch = useDispatch();
//   const { setEditorRef } = props;
//   const initSettingImage: ISettingImage = {
//     image: props.imageURL,
//     position: { ...props.position },
//     borderRadius: 100,
//     allowZoomOut: false,
//     scale: 1,
//     width: 110,
//     height: 100,
//   };
//   const [input, setInput] = useState<HTMLInputElement>();
//   const [settingImage, setSettingImage] = useState(initSettingImage);
//   const [isEdit, setIsEdit] = useState(props.isEditingImage);
//   useEffect(() => {
//     setSettingImage({ ...settingImage, image: props.imageURL });
//     setIsEdit(props.isEditingImage);
//   }, [props.imageURL]);
//   const handleScale = (e) => {
//     const scale: number = parseFloat(e.target.value);
//     setSettingImage({ ...settingImage, scale });
//   };
//   const handlePositionChange = (position: IPosition) => {
//     setSettingImage({ ...settingImage, position });
//   };
//   const onAvatarClick = (): void => {
//     if (input) {
//       input.click();
//     }
//   };
//   const onInputChange = async (e) => {
//     const file = e.target.files[0];
//     if (/\.(gif|jpg|jpeg|svg|png)$/i.test(file.name)) {
//       let uploadImage: string | File | ArrayBuffer | null = await new Promise(
//         (resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () => resolve(reader.result);
//           reader.onerror = (error) => reject(error);
//         }
//       );
//       setSettingImage({ ...settingImage, image: uploadImage });
//       setIsEdit(true);
//       props.onStartEditing();
//     } else {
//       handleDelPreviousImage();
//       dispatch(
//         flashError("bad file input type, please select gif jpg jpeg png svg")
//       );
//     }
//   };
//   const handleDelPreviousImage = (): void => {
//     setSettingImage({ ...settingImage, image: props.imageURL });
//     setIsEdit(false);
//   };
//   const setInputRef = (i) => setInput(i);
//   const avatarStyle = {
//     width: "150px",
//     height: "150px",
//   };
//   return (
//     <div className="avatar-block">
//       {!isEdit ? (
//         <div className="avatar-block--avatar">
//           <Avatar
//             src={props.imageURL || props.defaultImage}
//             alt="avatar"
//             onClick={onAvatarClick}
//             className="avatar-block-item"
//           />
//           <input
//             type="file"
//             hidden
//             ref={setInputRef}
//             onChange={onInputChange}
//             accept="image/*"
//           />
//         </div>
//       ) : (
//         <div className="avatar-block-editor">
//           <AvatarEditor
//             ref={setEditorRef}
//             image={settingImage.image}
//             width={300}
//             height={300}
//             style={avatarStyle}
//             border={20}
//             borderRadius={200}
//             scale={settingImage.scale}
//             position={settingImage.position}
//             crossOrigin="anonymous"
//             onPositionChange={handlePositionChange}
//           />
//           <div className="avatar-editing">
//             Zoom
//             <input
//               name="scale"
//               type="range"
//               onChange={handleScale}
//               min={settingImage.allowZoomOut ? "0.1" : "1"}
//               max="2"
//               step="0.01"
//               defaultValue="1"
//             />
//             <span className="del-btn" onClick={handleDelPreviousImage}>
//               <HighlightOffIcon className="del-btn-icon" />
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };