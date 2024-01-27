import { Exception } from "sass";

const translateStatusToErrorMessage = (status) => {
  switch (status) {
    case 401:
      return "please login again ";
    case 403:
      return "you do not have permission to view the photos.";
    default:
      return "these was an error retrieving the workplace info. Please try a gain.";
  }
};
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(
      `loggin http detail for debugging : ${JSON.stringify(httpErrorInfo)}`
    );
    let errorMessage = translateStatusToErrorMessage(response.status);
    throw new Exception(errorMessage);
  }
};
const parseJson = (response) => {
  return response.json();
};
