// import { MD5 } from 'crypto-js';
import md5 from 'crypto-js/md5';

export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchImage = (email) => {
  const emailHash = md5(email).toString();
  const emailUrl = `https://www.gravatar.com/avatar/${emailHash}`;
  return emailUrl;
};
