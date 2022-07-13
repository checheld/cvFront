import { call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { downloadCVResult } from '../../actionCreators/CVActionCreator';
import instance from '../axiosSetting';

const axiosDownloadCV = (id: number) =>

  instance.get<any>(
    `/Pdf/${id}`
  )
    .then((response) => {
      const b64Data = response.data;
      // @ts-ignore
      const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      }
      const blob = b64toBlob(b64Data, "application/pdf");
      const url = URL.createObjectURL(blob);
      //const url = window.URL.createObjectURL(new Blob([response.data], {type:"application/pdf"}));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    })

export default function* downloadCVFetch(id: number) {
  try {
    const downloadCVResponse: AxiosResponse<File> = yield call(axiosDownloadCV, id);
  }
  catch (e) {
    console.log(e)
  }
}
