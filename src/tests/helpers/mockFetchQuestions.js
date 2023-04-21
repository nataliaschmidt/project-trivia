import { questionsResponse } from "./questions";

const mockFetchQuestions = () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve(
      questionsResponse,
    ),
  });
};

export default mockFetchQuestions;