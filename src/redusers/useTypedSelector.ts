import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/ConfigureStore'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useHandleSearch = (searchParam: string, getAllElements: any, getSearchElements: any) => {
//     const dispatch = useAppDispatch();

//     const [searchParam, setSearchParam] = useState<string>('');
//     useEffect(() => {
//         const listener = (event: { code: string; preventDefault: () => void; }) => {
//             if (event.code === "Enter" || event.code === "NumpadEnter") {
//                 event.preventDefault();
//                 if (searchParam === '') {
//                     dispatch({ type: getAllElements });
//                 } else {
//                     dispatch({ type: getSearchElements, payload: searchParam });
//                 }
//             }
//         };
//         document.addEventListener("keydown", listener);
//         return () => {
//             document.removeEventListener("keydown", listener);
//         };
//     }, [searchParam]);

// }