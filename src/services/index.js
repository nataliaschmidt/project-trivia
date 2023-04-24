// import { MD5 } from 'crypto-js';
import md5 from 'crypto-js/md5';

export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
};

export const fetchImage = (email) => {
  const emailHash = md5(email).toString();
  const emailUrl = `https://www.gravatar.com/avatar/${emailHash}`;
  return emailUrl;
};

const defaultNumber = 5;

export const fetchQuestions = async (
  token,
  { number = defaultNumber, category = 0, difficulty = 0, type = 0 } = {},
) => {
  const url = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const triviaCategories = [
  {
    id: 0,
    name: 'Default',
  },
  {
    id: 9,
    name: 'General Knowledge',
  },
  {
    id: 10,
    name: 'Entertainment: Books',
  },
  {
    id: 11,
    name: 'Entertainment: Film',
  },
  {
    id: 12,
    name: 'Entertainment: Music',
  },
  {
    id: 13,
    name: 'Entertainment: Musicals & Theatres',
  },
  {
    id: 14,
    name: 'Entertainment: Television',
  },
  {
    id: 15,
    name: 'Entertainment: Video Games',
  },
  {
    id: 16,
    name: 'Entertainment: Board Games',
  },
  {
    id: 17,
    name: 'Science & Nature',
  },
  {
    id: 18,
    name: 'Science: Computers',
  },
  {
    id: 19,
    name: 'Science: Mathematics',
  },
  {
    id: 20,
    name: 'Mythology',
  },
  {
    id: 21,
    name: 'Sports',
  },
  {
    id: 22,
    name: 'Geography',
  },
  {
    id: 23,
    name: 'History',
  },
  {
    id: 24,
    name: 'Politics',
  },
  {
    id: 25,
    name: 'Art',
  },
  {
    id: 26,
    name: 'Celebrities',
  },
  {
    id: 27,
    name: 'Animals',
  },
  {
    id: 28,
    name: 'Vehicles',
  },
  {
    id: 29,
    name: 'Entertainment: Comics',
  },
  {
    id: 30,
    name: 'Science: Gadgets',
  },
  {
    id: 31,
    name: 'Entertainment: Japanese Anime & Manga',
  },
  {
    id: 32,
    name: 'Entertainment: Cartoon & Animations',
  },
];
